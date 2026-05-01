"use client";

import React from 'react';
import { useBtcPrice } from '@/hooks/useBtcPrice';
import { useClocks, useWeather, useVisitorStats } from '@/hooks/useDashboardStats';
import { usePortfolio } from '@/context/PortfolioContext';

interface Props {
  onOpenInspiration?: () => void;
}

export default function DashboardFooter({ onOpenInspiration }: Props) {
  const { t, lang } = usePortfolio();
  const { myTime, visitorTime } = useClocks();
  const { temp, icon } = useWeather();
  const { country, visits } = useVisitorStats();
  const { price, diffPercent, isUp, isUpdating } = useBtcPrice();

  return (
    <footer className="container mx-auto px-4 py-8 max-w-[1400px] relative z-10">
      <div className="glass rounded-3xl p-8 border border-dracula-comment/20 flex flex-col md:flex-row items-center justify-between gap-8 text-sm">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <p className="text-dracula-fg font-medium">
            {t('Creado por')} William Ache (2024 - {lang === 'es' ? 'Actualidad' : 'Present'}). {t('Sin derechos reservados')}.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-dracula-card/30 rounded-full border border-dracula-comment/20 text-[10px]">
              <i className="bi bi-palette-fill text-dracula-purple"></i>
              <span className="text-dracula-fg/60">
                Theme: <a href="https://draculatheme.com/" target="_blank" rel="noreferrer" className="text-dracula-purple hover:text-dracula-pink transition-colors font-bold">Dracula HC</a>
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-dracula-comment">
              <i className="bi bi-balloon-heart-fill text-dracula-pink animate-bounce"></i>
              <span>{t('Hecho con pasión')}</span>
            </div>
          </div>
          <button 
            onClick={onOpenInspiration}
            className="flex items-center gap-2 mt-4 px-4 py-2 bg-dracula-purple/10 text-dracula-purple rounded-xl border border-dracula-purple/20 hover:bg-dracula-purple hover:text-dracula-bg transition-all text-[11px] font-bold group w-max mx-auto md:mx-0"
          >
            <i className="bi bi-lightbulb-fill group-hover:animate-pulse"></i>
            <span>{t('Ver Inspiración')}</span>
          </button>
        </div>

        {/* Social Links & Quick Actions */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <a href="https://github.com/wydex28" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-dracula-card/50 flex items-center justify-center text-dracula-fg/60 hover:text-dracula-purple hover:bg-dracula-card transition-all border border-dracula-comment/20 shadow-lg">
              <i className="bi bi-github text-xl"></i>
            </a>
            <a href="https://linkedin.com/in/williamache" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-dracula-card/50 flex items-center justify-center text-dracula-fg/60 hover:text-dracula-cyan hover:bg-dracula-card transition-all border border-dracula-comment/20 shadow-lg">
              <i className="bi bi-linkedin text-xl"></i>
            </a>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-dracula-green">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dracula-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-dracula-green"></span>
            </span>
            <span>{t('Disponible para proyectos')}</span>
          </div>

          {/* Dynamic Stats */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            <div className="flex flex-col items-center gap-1">
              <span className="text-[8px] uppercase tracking-tighter text-dracula-comment font-bold">
                {lang === 'es' ? 'Mi Hora (Venezuela)' : 'My Time (Venezuela)'}
              </span>
              <div className="flex items-center gap-2 text-[10px] text-dracula-purple font-mono bg-dracula-purple/5 px-2 py-1 rounded-lg border border-dracula-purple/20 h-[32px]">
                <span>{myTime}</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1">
              <span className="text-[8px] uppercase tracking-tighter text-dracula-comment font-bold">
                {lang === 'es' ? `Tu Hora (${country})` : `Your Time (${country})`}
              </span>
              <div className="flex items-center gap-2 text-[10px] text-dracula-cyan font-mono bg-dracula-cyan/5 px-2 py-1 rounded-lg border border-dracula-cyan/20 h-[32px]">
                <span>{visitorTime}</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1">
              <span className="text-[8px] uppercase tracking-tighter text-dracula-comment font-bold">{t('Clima')}</span>
              <div className="flex items-center gap-2 text-[10px] text-dracula-yellow font-mono bg-dracula-yellow/5 px-2 py-1 rounded-lg border border-dracula-yellow/20 h-[32px]">
                <i className={`bi ${icon}`}></i>
                <span>{temp}</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1">
              <span className="text-[8px] uppercase tracking-tighter text-dracula-comment font-bold">{t('Visitas Totales')}</span>
              <div className="flex items-center gap-2 text-[10px] text-dracula-green font-mono bg-dracula-green/5 px-2 py-1 rounded-lg border border-dracula-green/20 h-[32px]">
                <span>{visits.toString().padStart(4, '0')}</span>
              </div>
            </div>

            {/* Bitcoin Price */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-[8px] uppercase tracking-tighter text-dracula-comment font-bold">Bitcoin (BTC)</span>
              <div className={`flex items-center gap-2 bg-dracula-card/30 px-3 py-1 rounded-lg border border-dracula-comment/20 transition-all duration-500 h-[32px] ${isUpdating ? (isUp ? 'ring-1 ring-dracula-green/30' : 'ring-1 ring-dracula-red/30') : ''}`}>
                <div className="flex items-center gap-1.5">
                  <i className={`bi bi-currency-bitcoin text-sm ${isUpdating && isUp ? 'text-dracula-green animate-bounce' : isUpdating && !isUp ? 'text-dracula-red animate-bounce' : 'text-dracula-yellow'}`}></i>
                  <span className="text-[11px] text-dracula-fg font-bold font-mono whitespace-nowrap">
                    {price ? `${price.toLocaleString()} USD` : '--.--- USD'}
                  </span>
                </div>
                <div className={`flex items-center gap-1 text-[9px] font-mono border-l border-dracula-comment/20 pl-2 ml-1 ${diffPercent > 0 ? 'text-dracula-green' : diffPercent < 0 ? 'text-dracula-red' : 'text-dracula-comment'}`}>
                  <span>{diffPercent > 0 ? '+' : ''}{diffPercent ? diffPercent.toFixed(4) : '--'}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
