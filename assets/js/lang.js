// ===============================
// Configuración inicial
// ===============================
window.currentLang = "es"; // Por defecto español

// Diccionario de traducción
window.translations = {
  es: {
    "Haz click en mi": "Haz click en mi",
    "Resumen": "Resumen",
    "Experiencia": "Experiencia",
    "Habilidades": "Habilidades",
    "Portafolio": "Portafolio",
    "Curriculum Vitae (ES)": "Descargar CV",
    "Correo Electrónico": "Correo Electrónico",
    "Teléfono": "Teléfono",
    "Ubicación": "Ubicación",
    "Ver Correo": "Ver Correo",
    "Ver Teléfono": "Ver Teléfono",
    "Desarrollador Web": "Desarrollador Full-Stack +8 años construyendo soluciones web",
    "Sobre Mí": "Sobre Mí",
    "Todos": "Todos",
    "Lenguajes": "Lenguajes",
    "Frameworks & Librerías": "Frameworks & Librerías",
    "Herramientas & BD": "Herramientas & BD",
    "Blandas": "Blandas",
    "Sistemas": "Sistemas",
    "E-Commerce": "E-Commerce",
    "IA & APIs": "IA & APIs",
    "Language": "Lenguaje",
    "PHP Framework": "Framework PHP",
    "CSS Framework": "Framework CSS",
    "JS Library": "Librería JS",
    "Database": "Base de Datos",
    "DevOps": "DevOps",
    "Cloud Hosting": "Alojamiento Cloud",
    "UI / UX Design": "Diseño UI / UX",
    "Version Control": "Control de Versiones",
    "AI Tooling": "Herramientas de IA",
    "Trabajo en Equipo": "Trabajo en Equipo",
    "Liderazgo": "Liderazgo",
    "Resolución de Problemas": "Resolución de Problemas",
    "Comunicación": "Comunicación",
    "Soft Skill": "Habilidad Blanda",
    "Contacto": "Contacto",
    "¡Hablemos!": "¡Hablemos!",
    "Si tienes un proyecto...": "Si tienes un proyecto en mente o simplemente quieres saludar, mi buzón siempre está abierto. Haré todo lo posible por responderte pronto.",
    "Disponibilidad": "Disponibilidad",
    "Abierto a proyectos": "Abierto a nuevos proyectos y colaboraciones",
    "Nombre Completo": "Nombre Completo",
    "Asunto": "Asunto",
    "Mensaje": "Mensaje",
    "Enviar Mensaje": "Enviar Mensaje",
    "Certificados": "Certificados",
    "Desarrollo Web": "Desarrollo Web",
    "IA & Datos": "IA & Datos",
    "Todos los derechos reservados": "Todos los derechos reservados",
    "Basado en": "Basado en",
    "Inspirado en": "Inspirado en",
    "y adaptado": "y adaptado a mi estilo personal",
    "Inspiración & Educación": "Inspiración & Educación",
    "Hecho con pasión": "Hecho con pasión",
    "Creado por": "Creado por",
    "Actualidad": "Actualidad",
    "Sin derechos reservados": "Sin derechos reservados",
    "Disponible para proyectos": "Disponible para contrataciones y proyectos",
    "Ver fuentes y recursos": "Ver fuentes y recursos",
    "Fuentes que impulsaron este proyecto": "Canales y plataformas que inspiraron el diseño y desarrollo de este portafolio.",
    "¡Hola! ¿En qué puedo ayudarte?": "¡Hola! ¿En qué puedo ayudarte?",
    "Hey": "¡Hey!",
    "Estoy aquí": "Estoy aquí",
    "Hola": "Hola",
    "Sobre Mi P1": "Desarrollador Full-Stack con más de +8 años de experiencia en la construcción de aplicaciones y sistemas robustos. Especializado en el ecosistema Laravel y bases de datos relacionales (MySQL), con sólidos conocimientos en frontend (jQuery, Tailwind CSS, Bootstrap).",
    "Sobre Mi P2": "Enfocado en integrar herramientas y bibliotecas que agilizan los tiempos de desarrollo y elevan la experiencia del usuario (UX). Mi objetivo es crear soluciones escalables, estéticamente impactantes y de alto rendimiento.",
    "Arquitectura Frontend": "Arquitectura Frontend",
    "Frontend Desc": "Uso de metodologías como Atomic Design y componentes modulares para interfaces mantenibles.",
    "Metodología Backend": "Metodología Backend",
    "Backend Desc": "Orientado a la escalabilidad mediante Clean Code, principios SOLID y patrones de diseño.",
    cvFile: "./assets/docs/Curriculum Vitae CV - William Ache - Full Stack Laravel - Español.pdf",
  },
  en: {
    "Haz click en mi": "Click me",
    "Resumen": "About",
    "Experiencia": "Experience",
    "Habilidades": "Skills",
    "Portafolio": "Portfolio",
    "Curriculum Vitae (ES)": "Download CV",
    "Correo Electrónico": "Email",
    "Teléfono": "Phone",
    "Ubicación": "Location",
    "Ver Correo": "View Email",
    "Ver Teléfono": "View Phone",
    "Desarrollador Web": "Full-Stack Developer +8 years building web solutions",
    "Sobre Mí": "About Me",
    "Todos": "All",
    "Lenguajes": "Languages",
    "Frameworks & Librerías": "Frameworks & Libraries",
    "Herramientas & BD": "Tools & DB",
    "Blandas": "Soft Skills",
    "Sistemas": "Systems",
    "E-Commerce": "E-Commerce",
    "IA & APIs": "AI & APIs",
    "Language": "Language",
    "PHP Framework": "PHP Framework",
    "CSS Framework": "CSS Framework",
    "JS Library": "JS Library",
    "Database": "Database",
    "DevOps": "DevOps",
    "Cloud Hosting": "Cloud Hosting",
    "UI / UX Design": "UI / UX Design",
    "Version Control": "Version Control",
    "AI Tooling": "AI Tooling",
    "Trabajo en Equipo": "Teamwork",
    "Liderazgo": "Leadership",
    "Resolución de Problemas": "Problem Solving",
    "Comunicación": "Communication",
    "Soft Skill": "Soft Skill",
    "Contacto": "Contact",
    "¡Hablemos!": "Let's Talk!",
    "Si tienes un proyecto...": "If you have a project in mind or just want to say hi, my inbox is always open. I'll do my best to get back to you soon.",
    "Disponibilidad": "Availability",
    "Abierto a proyectos": "Open to new projects and collaborations",
    "Nombre Completo": "Full Name",
    "Asunto": "Subject",
    "Mensaje": "Message",
    "Enviar Mensaje": "Send Message",
    "Certificados": "Certificates",
    "Desarrollo Web": "Web Development",
    "IA & Datos": "AI & Data",
    "Todos los derechos reservados": "All rights reserved",
    "Basado en": "Based on",
    "Inspirado en": "Inspired by",
    "y adaptado": "and adapted to my personal style",
    "Inspiración & Educación": "Inspiration & Education",
    "Hecho con pasión": "Made with passion",
    "Creado por": "Created by",
    "Actualidad": "Present",
    "Sin derechos reservados": "No rights reserved",
    "Disponible para proyectos": "Available for hiring and projects",
    "Ver fuentes y recursos": "View sources and resources",
    "Fuentes que impulsaron este proyecto": "Channels and platforms that inspired the design and development of this portfolio.",
    "¡Hola! ¿En qué puedo ayudarte?": "Hi! How can I help you?",
    "Hey": "Hey!",
    "Estoy aquí": "I'm here",
    "Hola": "Hello",
    "Sobre Mi P1": "Full-Stack Developer with +8 years of experience building robust applications and systems. Specialized in the Laravel ecosystem and relational databases (MySQL), with solid knowledge in frontend (jQuery, Tailwind CSS, Bootstrap).",
    "Sobre Mi P2": "Focused on integrating tools and libraries that speed up development times and elevate user experience (UX). My goal is to create scalable, aesthetically stunning, and high-performance solutions.",
    "Arquitectura Frontend": "Frontend Architecture",
    "Frontend Desc": "Use of methodologies like Atomic Design and modular components for maintainable interfaces.",
    "Metodología Backend": "Backend Methodology",
    "Backend Desc": "Oriented towards scalability through Clean Code, SOLID principles, and design patterns.",
    cvFile: "./assets/docs/Curriculum Vitae CV - William Ache - Full Stack Laravel - English.pdf",
  },
};

