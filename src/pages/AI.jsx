// mohamed-adel-portfolio/src/pages/AI.jsx
// Integrated with Wouter/Zustand structure for better compatibility.
import React, { useState, useRef, useEffect } from 'react';

// Component to handle image loading state (Lazy Loading Images)
const ImageLoader = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative">
      {!loaded && <div className="w-full h-64 bg-gray-900 animate-pulse rounded-2xl flex items-center justify-center text-sm text-cyan-500">Loading Image...</div>}
      <img 
        src={src} 
        alt={alt} 
        className={`max-w-full rounded-2xl border-4 border-cyan-400 shadow-2xl shadow-cyan-500/50 transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        style={{ minHeight: loaded ? 'auto' : '16rem' }} // Ensure space is reserved
      />
    </div>
  );
};

// ملاحظة: تم استخدام Tailwind CSS مباشرة في هذا المكون.
// تأكد من أن مشروعك يدعم Tailwind CSS.
export default function DANVERSEAI() {

  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Welcome to DANVERSE AI ™<br>Describe any ad — I\'ll create a hyper-realistic masterpiece in seconds.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const generate = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    
    // 1. إضافة رسالة المستخدم
    setMessages(prev => [...prev, { type: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    // 2. إضافة رسالة "جاري التوليد"
    const loadingMessage = { type: 'bot', text: 'Generating with Flux Pro... ⏳', id: Date.now() };
    setMessages(prev => [...prev, loadingMessage]);

    try {
      // هام: استبدل الرابط بالرابط الفعلي لـ Cloudflare Worker الخاص بك بعد النشر
      // يجب أن يكون الرابط هو: https://danverse-proxy.اسمك.workers.dev/generate
      const proxyUrl = import.meta.env.VITE_CLOUDFLARE_WORKER_URL || 'https://danverse-proxy.your-worker-name.workers.dev/generate'; 
      
      const res = await fetch(proxyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMsg })
      });
      
      const data = await res.json();
      
      // 3. إزالة رسالة "جاري التوليد" واستبدالها بالنتيجة
      setMessages(prev => {
        const newMessages = prev.filter(m => m.id !== loadingMessage.id);
        if (data.error) {
          return [...newMessages, { type: 'bot', text: `Error: ${data.error}` }];
        }
        // Fetch Optimization: Use ImageLoader component for better perceived performance
        return [...newMessages, { type: 'bot', text: `<ImageLoader src="${data.image_url}" alt="${userMsg}" />` }];
      });

    } catch (error) {
      console.error(error);
      setMessages(prev => {
        const newMessages = prev.filter(m => m.id !== loadingMessage.id);
        return [...newMessages, { type: 'bot', text: 'Server busy or connection error — try again in 5 seconds.' }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 font-['Orbitron']">
      <div className="w-full max-w-2xl bg-gradient-to-b from-black/90 to-purple-900/20 rounded-3xl border-4 border-cyan-400 shadow-2xl shadow-cyan-500/50 backdrop-blur-xl">
        <div className="bg-gradient-to-r from-cyan-400 to-purple-600 p-6 rounded-t-3xl text-center">
          <h1 className="text-4xl font-black text-black">DANVERSE AI ™</h1>
        </div>
        <div className="h-96 overflow-y-auto p-6 space-y-6" style={{ scrollbarColor: '#00ffff #000' }}>
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-xs lg:max-w-md px-6 py-4 rounded-3xl ${m.type === 'user' ? 'bg-yellow-400 text-black' : 'bg-black/70 border-2 border-cyan-400 text-cyan-300'}`}
              >
                {m.text.startsWith('<ImageLoader') ? (
                  <ImageLoader src={m.text.match(/src="([^"]*)"/)[1]} alt={m.text.match(/alt="([^"]*)"/)[1]} />
                ) : (
                  <span dangerouslySetInnerHTML={{ __html: m.text }} />
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-6 flex gap-4">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && generate()}
            placeholder="iPhone 16 Pro on luxury yacht at sunset..."
            className="flex-1 bg-black/80 border-2 border-cyan-400 rounded-full px-8 py-5 text-white text-lg outline-none focus:border-yellow-400 transition-all"
            disabled={isLoading}
          />
          <button onClick={generate} className="bg-cyan-400 text-black w-16 h-16 rounded-full text-3xl font-bold hover:bg-yellow-400 hover:scale-110 transition-all shadow-lg shadow-cyan-500/50" disabled={isLoading}>
            {isLoading ? '...' : '➤'}
          </button>
        </div>
      </div>
    </div>
  );
}
