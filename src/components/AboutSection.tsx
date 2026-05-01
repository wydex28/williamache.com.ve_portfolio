"use client";

import React from 'react';
import { calculateYears } from '@/lib/utils';
import { usePortfolio } from '@/context/PortfolioContext';

export default function AboutSection() {
  const { t, lang } = usePortfolio();
  const yearsExp = calculateYears('2018-01-01');

  return (
    <section id="about" className="animate-fade-in-up">
      <header className="mb-8">
        <h2 className="text-4xl lg:text-5xl font-bold text-dracula-fg mb-4 flex items-center gap-4">
          {t('Sobre Mí')}
        </h2>
        <div className="h-1.5 w-24 bg-gradient-to-r from-dracula-purple to-transparent rounded-full"></div>
      </header>
      
      <div className="text-dracula-fg/90 leading-relaxed mb-12 text-lg space-y-4">
        {lang === 'es' ? (
          <>
            <p>
              Desarrollador Full-Stack con más de <span className="text-dracula-pink font-semibold">+{yearsExp} años</span> de experiencia en la construcción de aplicaciones y sistemas robustos. Especializado en el ecosistema <strong className="text-dracula-cyan">Laravel</strong> y bases de datos relacionales (MySQL), con sólidos conocimientos en frontend (React, Next.js, Tailwind CSS).
            </p>
            <p>
              Enfocado en integrar herramientas y bibliotecas que agilizan los tiempos de desarrollo y elevan la experiencia del usuario (UX). Mi objetivo es crear soluciones escalables, estéticamente impactantes y de alto rendimiento.
            </p>
          </>
        ) : (
          <>
            <p>
              Full-Stack Developer with more than <span className="text-dracula-pink font-semibold">+{yearsExp} years</span> of experience building robust applications and systems. Specialized in the <strong className="text-dracula-cyan">Laravel</strong> ecosystem and relational databases (MySQL), with solid knowledge in frontend (React, Next.js, Tailwind CSS).
            </p>
            <p>
              Focused on integrating tools and libraries that speed up development times and elevate user experience (UX). My goal is to create scalable, aesthetically stunning, and high-performance solutions.
            </p>
          </>
        )}
      </div>

      <h3 className="text-2xl font-bold text-dracula-fg mb-6">{t('Lo Que Hago')}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-dracula-comment/20 group hover:border-dracula-purple/40 transition-all">
          <div className="w-14 h-14 rounded-xl bg-dracula-card/50 flex items-center justify-center mb-6 shadow-lg border border-dracula-comment/30 group-hover:border-dracula-purple transition-colors">
            <i className="bi bi-laptop text-2xl text-dracula-cyan"></i>
          </div>
          <h4 className="text-xl font-bold text-dracula-fg mb-3">{t('Sistemas Administrativos')}</h4>
          <p className="text-dracula-fg/70 text-sm leading-relaxed">
            {lang === 'es' 
              ? 'Desarrollo de paneles de control, CRMs y gestión de inventarios con seguimiento de stock en tiempo real, alertas automáticas y reportes personalizados.' 
              : 'Development of control panels, CRMs, and inventory management with real-time stock tracking, automatic alerts, and custom reports.'}
          </p>
        </div>
        
        <div className="glass-card p-6 rounded-2xl border border-dracula-comment/20 group hover:border-dracula-purple/40 transition-all">
          <div className="w-14 h-14 rounded-xl bg-dracula-card/50 flex items-center justify-center mb-6 shadow-lg border border-dracula-comment/30 group-hover:border-dracula-purple transition-colors">
            <i className="bi bi-shop text-2xl text-dracula-cyan"></i>
          </div>
          <h4 className="text-xl font-bold text-dracula-fg mb-3">{t('E-commerce Integral')}</h4>
          <p className="text-dracula-fg/70 text-sm leading-relaxed">
            {lang === 'es' 
              ? 'Creación de tiendas online enfocadas en conversión. Integración de pasarelas fiat (MercadoPago) y cripto (Coinbase), carritos y gestión de envíos.' 
              : 'Creation of conversion-focused online stores. Integration of fiat (MercadoPago) and crypto (Coinbase) payment gateways, carts, and shipping management.'}
          </p>
        </div>
        
        <div className="glass-card p-6 rounded-2xl border border-dracula-comment/20 group hover:border-dracula-purple/40 transition-all">
          <div className="w-14 h-14 rounded-xl bg-dracula-card/50 flex items-center justify-center mb-6 shadow-lg border border-dracula-comment/30 group-hover:border-dracula-purple transition-colors">
            <i className="bi bi-robot text-2xl text-dracula-cyan"></i>
          </div>
          <h4 className="text-xl font-bold text-dracula-fg mb-3">{t('Integración IA & APIs')}</h4>
          <p className="text-dracula-fg/70 text-sm leading-relaxed">
            {lang === 'es' 
              ? 'Implementación de modelos IA, Speech-to-Text, agentes autónomos y conexión con ecosistemas externos (OAuth, CoinMarketCap).' 
              : 'Implementation of AI models, Speech-to-Text, autonomous agents, and connection with external ecosystems (OAuth, CoinMarketCap).'}
          </p>
        </div>
        
        <div className="glass-card p-6 rounded-2xl border border-dracula-comment/20 group hover:border-dracula-purple/40 transition-all">
          <div className="w-14 h-14 rounded-xl bg-dracula-card/50 flex items-center justify-center mb-6 shadow-lg border border-dracula-comment/30 group-hover:border-dracula-purple transition-colors">
            <i className="bi bi-cloud-arrow-up text-2xl text-dracula-cyan"></i>
          </div>
          <h4 className="text-xl font-bold text-dracula-fg mb-3">{t('DevOps & Cloud')}</h4>
          <p className="text-dracula-fg/70 text-sm leading-relaxed">
            {lang === 'es' 
              ? 'Administración de infraestructura y despliegue en AWS, DigitalOcean, Vercel, Heroku. Automatización de CI/CD y flujos offline-first.' 
              : 'Infrastructure management and deployment on AWS, DigitalOcean, Vercel, Heroku. CI/CD automation and offline-first workflows.'}
          </p>
        </div>
      </div>
    </section>
  );
}
