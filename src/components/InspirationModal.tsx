"use client";

import React from 'react';

const inspirationSources = [
  { name: "Alpaca Tech", handle: "@alpacatech", url: "https://www.youtube.com/@alpacatech" },
  { name: "Ben Cord", handle: "@bencord", url: "https://www.youtube.com/@bencord" },
  { name: "BettaTech", handle: "@BettaTech", url: "https://www.youtube.com/@BettaTech" },
  { name: "CodersFree", handle: "@CodersFree", url: "https://www.youtube.com/@CodersFree" },
  { name: "Código Facilito", handle: "@codigofacilito", url: "https://www.youtube.com/@codigofacilito" },
  { name: "DominiCode", handle: "@DominiCode", url: "https://www.youtube.com/@DominiCode" },
  { name: "Fazt Code", handle: "@FaztCode", url: "https://www.youtube.com/@FaztCode" },
  { name: "Fazt Tech", handle: "@FaztTech", url: "https://www.youtube.com/@FaztTech" },
  { name: "Fernando Herrera", handle: "@fernando_her85", url: "https://www.youtube.com/@fernando_her85" },
  { name: "Gentleman Programming", handle: "@gentlemanprogramming", url: "https://www.youtube.com/@gentlemanprogramming" },
  { name: "Hixec", handle: "@Hixec", url: "https://www.youtube.com/@Hixec" },
  { name: "HolaMundo", handle: "@HolaMundoDev", url: "https://www.youtube.com/@HolaMundoDev" },
  { name: "Jose David", handle: "@jose-david", url: "https://www.youtube.com/@jose-david" },
  { name: "La Geekipedia de Ernesto", handle: "@LaGeekipediaDeErnesto", url: "https://www.youtube.com/@LaGeekipediaDeErnesto" },
  { name: "midudev", handle: "@midudev", url: "https://www.youtube.com/@midudev" },
  { name: "MoureDev", handle: "@mouredev", url: "https://www.youtube.com/@mouredev" },
  { name: "Píldoras Informáticas", handle: "@pildorasinformaticas", url: "https://www.youtube.com/@pildorasinformaticas" },
  { name: "Platzi", handle: "@Platzi", url: "https://www.youtube.com/@Platzi" },
  { name: "Programador X", handle: "@ProgramadorX", url: "https://www.youtube.com/@ProgramadorX" },
  { name: "SoyDalto", handle: "@soydalto", url: "https://www.youtube.com/@soydalto" },
  { name: "TodoCode", handle: "@TodoCode", url: "https://www.youtube.com/@TodoCode" },
  { name: "Valen Werle", handle: "@ValenWerle", url: "https://www.youtube.com/@ValenWerle" },
  { name: "Victor Robles", handle: "@victorroblesweb", url: "https://www.youtube.com/@victorroblesweb" },
  { name: "Vida Programador", handle: "@vidaprogramador", url: "https://www.youtube.com/@vidaprogramador" }
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function InspirationModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 lg:p-10 animate-fade-in">
      <div className="absolute inset-0 bg-dracula-bg/60 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative w-full max-w-5xl bg-dracula-bg border border-dracula-comment/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-full animate-slide-up">
        <header className="p-6 border-b border-dracula-comment/20 flex items-center justify-between bg-dracula-card/20">
          <div>
            <h2 className="text-2xl font-bold text-dracula-fg">Fuentes de Inspiración</h2>
            <p className="text-sm text-dracula-comment">Canales y sitios que han impulsado mi crecimiento</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-dracula-card/50 flex items-center justify-center text-dracula-fg hover:bg-dracula-red hover:text-dracula-bg transition-all">
            <i className="bi bi-x-lg"></i>
          </button>
        </header>

        <div className="p-6 overflow-y-auto no-scrollbar grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {inspirationSources.map((source, index) => (
            <a 
              key={index} 
              href={source.url} 
              target="_blank" 
              rel="noreferrer"
              className="group/card relative overflow-hidden bg-dracula-card/20 border border-dracula-comment/20 rounded-2xl p-4 hover:border-dracula-purple/50 transition-all hover:-translate-y-1 shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-dracula-purple/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-14 h-14 rounded-xl bg-dracula-bg/50 overflow-hidden flex-shrink-0 border border-dracula-comment/10 group-hover/card:border-dracula-purple/30 transition-all">
                  <img 
                    src={`https://unavatar.io/youtube/${source.handle.replace('@', '')}`} 
                    alt={source.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-dracula-fg group-hover/card:text-dracula-purple transition-colors truncate text-sm">{source.name}</h4>
                  <p className="text-[9px] uppercase tracking-wider text-dracula-comment font-bold mt-0.5">YouTube Channel</p>
                </div>
              </div>
            </a>
          ))}
        </div>
        
        <footer className="p-4 border-t border-dracula-comment/10 text-center bg-dracula-card/10">
          <p className="text-xs text-dracula-comment italic">"Aprender de los mejores es el primer paso para ser uno de ellos"</p>
        </footer>
      </div>
    </div>
  );
}
