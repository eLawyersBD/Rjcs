import React, { useState, useEffect } from 'react';
import {
  Building2,
  FileCheck2,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Search,
  Plus,
  ArrowRight,
  ShieldCheck,
  FileText,
  User,
  Phone,
  Download,
  Eye,
  RefreshCw,
  X,
  Filter,
  Layers,
  ChevronRight,
  ExternalLink,
  Lock,
  Sparkles,
  Award,
  FileEdit,
  Send,
  SearchCheck
} from 'lucide-react';
import { DocumentPreviewModal, PreviewDocData } from './DocumentPreviewModal';
import { SecureDocumentUploadModal, UploadedLegalDoc } from './SecureDocumentUploadModal';
import { ComplianceProgressChart } from './ComplianceProgressChart';

export type FilingStage = 'Drafting' | 'Submitted' | 'Under Review' | 'Approved';

export interface FilingStep {
  title: string;
  status: 'completed' | 'current' | 'pending';
  date?: string;
  notes?: string;
}

export interface OngoingFiling {
  id: string;
  companyName: string;
  registrationNumber: string;
  serviceTitle: string;
  trackingId: string;
  overallStatus: 'In Progress' | 'Under Review' | 'Completed' | 'Action Required';
  currentStage: FilingStage;
  progressPercentage: number;
  assignedAdvocate: string;
  advocatePhone: string;
  submissionDate: string;
  estimatedCompletion: string;
  steps: FilingStep[];
  requiredDocs?: { name: string; uploaded: boolean }[];
  deliverables?: { name: string; size: string }[];
}

interface ClientDashboardProps {
  onOpenConsultationWithTopic?: (topic: string) => void;
}

