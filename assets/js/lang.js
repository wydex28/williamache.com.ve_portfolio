// ===============================
// Configuración inicial
// ===============================
let currentLang = "es"; // Por defecto español

// Diccionario de traducción
const translations = {
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
    "Desarrollador Web": "Desarrollador Web • +7 Años",
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
    "Desarrollador Web": "Web Developer • +7 Years",
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
    cvFile: "./assets/docs/Curriculum Vitae CV - William Ache - Full Stack Laravel - English.pdf",
  },
};

// ===============================
// Función para traducir página
// ===============================
function translatePage(lang) {
  document.querySelectorAll("[data-translate]").forEach((el) => {
    const key = el.getAttribute("data-translate");
    if (translations[lang][key]) {
      // Specifically handle the CV button which has an icon inside
      if (el.classList.contains("cv-link")) {
          const span = el.querySelector("span");
          if (span) span.textContent = translations[lang][key];
      } else {
          el.textContent = translations[lang][key];
      }
    }
  });
}

// ===============================
// Inicializar selector de idioma
// ===============================
function updateLanguageSelector() {
  const langSelector = document.querySelector(".language-selector");
  if(!langSelector) return;
  langSelector.innerHTML = "";

  if (currentLang === "es") {
    langSelector.innerHTML = `
      <a href="#" class="language-link group relative w-8 h-8 rounded-full overflow-hidden hover:scale-110 transition-transform" data-lang="en" title="Change to English">
        <img src="./assets/images/united-states.svg" alt="English" class="w-full h-full object-cover" />
      </a>
    `;
  } else {
    langSelector.innerHTML = `
      <a href="#" class="language-link group relative w-8 h-8 rounded-full overflow-hidden hover:scale-110 transition-transform" data-lang="es" title="Cambiar a Español">
        <img src="./assets/images/spain.svg" alt="Español" class="w-full h-full object-cover" />
      </a>
    `;
  }

  // Reasignar el listener
  const newLink = document.querySelector(".language-link");
  if(newLink) {
      newLink.addEventListener("click", function (e) {
        e.preventDefault();
        currentLang = currentLang === "es" ? "en" : "es";
        updateLanguageSelector();
        translatePage(currentLang);
      });
  }
}

// ===============================
// Inicialización
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  translatePage(currentLang);
  updateLanguageSelector();
});
