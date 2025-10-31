"use client";

import { useEffect, useRef } from "react";

export default function FloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const shapes = containerRef.current.querySelectorAll('.floating-shape');
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.02;
        const x = (clientX - centerX) * speed;
        const y = (clientY - centerY) * speed;
        
        (shape as HTMLElement).style.transform = `translate(${x}px, ${y}px) rotateX(${y * 0.1}deg) rotateY(${x * 0.1}deg)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      style={{ perspective: '1000px' }}
    >
      {/* Hexagon 1 */}
      <div 
        className="floating-shape absolute top-[10%] left-[15%] w-32 h-32 opacity-10"
        style={{
          animation: 'float 20s ease-in-out infinite',
          animationDelay: '0s'
        }}
      >
        <div className="w-full h-full relative">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon 
              points="50 1 95 25 95 75 50 99 5 75 5 25" 
              fill="none" 
              stroke="url(#gradient1)" 
              strokeWidth="2"
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="oklch(0.45 0.20 250)" />
                <stop offset="100%" stopColor="oklch(0.50 0.25 300)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Hexagon 2 */}
      <div 
        className="floating-shape absolute top-[60%] right-[10%] w-40 h-40 opacity-10"
        style={{
          animation: 'float 25s ease-in-out infinite',
          animationDelay: '-5s'
        }}
      >
        <div className="w-full h-full relative">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon 
              points="50 1 95 25 95 75 50 99 5 75 5 25" 
              fill="none" 
              stroke="url(#gradient2)" 
              strokeWidth="2"
            />
            <defs>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="oklch(0.50 0.25 300)" />
                <stop offset="100%" stopColor="oklch(0.75 0.15 85)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Circle 1 */}
      <div 
        className="floating-shape absolute top-[30%] right-[25%] w-24 h-24 opacity-10"
        style={{
          animation: 'float 18s ease-in-out infinite',
          animationDelay: '-10s'
        }}
      >
        <div className="w-full h-full rounded-full border-2 border-primary/30" />
      </div>

      {/* Circle 2 */}
      <div 
        className="floating-shape absolute bottom-[20%] left-[20%] w-36 h-36 opacity-10"
        style={{
          animation: 'float 22s ease-in-out infinite',
          animationDelay: '-15s'
        }}
      >
        <div className="w-full h-full rounded-full border-2 border-secondary/30" />
      </div>

      {/* Triangle */}
      <div 
        className="floating-shape absolute top-[70%] left-[40%] w-28 h-28 opacity-10"
        style={{
          animation: 'float 24s ease-in-out infinite',
          animationDelay: '-8s'
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon 
            points="50 10, 90 90, 10 90" 
            fill="none" 
            stroke="url(#gradient3)" 
            strokeWidth="2"
          />
          <defs>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.45 0.20 250)" />
              <stop offset="100%" stopColor="oklch(0.75 0.15 85)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .floating-shape {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
