"use client";

import React, { useState } from 'react';
import { calculateYears } from '@/lib/utils';
import { usePortfolio } from '@/context/PortfolioContext';

export default function Sidebar() {
  const { t, lang } = usePortfolio();
  const [showCvMenu, setShowCvMenu] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const yearsExp = calculateYears('2018-01-01');

  return (
    <aside className="w-full lg:w-1/3 xl:w-1/4">
      <div className="glass rounded-3xl p-5 xl:p-6 lg:sticky lg:top-8 max-h-[calc(100vh-4rem)] overflow-y-auto no-scrollbar shadow-2xl flex flex-col items-center animate-fade-in-up border border-dracula-comment/20">
        
        {/* Avatar */}
        <div 
          className="relative mt-12 mb-4 cursor-pointer group" 
          id="avatar-container"
          onClick={() => setShowBubble(!showBubble)}
        >
          <div className="absolute inset-0 bg-dracula-purple rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
          <img 
            src="/assets/images/profile/1.png" 
            alt="William Ache" 
            className="relative w-32 h-32 xl:w-36 xl:h-36 rounded-3xl object-cover shadow-2xl border-2 border-dracula-comment group-hover:border-dracula-purple transition-colors duration-300 bg-dracula-card" 
          />
          
          {/* Speech Bubble */}
          <div className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-dracula-card px-4 py-2 rounded-2xl border border-dracula-comment/30 shadow-xl transition-all duration-300 pointer-events-none whitespace-nowrap z-20 ${showBubble ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <span className="text-xs font-bold text-dracula-fg">{t('¡Haz click en mi!')}</span>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-dracula-card border-r border-b border-dracula-comment/30 rotate-45"></div>
          </div>
        </div>

        {/* Info */}
        <h1 className="text-3xl font-bold text-dracula-fg mb-3 text-center tracking-tight">William Ache</h1>
        <div className="px-4 py-1.5 bg-dracula-card/50 rounded-xl border border-dracula-comment/50 mb-5 shadow-inner w-full flex justify-center">
          <span className="text-sm font-semibold text-dracula-cyan uppercase tracking-wider text-center">{t('Desarrollador Full-Stack')} • +{yearsExp} {lang === 'es' ? 'Años' : 'Years'}</span>
        </div>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-dracula-comment to-transparent mb-5 opacity-30"></div>

        {/* Contact Info */}
        <ul className="w-full space-y-4">
          <li className="flex items-center gap-4 group cursor-pointer">
            <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-dracula-card/50 flex items-center justify-center text-dracula-cyan group-hover:bg-dracula-purple group-hover:text-dracula-bg transition-all duration-300 shadow-lg border border-dracula-comment/30">
              <i className="bi bi-envelope text-xl"></i>
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-[11px] text-dracula-comment uppercase tracking-widest font-semibold mb-1">{t('Correo Electrónico')}</span>
              <a href="mailto:contact@williamache.com.ve" className="text-sm font-medium text-dracula-fg/90 hover:text-dracula-pink truncate transition-colors">{t('Ver Correo')}</a>
            </div>
          </li>
          <li className="flex items-center gap-4 group cursor-pointer">
            <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-dracula-card/50 flex items-center justify-center text-dracula-cyan group-hover:bg-dracula-purple group-hover:text-dracula-bg transition-all duration-300 shadow-lg border border-dracula-comment/30">
              <i className="bi bi-phone text-xl"></i>
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-[11px] text-dracula-comment uppercase tracking-widest font-semibold mb-1">{t('Teléfono')}</span>
              <a href="tel:+584124354228" className="text-sm font-medium text-dracula-fg/90 hover:text-dracula-pink truncate transition-colors">{t('Ver Teléfono')}</a>
            </div>
          </li>
          <li className="flex items-center gap-4 group cursor-pointer">
            <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-dracula-card/50 flex items-center justify-center text-dracula-cyan group-hover:bg-dracula-purple group-hover:text-dracula-bg transition-all duration-300 shadow-lg border border-dracula-comment/30">
              <i className="bi bi-geo-alt text-xl"></i>
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-[11px] text-dracula-comment uppercase tracking-widest font-semibold mb-1">{t('Ubicación')}</span>
              <address className="text-sm font-medium text-dracula-fg/90 not-italic hover:text-dracula-pink transition-colors flex items-center gap-2">
                Aragua, Venezuela <span className="fi fi-ve rounded-sm"></span>
              </address>
            </div>
          </li>
        </ul>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-dracula-comment to-transparent my-5 opacity-30"></div>

        {/* Socials */}
        <div className="flex gap-4 mb-4">
          <a href="https://www.linkedin.com/in/william-ache/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-dracula-card/50 flex items-center justify-center text-dracula-fg/70 hover:text-dracula-cyan hover:bg-dracula-card transition-all border border-dracula-comment/30 shadow-lg cursor-pointer">
            <i className="bi bi-linkedin text-lg"></i>
          </a>
          <a href="https://github.com/wydex28" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-dracula-card/50 flex items-center justify-center text-dracula-fg/70 hover:text-dracula-cyan hover:bg-dracula-card transition-all border border-dracula-comment/30 shadow-lg cursor-pointer">
            <i className="bi bi-github text-lg"></i>
          </a>
        </div>

        {/* CV Download Wrapper */}
        <div className="relative w-full mt-auto">
          {/* Floating Flags Menu */}
          <div className={`absolute -top-16 left-1/2 -translate-x-1/2 bg-dracula-card/95 backdrop-blur-xl border border-dracula-comment/30 rounded-2xl p-2.5 flex gap-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-300 z-50 ${showCvMenu ? 'opacity-100 translate-y-0' : 'opacity-0 invisible translate-y-3'}`}>
            <a href="/assets/docs/Curriculum Vitae CV - William Ache - Full Stack Laravel - Español.pdf" target="_blank" className="w-10 h-10 rounded-xl overflow-hidden hover:scale-110 transition-transform shadow-lg border border-white/10 block" title="Descargar en Español">
              <img src="/assets/images/spain.svg" alt="Español" className="w-full h-full object-cover" />
            </a>
            <a href="/assets/docs/Curriculum Vitae CV - William Ache - Full Stack Laravel - English.pdf" target="_blank" className="w-10 h-10 rounded-xl overflow-hidden hover:scale-110 transition-transform shadow-lg border border-white/10 block" title="Download in English">
              <img src="/assets/images/united-states.svg" alt="English" className="w-full h-full object-cover" />
            </a>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-dracula-card border-r border-b border-dracula-comment/30 rotate-45"></div>
          </div>

          <button 
            onClick={() => setShowCvMenu(!showCvMenu)}
            className="w-full py-2.5 bg-gradient-to-r from-dracula-purple to-dracula-pink hover:from-dracula-pink hover:to-dracula-pink text-dracula-bg rounded-xl font-bold flex justify-center items-center gap-2 transition-all shadow-[0_0_20px_rgba(189,147,249,0.3)] hover:shadow-[0_0_25px_rgba(189,147,249,0.5)] group active:scale-95"
          >
            <span>{t('Descargar CV')}</span>
            <i className="bi bi-download group-hover:translate-y-1 transition-transform"></i>
          </button>
        </div>
      </div>
    </aside>
  );
}
