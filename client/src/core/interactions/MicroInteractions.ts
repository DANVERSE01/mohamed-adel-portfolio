/**
 * Enterprise Micro-Interactions System
 * 
 * Provides cinematic interactions:
 * - Custom cursor
 * - Magnetic buttons
 * - Smooth page transitions
 * - Hover effects
 * - Sound effects (optional)
 * 
 * @module MicroInteractions
 * @version 1.0.0
 */

import gsap from 'gsap';

interface CursorConfig {
  enabled: boolean;
  size: number;
  magnetic: boolean;
  blendMode?: string;
}

interface TransitionConfig {
  duration: number;
  ease: string;
  type: 'fade' | 'slide' | 'scale' | 'wipe';
}

class MicroInteractions {
  private static instance: MicroInteractions;
  private cursor: HTMLElement | null = null;
  private cursorDot: HTMLElement | null = null;
  private magneticElements: HTMLElement[] = [];
  private soundEnabled: boolean = false;
  
  private constructor() {
    this.initialize();
  }
  
  public static getInstance(): MicroInteractions {
    if (!MicroInteractions.instance) {
      MicroInteractions.instance = new MicroInteractions();
    }
    return MicroInteractions.instance;
  }
  
  /**
   * Initialize all micro-interactions
   */
  private initialize(): void {
    this.initCustomCursor();
    this.initMagneticElements();
    this.initHoverEffects();
    this.initScrollAnimations();
    
    console.log('%c[Interactions] System initialized', 'color: #4a9eff;');
  }
  
  /**
   * Custom cursor with smooth following
   */
  private initCustomCursor(): void {
    // Create cursor elements
    this.cursor = document.createElement('div');
    this.cursor.className = 'custom-cursor';
    this.cursor.style.cssText = `
      position: fixed;
      width: 40px;
      height: 40px;
      border: 2px solid rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: difference;
      transition: transform 0.2s ease, opacity 0.2s ease;
    `;
    
    this.cursorDot = document.createElement('div');
    this.cursorDot.className = 'custom-cursor-dot';
    this.cursorDot.style.cssText = `
      position: fixed;
      width: 8px;
      height: 8px;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 50%;
      pointer-events: none;
      z-index: 10000;
      mix-blend-mode: difference;
    `;
    
    document.body.appendChild(this.cursor);
    document.body.appendChild(this.cursorDot);
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Smooth cursor following
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    const animateCursor = () => {
      // Smooth follow
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      dotX += (mouseX - dotX) * 0.3;
      dotY += (mouseY - dotY) * 0.3;
      
      if (this.cursor) {
        this.cursor.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`;
      }
      if (this.cursorDot) {
        this.cursorDot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
      }
      
      requestAnimationFrame(animateCursor);
    };
    
    animateCursor();
    
    // Cursor states
    document.addEventListener('mousedown', () => {
      this.cursor?.style.setProperty('transform', `translate(${cursorX - 20}px, ${cursorY - 20}px) scale(0.8)`);
    });
    
    document.addEventListener('mouseup', () => {
      this.cursor?.style.setProperty('transform', `translate(${cursorX - 20}px, ${cursorY - 20}px) scale(1)`);
    });
  }
  
  /**
   * Magnetic button effect
   */
  private initMagneticElements(): void {
    const magneticSelector = '[data-magnetic]';
    
    const observer = new MutationObserver(() => {
      this.updateMagneticElements();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    
    this.updateMagneticElements();
  }
  
  private updateMagneticElements(): void {
    const elements = document.querySelectorAll('[data-magnetic]') as NodeListOf<HTMLElement>;
    
    elements.forEach(el => {
      if (this.magneticElements.includes(el)) return;
      
      this.magneticElements.push(el);
      
      el.addEventListener('mouseenter', () => {
        this.cursor?.style.setProperty('transform', `translate(${el.offsetLeft}px, ${el.offsetTop}px) scale(1.5)`);
      });
      
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(el, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
      
      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)',
        });
      });
    });
  }
  
  /**
   * Advanced hover effects
   */
  private initHoverEffects(): void {
    const style = document.createElement('style');
    style.textContent = `
      [data-hover-lift]:hover {
        transform: translateY(-5px) !important;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2) !important;
      }
      
      [data-hover-glow]:hover {
        box-shadow: 0 0 20px currentColor !important;
      }
      
      [data-hover-scale]:hover {
        transform: scale(1.05) !important;
      }
      
      [data-magnetic] {
        transition: transform 0.3s ease;
        cursor: pointer;
      }
      
      .custom-cursor,
      .custom-cursor-dot {
        will-change: transform;
      }
    `;
    
    document.head.appendChild(style);
  }
  
  /**
   * Scroll-triggered animations
   */
  private initScrollAnimations(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const animation = el.dataset.scrollAnimation || 'fade';
            
            this.playScrollAnimation(el, animation);
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );
    
    // Observe elements
    const animatedElements = document.querySelectorAll('[data-scroll-animation]');
    animatedElements.forEach(el => observer.observe(el));
  }
  
  private playScrollAnimation(el: HTMLElement, animation: string): void {
    const animations: Record<string, gsap.TweenVars> = {
      fade: {
        opacity: 0,
        y: 50,
      },
      slide: {
        x: -100,
        opacity: 0,
      },
      scale: {
        scale: 0.8,
        opacity: 0,
      },
      rotate: {
        rotation: -10,
        opacity: 0,
      },
    };
    
    const from = animations[animation] || animations.fade;
    
    gsap.fromTo(
      el,
      from,
      {
        ...Object.keys(from).reduce((acc, key) => {
          acc[key] = key === 'opacity' ? 1 : 0;
          return acc;
        }, {} as any),
        duration: 0.8,
        ease: 'power3.out',
      }
    );
  }
  
  /**
   * Page transition
   */
  public async transition(
    type: TransitionConfig['type'] = 'fade',
    duration: number = 0.5
  ): Promise<void> {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #000;
      z-index: 999999;
      pointer-events: none;
    `;
    
    document.body.appendChild(overlay);
    
    await gsap.fromTo(
      overlay,
      { opacity: 0 },
      { opacity: 1, duration, ease: 'power2.inOut' }
    );
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    await gsap.to(overlay, {
      opacity: 0,
      duration,
      ease: 'power2.inOut',
      onComplete: () => {
        overlay.remove();
      },
    });
  }
  
  /**
   * Play sound effect (optional)
   */
  public playSound(type: 'click' | 'hover' | 'success' | 'error'): void {
    if (!this.soundEnabled) return;
    
    // Sound implementation would go here
    console.log(`[Sound] ${type}`);
  }
  
  /**
   * Enable/disable sound
   */
  public toggleSound(enabled: boolean): void {
    this.soundEnabled = enabled;
  }
  
  /**
   * Cleanup
   */
  public destroy(): void {
    this.cursor?.remove();
    this.cursorDot?.remove();
    document.body.style.cursor = 'auto';
  }
}

export default MicroInteractions;
export { type CursorConfig, type TransitionConfig };