// ===============================
// Función para traducir página
// ===============================
function translatePage(lang) {
  const elements = document.querySelectorAll("[data-translate]");
  
  // Faster cinematic transition
  gsap.to(elements, {
    opacity: 0,
    y: 5,
    filter: "blur(2px)",
    duration: 0.25,
    ease: "power2.in",
    stagger: {
      amount: 0.15,
      from: "start"
    },
    onComplete: () => {
      elements.forEach((el) => {
        const key = el.getAttribute("data-translate");
        if (window.translations[lang][key]) {
          if (el.classList.contains("cv-link")) {
            const span = el.querySelector("span");
            if (span) span.textContent = window.translations[lang][key];
          } else {
            el.textContent = window.translations[lang][key];
          }
        }
      });

      // Reset position for entry
      gsap.set(elements, { y: -5 });

      // Fade in new text
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.4,
        ease: "power2.out",
        stagger: {
          amount: 0.2,
          from: "start"
        },
        onStart: () => {
          // Trigger nav indicator update as soon as the new text starts appearing
          document.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
        }
      });
    }
  });
}

// ===============================
// Inicializar selector de idioma
// ===============================
function updateLanguageSelector() {
  const langSelector = document.querySelector(".language-selector");
  if(!langSelector) return;

  const isEs = window.currentLang === "es";
  
  // Create structure only if it doesn't exist
  if (!langSelector.querySelector('#lang-switch')) {
    langSelector.innerHTML = `
      <div class="flex items-center gap-2 select-none">
        <span id="lang-label-en" class="text-[10px] font-bold transition-colors">EN</span>
        <button id="lang-switch" class="relative inline-flex items-center h-6 w-11 rounded-full bg-dracula-card/80 border border-dracula-comment/30 transition-all duration-500 focus:outline-none group shadow-inner">
          <span class="dot inline-block w-4 h-4 transform rounded-full transition-all duration-500 translate-x-1 shadow-lg flex items-center justify-center overflow-hidden">
              <span class="fi w-full h-full object-cover scale-150"></span>
          </span>
        </button>
        <span id="lang-label-es" class="text-[10px] font-bold transition-colors">ES</span>
      </div>
    `;

    const langSwitch = document.getElementById("lang-switch");
    langSwitch.addEventListener("click", function (e) {
      e.preventDefault();
      window.currentLang = window.currentLang === "es" ? "en" : "es";
      updateLanguageSelector();
      translatePage(window.currentLang);
    });
  }

  // Update existing elements
  const langSwitch = document.getElementById("lang-switch");
  const dot = langSwitch.querySelector('.dot');
  const fi = langSwitch.querySelector('.fi');
  const labelEn = document.getElementById('lang-label-en');
  const labelEs = document.getElementById('lang-label-es');

  if (isEs) {
    langSwitch.classList.add('active');
    dot.classList.remove('translate-x-1');
    dot.classList.add('translate-x-6');
    fi.classList.remove('fi-us');
    fi.classList.add('fi-es');
    labelEs.classList.remove('text-dracula-fg/30');
    labelEs.classList.add('text-dracula-cyan');
    labelEn.classList.remove('text-dracula-cyan');
    labelEn.classList.add('text-dracula-fg/30');
  } else {
    langSwitch.classList.remove('active');
    dot.classList.remove('translate-x-6');
    dot.classList.add('translate-x-1');
    fi.classList.remove('fi-es');
    fi.classList.add('fi-us');
    labelEn.classList.remove('text-dracula-fg/30');
    labelEn.classList.add('text-dracula-cyan');
    labelEs.classList.remove('text-dracula-cyan');
    labelEs.classList.add('text-dracula-fg/30');
  }
}

// ===============================
// Inicialización
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  translatePage(window.currentLang);
  updateLanguageSelector();
});
