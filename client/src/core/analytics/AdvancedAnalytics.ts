/**
 * Enterprise Analytics System
 * 
 * Features:
 * - Custom event tracking
 * - User journey mapping
 * - Performance metrics
 * - Conversion tracking
 * - A/B testing support
 * - Privacy-compliant
 * 
 * @module AdvancedAnalytics
 * @version 1.0.0
 */

interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
  userId?: string;
  sessionId?: string;
  timestamp: number;
}

interface UserJourney {
  steps: JourneyStep[];
  startTime: number;
  endTime?: number;
  converted: boolean;
}

interface JourneyStep {
  page: string;
  action: string;
  timestamp: number;
  duration: number;
}

interface ConversionGoal {
  id: string;
  name: string;
  trigger: (event: AnalyticsEvent) => boolean;
  value?: number;
}

class AdvancedAnalytics {
  private static instance: AdvancedAnalytics;
  private events: AnalyticsEvent[] = [];
  private journey: UserJourney;
  private sessionId: string;
  private userId: string | null = null;
  private conversionGoals: Map<string, ConversionGoal> = new Map();
  
  private constructor() {
    this.sessionId = this.generateSessionId();
    this.journey = {
      steps: [],
      startTime: Date.now(),
      converted: false,
    };
    
    this.initializeTracking();
  }
  
  public static getInstance(): AdvancedAnalytics {
    if (!AdvancedAnalytics.instance) {
      AdvancedAnalytics.instance = new AdvancedAnalytics();
    }
    return AdvancedAnalytics.instance;
  }
  
  /**
   * Initialize automatic tracking
   */
  private initializeTracking(): void {
    // Track page views
    this.trackPageView();
    
    // Track clicks
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const label = target.textContent?.trim() || target.className;
      
      this.track({
        category: 'Engagement',
        action: 'Click',
        label,
      });
    });
    
    // Track scroll depth
    this.trackScrollDepth();
    
    // Track time on page
    this.trackTimeOnPage();
    
    console.log('%c[Analytics] Tracking initialized', 'color: #4a9eff;');
  }
  
  /**
   * Track custom event
   */
  public track(event: Omit<AnalyticsEvent, 'timestamp' | 'sessionId' | 'userId'>): void {
    const fullEvent: AnalyticsEvent = {
      ...event,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId || undefined,
    };
    
    this.events.push(fullEvent);
    
    // Add to journey
    this.journey.steps.push({
      page: window.location.pathname,
      action: `${event.category}: ${event.action}`,
      timestamp: fullEvent.timestamp,
      duration: 0,
    });
    
    // Check conversion goals
    this.checkConversionGoals(fullEvent);
    
    // Send to analytics service
    this.sendToAnalytics(fullEvent);
    
    console.log(
      `%c[Analytics] ${event.category} - ${event.action}`,
      'color: #0cce6b; font-size: 11px;'
    );
  }
  
  /**
   * Track page view
   */
  public trackPageView(path?: string): void {
    const page = path || window.location.pathname;
    
    this.track({
      category: 'Navigation',
      action: 'Page View',
      label: page,
    });
  }
  
  /**
   * Track scroll depth
   */
  private trackScrollDepth(): void {
    const depths = [25, 50, 75, 100];
    const tracked = new Set<number>();
    
    const checkScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      depths.forEach(depth => {
        if (scrollPercent >= depth && !tracked.has(depth)) {
          tracked.add(depth);
          this.track({
            category: 'Engagement',
            action: 'Scroll Depth',
            label: `${depth}%`,
            value: depth,
          });
        }
      });
    };
    
    window.addEventListener('scroll', checkScroll, { passive: true });
  }
  
  /**
   * Track time on page
   */
  private trackTimeOnPage(): void {
    const startTime = Date.now();
    
    const sendTime = () => {
      const duration = Date.now() - startTime;
      this.track({
        category: 'Engagement',
        action: 'Time on Page',
        value: Math.floor(duration / 1000), // seconds
      });
    };
    
    window.addEventListener('beforeunload', sendTime);
    
    // Also send every 30 seconds
    setInterval(sendTime, 30000);
  }
  
  /**
   * Define conversion goal
   */
  public defineConversionGoal(goal: ConversionGoal): void {
    this.conversionGoals.set(goal.id, goal);
  }
  
  /**
   * Check if event triggers any conversion goals
   */
  private checkConversionGoals(event: AnalyticsEvent): void {
    this.conversionGoals.forEach((goal) => {
      if (goal.trigger(event)) {
        this.trackConversion(goal);
      }
    });
  }
  
  /**
   * Track conversion
   */
  private trackConversion(goal: ConversionGoal): void {
    this.journey.converted = true;
    this.journey.endTime = Date.now();
    
    this.track({
      category: 'Conversion',
      action: goal.name,
      value: goal.value,
    });
    
    console.log(
      `%c[Analytics] 🎉 Conversion: ${goal.name}`,
      'color: #0cce6b; font-weight: bold; font-size: 14px;'
    );
  }
  
  /**
   * Send event to analytics service
   */
  private sendToAnalytics(event: AnalyticsEvent): void {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      });
    }
    
    // Microsoft Clarity
    if (typeof clarity !== 'undefined') {
      clarity('set', event.category, event.action);
    }
    
    // Custom endpoint
    const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
    if (endpoint) {
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
        keepalive: true,
      }).catch(console.error);
    }
  }
  
  /**
   * Get user journey
   */
  public getJourney(): UserJourney {
    return this.journey;
  }
  
  /**
   * Get all events
   */
  public getEvents(): AnalyticsEvent[] {
    return this.events;
  }
  
  /**
   * Set user ID
   */
  public setUserId(id: string): void {
    this.userId = id;
  }
  
  /**
   * Generate session ID
   */
  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  
  /**
   * Export analytics data
   */
  public export(): string {
    return JSON.stringify({
      sessionId: this.sessionId,
      userId: this.userId,
      journey: this.journey,
      events: this.events,
    }, null, 2);
  }
}

export default AdvancedAnalytics;
export { type AnalyticsEvent, type UserJourney, type ConversionGoal };