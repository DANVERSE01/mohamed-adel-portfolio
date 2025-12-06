// Advanced Animation Configuration
// GSAP, Lenis, Theatre.js Integration

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Hero Section Animation Config
 */
export const heroAnimationConfig = {
  duration: 1.2,
  ease: 'power3.out',
  stagger: 0.1,
};

/**
 * Portfolio Grid Animation
 */
export const portfolioGridConfig = {
  initialOpacity: 0,
  initialY: 50,
  duration: 0.8,
  ease: 'power2.out',
  stagger: 0.05,
};

/**
 * Smooth Scroll Configuration (Lenis)
 */
export const lenisConfig = {
  lerp: 0.1,
  duration: 1.5,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: true,
  wheelMultiplier: 1,
};

/**
 * ScrollTrigger Animation Preset
 */
export const scrollTriggerAnimations = {
  fadeInUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    trigger: '[data-animate-fade-up]',
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    trigger: '[data-animate-scale]',
  },
  slideInLeft: {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    trigger: '[data-animate-slide-left]',
  },
};

/**
 * Cursor Animation
 */
export const cursorConfig = {
  size: 30,
  activeSize: 50,
  color: '#00d4ff',
  activeColor: '#ff0080',
  ease: 0.2,
};

/**
 * Performance-optimized animation function
 */
export const createScrollAnimation = (
  element: HTMLElement,
  config: { initial: any; animate: any; duration?: number }
) => {
  gsap.fromTo(
    element,
    config.initial,
    {
      ...config.animate,
      duration: config.duration || 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'top 20%',
        markers: false,
      },
    }
  );
};
