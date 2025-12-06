# Enterprise Architecture Documentation

## 🏗️ Overview

This portfolio implements an **enterprise-grade architecture** with advanced features typically found in large-scale applications. All systems are optimized for performance, scalability, and maintainability.

## 📦 Core Systems

### 1. Performance Monitoring (`WebVitalsMonitor`)

**Location:** `client/src/core/performance/WebVitalsMonitor.ts`

**Features:**
- Real-time Core Web Vitals tracking (CLS, FCP, FID, LCP, TTFB)
- Performance budget enforcement
- Resource loading monitoring
- Long task detection
- Memory leak detection
- Automatic reporting to analytics

**Usage:**
```typescript
import WebVitalsMonitor from '@/core/performance/WebVitalsMonitor';

const monitor = WebVitalsMonitor.getInstance({
  enableReporting: true,
  sampleRate: 1,
  enableConsoleLog: import.meta.env.DEV,
  thresholds: {
    LCP: { good: 2500, needsImprovement: 4000 },
  },
});

// Get metrics
const metrics = monitor.getMetrics();
```

**Performance Targets:**
| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| CLS | ≤ 0.1 | 0.1 - 0.25 | > 0.25 |
| FCP | ≤ 1.8s | 1.8s - 3s | > 3s |
| FID | ≤ 100ms | 100ms - 300ms | > 300ms |
| LCP | ≤ 2.5s | 2.5s - 4s | > 4s |
| TTFB | ≤ 800ms | 800ms - 1.8s | > 1.8s |

---

### 2. Resource Hints Manager (`ResourceHintsManager`)

**Location:** `client/src/core/performance/ResourceHintsManager.ts`

**Features:**
- Automatic DNS prefetch for critical origins
- Intelligent preconnect to CDN
- Critical asset preloading (fonts, hero images)
- Predictive prefetching based on user behavior
- Connection-aware loading (respects `saveData`)

**Usage:**
```typescript
import ResourceHintsManager from '@/core/performance/ResourceHintsManager';

const hints = ResourceHintsManager.getInstance();

// Manual hints
hints.preload('/critical-font.woff2', 'font', { fetchPriority: 'high' });
hints.prefetch('/next-page-data.json');
hints.preconnect('https://cdn.example.com');
```

**Automatic Features:**
- ✅ Prefetches routes when links enter viewport
- ✅ Prefetches on link hover
- ✅ Skips prefetch on slow connections
- ✅ Avoids duplicate prefetches

---

### 3. Cinematic 3D Scene (`CinematicScene`)

**Location:** `client/src/core/3d/CinematicScene.tsx`

**Features:**
- Custom GLSL shaders (vertex + fragment)
- Simplex noise for organic motion
- Particle system with 1000 particles
- Post-processing effects:
  - Bloom
  - Chromatic Aberration
  - Vignette
- Mouse-interactive camera
- Performance-adaptive rendering

**Usage:**
```tsx
import CinematicScene from '@/core/3d/CinematicScene';

function Hero() {
  return (
    <div className="hero">
      <CinematicScene />
      {/* Your content */}
    </div>
  );
}
```

**Performance:**
- Adaptive pixel ratio (1-2x)
- Performance degradation threshold: 0.5
- Fixed positioning for parallax effect

---

### 4. AI Orchestration (`AIOrchestrator`)

**Location:** `client/src/core/ai/AIOrchestrator.ts`

**Features:**
- Multi-provider support:
  - **Google Gemini** (Free, priority 1)
  - **Replicate** (Free tier, priority 2)
  - **Fal.ai** (via Cloudflare Worker, priority 3)
- Automatic fallback on failure
- Per-provider rate limiting
- Response caching with TTL
- Cost optimization
- Error recovery

**Usage:**
```typescript
import AIOrchestrator from '@/core/ai/AIOrchestrator';

const ai = AIOrchestrator.getInstance();

const result = await ai.generate({
  prompt: 'A cinematic sunset over mountains',
  model: 'gemini-1.5-flash',
});

console.log('Provider:', result.provider);
console.log('Latency:', result.latency, 'ms');
console.log('Cached:', result.cached);
```

**Cache Statistics:**
```typescript
const stats = ai.getCacheStats();
// { size: 45, totalHits: 123, avgAge: 1234567 }
```

---

### 5. Micro-interactions (`MicroInteractions`)

**Location:** `client/src/core/interactions/MicroInteractions.ts`

**Features:**
- Custom cursor with smooth following
- Magnetic button effects
- Scroll-triggered animations
- Hover effects (lift, glow, scale)
- Cinematic page transitions
- Optional sound effects

**Usage:**
```typescript
import MicroInteractions from '@/core/interactions/MicroInteractions';

const interactions = MicroInteractions.getInstance();

// Page transition
await interactions.transition('fade', 0.5);

// Enable sounds
interactions.toggleSound(true);
interactions.playSound('click');
```

**HTML Attributes:**
```html
<!-- Magnetic button -->
<button data-magnetic>Click me</button>

<!-- Hover effects -->
<div data-hover-lift>Lifts on hover</div>
<div data-hover-glow>Glows on hover</div>
<div data-hover-scale>Scales on hover</div>

<!-- Scroll animations -->
<div data-scroll-animation="fade">Fades in</div>
<div data-scroll-animation="slide">Slides in</div>
```

