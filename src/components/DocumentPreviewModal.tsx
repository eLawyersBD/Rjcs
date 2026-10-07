import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  Printer,
  ZoomIn,
  ZoomOut,
  ShieldCheck,
  QrCode,
  FileText,
  Building2,
  CheckCircle2,
  Award,
  Sparkles,
  Maximize2,
  Minimize2,
  Lock,
  ExternalLink
} from 'lucide-react';

export interface PreviewDocData {
  documentTitle: string;
  formType: 'Form XV' | 'Form VIII' | 'Form XII' | 'Form IX' | 'Board Resolution' | 'MOA & AOA' | 'Challan';
  companyName: string;
  registrationNumber: string;
  trackingId: string;
  filingDate: string;
  assignedAdvocate: string;
  stageName?: string;
}

interface DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  docData: PreviewDocData | null;
  onDownload?: (docTitle: string) => void;
}

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  isOpen,
  onClose,
  docData,
  onDownload
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [activePage, setActivePage] = useState<number>(1);
  const [isFullWidth, setIsFullWidth] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !docData) return null;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 15, 150));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 15, 75));

  const handleSimulatedDownload = () => {
    if (onDownload) {
      onDownload(docData.documentTitle);
    }
    setDownloadSuccess(`Downloading "${docData.documentTitle}" with RJSC verification signature...`);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className={`bg-slate-900 border border-slate-700 rounded-3xl w-full text-white shadow-2xl flex flex-col max-h-[95vh] transition-all duration-300 ${isFullWidth ? 'max-w-6xl' : 'max-w-4xl'}`}>
        
        {/* PDF Viewer Top Action Header */}
        <div className="bg-slate-950 p-4 border-b border-slate-800 rounded-t-3xl flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold shrink-0">
              <FileText className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                  {docData.formType} Statutory Preview
                </span>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Verified RJSC Copy
                </span>
              </div>
              <h3 className="text-sm font-bold font-serif text-white truncate max-w-[280px] sm:max-w-[400px]">
                {docData.documentTitle}
              </h3>
            </div>
          </div>

          {/* Controls toolbar */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
              <button
                type="button"
                onClick={handleZoomOut}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="px-2 font-mono text-[11px] text-amber-300 font-bold">{zoomLevel}%</span>
              <button
                type="button"
                onClick={handleZoomIn}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Toggle Expand View */}
            <button
              type="button"
              onClick={() => setIsFullWidth(!isFullWidth)}
              className="hidden sm:flex p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors"
              title={isFullWidth ? 'Standard View' : 'Full Width View'}
            >
              {isFullWidth ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Print Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="p-2 text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors"
              title="Print Statutory Document"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Download Button */}
            <button
              type="button"
              onClick={handleSimulatedDownload}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-2 rounded-xl text-xs transition-all shadow-md flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download PDF</span>
            </button>

            {/* Close Modal */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {downloadSuccess && (
          <div className="bg-emerald-950 border-b border-emerald-500/40 px-4 py-2 text-xs text-emerald-300 font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{downloadSuccess}</span>
          </div>
        )}

        {/* PDF Simulated Document Canvas Area */}
        <div className="p-4 sm:p-8 overflow-y-auto flex-1 bg-slate-950/80 flex justify-center items-start scrollbar-thin scrollbar-thumb-slate-800">
          
          <div
            className="bg-white text-slate-900 rounded-lg p-6 sm:p-10 shadow-2xl border border-slate-300 max-w-2xl w-full relative transition-transform duration-200 font-serif"
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          >
            {/* Background Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] rotate-[-30deg] select-none text-slate-900 text-3xl font-black font-sans uppercase tracking-widest text-center px-6">
              Registrar of Joint Stock Companies & Firms • People's Republic of Bangladesh
            </div>

            {/* Document Header Section */}
            <div className="border-b-2 border-slate-900 pb-4 mb-6 relative">
              <div className="flex items-start justify-between gap-4">
                
                {/* Official National Emblem Badge */}
                <div className="text-center space-y-1">
                  <div className="w-12 h-12 rounded-full bg-emerald-800 text-amber-300 font-bold text-xs flex items-center justify-center mx-auto shadow border border-emerald-600">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="text-[9px] font-sans font-bold text-slate-700 uppercase tracking-widest block">
                    Govt. Seal
                  </span>
                </div>

                {/* Main Heading Text */}
                <div className="text-center space-y-1 flex-1">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-slate-800 font-sans">
                    Government of the People's Republic of Bangladesh
                  </h4>
                  <h2 className="text-sm sm:text-base font-extrabold text-slate-900 uppercase">
                    Office of the Registrar of Joint Stock Companies & Firms
                  </h2>
                  <p className="text-[10px] font-sans text-slate-600 font-semibold">
                    1 SEC Bhaban, Plot E-6/A, Agargaon Administrative Area, Sher-e-Bangla Nagar, Dhaka-1207
                  </p>
                </div>

                {/* Verification Barcode & QR Code */}
                <div className="text-center space-y-1 shrink-0">
                  <div className="w-14 h-14 bg-slate-100 border border-slate-300 rounded p-1 flex items-center justify-center mx-auto">
                    <QrCode className="w-12 h-12 text-slate-900" />
                  </div>
                  <span className="text-[8px] font-mono font-bold text-slate-600 block">
                    Verify: {docData.trackingId}
                  </span>
                </div>

              </div>

              {/* Form Title Banner */}
              <div className="mt-4 pt-3 border-t border-slate-300 text-center">
                <span className="inline-block bg-slate-900 text-amber-300 text-xs font-mono font-bold px-3 py-1 rounded tracking-wide uppercase">
                  {docData.formType} — Statutory Corporate Filing
                </span>
                <p className="text-[11px] font-sans font-semibold text-slate-700 mt-1">
                  Under Section 151 / 228 of the Companies Act, 1994 (Act No. XVIII of 1994)
                </p>
              </div>
            </div>

            {/* Document Body Form Sections */}
            <div className="space-y-5 text-xs text-slate-800 leading-relaxed font-serif">
              
              {/* Reference & Date Table */}
              <div className="bg-slate-50 border border-slate-300 p-3.5 rounded font-sans grid grid-cols-2 gap-3 text-[11px]">
                <div>
                  <span className="text-slate-500 block text-[10px]">Company Name:</span>
                  <strong className="text-slate-900 font-serif">{docData.companyName}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Registration / C-Number:</span>
                  <strong className="text-slate-900 font-mono">{docData.registrationNumber}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">RJSC Portal Tracking Ref:</span>
                  <strong className="text-slate-900 font-mono">{docData.trackingId}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Date of Statutory Verification:</span>
                  <strong className="text-slate-900 font-mono">{docData.filingDate}</strong>
                </div>
              </div>

              {/* Dynamic Form Content Text based on Form Type */}
              {docData.formType === 'Form XV' && (
                <div className="space-y-3">
                  <p className="font-bold text-slate-900 underline">
                    SUBJECT: RETURN OF ALLOTMENT OF SHARES & AUTHORIZED CAPITAL INCREASE
                  </p>
                  <p>
                    Notice is hereby given that at an Extraordinary General Meeting (EGM) of <strong>{docData.companyName}</strong> held on {docData.filingDate}, the authorized capital of the company was increased from ৳10,000,000 to ৳50,000,000 by creation of 400,000 new Ordinary Shares of ৳100 each.
                  </p>
                  <div className="border border-slate-300 p-3 rounded bg-white text-[10px] font-mono space-y-1">
                    <p>• Nominal Value per Share: ৳ 100.00</p>
                    <p>• Total New Shares Issued: 400,000 Ordinary Shares</p>
                    <p>• Government Treasury Challan Paid: ৳ 45,000 (Sonali Bank Govt Code: 1-2211-0000-1816)</p>
                  </div>
                </div>
              )}

              {docData.formType === 'Form VIII' && (
                <div className="space-y-3">
                  <p className="font-bold text-slate-900 underline">
                    SUBJECT: ANNUAL RETURN OF COMPANY HAVING A SHARE CAPITAL (SCHEDULE X)
                  </p>
                  <p>
                    Annual return made up to the date of the Annual General Meeting (AGM) for the period ending 2026. ICAB Document Verification System (DVS) Code: <strong>DVS-2026-88192-04</strong> attached herewith.
                  </p>
                  <div className="border border-slate-300 p-3 rounded bg-white text-[10px] font-mono space-y-1">
                    <p>• Total Number of Shares Taken: 500,000</p>
                    <p>• Total Amount Paid on Shares: ৳ 50,000,000</p>
                    <p>• Total Indebtedness of Company: Nil</p>
                  </div>
                </div>
              )}

              {docData.formType === 'Form XII' && (
                <div className="space-y-3">
                  <p className="font-bold text-slate-900 underline">
                    SUBJECT: PARTICULARS OF DIRECTORS, MANAGING AGENTS AND MANAGERS
                  </p>
                  <p>
                    Notice of change in the Board of Directors of <strong>{docData.companyName}</strong> pursuant to Section 115. Appointment of incoming Foreign Director verified by BIDA FDI remittance certificate.
                  </p>
                </div>
              )}

              {docData.formType === 'Board Resolution' && (
                <div className="space-y-3">
                  <p className="font-bold text-slate-900 underline">
                    EXTRACT OF SPECIAL RESOLUTION PASSED AT THE BOARD OF DIRECTORS MEETING
                  </p>
                  <p>
                    "RESOLVED UNANIMOUSLY that <strong>E-Lawyers Corporate Legal Consultants</strong> and Supreme Court Advocates be and are hereby authorized to sign, submit and file all necessary statutory forms with the Registrar of Joint Stock Companies & Firms."
                  </p>
                </div>
              )}

              {docData.formType !== 'Form XV' && docData.formType !== 'Form VIII' && docData.formType !== 'Form XII' && docData.formType !== 'Board Resolution' && (
                <div className="space-y-3">
                  <p className="font-bold text-slate-900 underline">
                    STATUTORY COMPLIANCE ACKNOWLEDGEMENT & CERTIFIED COPY
                  </p>
                  <p>
                    This official certificate confirms that the statutory documentation for <strong>{docData.companyName}</strong> has been duly accepted and recorded in the Register maintained under the Companies Act 1994.
                  </p>
                </div>
              )}

              {/* Signature & Seal Block */}
              <div className="pt-8 mt-6 border-t border-slate-300 font-sans grid grid-cols-2 gap-6">
                
                {/* Director / Advocate Signature */}
                <div className="space-y-1">
                  <div className="h-10 flex items-end">
                    <span className="font-serif italic text-slate-700 text-sm font-bold border-b border-slate-400 pb-1 px-2">
                      M. A. Hoque / {docData.assignedAdvocate}
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-800 uppercase">
                    Authorized Director / Supreme Court Advocate
                  </p>
                  <p className="text-[9px] text-slate-500 font-mono">
                    Digital DSC Certificate Key: #8820-2026-BD
                  </p>
                </div>

                {/* Registrar Stamp Seal */}
                <div className="space-y-1 text-right">
                  <div className="w-20 h-20 border-2 border-emerald-800 rounded-full flex flex-col items-center justify-center ml-auto text-emerald-900 font-bold p-1 bg-emerald-50/50 rotate-[-12deg] shadow-sm">
                    <ShieldCheck className="w-6 h-6 text-emerald-800" />
                    <span className="text-[7px] uppercase tracking-tighter text-center leading-none mt-0.5">
                      RJSC Approved & Recorded
                    </span>
                  </div>
                  <p className="text-[9px] font-mono text-slate-600 font-bold">
                    Registrar of Joint Stock Companies
                  </p>
                </div>

              </div>

            </div>

            {/* Document Footer Bar */}
            <div className="mt-8 pt-3 border-t border-slate-300 flex items-center justify-between text-[9px] font-mono text-slate-500">
              <span>Page 1 of 2 • Official RJSC Statutory Record</span>
              <span>Doc Ref: {docData.trackingId}-PDF</span>
            </div>

          </div>

        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 rounded-b-3xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>256-Bit SSL Encrypted Preview. Official Government Format.</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePrint}
              className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print PDF</span>
            </button>

            <button
              type="button"
              onClick={handleSimulatedDownload}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Official PDF</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
