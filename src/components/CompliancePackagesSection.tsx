import React, { useState } from 'react';
import {
  Check,
  X,
  HelpCircle,
  Sparkles,
  ShieldCheck,
  Zap,
  Building2,
  Globe,
  ArrowRight,
  Plus,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Award,
  Layers,
  Info
} from 'lucide-react';

interface CompliancePackagesSectionProps {
  onOpenConsultationWithPackage: (packageName: string, details: string) => void;
}

export const CompliancePackagesSection: React.FC<CompliancePackagesSectionProps> = ({
  onOpenConsultationWithPackage
}) => {
  const [billingCycle, setBillingCycle] = useState<'annual' | 'perFiling'>('annual');
  const [showDifferencesOnly, setShowDifferencesOnly] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<'all' | 'filings' | 'secretarial' | 'advisory' | 'sla'>('all');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Available add-ons
  const availableAddons = [
    { id: 'trademark', name: 'Trademark Search & Registration', price: '৳ 15,000', badge: 'Popular' },
    { id: 'trade_bin', name: 'Trade License & BIN/VAT Setup', price: '৳ 12,000' },
    { id: 'bank_res', name: 'Bank Account Resolution & Verification', price: '৳ 8,000' },
    { id: 'cert_copies', name: 'Official RJSC Certified True Copy Set', price: '৳ 5,000' },
  ];

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Service package specifications
  const packages = [
    {
      id: 'startup',
      name: 'Startup Growth Plan',
      tagline: 'Essential compliance for early-stage Private Ltd & OPCs',
      badge: 'Best for Early Stage',
      badgeColor: 'bg-slate-100 text-slate-700 border border-slate-200',
      priceAnnual: '৳ 25,000 / year',
      pricePerFiling: '৳ 8,500 / filing',
      popular: false,
      recommendedFor: 'Early-stage tech startups, single-founder OPCs, and newly incorporated Private Limited companies in Bangladesh.',
      features: {
        annualReturn: true, // Form C, Schedule X
        agmDocs: 'Standard AGM Minutes & Notice',
        form12DirectorChange: '1 Change included / yr',
        shareAllotmentFormX: false,
        authorizedCapitalIncrease: false,
        statutoryRegisterMaintenance: 'Digital Template Kit',
        advisoryHours: '2 Hours / year',
        priorityProcessing: 'Standard (10-14 days)',
        certifiedCopies: '1 Digital Set included',
        dedicatedLawyer: false,
        foreignShareholderRemittance: false,
        emergencyEscalation: false,
        quarterlyAudit: false
      }
    },
    {
      id: 'scaleup',
      name: 'Corporate Growth Retainer',
      tagline: 'Complete secretarial & RJSC compliance for active companies',
      badge: 'Most Popular Choice',
      badgeColor: 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold',
      priceAnnual: '৳ 55,000 / year',
      pricePerFiling: '৳ 15,000 / filing',
      popular: true,
      recommendedFor: 'Active trading firms, e-commerce platforms, manufacturers, and growing SMBs needing regular RJSC updates.',
      features: {
        annualReturn: true,
        agmDocs: 'Full Tailored AGM & Board Minutes',
        form12DirectorChange: 'Up to 3 Changes / yr',
        shareAllotmentFormX: '1 Share Allotment / yr',
        authorizedCapitalIncrease: 'Full Filing Assistance',
        statutoryRegisterMaintenance: 'Managed Statutory Books & Share Certs',
        advisoryHours: '8 Hours / year',
        priorityProcessing: 'Priority (5-7 days)',
        certifiedCopies: '2 Certified Hard Copy Sets',
        dedicatedLawyer: 'Assigned Senior Legal Associate',
        foreignShareholderRemittance: false,
        emergencyEscalation: true,
        quarterlyAudit: true
      }
    },
    {
      id: 'enterprise',
      name: 'Enterprise Governance',
      tagline: 'Complete in-house legal secretary for groups & large firms',
      badge: 'Maximum Protection',
      badgeColor: 'bg-indigo-50 text-indigo-800 border border-indigo-200 font-bold',
      priceAnnual: '৳ 120,000 / year',
      pricePerFiling: '৳ 35,000 / filing',
      popular: false,
      recommendedFor: 'Group of companies, multi-shareholder entities, expanding enterprises, and firms requiring corporate restructuring.',
      features: {
        annualReturn: true,
        agmDocs: 'Unlimited Board & Shareholder Resolutions',
        form12DirectorChange: 'Unlimited Filings',
        shareAllotmentFormX: 'Unlimited Share Transfers (Form 117) & Allotments',
        authorizedCapitalIncrease: 'Complete Charge Creation (Form VIII/XV)',
        statutoryRegisterMaintenance: 'Full Physical & Cloud Statutory Vault',
        advisoryHours: 'Unlimited Priority Consultations',
        priorityProcessing: 'Express Fast-Track (2-3 days)',
        certifiedCopies: 'Unlimited Certified Copies',
        dedicatedLawyer: 'Senior Partner Lead Advocate',
        foreignShareholderRemittance: 'Assistance Included',
        emergencyEscalation: true,
        quarterlyAudit: true
      }
    },
    {
      id: 'fdi',
      name: 'Foreign Direct Investor (FDI)',
      tagline: 'Tailored for foreign subsidiaries, liaison & branch offices',
      badge: 'Expat & Foreign Capital Special',
      badgeColor: 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold',
      priceAnnual: '৳ 180,000 / year',
      pricePerFiling: '৳ 45,000 / filing',
      popular: false,
      recommendedFor: 'Foreign multinational corporations, liaison/branch offices, foreign-owned subsidiaries, and expat-led enterprises.',
      features: {
        annualReturn: true,
        agmDocs: 'International Corporate Governance Compliance',
        form12DirectorChange: 'Unlimited Director & Expat Updates',
        shareAllotmentFormX: 'Foreign Inward Remittance (BB Form 1 & 2)',
        authorizedCapitalIncrease: 'Cross-Border Capital Structuring',
        statutoryRegisterMaintenance: 'Full English Statutory Records & Seal',
        advisoryHours: 'Unlimited VIP Foreign Legal Advisory',
        priorityProcessing: 'VIP Express Direct Handling',
        certifiedCopies: 'Full Embassy & Apostille Attestation Sets',
        dedicatedLawyer: 'Senior Foreign Investment Partner',
        foreignShareholderRemittance: 'Complete Bangladesh Bank Compliance',
        emergencyEscalation: true,
        quarterlyAudit: true
      }
    }
  ];

  // Feature row definition for side-by-side comparison matrix
  const featureRows = [
    {
      key: 'annualReturn',
      category: 'filings',
      label: 'RJSC Annual Return (Form C, Sch. X)',
      tooltip: 'Mandatory annual submission to RJSC including Audited Balance Sheet and Director list.'
    },
    {
      key: 'agmDocs',
      category: 'secretarial',
      label: 'AGM & Board Meeting Documentation',
      tooltip: 'Preparation of Annual General Meeting notices, agendas, attendance sheets, and formal minutes.'
    },
    {
      key: 'form12DirectorChange',
      category: 'filings',
      label: 'Director Appointment & Removal (Form XII)',
      tooltip: 'Filing changes in Board of Directors with RJSC within 14 days of resolution.'
    },
    {
      key: 'shareAllotmentFormX',
      category: 'filings',
      label: 'Share Transfer & Allotment (Form X & 117)',
      tooltip: 'Issuing new shares or transferring equity among existing/new shareholders.'
    },
    {
      key: 'authorizedCapitalIncrease',
      category: 'filings',
      label: 'Authorized Capital Increase & Charges',
      tooltip: 'Filing Form III, IV and Form VIII/XV for bank mortgages or capital expansion.'
    },
    {
      key: 'statutoryRegisterMaintenance',
      category: 'secretarial',
      label: 'Statutory Registers & Share Certificates',
      tooltip: 'Maintaining mandatory registers of members, directors, charges, and issuing share certificates.'
    },
    {
      key: 'advisoryHours',
      category: 'advisory',
      label: 'Corporate Lawyer Advisory Access',
      tooltip: 'Direct telephone, email, or in-person consultation time with experienced corporate advocates.'
    },
    {
      key: 'priorityProcessing',
      category: 'sla',
      label: 'RJSC Submission SLA & Processing Speed',
      tooltip: 'Turnaround time for document preparation and RJSC official portal filing.'
    },
    {
      key: 'certifiedCopies',
      category: 'secretarial',
      label: 'RJSC Official Certified True Copies',
      tooltip: 'Procuring certified true copies with government seal for bank and regulatory use.'
    },
    {
      key: 'foreignShareholderRemittance',
      category: 'advisory',
      label: 'Foreign Remittance & BIDA/BB Approvals',
      tooltip: 'Bangladesh Bank inward remittance reporting and BIDA compliance for foreign capital.'
    },
    {
      key: 'quarterlyAudit',
      category: 'advisory',
      label: 'Quarterly Corporate Health Audit',
      tooltip: 'Proactive review of trade license, tax TIN/BIN, and RJSC compliance status every 3 months.'
    },
    {
      key: 'dedicatedLawyer',
      category: 'advisory',
      label: 'Dedicated Legal Account Officer',
      tooltip: 'Named legal associate serving as your primary point of contact for all corporate matters.'
    }
  ];

  // Helper renderer for boolean / string values
  const renderValue = (val: boolean | string) => {
    if (typeof val === 'boolean') {
      return val ? (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
          <Check className="w-4 h-4 stroke-[3]" />
        </span>
      ) : (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-400 border border-slate-200">
          <X className="w-4 h-4" />
        </span>
      );
    }
    return <span className="text-xs font-semibold text-slate-800">{val}</span>;
  };

  // Filter rows based on category and differences filter
  const filteredRows = featureRows.filter(row => {
    if (activeCategory !== 'all' && row.category !== activeCategory) {
      return false;
    }
    if (showDifferencesOnly) {
      // Check if values across all packages are not identical
      const firstVal = (packages[0].features as any)[row.key];
      const hasDiff = packages.some(p => (p.features as any)[row.key] !== firstVal);
      return hasDiff;
    }
    return true;
  });

  const handleSelectPackage = (pkgName: string) => {
    const selectedAddonNames = selectedAddons
      .map(id => availableAddons.find(a => a.id === id)?.name)
      .filter(Boolean);

    const details = `Selected Plan: ${pkgName} (${billingCycle === 'annual' ? 'Annual Retainer' : 'Per-Filing'}). Selected Add-ons: ${selectedAddonNames.length > 0 ? selectedAddonNames.join(', ') : 'None'}.`;
    onOpenConsultationWithPackage(pkgName, details);
  };

  return (
    <section id="packages" className="bg-slate-50 text-slate-900 py-20 border-b border-slate-200 relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs uppercase px-4 py-1.5 rounded-full shadow-sm">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>Side-by-Side Plan Comparison</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-slate-900 tracking-tight leading-tight">
            Compare Corporate Compliance & <span className="text-emerald-700">Secretarial Packages</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Choose the right level of legal protection and RJSC filing coverage for your Bangladesh entity. From early-stage OPCs to large groups and foreign subsidiaries.
          </p>
        </div>

        {/* Controls Bar: Billing Toggle & Feature Filters */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Billing Cycle Switch */}
            <div className="flex items-center bg-slate-100 p-1.5 rounded-xl border border-slate-200 shadow-inner">
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  billingCycle === 'annual'
                    ? 'bg-[#00C896] text-slate-950 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Annual Legal Retainer</span>
                <span className="bg-emerald-800 text-white text-[10px] px-2 py-0.5 rounded font-mono font-extrabold">
                  Save 15%
                </span>
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('perFiling')}
                className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  billingCycle === 'perFiling'
                    ? 'bg-[#00C896] text-slate-950 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Per-Filing / Transactional
              </button>
            </div>

            {/* Differences Filter & Category Tabs */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-center md:justify-end">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white px-3.5 py-2 rounded-xl border border-slate-200 cursor-pointer hover:border-slate-300 transition-colors shadow-sm">
                <input
                  type="checkbox"
                  checked={showDifferencesOnly}
                  onChange={(e) => setShowDifferencesOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 bg-slate-50"
                />
                <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600" />
                <span>Show Differences Only</span>
              </label>

              {/* Category Filter Pills */}
              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
                {[
                  { id: 'all', label: 'All Features' },
                  { id: 'filings', label: 'RJSC Filings' },
                  { id: 'secretarial', label: 'Secretarial' },
                  { id: 'advisory', label: 'Advisory' },
                  { id: 'sla', label: 'Processing SLA' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id as any)}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                      activeCategory === cat.id
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Quick Info Strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 pt-2 border-t border-slate-200">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              100% Guaranteed RJSC Legal Approval
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-emerald-600" />
              Direct High Court & RJSC Practicing Advocates
            </span>
            <span className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-emerald-600" />
              Zero Hidden Charges - Official Govt Receipts Included
            </span>
          </div>
        </div>

        {/* Top Cards Grid (4 Column Responsive) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-2xl p-6 flex flex-col justify-between transition-all relative overflow-hidden ${
                pkg.popular
                  ? 'bg-white border-2 border-emerald-500 shadow-lg transform lg:-translate-y-2'
                  : 'bg-white border border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              {/* Top Badge */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] uppercase font-mono tracking-wider px-2.5 py-1 rounded-full border shadow-sm ${pkg.badgeColor}`}>
                    {pkg.badge}
                  </span>
                  {pkg.popular && (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold uppercase font-mono">
                      <Sparkles className="w-3 h-3 text-emerald-600" /> Top Value
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold font-serif text-slate-900">{pkg.name}</h3>
                <p className="text-xs text-slate-600 min-h-[36px]">{pkg.tagline}</p>
              </div>

              {/* Price Display */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
                <div className="text-2xl font-extrabold text-emerald-700 font-serif">
                  {billingCycle === 'annual' ? pkg.priceAnnual : pkg.pricePerFiling}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {billingCycle === 'annual' ? 'Billed annually with full secretarial coverage' : 'Per filing event statutory legal fee'}
                </div>
              </div>

              {/* Recommended For Box */}
              <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200 mb-6 space-y-1">
                <span className="font-bold text-emerald-800 block text-[11px] uppercase tracking-wider">Best Fit For:</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">{pkg.recommendedFor}</p>
              </div>

              {/* Select Package Action Button */}
              <button
                type="button"
                onClick={() => handleSelectPackage(pkg.name)}
                className={`w-full py-3 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-sm ${
                  pkg.popular
                    ? 'bg-[#00C896] hover:bg-[#00B084] text-slate-950 font-extrabold'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
                }`}
              >
                <span>Select {pkg.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Side-by-Side Detailed Feature Matrix Table */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold font-serif text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                Comprehensive Feature Comparison Matrix
              </h3>
              <p className="text-xs text-slate-600">
                Detailed breakdown of statutory filings, board minutes, and legal advisory included in each plan.
              </p>
            </div>
            <div className="text-xs text-emerald-800 font-mono bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Showing {filteredRows.length} Feature Criteria
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 text-xs uppercase font-mono tracking-wider border-b border-slate-200">
                  <th className="p-4 w-1/3 min-w-[240px]">Feature / Statutory Scope</th>
                  {packages.map((pkg) => (
                    <th key={pkg.id} className="p-4 text-center min-w-[160px]">
                      <span className="font-bold text-emerald-800 block font-serif text-sm">{pkg.name}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs">
                {filteredRows.map((row, idx) => (
                  <tr key={row.key} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/80'}>
                    
                    {/* Feature Label Column with Tooltip Info */}
                    <td className="p-4 font-medium text-slate-800">
                      <div className="flex items-center gap-2">
                        <span>{row.label}</span>
                        <div className="group relative inline-block cursor-help">
                          <Info className="w-3.5 h-3.5 text-slate-400 hover:text-emerald-600 transition-colors" />
                          <div className="hidden group-hover:block absolute left-6 bottom-0 w-64 p-2.5 bg-white border border-slate-200 rounded-lg text-[11px] text-slate-700 shadow-xl z-30 pointer-events-none">
                            {row.tooltip}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Matrix Column Values */}
                    {packages.map((pkg) => {
                      const val = (pkg.features as any)[row.key];
                      return (
                        <td key={pkg.id} className="p-4 text-center align-middle">
                          <div className="flex items-center justify-center">
                            {renderValue(val)}
                          </div>
                        </td>
                      );
                    })}

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommended Add-ons Configurator */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
                <Plus className="w-4 h-4 text-emerald-600" />
                Optional Compliance Add-Ons
              </div>
              <h3 className="text-xl font-bold font-serif text-slate-900">
                Customize Your Service Package
              </h3>
            </div>
            <p className="text-xs text-slate-600 max-w-md">
              Select supplementary corporate legal services to bundle with your chosen retainer for complete operational readiness.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {availableAddons.map((addon) => {
              const isSelected = selectedAddons.includes(addon.id);
              return (
                <div
                  key={addon.id}
                  onClick={() => toggleAddon(addon.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-500 shadow-sm text-slate-900'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold leading-tight">{addon.name}</span>
                    <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-[#00C896] border-emerald-500 text-slate-950' : 'border-slate-300'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                    <span className="text-xs font-extrabold text-emerald-700 font-mono">{addon.price}</span>
                    {addon.badge && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold border border-emerald-300">
                        {addon.badge}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Combined Selected Summary Bar */}
          {selectedAddons.length > 0 && (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-slate-800">
                  <strong className="text-emerald-800">{selectedAddons.length} Add-on(s) selected:</strong> {
                    selectedAddons.map(id => availableAddons.find(a => a.id === id)?.name).join(', ')
                  }
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleSelectPackage('Custom Package with Selected Add-ons')}
                className="bg-[#00C896] hover:bg-[#00B084] text-slate-950 font-extrabold px-5 py-2.5 rounded-lg whitespace-nowrap shadow-sm transition-all"
              >
                Request Custom Package Quote
              </button>
            </div>
          )}
        </div>

        {/* Package FAQs Accordion */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <h3 className="text-xl font-bold font-serif text-slate-900 text-center flex items-center justify-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
            Frequently Asked Questions About Service Packages
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {[
              {
                q: "Can I switch or upgrade my package during the year?",
                a: "Yes. You can upgrade from Startup to Scaleup or Enterprise at any time. Unused months from your current retainer will be pro-rated towards your new plan."
              },
              {
                q: "Are RJSC government fees included in these retainer packages?",
                a: "Retainer packages cover complete legal advocacy, drafting, formatting, and portal filings. Official government statutory fees are charged at actual cost with official RJSC treasury receipts provided."
              },
              {
                q: "What happens if our company misses an annual RJSC filing deadline?",
                a: "Our team will handle the petition to RJSC for condonation of delay and late fee settlement to protect directors from default penalties or prosecution."
              },
              {
                q: "Do you handle foreign companies with non-resident directors?",
                a: "Yes! Our FDI & Foreign Subsidiary Retainer is specially designed to manage foreign currency share capital, Bangladesh Bank inward remittance reporting (Form 1 & 2), and BIDA permissions."
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 cursor-pointer hover:border-slate-300 transition-colors"
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                  <span>{faq.q}</span>
                  {expandedFaq === idx ? <ChevronUp className="w-4 h-4 text-emerald-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
                {(expandedFaq === idx || true) && (
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
