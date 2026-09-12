'use client';

import { useEffect, useState } from 'react';

export default function ParallaxHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20
        });
      }
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  const parallaxStyle = (speed: number) => ({
    transform: isMobile 
      ? `translateY(${scrollY * speed * 0.3}px)` 
      : `translate(${mousePosition.x * speed}px, ${mousePosition.y * speed + scrollY * speed * 0.3}px)`,
    transition: 'transform 0.3s ease-out'
  });

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div 
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-400/20 dark:bg-blue-600/30 rounded-full blur-3xl"
        style={parallaxStyle(0.8)}
      />
      <div 
        className="absolute top-40 right-1/4 w-[600px] h-[600px] bg-purple-400/20 dark:bg-purple-600/30 rounded-full blur-3xl"
        style={parallaxStyle(1.2)}
      />
      <div 
        className="absolute bottom-0 left-1/2 w-[400px] h-[400px] bg-pink-400/10 dark:bg-pink-600/20 rounded-full blur-3xl"
        style={parallaxStyle(0.6)}
      />
    </div>
  );
}
