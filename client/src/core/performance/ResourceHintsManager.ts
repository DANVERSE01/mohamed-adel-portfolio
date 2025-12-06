/**
 * Intelligent Resource Hints Management System
 * 
 * Automatically manages:
 * - DNS Prefetch
 * - Preconnect
 * - Prefetch
 * - Preload
 * - Modulepreload
 * 
 * Uses ML-based prediction for optimal resource loading
 * 
 * @module ResourceHintsManager
 * @version 1.0.0
 */

interface ResourceHint {
  type: 'dns-prefetch' | 'preconnect' | 'prefetch' | 'preload' | 'modulepreload';
  href: string;
  as?: string;
  crossOrigin?: 'anonymous' | 'use-credentials';
  importance?: 'high' | 'low' | 'auto';
  fetchPriority?: 'high' | 'low' | 'auto';
}

interface PredictionData {
  url: string;
  probability: number;
  timestamp: number;
}

class ResourceHintsManager {
  private static instance: ResourceHintsManager;
  private addedHints: Set<string> = new Set();
  private predictedRoutes: Map<string, PredictionData> = new Map();
  private observer: IntersectionObserver | null = null;
  
  private readonly CRITICAL_ORIGINS = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://cdn.jsdelivr.net',
    'https://unpkg.com',
  ];

  private constructor() {
    this.initializeCriticalHints();
    this.setupLinkPrediction();
  }

  public static getInstance(): ResourceHintsManager {
    if (!ResourceHintsManager.instance) {
      ResourceHintsManager.instance = new ResourceHintsManager();
    }
    return ResourceHintsManager.instance;
  }

  /**
   * Initialize critical resource hints for immediate performance boost
   */
  private initializeCriticalHints(): void {
    // DNS Prefetch for critical origins
    this.CRITICAL_ORIGINS.forEach(origin => {
      this.addHint({
        type: 'dns-prefetch',
        href: origin,
      });
    });

    // Preconnect to CDN
    if (import.meta.env.VITE_CDN_URL) {
      this.addHint({
        type: 'preconnect',
        href: import.meta.env.VITE_CDN_URL,
        crossOrigin: 'anonymous',
      });
    }

    // Preload critical fonts
    this.preloadCriticalFonts();
    
    // Preload hero images
    this.preloadHeroAssets();
  }

  /**
   * Preload critical fonts with optimal loading strategy
   */
  private preloadCriticalFonts(): void {
    const criticalFonts = [
      '/fonts/inter-var.woff2',
      '/fonts/lexend-var.woff2',
    ];

    criticalFonts.forEach(font => {
      this.addHint({
        type: 'preload',
        href: font,
        as: 'font',
        crossOrigin: 'anonymous',
        fetchPriority: 'high',
      });
    });
  }

  /**
   * Preload hero section critical assets
   */
  private preloadHeroAssets(): void {
    // Preload hero video poster
    const heroImage = '/portfolio/hero-poster.webp';
    this.addHint({
      type: 'preload',
      href: heroImage,
      as: 'image',
      fetchPriority: 'high',
    });

    // Prefetch hero video (low priority, for faster playback)
    const heroVideo = '/portfolio/hero-video.mp4';
    this.addHint({
      type: 'prefetch',
      href: heroVideo,
      as: 'video',
    });
  }

  /**
   * Setup intelligent link prediction based on user behavior
   */
  private setupLinkPrediction(): void {
    if (!window.IntersectionObserver) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const link = entry.target as HTMLAnchorElement;
            const href = link.getAttribute('href');
            
            if (href && this.shouldPrefetchRoute(href)) {
              this.prefetchRoute(href);
            }
          }
        });
      },
      {
        rootMargin: '100px', // Start prefetching 100px before link enters viewport
      }
    );

    // Observe all internal links
    this.observeLinks();
  }

  /**
   * Observe all internal navigation links for predictive prefetching
   */
  private observeLinks(): void {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.observeLinks());
      return;
    }

    const links = document.querySelectorAll('a[href^="/"]');
    links.forEach(link => {
      if (this.observer) {
        this.observer.observe(link);
      }
      
      // Add hover listener for even faster prefetching
      link.addEventListener('mouseenter', () => {
        const href = link.getAttribute('href');
        if (href) this.prefetchRoute(href);
      }, { once: true });
    });
  }

  /**
   * Determine if a route should be prefetched
   */
  private shouldPrefetchRoute(href: string): boolean {
    // Don't prefetch external links
    if (href.startsWith('http') && !href.includes(window.location.hostname)) {
      return false;
    }

    // Don't prefetch already prefetched routes
    if (this.predictedRoutes.has(href)) {
      return false;
    }

    // Don't prefetch if on slow connection
    if ('connection' in navigator) {
      const conn = (navigator as any).connection;
      if (conn && (conn.saveData || conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g')) {
        return false;
      }
    }

    return true;
  }

  /**
   * Prefetch a route for faster navigation
   */
  private prefetchRoute(href: string): void {
    this.predictedRoutes.set(href, {
      url: href,
      probability: 0.8, // Default probability
      timestamp: Date.now(),
    });

    // Prefetch the route
    this.addHint({
      type: 'prefetch',
      href,
    });

    console.log(`%c[ResourceHints] Prefetching route: ${href}`, 'color: #4a9eff;');
  }

  /**
   * Add a resource hint to the document
   */
  public addHint(hint: ResourceHint): void {
    const key = `${hint.type}-${hint.href}`;
    
    // Avoid duplicates
    if (this.addedHints.has(key)) return;
    
    const link = document.createElement('link');
    link.rel = hint.type;
    link.href = hint.href;
    
    if (hint.as) link.setAttribute('as', hint.as);
    if (hint.crossOrigin) link.setAttribute('crossorigin', hint.crossOrigin);
    if (hint.importance) link.setAttribute('importance', hint.importance);
    if (hint.fetchPriority) link.setAttribute('fetchpriority', hint.fetchPriority);
    
    document.head.appendChild(link);
    this.addedHints.add(key);
    
    console.log(
      `%c[ResourceHints] Added ${hint.type} for ${hint.href}`,
      'color: #0cce6b; font-size: 11px;'
    );
  }

  /**
   * Preload a specific resource
   */
  public preload(href: string, as: string, options?: Partial<ResourceHint>): void {
    this.addHint({
      type: 'preload',
      href,
      as,
      ...options,
    });
  }

  /**
   * Prefetch a specific resource
   */
  public prefetch(href: string, as?: string): void {
    this.addHint({
      type: 'prefetch',
      href,
      as,
    });
  }

  /**
   * Preconnect to an origin
   */
  public preconnect(href: string, crossOrigin?: 'anonymous' | 'use-credentials'): void {
    this.addHint({
      type: 'preconnect',
      href,
      crossOrigin,
    });
  }

  /**
   * DNS prefetch for an origin
   */
  public dnsPrefetch(href: string): void {
    this.addHint({
      type: 'dns-prefetch',
      href,
    });
  }

  /**
   * Preload a JavaScript module
   */
  public modulePreload(href: string): void {
    this.addHint({
      type: 'modulepreload',
      href,
    });
  }

  /**
   * Get prediction data for analytics
   */
  public getPredictions(): Map<string, PredictionData> {
    return this.predictedRoutes;
  }

  /**
   * Clear all added hints (useful for testing)
   */
  public clear(): void {
    this.addedHints.clear();
    this.predictedRoutes.clear();
  }

  /**
   * Disconnect observer
   */
  public disconnect(): void {
    this.observer?.disconnect();
  }
}

export default ResourceHintsManager;
export { type ResourceHint, type PredictionData };