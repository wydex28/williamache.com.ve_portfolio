import React from 'react';

export default function ResumeSection() {
  return (
    <section id="resume" className="animate-fade-in-up">
      <header className="mb-10">
        <h2 className="text-4xl lg:text-5xl font-bold text-dracula-fg mb-4 flex items-center gap-4">
          Experiencia
        </h2>
        <div className="h-1.5 w-24 bg-gradient-to-r from-dracula-purple to-transparent rounded-full"></div>
      </header>

      <div className="relative">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-dracula-card/50 flex items-center justify-center shadow-lg border border-dracula-comment/30 relative z-10">
            <i className="bi bi-briefcase text-2xl text-dracula-cyan"></i>
          </div>
          <h3 className="text-2xl font-bold text-dracula-fg">Trayectoria Laboral</h3>
        </div>

        <div className="border-l-2 border-dracula-comment/30 pl-8 mb-16 space-y-10 ml-6 -mt-8 pt-12 relative">
          {/* Job 1 */}
          <div className="relative group">
            <div className="absolute w-3 h-3 bg-dracula-comment rounded-full -left-[39px] top-2 transition-all duration-300 group-hover:bg-dracula-purple group-hover:scale-125"></div>
            <h4 className="text-xl font-bold text-dracula-fg mb-1">
              Desarrollador Web Full Stack <span className="text-sm font-normal text-dracula-comment bg-dracula-card px-2 py-0.5 rounded ml-2">+4 años</span>
            </h4>
            <div className="text-dracula-cyan font-medium mb-4 text-sm flex items-center gap-2">
              <a href="https://itoeste.com/" target="_blank" rel="noreferrer" className="hover:text-dracula-pink transition-colors flex items-center">Software Factory | IT OESTE <i className="bi bi-box-arrow-up-right text-[10px] ml-1.5 opacity-70"></i></a>
              <span className="w-1 h-1 bg-dracula-comment rounded-full"></span>
              <span className="text-dracula-fg/60 flex items-center gap-2">Remoto (Buenos Aires) 🇦🇷 • Feb 2022 - Actualidad</span>
            </div>
            <ul className="text-dracula-fg/70 text-sm leading-relaxed space-y-2 list-disc ml-4 marker:text-dracula-purple">
              <li>Diseño y desarrollo de sitios web corporativos y promocionales, combinando arquitectura de información clara con código limpio y modular altamente escalable.</li>
              <li>Creación de sistemas administrativos y paneles de control integrados (dashboards), centralizando la operatividad de los negocios en una sola plataforma.</li>
              <li>Desarrollo de módulos complejos para seguimiento de stock e inventario en tiempo real, con disparadores de alertas automáticas de reposición y reportes a medida.</li>
              <li>Integración de plataformas web bajo tecnología WebView dentro de aplicaciones móviles tanto en iOS como en Android para asegurar experiencias híbridas fluidas.</li>
            </ul>
          </div>

          {/* Job 2 */}
          <div className="relative group">
            <div className="absolute w-3 h-3 bg-dracula-comment rounded-full -left-[39px] top-2 transition-all duration-300 group-hover:bg-dracula-pink group-hover:scale-125"></div>
            <h4 className="text-xl font-bold text-dracula-fg mb-1">
              Desarrollador Web Full Stack / PM <span className="text-sm font-normal text-dracula-comment bg-dracula-card px-2 py-0.5 rounded ml-2">1 año y 2 meses</span>
            </h4>
            <div className="text-dracula-cyan font-medium mb-4 text-sm flex items-center gap-2">
              <a href="https://valdusoft.com/" target="_blank" rel="noreferrer" className="hover:text-dracula-pink transition-colors flex items-center">Valdusoft Desarrollo web <i className="bi bi-box-arrow-up-right text-[10px] ml-1.5 opacity-70"></i></a>
              <span className="w-1 h-1 bg-dracula-comment rounded-full"></span>
              <span className="text-dracula-fg/60 flex items-center gap-2">Remoto (Táchira) 🇻🇪 • Dic 2020 - Ene 2022</span>
            </div>
            <ul className="text-dracula-fg/70 text-sm leading-relaxed space-y-2 list-disc ml-4 marker:text-dracula-pink">
              <li><strong>Director Front-End y Back-End:</strong> Líder técnico integral de la capa visual y del servidor. Encargado de la definición y selección de frameworks, bases de datos y APIs.</li>
              <li>Implementación de arquitecturas complejas para venta directa (Páginas Multinivel), estructurando sistemas de afiliación y paneles de socios.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-dracula-card/50 flex items-center justify-center shadow-lg border border-dracula-comment/30 relative z-10">
            <i className="bi bi-book text-2xl text-dracula-cyan"></i>
          </div>
          <h3 className="text-2xl font-bold text-dracula-fg">Educación</h3>
        </div>

        <div className="border-l-2 border-dracula-comment/30 pl-8 space-y-10 ml-6 -mt-8 pt-12 relative">
          {/* Edu 1 */}
          <div className="relative group">
            <div className="absolute w-3 h-3 bg-dracula-comment rounded-full -left-[39px] top-2 transition-all duration-300 group-hover:bg-dracula-cyan group-hover:scale-125"></div>
            <h4 className="text-xl font-bold text-dracula-fg mb-1">
              Ingeniería de Sistemas <span className="text-sm font-normal text-dracula-comment bg-dracula-card px-2 py-0.5 rounded ml-2">+3 años</span>
            </h4>
            <div className="text-dracula-cyan font-medium mb-4 text-sm flex items-center gap-2">
              <a href="http://www.unasec.com/" target="_blank" rel="noreferrer" className="hover:text-dracula-pink transition-colors flex items-center">Universidad Nacional Abierta (U.N.A) <i className="bi bi-box-arrow-up-right text-[10px] ml-1.5 opacity-70"></i></a>
              <span className="w-1 h-1 bg-dracula-comment rounded-full"></span>
              <span className="text-dracula-fg/60 flex items-center gap-2">Caracas 🇻🇪 • 2018 - 2020</span>
            </div>
            <p className="text-dracula-fg/70 text-sm leading-relaxed">
              Desarrollo de aplicaciones web, implementación de bases de datos relacionales, metodologías ágiles y gestión de proyectos. Formación en algoritmos, PHP, control de versiones y trabajo colaborativo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
