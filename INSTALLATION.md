# 🚀 Enterprise Architecture Installation Guide

## Prerequisites

- Node.js 18+ or 20+
- pnpm 8+ (recommended) or npm/yarn
- Git

---

## Step 1: Install Dependencies

### All-in-One Installation (Recommended)

```bash
cd client
pnpm add web-vitals @google/generative-ai @react-three/fiber @react-three/drei @react-three/postprocessing postprocessing three gsap
pnpm add -D @types/three @types/gtag.js
```

### Individual Installation

If you prefer to install packages separately:

```bash
# Core Performance Monitoring
pnpm add web-vitals

# AI Orchestration
pnpm add @google/generative-ai

# 3D Scene & Effects
pnpm add three @react-three/fiber @react-three/drei @react-three/postprocessing postprocessing
pnpm add -D @types/three

# Animations
pnpm add gsap

# Analytics Types
pnpm add -D @types/gtag.js
```

---

## Step 2: Environment Variables

### Copy the example file:

```bash
cp .env.example .env
```

### Edit `.env` with your keys:

```env
# Required for AI features
VITE_GEMINI_API_KEY=your_actual_gemini_key

# Optional AI providers
VITE_REPLICATE_API_KEY=your_replicate_key
VITE_CLOUDFLARE_WORKER_URL=https://your-worker.workers.dev

# Analytics (Optional)
VITE_ANALYTICS_ENDPOINT=https://your-analytics.com/api
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Feature Flags (Optional - default: true)
VITE_ENABLE_PERFORMANCE_MONITORING=true
VITE_ENABLE_CUSTOM_CURSOR=true
VITE_ENABLE_3D_SCENE=true
VITE_ENABLE_AI=true
```

### Get API Keys:

1. **Google Gemini**: https://ai.google.dev/ (Free)
2. **Replicate**: https://replicate.com/ (Free tier available)
3. **Cloudflare Worker**: Deploy your own or use provided template

---

## Step 3: Import Styles

### In your main `index.css` or `App.css`:

```css
/* Import enterprise base styles */
@import './core/styles/enterprise-base.css';

/* Your other styles */
```

### Or in your `main.tsx` / `index.tsx`:

```typescript
import './core/styles/enterprise-base.css';
```

---

## Step 4: Integrate with App

### Option A: Copy the example (Easiest)

```bash
cp client/src/App.integration.example.tsx client/src/App.tsx
```

Then customize as needed.

### Option B: Manual integration

Add to your `App.tsx`:

```typescript
import { useEffect } from 'react';
import EnterpriseCore from './core/EnterpriseCore';
import CinematicScene from './core/3d/CinematicScene';

function App() {
  useEffect(() => {
    const core = EnterpriseCore.getInstance();
    
    core.initialize({
      performance: { monitoring: true, resourceHints: true },
      ai: { enabled: true },
      interactions: { cursor: true, magnetic: true },
      analytics: { enabled: true },
    }).then(() => {
      console.log('✅ Enterprise systems ready!');
    });
    
    return () => core.destroy();
  }, []);
  
  return (
    <>
      <CinematicScene />
      {/* Your app content */}
    </>
  );
}
```

---

## Step 5: Verify Installation

### Start development server:

```bash
pnpm dev
```

### Check browser console for:

```
🚀 Initializing Enterprise Systems...
✅ Performance monitoring active
✅ Resource hints optimized
✅ AI systems ready
✅ Micro-interactions enabled
✅ Analytics tracking active
🎉 Enterprise Systems Initialized!
```

### Test features:

1. **Custom Cursor**: Move mouse → should see custom cursor
2. **3D Scene**: Should see animated 3D background
3. **Performance**: Check Network tab → preloading hints
4. **Analytics**: Click anything → check console for events

---

## Step 6: Add Data Attributes (Optional)

Enhance your components with interaction attributes:

```html
<!-- Magnetic effect -->
<button data-magnetic>Click Me</button>

<!-- Hover effects -->
<div data-hover-lift>Card with lift effect</div>
<div data-hover-glow>Glowing on hover</div>
<div data-hover-scale>Scales on hover</div>

<!-- Scroll animations -->
<section data-scroll-animation="fade">
  Fades in on scroll
</section>
<section data-scroll-animation="slide">
  Slides in on scroll
</section>
```

---

## Troubleshooting

### Issue: "Cannot find module 'web-vitals'"

**Solution:**
```bash
pnpm add web-vitals
```

### Issue: Custom cursor not showing

**Solution:**
- Check that styles are imported
- Check browser console for errors
- Try on desktop (cursor disabled on mobile)

### Issue: 3D scene not rendering

**Solution:**
- Ensure Three.js packages installed
- Check WebGL support: https://get.webgl.org/
- Check browser console for errors

### Issue: AI not working

**Solution:**
- Verify `VITE_GEMINI_API_KEY` in `.env`
- Check API key is valid: https://ai.google.dev/
- Check network tab for API calls

### Issue: Performance warnings

**Solution:**
- Normal in development mode
- Run `pnpm build` and test production build
- Adjust performance budgets in config

---

## Next Steps

1. ✅ Read `ENTERPRISE_ARCHITECTURE.md` for detailed docs
2. ✅ Customize configuration in `EnterpriseCore.initialize()`
3. ✅ Add conversion goals for analytics
4. ✅ Test on mobile devices
5. ✅ Run Lighthouse audit: `pnpm lighthouse`
6. ✅ Deploy and monitor!

---

## Production Deployment

### Build:

```bash
pnpm build
```

### Environment variables:

Make sure to set all `VITE_*` variables in your hosting platform:
- Netlify: Site Settings → Environment Variables
- Vercel: Project Settings → Environment Variables
- Others: Check your platform docs

### Verify production build:

```bash
pnpm preview
```

---

## Support

- 📖 **Documentation**: `ENTERPRISE_ARCHITECTURE.md`
- 🐛 **Issues**: [GitHub Issues](https://github.com/DANVERSE01/mohamed-adel-portfolio/issues)
- 📧 **Email**: mohamed.adel1160@icloud.com

---

**Installation complete! 🎉**
