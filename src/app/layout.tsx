import type { Metadata } from 'next';
import './globals.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import CursorGlow from '@/components/CursorGlow';
import A11yMenu from '@/components/A11yMenu';
import Preloader from '@/components/Preloader';
import { PortfolioProvider } from '@/context/PortfolioContext';

export const metadata: Metadata = {
  title: 'William Ache - Full-Stack Developer',
  description: 'Portafolio Profesional de William Ache, Desarrollador Full-Stack.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/css/flag-icons.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      <body className="bg-dracula-bg text-dracula-fg font-sans antialiased min-h-screen relative overflow-x-hidden selection:bg-dracula-pink selection:text-dracula-bg">
        <PortfolioProvider>
          <Preloader />
          <CursorGlow />
          {children}
          <A11yMenu />
        </PortfolioProvider>
      </body>
    </html>
  );
}
