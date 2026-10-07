import React from 'react';
import { SECRETARIAL_SERVICES } from '../data/lawyersData';
import { FileText, CheckCircle2, ShieldCheck, ArrowRight, BookOpen } from 'lucide-react';

interface SecretarialSectionProps {
  onOpenConsultationWithService: (serviceName: string) => void;
}

export const SecretarialSection: React.FC<SecretarialSectionProps> = ({ onOpenConsultationWithService }) => {
  return (
    <section id="secretarial" className="bg-slate-50 py-16 text-slate-800 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 pb-6 border-b border-slate-200">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-widest">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>Company Secretarial Services Bangladesh</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-serif text-slate-900">
              Professional Corporate Secretarial Support
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Our company secretarial services help businesses maintain proper corporate records, board resolutions, statutory registers, and corporate governance standards required by auditors and regulators.
            </p>
          </div>

          <button
            onClick={() => onOpenConsultationWithService("Company Secretarial & AGM Services")}
            className="shrink-0 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md flex items-center gap-2"
          >
            <span>Retain Company Secretary</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Secretarial Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECRETARIAL_SERVICES.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 hover:border-amber-500/60 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg"
            >
              <div className="space-y-4">
                <div className="p-3 bg-amber-500/10 text-amber-700 rounded-xl border border-amber-500/20 w-fit">
                  <FileText className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold font-serif text-slate-900">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-2 flex flex-wrap gap-1.5">
                  {item.features.map((feat, fIdx) => (
                    <span key={fIdx} className="bg-slate-50 text-slate-700 text-[10px] px-2 py-0.5 rounded border border-slate-200 flex items-center gap-1 shadow-sm">
                      <CheckCircle2 className="w-2.5 h-2.5 text-amber-600" />
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200">
                <button
                  onClick={() => onOpenConsultationWithService(item.title)}
                  className="w-full text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center justify-between transition-colors"
                >
                  <span>Request Secretarial Support</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
