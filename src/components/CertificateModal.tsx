"use client";

import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cert: {
    title: string;
    pdf: string;
    cat: string;
  } | null;
}

export default function CertificateModal({ isOpen, onClose, cert }: Props) {
  if (!isOpen || !cert) return null;

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 lg:p-10 animate-fade-in">
      <div className="absolute inset-0 bg-dracula-bg/80 backdrop-blur-xl" onClick={onClose}></div>
      
      <div className="relative w-full max-w-6xl bg-dracula-bg border border-dracula-comment/30 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col h-full lg:h-[85vh] animate-slide-up">
        <header className="p-5 border-b border-dracula-comment/20 flex items-center justify-between bg-dracula-card/20">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-dracula-purple/20 flex items-center justify-center text-dracula-purple">
              <i className="bi bi-patch-check-fill text-xl"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold text-dracula-fg leading-tight">{cert.title}</h2>
              <p className="text-[10px] uppercase tracking-widest text-dracula-comment font-bold">{cert.cat}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href={cert.pdf} download className="hidden md:flex items-center gap-2 px-4 py-2 bg-dracula-purple/10 text-dracula-purple rounded-xl hover:bg-dracula-purple hover:text-dracula-bg transition-all font-bold text-xs border border-dracula-purple/30">
              <i className="bi bi-download"></i>
              <span>Descargar</span>
            </a>
            <button onClick={onClose} className="w-10 h-10 rounded-full bg-dracula-card/50 flex items-center justify-center text-dracula-fg hover:bg-dracula-red hover:text-dracula-bg transition-all">
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        </header>

        <div className="flex-1 bg-white relative overflow-hidden">
          <iframe 
            src={`${cert.pdf}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`} 
            className="w-full h-full border-none" 
            title={cert.title}
          ></iframe>
          
          {/* Mobile Download Overlay (for mobile browsers that don't embed PDFs well) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:hidden z-20">
             <a href={cert.pdf} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-dracula-purple text-dracula-bg rounded-full shadow-2xl font-bold">
               <i className="bi bi-file-earmark-pdf-fill"></i>
               <span>Ver PDF Completo</span>
             </a>
          </div>
        </div>
      </div>
    </div>
  );
}
