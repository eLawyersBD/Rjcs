import React from 'react';
import { RISKS_OF_NON_COMPLIANCE } from '../data/lawyersData';
import { AlertTriangle, ShieldCheck, ArrowRight, Ban } from 'lucide-react';

interface RisksSectionProps {
  onOpenConsultation: () => void;
}

export const RisksSection: React.FC<RisksSectionProps> = ({ onOpenConsultation }) => {
  return (
    <section id="why-us" className="bg-slate-50 py-16 text-slate-800 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 bg-rose-500/10 border border-rose-500/30 text-rose-700 font-bold text-xs uppercase px-3 py-1 rounded-full">
            <Ban className="w-3.5 h-3.5 text-rose-600" />
            <span>Risk Prevention & Legal Shield</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-serif text-slate-900">
            Why Corporate Compliance Matters in Bangladesh
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Failure to maintain proper compliance with RJSC and statutory requirements can trigger severe operational disruptions and legal liabilities.
          </p>
        </div>

        {/* Risks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {RISKS_OF_NON_COMPLIANCE.map((risk, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 hover:border-rose-400 rounded-2xl p-6 space-y-3 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-rose-50 text-rose-700 rounded-xl border border-rose-200">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                </div>
                <h3 className="font-bold text-slate-900 text-base font-serif">{risk.title}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-1">
                {risk.description}
              </p>
            </div>
          ))}
        </div>

        {/* Protective Shield Banner */}
        <div className="bg-white border border-amber-300 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md relative overflow-hidden">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <span>E-Lawyers Corporate Shield Guarantee</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
              Maintain a Clean Legal Record for Your Company
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Our corporate lawyers conduct full compliance audits, clear backlog filings with RJSC, and ensure your business remains 100% investment-ready and audit-proof.
            </p>
          </div>

          <button
            onClick={onOpenConsultation}
            className="shrink-0 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md flex items-center gap-2"
          >
            <span>Request Compliance Audit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
