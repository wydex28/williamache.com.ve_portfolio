"use client";

import React, { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
        glowRef.current.style.opacity = '1';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={glowRef}
      className="fixed top-0 left-0 w-[250px] h-[250px] rounded-full pointer-events-none z-[9999] opacity-0 transition-opacity duration-500 bg-dracula-purple/15 blur-[80px]"
    ></div>
  );
}
