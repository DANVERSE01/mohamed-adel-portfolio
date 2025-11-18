# Mohamed Adel - Portfolio

Modern, responsive portfolio website showcasing AI-powered creative work, built with cutting-edge web technologies.

## 🚀 Features

- ⚡ **React 19** with TypeScript for type-safe development
- 🎨 **Tailwind CSS 4** for modern, utility-first styling
- ✨ **Framer Motion** for smooth, professional animations
- 🌓 **Dark/Light Mode** with persistent theme switching
- 📱 **Fully Responsive** design for all devices
- 🎯 **Glassmorphism UI** with modern visual effects
- 🎬 **Video Portfolio** with 101 creative projects
- ⚡ **Code Splitting** for optimized performance
- 🔍 **SEO Optimized** with meta tags and sitemap

## 📋 Prerequisites

- **Node.js** 18+ or **Bun**
- **pnpm** (recommended) or npm

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/[username]/mohamed-adel-portfolio.git
cd mohamed-adel-portfolio

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env
# Edit .env with your values if needed
```

## 💻 Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Type check
pnpm check

# Format code
pnpm format
```

## 🌍 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_APP_LOGO=/logo-ma-arabic-v2.png
VITE_APP_TITLE=Mohamed Adel - Creative Director & AI Strategist
VITE_ANALYTICS_ENDPOINT=
VITE_ANALYTICS_WEBSITE_ID=
```

## 📦 Build

```bash
pnpm build
```

The build output will be in the `dist/public` directory, ready for deployment.

## 🚀 Deployment

### Netlify (Recommended)

1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - **Build command:** `pnpm build`
   - **Publish directory:** `dist/public`
3. Add environment variables in Netlify dashboard (if needed)
4. Deploy!

### Vercel

```bash
vercel --prod
```

### Manual Deployment

After building, upload the contents of `dist/public` to any static hosting service.

## 📁 Project Structure

```
mohamed-adel-portfolio/
├── client/
│   ├── public/              # Static assets
│   │   ├── portfolio/       # Portfolio images & videos
│   │   └── *.mp4           # Hero videos
│   └── src/
│       ├── components/      # React components
│       ├── contexts/        # React contexts (Theme)
│       ├── data/           # Portfolio data
│       ├── hooks/          # Custom hooks
│       ├── pages/          # Page components
│       └── lib/            # Utilities
├── server/                 # Express server (optional)
├── shared/                 # Shared constants
├── .env                    # Environment variables
├── netlify.toml           # Netlify configuration
└── vite.config.ts         # Vite configuration
```

## 🛠️ Tech Stack

### Core
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server

### Styling
- **Tailwind CSS 4** - Utility-first CSS
- **Framer Motion** - Animations
- **Radix UI** - Accessible components

### Routing & State
- **Wouter** - Lightweight routing
- **Zustand** - State management

### 3D Graphics
- **Three.js** - 3D rendering
- **React Three Fiber** - React renderer for Three.js

## 🎨 Customization

### Colors

Edit `client/src/index.css` to customize the color scheme:

```css
:root {
  --primary: oklch(0.45 0.20 250);    /* Deep Sapphire Blue */
  --secondary: oklch(0.50 0.25 300);  /* Royal Purple */
  --accent: oklch(0.75 0.15 85);      /* Soft Gold */
  /* ... */
}
```

### Content

- **Owner Info:** Edit `shared/const.ts`
- **Portfolio Items:** Edit `client/src/data/portfolio.ts`
- **Services:** Edit `shared/const.ts` → `SERVICES`

### Fonts

Fonts are loaded from Google Fonts in `client/index.html`. To change fonts, update the import and CSS in `client/src/index.css`.

## 📊 Performance

- **Bundle Size:** ~162KB gzipped (with code splitting)
- **Lighthouse Score:** 90+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint:** < 2s
- **Time to Interactive:** < 3.5s

## 🔒 Security

- HTTPS enforced
- Security headers configured in `netlify.toml`
- No sensitive data in client-side code
- Environment variables for configuration

## 📝 License

MIT License - feel free to use this project for your own portfolio!

## 👤 Author

**Mohamed Adel**
- Creative Director & AI Strategist
- Email: mohamed.adel1160@icloud.com
- Instagram: [@muhammedd_adel](https://instagram.com/muhammedd_adel)
- Location: Alexandria, Egypt

## 🙏 Acknowledgments

- Built with [Manus AI](https://manus.im)
- Design inspired by modern creative portfolios
- Icons from [Lucide](https://lucide.dev)

## 🐛 Issues & Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Made with ❤️ and AI**

## 🤖 DANVERSE AI Chat Feature

This portfolio now includes an interactive AI image generation feature accessible at the `/ai` route. This feature allows users to generate hyper-realistic advertising images using a secure Cloudflare Worker proxy to the Fal.ai Flux Pro model.

### 🚀 Key Features & Optimizations

*   **Code Splitting:** The AI component is lazy-loaded to prevent performance degradation on the main pages.
*   **Image Lazy Loading:** Generated images use a custom `ImageLoader` component with a loading placeholder to improve perceived performance (TTI/FCP).
*   **Secure Proxy (Cloudflare Worker):**
    *   **Origin Check:** Only requests from `https://danverse.ai` are permitted.
    *   **Rate Limiting:** Implements a basic rate limit (200 requests/minute per IP) using a Cloudflare KV Namespace (`RATE_LIMITER`) to prevent abuse.
    *   **Content Filtering:** Basic filtering for banned keywords (nude, sex, bomb, etc.).

### ⚙️ Deployment Instructions for the Worker

The code for the secure proxy is located at `danverse-ai-chat/danverse-proxy.js`. To deploy it:

1.  **Create a Cloudflare Worker:** Deploy the code in `danverse-ai-chat/danverse-proxy.js` to a new Cloudflare Worker.
2.  **Set Environment Variables:**
    *   **Secret:** Set a secret environment variable named `FAL_API_KEY` with your Fal.ai API key.
    *   **KV Binding:** Bind a KV Namespace to the Worker with the name `RATE_LIMITER` (this is required for the rate limiting feature).
3.  **Update Frontend:** After deployment, update the `proxyUrl` variable in `src/pages/AI.jsx` (around line 36) with the actual URL of your deployed Worker.
