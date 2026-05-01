import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';

export default function ContactSection() {
  const { t } = usePortfolio();
  return (
    <section id="contact" className="animate-fade-in-up">
      <header className="mb-10">
        <h2 className="text-4xl lg:text-5xl font-bold text-dracula-fg mb-4 flex items-center gap-4">
          {t('Contacto')}
        </h2>
        <div className="h-1.5 w-24 bg-gradient-to-r from-dracula-purple to-transparent rounded-full"></div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-dracula-fg">¡Hablemos!</h3>
          <p className="text-dracula-fg/70 leading-relaxed text-lg">
            Si tienes un proyecto en mente o simplemente quieres saludar, mi buzón siempre está abierto. Haré todo lo posible por responderte pronto.
          </p>
          
          <div className="bg-dracula-card/30 p-6 rounded-2xl border border-dracula-comment/20 space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-dracula-purple/10 flex items-center justify-center text-dracula-purple border border-dracula-purple/20 group-hover:bg-dracula-purple group-hover:text-dracula-bg transition-all">
                <i className="bi bi-geo-alt-fill text-xl"></i>
              </div>
              <div>
                <p className="text-[10px] text-dracula-comment uppercase font-bold tracking-widest mb-0.5">Ubicación</p>
                <p className="text-dracula-fg font-medium">Aragua, Venezuela 🇻🇪</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-dracula-cyan/10 flex items-center justify-center text-dracula-cyan border border-dracula-cyan/20 group-hover:bg-dracula-cyan group-hover:text-dracula-bg transition-all">
                <i className="bi bi-envelope-check-fill text-xl"></i>
              </div>
              <div>
                <p className="text-[10px] text-dracula-comment uppercase font-bold tracking-widest mb-0.5">Disponibilidad</p>
                <p className="text-dracula-fg font-medium">Abierto a nuevos proyectos y colaboraciones</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-dracula-card/30 p-8 rounded-3xl border border-dracula-comment/20 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-dracula-purple/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-dracula-purple/10 transition-all"></div>
          
          <form action="https://formspree.io/f/mqakozyl" method="POST" className="space-y-5 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="full-name" className="text-sm font-semibold text-dracula-fg/80 ml-1">Nombre Completo</label>
                <input type="text" name="name" id="full-name" placeholder="Tu nombre..." required
                  className="w-full bg-dracula-bg/50 border border-dracula-comment/30 rounded-xl px-4 py-3 text-dracula-fg placeholder:text-dracula-comment/30 focus:outline-none focus:border-dracula-purple focus:ring-1 focus:ring-dracula-purple transition-all shadow-inner" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email-address" className="text-sm font-semibold text-dracula-fg/80 ml-1">Correo Electrónico</label>
                <input type="email" name="_replyto" id="email-address" placeholder="tu@email.com" required
                  className="w-full bg-dracula-bg/50 border border-dracula-comment/30 rounded-xl px-4 py-3 text-dracula-fg placeholder:text-dracula-comment/30 focus:outline-none focus:border-dracula-purple focus:ring-1 focus:ring-dracula-purple transition-all shadow-inner" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-semibold text-dracula-fg/80 ml-1">Asunto</label>
              <input type="text" name="subject" id="subject" placeholder="¿De qué trata tu mensaje?" required
                className="w-full bg-dracula-bg/50 border border-dracula-comment/30 rounded-xl px-4 py-3 text-dracula-fg placeholder:text-dracula-comment/30 focus:outline-none focus:border-dracula-purple focus:ring-1 focus:ring-dracula-purple transition-all shadow-inner" />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-semibold text-dracula-fg/80 ml-1">Mensaje</label>
              <textarea name="message" id="message" rows={4} placeholder="Escribe aquí tu mensaje..." required
                className="w-full bg-dracula-bg/50 border border-dracula-comment/30 rounded-xl px-4 py-3 text-dracula-fg placeholder:text-dracula-comment/30 focus:outline-none focus:border-dracula-purple focus:ring-1 focus:ring-dracula-purple transition-all shadow-inner resize-none"></textarea>
            </div>
            <button type="submit" className="w-full py-4 bg-gradient-to-r from-dracula-purple to-dracula-pink text-dracula-bg font-bold rounded-xl shadow-lg shadow-dracula-purple/20 hover:shadow-dracula-purple/40 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 group/btn">
              <span>Enviar Mensaje</span>
              <i className="bi bi-send-fill group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"></i>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
