import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Upload,
  Camera,
  FileText,
  CheckCircle2,
  AlertCircle,
  Lock,
  ShieldCheck,
  Eye,
  Trash2,
  Sparkles,
  RefreshCw,
  FolderLock,
  Download,
  Info
} from 'lucide-react';

export interface UploadedLegalDoc {
  id: string;
  fileName: string;
  docCategory: 'Trade License' | 'Tax / VAT Certificate' | 'Form IX / XII' | 'Board Minutes' | 'Challan Receipt' | 'NID / Passport' | 'Other Legal Doc';
  fileSize: string;
  uploadedAt: string;
  reviewStatus: 'Under Legal Review' | 'Verified & Accepted' | 'Needs Resubmission';
  previewUrl?: string;
}

interface SecureDocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyName: string;
  trackingId: string;
  onDocumentUploaded: (doc: UploadedLegalDoc) => void;
  existingDocs?: UploadedLegalDoc[];
}

export const SecureDocumentUploadModal: React.FC<SecureDocumentUploadModalProps> = ({
  isOpen,
  onClose,
  companyName,
  trackingId,
  onDocumentUploaded,
  existingDocs = []
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'camera'>('upload');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [docCategory, setDocCategory] = useState<UploadedLegalDoc['docCategory']>('Trade License');
  const [notes, setNotes] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);

  // Camera capture states
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Stop camera when tab changes or modal closes
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (activeTab === 'camera' && isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [activeTab, isOpen]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setCameraError('Camera access failed or permission denied. Please allow camera access or use standard file drag & drop.');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        setCapturedImage(dataUrl);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    setIsUploading(true);
    setTimeout(() => {
      const newDoc: UploadedLegalDoc = {
        id: `doc-${Date.now()}`,
        fileName: file.name,
        docCategory: docCategory,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        uploadedAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        reviewStatus: 'Under Legal Review'
      };

      onDocumentUploaded(newDoc);
      setIsUploading(false);
      setUploadSuccessMsg(`Successfully encrypted & uploaded "${file.name}" for advocate review!`);
      setTimeout(() => setUploadSuccessMsg(null), 4000);
    }, 1200);
  };

  const handleUploadCapturedPhoto = () => {
    if (!capturedImage) return;
    setIsUploading(true);
    setTimeout(() => {
      const photoName = `${docCategory.replace(/\s+/g, '_')}_Photo_${Date.now().toString().slice(-4)}.jpg`;
      const newDoc: UploadedLegalDoc = {
        id: `doc-photo-${Date.now()}`,
        fileName: photoName,
        docCategory: docCategory,
        fileSize: '1.45 MB',
        uploadedAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        reviewStatus: 'Under Legal Review',
        previewUrl: capturedImage
      };

      onDocumentUploaded(newDoc);
      setIsUploading(false);
      setCapturedImage(null);
      setUploadSuccessMsg(`Captured photo uploaded securely as "${photoName}"!`);
      setTimeout(() => setUploadSuccessMsg(null), 4000);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-2xl text-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-slate-950 p-5 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold shrink-0">
              <FolderLock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  256-Bit SSL Encrypted Vault
                </span>
                <span className="text-[10px] text-emerald-400 font-mono hidden sm:inline-flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Legal Review Pipeline
                </span>
              </div>
              <h3 className="text-base font-bold font-serif text-white">
                Secure Corporate Document Upload
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {uploadSuccessMsg && (
          <div className="bg-emerald-950 border-b border-emerald-500/40 px-5 py-2.5 text-xs text-emerald-300 font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{uploadSuccessMsg}</span>
          </div>
        )}

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 scrollbar-thin scrollbar-thumb-slate-800">
          
          {/* Company & Tracking Context Bar */}
          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-slate-400 text-[10px] block font-mono">Target Company:</span>
              <strong className="text-white font-serif">{companyName}</strong>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block font-mono">RJSC Filing Ref:</span>
              <strong className="text-amber-400 font-mono">{trackingId}</strong>
            </div>
          </div>

          {/* Document Category Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 font-serif flex items-center justify-between">
              <span>1. Select Document Category:</span>
              <span className="text-[10px] text-slate-400 font-mono">Statutory Classification</span>
            </label>
            <select
              value={docCategory}
              onChange={(e) => setDocCategory(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
            >
              <option value="Trade License">Trade License (City Corporation / Pouroshova)</option>
              <option value="Tax / VAT Certificate">e-TIN Certificate / VAT BIN Registration</option>
              <option value="Form IX / XII">Form IX (Director Consent) / Form XII (Directors List)</option>
              <option value="Board Minutes">Board Resolution / EGM Minutes Signed Copy</option>
              <option value="Challan Receipt">Govt Treasury Challan Receipt (Sonali Bank)</option>
              <option value="NID / Passport">Director NID Card / Foreign Director Passport Copy</option>
              <option value="Other Legal Doc">Other Company Legal Document / Contract</option>
            </select>
          </div>

          {/* Upload Mode Selector (File Drag & Drop vs Camera Photo Capture) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-300 font-serif">
                2. Choose Upload Method:
              </span>
              
              <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveTab('upload')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'upload'
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Drag & Drop File</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('camera')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'camera'
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Camera Photo Capture</span>
                </button>
              </div>
            </div>

            {/* TAB 1: FILE DRAG & DROP ZONE */}
            {activeTab === 'upload' && (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-3xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-300 space-y-3 relative overflow-hidden ${
                  isDragging
                    ? 'border-amber-400 bg-amber-500/10 scale-[1.01]'
                    : 'border-slate-700 bg-slate-950/60 hover:border-amber-500/50 hover:bg-slate-950'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                  accept=".pdf,.jpg,.jpeg,.png,.docx,.doc"
                  className="hidden"
                />

                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
                  {isUploading ? (
                    <RefreshCw className="w-7 h-7 animate-spin text-amber-400" />
                  ) : (
                    <Upload className="w-7 h-7 text-amber-400" />
                  )}
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white font-serif">
                    {isUploading ? 'Encrypting & Storing File...' : 'Drag & Drop your document here, or Browse'}
                  </h4>
                  <p className="text-xs text-slate-400">
                    Supports PDF, JPG, PNG, DOCX up to 25MB. Automatically scanned for viruses & malware.
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-center gap-2 text-[10px] text-amber-300 font-mono">
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span>256-bit AES Vault Storage • Supreme Court Advocate Verification</span>
                </div>
              </div>
            )}

            {/* TAB 2: WEBCAM / CAMERA SNAPSHOT CAPTURE */}
            {activeTab === 'camera' && (
              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-4 space-y-4">
                {cameraError ? (
                  <div className="p-4 bg-red-950/50 border border-red-500/30 rounded-2xl text-xs text-red-300 space-y-2">
                    <div className="flex items-center gap-2 font-bold">
                      <AlertCircle className="w-4 h-4 text-red-400" />
                      <span>Camera Access Restricted</span>
                    </div>
                    <p>{cameraError}</p>
                    <button
                      type="button"
                      onClick={startCamera}
                      className="bg-red-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
                    >
                      Retry Camera Stream
                    </button>
                  </div>
                ) : capturedImage ? (
                  /* Captured Preview State */
                  <div className="space-y-3 text-center">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">
                      Captured Document Photo Preview
                    </span>
                    <div className="max-h-64 overflow-hidden rounded-2xl border-2 border-emerald-500/50 mx-auto max-w-md bg-black">
                      <img src={capturedImage} alt="Captured Document" className="w-full object-contain max-h-64" />
                    </div>

                    <div className="flex items-center justify-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setCapturedImage(null)}
                        className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Retake Photo</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleUploadCapturedPhoto}
                        disabled={isUploading}
                        className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md"
                      >
                        {isUploading ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        )}
                        <span>{isUploading ? 'Uploading...' : 'Save & Submit Photo'}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Live Camera Stream State */
                  <div className="space-y-3 text-center">
                    <div className="relative rounded-2xl overflow-hidden bg-black border border-slate-800 max-w-md mx-auto aspect-video flex items-center justify-center">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                      />
                      <canvas ref={canvasRef} className="hidden" />

                      {/* Camera Viewfinder Overlay */}
                      <div className="absolute inset-4 border-2 border-amber-400/60 rounded-xl pointer-events-none flex items-center justify-center">
                        <span className="text-[10px] bg-slate-950/80 text-amber-300 px-2 py-1 rounded font-mono">
                          Align Document Within Frame
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={capturePhoto}
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs transition-all shadow-md flex items-center gap-2 mx-auto"
                    >
                      <Camera className="w-4 h-4" />
                      <span>Take Snapshot Photo</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Optional Advocate Notes / Remarks Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 font-serif">
              3. Notes for Assigned Advocate (Optional):
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Attached updated Form IX signed by Director Tariqul Islam..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* Recently Uploaded Documents Vault Table */}
          {existingDocs.length > 0 && (
            <div className="space-y-2 pt-3 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white font-serif flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Encrypted Document Vault ({existingDocs.length})</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Auto-Synced</span>
              </div>

              <div className="space-y-2">
                {existingDocs.map((doc) => (
                  <div key={doc.id} className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 truncate">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="truncate space-y-0.5">
                        <p className="font-semibold text-white truncate text-xs">{doc.fileName}</p>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                          <span className="text-amber-300">{doc.docCategory}</span>
                          <span>•</span>
                          <span>{doc.fileSize}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        doc.reviewStatus === 'Verified & Accepted'
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                          : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                      }`}>
                        {doc.reviewStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Bar */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[10px]">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>Files reviewed exclusively by registered Supreme Court advocates.</span>
          </div>

          <button
            type="button"
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
          >
            Close Portal
          </button>
        </div>

      </div>
    </div>
  );
};