---

### 6. Advanced Analytics (`AdvancedAnalytics`)

**Location:** `client/src/core/analytics/AdvancedAnalytics.ts`

**Features:**
- Custom event tracking
- User journey mapping
- Scroll depth tracking
- Time on page tracking
- Conversion goal tracking
- A/B testing support
- Privacy-compliant
- Multi-provider support (GA4, Clarity, custom)

**Usage:**
```typescript
import AdvancedAnalytics from '@/core/analytics/AdvancedAnalytics';

const analytics = AdvancedAnalytics.getInstance();

// Track event
analytics.track({
  category: 'Portfolio',
  action: 'Project View',
  label: 'AI Commercial Project',
  value: 1,
});

// Define conversion goal
analytics.defineConversionGoal({
  id: 'contact_form',
  name: 'Contact Form Submission',
  trigger: (event) => event.action === 'Form Submit',
  value: 100,
});

// Get journey
const journey = analytics.getJourney();
```

**Automatic Tracking:**
- ✅ Page views
- ✅ Clicks (with element identification)
- ✅ Scroll depth (25%, 50%, 75%, 100%)
- ✅ Time on page (every 30s + on exit)

---

## 🚀 Integration Layer

**Location:** `client/src/core/EnterpriseCore.ts`

The `EnterpriseCore` class orchestrates all systems.

### Quick Start

```typescript
import EnterpriseCore from '@/core/EnterpriseCore';

// Initialize all systems
const core = EnterpriseCore.getInstance();

await core.initialize({
  performance: {
    monitoring: true,
    resourceHints: true,
  },
  ai: {
    enabled: true,
  },
  interactions: {
    cursor: true,
    magnetic: true,
  },
  analytics: {
    enabled: true,
    goals: [
      {
        id: 'hire_me',
        name: 'Hire Me Click',
        trigger: (e) => e.label?.includes('Hire'),
        value: 500,
      },
    ],
  },
});

// Access individual systems
const ai = core.getAI();
const analytics = core.getAnalytics();
const interactions = core.getInteractions();

// Get system status
const status = core.getStatus();
console.log(status);
```

### App.tsx Integration

```tsx
import { useEffect } from 'react';
import EnterpriseCore from '@/core/EnterpriseCore';

function App() {
  useEffect(() => {
    const core = EnterpriseCore.getInstance();
    
    core.initialize({
      // your config
    }).then(() => {
      console.log('Enterprise systems ready!');
    });
    
    return () => {
      core.destroy();
    };
  }, []);
  
  return <YourApp />;
}
```

---

## 📊 Performance Metrics

### Target Scores

| Metric | Target | Current |
|--------|--------|--------|
| Lighthouse Performance | 95+ | TBD |
| Lighthouse Accessibility | 95+ | TBD |
| Lighthouse Best Practices | 95+ | TBD |
| Lighthouse SEO | 95+ | TBD |
| Bundle Size (gzipped) | < 150KB | TBD |
| First Contentful Paint | < 1.5s | TBD |
| Largest Contentful Paint | < 2.0s | TBD |
| Time to Interactive | < 3.0s | TBD |

### Optimization Techniques

- ✅ Code splitting with React.lazy()
- ✅ Tree shaking (Vite optimized)
- ✅ Image optimization (WebP/AVIF)
- ✅ Font preloading
- ✅ Critical CSS inline
- ✅ Service Worker caching
- ✅ Resource hints (prefetch/preload)
- ✅ Compression (Brotli/Gzip)

---

## 🔒 Security

### Headers (netlify.toml)

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
    Content-Security-Policy = "default-src 'self'; ..."
```

### Best Practices

- ✅ HTTPS enforced
- ✅ CSP headers configured
- ✅ No eval() or inline scripts
- ✅ Sanitized user inputs
- ✅ Rate limiting on AI endpoints
- ✅ API keys in environment variables

---

## 🛠️ Development

### Commands

```bash
# Development
pnpm dev

# Type check
pnpm check

# Build
pnpm build

# Lighthouse CI
pnpm lighthouse

# Bundle analysis
pnpm analyze
```

### Environment Variables

```env
# AI Providers
VITE_GEMINI_API_KEY=your_key_here
VITE_REPLICATE_API_KEY=your_key_here
VITE_CLOUDFLARE_WORKER_URL=your_worker_url

# Analytics
VITE_ANALYTICS_ENDPOINT=your_endpoint
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# CDN
VITE_CDN_URL=https://cdn.example.com
```

---

## 📚 Resources

- [Web Vitals](https://web.dev/vitals/)
- [Three.js Documentation](https://threejs.org/docs/)
- [GSAP Documentation](https://greensock.com/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [Google Gemini API](https://ai.google.dev/)

---

## 👥 Support

For issues or questions:
- GitHub Issues: [Create an issue](https://github.com/DANVERSE01/mohamed-adel-portfolio/issues)
- Email: mohamed.adel1160@icloud.com

---

**Built with ❤️ using Enterprise-Grade Architecture**