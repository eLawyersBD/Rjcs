import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Scale,
  Menu,
  X,
  Clock,
  ChevronRight,
  Bot,
  Globe,
  Languages,
  Check,
  UserCheck,
  Lock,
  Zap,
  ChevronDown,
  FileCheck,
  FileSpreadsheet,
  Calculator,
  CalendarDays,
  HelpCircle,
  Briefcase,
  Layers,
  BookOpen,
  Award,
  ShieldAlert,
  Map,
  MessageSquare,
  Receipt,
  Search,
  Command
} from 'lucide-react';
import { COMPANY_CONTACT_INFO } from '../data/lawyersData';
import { UserSession } from './ClientAuthModal';

interface NavbarProps {
  onOpenConsultation: () => void;
  onOpenAiAssistant: () => void;
  onOpenClientAuth?: () => void;
  onOpenCommandPalette?: () => void;
  onOpenShortcutsHelp?: () => void;
  currentUser?: UserSession | null;
  activeSection: string;
  setActiveSection: (section: string) => void;
  currentLanguage?: 'EN' | 'BN';
  onLanguageChange?: (lang: 'EN' | 'BN') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenConsultation,
  onOpenAiAssistant,
  onOpenClientAuth,
  onOpenCommandPalette,
  onOpenShortcutsHelp,
  currentUser,
  activeSection,
  setActiveSection,
  currentLanguage = 'EN',
  onLanguageChange
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [toolsMenuOpen, setToolsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'BN'>(currentLanguage);

  const handleLanguageToggle = (lang: 'EN' | 'BN') => {
    setLanguage(lang);
    if (onLanguageChange) {
      onLanguageChange(lang);
    }
  };

  const isBn = language === 'BN';

  const servicesSubMenu = [
    {
      id: 'rjsc-services',
      title: isBn ? 'আরজেএসসি সেবাসমূহ' : 'RJSC Registration & Filings',
      desc: isBn ? 'কোম্পানি ইনকর্পোরেশন, ফরম ১৫/৮/১২ ফাইল' : 'Inc, Form XV, VIII, XII, Capital Increase',
      icon: Briefcase
    },
    {
      id: 'income-tax-services',
      title: isBn ? 'ইনকাম ট্যাক্স সার্ভিসেস' : 'Income Tax Services (NBR)',
      desc: isBn ? 'কর্পোরেট ও ব্যক্তিগত কর রিটার্ন, টিডিএস ও আপীল' : 'Corporate & Individual Tax Return, TDS, Appeals',
      icon: Receipt
    },
    {
      id: 'ip-services',
      title: isBn ? 'ট্রেডমার্ক ও আইপি সার্ভিস' : 'Trademark & Intellectual Property',
      desc: isBn ? 'ট্রেডমার্ক রেজিস্ট্রি, প্যাটেন্ট ও কপিরাইট' : 'Logo Registry, Patent, Copyright protection',
      icon: Award
    },
    {
      id: 'secretarial',
      title: isBn ? 'কোম্পানি সিক্রেটারিয়াল সেবাসমূহ' : 'Company Secretarial Services',
      desc: isBn ? 'বোর্ড মিটিং মিনিট, ইজিএম ও ডিরেক্টর পরিবর্তন' : 'Board Minutes, Share Transfer, Form IX',
      icon: Layers
    },
    {
      id: 'packages',
      title: isBn ? 'সার্ভিস প্যাকেজ' : 'All Compliance Packages',
      desc: isBn ? 'স্টার্টআপ ও কর্পোরেট বার্ষিক রিটার্ন বান্ডেল' : 'Startup to Enterprise annual retainer deals',
      icon: Check
    }
  ];

  const toolsSubMenu = [
    {
      id: 'calculator',
      title: isBn ? 'ফি ও পেনাল্টি ক্যালকুলেটর' : 'Govt Fee & Fine Calculator',
      desc: isBn ? 'আরজেএসসি সরকারী চালান ও জরিমানা হিসাব' : 'Instant Govt treasury challan estimate',
      icon: Calculator
    },
    {
      id: 'compliance-calendar',
      title: isBn ? 'কমপ্লায়েন্স ক্যালেন্ডার' : 'Statutory Compliance Calendar',
      desc: isBn ? 'এজিএম ও বার্ষিক রিটার্ন জমার ডেডলাইন' : 'Track AGM & Form VIII annual deadlines',
      icon: CalendarDays
    },
    {
      id: 'resource-hub',
      title: isBn ? 'আইনি নির্দেশিকা ও হাব' : 'Legal Resource Hub',
      desc: isBn ? 'কোম্পানি আইন ১৯৯৪ ও কমপ্লায়েন্স ড্রাফট' : 'Companies Act 1994 guides & templates',
      icon: BookOpen
    },
    {
      id: 'compliance-newsfeed',
      title: isBn ? 'আইনি নিউজফিড' : 'Corporate Compliance News',
      desc: isBn ? 'এনবিআর ও আরজেএসসি নতুন পরিপত্র' : 'Latest NBR, RJSC, BIDA policy updates',
      icon: ShieldAlert
    }
  ];

  const quickActionItems = [
    {
      id: 'compliance-status',
      title: isBn ? 'কমপ্লায়েন্স স্ট্যাটাস চেক' : 'Check Compliance Status',
      desc: isBn ? 'আরজেএসসি ফাইল ট্র্যাকিং ও প্রোগ্রেস বার' : 'Track active RJSC filing stage progress',
      icon: FileCheck,
      action: () => handleNavClick('client-dashboard')
    },
    {
      id: 'annual-return',
      title: isBn ? 'বার্ষিক রিটার্ন জমা' : 'File Annual Return',
      desc: isBn ? 'ফরম ৮ ও শিডিউল ১০ অনলাইন ফাইলিং' : 'Initiate Form VIII & Schedule X filing',
      icon: FileSpreadsheet,
      action: () => handleNavClick('rjsc-services')
    },
    {
      id: 'consult-expert',
      title: isBn ? 'আইনজীবীর পরামর্শ নিন' : 'Consult an Expert',
      desc: isBn ? 'গুলশান অফিসে ইন-পার্সন বা ভার্চুয়াল বুকিং' : 'Book 1-on-1 corporate lawyer meeting',
      icon: Phone,
      action: () => onOpenConsultation()
    },
    {
      id: 'calculate-fees',
      title: isBn ? 'ফি ও পেনাল্টি ক্যালকুলেটর' : 'Calculate Filing Fees',
      desc: isBn ? 'আরজেএসসি গভঃ ট্রেজারি চালান হিসাব' : 'Instant Govt fees & late fine estimate',
      icon: Calculator,
      action: () => handleNavClick('calculator')
    },
    {
      id: 'ai-assistant',
      title: isBn ? 'আইনি এআই অ্যাসিস্ট্যান্ট' : 'Ask AI Legal Assistant',
      desc: isBn ? 'কোম্পানি আইনের উপর ইনস্ট্যান্ট উত্তর' : 'Instant 24/7 Companies Act queries',
      icon: Bot,
      action: () => onOpenAiAssistant()
    }
  ];

  const mainDirectLinks = [
    { id: 'income-tax-services', label: isBn ? 'ইনকাম ট্যাক্স' : 'Income Tax Services' },
    { id: 'packages', label: isBn ? 'প্যাকেজ' : 'Packages' },
    { id: 'contact', label: isBn ? 'যোগাযোগ' : 'Contact' }
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    setServicesMenuOpen(false);
    setToolsMenuOpen(false);
    setQuickActionsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white text-slate-800 shadow-md border-b border-slate-200">
      {/* Top Banner Contact Strip */}
      <div className="hidden lg:block bg-[#090F21] text-xs py-2 px-4 text-slate-200 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <a
              href="https://appointment.accounticca.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold text-white">{COMPANY_CONTACT_INFO.primaryPhoneDisplay}</span>
            </a>
            <a href="https://appointment.accounticca.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-300">WhatsApp / Inquiry</span>
            </a>
            <a href="https://appointment.accounticca.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-300">Inquiry Email</span>
            </a>
          </div>
          <div className="flex items-center space-x-6">
            <a href="https://elawyersbd.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-emerald-400 font-bold hover:underline transition-colors">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>elawyersbd.com</span>
            </a>
            <div className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isBn ? 'পান্থপথ, ঢাকা-১২০৫, বাংলাদেশ' : 'G-5, BTI Centara Grand, Panthapath, Dhaka'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <a
            href="https://elawyersbd.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 cursor-pointer group"
            title="Visit official website: elawyersbd.com"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-slate-900 font-serif group-hover:text-emerald-700 transition-colors">E-LAWYERS</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-mono font-bold px-1.5 py-0.5 rounded border border-emerald-300 group-hover:bg-emerald-600 group-hover:text-white transition-colors">elawyersbd.com</span>
              </div>
              <p className="text-[11px] text-emerald-700 font-semibold tracking-wide">
                {isBn ? 'কর্পোরেট কমপ্লায়েন্স ও কোম্পানি সিক্রেটারিয়াল বিশেষজ্ঞ' : 'Legal & Business Consultancy Firm'}
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links & Sub-Menus */}
          <nav className="hidden lg:flex items-center space-x-2">
            
            {/* SUB MENU 1: SERVICES FLYOUT */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setServicesMenuOpen(!servicesMenuOpen);
                  setToolsMenuOpen(false);
                  setQuickActionsOpen(false);
                }}
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold tracking-wide transition-all ${
                  ['rjsc-services', 'ip-services', 'secretarial', 'packages', 'income-tax-services'].includes(activeSection) || servicesMenuOpen
                    ? 'text-emerald-700 bg-emerald-50 font-bold border border-emerald-300'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{isBn ? 'আরজেএসসি' : 'RJSC'}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${servicesMenuOpen ? 'rotate-180 text-emerald-600' : ''}`} />
              </button>

              {servicesMenuOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setServicesMenuOpen(false)} />
                  <div className="absolute left-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl z-40 overflow-hidden p-2 text-slate-900 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono font-bold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {isBn ? 'আইনি ও আরজেএসসি সার্ভিস' : 'Corporate & Legal Practice'}
                      </span>
                      <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                    </div>

                    <div className="space-y-1">
                      {servicesSubMenu.map((item) => {
                        const ItemIcon = item.icon;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleNavClick(item.id)}
                            className="w-full flex items-start gap-3 p-2.5 rounded-xl text-left hover:bg-slate-50 transition-colors group border border-transparent hover:border-slate-200"
                          >
                            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 group-hover:bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-700">
                              <ItemIcon className="w-4 h-4" />
                            </div>
                            <div className="space-y-0.5">
                              <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 font-serif">
                                {item.title}
                              </div>
                              <div className="text-[10px] text-slate-500 leading-tight">
                                {item.desc}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* SUB MENU 2: TOOLS & RESOURCES FLYOUT */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setToolsMenuOpen(!toolsMenuOpen);
                  setServicesMenuOpen(false);
                  setQuickActionsOpen(false);
                }}
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold tracking-wide transition-all ${
                  ['calculator', 'compliance-calendar', 'resource-hub', 'compliance-newsfeed'].includes(activeSection) || toolsMenuOpen
                    ? 'text-emerald-700 bg-emerald-50 font-bold border border-emerald-300'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{isBn ? 'টুলস ও রিসোর্স' : 'Tools & Calculator'}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${toolsMenuOpen ? 'rotate-180 text-emerald-600' : ''}`} />
              </button>

