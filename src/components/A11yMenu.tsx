"use client";

import React, { useState, useEffect } from 'react';

export default function A11yMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [colorBlindMode, setColorBlindMode] = useState(0);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleContrast = () => {
    setHighContrast(!highContrast);
    if (highContrast) {
      document.documentElement.style.filter = 'none';
    } else {
      document.documentElement.style.filter = 'contrast(120%) saturate(120%) brightness(110%)';
    }
  };

  const toggleZoom = () => {
    const nextZoom = zoomLevel >= 1.2 ? 1 : zoomLevel + 0.1;
    setZoomLevel(nextZoom);
    document.documentElement.style.fontSize = `${nextZoom * 100}%`;
  };

  const toggleColorBlind = () => {
    const nextMode = (colorBlindMode + 1) % 4;
    setColorBlindMode(nextMode);
    if (nextMode === 0) document.documentElement.style.filter = 'none';
    if (nextMode === 1) document.documentElement.style.filter = 'sepia(50%) hue-rotate(-30deg)';
    if (nextMode === 2) document.documentElement.style.filter = 'sepia(50%) hue-rotate(180deg)';
    if (nextMode === 3) document.documentElement.style.filter = 'grayscale(100%)';
  };

  const speak = (text: string) => {
    if (!voiceEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);

    // Initial Contrast Check
    if (highContrast) {
      document.documentElement.style.filter = 'contrast(120%) saturate(120%) brightness(110%)';
    }
    
    if (voiceEnabled) {
      const handleHover = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const speechTarget = target.closest('h1, h2, h3, h4, p, span, li, button, a');
        if (speechTarget) {
          const text = speechTarget.textContent?.trim() || '';
          if (text && text.length < 500) speak(text);
        }
      };
      window.addEventListener('mouseover', handleHover);
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('mouseover', handleHover);
      };
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [voiceEnabled]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Floating Options */}
      <div className={`flex flex-col gap-3 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 invisible translate-y-4'}`}>
        
        {/* Voice Toggle */}
        <button onClick={() => setVoiceEnabled(!voiceEnabled)} className={`w-12 h-12 rounded-full border flex items-center justify-center shadow-lg hover:scale-110 transition-all ${voiceEnabled ? 'bg-dracula-green text-dracula-bg border-dracula-green/30' : 'bg-dracula-card text-dracula-green border-dracula-green/30'}`}>
          <i className={voiceEnabled ? "bi bi-volume-up-fill text-xl" : "bi bi-volume-mute-fill text-xl"}></i>
        </button>

        {/* Color Blindness Toggle */}
        <button onClick={toggleColorBlind} className={`w-12 h-12 rounded-full border flex flex-col items-center justify-center shadow-lg hover:scale-110 transition-all ${colorBlindMode > 0 ? 'bg-dracula-pink text-dracula-bg border-dracula-pink/30' : 'bg-dracula-card text-dracula-pink border-dracula-pink/30'}`}>
          <i className="bi bi-eye text-lg"></i>
          <span className="text-[9px] font-bold leading-none mt-0.5">{colorBlindMode === 0 ? 'Off' : `F${colorBlindMode}`}</span>
        </button>

        {/* High Contrast Toggle */}
        <button onClick={toggleContrast} className={`w-12 h-12 rounded-full border flex items-center justify-center shadow-lg hover:scale-110 transition-all ${highContrast ? 'bg-dracula-yellow text-dracula-bg border-dracula-yellow/30' : 'bg-dracula-card text-dracula-yellow border-dracula-yellow/30'}`}>
          <i className={highContrast ? "bi bi-circle-fill text-xl" : "bi bi-circle-half text-xl"}></i>
        </button>

        {/* Zoom Toggle */}
        <button onClick={toggleZoom} className={`w-12 h-12 rounded-full border flex flex-col items-center justify-center shadow-lg hover:scale-110 transition-all ${zoomLevel > 1 ? 'bg-dracula-cyan text-dracula-bg border-dracula-cyan/30' : 'bg-dracula-card text-dracula-cyan border-dracula-cyan/30'}`}>
          <i className="bi bi-zoom-in text-lg"></i>
          <span className="text-[9px] font-bold leading-none mt-0.5">X{Math.round(zoomLevel * 10) / 10}</span>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={scrollToTop} className={`group w-12 h-12 rounded-full bg-dracula-card border border-dracula-pink/30 text-dracula-pink flex items-center justify-center shadow-lg hover:scale-110 transition-all ${showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 invisible translate-y-4'}`}>
          <i className="bi bi-arrow-up-short text-3xl group-hover:animate-bounce-short"></i>
        </button>
        
        <button onClick={toggleMenu} className="w-14 h-14 rounded-full bg-gradient-to-r from-dracula-purple to-dracula-pink text-dracula-bg flex items-center justify-center shadow-[0_0_20px_rgba(189,147,249,0.4)] hover:shadow-[0_0_25px_rgba(189,147,249,0.6)] hover:scale-105 transition-all">
          <i className="bi bi-universal-access-circle text-3xl"></i>
        </button>
      </div>
    </div>
  );
}
