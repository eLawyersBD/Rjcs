import React, { useState } from 'react';
import { RJSC_SERVICES } from '../data/lawyersData';
import { RjscService } from '../types';
import { FileCheck2, Clock, FileText, ChevronRight, CheckCircle2, AlertCircle, X, Shield, ArrowRight } from 'lucide-react';

interface RjscServicesSectionProps {
  onOpenConsultationWithService: (serviceTitle: string) => void;
  searchQuery: string;
}

export const RjscServicesSection: React.FC<RjscServicesSectionProps> = ({
  onOpenConsultationWithService,
  searchQuery
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalService, setActiveModalService] = useState<RjscService | null>(null);

  const filterCategories = [
    { id: 'all', label: 'All 14 RJSC Services' },
    { id: 'annual', label: 'Annual Returns & Filings' },
    { id: 'director', label: 'Director Changes' },
    { id: 'capital', label: 'Share & Capital' },
    { id: 'amendments', label: 'MOA/AOA & Name' },
    { id: 'foreign-partner', label: 'Foreign & Partnership' }
  ];

  const filteredServices = RJSC_SERVICES.filter(service => {
    // Search query match
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      service.title.toLowerCase().includes(q) ||
      service.shortDescription.toLowerCase().includes(q) ||
      service.tagKeywords.some(k => k.toLowerCase().includes(q)) ||
      service.number.includes(q);

    if (!matchesSearch) return false;

    // Category filter match
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'annual') return service.id.includes('annual');
    if (selectedCategory === 'director') return service.id.includes('director');
    if (selectedCategory === 'capital') return service.id.includes('capital') || service.id.includes('share');
    if (selectedCategory === 'amendments') return service.id.includes('name') || service.id.includes('memorandum') || service.id.includes('winding');
    if (selectedCategory === 'foreign-partner') return service.id.includes('foreign') || service.id.includes('partnership');

    return true;
  });

  return (
    <section id="rjsc-services" className="bg-slate-50/50 py-16 sm:py-20 text-slate-800 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-200">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-emerald-100/80 border border-emerald-200/80 text-emerald-800 font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full shadow-2xs">
              <FileCheck2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>RJSC Statutory Compliance Bangladesh</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-slate-900 tracking-tight">
              Complete Corporate Legal Solutions
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
              From annual return filings (Form C, Form XII, Form XV), director appointments, share transfers, capital restructuring, MOA/AOA amendments to partnership registrations — managed with 100% statutory precision.
            </p>
          </div>

          <div className="shrink-0">
            <span className="inline-flex items-center gap-2 bg-white border border-slate-200/80 px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-700 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00C896] animate-pulse" />
              <span>Showing {filteredServices.length} of {RJSC_SERVICES.length} Core Services</span>
            </span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filterCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold tracking-wide transition-all duration-200 flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-md ring-2 ring-slate-900/10'
                  : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80 shadow-2xs'
              }`}
            >
              {selectedCategory === cat.id && <span className="w-1.5 h-1.5 rounded-full bg-[#00C896]" />}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center space-y-4 shadow-sm max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-serif">No RJSC services match "{searchQuery}"</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Try searching for broader legal keywords like "Director", "Return", "Capital", or "Share Transfer".</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm"
            >
              Reset Search Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white border border-slate-200/80 hover:border-emerald-500/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group relative overflow-hidden"
              >
                {/* Accent Top Border Bar on Hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#00C896] transition-colors duration-300" />

                {/* Background Number Accent */}
                <span className="absolute top-4 right-5 font-serif font-black text-4xl sm:text-5xl text-slate-100 group-hover:text-emerald-500/10 pointer-events-none transition-colors select-none">
                  {service.number}
                </span>

                {/* Service Image */}
                {service.imageUrl && (
                  <div className="w-full h-44 mb-5 overflow-hidden rounded-2xl border border-slate-100 bg-slate-100 relative">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.fallback) {
                          target.dataset.fallback = 'true';
                          target.src = `https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80`;
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/40 via-transparent to-transparent opacity-60" />
                  </div>
                )}

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between gap-2">
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 font-extrabold text-[11px] px-3 py-1 rounded-xl font-mono">
                      Form #{service.number}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      {service.estimatedTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 font-serif group-hover:text-emerald-700 transition-colors leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 font-normal">
                    {service.shortDescription}
                  </p>

                  {/* Key forms tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {service.tagKeywords.slice(0, 3).map((kw, i) => (
                      <span key={i} className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2.5 py-1 rounded-lg border border-slate-200/60">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-3 relative z-10">
                  <button
                    onClick={() => setActiveModalService(service)}
                    className="text-xs font-bold text-slate-700 hover:text-emerald-700 flex items-center gap-1 transition-colors group/btn"
                  >
                    <span>Check Docs</span>
                    <ChevronRight className="w-4 h-4 text-emerald-600 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={() => onOpenConsultationWithService(service.title)}
                    className="bg-[#00C896] hover:bg-emerald-600 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 hover:scale-[1.02] active:scale-98"
                  >
                    <span>Order Service</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal for Selected Service */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 text-slate-800">
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="bg-[#00C896] text-slate-950 font-bold text-xs px-3 py-1 rounded-lg font-mono">
                  RJSC Service #{activeModalService.number}
                </span>
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                  <Clock className="w-3.5 h-3.5" /> {activeModalService.estimatedTime}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
                {activeModalService.title}
              </h3>
            </div>

            <div className="space-y-5 text-xs sm:text-sm text-slate-700">
              <p className="leading-relaxed text-slate-600">
                {activeModalService.fullDescription}
              </p>

              {/* What We Handle */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-3">
                <h4 className="font-bold text-emerald-800 text-xs uppercase tracking-wider flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-600" /> What E-Lawyers Manages For You
                </h4>
                <ul className="space-y-2 pt-1">
                  {activeModalService.keyIncludes.map((inc, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Required Documents Checklist */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-3">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-600" /> Required Client Documents Checklist
                </h4>
                <ul className="space-y-2 pt-1">
                  {activeModalService.requiredDocuments.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                      <span className="w-2 h-2 rounded-full bg-[#00C896] shrink-0 mt-1.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => setActiveModalService(null)}
                className="w-full sm:w-auto text-xs text-slate-600 hover:text-slate-900 font-bold px-4 py-2.5 rounded-xl hover:bg-slate-100 transition-colors"
              >
                Close Details
              </button>

              <button
                onClick={() => {
                  const serviceTitle = activeModalService.title;
                  setActiveModalService(null);
                  onOpenConsultationWithService(serviceTitle);
                }}
                className="w-full sm:w-auto bg-[#00C896] hover:bg-emerald-600 text-slate-950 font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-98 transition-all"
              >
                <span>Proceed with {activeModalService.title}</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
