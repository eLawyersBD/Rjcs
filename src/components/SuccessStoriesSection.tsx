import React, { useState, useRef } from 'react';
import {
  Building2,
  Star,
  Quote,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  FileCheck2,
  Sparkles,
  ArrowRight,
  Search,
  Award,
  ChevronRight,
  X,
  Scale,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Video,
  Film,
  Clock,
  Subtitles,
  FileText
} from 'lucide-react';

export interface TestimonialItem {
  id: string;
  companyName: string;
  industry: string;
  clientName: string;
  clientRole: string;
  avatarInitials: string;
  serviceCategory: 'rjsc' | 'foreign' | 'capital' | 'ip';
  serviceUsed: string;
  impactMetric: string;
  rating: number;
  testimonial: string;
  rjscFormsInvolved: string[];
  challenge: string;
  solutionOutcome: string;
  timeframe: string;
}

export interface VideoTestimonial {
  id: string;
  clientName: string;
  clientRole: string;
  companyName: string;
  industry: string;
  videoTitle: string;
  duration: string;
  thumbnailUrl: string;
  videoUrl: string;
  quoteSnippet: string;
  impactBadge: string;
  transcript: string;
  serviceUsed: string;
}

export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: 'vid-aethertech',
    clientName: 'Tanvir Ahmed',
    clientRole: 'Founder & CEO',
    companyName: 'AetherTech Solutions Ltd.',
    industry: 'IT & Software Export',
    videoTitle: 'Securing $1.5M Seed Funding via Express RJSC Capital Expansion',
    duration: '2:15',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    quoteSnippet: 'E-Lawyers completed our paid-up capital increase and Form XV return in 5 days, allowing us to close our offshore seed round right on schedule.',
    impactBadge: '৳15M Capital Cleared',
    serviceUsed: 'Share Allotment & Authorized Capital Expansion',
    transcript: `Hello, I am Tanvir Ahmed, Founder and CEO of AetherTech Solutions. When we were closing our $1.5M seed round with international tech investors, our investors required immediate paid-up capital restructuring and RJSC MOA object clause amendments. E-Lawyers provided end-to-end statutory guidance. They drafted the shareholder EGM resolutions, prepared the treasury challans, and filed Form XV with RJSC within 5 working days. Their speed and legal precision were phenomenal.`
  },
  {
    id: 'vid-nippon',
    clientName: 'Kenji Sato',
    clientRole: 'Managing Director',
    companyName: 'Nippon Industrial Machinery (BD) Ltd.',
    industry: 'Japanese Foreign Subsidiary',
    videoTitle: 'Seamless Board Restructuring & Foreign Director Form XII Clearance',
    duration: '1:48',
    thumbnailUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    quoteSnippet: 'Navigating Bangladesh corporate law as a Japanese subsidiary used to be daunting. E-Lawyers handled BIDA approvals and Form XII director filings seamlessly.',
    impactBadge: '100% On-Time Board Filing',
    serviceUsed: 'Foreign Director Appointment & BIDA Compliance',
    transcript: `Greetings, I am Kenji Sato, Managing Director at Nippon Industrial Machinery Bangladesh. Changing board directors for a foreign-owned enterprise requires overseas document notarization, BIDA inward remittance verification, and RJSC Form XII filing. E-Lawyers coordinated all steps with extreme professionalism. I highly recommend E-Lawyers for any multinational company operating in Dhaka.`
  },
  {
    id: 'vid-dhakai',
    clientName: 'Nusrat Jahan',
    clientRole: 'Managing Director',
    companyName: 'Dhakai Heritage Retail Ltd.',
    industry: 'E-Commerce & Retail Scaleup',
    videoTitle: 'Clearing 3 Years of Accumulated RJSC Filing Backlogs Without Fines',
    duration: '2:30',
    thumbnailUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    quoteSnippet: 'Our company faced show-cause notices for missing annual returns. E-Lawyers audited our secretarial files, submitted all backlogged Form VIIIs, and saved us from heavy penalties.',
    impactBadge: 'Zero RJSC Fines',
    serviceUsed: 'RJSC Annual Return Backlog & Trademark Protection',
    transcript: `Hi, I am Nusrat Jahan, MD of Dhakai Heritage. Due to rapid retail expansion, our internal secretarial team missed filing annual returns for 3 consecutive years. We were at risk of bank account suspension. The legal team at E-Lawyers conducted a deep compliance audit, prepared retrospective board minutes, and successfully cleared all pending RJSC filings in 4 days.`
  },
  {
    id: 'vid-paypoint',
    clientName: 'Mahmud Hasan',
    clientRole: 'Sole Shareholder & Director',
    companyName: 'PayPoint Digital Financials OPC',
    industry: 'Fintech & Digital Payments',
    videoTitle: 'Setting Up Bangladesh’s First Fully Compliant Fintech OPC Entity',
    duration: '1:55',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    quoteSnippet: 'From proprietor to One Person Company (OPC), E-Lawyers crafted tailored AOA nominee clauses and got our corporate merchant account active in 72 hours.',
    impactBadge: '72-Hour Bank Approval',
    serviceUsed: 'One Person Company (OPC) Governance & Nominee Setup',
    transcript: `Hello everyone, my name is Mahmud Hasan from PayPoint Digital. Incorporating an OPC under the revised Companies Act required complex nominee disclosures and customized Articles of Association. E-Lawyers handled everything online, delivered our statutory binding books, and unlocked our merchant banking relationship within 72 hours.`
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'aethertech',
    companyName: 'AetherTech Solutions Ltd.',
    industry: 'IT & Software Export',
    clientName: 'Tanvir Ahmed',
    clientRole: 'Founder & CEO',
    avatarInitials: 'AT',
    serviceCategory: 'capital',
    serviceUsed: 'Share Allotment & Authorized Capital Expansion',
    impactMetric: '৳15M Investment Funds Cleared in 5 Days',
    rating: 5,
    testimonial: 'E-Lawyers handled our equity restructuring and authorized capital increase with RJSC in record time right before our seed investment round. Their expertise with Form XV and MOA amendments saved our funding timeline.',
    rjscFormsInvolved: ['Form XV (Return of Allotment)', 'Form IV (Capital Increase)', 'Special MOA Amendment Resolution'],
    challenge: 'Needed immediate paid-up and authorized capital expansion to finalize offshore investor equity allotment without delaying the closing date.',
    solutionOutcome: 'Prepared treasury challan, drafted shareholder resolutions, and secured official RJSC certified updated MOA within 5 working days.',
    timeframe: '5 Working Days'
  },
  {
    id: 'nippon-machinery',
    companyName: 'Nippon Industrial Machinery (BD) Ltd.',
    industry: 'Foreign Subsidiary & Manufacturing',
    clientName: 'Kenji Sato',
    clientRole: 'Managing Director',
    avatarInitials: 'NI',
    serviceCategory: 'foreign',
    serviceUsed: 'Foreign Director Appointment & BIDA Compliance',
    impactMetric: '100% On-Time Board Restructuring & FDI Clearance',
    rating: 5,
    testimonial: 'As a Japanese foreign-owned enterprise operating in Dhaka, navigating RJSC board restructuring used to be confusing. E-Lawyers managed Form XII, encashment verification, and BIDA sync with flawless precision.',
    rjscFormsInvolved: ['Form XII (Director Change)', 'Form IX (Consent)', 'BIDA Inward FDI Encashment Certificate'],
    challenge: 'Replacing foreign board members required notarized overseas documents and BIDA encashment certificate validation.',
    solutionOutcome: 'Coordinated notarization review, secured BIDA alignment, and obtained certified Form XII receipt from RJSC.',
    timeframe: '7 Working Days'
  },
  {
    id: 'dhakai-heritage',
    companyName: 'Dhakai Heritage Retail Ltd.',
    industry: 'E-Commerce & Retail Scaleup',
    clientName: 'Nusrat Jahan',
    clientRole: 'Managing Director',
    avatarInitials: 'DH',
    serviceCategory: 'rjsc',
    serviceUsed: 'RJSC Annual Return Backlog & Trademark Protection',
    impactMetric: 'Zero RJSC Fines & Trademark Brand Secured',
    rating: 5,
    testimonial: 'We faced accumulated RJSC late filing notifications and brand copycat threats. E-Lawyers audited 3 years of secretarial records, submitted all missing Form VIII returns, and secured our trademark registration with DPDT.',
    rjscFormsInvolved: ['Form VIII (Annual Return)', 'Schedule X', 'Trademark TM-1 Application'],
    challenge: '3-year backlog in annual filings created threat of show-cause notices and blocked corporate banking operations.',
    solutionOutcome: 'Prepared retrospective audited filings, cleared RJSC penalties, and filed TM-1 for brand name protection.',
    timeframe: '4 Working Days (Filings) + TM Receipt'
  },
  {
    id: 'paypoint-digital',
    companyName: 'PayPoint Digital Financials OPC',
    industry: 'Fintech & Digital Payments',
    clientName: 'Mahmud Hasan',
    clientRole: 'Sole Shareholder & Director',
    avatarInitials: 'PP',
    serviceCategory: 'rjsc',
    serviceUsed: 'One Person Company (OPC) Governance & Nominee Setup',
    impactMetric: 'Corporate Bank Account Unlocked in 72 Hours',
    rating: 5,
    testimonial: 'Converting our sole proprietorship to a One Person Company (OPC) required specialized Articles of Association and nominee appointment filings. E-Lawyers drafted watertight governance documents.',
    rjscFormsInvolved: ['OPC Nomination Form', 'Form IX', 'Custom AOA Provisions'],
    challenge: 'Bank required official OPC statutory registration and nominee declaration before activating corporate merchant gateway.',
    solutionOutcome: 'Drafted tailored OPC Memorandum & Articles, filed nominee disclosures, and delivered full statutory binder.',
    timeframe: '3 Working Days'
  },
  {
    id: 'biocare-pharma',
    companyName: 'BioCare Pharma Bangladesh Ltd.',
    industry: 'Healthcare & Pharmaceuticals',
    clientName: 'Dr. S. M. Rahman',
    clientRole: 'Executive Director',
    avatarInitials: 'BC',
    serviceCategory: 'capital',
    serviceUsed: 'MOA Object Clause Amendment & Capital Increase',
    impactMetric: '100% Statutory Clearance for Tender Eligibility',
    rating: 5,
    testimonial: 'Expanding into medical device manufacturing required modifying our MOA object clauses and raising paid-up capital. E-Lawyers prepared EGM resolutions and secured certified copies without any hassle.',
    rjscFormsInvolved: ['Form VI (MOA Amendment Notice)', 'Form XV (Paid-Up Capital)', 'Special EGM Minutes'],
    challenge: 'Government health tender required expanded object clauses in MOA and minimum paid-up capital verification.',
    solutionOutcome: 'Conducted EGM, updated MOA with RJSC, and issued fresh certified copies in time for tender submission.',
    timeframe: '6 Working Days'
  },
  {
    id: 'apex-textiles',
    companyName: 'Apex Garments & Textile Mills Ltd.',
    industry: 'RMG & Textile Exporter',
    clientName: 'Anwar Hossain',
    clientRole: 'Company Secretary',
    avatarInitials: 'AT',
    serviceCategory: 'foreign',
    serviceUsed: 'Statutory Register Audit & Director Resignation/Appointment',
    impactMetric: 'Audit-Ready Corporate Registers Across 12 Directors',
    rating: 5,
    testimonial: 'Managing board changes and maintaining mandatory statutory registers across multiple subsidiaries was a headache. E-Lawyers provided complete corporate secretarial support and updated all Form XII filings.',
    rjscFormsInvolved: ['Form XII (Director Changes)', 'Register of Directors', 'Register of Members'],
    challenge: 'Submitting complex board changes across 12 directors with retiring and incoming shareholders for annual financial audit.',
    solutionOutcome: 'Reconciled statutory registers, drafted board consent minutes, and filed all Form XII changes with RJSC.',
    timeframe: '5 Working Days'
  }
];

