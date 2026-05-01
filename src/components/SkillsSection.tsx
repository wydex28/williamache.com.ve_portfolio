"use client";

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';

const skills = [
  { name: 'PHP', cat: 'language', icon: 'devicon-php-plain', link: 'https://www.php.net/' },
  { name: 'JavaScript', cat: 'language', icon: 'devicon-javascript-plain', link: 'https://developer.mozilla.org/' },
  { name: 'HTML5', cat: 'language', icon: 'devicon-html5-plain', link: 'https://developer.mozilla.org/' },
  { name: 'CSS3', cat: 'language', icon: 'devicon-css3-plain', link: 'https://developer.mozilla.org/' },
  { name: 'Laravel', cat: 'framework', icon: 'devicon-laravel-plain', link: 'https://laravel.com/' },
  { name: 'Tailwind CSS', cat: 'framework', icon: 'devicon-tailwindcss-original', link: 'https://tailwindcss.com/' },
  { name: 'React / Next.js', cat: 'framework', icon: 'devicon-react-original', link: 'https://react.dev/' },
  { name: 'MySQL', cat: 'tools', icon: 'devicon-mysql-plain', link: 'https://www.mysql.com/' },
  { name: 'AWS Cloud', cat: 'tools', icon: 'devicon-amazonwebservices-plain-wordmark', link: 'https://aws.amazon.com/' },
  { name: 'Git', cat: 'tools', icon: 'devicon-git-plain', link: 'https://git-scm.com/' },
  { name: 'Trabajo en Equipo', cat: 'soft', customIcon: 'bi-people-fill' },
  { name: 'Resolución', cat: 'soft', customIcon: 'bi-puzzle-fill' },
];

export default function SkillsSection() {
  const { t } = usePortfolio();
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', label: t('Todos') },
    { id: 'language', label: 'Lenguajes' },
    { id: 'framework', label: 'Frameworks' },
    { id: 'tools', label: 'Herramientas & BD' },
    { id: 'soft', label: 'Blandas' },
  ];

  const filtered = filter === 'all' ? skills : skills.filter(s => s.cat === filter);

  return (
    <section id="skills" className="animate-fade-in-up">
      <header className="mb-10">
        <h2 className="text-4xl lg:text-5xl font-bold text-dracula-fg mb-4 flex items-center gap-4">
          {t('Habilidades')}
        </h2>
        <div className="h-1.5 w-24 bg-gradient-to-r from-dracula-purple to-transparent rounded-full"></div>
      </header>

      <ul className="flex flex-wrap gap-3 mb-10">
        {categories.map(cat => (
          <li key={cat.id}>
            <button
              onClick={() => setFilter(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                filter === cat.id 
                  ? 'bg-dracula-purple text-dracula-bg shadow-lg shadow-dracula-purple/20' 
                  : 'bg-dracula-card/80 text-dracula-fg/70 hover:text-dracula-fg border border-dracula-comment/50'
              }`}
            >
              {cat.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map(s => (
          <a key={s.name} href={s.link || '#'} target={s.link ? "_blank" : undefined} rel="noreferrer" className="block group">
            <div className="bg-dracula-card/30 p-4 rounded-xl flex items-center relative overflow-hidden transition-all duration-300 border border-dracula-comment/30 hover:border-dracula-purple hover:shadow-[0_0_20px_rgba(189,147,249,0.3)]">
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-dracula-bg rounded-full p-2 mr-3 shadow-inner group-hover:scale-110 transition-transform duration-300">
                {s.customIcon ? (
                  <i className={`bi ${s.customIcon} text-2xl text-dracula-fg group-hover:text-dracula-purple transition-colors`}></i>
                ) : (
                  <i className={`${s.icon} text-3xl text-dracula-fg group-hover:text-dracula-purple transition-colors`}></i>
                )}
              </div>
              <div className="flex flex-col">
                <h4 className="text-dracula-fg font-bold text-base leading-tight group-hover:text-dracula-purple transition-colors">{s.name}</h4>
                <span className="text-dracula-comment text-[11px] font-medium mt-1 uppercase tracking-wider">{s.cat}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