/* VISUAL COMPLIANCE STAGE PROGRESS BAR COMPONENT */
export const ComplianceStageProgressBar: React.FC<{
  filing: OngoingFiling;
  onUploadClick?: () => void;
  onPreviewDocument?: (doc: PreviewDocData) => void;
}> = ({ filing, onUploadClick, onPreviewDocument }) => {
  const stages: {
    key: FilingStage;
    label: string;
    desc: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { key: 'Drafting', label: 'Drafting', desc: 'Board Minutes & Form Preparation', icon: FileEdit },
    { key: 'Submitted', label: 'Submitted', desc: 'Treasury Challan & Portal Filing', icon: Send },
    { key: 'Under Review', label: 'Under Review', desc: 'RJSC Officer Desk Verification', icon: SearchCheck },
    { key: 'Approved', label: 'Approved', desc: 'Certified Copy & Registration Issued', icon: ShieldCheck }
  ];

  const currentStageIndex = stages.findIndex((s) => s.key === filing.currentStage);
  const isActionRequired = filing.overallStatus === 'Action Required';
  const isCompleted = filing.overallStatus === 'Completed' || filing.currentStage === 'Approved';

  // Percentage width for active connector bar (3 gaps: 0%, 33.3%, 66.6%, 100%)
  const barWidthPercent = (currentStageIndex / 3) * 100;

  const getFormTypeFromService = (service: string): PreviewDocData['formType'] => {
    if (service.includes('XV') || service.includes('Capital')) return 'Form XV';
    if (service.includes('VIII') || service.includes('Annual')) return 'Form VIII';
    if (service.includes('XII') || service.includes('Director')) return 'Form XII';
    return 'Board Resolution';
  };

  const handleStageNodeClick = (stageName: FilingStage) => {
    if (onPreviewDocument) {
      onPreviewDocument({
        documentTitle: `Statutory_Draft_${filing.companyName.replace(/\s+/g, '_')}_${stageName}.pdf`,
        formType: getFormTypeFromService(filing.serviceTitle),
        companyName: filing.companyName,
        registrationNumber: filing.registrationNumber,
        trackingId: filing.trackingId,
        filingDate: filing.submissionDate,
        assignedAdvocate: filing.assignedAdvocate,
        stageName: stageName
      });
    }
  };

  return (
    <div className="bg-slate-950 border border-slate-800 p-5 sm:p-6 rounded-3xl space-y-6 shadow-xl relative overflow-hidden">
      
      {/* Header Info Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
              Visual Compliance Stage Progress
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Stage {currentStageIndex + 1} of 4
            </span>
          </div>

          <h4 className="text-base font-bold font-serif text-white flex items-center gap-2">
            <span>Current Stage:</span>
            <span className={`font-serif ${isCompleted ? 'text-emerald-400' : isActionRequired ? 'text-red-400 font-bold' : 'text-amber-300'}`}>
              {filing.currentStage}
            </span>
          </h4>
        </div>

        {/* Progress Percentage Badge & Preview Button */}
        <div className="flex items-center gap-3">
          {onPreviewDocument && (
            <button
              type="button"
              onClick={() => handleStageNodeClick(filing.currentStage)}
              className="bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-700 px-3 py-2 rounded-2xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm shrink-0"
              title="Preview Statutory Form PDF for current stage"
            >
              <Eye className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Preview Stage PDF</span>
            </button>
          )}

          <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-2xl shrink-0">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-mono">Overall Clearance</span>
              <span className="text-sm font-extrabold text-white font-mono">{filing.progressPercentage}% Complete</span>
            </div>
            <div className="w-9 h-9 rounded-full border-2 border-amber-500/50 flex items-center justify-center bg-amber-500/10 text-amber-400 font-mono font-bold text-xs">
              {filing.progressPercentage}%
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Multi-Stage Progress Stepper Bar */}
      <div className="py-2 relative px-2 sm:px-4">
        
        {/* Connector Line Background */}
        <div className="absolute top-6 left-10 right-10 h-1.5 bg-slate-800 rounded-full -translate-y-1/2 z-0 hidden sm:block" />
        
        {/* Connector Line Active Fill */}
        <div
          className={`absolute top-6 left-10 h-1.5 rounded-full -translate-y-1/2 z-0 transition-all duration-700 hidden sm:block ${
            isCompleted
              ? 'bg-emerald-400'
              : isActionRequired
              ? 'bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500'
              : 'bg-gradient-to-r from-amber-500 to-amber-300'
          }`}
          style={{ width: `calc(${barWidthPercent}% - 2.5rem)` }}
        />

        {/* 4 Stage Nodes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-2 relative z-10">
          {stages.map((stg, idx) => {
            const isStageDone = idx < currentStageIndex || isCompleted;
            const isStageCurrent = idx === currentStageIndex && !isCompleted;
            const isStagePending = idx > currentStageIndex && !isCompleted;

            const StageIcon = stg.icon;

            return (
              <div
                key={stg.key}
                onClick={() => handleStageNodeClick(stg.key)}
                className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2 group cursor-pointer"
                title={`Click to preview PDF for ${stg.label} stage`}
              >
                
                {/* Node Circle Pin */}
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center border transition-all duration-300 shrink-0 shadow-lg group-hover:scale-105 ${
                    isStageDone
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-emerald-500/20'
                      : isStageCurrent
                      ? isActionRequired
                        ? 'bg-red-500 text-white border-red-300 ring-4 ring-red-500/25 animate-pulse'
                        : 'bg-amber-500 text-slate-950 border-amber-300 ring-4 ring-amber-500/25'
                      : 'bg-slate-900 text-slate-600 border-slate-800 group-hover:border-slate-600'
                  }`}
                >
                  {isStageDone ? (
                    <CheckCircle2 className="w-5 h-5 text-slate-950" />
                  ) : (
                    <StageIcon className={`w-5 h-5 ${isStageCurrent ? (isActionRequired ? 'text-white' : 'text-slate-950') : 'text-slate-500'}`} />
                  )}
                </div>

                {/* Node Text & Description */}
                <div className="space-y-0.5 sm:text-center text-left">
                  <div className="flex items-center gap-1.5 sm:justify-center">
                    <span className="text-[10px] text-slate-400 font-mono font-bold">0{idx + 1}.</span>
                    <span
                      className={`text-xs font-bold font-serif group-hover:underline ${
                        isStageDone
                          ? 'text-emerald-300'
                          : isStageCurrent
                          ? isActionRequired
                            ? 'text-red-400'
                            : 'text-amber-300'
                          : 'text-slate-500'
                      }`}
                    >
                      {stg.label}
                    </span>
                  </div>

                  <p className="text-[10px] text-slate-400 leading-tight hidden sm:block max-w-[120px] mx-auto">
                    {stg.desc}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Stage Explanatory Banner */}
      <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-2 text-slate-300">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white font-serif">Stage Status: </strong>
            {filing.currentStage === 'Drafting' && 'Advocates are drafting resolution minutes, Memorandum clauses, and Form IX/XII schedules.'}
            {filing.currentStage === 'Submitted' && 'Government Treasury Challan deposited at Sonali Bank. Portal submission active with RJSC.'}
            {filing.currentStage === 'Under Review' && 'Filing file is currently undergoing desk verification by RJSC Assistant Registrar.'}
            {filing.currentStage === 'Approved' && 'Statutory approval granted! Certified copy & digital acknowledgement receipt ready.'}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onPreviewDocument && (
            <button
              type="button"
              onClick={() => handleStageNodeClick(filing.currentStage)}
              className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all flex items-center gap-1"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Preview Doc</span>
            </button>
          )}

          {isActionRequired && onUploadClick && (
            <button
              type="button"
              onClick={onUploadClick}
              className="bg-red-500 hover:bg-red-600 text-white font-bold px-3.5 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all shadow-md flex items-center gap-1"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Missing Doc</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
};

export const INITIAL_MOCK_FILINGS: OngoingFiling[] = [
  {
    id: 'filing-01',
    companyName: 'AetherTech Solutions Ltd.',
    registrationNumber: 'C-184920/2023',
    serviceTitle: 'Authorized Capital Increase & Return of Allotment (Form XV)',
    trackingId: 'RJSC-2026-8812',
    overallStatus: 'In Progress',
    currentStage: 'Under Review',
    progressPercentage: 75,
    assignedAdvocate: 'Adv. M. A. Rahman (Supreme Court)',
    advocatePhone: '+880 1711-223344',
    submissionDate: 'July 25, 2026',
    estimatedCompletion: 'August 02, 2026',
    steps: [
      { title: 'Shareholder Board Meeting & EGM Minutes Drafted', status: 'completed', date: 'July 25, 2026', notes: 'Special resolution passed unanimously for capital expansion.' },
      { title: 'Treasury Challan Fee Payment at Bangladesh Bank', status: 'completed', date: 'July 27, 2026', notes: '৳45,000 statutory government fee deposited.' },
      { title: 'Form XV & MOA Amendments Portal Submission', status: 'completed', date: 'July 29, 2026', notes: 'Digital Signature verification completed with RJSC.' },
      { title: 'Final Review & Certified Copy Issuance by Registrar', status: 'current', date: 'Pending RJSC Officer Signoff', notes: 'File under final desk verification by RJSC Assistant Registrar.' }
    ],
    deliverables: [
      { name: 'Draft_EGM_Special_Resolution.pdf', size: '1.2 MB' },
      { name: 'Treasury_Challan_Receipt_Verified.pdf', size: '850 KB' }
    ]
  },
  {
    id: 'filing-02',
    companyName: 'Dhakai Heritage Retail Ltd.',
    registrationNumber: 'C-162304/2021',
    serviceTitle: 'Annual Return (Form VIII & Schedule X) Backlog Clearance',
    trackingId: 'RJSC-2026-9142',
    overallStatus: 'Action Required',
    currentStage: 'Submitted',
    progressPercentage: 40,
    assignedAdvocate: 'Adv. S. H. Chowdhury',
    advocatePhone: '+880 1822-334455',
    submissionDate: 'July 28, 2026',
    estimatedCompletion: 'August 05, 2026',
    steps: [
      { title: 'Retrospective Audit & ICAB DVS Code Verification', status: 'completed', date: 'July 28, 2026', notes: '18-digit ICAB DVS code attached to financial statements.' },
      { title: 'Form VIII & Schedule X Preparation', status: 'completed', date: 'July 29, 2026', notes: 'All statutory director signatures collected.' },
      { title: 'Client Upload of Signed Director Consent (Form IX)', status: 'current', date: 'Action Needed from Client', notes: 'Missing signed Form IX copy for incoming independent director.' },
      { title: 'RJSC Condonation of Delay & Clearance Certificate', status: 'pending', notes: 'Will proceed after Form IX document upload.' }
    ],
    requiredDocs: [
      { name: 'Signed Director Consent Form IX (Scanned PDF)', uploaded: false },
      { name: 'Board Resolution for AGM Approval', uploaded: true }
    ],
    deliverables: [
      { name: 'Draft_Form_VIII_Schedule_X_Preview.pdf', size: '2.4 MB' }
    ]
  },
  {
    id: 'filing-03',
    companyName: 'Nippon Industrial Machinery (BD) Ltd.',
    registrationNumber: 'C-198210/2024',
    serviceTitle: 'Foreign Director Appointment & Form XII Filing',
    trackingId: 'RJSC-2026-7420',
    overallStatus: 'Completed',
    currentStage: 'Approved',
    progressPercentage: 100,
    assignedAdvocate: 'Adv. Tariqul Islam',
    advocatePhone: '+880 1744-556677',
    submissionDate: 'July 15, 2026',
    estimatedCompletion: 'July 22, 2026',
    steps: [
      { title: 'BIDA Inward FDI Encashment Certificate Verification', status: 'completed', date: 'July 15, 2026' },
      { title: 'Japanese Overseas Passport & Consent Notarization', status: 'completed', date: 'July 17, 2026' },
      { title: 'Form XII Filing at RJSC Chattogram Regional Desk', status: 'completed', date: 'July 20, 2026' },
      { title: 'Official Certified Form XII Issued by Registrar', status: 'completed', date: 'July 22, 2026' }
    ],
    deliverables: [
      { name: 'Certified_Form_XII_Director_Change.pdf', size: '3.1 MB' },
      { name: 'RJSC_Official_Acknowledgement_Receipt.pdf', size: '1.1 MB' }
    ]
  }
];

export const ClientDashboard: React.FC<ClientDashboardProps> = ({
  onOpenConsultationWithTopic
}) => {
  const [filings, setFilings] = useState<OngoingFiling[]>(INITIAL_MOCK_FILINGS);
  const [selectedFilingId, setSelectedFilingId] = useState<string>(INITIAL_MOCK_FILINGS[0].id);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTracking, setSearchTracking] = useState<string>('');
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [newTrackingInput, setNewTrackingInput] = useState<string>('');
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);

  // Secure Vault Documents state
  const [vaultDocsMap, setVaultDocsMap] = useState<Record<string, UploadedLegalDoc[]>>({
    'flg-101': [
      {
        id: 'vault-101-1',
        fileName: 'Apex_Tech_Trade_License_2026.pdf',
        docCategory: 'Trade License',
        fileSize: '2.4 MB',
        uploadedAt: 'Jul 15, 2026',
        reviewStatus: 'Verified & Accepted'
      },
      {
        id: 'vault-101-2',
        fileName: 'Form_IX_Director_Consent_Signed.pdf',
        docCategory: 'Form IX / XII',
        fileSize: '1.1 MB',
        uploadedAt: 'Jul 28, 2026',
        reviewStatus: 'Under Legal Review'
      }
    ],
    'flg-102': [
      {
        id: 'vault-102-1',
        fileName: 'Delta_Logistics_Form_VIII_Audit.pdf',
        docCategory: 'Tax / VAT Certificate',
        fileSize: '3.8 MB',
        uploadedAt: 'Jul 20, 2026',
        reviewStatus: 'Verified & Accepted'
      }
    ]
  });

  // Document Preview Modal state
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);
  const [previewDocData, setPreviewDocData] = useState<PreviewDocData | null>(null);

  // Google Drive Imported Documents state
  const [importedDriveVaultDocs, setImportedDriveVaultDocs] = useState<any[]>([]);

  const loadImportedDriveDocs = () => {
    try {
      const stored = localStorage.getItem('elawyers_imported_drive_vault_docs');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setImportedDriveVaultDocs(parsed);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadImportedDriveDocs();

    const handleImportEvent = (e: any) => {
      loadImportedDriveDocs();
    };

    window.addEventListener('elawyers_drive_doc_imported', handleImportEvent);
    window.addEventListener('storage', loadImportedDriveDocs);

    return () => {
      window.removeEventListener('elawyers_drive_doc_imported', handleImportEvent);
      window.removeEventListener('storage', loadImportedDriveDocs);
    };
  }, []);

  const selectedFiling = filings.find((f) => f.id === selectedFilingId) || filings[0];
  const currentVaultDocs = vaultDocsMap[selectedFiling.id] || [];

  const handleDocumentUploaded = (newDoc: UploadedLegalDoc) => {
    setVaultDocsMap((prev) => ({
      ...prev,
      [selectedFiling.id]: [newDoc, ...(prev[selectedFiling.id] || [])]
    }));

    // Update filing status if action required
    setFilings((prev) =>
      prev.map((f) => {
        if (f.id === selectedFiling.id) {
          return {
            ...f,
            overallStatus: f.overallStatus === 'Action Required' ? 'In Progress' : f.overallStatus,
            requiredDocs: f.requiredDocs?.map((d) => ({ ...d, uploaded: true }))
          };
        }
        return f;
      })
    );
  };

  const getFormTypeFromService = (service: string, docTitle?: string): PreviewDocData['formType'] => {
    if (docTitle?.includes('VIII') || service.includes('VIII') || service.includes('Annual')) return 'Form VIII';
    if (docTitle?.includes('XV') || service.includes('XV') || service.includes('Capital')) return 'Form XV';
    if (docTitle?.includes('XII') || service.includes('XII') || service.includes('Director')) return 'Form XII';
    if (docTitle?.includes('IX')) return 'Form IX';
    if (docTitle?.includes('Resolution') || docTitle?.includes('EGM')) return 'Board Resolution';
    return 'Form XV';
  };

  const handleOpenDocumentPreview = (customDoc?: PreviewDocData) => {
    if (customDoc) {
      setPreviewDocData(customDoc);
    } else {
      setPreviewDocData({
        documentTitle: `Certified_${selectedFiling.serviceTitle.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`,
        formType: getFormTypeFromService(selectedFiling.serviceTitle),
        companyName: selectedFiling.companyName,
        registrationNumber: selectedFiling.registrationNumber,
        trackingId: selectedFiling.trackingId,
        filingDate: selectedFiling.submissionDate,
        assignedAdvocate: selectedFiling.assignedAdvocate,
        stageName: selectedFiling.currentStage
      });
    }
    setIsPreviewModalOpen(true);
  };

  const filteredFilings = filings.filter((f) => {
    const matchesFilter =
      statusFilter === 'all' ||
      (statusFilter === 'in_progress' && f.overallStatus === 'In Progress') ||
      (statusFilter === 'action' && f.overallStatus === 'Action Required') ||
      (statusFilter === 'completed' && f.overallStatus === 'Completed');

    const matchesSearch =
      searchTracking === '' ||
      f.companyName.toLowerCase().includes(searchTracking.toLowerCase()) ||
      f.trackingId.toLowerCase().includes(searchTracking.toLowerCase()) ||
      f.serviceTitle.toLowerCase().includes(searchTracking.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleDocumentUploadSim = (docName: string) => {
    setFilings((prev) =>
      prev.map((item) => {
        if (item.id === selectedFiling.id && item.requiredDocs) {
          const updatedDocs = item.requiredDocs.map((d) =>
            d.name === docName ? { ...d, uploaded: true } : d
          );
          return {
            ...item,
            requiredDocs: updatedDocs,
            overallStatus: 'In Progress',
            currentStage: 'Under Review' as FilingStage,
            progressPercentage: Math.min(item.progressPercentage + 35, 75)
          };
        }
        return item;
      })
    );
    setUploadSuccessMessage(`Successfully uploaded "${docName}" for RJSC verification! Process moved to "Under Review" stage.`);
    setTimeout(() => setUploadSuccessMessage(null), 4000);
    setShowUploadModal(false);
  };

  const handleTrackNewReference = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrackingInput.trim()) return;

    // Check if tracking ID exists
    const found = filings.find(
      (f) => f.trackingId.toLowerCase() === newTrackingInput.trim().toLowerCase()
    );

    if (found) {
      setSelectedFilingId(found.id);
      setNewTrackingInput('');
      setUploadSuccessMessage(`Found filing record for ${found.companyName}!`);
      setTimeout(() => setUploadSuccessMessage(null), 3000);
    } else {
      // Add a simulated new filing record
      const newRecord: OngoingFiling = {
        id: `filing-${Date.now()}`,
        companyName: 'New Registered Venture Ltd.',
        registrationNumber: 'C-209148/2026',
        serviceTitle: 'Name Clearance & RJSC Incorporation Package',
        trackingId: newTrackingInput.trim().toUpperCase(),
        overallStatus: 'In Progress',
        currentStage: 'Drafting',
        progressPercentage: 25,
        assignedAdvocate: 'Adv. M. A. Rahman (Supreme Court)',
        advocatePhone: '+880 1711-223344',
        submissionDate: 'Today',
        estimatedCompletion: 'In 4 Working Days',
        steps: [
          { title: 'Name Clearance Approved by RJSC', status: 'completed', date: 'Today' },
          { title: 'Drafting MOA & AOA Clauses', status: 'current', date: 'In Progress' },
          { title: 'Bank Account Opening & Share Capital Encashment', status: 'pending' },
          { title: 'Final Digital Filing & Certificate of Incorporation', status: 'pending' }
        ]
      };

      setFilings([newRecord, ...filings]);
      setSelectedFilingId(newRecord.id);
      setNewTrackingInput('');
      setUploadSuccessMessage(`Linked new tracking ID ${newRecord.trackingId} to dashboard!`);
      setTimeout(() => setUploadSuccessMessage(null), 3000);
    }
  };

  return (
    <section id="client-dashboard" className="py-20 bg-slate-950 text-white relative border-b border-slate-800">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Lock className="w-4 h-4 text-amber-400" />
            <span>Secure Corporate Client Portal</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight text-white">
            RJSC Live Compliance Tracker
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Monitor real-time progress for your company's incorporation, Form XII director changes, return of allotments, and annual filings with complete transparency.
          </p>
        </div>

        {/* Tracking Reference Linker Input Bar */}
        <div className="bg-slate-900 border border-slate-800 p-4 sm:p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 space-y-0 text-left">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-serif">Track a Specific Filing Reference</h3>
              <p className="text-xs text-slate-400">Enter your RJSC Tracking ID (e.g. RJSC-2026-8812)</p>
            </div>
          </div>

          <form onSubmit={handleTrackNewReference} className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="text"
              value={newTrackingInput}
              onChange={(e) => setNewTrackingInput(e.target.value)}
              placeholder="e.g. RJSC-2026-8812"
              className="bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs rounded-xl px-4 py-2.5 focus:border-amber-500 focus:outline-none w-full md:w-60"
            />
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs whitespace-nowrap shadow-md transition-all flex items-center gap-1.5"
            >
              <span>Track Process</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Success Toast */}
        {uploadSuccessMessage && (
          <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-fadeIn shadow-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{uploadSuccessMessage}</span>
          </div>
        )}

        {/* MAIN DASHBOARD DUAL COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: List of Active Registered Company Filings */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl space-y-4">
              
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white font-serif flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-400" />
                  <span>My Company Filings</span>
                </h3>
                <span className="text-[10px] bg-slate-950 border border-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                  {filings.length} Active
                </span>
              </div>

              {/* Status Filter Buttons */}
              <div className="flex items-center gap-1 text-[11px] overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'in_progress', label: 'In Progress' },
                  { id: 'action', label: 'Action Needed' },
                  { id: 'completed', label: 'Completed' }
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setStatusFilter(st.id)}
                    className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-all ${
                      statusFilter === st.id
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              {/* Company List */}
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
                {filteredFilings.map((item) => {
                  const isSelected = item.id === selectedFiling.id;

                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedFilingId(item.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                        isSelected
                          ? 'bg-amber-500/10 border-amber-500 text-white shadow-xl'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-xs font-bold text-white font-serif line-clamp-1">{item.companyName}</h4>
                          <p className="text-[10px] text-slate-400 font-mono mt-0.5">{item.registrationNumber}</p>
                        </div>

                        <span
                          className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                            item.overallStatus === 'Completed'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : item.overallStatus === 'Action Required'
                              ? 'bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          }`}
                        >
                          {item.overallStatus}
                        </span>
                      </div>

                      <p className="text-[11px] text-amber-400 font-medium line-clamp-1">
                        {item.serviceTitle}
                      </p>

                      {/* Progress & Compliance Stage Snippet */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                          <span className="flex items-center gap-1">
                            <span>Stage:</span>
                            <strong className={`font-semibold ${item.overallStatus === 'Completed' ? 'text-emerald-400' : item.overallStatus === 'Action Required' ? 'text-red-400' : 'text-amber-400'}`}>
                              {item.currentStage}
                            </strong>
                          </span>
                          <span className="font-bold text-white">{item.progressPercentage}%</span>
                        </div>

                        {/* 4-Segment Visual Stage Bar */}
                        <div className="grid grid-cols-4 gap-1">
                          {(['Drafting', 'Submitted', 'Under Review', 'Approved'] as FilingStage[]).map((stgName, idx) => {
                            const stageOrder = ['Drafting', 'Submitted', 'Under Review', 'Approved'];
                            const currentIdx = stageOrder.indexOf(item.currentStage);
                            const isPassedOrCurrent = idx <= currentIdx;
                            const isCurrentStage = idx === currentIdx;

                            return (
                              <div
                                key={stgName}
                                className={`h-1.5 rounded-full transition-all ${
                                  isPassedOrCurrent
                                    ? item.overallStatus === 'Completed' || item.currentStage === 'Approved'
                                      ? 'bg-emerald-400'
                                      : item.overallStatus === 'Action Required' && isCurrentStage
                                      ? 'bg-red-400 animate-pulse'
                                      : 'bg-amber-400'
                                    : 'bg-slate-800'
                                }`}
                                title={`Stage ${idx + 1}: ${stgName}`}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {filteredFilings.length === 0 && (
                  <div className="text-center py-8 text-xs text-slate-400 bg-slate-950 rounded-2xl border border-slate-800">
                    No filing processes match the selected status filter.
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Right Column: Detailed Tracker View for Selected Filing */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-8 shadow-2xl">
            
            {/* Header: Company & Filing Metadata */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full">
                    {selectedFiling.trackingId}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Reg: {selectedFiling.registrationNumber}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                  {selectedFiling.companyName}
                </h3>

                <p className="text-xs sm:text-sm text-amber-400 font-semibold">
                  {selectedFiling.serviceTitle}
                </p>
              </div>

              {/* Progress Tracker */}
              <div className="flex flex-col items-center gap-1">
                <ComplianceProgressChart percentage={selectedFiling.progressPercentage} />
                <span className="text-[10px] text-slate-400 font-bold uppercase">FY Progress</span>
              </div>

              <div className="flex flex-col items-start sm:items-end space-y-2">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border ${
                    selectedFiling.overallStatus === 'Completed'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : selectedFiling.overallStatus === 'Action Required'
                      ? 'bg-red-500/20 text-red-300 border-red-500/40'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}
                >
                  {selectedFiling.overallStatus}
                </span>

                <div className="text-[11px] text-slate-400 font-mono">
                  Submitted: {selectedFiling.submissionDate}
                </div>
              </div>
            </div>

            {/* Action Required Banner (If applicable) */}
            {selectedFiling.overallStatus === 'Action Required' && (
              <div className="bg-red-950/80 border border-red-800 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fadeIn">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-red-200 uppercase">Action Needed to Proceed with RJSC Filing</h4>
                    <p className="text-xs text-slate-300">
                      Please upload the missing signed Director Consent Form IX to avoid statutory delay penalties.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowUploadModal(true)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Document</span>
                </button>
              </div>
            )}

            {/* Visual Compliance Progress Bar Stepper */}
            <ComplianceStageProgressBar
              filing={selectedFiling}
              onUploadClick={() => setShowUploadModal(true)}
              onPreviewDocument={(docData) => handleOpenDocumentPreview(docData)}
            />

            {/* Visual Step-by-Step Timeline Tracker */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>RJSC Statutory Milestone Timeline</span>
                </h4>
                <span className="text-xs text-slate-400 font-mono">Est. Completion: {selectedFiling.estimatedCompletion}</span>
              </div>

              <div className="space-y-4 relative pl-4 border-l-2 border-slate-800 ml-2">
                {selectedFiling.steps.map((step, idx) => {
                  const isCompleted = step.status === 'completed';
                  const isCurrent = step.status === 'current';

                  return (
                    <div key={idx} className="relative pl-6 space-y-1">
                      {/* Step Circle Pin */}
                      <div
                        className={`absolute -left-[23px] top-0 w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                          isCompleted
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                            : isCurrent
                            ? 'bg-amber-500 text-slate-950 border-amber-300 animate-pulse'
                            : 'bg-slate-950 text-slate-600 border-slate-800'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <span className="text-[10px] font-bold">{idx + 1}</span>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h5
                          className={`text-sm font-bold font-serif ${
                            isCompleted
                              ? 'text-white'
                              : isCurrent
                              ? 'text-amber-300'
                              : 'text-slate-500'
                          }`}
                        >
                          {step.title}
                        </h5>

                        <div className="flex items-center gap-2">
                          {step.date && (
                            <span className="text-[10px] text-slate-400 font-mono">{step.date}</span>
                          )}

                          <button
                            type="button"
                            onClick={() =>
                              handleOpenDocumentPreview({
                                documentTitle: `${step.title.replace(/\s+/g, '_')}.pdf`,
                                formType: getFormTypeFromService(selectedFiling.serviceTitle, step.title),
                                companyName: selectedFiling.companyName,
                                registrationNumber: selectedFiling.registrationNumber,
                                trackingId: selectedFiling.trackingId,
                                filingDate: step.date || selectedFiling.submissionDate,
                                assignedAdvocate: selectedFiling.assignedAdvocate,
                                stageName: selectedFiling.currentStage
                              })
                            }
                            className="text-[10px] bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-800 hover:border-amber-500/40 px-2 py-0.5 rounded font-mono font-semibold flex items-center gap-1 transition-all"
                            title="Preview simulated statutory document for this milestone step"
                          >
                            <Eye className="w-3 h-3 text-amber-400" />
                            <span>Preview</span>
                          </button>
                        </div>
                      </div>

                      {step.notes && (
                        <p className="text-xs text-slate-400 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                          {step.notes}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Secure Client Document Vault & Direct Upload Zone */}
            <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold shrink-0">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                        Client Document Storage Vault
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono hidden sm:inline-flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        Advocate Review Pipeline
                      </span>
                    </div>
                    <h4 className="text-sm font-bold font-serif text-white">
                      Secure Corporate Document Uploads ({currentVaultDocs.length})
                    </h4>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowUploadModal(true)}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-md flex items-center gap-1.5"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload / Snap Photo</span>
                </button>
              </div>

              {/* Uploaded Files Table */}
              {currentVaultDocs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentVaultDocs.map((doc) => (
                    <div
                      key={doc.id}
                      className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl flex items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-3 truncate">
                        <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 text-amber-400 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="truncate space-y-0.5">
                          <h5 className="text-xs font-semibold text-white truncate font-serif">{doc.fileName}</h5>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                            <span className="text-amber-300">{doc.docCategory}</span>
                            <span>•</span>
                            <span>{doc.uploadedAt}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() =>
                            handleOpenDocumentPreview({
                              documentTitle: doc.fileName,
                              formType: getFormTypeFromService(selectedFiling.serviceTitle, doc.fileName),
                              companyName: selectedFiling.companyName,
                              registrationNumber: selectedFiling.registrationNumber,
                              trackingId: selectedFiling.trackingId,
                              filingDate: doc.uploadedAt,
                              assignedAdvocate: selectedFiling.assignedAdvocate,
                              stageName: selectedFiling.currentStage
                            })
                          }
                          className="p-1.5 text-amber-400 hover:text-amber-300 bg-slate-950 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
                          title="Preview Document"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-6 bg-slate-900/50 border border-slate-800/80 rounded-2xl space-y-2">
                  <p className="text-xs text-slate-400">
                    No manual documents uploaded yet for <strong className="text-white">{selectedFiling.companyName}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(true)}
                    className="text-xs text-amber-400 font-bold hover:underline"
                  >
                    + Click here to drag & drop or take a photo of your Trade License / NID
                  </button>
                </div>
              )}

              {/* Imported Google Drive Vault Documents Section */}
              {importedDriveVaultDocs.length > 0 && (
                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Google Drive Vault Imports ({importedDriveVaultDocs.length})
                      </span>
                    </div>
                    <a
                      href="#google-workspace"
                      className="text-[11px] text-emerald-400 hover:underline font-semibold flex items-center gap-1"
                    >
                      <span>Manage Drive Hub</span>
                      <ChevronRight className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {importedDriveVaultDocs.map((gDoc: any) => (
                      <div
                        key={gDoc.id}
                        className="bg-emerald-950/20 border border-emerald-800/60 p-3.5 rounded-2xl flex items-center justify-between gap-3 hover:border-emerald-600/80 transition-colors"
                      >
                        <div className="flex items-center gap-3 truncate">
                          <div className="w-9 h-9 rounded-xl bg-emerald-900/40 border border-emerald-700/50 text-emerald-300 flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="truncate space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <h5 className="text-xs font-semibold text-white truncate font-serif">{gDoc.fileName}</h5>
                              <span className="bg-emerald-500/30 text-emerald-300 text-[9px] font-bold px-1.5 py-0.2 rounded shrink-0">
                                Drive
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                              <span className="text-emerald-300">{gDoc.docCategory}</span>
                              <span>•</span>
                              <span>{gDoc.uploadedAt}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {gDoc.webViewLink && gDoc.webViewLink !== '#' && (
                            <a
                              href={gDoc.webViewLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 text-emerald-400 hover:text-emerald-200 bg-slate-900 hover:bg-slate-800 rounded-lg border border-emerald-800/80 transition-colors"
                              title="Open in Google Drive"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                          <button
                            type="button"
                            onClick={() =>
                              handleOpenDocumentPreview({
                                documentTitle: gDoc.fileName,
                                formType: getFormTypeFromService(selectedFiling.serviceTitle, gDoc.fileName),
                                companyName: selectedFiling.companyName,
                                registrationNumber: selectedFiling.registrationNumber,
                                trackingId: selectedFiling.trackingId,
                                filingDate: gDoc.uploadedAt,
                                assignedAdvocate: selectedFiling.assignedAdvocate,
                                stageName: selectedFiling.currentStage
                              })
                            }
                            className="p-1.5 text-amber-400 hover:text-amber-300 bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
                            title="Preview Document"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Assigned Advocate & Deliverables Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              
              {/* Advocate Card */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block font-mono">
                  Assigned Senior Corporate Advocate
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <h5 className="text-xs font-bold text-white">{selectedFiling.assignedAdvocate}</h5>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-amber-400 inline" />
                      {selectedFiling.advocatePhone}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onOpenConsultationWithTopic?.(`Direct follow-up with Advocate regarding ${selectedFiling.trackingId}`)}
                  className="w-full mt-2 bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-700 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call / Contact Advocate</span>
                </button>
              </div>

              {/* Statutory Deliverables Card */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block font-mono">
                  Downloadable Certified Forms & Drafts
                </span>

                {selectedFiling.deliverables && selectedFiling.deliverables.length > 0 ? (
                  <div className="space-y-2">
                    {selectedFiling.deliverables.map((del, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs bg-slate-900 p-2 rounded-xl border border-slate-800 gap-2">
                        <span className="text-slate-300 font-mono truncate text-[11px]">{del.name}</span>
                        
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() =>
                              handleOpenDocumentPreview({
                                documentTitle: del.name,
                                formType: getFormTypeFromService(selectedFiling.serviceTitle, del.name),
                                companyName: selectedFiling.companyName,
                                registrationNumber: selectedFiling.registrationNumber,
                                trackingId: selectedFiling.trackingId,
                                filingDate: selectedFiling.submissionDate,
                                assignedAdvocate: selectedFiling.assignedAdvocate,
                                stageName: selectedFiling.currentStage
                              })
                            }
                            className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 text-[11px] bg-slate-950 hover:bg-slate-800 px-2 py-1 rounded border border-slate-800"
                            title="Preview PDF Document"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Preview</span>
                          </button>

                          <a
                            href={`#download-${idx}`}
                            onClick={(e) => {
                              e.preventDefault();
                              setUploadSuccessMessage(`Downloading ${del.name}...`);
                              setTimeout(() => setUploadSuccessMessage(null), 3000);
                            }}
                            className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 text-[11px] bg-slate-950 hover:bg-slate-800 px-2 py-1 rounded border border-slate-800"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic py-2">
                    Certified copies will be available for instant download once RJSC finishes processing.
                  </p>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* DOCUMENT PREVIEW MODAL */}
      <DocumentPreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        docData={previewDocData}
        onDownload={(docTitle) => {
          setUploadSuccessMessage(`Downloading ${docTitle}...`);
          setTimeout(() => setUploadSuccessMessage(null), 3000);
        }}
      />

      {/* SECURE DOCUMENT UPLOAD MODAL */}
      <SecureDocumentUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        companyName={selectedFiling.companyName}
        trackingId={selectedFiling.trackingId}
        existingDocs={currentVaultDocs}
        onDocumentUploaded={(newDoc) => handleDocumentUploaded(newDoc)}
      />

    </section>
  );
};
