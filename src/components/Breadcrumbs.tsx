import React, { useEffect, useState } from 'react';
import { Home, ChevronRight, Scale, ShieldCheck, FileText, MapPin, Newspaper, Clock, Building2, HelpCircle, PhoneCall, Layers, Calendar } from 'lucide-react';

interface BreadcrumbsProps {
  activeSection: string;
  setActiveSection: (sectionId: string) => void;
  currentLanguage: 'EN' | 'BN';
}

interface SectionMeta {
  id: string;
  labelEn: string;
  labelBn: string;
  categoryEn: string;
  categoryBn: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SECTIONS_CONFIG: SectionMeta[] = [
  { id: 'rjsc-services', labelEn: 'RJSC Services', labelBn: 'আরজেএসসি সেবা', categoryEn: 'Corporate Services', categoryBn: 'কর্পোরেট সেবাসমূহ', icon: Scale },
  { id: 'ip-services', labelEn: 'Trademark & IP', labelBn: 'ট্রেডমার্ক ও আইপি', categoryEn: 'Intellectual Property', categoryBn: 'বুদ্ধিবৃত্তিক সম্পদ', icon: ShieldCheck },
  { id: 'secretarial', labelEn: 'Company Secretarial', labelBn: 'কোম্পানি সিক্রেটারিয়াল', categoryEn: 'Compliance Governance', categoryBn: 'গভর্নেন্স ও কমপ্লায়েন্স', icon: FileText },
  { id: 'process', labelEn: '5-Step Process', labelBn: '৫-ধাপের প্রক্রিয়া', categoryEn: 'Workflow Guide', categoryBn: 'কার্যপ্রণালী নির্দেশিকা', icon: Layers },
  { id: 'why-us', labelEn: 'Why E-Lawyers', labelBn: 'কেন ই-লয়ার্স', categoryEn: 'Firm Overview', categoryBn: 'প্রতিষ্ঠানের বিবরণ', icon: Building2 },
  { id: 'faqs', labelEn: 'FAQs', labelBn: 'প্রশ্নোত্তর', categoryEn: 'Help & Resources', categoryBn: 'সহায়তা ও তথ্য', icon: HelpCircle },
  { id: 'compliance-newsfeed', labelEn: 'Compliance News', labelBn: 'আইনি নিউজফিড', categoryEn: 'Legal Gazette Update', categoryBn: 'আইনি গেজেট আপডেট', icon: Newspaper },
  { id: 'compliance-calendar', labelEn: 'Compliance Calendar', labelBn: 'কমপ্লায়েন্স ক্যালেন্ডার', categoryEn: 'Statutory Deadlines', categoryBn: 'সংবিধিবদ্ধ সময়সীমা', icon: Calendar },
  { id: 'client-dashboard', labelEn: 'Client Tracker', labelBn: 'ক্লায়েন্ট ট্র্যাকার', categoryEn: 'Client Portal', categoryBn: 'ক্লায়েন্ট পোর্টাল', icon: Clock },
  { id: 'coverage-map', labelEn: 'Coverage Map', labelBn: 'দেশব্যাপী ম্যাপ', categoryEn: 'Jurisdiction', categoryBn: 'এখতিয়ার', icon: MapPin },
  { id: 'contact', labelEn: 'Contact Us', labelBn: 'যোগাযোগ', categoryEn: 'Consultation', categoryBn: 'পরামর্শ বুকিং', icon: PhoneCall }
];

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  activeSection,
  setActiveSection,
  currentLanguage
}) => {
  const isBn = currentLanguage === 'BN';
  const [scrolledSection, setScrolledSection] = useState<string>(activeSection || 'hero');

  // Sync scroll detection using IntersectionObserver or scroll position
  useEffect(() => {
    const sectionElements = SECTIONS_CONFIG.map((s) => document.getElementById(s.id)).filter(Boolean);

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      if (scrollPos < 400) {
        setScrolledSection('hero');
        return;
      }

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPos) {
          setScrolledSection(el.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const currentSectionConfig = SECTIONS_CONFIG.find((s) => s.id === (scrolledSection || activeSection));

  const handleBreadcrumbClick = (id: string) => {
    setActiveSection(id);
    if (id === 'hero' || id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      aria-label="Breadcrumb navigation"
      className="bg-slate-900 border-b border-slate-800 text-slate-300 text-xs py-2.5 px-4 sm:px-6 lg:px-8 shadow-inner transition-all relative z-30"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
        
        {/* Breadcrumb Trail */}
        <ol className="flex items-center space-x-2 whitespace-nowrap">
          
          {/* Home Link */}
          <li>
            <button
              type="button"
              onClick={() => handleBreadcrumbClick('hero')}
              className="flex items-center gap-1.5 hover:text-amber-400 font-medium transition-colors text-slate-300"
            >
              <Home className="w-3.5 h-3.5 text-amber-400" />
              <span>{isBn ? 'হোম' : 'Home'}</span>
            </button>
          </li>

          {/* Separator */}
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />

          {/* Practice Area / Domain Category */}
          {currentSectionConfig ? (
            <>
              <li>
                <span className="text-slate-400 font-normal">
                  {isBn ? currentSectionConfig.categoryBn : currentSectionConfig.categoryEn}
                </span>
              </li>

              <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />

              {/* Active Current Page Section */}
              <li className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 px-2.5 py-0.5 rounded-md font-semibold">
                {currentSectionConfig.icon && (
                  <currentSectionConfig.icon className="w-3 h-3 text-amber-400 shrink-0" />
                )}
                <span>
                  {isBn ? currentSectionConfig.labelBn : currentSectionConfig.labelEn}
                </span>
              </li>
            </>
          ) : (
            <li>
              <span className="bg-amber-500/10 border border-amber-500/30 text-amber-300 px-2.5 py-0.5 rounded-md font-semibold">
                {isBn ? 'অনলাইন আইনি সেবাসমূহ' : 'Online Corporate Legal Services'}
              </span>
            </li>
          )}

        </ol>

        {/* Quick Back to Top Indicator Button */}
        <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-400 font-mono shrink-0">
          <span>{isBn ? 'অবস্থান: ' : 'Active View: '}</span>
          <span className="text-amber-400 font-semibold">
            {currentSectionConfig
              ? (isBn ? currentSectionConfig.labelBn : currentSectionConfig.labelEn)
              : (isBn ? 'মূল পাতা' : 'Main Page')}
          </span>
        </div>

      </div>
    </nav>
  );
};
