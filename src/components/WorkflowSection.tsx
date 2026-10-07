import React, { useState, useMemo } from 'react';
import { PROCESS_STEPS } from '../data/lawyersData';
import {
  CheckCircle2,
  ArrowRight,
  Zap,
  Calendar,
  Clock,
  Building2,
  AlertCircle,
  FileText,
  Download,
  Filter,
  ShieldAlert,
  RotateCcw,
  Copy,
  Check,
  ChevronRight,
  Info
} from 'lucide-react';

interface WorkflowSectionProps {
  onOpenConsultation: () => void;
}

type CompanyType = 'private_ltd' | 'opc' | 'public_ltd' | 'foreign_branch';
type FYClosing = 'june_30' | 'dec_31';
type MilestoneCategory = 'ALL' | 'RJSC' | 'Tax & VAT' | 'Renewals' | 'Corporate Governance';

interface ComplianceMilestone {
  id: string;
  title: string;
  category: 'RJSC' | 'Tax & VAT' | 'Renewals' | 'Corporate Governance';
  dueDate: Date;
  formName?: string;
  statuteRef: string;
  description: string;
  penaltyWarning: string;
  urgency: 'overdue' | 'due_soon' | 'upcoming';
  daysRemaining: number;
}

export const WorkflowSection: React.FC<WorkflowSectionProps> = ({ onOpenConsultation }) => {
  // Regulatory Compliance Roadmap State
  const defaultDate = useMemo(() => {
    const d = new Date();
    d.setMonth(d.getMonth() - 3); // Default to 3 months ago for realistic initial view
    return d.toISOString().split('T')[0];
  }, []);

  const [regDateStr, setRegDateStr] = useState<string>(defaultDate);
  const [companyType, setCompanyType] = useState<CompanyType>('private_ltd');
  const [fyClosing, setFyClosing] = useState<FYClosing>('june_30');
  const [selectedCategory, setSelectedCategory] = useState<MilestoneCategory>('ALL');
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [selectedMilestone, setSelectedMilestone] = useState<ComplianceMilestone | null>(null);

  // Calculate Compliance Milestones based on Registration Date & Company Profile
  const milestones = useMemo<ComplianceMilestone[]>(() => {
    if (!regDateStr) return [];
    
    const regDate = new Date(regDateStr + 'T00:00:00');
    if (isNaN(regDate.getTime())) return [];

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const calcMilestones: ComplianceMilestone[] = [];

    // Helper functions
    const addDays = (d: Date, days: number) => {
      const res = new Date(d);
      res.setDate(res.getDate() + days);
      return res;
    };

    const addMonths = (d: Date, months: number) => {
      const res = new Date(d);
      res.setMonth(res.getMonth() + months);
      return res;
    };

    const createMilestone = (
      id: string,
      title: string,
      category: 'RJSC' | 'Tax & VAT' | 'Renewals' | 'Corporate Governance',
      dueDate: Date,
      statuteRef: string,
      description: string,
      penaltyWarning: string,
      formName?: string
    ): ComplianceMilestone => {
      const targetTime = new Date(dueDate);
      targetTime.setHours(0, 0, 0, 0);
      const diffMs = targetTime.getTime() - now.getTime();
      const daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      let urgency: 'overdue' | 'due_soon' | 'upcoming' = 'upcoming';
      if (daysRemaining < 0) {
        urgency = 'overdue';
      } else if (daysRemaining <= 30) {
        urgency = 'due_soon';
      }

      return {
        id,
        title,
        category,
        dueDate: targetTime,
        formName,
        statuteRef,
        description,
        penaltyWarning,
        urgency,
        daysRemaining
      };
    };

    // 1. First Board Meeting & Director Consent (Form XXIII & IX)
    const boardMeetingDate = addDays(regDate, 30);
    calcMilestones.push(createMilestone(
      'm1',
      'First Board Meeting & Form XXIII / IX Filing',
      'RJSC',
      boardMeetingDate,
      'Sec 92 & 108, Companies Act 1994',
      'Convene inaugural board meeting to record directors consent (Form IX), register company seal, and file manager details (Form XXIII) with RJSC.',
      'Fine up to BDT 500 per day for delay under Sec 395/396 & rejection of directors credentials.',
      'RJSC Form XXIII & Form IX'
    ));

    // 2. Initial Statutory Auditor Appointment Notice
    const auditorApptDate = addDays(regDate, 60);
    calcMilestones.push(createMilestone(
      'm2',
      'First Statutory Auditor Appointment Notice',
      'RJSC',
      auditorApptDate,
      'Sec 210, Companies Act 1994',
      'Formally appoint first Chartered Accountant (CA) firm as statutory auditor and notify RJSC registrar within 60 days of incorporation.',
      'Invalid initial financial audits and penalty on company officers.',
      'RJSC Auditor Intimation'
    ));

    // 3. Trade License Annual Renewal Deadline
    let tradeLicenseYear = regDate.getFullYear();
    if (regDate.getMonth() >= 6) { // July or later
      tradeLicenseYear += 1;
    }
    const tradeLicenseDate = new Date(`${tradeLicenseYear}-06-30T00:00:00`);
    calcMilestones.push(createMilestone(
      'm3',
      'Annual Trade License Renewal Deadline',
      'Renewals',
      tradeLicenseDate,
      'Dhaka City Corporation / Paurashava Act',
      'Renew annual business trade license with local City Corporation / Municipality before the fiscal year end on June 30.',
      '15% - 25% surcharge fee on license amount & risk of business premises inspection.',
      'City Corp Form B'
    ));

    // 4. Monthly VAT 9.1 Return Filing (First Month)
    const firstVatDate = new Date(regDate.getFullYear(), regDate.getMonth() + 1, 15);
    calcMilestones.push(createMilestone(
      'm4',
      'Initial Monthly VAT 9.1 Return Filing',
      'Tax & VAT',
      firstVatDate,
      'Sec 64, Value Added Tax & SD Act 2012',
      'Submit monthly VAT 9.1 return to NBR by the 15th of the following month, even if zero commercial transactions occurred.',
      'Fixed penalty of BDT 10,000 per month of default under NBR VAT rules.',
      'NBR VAT Form 9.1'
    ));

    // 5. Half-Yearly TDS / Withholding Tax Return (Sec 177)
    let tdsDate = new Date(regDate.getFullYear(), 6, 31); // July 31
    if (regDate.getMonth() >= 7) {
      tdsDate = new Date(regDate.getFullYear() + 1, 0, 31); // Jan 31
    }
    calcMilestones.push(createMilestone(
      'm5',
      'Half-Yearly Withholding Tax Return (Statement of TDS)',
      'Tax & VAT',
      tdsDate,
      'Sec 177, Income Tax Act 2023',
      'File 6-monthly Statement of Tax Deducted at Source (TDS) for salaries, rents, contractor payments, and professional fees.',
      'Penalty of BDT 5,000 + BDT 1,000 per month of continuing default.',
      'NBR Tax Sec 177 Statement'
    ));

    // 6. Annual General Meeting (AGM) - First AGM within 18 Months
    const firstAgmDate = addMonths(regDate, 18);
    calcMilestones.push(createMilestone(
      'm6',
      'First Annual General Meeting (AGM) Deadline',
      'Corporate Governance',
      firstAgmDate,
      'Sec 81, Companies Act 1994',
      'Hold First Annual General Meeting (AGM) of shareholders to approve financial statements, declare dividends, and re-elect directors.',
      'RJSC default penalty & mandatory High Court condonation petition requirement if delayed beyond 18 months.',
      'AGM Resolution & Minutes'
    ));

    // 7. RJSC Annual Schedule X & Form C Statutory Filing
    const scheduleXDate = addDays(firstAgmDate, 21);
    calcMilestones.push(createMilestone(
      'm7',
      'RJSC Annual Returns Filing (Schedule X & Form C)',
      'RJSC',
      scheduleXDate,
      'Sec 36, Companies Act 1994',
      'File mandatory Annual Return of Share Capital (Schedule X) and Annual Summary (Form C) with RJSC within 21 days after holding AGM.',
      'Late penalty fee charged per day by RJSC portal & blacklisting of company status.',
      'RJSC Schedule X & Form C'
    ));

    // 8. RJSC Balance Sheet & Audited Accounts Filing (Form 23B)
    const auditedAccDate = addDays(firstAgmDate, 30);
    calcMilestones.push(createMilestone(
      'm8',
      'RJSC Submission of Audited Accounts (Form 23B)',
      'RJSC',
      auditedAccDate,
      'Sec 190, Companies Act 1994',
      'Submit audited Balance Sheet, Profit & Loss Statement, and Directors Report to RJSC registrar.',
      'Fines on managing director and officers under Sec 190.',
      'RJSC Form 23B'
    ));

    // 9. Annual Corporate Income Tax Return (IT-11GA)
    let taxYear = regDate.getFullYear();
    if (fyClosing === 'june_30') {
      taxYear += 1;
    } else {
      taxYear += 1;
    }
    const taxDayDate = new Date(`${taxYear}-01-15T00:00:00`); // Jan 15 Tax Day for Companies
    calcMilestones.push(createMilestone(
      'm9',
      'Annual Corporate Income Tax Return Filing (IT-11GA)',
      'Tax & VAT',
      taxDayDate,
      'Sec 166, Income Tax Act 2023',
      'File annual Corporate Income Tax Return IT-11GA accompanied by CA-audited financial accounts and tax computation sheet.',
      'Penalty of 10% of last assessed tax or BDT 5,000 minimum + 2% monthly delay interest.',
      'NBR Tax Form IT-11GA'
    ));

    // Sort by due date chronologically
    return calcMilestones.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  }, [regDateStr, companyType, fyClosing]);

  // Filtered milestones
  const filteredMilestones = useMemo(() => {
    if (selectedCategory === 'ALL') return milestones;
    return milestones.filter(m => m.category === selectedCategory);
  }, [milestones, selectedCategory]);

  // Download .ics Calendar File
  const handleDownloadCalendar = () => {
    if (milestones.length === 0) return;

    let icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//E-LAWYERS BANGLADESH//COMPLIANCE ROADMAP//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH'
    ];

    milestones.forEach((m) => {
      const year = m.dueDate.getFullYear();
      const month = String(m.dueDate.getMonth() + 1).padStart(2, '0');
      const day = String(m.dueDate.getDate()).padStart(2, '0');
      const dateStr = `${year}${month}${day}`;

      icsContent.push(
        'BEGIN:VEVENT',
        `UID:${m.id}-${dateStr}@elawyersbd.com`,
        `DTSTAMP:${dateStr}T090000Z`,
        `DTSTART;VALUE=DATE:${dateStr}`,
        `SUMMARY:[E-LAWYERS Compliance] ${m.title}`,
        `DESCRIPTION:${m.description.replace(/,/g, '\\,')} Statutory Ref: ${m.statuteRef}. Penalty Warning: ${m.penaltyWarning.replace(/,/g, '\\,')}`,
        'STATUS:CONFIRMED',
        'BEGIN:VALARM',
        'TRIGGER:-P7D',
        'ACTION:DISPLAY',
        `DESCRIPTION:Reminder: ${m.title} due in 7 days!`,
        'END:VALARM',
        'END:VEVENT'
      );
    });

    icsContent.push('END:VCALENDAR');

    const blob = new Blob([icsContent.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `ELawyers_Regulatory_Compliance_Roadmap_${regDateStr}.ics`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Copy Summary text to Clipboard
  const handleCopySummary = () => {
    const lines = [
      `E-LAWYERS BANGLADESH - REGULATORY COMPLIANCE ROADMAP`,
      `Official Website: https://elawyersbd.com/`,
      `Company Incorporation Date: ${regDateStr}`,
      `Company Type: ${companyType.replace('_', ' ').toUpperCase()}`,
      `Financial Year Closing: ${fyClosing === 'june_30' ? '30th June' : '31st December'}`,
      `--------------------------------------------------`
    ];

    milestones.forEach((m, idx) => {
      lines.push(
        `${idx + 1}. ${m.title}`,
        `   Due Date: ${m.dueDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} (${m.daysRemaining < 0 ? `OVERDUE by ${Math.abs(m.daysRemaining)} days` : `Due in ${m.daysRemaining} days`})`,
        `   Category: ${m.category} | Form: ${m.formName || 'N/A'}`,
        `   Statute: ${m.statuteRef}`,
        `   Penalty Risk: ${m.penaltyWarning}`,
        ``
      );
    });

    navigator.clipboard.writeText(lines.join('\n'));
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  // Quick Preset Handlers
  const handleApplyPreset = (presetType: 'today' | '3months' | '1year') => {
    const d = new Date();
    if (presetType === '3months') {
      d.setMonth(d.getMonth() - 3);
    } else if (presetType === '1year') {
      d.setFullYear(d.getFullYear() - 1);
    }
    setRegDateStr(d.toISOString().split('T')[0]);
  };

  return (
    <section id="process" className="bg-white py-16 text-slate-800 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* SECTION 1: 5-Step Process Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-700 font-bold text-xs uppercase px-3 py-1 rounded-full">
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            <span>Efficient Execution Roadmap</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-serif text-slate-900">
            Our Simple 5-Step Compliance Process
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            We streamline complex RJSC and corporate legal procedures into a transparent, hassle-free 5-step journey.
          </p>
        </div>

        {/* 5-Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.step}
              className="bg-slate-50 border border-slate-200 hover:border-amber-500/60 rounded-2xl p-5 space-y-3 transition-all duration-300 relative group shadow-xs hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black font-serif text-amber-700 bg-amber-500/10 border border-amber-500/30 w-10 h-10 rounded-xl flex items-center justify-center font-mono">
                  {step.step}
                </span>
                <CheckCircle2 className="w-5 h-5 text-slate-300 group-hover:text-amber-600 transition-colors" />
              </div>

              <h3 className="text-base font-bold font-serif text-slate-900 group-hover:text-amber-700 transition-colors">
                {step.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* SECTION 2: INTERACTIVE REGULATORY COMPLIANCE ROADMAP GENERATOR */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 text-white shadow-2xl space-y-8 relative overflow-hidden">
          {/* Subtle Ambient Background Accent */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Feature Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-xs uppercase px-3 py-1 rounded-full">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>Interactive Compliance Engine</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white tracking-wide">
                Regulatory Compliance Roadmap Generator
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Select your company incorporation date and legal structure to automatically compute your exact RJSC, NBR Tax, VAT, and City Corporation statutory filing deadlines under Bangladesh laws.
              </p>
            </div>

            {/* Top Export Controls */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                onClick={handleDownloadCalendar}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition-all"
                title="Download .ics calendar file to import into Google Calendar or Outlook"
              >
                <Download className="w-4 h-4" />
                <span>Export Calendar (.ics)</span>
              </button>

              <button
                onClick={handleCopySummary}
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2"
                title="Copy structured roadmap text summary"
              >
                {copiedSummary ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span>Copy Roadmap</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Form Controls Card */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* 1. Incorporation Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Incorporation Date:</span>
                </label>
                <input
                  type="date"
                  value={regDateStr}
                  onChange={(e) => setRegDateStr(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              {/* 2. Company Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Company Type:</span>
                </label>
                <select
                  value={companyType}
                  onChange={(e) => setCompanyType(e.target.value as CompanyType)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  <option value="private_ltd">Private Limited Company (Pvt Ltd)</option>
                  <option value="opc">One Person Company (OPC)</option>
                  <option value="public_ltd">Public Limited Company</option>
                  <option value="foreign_branch">Branch / Liaison Office</option>
                </select>
              </div>

              {/* 3. Financial Year End */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  <span>Financial Year Closing:</span>
                </label>
                <select
                  value={fyClosing}
                  onChange={(e) => setFyClosing(e.target.value as FYClosing)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="june_30">30th June (Standard Bangladesh FY)</option>
                  <option value="dec_31">31st December (Calendar Year)</option>
                </select>
              </div>

              {/* 4. Quick Date Presets */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-purple-400" />
                  <span>Quick Presets:</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => handleApplyPreset('today')}
                    className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white rounded-lg py-1.5 text-[11px] font-bold transition-colors"
                  >
                    Today
                  </button>
                  <button
                    onClick={() => handleApplyPreset('3months')}
                    className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white rounded-lg py-1.5 text-[11px] font-bold transition-colors"
                  >
                    -3 Months
                  </button>
                  <button
                    onClick={() => handleApplyPreset('1year')}
                    className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white rounded-lg py-1.5 text-[11px] font-bold transition-colors"
                  >
                    -1 Year
                  </button>
                </div>
              </div>

            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1 shrink-0 mr-1">
                  <Filter className="w-3.5 h-3.5 text-slate-400" /> Filter:
                </span>
                {[
                  { id: 'ALL', label: 'All Milestones' },
                  { id: 'RJSC', label: 'RJSC Filings' },
                  { id: 'Tax & VAT', label: 'Tax & VAT' },
                  { id: 'Corporate Governance', label: 'AGM & Governance' },
                  { id: 'Renewals', label: 'Renewals' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id as MilestoneCategory)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                      selectedCategory === cat.id
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Summary Count Pill */}
              <div className="text-xs text-slate-400 font-mono">
                Showing <span className="text-amber-400 font-bold">{filteredMilestones.length}</span> statutory milestones
              </div>
            </div>
          </div>

          {/* Timeline Feed */}
          <div className="space-y-4 relative z-10">
            {filteredMilestones.length === 0 ? (
              <div className="text-center py-12 bg-slate-950/40 rounded-2xl border border-slate-800 text-slate-400 space-y-2">
                <AlertCircle className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs font-semibold">No compliance milestones match the selected filter.</p>
                <button
                  onClick={() => setSelectedCategory('ALL')}
                  className="text-xs text-amber-400 hover:underline font-bold"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredMilestones.map((m) => {
                  const isOverdue = m.urgency === 'overdue';
                  const isDueSoon = m.urgency === 'due_soon';

                  let badgeColor = 'bg-slate-800 text-slate-300 border-slate-700';
                  let statusText = `Due in ${m.daysRemaining} days`;

                  if (isOverdue) {
                    badgeColor = 'bg-rose-500/20 text-rose-300 border-rose-500/40';
                    statusText = `OVERDUE by ${Math.abs(m.daysRemaining)} days`;
                  } else if (isDueSoon) {
                    badgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
                    statusText = `ACTION NEEDED (Due in ${m.daysRemaining} days)`;
                  }

                  return (
                    <div
                      key={m.id}
                      className={`bg-slate-950/90 border rounded-2xl p-5 space-y-3.5 transition-all duration-300 hover:border-slate-700 relative flex flex-col justify-between ${
                        isOverdue
                          ? 'border-rose-900/60 shadow-lg shadow-rose-950/20'
                          : isDueSoon
                          ? 'border-amber-900/60'
                          : 'border-slate-800'
                      }`}
                    >
                      {/* Top Bar: Category & Status */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[10px] font-bold rounded-lg uppercase">
                            {m.category}
                          </span>

                          <span className={`px-2.5 py-0.5 border text-[10px] font-bold font-mono rounded-full flex items-center gap-1 ${badgeColor}`}>
                            {isOverdue && <ShieldAlert className="w-3 h-3 text-rose-400" />}
                            {isDueSoon && <Clock className="w-3 h-3 text-amber-400" />}
                            <span>{statusText}</span>
                          </span>
                        </div>

                        {/* Title & Form */}
                        <div>
                          <h4 className="text-base font-bold font-serif text-white tracking-wide leading-snug">
                            {m.title}
                          </h4>
                          {m.formName && (
                            <span className="text-[11px] font-mono text-emerald-400 font-semibold block mt-0.5">
                              Required Form: {m.formName}
                            </span>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {m.description}
                        </p>
                      </div>

                      {/* Bottom Info & Action */}
                      <div className="pt-3 border-t border-slate-800/80 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
                          <div className="flex items-center gap-1.5 text-slate-400 font-mono">
                            <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>Deadline: <strong className="text-white font-mono">{m.dueDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</strong></span>
                          </div>

                          <div className="text-slate-400 text-[10px] italic">
                            {m.statuteRef}
                          </div>
                        </div>

                        {/* Penalty Warning Box */}
                        <div className="p-2.5 bg-slate-900/80 border border-slate-800 rounded-xl text-[11px] text-amber-300/90 flex items-start gap-2">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">
                            <strong className="text-amber-400">Non-Compliance Risk:</strong> {m.penaltyWarning}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between pt-1">
                          <button
                            onClick={() => setSelectedMilestone(selectedMilestone?.id === m.id ? null : m)}
                            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold transition-colors"
                          >
                            <Info className="w-3.5 h-3.5 text-slate-400" />
                            <span>{selectedMilestone?.id === m.id ? 'Hide Legal Notes' : 'Legal Notes'}</span>
                          </button>

                          <a
                            href="https://appointment.accounticca.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                          >
                            <span>E-Lawyers Filing Support</span>
                            <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                          </a>
                        </div>

                        {/* Expandable Legal Notes */}
                        {selectedMilestone?.id === m.id && (
                          <div className="p-3 bg-slate-900 border border-slate-700/80 rounded-xl text-xs space-y-1.5 animate-in fade-in">
                            <p className="font-bold text-slate-200 text-[11px] font-serif">Legal Consultation Guidance:</p>
                            <p className="text-slate-300 text-[11px] leading-relaxed">
                              E-Lawyers Bangladesh prepares all corporate board resolutions, RJSC online portal uploads, and certified auditor reports for this statutory requirement. Contact our Advocates to prevent default notices.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Compliance Disclaimer Footer */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 relative z-10">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Calculated under Companies Act 1994, Income Tax Act 2023, & RJSC Registrar Regulations.</span>
            </div>
            <a
              href="https://elawyersbd.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 font-bold hover:underline font-mono shrink-0"
            >
              elawyersbd.com
            </a>
          </div>
        </div>

        {/* SECTION 3: CTA Banner */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold font-serif text-slate-900">Need help fulfilling your RJSC statutory deadlines?</h3>
            <p className="text-xs text-slate-600">Our corporate legal team handles end-to-end filing, CA audit coordination, and RJSC portal submissions.</p>
          </div>

          <a
            href="https://appointment.accounticca.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md flex items-center gap-2 transition-colors"
          >
            <span>Start Free Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};

