import React, { useState } from 'react';
import { Calculator, ShieldAlert, Clock, FileCheck, CheckCircle2, ArrowRight, DollarSign, AlertTriangle, Sparkles } from 'lucide-react';
import { BusinessType, ComplianceCalculatorResult } from '../types';

interface InteractiveComplianceCalculatorProps {
  onOpenConsultationWithParams: (companyType: string, serviceTitle: string, details: string) => void;
}

export const InteractiveComplianceCalculator: React.FC<InteractiveComplianceCalculatorProps> = ({
  onOpenConsultationWithParams
}) => {
  const [entityType, setEntityType] = useState<BusinessType>('Private Limited Company');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('annual-return');

  const entityOptions: BusinessType[] = [
    'Private Limited Company',
    'One Person Company (OPC)',
    'Startup',
    'Foreign Company',
    'Partnership Firm',
    'NGO'
  ];

  const serviceOptions = [
    { id: 'annual-return', label: 'RJSC Annual Return Filing (Form VIII / Sched X)' },
    { id: 'director-change', label: 'Director Appointment / Change (Form XII)' },
    { id: 'share-transfer', label: 'Share Transfer & Allotment (Form 117 / Form XV)' },
    { id: 'capital-increase', label: 'Authorized Capital Increase (Form IV / Form VI)' },
    { id: 'paidup-increase', label: 'Paid-Up Capital Increase (Encashment / Form XV)' },
    { id: 'name-change', label: 'Company Name Change & MOA Amendment' },
    { id: 'trademark', label: 'Trademark Registration Bangladesh (Form TM-1)' },
    { id: 'winding-up', label: 'Voluntary Winding Up & Closure' }
  ];

  const calculateResult = (): ComplianceCalculatorResult => {
    switch (selectedServiceId) {
      case 'annual-return':
        return {
          estimatedTime: '2 - 4 Working Days',
          complexity: 'Low',
          statutoryForms: ['Form VIII (Summary of Shares)', 'Schedule X (Director/Shareholder List)', 'AGM Minutes'],
          requiredDocs: ['Audited Financial Statements', 'AGM Notice & Attendance Sheet', 'Current Director NIDs/Passports'],
          keySteps: ['Audit alignment', 'Drafting Form VIII & Schedule X', 'Filing with RJSC', 'Obtaining Filing Token'],
          estimatedGovtFeeRange: 'BDT 2,500 – 6,000 (Varies by Authorized Capital)',
          estimatedLegalFeeRange: 'BDT 12,000 – 20,000 (Complete Processing)',
          riskIfDelayed: 'Daily fine imposition by RJSC, bank account freeze, inability to issue updated Form X.'
        };

      case 'director-change':
        return {
          estimatedTime: '3 - 5 Working Days',
          complexity: 'Medium',
          statutoryForms: ['Form XII (Particulars of Directors)', 'Form IX (Consent of Director)', 'Board Resolution'],
          requiredDocs: ['Incoming Director NID / Passport (Notarized)', 'E-TIN Certificate', 'Resignation Letter (if applicable)', 'Board Minutes'],
          keySteps: ['Board meeting execution', 'Form IX consent signature', 'Form XII submission', 'RJSC Record update'],
          estimatedGovtFeeRange: 'BDT 1,500 – 3,500',
          estimatedLegalFeeRange: 'BDT 10,000 – 18,000',
          riskIfDelayed: 'Section 108 non-compliance penalty, invalid board meetings, bank mandate rejection.'
        };

      case 'share-transfer':
        return {
          estimatedTime: '5 - 7 Working Days',
          complexity: 'High',
          statutoryForms: ['Form 117 (Instrument of Transfer)', 'Form XV (Return of Allotment)', 'Share Purchase Agreement (SPA)'],
          requiredDocs: ['Buyer/Seller NIDs & E-TINs', 'Original Share Certificates', 'Encashment / Bank Transfer Proof', 'Board Approval Resolution'],
          keySteps: ['SPA & Form 117 drafting', 'Stamp duty payment', 'Board sanction', 'RJSC filing & Register update'],
          estimatedGovtFeeRange: 'BDT 3,000 – 8,000 + Stamp Duty (1.5% of transfer value)',
          estimatedLegalFeeRange: 'BDT 20,000 – 40,000',
          riskIfDelayed: 'Invalid transfer under law, dividend disputes, tax audit penalties for unreflected transfer.'
        };

      case 'capital-increase':
        return {
          estimatedTime: '4 - 6 Working Days',
          complexity: 'Medium',
          statutoryForms: ['Form IV (Notice of Increase)', 'Form VI (Special Resolution)', 'Amended MOA'],
          requiredDocs: ['Current MOA & AOA', 'EGM Minutes & Special Resolution', 'Current Form X/XII'],
          keySteps: ['EGM execution', 'Stamp duty calculation', 'Form IV/VI submission', 'Amended MOA issuance'],
          estimatedGovtFeeRange: 'BDT 10,000 – 75,000+ (Based on new capital bracket)',
          estimatedLegalFeeRange: 'BDT 20,000 – 35,000',
          riskIfDelayed: 'Inability to issue new shares to investors, equity cap breach penalties.'
        };

      case 'paidup-increase':
        return {
          estimatedTime: '3 - 5 Working Days',
          complexity: 'Medium',
          statutoryForms: ['Form XV (Return of Allotment)', 'Share Allotment Minutes', 'Encashment Verification'],
          requiredDocs: ['Bank Encashment Certificate / Deposit Slip', 'Board Allotment Resolution', 'Share Certificate Stamping'],
          keySteps: ['Bank encashment audit', 'Form XV drafting', 'RJSC submission', 'Share Certificate issuance'],
          estimatedGovtFeeRange: 'BDT 2,000 – 5,000',
          estimatedLegalFeeRange: 'BDT 15,000 – 25,000',
          riskIfDelayed: 'Shareholder equity mismatch, audit objections, delay in investor share issuance.'
        };

      case 'name-change':
        return {
          estimatedTime: '7 - 10 Working Days',
          complexity: 'High',
          statutoryForms: ['Name Clearance Receipt', 'Form VI (Special Resolution)', 'Fresh Certificate of Incorporation'],
          requiredDocs: ['Name Clearance Letter', 'Original Incorporation Certificate', 'EGM Special Resolution', 'Amended MOA'],
          keySteps: ['Name clearance search', 'EGM execution', 'MOA amendment', 'RJSC approval & fresh certificate'],
          estimatedGovtFeeRange: 'BDT 4,000 – 8,000',
          estimatedLegalFeeRange: 'BDT 25,000 – 45,000',
          riskIfDelayed: 'Name clearance expiry (30 days), trademark conflict risk.'
        };

      case 'trademark':
        return {
          estimatedTime: '3 Days (Application Receipt) / 9-12 Months (Final Cert)',
          complexity: 'Medium',
          statutoryForms: ['Form TM-1', 'Power of Attorney (TM-48)', 'Representation of Mark'],
          requiredDocs: ['Logo / Mark JPEG file', 'Applicant NID/Passport & Trade License', 'Date of First Use evidence'],
          keySteps: ['DPDT Trademark Search', 'Application Filing (TM-1)', 'Examination response', 'Journal publication'],
          estimatedGovtFeeRange: 'BDT 3,500 + VAT (Per Class Filing Fee)',
          estimatedLegalFeeRange: 'BDT 12,000 – 25,000 (Per Class end-to-end)',
          riskIfDelayed: 'Brand hijacking, loss of exclusive right, competitor registration.'
        };

      default:
        return {
          estimatedTime: '5 - 10 Working Days',
          complexity: 'Medium',
          statutoryForms: ['Declaration of Solvency', 'RJSC Strike Off Petition'],
          requiredDocs: ['Audited Financials', 'Tax Clearance Certificate', 'Board & Shareholder Resolution'],
          keySteps: ['Solvency declaration', 'Newspaper notice', 'Debt settlement', 'Final RJSC dissolution'],
          estimatedGovtFeeRange: 'BDT 5,000 – 12,000',
          estimatedLegalFeeRange: 'BDT 30,000 – 60,000',
          riskIfDelayed: 'Ongoing daily default fines, director disqualification.'
        };
    }
  };

  const result = calculateResult();
  const selectedServiceObj = serviceOptions.find(s => s.id === selectedServiceId);

  const handleSubmitCalculation = () => {
    const serviceName = selectedServiceObj?.label || 'Selected Compliance Action';
    const details = `Selected Entity: ${entityType}. Estimated Govt Fee: ${result.estimatedGovtFeeRange}. Estimated Time: ${result.estimatedTime}. Statutory Forms: ${result.statutoryForms.join(', ')}`;
    onOpenConsultationWithParams(entityType, serviceName, details);
  };

  return (
    <section id="calculator" className="bg-slate-50 text-slate-900 py-16 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs uppercase px-3.5 py-1 rounded-full shadow-sm">
            <Calculator className="w-4 h-4 text-emerald-600" />
            <span>Interactive Compliance Tool</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-serif text-slate-900">
            RJSC Fee & Compliance Health Estimator
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Select your company structure and required corporate action to get an instant calculation of statutory forms, document requirements, estimated timelines, and government fee ranges.
          </p>
        </div>

        {/* Tool Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Controls Column */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="text-lg font-bold font-serif text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              Configure Corporate Action
            </h3>

            {/* Step 1: Entity Type */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
                Step 1: Select Business Entity Type
              </label>
              <select
                value={entityType}
                onChange={(e) => setEntityType(e.target.value as BusinessType)}
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm rounded-xl p-3 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500/30"
              >
                {entityOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Step 2: Service Action */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
                Step 2: Select Corporate Compliance Action
              </label>
              <div className="space-y-2">
                {serviceOptions.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedServiceId(s.id)}
                    className={`w-full text-left p-3 rounded-xl text-xs font-medium transition-all flex items-center justify-between border ${
                      selectedServiceId === s.id
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <span>{s.label}</span>
                    {selectedServiceId === s.id && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Estimation Result Output */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm relative overflow-hidden">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest font-mono">
                  {entityType} Breakdown
                </span>
                <h3 className="text-xl font-bold font-serif text-slate-900">
                  {selectedServiceObj?.label}
                </h3>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${
                result.complexity === 'Low' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                result.complexity === 'Medium' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                'bg-rose-50 text-rose-800 border border-rose-200'
              }`}>
                {result.complexity} Complexity
              </span>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>Estimated Processing Time</span>
                </div>
                <div className="text-base font-extrabold text-slate-900">{result.estimatedTime}</div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <span>Govt Fee Range</span>
                </div>
                <div className="text-xs font-bold text-emerald-800">{result.estimatedGovtFeeRange}</div>
              </div>
            </div>

            {/* Statutory Forms Needed */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-emerald-600" /> Statutory Forms Required:
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.statutoryForms.map((form, i) => (
                  <span key={i} className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs px-3 py-1 rounded-lg font-mono font-semibold">
                    {form}
                  </span>
                ))}
              </div>
            </div>

            {/* Documents Needed */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Required Document Checklist:
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {result.requiredDocs.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Risk Warning Box */}
            <div className="bg-rose-50 border border-rose-200 p-3.5 rounded-xl text-xs text-rose-800 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-rose-900 font-bold mb-0.5">Risk of Delay or Default:</strong>
                <span>{result.riskIfDelayed}</span>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                onClick={handleSubmitCalculation}
                className="w-full bg-[#00C896] hover:bg-[#00B084] text-slate-950 font-extrabold py-3.5 rounded-xl text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Request Official Legal Fee Quote & Processing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
