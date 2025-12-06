/**
 * Enterprise-Grade Web Vitals Monitoring System
 * 
 * Tracks and reports Core Web Vitals with advanced features:
 * - Real-time monitoring
 * - Performance budgets
 * - Anomaly detection
 * - Custom analytics integration
 * 
 * @module WebVitalsMonitor
 * @version 1.0.0
 */

import { onCLS, onFCP, onFID, onLCP, onTTFB, Metric } from 'web-vitals';

interface PerformanceThresholds {
  CLS: { good: number; needsImprovement: number };
  FCP: { good: number; needsImprovement: number };
  FID: { good: number; needsImprovement: number };
  LCP: { good: number; needsImprovement: number };
  TTFB: { good: number; needsImprovement: number };
}

interface PerformanceBudget {
  maxBundleSize: number; // KB
  maxImageSize: number; // KB
  maxFonts: number;
  maxRequests: number;
}

interface MonitorConfig {
  enableReporting: boolean;
  reportEndpoint?: string;
  sampleRate: number; // 0-1
  enableConsoleLog: boolean;
  thresholds?: Partial<PerformanceThresholds>;
  budget?: Partial<PerformanceBudget>;
}

class WebVitalsMonitor {
  private static instance: WebVitalsMonitor;
  private config: MonitorConfig;
  private metrics: Map<string, Metric> = new Map();
  private performanceObserver: PerformanceObserver | null = null;
  
  private readonly DEFAULT_THRESHOLDS: PerformanceThresholds = {
    CLS: { good: 0.1, needsImprovement: 0.25 },
    FCP: { good: 1800, needsImprovement: 3000 },
    FID: { good: 100, needsImprovement: 300 },
    LCP: { good: 2500, needsImprovement: 4000 },
    TTFB: { good: 800, needsImprovement: 1800 },
  };

  private readonly DEFAULT_BUDGET: PerformanceBudget = {
    maxBundleSize: 200, // 200KB
    maxImageSize: 150, // 150KB
    maxFonts: 4,
    maxRequests: 50,
  };

  private constructor(config: MonitorConfig) {
    this.config = {
      ...config,
      thresholds: { ...this.DEFAULT_THRESHOLDS, ...config.thresholds },
      budget: { ...this.DEFAULT_BUDGET, ...config.budget },
    };
    
    this.initializeMonitoring();
  }

  public static getInstance(config?: MonitorConfig): WebVitalsMonitor {
    if (!WebVitalsMonitor.instance) {
      WebVitalsMonitor.instance = new WebVitalsMonitor(
        config || {
          enableReporting: true,
          sampleRate: 1,
          enableConsoleLog: import.meta.env.DEV,
        }
      );
    }
    return WebVitalsMonitor.instance;
  }

  private initializeMonitoring(): void {
    // Monitor Core Web Vitals
    this.monitorCoreWebVitals();
    
    // Monitor Resource Loading
    this.monitorResourceLoading();
    
    // Monitor Long Tasks
    this.monitorLongTasks();
    
    // Monitor Memory (if available)
    this.monitorMemory();
    
    // Check Performance Budget
    this.checkPerformanceBudget();
  }

  private monitorCoreWebVitals(): void {
    const handleMetric = (metric: Metric) => {
      // Sample rate check
      if (Math.random() > this.config.sampleRate) return;
      
      this.metrics.set(metric.name, metric);
      
      const rating = this.getRating(metric);
      const threshold = this.config.thresholds![metric.name as keyof PerformanceThresholds];
      
      if (this.config.enableConsoleLog) {
        console.log(
          `%c[WebVitals] ${metric.name}: ${metric.value.toFixed(2)}ms - ${rating}`,
          `color: ${this.getRatingColor(rating)}; font-weight: bold;`
        );
      }
      
      // Alert if metric exceeds threshold
      if (rating === 'poor') {
        this.handlePoorMetric(metric, threshold);
      }
      
      // Report to analytics
      if (this.config.enableReporting) {
        this.reportMetric(metric, rating);
      }
    };

    onCLS(handleMetric);
    onFCP(handleMetric);
    onFID(handleMetric);
    onLCP(handleMetric);
    onTTFB(handleMetric);
  }

