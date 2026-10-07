import React, { useState, useEffect } from 'react';
import {
  Lock,
  Mail,
  KeyRound,
  Building2,
  UserCheck,
  ShieldCheck,
  LogOut,
  X,
  CheckCircle2,
  FileText,
  Download,
  Upload,
  AlertCircle,
  ExternalLink,
  Sparkles,
  RefreshCw,
  Phone,
  Eye,
  EyeOff,
  FolderLock
} from 'lucide-react';

export interface UserSession {
  uid: string;
  email: string;
  displayName: string;
  companyName: string;
  registrationNumber: string;
  role: string;
  authProvider: 'firebase_email' | 'firebase_google' | 'firebase_phone';
  token: string;
}

interface ClientAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserSession | null;
  onLogin: (user: UserSession) => void;
  onLogout: () => void;
  onNavigateToTracker?: () => void;
}

export const ClientAuthModal: React.FC<ClientAuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
  onNavigateToTracker
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState<string>('corporate@aethertech.com.bd');
  const [password, setPassword] = useState<string>('••••••••••••');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<string>('AetherTech Solutions Ltd.');
  const [regNumber, setRegNumber] = useState<string>('C-184920/2023');
  const [loading, setLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  // Private Documents Vault State (Simulated Firebase Storage)
  const [userVaultDocs, setUserVaultDocs] = useState([
    { id: 'v1', name: 'Certified_Form_XII_Director_Change_2026.pdf', date: 'July 28, 2026', size: '2.4 MB', type: 'RJSC Certified' },
    { id: 'v2', name: 'AetherTech_MOA_AOA_Stamped_Original.pdf', date: 'March 14, 2024', size: '5.1 MB', type: 'Constitutional' },
    { id: 'v3', name: 'ICAB_DVS_Audited_Financial_Return_2025.pdf', date: 'June 30, 2025', size: '3.8 MB', type: 'NBR & FRC Tax' },
    { id: 'v4', name: 'Managing_Director_Digital_Signature_Key.dsc', date: 'July 10, 2026', size: '120 KB', type: 'Security DSC' }
  ]);
  const [newDocName, setNewDocName] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSimulatedLogin = (provider: 'firebase_email' | 'firebase_google' | 'firebase_phone') => {
    setLoading(true);
    setAuthError(null);

    setTimeout(() => {
      setLoading(false);
      const simulatedUser: UserSession = {
        uid: `fb-${Date.now()}`,
        email: provider === 'firebase_google' ? 'managing.director@aethertech.com.bd' : email,
        displayName: 'M. A. Hoque (Managing Director)',
        companyName: companyName || 'AetherTech Solutions Ltd.',
        registrationNumber: regNumber || 'C-184920/2023',
        role: 'Verified Corporate Director',
        authProvider: provider,
        token: `eyJhbGciOiJSUzI1NiIsImtpZCI6ImZpcmViYXNlLTIwMjYifQ.eyJ1aWQiOiJmYi0yMDI2OCIsInNjb3BlIjoicHJpdmF0ZV92YXVsdCJ9.simulated_signature`
      };

      onLogin(simulatedUser);
      setAuthSuccess(`Firebase Authentication successful! Access granted to ${simulatedUser.companyName} Private Vault.`);
      setTimeout(() => setAuthSuccess(null), 3500);
    }, 900);
  };

  const handleSimulatedRegister = (e: React.FormEvent) => {
    e.preventDefault();
    handleSimulatedLogin('firebase_email');
  };

  const handleUploadVaultDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName.trim()) return;

    setUserVaultDocs([
      {
        id: `v-${Date.now()}`,
        name: newDocName.endsWith('.pdf') ? newDocName : `${newDocName}.pdf`,
        date: 'Just Now',
        size: '1.8 MB',
        type: 'Encrypted Vault Upload'
      },
      ...userVaultDocs
    ]);
    setNewDocName('');
    setAuthSuccess('Document uploaded to Firebase Encrypted Storage!');
    setTimeout(() => setAuthSuccess(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-white shadow-2xl relative space-y-6 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center font-bold shadow-lg shrink-0">
            <Lock className="w-6 h-6 text-slate-950" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full">
                Firebase Authentication v11.0
              </span>
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                256-Bit SSL Encrypted
              </span>
            </div>
            <h3 className="text-xl font-bold font-serif text-white">
              Client Portal & Document Vault
            </h3>
          </div>
        </div>

        {/* Status Banners */}
        {authSuccess && (
          <div className="bg-emerald-950/80 border border-emerald-500/50 p-4 rounded-2xl text-xs text-emerald-300 font-semibold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{authSuccess}</span>
          </div>
        )}

        {authError && (
          <div className="bg-red-950/80 border border-red-500/50 p-4 rounded-2xl text-xs text-red-300 font-semibold flex items-center gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        {/* VIEW 1: AUTHENTICATED USER PRIVATE VAULT ACCESS */}
        {currentUser ? (
          <div className="space-y-6">
            
            {/* User Profile Card */}
            <div className="bg-slate-950 border border-amber-500/40 p-5 rounded-2xl space-y-3 relative overflow-hidden shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-amber-400" />
                    <h4 className="text-sm font-bold text-white font-serif">{currentUser.displayName}</h4>
                  </div>
                  <p className="text-xs text-amber-300 font-medium">{currentUser.companyName}</p>
                  <p className="text-[11px] text-slate-400 font-mono">Reg No: {currentUser.registrationNumber} • {currentUser.email}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (onNavigateToTracker) onNavigateToTracker();
                    }}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs shadow-md transition-all"
                  >
                    View Live Filings
                  </button>

                  <button
                    type="button"
                    onClick={onLogout}
                    className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1"
                  >
                    <LogOut className="w-3.5 h-3.5 text-red-400" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>Auth Provider: Firebase ({currentUser.authProvider})</span>
                <span className="truncate max-w-[200px]">Token: {currentUser.token.substring(0, 24)}...</span>
              </div>
            </div>

            {/* Private Document Storage Vault */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-2">
                  <FolderLock className="w-4 h-4" />
                  <span>Private Firebase Document Storage Vault</span>
                </h4>
                <span className="text-[10px] text-slate-400 font-mono">
                  {userVaultDocs.length} Encrypted Files
                </span>
              </div>

              {/* Upload Document Form */}
              <form onSubmit={handleUploadVaultDoc} className="flex items-center gap-2">
                <input
                  type="text"
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  placeholder="Upload new document title (e.g. Board_Resolution_Aug_2026)..."
                  className="bg-slate-950 border border-slate-800 text-xs text-white rounded-xl px-3.5 py-2.5 flex-1 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload PDF</span>
                </button>
              </form>

              {/* File List */}
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
                {userVaultDocs.map((file) => (
                  <div
                    key={file.id}
                    className="bg-slate-950 border border-slate-800 p-3 rounded-2xl flex items-center justify-between gap-3 text-xs hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                      <div className="truncate">
                        <p className="font-semibold text-white truncate text-xs">{file.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{file.type} • {file.date} ({file.size})</p>
                      </div>
                    </div>

                    <a
                      href={`#download-${file.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setAuthSuccess(`Downloading ${file.name} from Firebase Storage...`);
                        setTimeout(() => setAuthSuccess(null), 3000);
                      }}
                      className="bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 shrink-0"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          /* VIEW 2: LOGIN / REGISTER MODAL FORM */
          <div className="space-y-6">
            
            {/* Tabs Header */}
            <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  authMode === 'login'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In to Corporate Vault
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  authMode === 'register'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Register New Client Entity
              </button>
            </div>

            {/* Quick SSO Provider Buttons */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
                Fast Authentication via Firebase Auth SDK:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSimulatedLogin('firebase_google')}
                  disabled={loading}
                  className="bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-white p-3 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2.5 transition-all shadow-md"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Google Corporate SSO</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSimulatedLogin('firebase_phone')}
                  disabled={loading}
                  className="bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-white p-3 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Phone OTP (+880 SMS)</span>
                </button>
              </div>
            </div>

            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-slate-800" />
              <span className="px-3 text-[10px] text-slate-500 uppercase font-mono">Or Email & Password</span>
              <div className="flex-1 border-t border-slate-800" />
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSimulatedRegister} className="space-y-4">
              
              {authMode === 'register' && (
                <>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300 block">
                      Registered Company Name (RJSC)
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Bangladesh Corporate Holdings Ltd."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300 block">
                      RJSC Registration / C-Number
                    </label>
                    <input
                      type="text"
                      required
                      value={regNumber}
                      onChange={(e) => setRegNumber(e.target.value)}
                      placeholder="e.g. C-192014/2024"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </>
              )}

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300 block">
                  Corporate Authorized Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="director@company.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300 block">
                  Vault Security Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl text-xs transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Firebase Credentials...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>{authMode === 'login' ? 'Authenticate & Open Vault' : 'Create Encrypted Corporate Account'}</span>
                  </>
                )}
              </button>

            </form>

            <div className="text-center text-[10px] text-slate-400 font-mono pt-2">
              Protected by Firebase Authentication & Google Cloud Identity
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
