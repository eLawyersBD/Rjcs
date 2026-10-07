import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { RjscServicesSection } from './components/RjscServicesSection';
import { IncomeTaxSection } from './components/IncomeTaxSection';
import { CompliancePackagesSection } from './components/CompliancePackagesSection';
import { LegalResourceHub } from './components/LegalResourceHub';
import { IpServicesSection } from './components/IpServicesSection';
import { SecretarialSection } from './components/SecretarialSection';
import { InteractiveComplianceCalculator } from './components/InteractiveComplianceCalculator';
import { SuccessStoriesSection } from './components/SuccessStoriesSection';
import { WorkflowSection } from './components/WorkflowSection';
import { RisksSection } from './components/RisksSection';
import { FaqSection } from './components/FaqSection';
import { ConsultationSection } from './components/ConsultationSection';
import { CoverageMap } from './components/CoverageMap';
import { ComplianceNewsfeed } from './components/ComplianceNewsfeed';
import { ComplianceCalendar } from './components/ComplianceCalendar';
import { ClientDashboard } from './components/ClientDashboard';
import { ConsultationModal } from './components/ConsultationModal';
import { ClientAuthModal, UserSession } from './components/ClientAuthModal';
import { SeoHead } from './components/SeoHead';
import { AiLegalAssistant } from './components/AiLegalAssistant';
import { CommandPalette } from './components/CommandPalette';
import { ShortcutsHelpModal } from './components/ShortcutsHelpModal';
import { GoogleWorkspaceHub } from './components/GoogleWorkspaceHub';
import { Footer } from './components/Footer';
import { Bot, PhoneCall, Scale } from 'lucide-react';
import { COMPANY_CONTACT_INFO } from './data/lawyersData';