interface SuccessStoriesSectionProps {
  onOpenConsultationWithService?: (serviceTitle: string) => void;
}

export const SuccessStoriesSection: React.FC<SuccessStoriesSectionProps> = ({
  onOpenConsultationWithService
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStory, setSelectedStory] = useState<TestimonialItem | null>(null);

  // Video modal state
  const [activeVideo, setActiveVideo] = useState<VideoTestimonial | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const categories = [
    { id: 'all', label: 'All Stories' },
    { id: 'rjsc', label: 'RJSC Filings & Returns' },
    { id: 'foreign', label: 'FDI & Foreign Directors' },
    { id: 'capital', label: 'Share Allotment & Capital' }
  ];

  const filteredStories = TESTIMONIALS.filter((story) => {
    const matchesCategory =
      activeCategory === 'all' || story.serviceCategory === activeCategory;
    const matchesSearch =
      story.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.serviceUsed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleOpenVideo = (video: VideoTestimonial) => {
    setActiveVideo(video);
    setIsPlaying(true);
    setIsMuted(false);
    setShowTranscript(false);
  };

  const handleCloseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setActiveVideo(null);
  };

  return (
    <section id="success-stories" className="py-20 bg-slate-50 border-b border-slate-200 relative">
      {/* Background Subtle Glows */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Eyebrow & Main Title */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>Client Success Stories & Video Testimonials</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-serif leading-tight">
            Proven Impact for Businesses Across Bangladesh
          </h2>

          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Watch and read real case testimonials from tech founders, factory owners, and foreign directors who rely on{' '}
            <span className="text-emerald-700 font-semibold">E-LAWYERS</span> for seamless RJSC compliance and corporate governance.
          </p>
        </div>

        {/* High-Impact Statistics Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-center p-3 border-r border-slate-200 last:border-r-0">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-serif">350+</div>
            <div className="text-xs font-medium text-slate-600 mt-1">Corporate Entities Served</div>
          </div>
          <div className="text-center p-3 border-r border-slate-200 last:border-r-0">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-serif">100%</div>
            <div className="text-xs font-medium text-slate-600 mt-1">RJSC Approval Rate</div>
          </div>
          <div className="text-center p-3 border-r border-slate-200 last:border-r-0">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-serif">৳250M+</div>
            <div className="text-xs font-medium text-slate-600 mt-1">Capital & FDI Filings Cleared</div>
          </div>
          <div className="text-center p-3">
            <div className="flex items-center justify-center gap-1 text-emerald-700">
              <span className="text-2xl sm:text-3xl font-extrabold font-serif">4.9</span>
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <div className="text-xs font-medium text-slate-600 mt-1">Client Satisfaction Rating</div>
          </div>
        </div>

        {/* FEATURED VIDEO TESTIMONIALS SHOWCASE PLAYER GRID */}
        <div className="space-y-6 bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                <Video className="w-4 h-4 text-emerald-600" />
                <span>Executive Video Testimonials</span>
              </div>
              <h3 className="text-2xl font-bold font-serif text-slate-900">
                Hear Directly From Managing Directors & Founders
              </h3>
            </div>
            <p className="text-xs text-slate-600 max-w-md">
              Click any video card below to watch high-definition corporate case interviews detailing how E-Lawyers resolved complex RJSC filings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VIDEO_TESTIMONIALS.map((vid) => (
              <div
                key={vid.id}
                onClick={() => handleOpenVideo(vid)}
                className="group cursor-pointer bg-slate-50 border border-slate-200 hover:border-emerald-500/60 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
              >
                {/* Video Poster Thumbnail Container */}
                <div className="relative aspect-video bg-slate-100 overflow-hidden">
                  <img
                    src={vid.thumbnailUrl}
                    alt={vid.clientName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#00C896] text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-slate-950 ml-0.5 text-slate-950" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-2.5 right-2.5 bg-slate-900/90 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-slate-700 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    <span>{vid.duration}</span>
                  </div>

                  {/* Impact Badge */}
                  <div className="absolute top-2.5 left-2.5 bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                    {vid.impactBadge}
                  </div>
                </div>

                {/* Video Card Content */}
                <div className="p-4 space-y-3">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug font-serif">
                      {vid.videoTitle}
                    </h4>
                    <p className="text-[11px] text-emerald-700 font-semibold">
                      {vid.clientName} • <span className="text-slate-500">{vid.clientRole}</span>
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium">{vid.companyName}</p>
                  </div>

                  <p className="text-xs text-slate-600 italic line-clamp-2 border-l-2 border-emerald-500 pl-2">
                    "{vid.quoteSnippet}"
                  </p>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] font-bold text-emerald-700 group-hover:translate-x-0.5 transition-transform">
                    <span className="flex items-center gap-1">
                      <Film className="w-3.5 h-3.5 text-emerald-600" />
                      Watch Video Testimonial
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Written Testimonials Section Header */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold font-serif text-slate-900">
                Detailed Case Studies & Written Reviews
              </h3>
              <p className="text-xs text-slate-600">
                Filter case studies by corporate action category or search for specific company types.
              </p>
            </div>

            {/* Category Tabs & Quick Search */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeCategory === cat.id
                      ? 'bg-[#00C896] text-slate-950 font-extrabold shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search business name or RJSC service..."
              className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Testimonials Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story) => (
              <div
                key={story.id}
                className="bg-white border border-slate-200 hover:border-emerald-500/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between hover:shadow-lg group"
              >
                <div>
                  {/* Header Badge & Rating */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-2.5 py-1 rounded-md text-[11px] font-semibold">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{story.impactMetric}</span>
                    </span>

                    <div className="flex text-amber-500">
                      {[...Array(story.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Service Tag */}
                  <p className="text-xs font-semibold text-emerald-700 mb-2 tracking-wide uppercase">
                    {story.serviceUsed}
                  </p>

                  {/* Testimonial Quote */}
                  <div className="relative mb-6">
                    <Quote className="w-6 h-6 text-slate-200 absolute -top-2 -left-2 -z-0 opacity-40" />
                    <p className="text-sm text-slate-600 italic leading-relaxed relative z-10 pl-2 border-l-2 border-emerald-500">
                      "{story.testimonial}"
                    </p>
                  </div>
                </div>

                {/* Client & Company Details Footer */}
                <div className="pt-4 border-t border-slate-200 mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center text-emerald-800 font-extrabold font-serif text-sm">
                      {story.avatarInitials}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {story.clientName}
                      </h4>
                      <p className="text-[11px] text-slate-600">{story.clientRole}</p>
                      <p className="text-[10px] text-slate-500 font-medium">{story.companyName}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedStory(story)}
                    className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-2.5 py-1.5 rounded-lg transition-all"
                    title="View Case Summary"
                  >
                    <span>Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredStories.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-500 text-sm">No success stories match your search criteria.</p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="mt-3 text-xs text-emerald-700 hover:underline font-semibold"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* CTA Footer inside Section */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2 justify-center sm:justify-start">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Ready to solve your business's RJSC compliance needs?</span>
            </h3>
            <p className="text-xs text-slate-600">
              Join 350+ companies in Bangladesh enjoying zero-hassle statutory filings and corporate protection.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenConsultationWithService?.('Corporate RJSC Consultation')}
              className="bg-[#00C896] hover:bg-[#00B084] text-slate-950 font-bold px-5 py-2.5 rounded-lg text-xs transition-all shadow-sm flex items-center gap-2"
            >
              <span>Get Free Legal Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* FULLSCREEN / INTERACTIVE VIDEO TESTIMONIAL PLAYER MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative space-y-0 text-white animate-fadeIn">
            
            {/* Modal Top Header Bar */}
            <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold font-serif text-white">
                    {activeVideo.videoTitle}
                  </h3>
                  <p className="text-xs text-amber-400">
                    {activeVideo.clientName} ({activeVideo.clientRole}) • <span className="text-slate-400">{activeVideo.companyName}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={handleCloseVideo}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Video Player Box */}
            <div className="relative aspect-video bg-black flex items-center justify-center group">
              <video
                ref={videoRef}
                src={activeVideo.videoUrl}
                poster={activeVideo.thumbnailUrl}
                autoPlay
                playsInline
                className="w-full h-full object-contain"
                onEnded={() => setIsPlaying(false)}
              />

              {/* Custom Overlay Controls */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={toggleVideoPlay}
                    className="p-2.5 rounded-full bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-all shadow-md"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950 ml-0.5" />}
                  </button>

                  <button
                    type="button"
                    onClick={toggleVideoMute}
                    className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <span className="text-xs font-mono text-slate-300">
                    Duration: {activeVideo.duration}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowTranscript(!showTranscript)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                      showTranscript
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                    }`}
                  >
                    <Subtitles className="w-3.5 h-3.5" />
                    <span>Transcript</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Video Footer Info & Transcript Panel */}
            <div className="p-5 bg-slate-950 border-t border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block font-mono">
                    Service Executed: {activeVideo.serviceUsed}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "{activeVideo.quoteSnippet}"
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const svc = activeVideo.serviceUsed;
                    handleCloseVideo();
                    onOpenConsultationWithService?.(svc);
                  }}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl text-xs whitespace-nowrap shadow-md transition-all shrink-0"
                >
                  Book Similar Service
                </button>
              </div>

              {/* Transcript Dropdown */}
              {showTranscript && (
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2 animate-fadeIn">
                  <div className="flex items-center gap-1.5 font-bold text-amber-400 font-mono text-[11px] uppercase">
                    <FileText className="w-3.5 h-3.5" />
                    Full Video Interview Transcript
                  </div>
                  <p className="leading-relaxed font-sans text-slate-300">
                    {activeVideo.transcript}
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Detail Modal / Case Summary Drawer */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 text-white shadow-2xl relative space-y-5 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 pr-8">
              <div className="w-12 h-12 bg-slate-950 border border-amber-500/40 rounded-xl flex items-center justify-center text-amber-400 font-extrabold font-serif text-lg">
                {selectedStory.avatarInitials}
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-serif">{selectedStory.companyName}</h3>
                <p className="text-xs text-amber-400">{selectedStory.clientName} ({selectedStory.clientRole})</p>
                <p className="text-[11px] text-slate-400">{selectedStory.industry}</p>
              </div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Service Category:</span>
                <span className="font-semibold text-white">{selectedStory.serviceUsed}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Execution Timeframe:</span>
                <span className="font-semibold text-emerald-400">{selectedStory.timeframe}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Key Impact:</span>
                <span className="font-semibold text-amber-400">{selectedStory.impactMetric}</span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div>
                <h4 className="font-bold text-amber-400 uppercase text-[10px] tracking-wider mb-1">
                  The Compliance Challenge
                </h4>
                <p className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">{selectedStory.challenge}</p>
              </div>

              <div>
                <h4 className="font-bold text-emerald-400 uppercase text-[10px] tracking-wider mb-1">
                  E-Lawyers Solution & Outcome
                </h4>
                <p className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">{selectedStory.solutionOutcome}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-400 uppercase text-[10px] tracking-wider mb-1.5">
                  RJSC Statutory Forms Processed
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedStory.rjscFormsInvolved.map((form, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-800 text-amber-300 border border-slate-700 px-2.5 py-1 rounded text-[11px] font-medium"
                    >
                      {form}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end gap-3">
              <button
                onClick={() => setSelectedStory(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const svc = selectedStory.serviceUsed;
                  setSelectedStory(null);
                  onOpenConsultationWithService?.(svc);
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs shadow-md shadow-amber-500/20"
              >
                Book Similar Service
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
