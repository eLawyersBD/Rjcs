import React, { useState } from 'react';
import { FAQS_LIST } from '../data/lawyersData';
import { HelpCircle, ChevronDown, ChevronUp, Search, Bot } from 'lucide-react';

interface FaqSectionProps {
  onOpenConsultation: () => void;
  onOpenAiAssistant: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenConsultation, onOpenAiAssistant }) => {
  const [openFaqId, setOpenFaqId] = useState<string>('faq-1');
  const [faqQuery, setFaqQuery] = useState<string>('');

  const filteredFaqs = FAQS_LIST.filter(faq => {
    const q = faqQuery.toLowerCase().trim();
    if (!q) return true;
    return faq.question.toLowerCase().includes(q) ||
           faq.answer.toLowerCase().includes(q) ||
           faq.category.toLowerCase().includes(q);
  });

  return (
    <section id="faqs" className="bg-white py-16 text-slate-800 border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-700 font-bold text-xs uppercase px-3 py-1 rounded-full">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Corporate Compliance FAQs</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-serif text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Common answers regarding RJSC annual return filing, foreign directors, share transfers, and company secretarial requirements in Bangladesh.
          </p>

          {/* Search FAQs */}
          <div className="pt-4 max-w-md mx-auto relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={faqQuery}
              onChange={(e) => setFaqQuery(e.target.value)}
              placeholder="Filter FAQs (e.g., Annual return, Foreign director, Shares)..."
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs rounded-xl pl-10 pr-4 py-2.5 focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-2xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-amber-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono bg-amber-500/10 text-amber-800 border border-amber-500/30 px-2 py-0.5 rounded font-semibold">
                      {faq.category}
                    </span>
                    <span>{faq.question}</span>
                  </div>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-amber-600 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 border-t border-slate-200 leading-relaxed space-y-3">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-10 bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center space-y-3 shadow-sm">
          <h3 className="font-bold text-slate-900 text-base font-serif">Have a Specific Legal Question Regarding Your Company?</h3>
          <p className="text-xs text-slate-600 max-w-xl mx-auto">
            Our corporate legal team is available to analyze your specific corporate situation and offer immediate advice.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={onOpenConsultation}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl shadow-md"
            >
              Talk to a Corporate Lawyer
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
