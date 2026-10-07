import React from 'react';
import { COMPANY_CONTACT_INFO, TARGET_KEYWORDS } from '../data/lawyersData';
import { Scale, Phone, Mail, MapPin, Zap, Lock, UserCheck, Calculator, FileCheck, Search, Send, ArrowRight } from 'lucide-react';
import { UserSession } from './ClientAuthModal';

interface FooterProps {
  onOpenConsultation: () => void;
  onOpenConsultationWithService?: (title: string, companyType?: string, details?: string) => void;
  onOpenClientAuth?: () => void;
  currentUser?: UserSession | null;
  onSelectKeyword?: (kw: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenConsultation,
  onOpenConsultationWithService,
  onOpenClientAuth,
  currentUser,
  onSelectKeyword
}) => {
  const quickActions = [
    {
      title: 'Calculate RJSC Compliance Fee',
      desc: 'Instant penalty & statutory fee calculator',
      icon: Calculator,
      action: () => {
        const el = document.getElementById('compliance-calculator');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else onOpenConsultation();
      }
    },
    {
      title: 'Draft Board Resolution',
      desc: 'Automated share transfer & director change docs',
      icon: FileCheck,
      action: () => {
        if (onOpenConsultationWithService) {
          onOpenConsultationWithService('Draft Board Resolution', 'Private Limited Company', 'Need urgent Board Resolution drafting for company records.');
        } else {
          onOpenConsultation();
        }
      }
    },
    {
      title: 'Check Trade License Renewal',
      desc: 'Dhaka City Corporation renewal verification',
      icon: Search,
      action: () => {
        if (onOpenConsultationWithService) {
          onOpenConsultationWithService('Trade License Renewal Check', 'Trade License', 'Inquiring about Trade License renewal fees and timelines.');
        } else {
          onOpenConsultation();
        }
      }
    },
    {
      title: 'Request Express RJSC Filing',
      desc: 'Same-day submission for urgent corporate changes',
      icon: Send,
      action: () => {
        if (onOpenConsultationWithService) {
          onOpenConsultationWithService('Express RJSC Filing', 'Private Limited Company', 'Requesting urgent same-day express RJSC filing service.');
        } else {
          onOpenConsultation();
        }
      }
    }
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 text-xs border-t border-slate-800 pt-12 pb-8">
      
      {/* Top Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Quick Actions & Client Login Vault Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/30">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  INSTANT CORPORATE ACTIONS
                </span>
                <h3 className="text-lg font-bold font-serif text-white">
                  Quick Legal Actions & Client Portal
                </h3>
              </div>
            </div>

            {/* Client Vault Auth Button */}
            {onOpenClientAuth && (
              <button
                type="button"
                onClick={onOpenClientAuth}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all border shadow-lg ${
                  currentUser
                    ? 'bg-[#00C896] text-slate-950 border-emerald-400 hover:bg-emerald-400'
                    : 'bg-slate-800 hover:bg-slate-700 text-emerald-300 border-emerald-500/40'
                }`}
              >
                {currentUser ? (
                  <>
                    <UserCheck className="w-4 h-4 text-slate-950" />
                    <span>Access {currentUser.companyName.split(' ')[0]} Vault</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <span>Client Vault Login</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((qa, index) => {
              const QAIcon = qa.icon;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={qa.action}
                  className="p-3.5 bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/50 rounded-xl text-left transition-all group flex flex-col justify-between space-y-2 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-emerald-400 group-hover:bg-[#00C896] group-hover:text-slate-950 transition-colors">
                      <QAIcon className="w-4 h-4" />
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 font-serif">
                      {qa.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {qa.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <a href="https://elawyersbd.com/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 group" title="Visit elawyersbd.com">
              <div className="w-10 h-10 bg-[#00C896] rounded-lg flex items-center justify-center text-slate-950 font-bold shadow-md group-hover:scale-105 transition-transform">
                <Scale className="w-6 h-6 text-slate-950" />
              </div>
              <div>
                <span className="text-xl font-bold font-serif text-white tracking-wide group-hover:text-emerald-400 transition-colors">E-LAWYERS</span>
                <p className="text-[10px] text-emerald-400 font-bold font-mono">elawyersbd.com • Legal Consultancy</p>
              </div>
            </a>

            <p className="text-slate-400 leading-relaxed text-xs">
              Dedicated to streamlining your corporate operations efficiently in Bangladesh. Complete RJSC, Company Secretarial, Income Tax, Trademark, and Corporate Legal Solutions.
            </p>

            <div className="space-y-2 pt-1 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{COMPANY_CONTACT_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="https://appointment.accounticca.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-mono font-semibold hover:underline transition-colors">
                  {COMPANY_CONTACT_INFO.primaryPhoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="https://appointment.accounticca.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-semibold hover:underline transition-colors">
                  Inquiry Email
                </a>
              </div>
            </div>
          </div>

          {/* Primary Legal Practice Areas */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-bold text-white text-sm font-serif border-b border-slate-800 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00C896]" />
              Core Corporate Practice Areas
            </h4>
            <ul className="space-y-2.5 text-xs">
              {TARGET_KEYWORDS.primary.map((kw, i) => (
                <li key={i}>
                  <button
                    onClick={() => onSelectKeyword && onSelectKeyword(kw)}
                    className="text-slate-300 hover:text-emerald-300 transition-all text-left flex items-center gap-2 group w-full py-0.5"
                  >
                    <ArrowRight className="w-3 h-3 text-emerald-500 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    <span className="group-hover:translate-x-0.5 transition-transform">{kw}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & Services */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-bold text-white text-sm font-serif border-b border-slate-800 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00C896]" />
              Specialized RJSC & Tax Compliance
            </h4>
            <div className="flex flex-wrap gap-2 pt-1">
              {TARGET_KEYWORDS.secondary.map((sec, i) => (
                <button
                  key={i}
                  onClick={() => onSelectKeyword && onSelectKeyword(sec)}
                  className="bg-slate-900 hover:bg-emerald-950/80 border border-slate-800 hover:border-emerald-500/50 text-slate-300 hover:text-emerald-300 px-3 py-1.5 rounded-lg text-[11px] transition-all shadow-sm flex items-center gap-1.5 group cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-[#00C896] transition-colors" />
                  <span>{sec}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} E-LAWYERS Legal & Business Consultancy Firm. All Rights Reserved.</p>
          <div className="flex items-center space-x-4">
            <span>Bangladesh Companies Act 1994 Compliance</span>
            <span>•</span>
            <span>RJSC Authorized Practice</span>
          </div>
        </div>

      </div>

    </footer>
  );
};
