import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Mail,
  Building2,
  ChevronRight,
  Download,
  Filter,
  Sparkles,
  ShieldAlert,
  FileText,
  X,
  Phone,
  Check,
  CalendarPlus,
  Info
} from 'lucide-react';

export interface StatutoryDeadline {
  id: string;
  date: string; // e.g. 'August 15, 2026'
  month: string; // e.g. 'August 2026'
  title: string;
  authority: 'RJSC' | 'NBR' | 'BIDA' | 'DPDT' | 'Bangladesh Bank';
  applicableEntities: string[];
  urgency: 'Critical' | 'Upcoming' | 'Standard';
  penaltyNote: string;
  description: string;
  requiredForms: string[];
}

export const DEADLINES_DATA: StatutoryDeadline[] = [
  {
    id: 'dl-01',
    date: 'August 10, 2026',
    month: 'August 2026',
    title: 'NBR Monthly VAT Return Filing (Form 9.1)',
    authority: 'NBR',
    applicableEntities: ['Private Limited', 'Public Limited', 'OPC', 'Foreign Branch'],
    urgency: 'Upcoming',
    penaltyNote: '৳10,000 fixed penalty plus 2% monthly interest on overdue VAT.',
    description: 'Mandatory monthly submission of VAT Return Form 9.1 for the preceding tax period of July 2026.',
    requiredForms: ['Mushak 9.1', 'Mushak 6.3 Tax Invoices']
  },
  {
    id: 'dl-02',
    date: 'August 31, 2026',
    month: 'August 2026',
    title: 'RJSC Statutory AGM Notice & Schedule X Return Preparation',
    authority: 'RJSC',
    applicableEntities: ['Private Limited', 'Public Limited'],
    urgency: 'Critical',
    penaltyNote: 'Condonation of delay fee up to ৳15,000 per director under Section 108.',
    description: 'Final deadline to dispatch 21-day notice for Annual General Meeting (AGM) and complete audited balance sheet DVS verification.',
    requiredForms: ['Form VIII (Schedule X)', 'Form IX', 'ICAB DVS Code Audited Financials']
  },
  {
    id: 'dl-03',
    date: 'September 15, 2026',
    month: 'September 2026',
    title: 'BIDA Quarterly Foreign Remittance & Inward FDI Report',
    authority: 'BIDA',
    applicableEntities: ['Foreign Branch', 'Joint Venture', 'Foreign Subsidiary'],
    urgency: 'Upcoming',
    penaltyNote: 'Suspension of outward royalty/technical fee remittance approvals.',
    description: 'Submission of foreign capital inflow encashment certificates and liaison office expenditure statement to BIDA & AD Bank.',
    requiredForms: ['BIDA Q3 Encashment Return', 'AD Bank Certificate']
  },
  {
    id: 'dl-04',
    date: 'September 30, 2026',
    month: 'September 2026',
    title: 'RJSC Mandatory Annual Filing (Form VIII & Balance Sheet)',
    authority: 'RJSC',
    applicableEntities: ['Private Limited', 'Public Limited', 'OPC'],
    urgency: 'Critical',
    penaltyNote: 'Automatic late filing fine of ৳500/day + RJSC blacklisting of default directors.',
    description: 'Filing of Annual Return within 30 days of holding AGM for entities with fiscal year ending December/June.',
    requiredForms: ['Form VIII', 'Schedule X', 'Form IX', 'Form XII (if director changed)']
  },
  {
    id: 'dl-05',
    date: 'October 15, 2026',
    month: 'October 2026',
    title: 'DPDT Trademark 10-Year Renewal Deadline (Class 35 & 42)',
    authority: 'DPDT',
    applicableEntities: ['Private Limited', 'OPC', 'Proprietorship', 'Foreign Branch'],
    urgency: 'Standard',
    penaltyNote: 'Surcharge of ৳3,000 for late renewal within 6 months post-expiry.',
    description: 'Statutory deadline to submit Form TM-12 for trademark registration renewal to retain brand exclusivity.',
    requiredForms: ['Form TM-12', 'Original TM Certificate Copy']
  },
  {
    id: 'dl-06',
    date: 'November 30, 2026',
    month: 'November 2026',
    title: 'NBR Corporate Income Tax Return Filing (Tax Day)',
    authority: 'NBR',
    applicableEntities: ['Private Limited', 'Public Limited', 'Foreign Branch'],
    urgency: 'Upcoming',
    penaltyNote: 'Loss of tax exemption privileges + 5% additional tax on estimated income.',
    description: 'National Corporate Tax Day for companies whose accounting year ends on June 30.',
    requiredForms: ['Form 11GA (Corporate Income Tax Return)', 'Audited Financial Statement with DVS']
  }
];

interface ComplianceCalendarProps {
  onOpenConsultationWithTopic?: (topic: string) => void;
}

