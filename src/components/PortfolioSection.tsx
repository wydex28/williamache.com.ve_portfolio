import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';

const projects = [
  {
    id: 1,
    category: 'admin',
    title: 'ERP Multi-Tenant SaaS',
    desc: 'Sistema administrativo avanzado con módulos de finanzas, inventario e ingresos, optimizado para alto rendimiento.',
    tag: 'Sistemas',
    icon: 'bi-kanban',
    tech: ['devicon-laravel-plain', 'devicon-mysql-plain', 'devicon-tailwindcss-original']
  },
  {
    id: 2,
    category: 'ecommerce',
    title: 'E-Commerce Omnicanal',
    desc: 'Tienda online con gestión de stock sincronizado, pagos con cripto (Coinbase) y MercadoPago.',
    tag: 'E-Commerce',
    icon: 'bi-cart4',
    tech: ['devicon-laravel-plain', 'devicon-jquery-plain', 'devicon-bootstrap-plain']
  },
  {
    id: 3,
    category: 'ia',
    title: 'Asistente Virtual IA',
    desc: 'Integración de Speech-to-Text y LLMs locales para la automatización de procesos internos y auditoría.',
    tag: 'IA & APIs',
    icon: 'bi-mic-fill',
    tech: ['devicon-python-plain', 'devicon-react-original', 'devicon-mongodb-plain']
  }
];

export default function PortfolioSection() {
  const { t } = usePortfolio();
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="animate-fade-in-up">
      <header className="mb-10">
        <h2 className="text-4xl lg:text-5xl font-bold text-dracula-fg mb-4 flex items-center gap-4">
          {t('Portafolio')}
        </h2>
        <div className="h-1.5 w-24 bg-gradient-to-r from-dracula-purple to-transparent rounded-full"></div>
      </header>

      <ul className="flex flex-wrap gap-3 mb-10">
        {['all', 'admin', 'ecommerce', 'ia'].map(f => (
          <li key={f}>
            <button
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                filter === f 
                  ? 'bg-dracula-purple text-dracula-bg shadow-lg shadow-dracula-purple/20' 
                  : 'bg-dracula-card/80 text-dracula-fg/70 hover:text-dracula-fg border border-dracula-comment/50'
              }`}
            >
              {f === 'all' ? 'Todos' : f === 'admin' ? 'Sistemas' : f === 'ecommerce' ? 'E-Commerce' : 'IA & APIs'}
            </button>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filtered.map(p => (
          <div key={p.id} className="group relative rounded-2xl overflow-hidden glass-card cursor-pointer flex flex-col border border-dracula-comment/20">
            <div className="h-48 flex-shrink-0 bg-dracula-card/80 relative overflow-hidden flex items-center justify-center border-b border-dracula-comment/30">
              <i className={`bi ${p.icon} text-6xl text-dracula-comment group-hover:scale-110 group-hover:text-dracula-pink transition-all duration-500`}></i>
              <div className="absolute inset-0 bg-gradient-to-t from-dracula-bg/80 to-transparent"></div>
              <div className="absolute inset-0 bg-dracula-purple/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full bg-dracula-fg flex items-center justify-center text-dracula-purple">
                  <i className="bi bi-eye-fill text-xl"></i>
                </div>
              </div>
            </div>
            <div className="p-6 pb-5 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-dracula-fg mb-2">{p.title}</h3>
              <p className="text-dracula-fg/70 text-sm mb-4 flex-grow">{p.desc}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs font-semibold text-dracula-pink bg-dracula-pink/10 px-3 py-1 rounded-full">{p.tag}</span>
                <div className="flex items-center gap-2 text-dracula-comment text-lg">
                  {p.tech.map(t => <i key={t} className={`${t} hover:text-dracula-pink transition-colors`}></i>)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
