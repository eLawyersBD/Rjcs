import React, { useState, useEffect } from 'react';
import { X, Scale, Phone, Mail, Clock, CheckCircle2, ShieldCheck, Calendar, Building, FileText, Loader2, Copy, Check } from 'lucide-react';
import { COMPANY_CONTACT_INFO, BUSINESS_TYPES_SERVED } from '../data/lawyersData';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
  preselectedCompanyType?: string;
  initialDetails?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  preselectedService = 'General RJSC Compliance',
  preselectedCompanyType = 'Private Limited Company',
  initialDetails = ''
}) => {
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+880');
  const [companyType, setCompanyType] = useState(preselectedCompanyType);
  const [serviceCategory, setServiceCategory] = useState(preselectedService);
  const [requirements, setRequirements] = useState(initialDetails);
  const [preferredTime, setPreferredTime] = useState('Morning (10:00 AM - 1:00 PM)');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<any>(null);
  const [copiedTicket, setCopiedTicket] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          companyName,
          email,
          phone,
          companyType,
          serviceCategory,
          specificRequirements: requirements,
          preferredCallbackTime: preferredTime
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmittedTicket(data.ticket);
      }
    } catch (err) {
      console.error("Consultation booking error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyTicket = () => {
    if (submittedTicket?.id) {
      navigator.clipboard.writeText(submittedTicket.id);
      setCopiedTicket(true);
      setTimeout(() => setCopiedTicket(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 text-slate-800">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!submittedTicket ? (
          <>
            {/* Modal Header */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-amber-500 text-slate-950 rounded-xl font-bold shadow-sm">
                  <Scale className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
                    Book Free Legal Consultation
                  </h3>
                  <p className="text-xs text-amber-800 font-bold">Talk to Senior Corporate Lawyers in Dhaka</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Tanvir Rahman"
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 rounded-xl p-3 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+880 1712 000000"
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 rounded-xl p-3 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Company Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Apex Tech Limited"
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 rounded-xl p-3 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 rounded-xl p-3 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Company Type</label>
                  <select
                    value={companyType}
                    onChange={(e) => setCompanyType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl p-3 focus:border-amber-500 focus:outline-none"
                  >
                    {BUSINESS_TYPES_SERVED.map(b => (
                      <option key={b.title} value={b.title}>{b.title}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Preferred Callback Time</label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl p-3 focus:border-amber-500 focus:outline-none"
                  >
                    <option value="As soon as possible">As Soon As Possible (Urgent)</option>
                    <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                    <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
                    <option value="Evening (6:00 PM - 8:00 PM)">Evening (6:00 PM - 8:00 PM)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Required Service or Query</label>
                <input
                  type="text"
                  value={serviceCategory}
                  onChange={(e) => setServiceCategory(e.target.value)}
                  placeholder="e.g. Annual Return Filing, Director Change, Share Transfer"
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl p-3 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Specific Requirements or Background Notes</label>
                <textarea
                  rows={3}
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="Describe your current RJSC status or specific legal questions..."
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 rounded-xl p-3 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Request...</span>
                    </>
                  ) : (
                    <span>Submit Free Consultation Request</span>
                  )}
                </button>
              </div>

              <p className="text-[10px] text-slate-500 text-center">
                Strict Privacy Guarantee: Your corporate information and legal inquiries are treated with 100% legal confidentiality.
              </p>
            </form>
          </>
        ) : (
          /* Submission Confirmation Ticket */
          <div className="space-y-6 text-center py-2">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-300 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="bg-amber-100 text-amber-800 border border-amber-300 text-xs font-mono font-bold px-3 py-1 rounded-full inline-block">
                Consultation Ticket Generated
              </span>
              <h3 className="text-2xl font-bold font-serif text-slate-900">
                Request Submitted Successfully!
              </h3>
              <p className="text-xs text-slate-600">
                A corporate lawyer from E-Lawyers will review your details and call you at <strong className="text-amber-700">{submittedTicket.phone}</strong>.
              </p>
            </div>

            {/* Ticket Card */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">TICKET ID:</span>
                <div className="flex items-center gap-2 font-bold text-amber-700">
                  <span>{submittedTicket.id}</span>
                  <button onClick={handleCopyTicket} className="text-slate-400 hover:text-slate-700">
                    {copiedTicket ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-slate-700">
                <div><span className="text-slate-400">CLIENT:</span> {submittedTicket.fullName}</div>
                <div><span className="text-slate-400">ENTITY:</span> {submittedTicket.companyType}</div>
                <div><span className="text-slate-400">SERVICE:</span> {submittedTicket.serviceCategory}</div>
                <div><span className="text-slate-400">CALLBACK:</span> {submittedTicket.preferredCallbackTime}</div>
              </div>
            </div>

            {/* Direct Call Strip */}
            <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
              <p className="font-semibold text-slate-900">Need Urgent Immediate Representation?</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href={`tel:${COMPANY_CONTACT_INFO.phones[0]}`} className="text-amber-700 hover:underline font-bold flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> Call {COMPANY_CONTACT_INFO.phones[0]}
                </a>
                <span className="text-slate-400">|</span>
                <a href={`mailto:${COMPANY_CONTACT_INFO.email}`} className="text-amber-700 hover:underline flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" /> {COMPANY_CONTACT_INFO.email}
                </a>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-slate-200 hover:bg-slate-300 text-slate-900 font-bold py-3 rounded-xl text-xs"
            >
              Done & Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
