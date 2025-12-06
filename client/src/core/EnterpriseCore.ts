/**
 * Enterprise Core Integration Layer
 * 
 * Central orchestrator for all enterprise systems:
 * - Performance monitoring
 * - Resource hints
 * - 3D experiences
 * - AI orchestration
 * - Micro-interactions
 * - Analytics
 * 
 * @module EnterpriseCore
 * @version 1.0.0
 */

import WebVitalsMonitor from './performance/WebVitalsMonitor';
import ResourceHintsManager from './performance/ResourceHintsManager';
import AIOrchestrator from './ai/AIOrchestrator';
import MicroInteractions from './interactions/MicroInteractions';
import AdvancedAnalytics from './analytics/AdvancedAnalytics';

interface EnterpriseConfig {
  performance?: {
    monitoring?: boolean;
    resourceHints?: boolean;
    budgets?: any;
  };
  ai?: {
    enabled?: boolean;
    providers?: string[];
  };
  interactions?: {
    cursor?: boolean;
    magnetic?: boolean;
    sounds?: boolean;
  };
  analytics?: {
    enabled?: boolean;
    goals?: any[];
  };
}

class EnterpriseCore {
  private static instance: EnterpriseCore;
  private initialized: boolean = false;
  
  // Core systems
  private webVitals: WebVitalsMonitor | null = null;
  private resourceHints: ResourceHintsManager | null = null;
  private ai: AIOrchestrator | null = null;
  private interactions: MicroInteractions | null = null;
  private analytics: AdvancedAnalytics | null = null;
  
  private constructor() {}
  
  public static getInstance(): EnterpriseCore {
    if (!EnterpriseCore.instance) {
      EnterpriseCore.instance = new EnterpriseCore();
    }
    return EnterpriseCore.instance;
  }
  
  /**
   * Initialize all enterprise systems
   */
  public async initialize(config: EnterpriseConfig = {}): Promise<void> {
    if (this.initialized) {
      console.warn('[EnterpriseCore] Already initialized');
      return;
    }
    
    console.log(
      '%c🚀 Initializing Enterprise Systems...',
      'color: #4a9eff; font-size: 16px; font-weight: bold;'
    );
    
    try {
      // 1. Performance Monitoring
      if (config.performance?.monitoring !== false) {
        this.webVitals = WebVitalsMonitor.getInstance({
          enableReporting: true,
          sampleRate: 1,
          enableConsoleLog: import.meta.env.DEV,
        });
        console.log('%c✅ Performance monitoring active', 'color: #0cce6b;');
      }
      
      // 2. Resource Hints
      if (config.performance?.resourceHints !== false) {
        this.resourceHints = ResourceHintsManager.getInstance();
        console.log('%c✅ Resource hints optimized', 'color: #0cce6b;');
      }
      
      // 3. AI Orchestration
      if (config.ai?.enabled !== false) {
        this.ai = AIOrchestrator.getInstance();
        console.log('%c✅ AI systems ready', 'color: #0cce6b;');
      }
      
      // 4. Micro-interactions
      if (config.interactions?.cursor !== false) {
        this.interactions = MicroInteractions.getInstance();
        console.log('%c✅ Micro-interactions enabled', 'color: #0cce6b;');
      }
      
      // 5. Analytics
      if (config.analytics?.enabled !== false) {
        this.analytics = AdvancedAnalytics.getInstance();
        
        // Define conversion goals
        if (config.analytics?.goals) {
          config.analytics.goals.forEach(goal => {
            this.analytics!.defineConversionGoal(goal);
          });
        }
        
        console.log('%c✅ Analytics tracking active', 'color: #0cce6b;');
      }
      
      this.initialized = true;
      
      console.log(
        '%c🎉 Enterprise Systems Initialized!',
        'color: #0cce6b; font-size: 16px; font-weight: bold;'
      );
      
      // Log system info
      this.logSystemInfo();
      
    } catch (error) {
      console.error('[EnterpriseCore] Initialization failed:', error);
      throw error;
    }
  }
  
  /**
   * Get Web Vitals Monitor
   */
  public getWebVitals(): WebVitalsMonitor | null {
    return this.webVitals;
  }
  
  /**
   * Get Resource Hints Manager
   */
  public getResourceHints(): ResourceHintsManager | null {
    return this.resourceHints;
  }
  
  /**
   * Get AI Orchestrator
   */
  public getAI(): AIOrchestrator | null {
    return this.ai;
  }
  
  /**
   * Get Micro-interactions
   */
  public getInteractions(): MicroInteractions | null {
    return this.interactions;
  }
  
  /**
   * Get Analytics
   */
  public getAnalytics(): AdvancedAnalytics | null {
    return this.analytics;
  }
  
  /**
   * Log system information
   */
  private logSystemInfo(): void {
    const info = {
      performance: {
        connection: (navigator as any).connection?.effectiveType || 'unknown',
        memory: (performance as any).memory ? {
          used: `${((performance as any).memory.usedJSHeapSize / 1048576).toFixed(2)}MB`,
          limit: `${((performance as any).memory.jsHeapSizeLimit / 1048576).toFixed(2)}MB`,
        } : 'N/A',
        deviceMemory: (navigator as any).deviceMemory ? `${(navigator as any).deviceMemory}GB` : 'unknown',
      },
      browser: {
        userAgent: navigator.userAgent,
        language: navigator.language,
        online: navigator.onLine,
      },
      screen: {
        width: window.screen.width,
        height: window.screen.height,
        dpr: window.devicePixelRatio,
      },
    };
    
    console.table(info.performance);
    console.log('%c[System Info]', 'color: #4a9eff; font-weight: bold;', info);
  }
  
  /**
   * Get comprehensive system status
   */
  public getStatus() {
    return {
      initialized: this.initialized,
      systems: {
        performance: {
          monitoring: !!this.webVitals,
          resourceHints: !!this.resourceHints,
        },
        ai: {
          enabled: !!this.ai,
        },
        interactions: {
          enabled: !!this.interactions,
        },
        analytics: {
          enabled: !!this.analytics,
        },
      },
      metrics: this.webVitals ? {
        vitals: Array.from(this.webVitals.getMetrics().entries()),
      } : null,
      cache: this.ai ? this.ai.getCacheStats() : null,
    };
  }
  
  /**
   * Cleanup all systems
   */
  public destroy(): void {
    this.webVitals?.disconnect();
    this.resourceHints?.disconnect();
    this.interactions?.destroy();
    
    this.initialized = false;
    console.log('%c[EnterpriseCore] Systems destroyed', 'color: #ffa500;');
  }
}

export default EnterpriseCore;
export { type EnterpriseConfig };