"use client";

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: Props) {
  const { lang, setLang, theme, setTheme, t } = usePortfolio();

  const tabs = [
    { id: 'about', label: t('Resumen') },
    { id: 'resume', label: t('Experiencia') },
    { id: 'skills', label: t('Habilidades') },
    { id: 'portfolio', label: t('Portafolio') },
    { id: 'certificates', label: t('Certificados') },
    { id: 'contact', label: t('Contacto') }
  ];

  return (
    <nav className="glass rounded-2xl p-2 lg:px-6 lg:py-4 lg:ml-auto w-full lg:w-max shadow-xl border border-dracula-comment/20 z-20 mb-6">
      <ul className="flex flex-wrap justify-center lg:justify-end items-center gap-2 lg:gap-6">
        {tabs.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => setActiveTab(item.id)}
              className={`nav-link cursor-pointer px-4 py-2 rounded-lg font-semibold transition-all duration-300 relative overflow-hidden group ${
                activeTab === item.id ? 'active text-dracula-fg' : 'text-dracula-fg/60'
              }`}
            >
              {item.label}
              {activeTab === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-dracula-purple animate-expand-line"></span>
              )}
            </button>
          </li>
        ))}

        <li className="flex items-center ml-2 lg:ml-4 border-l border-dracula-comment/30 pl-4 h-8 gap-4">
          {/* Language Switcher */}
          <button 
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="group relative w-8 h-8 rounded-full overflow-hidden hover:scale-110 transition-transform shadow-lg border border-dracula-comment/20"
            title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          >
            <img 
              src={lang === 'es' ? "/assets/images/united-states.svg" : "/assets/images/spain.svg"} 
              alt={lang === 'es' ? "English" : "Español"} 
              className="w-full h-full object-cover"
            />
          </button>

          {/* Theme Toggle Switch */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title="Cambiar Tema / Switch Theme"
            className="relative inline-flex items-center h-6 w-11 rounded-full bg-dracula-card/80 border border-dracula-comment/30 transition-all duration-500 focus:outline-none group shadow-inner"
          >
            <span
              className={`inline-block w-4 h-4 transform rounded-full transition-all duration-500 shadow-lg flex items-center justify-center ${
                theme === 'light' ? 'bg-dracula-purple translate-x-6' : 'bg-dracula-purple translate-x-1'
              }`}
            >
              <i
                className={`text-[8px] ${
                  theme === 'light' ? 'bi bi-sun-fill text-dracula-fg' : 'bi bi-moon-stars-fill text-dracula-bg'
                }`}
              ></i>
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
