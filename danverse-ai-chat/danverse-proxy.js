// mohamed-adel-portfolio/danverse-ai-chat/danverse-proxy.js
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. إعدادات CORS للسماح بالوصول من الواجهة الأمامية
    // 1. إعدادات CORS والسماح بالوصول من نطاق danverse.ai فقط
    const allowedOrigin = 'https://danverse.ai';
    const origin = request.headers.get('Origin');
    
    if (origin && origin !== allowedOrigin) {
      return new Response('Forbidden: Invalid Origin', { status: 403 });
    }

    const corsHeaders = {
      'Access-Control-Allow-Origin': origin || allowedOrigin, // Use the actual origin or the allowed one
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    const corsHeaders = {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // معالجة طلبات OPTIONS (pre-flight)
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // 2. الأمان: Rate Limiting (يتطلب ربط Worker بـ KV Namespace باسم 'RATE_LIMITER')
    // 200 طلب في الدقيقة لكل IP
    const ip = request.headers.get('CF-Connecting-IP');
    const rateKey = `rate:${ip}`;
    
    // يجب أن يكون لديك KV Binding باسم RATE_LIMITER
    if (env.RATE_LIMITER) {
        const rate = await env.RATE_LIMITER.get(rateKey) || '0';
        const count = parseInt(rate);
        
        if (count > 200) {
            return new Response('Too many requests', { status: 429, headers: corsHeaders });
        }
        // زيادة العداد وتعيين انتهاء الصلاحية بعد 60 ثانية
        await env.RATE_LIMITER.put(rateKey, (count + 1).toString(), { expirationTtl: 60 });
    } else {
        // رسالة تنبيه في حال عدم وجود KV Binding
        console.warn("RATE_LIMITER KV binding is missing. Rate limiting is disabled.");
    }

    // 3. نقطة النهاية الرئيسية لتوليد الصور
    if (url.pathname === '/generate' && request.method === 'POST') {
      try {
        const body = await request.json();
        const prompt = body.prompt || '';

        // 4. الأمان: فلترة المحتوى غير المرغوب فيه
        const banned = ['nude', 'naked', 'sex', 'porn', 'gore', 'hitler', 'bomb'];
        if (banned.some(w => prompt.toLowerCase().includes(w))) {
          return new Response(JSON.stringify({ error: "Content policy violation" }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        // 5. استدعاء Fal.ai API باستخدام مفتاح API المخزن في بيئة Cloudflare
        // هام: يجب إضافة متغير سري باسم FAL_API_KEY في إعدادات الـ Worker
        const falResponse = await fetch('https://queue.fal.run/fal-ai/flux-pro', {
          method: 'POST',
          headers: {
            'Authorization': `Key ${env.FAL_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            prompt: prompt + ", DANVERSE signature style, ultra realistic advertising, 16k, cinematic lighting",
            image_size: "landscape_4_3"
          })
        });

        if (!falResponse.ok) {
            const errorText = await falResponse.text();
            console.error("Fal.ai API Error:", errorText);
            throw new Error(`Fal.ai API responded with status: ${falResponse.status}`);
        }

        const data = await falResponse.json();
        
        // 6. إرجاع رابط الصورة بنجاح
        return new Response(JSON.stringify({ image_url: data.images[0].url }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      } catch (error) {
        console.error("Proxy Error:", error);
        return new Response(JSON.stringify({ error: 'Failed to generate image.' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // 7. إرجاع رسالة افتراضية إذا لم يتم العثور على المسار
    return new Response('DANVERSE Proxy Active', { status: 200, headers: corsHeaders });
  }
};
