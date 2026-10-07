import React, { useState } from 'react';
import {
  FileText,
  Download,
  BookOpen,
  CheckSquare,
  Shield,
  Search,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2,
  FileCheck2,
  Award,
  Lock,
  Mail,
  User,
  Phone,
  X,
  Share2,
  Bookmark
} from 'lucide-react';

interface LegalResourceHubProps {
  onOpenConsultation: (topic?: string) => void;
}

interface ResourceItem {
  id: string;
  title: string;
  category: 'rjsc' | 'trademark' | 'fdi' | 'secretarial';
  type: 'PDF Checklist' | 'Step-by-Step Guide' | 'Template Kit' | 'Whitepaper';
  pages: string;
  updatedDate: string;
  downloads: number;
  description: string;
  highlights: string[];
  targetAudience: string;
}

export const LegalResourceHub: React.FC<LegalResourceHubProps> = ({ onOpenConsultation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDownloadModal, setActiveDownloadModal] = useState<ResourceItem | null>(null);
  const [downloadEmail, setDownloadEmail] = useState('');
  const [downloadPhone, setDownloadPhone] = useState('');
  const [downloadName, setDownloadName] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const resources: ResourceItem[] = [
    {
      id: 'rjsc-annual-checklist',
      title: 'Complete RJSC Annual Return & Compliance Checklist 2026',
      category: 'rjsc',
      type: 'PDF Checklist',
      pages: '8 Pages PDF',
      updatedDate: 'Updated for 2026',
      downloads: 1420,
      description: 'Step-by-step statutory checklist for filing Form C, Schedule X, Form 23B (Auditor Appointment), and AGM minutes in Bangladesh without penalties.',
      highlights: [
        'Form C & Schedule X deadline roadmap',
        'Auditor consent letter templates & Form 23B rules',
        'Board resolution drafting cheat-sheet',
        'Penalties & condonation of delay guidelines'
      ],
      targetAudience: 'Private Ltd Companies, OPCs, Managing Directors & Accountants'
    },
    {
      id: 'director-appointment-guide',
      title: 'Director Appointment, Resignation & Share Transfer Manual',
      category: 'rjsc',
      type: 'Step-by-Step Guide',
      pages: '12 Pages Guide',
      updatedDate: 'Companies Act 1994',
      downloads: 980,
      description: 'Comprehensive legal protocol for Form XII filings, Form 117 share transfer instruments, stamp duty calculations, and board consent requirements.',
      highlights: [
        'Form XII filing deadline rules (14 Days rule)',
        'Form 117 share transfer instrument formatting',
        'Stamp Duty rate table for equity transfer',
        'Managing Director & Independent Director qualifications'
      ],
      targetAudience: 'Company Secretaries, CFOs & Board Members'
    },
    {
      id: 'trademark-registration-handbook',
      title: 'Bangladesh Trademark Registration & IP Protection Handbook',
      category: 'trademark',
      type: 'Whitepaper',
      pages: '15 Pages Manual',
      updatedDate: 'DPDT Guidelines',
      downloads: 1150,
      description: 'Essential guide covering trademark search protocol, Class 1-45 classification, opposition proceedings, and renewal timelines with DPDT.',
      highlights: [
        'Class classification guide for tech & goods',
        'How to conduct official DPDT similarity search',
        'Handling Trademark Examiner show-cause notices',
        'Journal publication & Opposition defense tactics'
      ],
      targetAudience: 'Startup Founders, Brand Managers & IP Owners'
    },
    {
      id: 'fdi-setup-guide',
      title: 'Foreign Investor & Branch Office Compliance Roadmap',
      category: 'fdi',
      type: 'Step-by-Step Guide',
      pages: '18 Pages Legal Guide',
      updatedDate: 'BIDA & BB Standards',
      downloads: 760,
      description: 'Complete regulatory guide for foreign 100% owned subsidiaries, BIDA registration, Bangladesh Bank inward remittance reporting (Form 1 & 2), and expat work permits.',
      highlights: [
        'BIDA approval & encashment certificate workflow',
        'Form 1 & Form 2 reporting to Bangladesh Bank',
        'Liaison / Branch office operational limits',
        'Repatriation of dividends and capital rules'
      ],
      targetAudience: 'Foreign Investors, Expat Directors & Cross-border Legal Teams'
    },
    {
      id: 'agm-secretarial-kit',
      title: 'AGM & Board Meeting Minutes Template Kit',
      category: 'secretarial',
      type: 'Template Kit',
      pages: 'Editable Templates',
      updatedDate: 'Verified Standards',
      downloads: 1650,
      description: 'Standardized secretarial drafts including 21-day AGM Notice, Attendance Register, Director Report draft, and Board Resolutions for statutory approval.',
      highlights: [
        'AGM Notice & Agenda drafting template',
        'Director’s Report section sample text',
        'Dividend declaration board resolution',
        'Shareholder attendance register layout'
      ],
      targetAudience: 'In-house Legal Teams, Company Secretaries & Business Owners'
    },
    {
      id: 'authorized-capital-guide',
      title: 'Increasing Authorized Capital & Share Allotment (Form X) Blueprint',
      category: 'rjsc',
      type: 'PDF Checklist',
      pages: '6 Pages Blueprint',
      updatedDate: 'Companies Act 1994',
      downloads: 840,
      description: 'Operational roadmap for expanding company share capital, issuing Form IV, Form X return of allotment, and paying RJSC statutory filing fees.',
      highlights: [
        'EGM resolution for Articles amendment (Form IV)',
        'Form X allotment calculation worksheet',
        'Statutory fee tier table based on capital size',
        'Right issue & private placement legal steps'
      ],
      targetAudience: 'Growing SMBs, Venture-backed Startups & Finance Managers'
    }
  ];

  // Filtered resources based on category and query
  const filteredResources = resources.filter(res => {
    const matchesCat = selectedCategory === 'all' || res.category === selectedCategory;
    const matchesQuery = searchQuery === '' ||
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  const handleDownloadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDownloadSuccess(true);
  };

  const handleCloseModal = () => {
    setActiveDownloadModal(null);
    setDownloadSuccess(false);
    setDownloadEmail('');
    setDownloadPhone('');
    setDownloadName('');
  };

  return (
    <section id="resource-hub" className="bg-slate-900 text-white py-20 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs uppercase px-4 py-1.5 rounded-full shadow-sm">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Corporate Legal Intelligence & Folder Archives</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight leading-tight">
            E-Lawyers <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">Legal Resource Hub & Folders</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Free authoritative checklists, statutory guides, secretarial templates, and official document archives created by senior Advocates to help Bangladesh companies stay compliant.
          </p>
        </div>

        {/* Featured Folder Archives & Practice Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-2xl">
          {/* Folder Card 1: Corporate Legal Practice Archive */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col sm:flex-row items-center group hover:border-amber-500/50 transition-all shadow-md">
            <div className="w-full sm:w-2/5 h-48 sm:h-full relative overflow-hidden shrink-0">
              <img
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80"
                alt="E-Lawyers Corporate Legal Practice Folder"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-2 bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow">
                Official Practice Folder
              </span>
            </div>
            <div className="p-5 flex flex-col justify-between space-y-3 w-full">
              <div>
                <span className="text-[11px] text-amber-400 font-mono font-bold">FOLDER #01 • CORPORATE COMPLIANCE</span>
                <h3 className="text-lg font-bold font-serif text-white group-hover:text-amber-300 transition-colors mt-1">
                  Dhaka Corporate Legal & Governance Archive
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  Complete statutory compliance framework for Bangladesh private limited companies, FDI subsidiaries, and joint ventures.
                </p>
              </div>
              <button
                onClick={() => setActiveDownloadModal(resources[0])}
                className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 bg-slate-800 hover:bg-slate-700 px-3.5 py-2 rounded-lg border border-slate-700 transition-colors w-fit"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Access Folder Archive</span>
              </button>
            </div>
          </div>

          {/* Folder Card 2: Legal Advisory & Consultation Folder */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col sm:flex-row items-center group hover:border-amber-500/50 transition-all shadow-md">
            <div className="w-full sm:w-2/5 h-48 sm:h-full relative overflow-hidden shrink-0">
              <img
                src="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80"
                alt="Supreme Court & RJSC Legal Consultation Folder"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-2 bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow">
                Consultation Vault
              </span>
            </div>
            <div className="p-5 flex flex-col justify-between space-y-3 w-full">
              <div>
                <span className="text-[11px] text-amber-400 font-mono font-bold">FOLDER #02 • RJSC & SUPREME COURT</span>
                <h3 className="text-lg font-bold font-serif text-white group-hover:text-amber-300 transition-colors mt-1">
                  Supreme Court & RJSC Advisory Folder
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  Direct legal guidance files, Share Transfer protocols, Form 117 instruments, and statutory filing guidelines.
                </p>
              </div>
              <button
                onClick={() => setActiveDownloadModal(resources[1])}
                className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 bg-slate-800 hover:bg-slate-700 px-3.5 py-2 rounded-lg border border-slate-700 transition-colors w-fit"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Access Consultation Vault</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search checklists (e.g. Annual Return, Form XII, Trademark)..."
                className="w-full bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm rounded-xl pl-10 pr-4 py-2.5 focus:border-amber-500 focus:outline-none placeholder-slate-500"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {[
                { id: 'all', label: 'All Resources' },
                { id: 'rjsc', label: 'RJSC & Filings' },
                { id: 'trademark', label: 'Trademark & IP' },
                { id: 'fdi', label: 'Foreign Investment' },
                { id: 'secretarial', label: 'Secretarial Kits' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="bg-slate-950/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-xl hover:shadow-2xl hover:shadow-amber-500/5 relative overflow-hidden"
            >
              <div className="space-y-4">
                
                {/* Format Badge & Download Count */}
                <div className="flex items-center justify-between">
                  <span className="bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px] uppercase font-mono font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <FileText className="w-3 h-3 text-amber-400" />
                    {res.type}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {res.pages}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold font-serif text-white group-hover:text-amber-300 transition-colors leading-snug">
                  {res.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed">
                  {res.description}
                </p>

                {/* Key Checklist Highlights */}
                <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block font-mono">
                    Key Included Items:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {res.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Card Footer & Action */}
              <div className="pt-6 mt-6 border-t border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Target: {res.targetAudience}</span>
                </div>

                <button
                  onClick={() => {
                    setActiveDownloadModal(res);
                    setDownloadSuccess(false);
                  }}
                  className="w-full bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-amber-300 border border-amber-500/30 font-bold py-3 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 group-hover:bg-amber-500 group-hover:text-slate-950 shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Free Guide ({res.pages})</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="bg-slate-950 p-12 rounded-2xl border border-slate-800 text-center space-y-3">
            <BookOpen className="w-10 h-10 text-amber-500/50 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Matching Resources Found</h3>
            <p className="text-xs text-slate-400">Try adjusting your search keywords or clearing category filters.</p>
          </div>
        )}

        {/* Thought Leadership Callout Box */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 rounded-2xl p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Tailored Corporate Legal Vetting</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
              Need a Custom Legal Audit of Your Company Files?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Our practicing advocates conduct thorough physical & online RJSC file inspections to identify missing filings, shareholder risks, and statutory non-compliance.
            </p>
          </div>

          <button
            onClick={() => onOpenConsultation('Comprehensive RJSC Legal File Audit')}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl text-xs sm:text-sm whitespace-nowrap shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 shrink-0"
          >
            <span>Book Legal File Audit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Download Lead Capture Modal */}
      {activeDownloadModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-white">
            
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!downloadSuccess ? (
              <>
                <div className="space-y-2">
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full inline-block">
                    {activeDownloadModal.type} • Instant Download
                  </span>
                  <h3 className="text-xl font-bold font-serif text-white">
                    {activeDownloadModal.title}
                  </h3>
                  <p className="text-xs text-slate-300">
                    Enter your business details below to receive this official guide and checklist directly in your inbox.
                  </p>
                </div>

                <form onSubmit={handleDownloadSubmit} className="space-y-4 text-xs sm:text-sm">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">Your Full Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={downloadName}
                        onChange={(e) => setDownloadName(e.target.value)}
                        placeholder="e.g. Mahfuz Rahman"
                        className="w-full bg-slate-950 border border-slate-700 text-white placeholder-slate-500 rounded-xl pl-9 pr-3 py-3 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">Official Email Address *</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={downloadEmail}
                        onChange={(e) => setDownloadEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full bg-slate-950 border border-slate-700 text-white placeholder-slate-500 rounded-xl pl-9 pr-3 py-3 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">Phone Number (For Legal Advice)</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        value={downloadPhone}
                        onChange={(e) => setDownloadPhone(e.target.value)}
                        placeholder="+880 1712 000000"
                        className="w-full bg-slate-950 border border-slate-700 text-white placeholder-slate-500 rounded-xl pl-9 pr-3 py-3 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold py-3.5 rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Access Instant PDF Download</span>
                  </button>

                  <p className="text-[10px] text-slate-400 text-center">
                    Strict Legal Confidentiality: We do not spam. Your details remain 100% private.
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center space-y-6 py-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold font-serif text-white">
                    Resource Sent Successfully!
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Thank you, <strong className="text-amber-300">{downloadName}</strong>. We have dispatched <strong className="text-white">{activeDownloadModal.title}</strong> to <span className="text-amber-300">{downloadEmail}</span>.
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-3">
                  <p className="font-semibold text-white">Need Immediate Senior Advocate Guidance?</p>
                  <button
                    onClick={() => {
                      handleCloseModal();
                      onOpenConsultation(`Followup on ${activeDownloadModal.title}`);
                    }}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-2.5 rounded-lg text-xs"
                  >
                    Schedule Free Consultation Now
                  </button>
                </div>

                <button
                  onClick={handleCloseModal}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  Close Window
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
