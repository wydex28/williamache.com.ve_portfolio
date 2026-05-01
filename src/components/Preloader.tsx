"use client";

import React, { useEffect, useState } from 'react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      // Wait for fade out animation
      const hideTimer = setTimeout(() => setIsVisible(false), 700);
      return () => clearTimeout(hideTimer);
    }, 1500); // 1.5s is enough for a good impression

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[200] bg-dracula-bg flex items-center justify-center transition-opacity duration-700 ${!loading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-dracula-purple via-dracula-pink to-dracula-cyan animate-pulse py-2 font-['JetBrains_Mono'] uppercase text-center">
            WILLIAM ACHE
          </h1>
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-dracula-purple to-transparent animate-expand-line"></div>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#bd93f9] animate-bounce" style={{ animationDelay: '0.1s' }}></span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#8be9fd] animate-bounce" style={{ animationDelay: '0.2s' }}></span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#50fa7b] animate-bounce" style={{ animationDelay: '0.3s' }}></span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff79c6] animate-bounce" style={{ animationDelay: '0.4s' }}></span>
        </div>
      </div>
    </div>
  );
}
