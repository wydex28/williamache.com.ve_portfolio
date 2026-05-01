"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import DashboardFooter from '@/components/DashboardFooter';
import AboutSection from '@/components/AboutSection';
import ResumeSection from '@/components/ResumeSection';
import PortfolioSection from '@/components/PortfolioSection';
import SkillsSection from '@/components/SkillsSection';
import CertificatesSection from '@/components/CertificatesSection';
import ContactSection from '@/components/ContactSection';
import InspirationModal from '@/components/InspirationModal';
import Navbar from '@/components/Navbar';
import { usePortfolio } from '@/context/PortfolioContext';

export default function Home() {
  const [activeTab, setActiveTab] = useState('about');
  const [isInspirationOpen, setIsInspirationOpen] = useState(false);
  const { t } = usePortfolio();

  return (
    <>
      <div className="bg-glow w-[500px] h-[500px] bg-dracula-purple/10 top-[-200px] left-[-200px] animate-pulse-slow"></div>
      <div className="bg-glow w-[600px] h-[600px] bg-dracula-cyan/10 bottom-[-200px] right-[-200px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      <main className="container mx-auto px-4 py-8 max-w-[1400px] relative z-10 flex flex-col lg:flex-row gap-8">
        
        <Sidebar />

        <div className="w-full lg:w-2/3 xl:w-3/4 flex flex-col gap-6">
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="glass rounded-3xl p-6 lg:p-10 shadow-2xl relative min-h-[600px] border border-dracula-comment/20">
            {activeTab === 'about' && <AboutSection />}
            {activeTab === 'resume' && <ResumeSection />}
            {activeTab === 'skills' && <SkillsSection />}
            {activeTab === 'portfolio' && <PortfolioSection />}
            {activeTab === 'certificates' && <CertificatesSection />}
            {activeTab === 'contact' && <ContactSection />}
          </div>
        </div>
      </main>

      <DashboardFooter onOpenInspiration={() => setIsInspirationOpen(true)} />

      <InspirationModal 
        isOpen={isInspirationOpen} 
        onClose={() => setIsInspirationOpen(false)} 
      />
    </>
  );
}
