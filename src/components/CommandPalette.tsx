import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  Briefcase,
  FileText,
  Calculator,
  Calendar,
  Bot,
  UserCheck,
  Globe,
  Award,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  HelpCircle,
  Command,
  Receipt,
  Database,
  UploadCloud,
  FileSpreadsheet
} from 'lucide-react';
import { RJSC_SERVICES } from '../data/lawyersData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultation: (serviceTitle?: string) => void;
  onOpenAiAssistant: () => void;
  onOpenClientAuth: () => void;
  onLanguageToggle: () => void;
  currentLanguage: 'EN' | 'BN';
  onOpenShortcutsHelp: () => void;
}

interface PaletteItem {
  id: string;
  title: string;
  description?: string;
  category: 'Actions' | 'RJSC Services' | 'Tax & IP' | 'Tools & Navigation';
  icon: React.ElementType;
  badge?: string;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenConsultation,
  onOpenAiAssistant,
  onOpenClientAuth,
  onLanguageToggle,
  currentLanguage,
  onOpenShortcutsHelp
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMac = typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  // Auto focus on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const scrollToSection = (sectionId: string) => {
    onClose();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Build command palette item list
  const quickActions: PaletteItem[] = [
    {
      id: 'act-consultation',
      title: 'Book Free Legal Consultation',
      description: 'Schedule a call with an advocate in Dhaka',
      category: 'Actions',
      icon: Briefcase,
      badge: 'Alt+C',
      action: () => {
        onClose();
        onOpenConsultation();
      }
    },
    {
      id: 'act-ai',
      title: 'Ask AI Legal Assistant',
      description: 'Instant answers for Bangladesh Companies Act 1994',
      category: 'Actions',
      icon: Bot,
      badge: 'Alt+A',
      action: () => {
        onClose();
        onOpenAiAssistant();
      }
    },
    {
      id: 'act-vault',
      title: 'Client Vault & Filing Tracker',
      description: 'Check your RJSC submission status and deliverables',
      category: 'Actions',
      icon: UserCheck,
      action: () => {
        onClose();
        onOpenClientAuth();
      }
    },
    {
      id: 'act-workspace-drive',
      title: 'Google Drive Legal Vault Sync',
      description: 'Export statutory dossiers & browse files in Google Drive',
      category: 'Actions',
      icon: UploadCloud,
      badge: 'Google Drive',
      action: () => scrollToSection('google-workspace')
    },
    {
      id: 'act-workspace-sheets',
      title: 'Google Sheets Compliance Tracker',
      description: 'Track live RJSC filings and statutory schedules in Sheets',
      category: 'Actions',
      icon: FileSpreadsheet,
      badge: 'Google Sheets',
      action: () => scrollToSection('google-workspace')
    },
    {
      id: 'act-lang',
      title: `Switch Language (${currentLanguage === 'EN' ? 'বাংলা' : 'English'})`,
      description: 'Toggle UI language between English and Bangla',
      category: 'Actions',
      icon: Globe,
      badge: 'Alt+L',
      action: () => {
        onClose();
        onLanguageToggle();
      }
    },
    {
      id: 'act-shortcuts',
      title: 'View Keyboard Shortcuts',
      description: 'Show full cheat sheet for power users',
      category: 'Actions',
      icon: HelpCircle,
      badge: '?',
      action: () => {
        onClose();
        onOpenShortcutsHelp();
      }
    }
  ];

  const toolsItems: PaletteItem[] = [
    {
      id: 'tool-calculator',
      title: 'RJSC Fee & Health Estimator Calculator',
      description: 'Calculate statutory form fees & processing time',
      category: 'Tools & Navigation',
      icon: Calculator,
      action: () => scrollToSection('calculator')
    },
    {
      id: 'tool-calendar',
      title: '2026 Statutory Compliance Deadline Calendar',
      description: 'NBR, RJSC, and AGM filing deadlines in Bangladesh',
      category: 'Tools & Navigation',
      icon: Calendar,
      action: () => scrollToSection('compliance-calendar')
    },
    {
      id: 'tool-packages',
      title: 'Compliance Packages & Retainers',
      description: 'Startup Growth, Corporate Growth & FDI Retainers',
      category: 'Tools & Navigation',
      icon: Layers,
      action: () => scrollToSection('packages')
    },
    {
      id: 'tool-resources',
      title: 'Legal Resource Hub & Downloads',
      description: 'Download statutory guides, checklists, and templates',
      category: 'Tools & Navigation',
      icon: FileText,
      action: () => scrollToSection('legal-hub')
    }
  ];

