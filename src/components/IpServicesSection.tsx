import React from 'react';
import { IP_SERVICES } from '../data/lawyersData';
import { ShieldCheck, FileCode, Clock, CheckCircle2, Award, ArrowRight, Lock } from 'lucide-react';

interface IpServicesSectionProps {
  onOpenConsultationWithService: (serviceName: string) => void;
}

export const IpServicesSection: React.FC<IpServicesSectionProps> = ({ onOpenConsultationWithService }) => {
  return (
    <section id="ip-services" className="bg-white py-16 text-slate-800 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-700 font-bold text-xs uppercase px-3 py-1 rounded-full">
            <Lock className="w-3.5 h-3.5 text-amber-600" />
            <span>Brand & Asset Protection</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-serif text-slate-900">
            Trademark & Copyright Registration Bangladesh
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Protect your brand identity, business logos, product names, software source code, websites, and creative assets with legally enforceable IP registrations.
          </p>
        </div>

        {/* IP Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {IP_SERVICES.map((ip) => {
            const isTrademark = ip.id === 'trademark-registration';
            return (
              <div
                key={ip.id}
                className="bg-slate-50 border border-slate-200 hover:border-amber-500/60 rounded-2xl p-6 sm:p-8 space-y-6 shadow-md relative overflow-hidden flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Card Title & Icon */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-amber-700 uppercase tracking-widest font-mono">
                        {isTrademark ? 'Trademarks Act 2009' : 'Copyright Act 2000'}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
                        {ip.title}
                      </h3>
                    </div>
                    <div className="p-3 bg-amber-500/20 text-amber-700 rounded-xl border border-amber-500/30 shrink-0">
                      {isTrademark ? <ShieldCheck className="w-7 h-7" /> : <FileCode className="w-7 h-7" />}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {ip.description}
                  </p>

                  <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                    <span><strong>Timeline:</strong> {ip.timeline}</span>
                  </div>

                  {/* Steps */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-amber-600" />
                      Key Process & Deliverables:
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {ip.keySteps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer Button */}
                <div className="pt-6 border-t border-slate-200">
                  <button
                    onClick={() => onOpenConsultationWithService(ip.title)}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3.5 rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Start {ip.title} Application</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
