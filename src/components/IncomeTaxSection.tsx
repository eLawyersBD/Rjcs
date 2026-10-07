import React, { useState } from 'react';
import {
  Receipt,
  FileText,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  Building2,
  UserCheck,
  Coins,
  Download,
  HelpCircle,
  ArrowRight,
  Clock,
  Sparkles,
  Percent,
  Briefcase,
  Award,
  ChevronDown,
  ChevronUp,
  Scale
} from 'lucide-react';

interface IncomeTaxSectionProps {
  onOpenConsultationWithService: (title: string, companyType?: string, details?: string) => void;
}

export const IncomeTaxSection: React.FC<IncomeTaxSectionProps> = ({
  onOpenConsultationWithService
}) => {
  const [activeTab, setActiveTab] = useState<'corporate' | 'individual' | 'tds' | 'appeals'>('corporate');
  const [calculatorIncome, setCalculatorIncome] = useState<number>(800000);
  const [taxpayerType, setTaxpayerType] = useState<'individual_male' | 'individual_female' | 'company_pvt'>('individual_male');
  const [investmentAmount, setInvestmentAmount] = useState<number>(100000);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  // Income Tax Act 2023 Slab Estimation
  const calculateEstimatedTax = () => {
    let tax = 0;
    const income = Number(calculatorIncome) || 0;
    const investment = Number(investmentAmount) || 0;

    if (taxpayerType === 'company_pvt') {
      // Corporate Tax Rate: 27.5% for non-publicly traded or 22.5% if conditions met
      tax = income * 0.275;
    } else {
      // Individual Slabs (Income Tax Act 2023)
      const exemptionLimit = taxpayerType === 'individual_female' ? 400000 : 350000;
      let taxableIncome = Math.max(0, income - exemptionLimit);

      if (taxableIncome > 0) {
        // Next 100,000 at 5%
        const slab1 = Math.min(taxableIncome, 100000);
        tax += slab1 * 0.05;
        taxableIncome -= slab1;
      }
      if (taxableIncome > 0) {
        // Next 300,000 at 10%
        const slab2 = Math.min(taxableIncome, 300000);
        tax += slab2 * 0.10;
        taxableIncome -= slab2;
      }
      if (taxableIncome > 0) {
        // Next 400,000 at 15%
        const slab3 = Math.min(taxableIncome, 400000);
        tax += slab3 * 0.15;
        taxableIncome -= slab3;
      }
      if (taxableIncome > 0) {
        // Next 500,000 at 20%
        const slab4 = Math.min(taxableIncome, 500000);
        tax += slab4 * 0.20;
        taxableIncome -= slab4;
      }
      if (taxableIncome > 0) {
        // Remaining at 25%
        tax += taxableIncome * 0.25;
      }

      // Max Rebate deduction (15% of eligible investment or 3% of total taxable income)
      const rebate = Math.min(investment * 0.15, tax * 0.15);
      tax = Math.max(0, tax - rebate);

      // Minimum Tax in Dhaka/Chittagong City Corporation is BDT 5,000
      if (income > exemptionLimit && tax < 5000) {
        tax = 5000;
      }
    }

    return Math.round(tax);
  };

  const taxServices = [
    {
      id: 'corporate-tax',
      category: 'corporate',
      title: 'Corporate Income Tax Return & Assessment',
      icon: Building2,
      badge: 'Income Tax Act 2023 Compliant',
      description: 'Comprehensive tax computation, Form IT-11G preparation, audited financial statement alignment, and official NBR submission for private limited companies, FDI subsidiaries, and joint ventures.',
      features: [
        'Form IT-11G / IT-11GA Tax Return preparation',
        'Tax depreciation schedules & asset classification',
        'TDS / VDS deduction reconciliation with NBR challans',
        'Official NBR Circle filing & Tax Assessment Order receipt',
        'Tax Clearance Certificate (TCC) issuance support'
      ],
      timeframe: '3 - 5 Working Days'
    },
    {
      id: 'individual-tax',
      category: 'individual',
      title: 'Individual Income Tax Return Filing',
      icon: UserCheck,
      badge: 'Expat & Resident Tax Lawyers',
      description: 'Hassle-free income tax return filing for business owners, salaried professionals, NRBs, and foreign expats. Maximum tax rebate optimization under Income Tax Act 2023.',
      features: [
        'Form IT-11GA Return & Asset-Liability Statement (IT-10B)',
        'Salary, Rental Income, Capital Gains & Dividend tax computation',
        'Exemption & Rebate calculation on Sanchayapatra, DPS & Stocks',
        'Tax Acknowledgement Receipt & Tax Certificate delivery',
        'Foreign Director & Expat tax clearance certificates'
      ],
      timeframe: '1 - 2 Working Days'
    },
    {
      id: 'tds-withholding',
      category: 'tds',
      title: 'TDS & Withholding Tax Compliance (Form 108)',
      icon: Percent,
      badge: 'Monthly & Quarterly Filing',
      description: 'End-to-end withholding tax (TDS) advisory, monthly deduction compliance, Form 108 & 108A annual salary statement filing, and NBR treasury challan verification.',
      features: [
        'Monthly Withholding Tax Return (Form 108A) preparation',
        'Annual Employee Salary Statement (Form 108) filing',
        'Supplier TDS deduction rates & section-wise mapping',
        'TDS Certificate issuance to vendors & contractors',
        'NBR Withholding Tax Audit defense'
      ],
      timeframe: 'Monthly Retainer / On-Demand'
    },
    {
      id: 'tax-appeals',
      category: 'appeals',
      title: 'Tax Audit, Reopening & Appellate Tribunal Cases',
      icon: Scale,
      badge: 'Supreme Court & NBR Advocates',
      description: 'Robust legal defense for NBR tax audit notices, Section 180 audits, reopening notices under Section 212, and representation before Taxes Appellate Tribunal and High Court Division.',
      features: [
        'Notice reply & document presentation before Taxes Circle',
        'Appeal filing before Inspecting Joint/Additional Commissioner',
        'Representation at Taxes Appellate Tribunal (Dhaka)',
        'High Court Division Writ & Reference Petitions',
        'Dispute settlement & penalty waiver negotiations'
      ],
      timeframe: 'Case Dependent'
    }
  ];

  const faqs = [
    {
      q: 'What is the deadline for Corporate & Individual Tax Return Filing in Bangladesh?',
      a: 'For individual taxpayers, Tax Day is usually 30th November of each assessment year (unless extended by NBR). For corporate entities, the return filing deadline is within 6 months from the end of the company’s financial year or 15th day of the eleventh month following the income year.'
    },
    {
      q: 'Is e-TIN mandatory for company directors and individual return filing?',
      a: 'Yes. Under the Income Tax Act 2023, 12-digit e-TIN is mandatory for all company directors, private limited company incorporations, trade license renewals, vehicle registrations, and filing annual returns.'
    },
    {
      q: 'What documents are required for Corporate Income Tax filing?',
      a: 'You will need the Audited Financial Statements (Balance Sheet, Profit & Loss), Trial Balance, Bank Statements, Monthly TDS & VDS Challans, Form XII & Schedule X from RJSC, Depreciation Schedule, and previous year’s Tax Assessment Order.'
    },
    {
      q: 'How does E-Lawyers assist with Tax Clearance Certificates?',
      a: 'Our tax advocates review your income records, prepare error-free returns, file directly with your designated NBR Taxes Circle, obtain the official Tax Assessment Order, and secure your official Tax Clearance Certificate.'
    }
  ];

  return (
    <section id="income-tax-services" className="py-16 bg-slate-50 text-slate-900 relative overflow-hidden border-t border-b border-slate-200">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs uppercase px-4 py-1.5 rounded-full shadow-sm">
            <Receipt className="w-4 h-4 text-emerald-600" />
            <span>National Board of Revenue (NBR) Authorized Legal Practice</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-slate-900 tracking-tight leading-tight">
            Income Tax Services <span className="text-emerald-700">in Bangladesh</span>
          </h2>
          
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Expert Corporate & Individual Income Tax Return Filing, e-TIN Registration, TDS Compliance, Tax Assessment & Appellate Tribunal Legal Representation under the <strong className="text-slate-900 font-semibold">Income Tax Act 2023</strong>.
          </p>
        </div>

        {/* Core Value Highlight Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 text-center space-y-2 shadow-sm">
            <Award className="w-6 h-6 text-emerald-600 mx-auto" />
            <h4 className="text-sm font-bold text-slate-900">NBR Authorized</h4>
            <p className="text-xs text-slate-600">High Court & Taxes Bar Lawyers</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 text-center space-y-2 shadow-sm">
            <ShieldCheck className="w-6 h-6 text-emerald-600 mx-auto" />
            <h4 className="text-sm font-bold text-slate-900">100% Tax Compliant</h4>
            <p className="text-xs text-slate-600">Income Tax Act 2023 Aligned</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 text-center space-y-2 shadow-sm">
            <Clock className="w-6 h-6 text-emerald-600 mx-auto" />
            <h4 className="text-sm font-bold text-slate-900">Fast Token Delivery</h4>
            <p className="text-xs text-slate-600">24-48 Hours Return Filing</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 text-center space-y-2 shadow-sm">
            <Coins className="w-6 h-6 text-emerald-600 mx-auto" />
            <h4 className="text-sm font-bold text-slate-900">Maximum Rebates</h4>
            <p className="text-xs text-slate-600">Legal Tax Savings Optimization</p>
          </div>
        </div>

        {/* Service Category Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 pb-4">
          <button
            onClick={() => setActiveTab('corporate')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeTab === 'corporate'
                ? 'bg-[#00C896] text-slate-950 shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Corporate Tax</span>
          </button>

          <button
            onClick={() => setActiveTab('individual')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeTab === 'individual'
                ? 'bg-[#00C896] text-slate-950 shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Individual & Expats</span>
          </button>

          <button
            onClick={() => setActiveTab('tds')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeTab === 'tds'
                ? 'bg-[#00C896] text-slate-950 shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Percent className="w-4 h-4" />
            <span>TDS & Form 108</span>
          </button>

          <button
            onClick={() => setActiveTab('appeals')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeTab === 'appeals'
                ? 'bg-[#00C896] text-slate-950 shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Tax Audits & Appeals</span>
          </button>
        </div>

        {/* Selected Category Content Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Detailed Tax Service Cards */}
          <div className="lg:col-span-2 space-y-6">
            {taxServices
              .filter((svc) => activeTab === 'all' || svc.category === activeTab)
              .map((service) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    className="bg-white border border-slate-200 hover:border-emerald-500/50 rounded-2xl p-6 transition-all duration-300 shadow-sm space-y-6 group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200 group-hover:bg-[#00C896] group-hover:text-slate-950 transition-colors">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-[11px] font-mono font-bold text-emerald-700 uppercase tracking-wider">
                            {service.badge}
                          </span>
                          <h3 className="text-xl font-bold font-serif text-slate-900 group-hover:text-emerald-700 transition-colors">
                            {service.title}
                          </h3>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-center">
                        ⏱️ {service.timeframe}
                      </span>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed">
                      {service.description}
                    </p>

                    <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Key Service Scope:
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 pt-1">
                        {service.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-emerald-600 font-bold">•</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                      <div className="text-xs text-slate-500 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-emerald-600" />
                        <span>Includes official NBR acknowledgement receipt & tax token</span>
                      </div>

                      <button
                        onClick={() => onOpenConsultationWithService(service.title, 'Private Limited / Individual', `Interested in ${service.title}`)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#00C896] hover:bg-emerald-600 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                      >
                        <span>File Tax Return Now</span>
                        <ArrowRight className="w-4 h-4 text-slate-950" />
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Sidebar: Interactive Tax Calculator & Documents Checklist */}
          <div className="space-y-6">
            
            {/* Interactive Income Tax Estimator Box */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
              <div className="flex items-center space-x-3 pb-3 border-b border-slate-200">
                <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-serif">
                    Bangladesh Tax Estimator
                  </h3>
                  <p className="text-[11px] text-slate-500">Income Tax Act 2023 Slabs</p>
                </div>
              </div>

              {/* Taxpayer Category Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Taxpayer Type</label>
                <select
                  value={taxpayerType}
                  onChange={(e) => setTaxpayerType(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-emerald-600"
                >
                  <option value="individual_male">Individual (General Male - ৳3,50,000 Free Limit)</option>
                  <option value="individual_female">Individual (Female / Senior Citizen - ৳4,00,000 Free Limit)</option>
                  <option value="company_pvt">Private Limited Company (27.5% Tax Rate)</option>
                </select>
              </div>

              {/* Annual Taxable Income Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Annual Taxable Income (BDT ৳)</label>
                <input
                  type="number"
                  step="50000"
                  value={calculatorIncome}
                  onChange={(e) => setCalculatorIncome(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono font-bold text-emerald-700 focus:outline-none focus:border-emerald-600"
                  placeholder="e.g. 800000"
                />
              </div>

              {/* Investment Allowance (Individual Only) */}
              {taxpayerType !== 'company_pvt' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Investment for Rebate (DPS/Sanchayapatra BDT ৳)</label>
                  <input
                    type="number"
                    step="20000"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono font-bold text-emerald-700 focus:outline-none focus:border-emerald-600"
                    placeholder="e.g. 100000"
                  />
                </div>
              )}

              {/* Calculated Tax Result Display */}
              <div className="bg-slate-50 p-4 rounded-xl border border-emerald-300 text-center space-y-1">
                <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">Estimated Tax Payable</span>
                <p className="text-2xl font-extrabold font-mono text-emerald-700">
                  BDT ৳{calculateEstimatedTax().toLocaleString('en-IN')}
                </p>
                <p className="text-[10px] text-slate-500">
                  {taxpayerType === 'company_pvt'
                    ? '*Excluding advance tax (AIT) deductions and minimum tax adjustments.'
                    : '*Includes applicable minimum tax & investment rebate rules.'}
                </p>
              </div>

              <button
                onClick={() =>
                  onOpenConsultationWithService(
                    'Income Tax Return Consultation',
                    taxpayerType === 'company_pvt' ? 'Private Limited Company' : 'Individual',
                    `Estimated Income: ৳${calculatorIncome}, Estimated Tax: ৳${calculateEstimatedTax()}`
                  )
                }
                className="w-full bg-[#00C896] hover:bg-emerald-600 text-slate-950 font-bold py-2.5 rounded-xl text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Get Professional Tax Assessment</span>
              </button>
            </div>



          </div>

        </div>

        {/* Income Tax Frequently Asked Questions Accordion */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center space-x-3 pb-4 border-b border-slate-200">
            <HelpCircle className="w-6 h-6 text-emerald-600" />
            <div>
              <h3 className="text-xl font-bold font-serif text-slate-900">
                Income Tax Filing FAQs (Bangladesh)
              </h3>
              <p className="text-xs text-slate-500">Common queries regarding NBR rules & Income Tax Act 2023</p>
            </div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = expandedFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-bold text-sm text-slate-900 hover:text-emerald-700 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-200 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