  const taxIpItems: PaletteItem[] = [
    {
      id: 'tax-corporate',
      title: 'Corporate Income Tax Filing (NBR)',
      description: 'Audited financial submission and Form 108 TDS alignment',
      category: 'Tax & IP',
      icon: Receipt,
      action: () => {
        onClose();
        onOpenConsultation('Corporate Income Tax Filing');
      }
    },
    {
      id: 'tax-individual',
      title: 'Individual Tax Return & e-TIN',
      description: 'Personal income tax filing for directors & expats',
      category: 'Tax & IP',
      icon: Receipt,
      action: () => {
        onClose();
        onOpenConsultation('Individual Tax Return Filing');
      }
    },
    {
      id: 'ip-trademark',
      title: 'Trademark & Logo Registration',
      description: 'Brand protection, trademark search & DPDT registration',
      category: 'Tax & IP',
      icon: Award,
      action: () => scrollToSection('ip-services')
    },
    {
      id: 'sec-secretarial',
      title: 'Company Secretarial & Board Registers',
      description: 'Maintenance of statutory books, share register, Form IX',
      category: 'Tax & IP',
      icon: Layers,
      action: () => scrollToSection('secretarial')
    }
  ];

  const rjscItems: PaletteItem[] = RJSC_SERVICES.map((s) => ({
    id: `rjsc-${s.id}`,
    title: `${s.number}. ${s.title}`,
    description: s.shortDescription,
    category: 'RJSC Services' as const,
    icon: Briefcase,
    action: () => {
      onClose();
      onOpenConsultation(s.title);
    }
  }));

  const allItems: PaletteItem[] = [...quickActions, ...toolsItems, ...taxIpItems, ...rjscItems];

  const filteredItems = query.trim() === ''
    ? allItems
    : allItems.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(query.toLowerCase())) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  // Key navigation (Up, Down, Enter)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] transition-all transform animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Header */}
        <div className="relative flex items-center border-b border-slate-200 px-4 py-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-emerald-600 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search RJSC services, tax, IP, tools, actions (e.g. Annual Return, Tax)..."
            className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm focus:outline-none"
          />
          <div className="flex items-center gap-2 shrink-0 ml-2">
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-slate-200/70 text-slate-600 px-2 py-0.5 rounded border border-slate-300">
              ESC to close
            </span>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Command List Body */}
        <div className="overflow-y-auto p-2 space-y-1 divide-y divide-slate-100">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-slate-500 space-y-2">
              <Sparkles className="w-8 h-8 text-slate-400 mx-auto opacity-50" />
              <p className="text-sm font-semibold">No legal services or actions found for "{query}"</p>
              <p className="text-xs text-slate-400">Try searching for "Annual Return", "Tax", "Director", "Trademark" or "Consultation".</p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div
                      className={`p-2 rounded-lg shrink-0 ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-emerald-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold truncate">{item.title}</span>
                        <span
                          className={`text-[9px] font-semibold px-1.5 py-0.2 rounded uppercase tracking-wider shrink-0 ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-200/60 text-slate-600'
                          }`}
                        >
                          {item.category}
                        </span>
                      </div>
                      {item.description && (
                        <p
                          className={`text-[11px] truncate mt-0.5 ${
                            isSelected ? 'text-emerald-100' : 'text-slate-500'
                          }`}
                        >
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {item.badge && (
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? 'text-white translate-x-0.5' : 'text-slate-400 opacity-0 group-hover:opacity-100'
                      }`}
                    />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Palette Footer Shortcuts Hint */}
        <div className="border-t border-slate-200 px-4 py-2.5 bg-slate-50 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2 font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded shadow-2xs font-bold text-slate-700">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded shadow-2xs font-bold text-slate-700">↓</kbd>
              <span>Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded shadow-2xs font-bold text-slate-700">↵</kbd>
              <span>Select</span>
            </span>
          </div>
          <div className="flex items-center gap-1 text-emerald-800 font-semibold">
            <Command className="w-3.5 h-3.5" />
            <span>Power User Quick Search</span>
          </div>
        </div>
      </div>
    </div>
  );
};