  private monitorResourceLoading(): void {
    if (!window.PerformanceObserver) return;
    
    this.performanceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource') {
          const resource = entry as PerformanceResourceTiming;
          
          // Check for slow resources
          if (resource.duration > 1000) {
            console.warn(`Slow resource detected: ${resource.name} (${resource.duration}ms)`);
          }
          
          // Check resource size (if available)
          if (resource.transferSize) {
            const sizeKB = resource.transferSize / 1024;
            
            if (resource.initiatorType === 'img' && sizeKB > this.config.budget!.maxImageSize!) {
              console.warn(`Large image detected: ${resource.name} (${sizeKB.toFixed(2)}KB)`);
            }
          }
        }
      }
    });
    
    this.performanceObserver.observe({ entryTypes: ['resource', 'navigation'] });
  }

  private monitorLongTasks(): void {
    if (!window.PerformanceObserver) return;
    
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const longTask = entry as PerformanceEntry;
          
          console.warn(
            `%c[Long Task] ${longTask.duration.toFixed(2)}ms at ${longTask.startTime.toFixed(2)}ms`,
            'color: #ff6b6b; font-weight: bold;'
          );
          
          // Report long tasks for optimization
          if (this.config.enableReporting) {
            this.reportLongTask(longTask);
          }
        }
      });
      
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // Long Tasks API not supported
    }
  }

  private monitorMemory(): void {
    if (!('memory' in performance)) return;
    
    setInterval(() => {
      const memory = (performance as any).memory;
      const usedMB = memory.usedJSHeapSize / 1048576;
      const limitMB = memory.jsHeapSizeLimit / 1048576;
      const percentUsed = (usedMB / limitMB) * 100;
      
      if (percentUsed > 90) {
        console.warn(
          `%c[Memory] High memory usage: ${usedMB.toFixed(2)}MB / ${limitMB.toFixed(2)}MB (${percentUsed.toFixed(1)}%)`,
          'color: #ff6b6b; font-weight: bold;'
        );
      }
    }, 30000); // Check every 30s
  }

  private checkPerformanceBudget(): void {
    if (!window.performance || !window.performance.getEntriesByType) return;
    
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    
    // Check total requests
    if (resources.length > this.config.budget!.maxRequests!) {
      console.warn(
        `%c[Budget] Too many requests: ${resources.length} (limit: ${this.config.budget!.maxRequests})`,
        'color: #ffa500; font-weight: bold;'
      );
    }
    
    // Check font count
    const fonts = resources.filter(r => r.initiatorType === 'css' || r.name.includes('.woff'));
    if (fonts.length > this.config.budget!.maxFonts!) {
      console.warn(
        `%c[Budget] Too many fonts: ${fonts.length} (limit: ${this.config.budget!.maxFonts})`,
        'color: #ffa500; font-weight: bold;'
      );
    }
  }

  private getRating(metric: Metric): 'good' | 'needs-improvement' | 'poor' {
    const threshold = this.config.thresholds![metric.name as keyof PerformanceThresholds];
    
    if (metric.value <= threshold.good) return 'good';
    if (metric.value <= threshold.needsImprovement) return 'needs-improvement';
    return 'poor';
  }

  private getRatingColor(rating: string): string {
    switch (rating) {
      case 'good': return '#0cce6b';
      case 'needs-improvement': return '#ffa500';
      case 'poor': return '#ff4e42';
      default: return '#999';
    }
  }

  private handlePoorMetric(metric: Metric, threshold: any): void {
    console.error(
      `%c[WebVitals] Poor ${metric.name}! Value: ${metric.value.toFixed(2)}, Threshold: ${threshold.needsImprovement}`,
      'color: #ff4e42; font-weight: bold; font-size: 14px;'
    );
    
    // Suggest optimizations
    this.suggestOptimization(metric.name);
  }

  private suggestOptimization(metricName: string): void {
    const suggestions: Record<string, string> = {
      CLS: 'Add explicit width/height to images, avoid inserting content above existing content',
      FCP: 'Reduce render-blocking resources, optimize critical rendering path',
      FID: 'Reduce JavaScript execution time, break up long tasks',
      LCP: 'Optimize images, improve server response time, use CDN',
      TTFB: 'Optimize server-side processing, use CDN, enable HTTP/2',
    };
    
    console.info(
      `%c[Optimization Tip] ${suggestions[metricName] || 'Check performance best practices'}`,
      'color: #4a9eff; font-style: italic;'
    );
  }

  private reportMetric(metric: Metric, rating: string): void {
    // Send to analytics endpoint
    if (this.config.reportEndpoint) {
      fetch(this.config.reportEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metric: metric.name,
          value: metric.value,
          rating,
          id: metric.id,
          timestamp: Date.now(),
          url: window.location.href,
          userAgent: navigator.userAgent,
        }),
        keepalive: true,
      }).catch(console.error);
    }
    
    // Send to Google Analytics (if available)
    if (typeof gtag !== 'undefined') {
      gtag('event', metric.name, {
        event_category: 'Web Vitals',
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_label: metric.id,
        non_interaction: true,
      });
    }
  }

  private reportLongTask(task: PerformanceEntry): void {
    if (this.config.reportEndpoint) {
      fetch(this.config.reportEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'longtask',
          duration: task.duration,
          startTime: task.startTime,
          timestamp: Date.now(),
          url: window.location.href,
        }),
        keepalive: true,
      }).catch(console.error);
    }
  }

  public getMetrics(): Map<string, Metric> {
    return this.metrics;
  }

  public getMetric(name: string): Metric | undefined {
    return this.metrics.get(name);
  }

  public disconnect(): void {
    this.performanceObserver?.disconnect();
  }
}

export default WebVitalsMonitor;
export { type MonitorConfig, type PerformanceThresholds, type PerformanceBudget };