export const ComplianceCalendar: React.FC<ComplianceCalendarProps> = ({
  onOpenConsultationWithTopic
}) => {
  const [selectedEntityFilter, setSelectedEntityFilter] = useState<string>('all');
  const [selectedMonthFilter, setSelectedMonthFilter] = useState<string>('all');
  const [selectedDeadline, setSelectedDeadline] = useState<StatutoryDeadline | null>(null);

  // Email Subscription State
  const [subEmail, setSubEmail] = useState<string>('');
  const [subCompanyName, setSubCompanyName] = useState<string>('');
  const [subPhone, setSubPhone] = useState<string>('');
  const [subCompanyType, setSubCompanyType] = useState<string>('Private Limited');
  const [subFrequency, setSubFrequency] = useState<string>('7 Days Before Deadline');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [subSuccessMsg, setSubSuccessMsg] = useState<string | null>(null);

  const entityTypes = [
    { id: 'all', label: 'All Company Types' },
    { id: 'Private Limited', label: 'Private Limited' },
    { id: 'OPC', label: 'One Person Company (OPC)' },
    { id: 'Public Limited', label: 'Public Limited' },
    { id: 'Foreign Branch', label: 'Foreign Branch / Joint Venture' }
  ];

  const monthsList = [
    { id: 'all', label: 'All Months' },
    { id: 'August 2026', label: 'August 2026' },
    { id: 'September 2026', label: 'September 2026' },
    { id: 'October 2026', label: 'October 2026' },
    { id: 'November 2026', label: 'November 2026' }
  ];

  const filteredDeadlines = DEADLINES_DATA.filter((item) => {
    const matchesEntity =
      selectedEntityFilter === 'all' ||
      item.applicableEntities.includes(selectedEntityFilter);
    const matchesMonth =
      selectedMonthFilter === 'all' || item.month === selectedMonthFilter;
    return matchesEntity && matchesMonth;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail.trim()) return;

    setIsSubscribed(true);
    setSubSuccessMsg(
      `Compliance alert calendar active! We will send ${subFrequency.toLowerCase()} statutory notifications to ${subEmail} for ${subCompanyName || subCompanyType}.`
    );
  };

  const handleExportIcs = (deadline: StatutoryDeadline) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//E-Lawyers Bangladesh//Statutory Compliance Calendar//EN
BEGIN:VEVENT
SUMMARY:${deadline.title} (${deadline.authority})
DESCRIPTION:${deadline.description} - Penalty: ${deadline.penaltyNote}
DTSTART:20260815T090000Z
DTEND:20260815T170000Z
LOCATION:Dhaka, Bangladesh
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${deadline.id}-deadline-reminder.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="compliance-calendar" className="py-20 bg-slate-900 text-white relative border-b border-slate-800">
      {/* Background Accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-96 bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            <CalendarIcon className="w-4 h-4 text-amber-400" />
            <span>2026 Statutory Calendar</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight text-white">
            Bangladesh Statutory Deadline Calendar
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Never miss an RJSC Annual Return, NBR VAT/Tax filing, or BIDA foreign remittance deadline. Filter by your entity structure and set up automated email reminders.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          
          {/* Entity Type Selector */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            <span className="text-xs text-slate-400 font-mono shrink-0 pl-2">Entity:</span>
            {entityTypes.map((ent) => (
              <button
                key={ent.id}
                type="button"
                onClick={() => setSelectedEntityFilter(ent.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedEntityFilter === ent.id
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {ent.label}
              </button>
            ))}
          </div>

          {/* Month Dropdown / Tabs */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs text-slate-400 font-mono shrink-0">Month:</span>
            <select
              value={selectedMonthFilter}
              onChange={(e) => setSelectedMonthFilter(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-xs font-semibold text-white rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500"
            >
              {monthsList.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Deadlines Grid & Subscription Dual Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Deadlines Cards List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold font-serif text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Upcoming Compliance Filings</span>
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                Showing {filteredDeadlines.length} Key Dates
              </span>
            </div>

            <div className="space-y-4">
              {filteredDeadlines.map((dl) => (
                <div
                  key={dl.id}
                  className="bg-slate-950 border border-slate-800 hover:border-amber-500/50 p-5 rounded-2xl transition-all duration-200 space-y-3 relative group shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* Date Badge */}
                      <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-center min-w-[70px] shrink-0">
                        <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
                          {dl.date.split(' ')[0]}
                        </span>
                        <span className="text-lg font-bold font-serif text-white">
                          {dl.date.split(' ')[1]?.replace(',', '')}
                        </span>
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                            {dl.authority}
                          </span>
                          <span
                            className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                              dl.urgency === 'Critical'
                                ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                                : dl.urgency === 'Upcoming'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {dl.urgency}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white font-serif group-hover:text-amber-300 transition-colors">
                          {dl.title}
                        </h4>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleExportIcs(dl)}
                      className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-amber-500/40 transition-colors shrink-0"
                      title="Add to Calendar (.ics)"
                    >
                      <CalendarPlus className="w-4 h-4 text-amber-400" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {dl.description}
                  </p>

                  {/* Penalty Warning snippet */}
                  <div className="bg-slate-900/90 border border-slate-800/80 p-2.5 rounded-xl flex items-center justify-between text-xs gap-2">
                    <div className="flex items-center gap-1.5 text-red-300 text-[11px] font-medium">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      <span className="truncate">Statutory Penalty: {dl.penaltyNote}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedDeadline(dl)}
                      className="text-amber-400 font-bold hover:underline text-[11px] shrink-0"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}

              {filteredDeadlines.length === 0 && (
                <div className="text-center py-12 bg-slate-950 rounded-2xl border border-slate-800 text-slate-400 text-xs">
                  No statutory deadlines found for the selected company type or month.
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Automated Email Subscription Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-3 py-1 rounded-full text-xs font-bold">
              <Bell className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
              <span>Automated Compliance Alert System</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold font-serif text-white">
                Subscribe to Deadline Email Alerts
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Receive proactive reminders before RJSC annual filings, NBR tax cutoffs, and BIDA returns to keep your business 100% compliant and avoid director blacklisting.
              </p>
            </div>

            {isSubscribed && subSuccessMsg ? (
              <div className="bg-emerald-950/80 border border-emerald-500/50 p-5 rounded-2xl space-y-3 text-emerald-200 text-xs animate-fadeIn">
                <div className="flex items-center gap-2 font-bold text-emerald-400 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Compliance Alert Active!</span>
                </div>
                <p className="leading-relaxed">{subSuccessMsg}</p>
                <button
                  type="button"
                  onClick={() => setIsSubscribed(false)}
                  className="text-amber-400 font-bold text-xs hover:underline pt-2 block"
                >
                  Edit Subscription Preferences
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300 block">
                    Company Name / Entity Title
                  </label>
                  <input
                    type="text"
                    required
                    value={subCompanyName}
                    onChange={(e) => setSubCompanyName(e.target.value)}
                    placeholder="e.g. Apex Logistics Bangladesh Ltd."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300 block">
                    Official Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={subEmail}
                    onChange={(e) => setSubEmail(e.target.value)}
                    placeholder="compliance@yourcompany.com"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300 block">
                      Company Type
                    </label>
                    <select
                      value={subCompanyType}
                      onChange={(e) => setSubCompanyType(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="Private Limited">Private Limited</option>
                      <option value="OPC">One Person Company (OPC)</option>
                      <option value="Public Limited">Public Limited</option>
                      <option value="Foreign Branch">Foreign Branch / Liaison</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300 block">
                      Alert Lead Time
                    </label>
                    <select
                      value={subFrequency}
                      onChange={(e) => setSubFrequency(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="7 Days Before Deadline">7 Days Prior</option>
                      <option value="14 Days Before Deadline">14 Days Prior</option>
                      <option value="Instant Gazette Alerts">Instant Gazette Alerts</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl text-xs transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                >
                  <Bell className="w-4 h-4" />
                  <span>Activate Automated Compliance Alerts</span>
                </button>

                <p className="text-[10px] text-slate-400 text-center font-mono">
                  Zero Spam Guarantee. Managed by E-Lawyers Corporate Secretariat.
                </p>
              </form>
            )}

          </div>

        </div>

      </div>

      {/* DEADLINE DETAIL MODAL */}
      {selectedDeadline && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 sm:p-8 text-white shadow-2xl relative space-y-6">
            
            <button
              type="button"
              onClick={() => setSelectedDeadline(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 pr-8">
              <div className="flex items-center gap-2">
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded">
                  {selectedDeadline.authority} Statutory Cutoff
                </span>
                <span className="text-xs text-slate-400 font-mono">{selectedDeadline.date}</span>
              </div>

              <h3 className="text-xl font-bold font-serif text-white leading-snug">
                {selectedDeadline.title}
              </h3>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <span className="text-slate-400 font-bold block uppercase tracking-wider text-[10px]">Description & Legal Requirement:</span>
              <p className="text-slate-300 leading-relaxed">{selectedDeadline.description}</p>
            </div>

            <div className="bg-red-950/60 border border-red-800/80 p-4 rounded-2xl text-xs space-y-1">
              <span className="text-red-300 font-bold flex items-center gap-1.5 uppercase text-[10px]">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                Statutory Non-Compliance Penalty
              </span>
              <p className="text-slate-200">{selectedDeadline.penaltyNote}</p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider text-[10px]">
                Required Statutory Schedule Forms:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedDeadline.requiredForms.map((form, idx) => (
                  <span key={idx} className="bg-slate-800 text-amber-300 border border-slate-700 px-3 py-1 rounded-lg text-xs font-mono">
                    {form}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleExportIcs(selectedDeadline)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Download .ICS Reminder</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const topic = `Assistance for deadline: ${selectedDeadline.title} (${selectedDeadline.date})`;
                  setSelectedDeadline(null);
                  onOpenConsultationWithTopic?.(topic);
                }}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs shadow-md shadow-amber-500/20"
              >
                Book Lawyer for This Deadline
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
