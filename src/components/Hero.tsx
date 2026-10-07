import React, { useState } from 'react';
import { Search, ShieldCheck, Scale, FileText, CheckCircle2, ArrowRight, Sparkles, Building2, UserCheck, Bot } from 'lucide-react';

interface HeroProps {
  onOpenConsultation: () => void;
  onOpenAiAssistant: () => void;
  onSearchChange: (query: string) => void;
  onSelectCategory: (category: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenConsultation,
  onOpenAiAssistant,
  onSearchChange,
  onSelectCategory
}) => {
  const [localSearch, setLocalSearch] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(localSearch);
    const rjscSection = document.getElementById('rjsc-services');
    if (rjscSection) {
      rjscSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickTagClick = (tag: string) => {
    setLocalSearch(tag);
    onSearchChange(tag);
    const rjscSection = document.getElementById('rjsc-services');
    if (rjscSection) {
      rjscSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-[#0A1128] text-white pt-10 pb-16 overflow-hidden border-b border-slate-800">
      {/* Emerald Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-500/10 blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-300 shadow-md">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Trusted NBR, RJSC & Corporate Practice in Dhaka, Bangladesh</span>
          </div>
        </div>

        {/* Hero Headline & Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-serif leading-tight text-white">
              Complete RJSC, Corporate Compliance & Company Secretarial Services in <span className="text-[#00C896]">Bangladesh</span>
            </h1>

            <p className="text-base sm:text-lg font-bold text-emerald-400 flex items-center gap-2">
              <span>We Handle Your Corporate Compliance So You Can Focus on Growing Your Business.</span>
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              From company annual returns, director appointment, share transfers, capital restructuring, AGM documentation, statutory registers, trademark registration, copyright filing, and corporate secretarial support — we provide end-to-end legal and regulatory compliance services under one roof.
            </p>

            {/* Service Checkmarks Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              {[
                'RJSC Compliance',
                'Company Secretarial',
                'Corporate Legal Advisory',
                'Trademark & Copyright',
                'Partnership Compliance',
                'ESG & Corporate Governance'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-200 bg-slate-900/80 border border-slate-800 rounded-lg px-3 py-2 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#00C896] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Interactive Search Bar */}
            <form onSubmit={handleSearchSubmit} className="pt-2 max-w-xl">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={localSearch}
                  onChange={(e) => {
                    setLocalSearch(e.target.value);
                    onSearchChange(e.target.value);
                  }}
                  placeholder="Search compliance services (e.g., Corporate Tax Return, Annual Return, Director Change)..."
                  className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 text-white placeholder-slate-400 text-xs sm:text-sm rounded-xl pl-11 pr-44 py-3.5 shadow-xl transition-all"
                />
                <div className="absolute right-28 hidden sm:flex items-center pointer-events-none">
                  <kbd className="bg-slate-800 text-slate-300 border border-slate-700 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded shadow-2xs">
                    Ctrl+K
                  </kbd>
                </div>
                <button
                  type="submit"
                  className="absolute right-1.5 bg-[#00C896] hover:bg-emerald-600 text-slate-950 font-extrabold text-xs px-3.5 py-2 rounded-lg transition-all shadow-md"
                >
                  Find Service
                </button>
              </div>

              {/* Quick Keyword Chips */}
              <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-slate-300">
                <span className="font-semibold text-slate-400">Popular:</span>
                {[
                  'Corporate Tax',
                  'Individual Return',
                  'TDS Certificate',
                  'Annual Return',
                  'Share Transfer',
                  'Trademark'
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleQuickTagClick(tag)}
                    className="bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/60 text-slate-300 hover:text-emerald-300 px-2.5 py-1 rounded-md text-[11px] transition-all shadow-sm"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </form>

            {/* Primary Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="https://appointment.accounticca.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#00C896] hover:bg-emerald-600 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl text-sm shadow-lg shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
              >
                <span>Get Free Consultation</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </a>

              <button
                onClick={() => {
                  const calc = document.getElementById('calculator');
                  if (calc) calc.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-emerald-500/40 font-semibold px-6 py-3.5 rounded-xl text-sm transition-all flex items-center gap-2 shadow-sm"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Calculate Fee & Health</span>
              </button>
            </div>
          </div>

          {/* Right Highlight Card - E-Lawyers Advantage Box & Hero Visual */}
          <div className="lg:col-span-5 space-y-4">
            {/* Featured Corporate Legal Hero Image */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group">
              <img
                src="https://i.ibb.co/FkjZMHKZ/image.jpg"
                alt="E-Lawyers Corporate Legal Chamber Bangladesh"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (!target.dataset.triedPng) {
                    target.dataset.triedPng = "true";
                    target.src = "https://i.ibb.co/FkjZMHKZ/image.png";
                  } else if (!target.dataset.triedJpeg) {
                    target.dataset.triedJpeg = "true";
                    target.src = "https://i.ibb.co/FkjZMHKZ/image.jpeg";
                  }
                }}
                className="w-full h-52 sm:h-64 object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B172E] via-[#0B172E]/30 to-transparent" />
              
              {/* Floating Badge on Image */}
              <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md border border-emerald-500/40 text-emerald-300 px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Supreme Court & NBR Panel Advocates</span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                <div>
                  <p className="text-xs font-bold text-white font-serif">Dhaka Corporate Chamber</p>
                  <p className="text-[10px] text-emerald-400 font-mono">RJSC, NBR Tax & Secretarial Desk</p>
                </div>
                <div className="p-1.5 bg-emerald-500/20 rounded-lg border border-emerald-500/30 text-emerald-300">
                  <Scale className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="bg-[#0B172E]/90 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-5 relative overflow-hidden backdrop-blur-sm">
              <div className="flex items-center space-x-3 pb-3 border-b border-slate-800">
                <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/30">
                  <Scale className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base font-serif">Why Business Leaders Trust E-Lawyers</h3>
                  <p className="text-xs text-emerald-400/90 font-medium">Dhaka Income Tax, RJSC & Secretarial Practice</p>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">Senior High Court & NBR Tax Panel</strong>
                    <span className="text-slate-400">Advocates & NBR Income Tax Practitioners (ITP) with decades of experience.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">100% Complete One-Stop Solution</strong>
                    <span className="text-slate-400">From income tax returns, TDS advisory, share allotments, to trademark registration.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">Fast & Reliable NBR / RJSC Processing</strong>
                    <span className="text-slate-400">Direct filing with official tax acknowledgment receipt and certified document delivery.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">Transparent & Affordable Pricing</strong>
                    <span className="text-slate-400">Zero hidden charges with clear statutory fees and professional legal rates.</span>
                  </div>
                </div>
              </div>

              {/* Stat Strip */}
              <div className="pt-4 border-t border-slate-800 grid grid-cols-3 gap-2 text-center">
                <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-lg font-black text-emerald-400 font-serif">100%</div>
                  <div className="text-[10px] text-slate-400 font-medium">Tax & Legal Accuracy</div>
                </div>
                <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-lg font-black text-emerald-400 font-serif">1,200+</div>
                  <div className="text-[10px] text-slate-400 font-medium">Clients & Companies</div>
                </div>
                <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-lg font-black text-emerald-400 font-serif">14+</div>
                  <div className="text-[10px] text-slate-400 font-medium">Tax & Legal Services</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