              {toolsMenuOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setToolsMenuOpen(false)} />
                  <div className="absolute left-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl z-40 overflow-hidden p-2 text-slate-900 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono font-bold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {isBn ? 'কমপ্লায়েন্স ক্যালকুলেটর ও হাব' : 'Statutory Calculators & Guides'}
                      </span>
                      <Calculator className="w-3.5 h-3.5 text-emerald-600" />
                    </div>

                    <div className="space-y-1">
                      {toolsSubMenu.map((item) => {
                        const ItemIcon = item.icon;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleNavClick(item.id)}
                            className="w-full flex items-start gap-3 p-2.5 rounded-xl text-left hover:bg-slate-50 transition-colors group border border-transparent hover:border-slate-200"
                          >
                            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 group-hover:bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-700">
                              <ItemIcon className="w-4 h-4" />
                            </div>
                            <div className="space-y-0.5">
                              <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 font-serif">
                                {item.title}
                              </div>
                              <div className="text-[10px] text-slate-500 leading-tight">
                                {item.desc}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* DIRECT NAV LINKS */}
            {mainDirectLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-2 rounded-lg text-xs font-bold tracking-wide transition-all ${
                  activeSection === link.id
                    ? 'text-emerald-700 bg-emerald-50 border-b-2 border-emerald-600 font-bold'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center space-x-2">

            {/* Global Search Command Palette Button */}
            {onOpenCommandPalette && (
              <button
                type="button"
                onClick={onOpenCommandPalette}
                className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-3 py-2 rounded-xl text-xs border border-slate-200 transition-all shadow-2xs group"
                title="Search services & legal tools (Ctrl+K)"
              >
                <Search className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition-transform" />
                <span className="hidden md:inline">{isBn ? 'খুঁজুন' : 'Search'}</span>
                <kbd className="hidden md:inline-flex items-center gap-0.5 bg-white text-slate-600 border border-slate-300 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded shadow-2xs">
                  <span>⌘K</span>
                </kbd>
              </button>
            )}


            {/* Consultation CTA Button */}
            <a
              href="https://appointment.accounticca.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#00C896] hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{isBn ? 'ফ্রি পরামর্শ নিন' : 'Book Consultation'}</span>
              <ChevronRight className="w-4 h-4 text-slate-950" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none border border-slate-300"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>



      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-4 shadow-xl">
          
          {/* Mobile Language Switcher */}
          <div className="flex items-center justify-between bg-slate-100 p-2.5 rounded-2xl border border-slate-300">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <Globe className="w-4 h-4 text-amber-600" />
              <span>{isBn ? 'ভাষা নির্বাচন করুন (Language)' : 'Select Language'}</span>
            </div>
            <div className="flex bg-white p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => handleLanguageToggle('EN')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  language === 'EN'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => handleLanguageToggle('BN')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  language === 'BN'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                বাংলা
              </button>
            </div>
          </div>

          {/* Mobile Sub-Menu: Services */}
          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2 text-white">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                {isBn ? 'আরজেএসসি ও লিগ্যাল সেবাসমূহ' : 'RJSC & Legal Services'}
              </span>
              <Briefcase className="w-3.5 h-3.5 text-amber-400" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {servicesSubMenu.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className="flex flex-col items-start gap-1 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-left hover:border-amber-500/40 transition-colors"
                  >
                    <ItemIcon className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-white leading-tight font-serif">{item.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Sub-Menu: Calculators & Tools */}
          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2 text-white">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                {isBn ? 'ফি ক্যালকুলেটর ও আইনি টুলস' : 'Calculators & Legal Hub'}
              </span>
              <Calculator className="w-3.5 h-3.5 text-amber-400" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {toolsSubMenu.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className="flex flex-col items-start gap-1 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-left hover:border-amber-500/40 transition-colors"
                  >
                    <ItemIcon className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-white leading-tight font-serif">{item.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Direct Nav Links */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            {mainDirectLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                  activeSection === link.id
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenClientAuth) onOpenClientAuth();
              }}
              className="w-full flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-900 text-amber-400 font-bold px-4 py-3 rounded-xl text-xs shadow-md border border-slate-800"
            >
              <Lock className="w-4 h-4 text-amber-400" />
              <span>{currentUser ? `${currentUser.displayName} Vault` : (isBn ? 'ক্লায়েন্ট পোর্টাল ও ডকুমেন্ট ভল্ট' : 'Client Login & Document Vault')}</span>
            </button>

            <a
              href="https://appointment.accounticca.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-3 rounded-xl text-xs shadow-md"
            >
              <span>{isBn ? 'কর্পোরেট আইনি আইনজীবীর সাথে কথা বলুন' : 'Talk to a Corporate Legal Expert'}</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      )}
    </header>
  );
};


