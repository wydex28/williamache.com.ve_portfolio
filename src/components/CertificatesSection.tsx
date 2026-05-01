"use client";

import React, { useState } from 'react';
import CertificateModal from './CertificateModal';
import { usePortfolio } from '@/context/PortfolioContext';

const certs = [
  { 
    id: 1, cat: 'ia', title: 'Iniciación al Desarrollo con IA', school: 'The Big School', pdf: '/assets/docs/certificates/curso-iniciacion-desarrollo-ia.pdf', 
    styles: { text: 'text-dracula-cyan', hoverText: 'group-hover:text-dracula-cyan', border: 'hover:border-dracula-cyan', shadow: 'hover:shadow-[0_10px_30px_rgba(139,233,253,0.2)]', bg: 'bg-dracula-cyan/10' }
  },
  { 
    id: 2, cat: 'web', title: 'Programación Básica', school: 'Platzi', pdf: '/assets/docs/certificates/diploma-basico-programacion.pdf', 
    styles: { text: 'text-dracula-purple', hoverText: 'group-hover:text-dracula-purple', border: 'hover:border-dracula-purple', shadow: 'hover:shadow-[0_10px_30px_rgba(189,147,249,0.2)]', bg: 'bg-dracula-purple/10' }
  },
  { 
    id: 3, cat: 'soft', title: 'Marca Personal', school: 'Platzi', pdf: '/assets/docs/certificates/diploma-marca-personal-2018.pdf', 
    styles: { text: 'text-dracula-pink', hoverText: 'group-hover:text-dracula-pink', border: 'hover:border-dracula-pink', shadow: 'hover:shadow-[0_10px_30px_rgba(255,121,198,0.2)]', bg: 'bg-dracula-pink/10' }
  },
  { 
    id: 4, cat: 'soft', title: 'Estrategias Inglés', school: 'Platzi', pdf: '/assets/docs/certificates/diploma-estrategias-ingles-2022.pdf', 
    styles: { text: 'text-dracula-green', hoverText: 'group-hover:text-dracula-green', border: 'hover:border-dracula-green', shadow: 'hover:shadow-[0_10px_30px_rgba(80,250,123,0.2)]', bg: 'bg-dracula-green/10' }
  },
];

export default function CertificatesSection() {
  const { t } = usePortfolio();
  const [filter, setFilter] = useState('all');
  const [selectedCert, setSelectedCert] = useState<any>(null);

  const filtered = filter === 'all' ? certs : certs.filter(c => c.cat === filter);

  return (
    <section id="certificates" className="animate-fade-in-up">
      <header className="mb-10">
        <h2 className="text-4xl lg:text-5xl font-bold text-dracula-fg mb-4 flex items-center gap-4">
          {t('Certificados')}
        </h2>
        <div className="h-1.5 w-24 bg-gradient-to-r from-dracula-purple to-transparent rounded-full"></div>
      </header>

      <ul className="flex flex-wrap gap-3 mb-10">
        {['all', 'web', 'ia', 'soft'].map(f => (
          <li key={f}>
            <button
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                filter === f 
                  ? 'bg-dracula-purple text-dracula-bg shadow-lg shadow-dracula-purple/20' 
                  : 'bg-dracula-card/80 text-dracula-fg/70 hover:text-dracula-fg border border-dracula-comment/50'
              }`}
            >
              {f === 'all' ? 'Todos' : f === 'web' ? 'Desarrollo Web' : f === 'ia' ? 'IA & Datos' : 'Habilidades'}
            </button>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(c => (
          <div 
            key={c.id} 
            onClick={() => setSelectedCert(c)}
            className={`group relative rounded-2xl overflow-hidden bg-dracula-card/30 cursor-pointer transition-all duration-500 border border-dracula-comment/20 ${c.styles.border} ${c.styles.shadow}`}
          >
            <div className="aspect-[4/3] relative overflow-hidden bg-white">
              <iframe src={`${c.pdf}#toolbar=0&navpanes=0&scrollbar=0`} className="w-full h-full border-none pointer-events-none origin-top scale-[1.01]" scrolling="no"></iframe>
              <div className="absolute inset-0 bg-dracula-bg/20 group-hover:bg-transparent transition-colors z-10"></div>
              <div className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px] z-20 ${c.styles.bg}`}>
                <div className={`w-12 h-12 rounded-full bg-dracula-fg flex items-center justify-center shadow-xl ${c.styles.text}`}>
                  <i className="bi bi-zoom-in text-xl"></i>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-dracula-comment/20">
              <div className={`text-[10px] uppercase font-bold tracking-widest mb-2 ${c.styles.text}`}>{c.cat}</div>
              <h3 className={`text-lg font-bold text-dracula-fg leading-tight transition-colors ${c.styles.hoverText}`}>{c.title}</h3>
              <p className="text-[11px] text-dracula-comment mt-2">{c.school}</p>
            </div>
          </div>
        ))}
      </div>

      <CertificateModal 
        isOpen={!!selectedCert} 
        onClose={() => setSelectedCert(null)} 
        cert={selectedCert} 
      />
    </section>
  );
}
