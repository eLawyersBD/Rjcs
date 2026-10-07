import React from 'react';
import { COMPANY_CONTACT_INFO } from '../data/lawyersData';
import { Phone, Mail, MapPin, Scale, Clock, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ConsultationSectionProps {
  onOpenConsultation: () => void;
}

export const ConsultationSection: React.FC<ConsultationSectionProps> = ({ onOpenConsultation }) => {
  return (
    <section id="contact" className="bg-slate-50 py-16 text-slate-800 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Firm Details & Contact */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-widest bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
              <Scale className="w-4 h-4 text-amber-600" />
              <span>Direct Legal Assistance</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-serif text-slate-900">
              Need Professional Corporate Compliance Support?
            </h2>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Your business deserves accurate, timely, and reliable legal support in Bangladesh. Whether you need RJSC annual return filing, director appointments, share transfers, or trademark registration — our legal experts are ready to assist.
            </p>

            {/* Contact Details Grid */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 text-xs sm:text-sm font-semibold">Chamber & Office Address</strong>
                  <span className="text-xs text-slate-600">{COMPANY_CONTACT_INFO.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <Phone className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 text-xs sm:text-sm font-semibold">Direct Legal Telephones</strong>
                  <div className="text-xs text-amber-800 font-mono font-semibold flex flex-wrap gap-x-3 gap-y-1 mt-0.5">
                    {COMPANY_CONTACT_INFO.phones.map((ph, i) => (
                      <a key={i} href={`tel:${ph}`} className="hover:underline">
                        {ph}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <Mail className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 text-xs sm:text-sm font-semibold">Official Email Inquiry</strong>
                  <a href={`mailto:${COMPANY_CONTACT_INFO.email}`} className="text-xs text-amber-800 font-semibold hover:underline">
                    {COMPANY_CONTACT_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-2">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-amber-600" /> Experienced Corporate Lawyers</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-amber-600" /> Complete Documentation</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-amber-600" /> Fast RJSC Processing</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-amber-600" /> Transparent Pricing</span>
            </div>
          </div>

          {/* Right Column: CTA Box */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-md relative">
            <div className="space-y-3">
              <span className="bg-amber-500 text-slate-950 font-bold text-xs px-2.5 py-1 rounded uppercase tracking-wider">
                Book Consultation
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
                Talk to a Corporate Legal Expert Today
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Get immediate guidance on your company's RJSC filings, share transfers, or trademark applications with zero obligation.
              </p>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Response Time: Within 2 Hours during working hours</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>100% Confidential Client Privilege</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <a
                href="https://appointment.accounticca.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-4 rounded-xl text-sm shadow-md flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <span>Schedule Your Free Consultation Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
