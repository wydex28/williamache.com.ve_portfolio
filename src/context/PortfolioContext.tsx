"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'es' | 'en';
type Theme = 'dark' | 'light';

const translations = {
  es: {
    "Resumen": "Resumen",
    "Experiencia": "Experiencia",
    "Habilidades": "Habilidades",
    "Portafolio": "Portafolio",
    "Certificados": "Certificados",
    "Contacto": "Contacto",
    "Sobre Mí": "Sobre Mí",
    "Descargar CV": "Descargar CV",
    "¡Haz click en mi!": "¡Haz click en mi!",
    "Correo Electrónico": "Correo Electrónico",
    "Teléfono": "Teléfono",
    "Ubicación": "Ubicación",
    "Lo Que Hago": "Lo Que Hago",
    "Habilidades Técnicas": "Habilidades Técnicas",
    "Sistemas Administrativos": "Sistemas Administrativos",
    "E-commerce Integral": "E-commerce Integral",
    "Integración IA & APIs": "Integración IA & APIs",
    "DevOps & Cloud": "DevOps & Cloud",
    "Visitas Totales": "Visitas Totales",
    "Clima Maracay": "Clima Maracay",
    "Inspiración": "Inspiración",
    "Disponible para proyectos": "Disponible para contrataciones y proyectos",
    "Todos": "Todos",
    "Nombre Completo": "Nombre Completo",
    "Asunto": "Asunto",
    "Mensaje": "Mensaje",
    "Enviar Mensaje": "Enviar Mensaje",
    "Desarrollador Full-Stack": "Desarrollador Full-Stack",
  },
  en: {
    "Resumen": "About",
    "Experiencia": "Experience",
    "Habilidades": "Skills",
    "Portafolio": "Portfolio",
    "Certificados": "Certificates",
    "Contacto": "Contact",
    "Sobre Mí": "About Me",
    "Descargar CV": "Download CV",
    "¡Haz click en mi!": "Click me!",
    "Correo Electrónico": "Email",
    "Teléfono": "Phone",
    "Ubicación": "Location",
    "Lo Que Hago": "What I Do",
    "Habilidades Técnicas": "Technical Skills",
    "Sistemas Administrativos": "Admin Systems",
    "E-commerce Integral": "Full E-commerce",
    "Integración IA & APIs": "AI & APIs Integration",
    "DevOps & Cloud": "DevOps & Cloud",
    "Visitas Totales": "Total Visits",
    "Clima Maracay": "Maracay Weather",
    "Inspiración": "Inspiration",
    "Disponible para proyectos": "Available for hiring and projects",
    "Todos": "All",
    "Nombre Completo": "Full Name",
    "Asunto": "Subject",
    "Mensaje": "Message",
    "Enviar Mensaje": "Send Message",
    "Desarrollador Full-Stack": "Full-Stack Developer",
  }
};

interface PortfolioContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  t: (key: string) => string;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('es');
  const [theme, setTheme] = useState<Theme>('dark');

  // Persistence
  useEffect(() => {
    const savedLang = localStorage.getItem('portfolio_lang') as Language;
    const savedTheme = localStorage.getItem('portfolio_theme') as Theme;
    if (savedLang) setLang(savedLang);
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'light') document.body.classList.add('light-theme');
    }
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('portfolio_lang', newLang);
  };

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('portfolio_theme', newTheme);
    if (newTheme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  };

  const t = (key: string) => {
    return translations[lang][key as keyof typeof translations['es']] || key;
  };

  return (
    <PortfolioContext.Provider value={{ lang, setLang: handleSetLang, theme, setTheme: handleSetTheme, t }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
