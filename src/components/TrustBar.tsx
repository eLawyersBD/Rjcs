import React, { useState } from 'react';
import { BUSINESS_TYPES_SERVED } from '../data/lawyersData';
import { BusinessType } from '../types';
import { Building2, CheckCircle, ArrowRight } from 'lucide-react';

interface TrustBarProps {
  onOpenConsultationWithCategory: (category: string) => void;
}

export const TrustBar: React.FC<TrustBarProps> = ({ onOpenConsultationWithCategory }) => {
  const [selectedType, setSelectedType] = useState<BusinessType>('Private Limited Company');

  const currentTypeData = BUSINESS_TYPES_SERVED.find(b => b.title === selectedType) || BUSINESS_TYPES_SERVED[1];

  return (
    <section className="bg-slate-50 py-12 border-b border-slate-200 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">Trusted Corporate Partners</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900">
            Trusted by Businesses Across Bangladesh
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Whether you are starting a new venture or managing an established company, our legal professionals provide customized compliance support for your entity stage.
          </p>
        </div>

        {/* Business Type Selector Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {BUSINESS_TYPES_SERVED.map((item) => {
            const isSelected = selectedType === item.title;
            return (
              <button
                key={item.title}
                onClick={() => setSelectedType(item.title)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#00C896] text-slate-950 shadow-md font-bold scale-105'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 hover:border-emerald-500/40'
                }`}
              >
                <span>{item.title}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  isSelected ? 'bg-slate-900 text-emerald-300' : 'bg-slate-100 text-slate-600'
                }`}>
                  {item.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Entity Type Detail Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-emerald-500/10 text-emerald-700 rounded-lg border border-emerald-500/30">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-emerald-700 font-bold uppercase tracking-wider">{currentTypeData.badge} Structure</span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif">{currentTypeData.title}</h3>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              {currentTypeData.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
              <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Statutory Records</span>
              <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> RJSC Compliance</span>
              <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Governance & Risk Shield</span>
            </div>
          </div>

          <div className="w-full md:w-auto shrink-0 pt-2 md:pt-0">
            <button
              onClick={() => onOpenConsultationWithCategory(`Compliance for ${currentTypeData.title}`)}
              className="w-full md:w-auto bg-[#00C896] hover:bg-emerald-600 text-slate-950 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Get {currentTypeData.title} Advice</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