export default function App() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  
  const [preselectedService, setPreselectedService] = useState('General RJSC Compliance');
  const [preselectedCompanyType, setPreselectedCompanyType] = useState('Private Limited Company');
  const [initialDetails, setInitialDetails] = useState('');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('rjsc-services');
  const [language, setLanguage] = useState<'EN' | 'BN'>('EN');

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInputTarget =
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement;

      // Ctrl+K or Cmd+K -> Open Global Command Palette & Service Search
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
        return;
      }

      // Alt+A -> Toggle AI Legal Assistant
      if (e.altKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAiAssistantOpen((prev) => !prev);
        return;
      }

      // Alt+C -> Open Free Consultation Modal
      if (e.altKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        setIsConsultationModalOpen(true);
        return;
      }

      // Alt+L -> Toggle Language
      if (e.altKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        setLanguage((prev) => (prev === 'EN' ? 'BN' : 'EN'));
        return;
      }

      // Ctrl+/ or ? (when not inside inputs) -> Open Keyboard Shortcuts Cheat Sheet
      if (!isInputTarget && (e.key === '?' || ((e.ctrlKey || e.metaKey) && e.key === '/'))) {
        e.preventDefault();
        setIsShortcutsModalOpen((prev) => !prev);
        return;
      }

      // Escape -> Priority-based closing of active overlay/modal
      if (e.key === 'Escape') {
        if (isCommandPaletteOpen) {
          setIsCommandPaletteOpen(false);
        } else if (isShortcutsModalOpen) {
          setIsShortcutsModalOpen(false);
        } else if (isConsultationModalOpen) {
          setIsConsultationModalOpen(false);
        } else if (isAuthModalOpen) {
          setIsAuthModalOpen(false);
        } else if (isAiAssistantOpen) {
          setIsAiAssistantOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isCommandPaletteOpen,
    isShortcutsModalOpen,
    isConsultationModalOpen,
    isAuthModalOpen,
    isAiAssistantOpen
  ]);

  const handleOpenConsultation = (serviceTitle?: string, companyType?: string, details?: string) => {
    if (serviceTitle) setPreselectedService(serviceTitle);
    if (companyType) setPreselectedCompanyType(companyType);
    if (details) setInitialDetails(details);
    setIsConsultationModalOpen(true);
  };

  const handleKeywordSelect = (kw: string) => {
    setSearchQuery(kw);
    const rjscSection = document.getElementById('rjsc-services');
    if (rjscSection) {
      rjscSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Dynamic React Helmet Head Meta & SEO Tags */}
      <SeoHead
        activeSection={activeSection}
        currentLanguage={language}
      />

      {/* Sticky Top Header Navigation */}
      <Navbar
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
        onOpenClientAuth={() => setIsAuthModalOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenShortcutsHelp={() => setIsShortcutsModalOpen(true)}
        currentUser={currentUser}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        currentLanguage={language}
        onLanguageChange={setLanguage}
      />

      {/* Main Page Sections */}
      <main>
        {/* Hero Section with Live Service Search */}
        <Hero
          onOpenConsultation={() => handleOpenConsultation()}
          onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
          onSearchChange={(q) => setSearchQuery(q)}
          onSelectCategory={(cat) => setSearchQuery(cat)}
        />

        {/* Target Entity Stages & Trust Bar */}
        <TrustBar
          onOpenConsultationWithCategory={(cat) => handleOpenConsultation(cat)}
        />

        {/* 14 Core RJSC Services Section */}
        <RjscServicesSection
          onOpenConsultationWithService={(title) => handleOpenConsultation(title)}
          searchQuery={searchQuery}
        />

        {/* E-Lawyers Income Tax Services in Bangladesh Section */}
        <IncomeTaxSection
          onOpenConsultationWithService={(title, companyType, details) => handleOpenConsultation(title, companyType, details)}
        />

        {/* Side-by-Side Service Package & Retainer Comparison */}
        <CompliancePackagesSection
          onOpenConsultationWithPackage={(pkgName, details) => handleOpenConsultation(pkgName, undefined, details)}
        />

        {/* Legal Resource Hub & Downloadable Guides */}
        <LegalResourceHub
          onOpenConsultation={(topic) => handleOpenConsultation(topic || "Legal Resource Inquiry")}
        />

        {/* RJSC Fee & Health Calculator */}
        <InteractiveComplianceCalculator
          onOpenConsultationWithParams={(cType, sTitle, details) => handleOpenConsultation(sTitle, cType, details)}
        />

        {/* Client Success Stories & Testimonials */}
        <SuccessStoriesSection
          onOpenConsultationWithService={(title) => handleOpenConsultation(title)}
        />

        {/* Trademark & Copyright IP Section */}
        <IpServicesSection
          onOpenConsultationWithService={(title) => handleOpenConsultation(title)}
        />

        {/* Company Secretarial & Statutory Register Section */}
        <SecretarialSection
          onOpenConsultationWithService={(title) => handleOpenConsultation(title)}
        />

        {/* 5-Step Process Roadmap */}
        <WorkflowSection
          onOpenConsultation={() => handleOpenConsultation("Step 1 - Free Consultation")}
        />

        {/* Non-compliance Risks & Protective Shield */}
        <RisksSection
          onOpenConsultation={() => handleOpenConsultation("Compliance Risk Audit")}
        />

        {/* FAQs */}
        <FaqSection
          onOpenConsultation={() => handleOpenConsultation("General Legal Inquiry")}
          onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
        />

        {/* Interactive Bangladesh Coverage Map */}
        <CoverageMap
          onOpenConsultation={(svc) => handleOpenConsultation(svc || "Regional Legal Inquiry")}
        />

        {/* Live Bangladesh Compliance Newsfeed & Circulars */}
        <ComplianceNewsfeed
          onOpenConsultationWithTopic={(topic) => handleOpenConsultation(topic)}
        />

        {/* 2026 Bangladesh Statutory Deadline Compliance Calendar */}
        <ComplianceCalendar
          onOpenConsultationWithTopic={(topic) => handleOpenConsultation(topic)}
        />

        {/* Secure Client RJSC Filing Status Tracker Dashboard */}
        <ClientDashboard
          onOpenConsultationWithTopic={(topic) => handleOpenConsultation(topic)}
        />

        {/* Google Workspace Cloud Integration (Drive & Sheets) */}
        <div id="google-workspace" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <GoogleWorkspaceHub />
        </div>

        {/* In-page Consultation Booking */}
        <ConsultationSection
          onOpenConsultation={() => handleOpenConsultation()}
        />
      </main>

      {/* Floating Action Buttons (Fixed Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        <a
          href={`tel:${COMPANY_CONTACT_INFO.phones[0]}`}
          className="bg-[#00C896] hover:bg-emerald-600 text-slate-950 p-3.5 rounded-full shadow-xl transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center font-bold"
          title="Call E-Lawyers Directly"
        >
          <PhoneCall className="w-5 h-5 text-slate-950" />
        </a>
      </div>

      {/* Modals & Slide-over AI Panels */}
      <ClientAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLogin={(user) => {
          setCurrentUser(user);
        }}
        onLogout={() => setCurrentUser(null)}
        onNavigateToTracker={() => {
          setActiveSection('client-dashboard');
          const element = document.getElementById('client-dashboard');
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        preselectedService={preselectedService}
        preselectedCompanyType={preselectedCompanyType}
        initialDetails={initialDetails}
      />

      <AiLegalAssistant
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        onOpenConsultation={(cat) => handleOpenConsultation(cat)}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenConsultation={(svc) => handleOpenConsultation(svc)}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
        onOpenClientAuth={() => setIsAuthModalOpen(true)}
        onLanguageToggle={() => setLanguage((prev) => (prev === 'EN' ? 'BN' : 'EN'))}
        currentLanguage={language}
        onOpenShortcutsHelp={() => setIsShortcutsModalOpen(true)}
      />

      <ShortcutsHelpModal
        isOpen={isShortcutsModalOpen}
        onClose={() => setIsShortcutsModalOpen(false)}
      />

      {/* Footer with Quick Actions & Client Vault Login */}
      <Footer
        onOpenConsultation={() => setIsConsultationModalOpen(true)}
        onOpenConsultationWithService={(svc, companyType, details) => handleOpenConsultation(svc, companyType, details)}
        onOpenClientAuth={() => setIsAuthModalOpen(true)}
        currentUser={currentUser}
        onSelectKeyword={(kw) => setSearchQuery(kw)}
      />

    </div>
  );
}
