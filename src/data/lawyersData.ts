import { RjscService, BusinessType, FaqItem } from '../types';

export const COMPANY_CONTACT_INFO = {
  firmName: "E-LAWYERS",
  tagline: "Legal & Business Consultancy Firm",
  subTagline: "Dedicated to streamlining your corporate operations efficiently in Bangladesh.",
  address: "G-5, BTI Centara Grand, 144-144/1 Green Road, Panthapath, Dhaka-1205",
  phones: ["+88 01335230170", "+88 01335230171", "+88 01335230172", "+88 01335230181"],
  primaryPhoneDisplay: "+88 01335230170 - 81",
  email: "info@elawyersbd.com",
  workingHours: "Sunday – Thursday: 9:00 AM – 7:00 PM (Dhaka Time)",
  rjscAuthorityName: "Registrar of Joint Stock Companies and Firms (RJSC), Bangladesh",
};

export const BUSINESS_TYPES_SERVED: { title: BusinessType; description: string; badge: string }[] = [
  { title: "Startups", description: "Early stage setup, shareholder structures, and investment-ready RJSC documentation.", badge: "New Venture" },
  { title: "Private Limited Companies", description: "Annual returns, director management, share transfers, and capital increases.", badge: "Core Corporate" },
  { title: "One Person Companies (OPC)", description: "Nominee management, single-shareholder compliance, and annual filings.", badge: "OPC Special" },
  { title: "Foreign Companies", description: "Foreign director appointments, branch office RJSC compliance, and repatriation support.", badge: "Cross Border" },
  { title: "Joint Ventures", description: "Complex equity split agreements, board representation, and statutory registers.", badge: "JV & Alliances" },
  { title: "NGOs", description: "Section 28 company registration, non-profit governance, and social enterprise compliance.", badge: "Non-Profit" },
  { title: "Partnership Firms", description: "Deed drafting, RJSC partnership registration, partner changes, and dissolution.", badge: "Firm Focus" },
  { title: "Manufacturing Companies", description: "Factory corporate compliance, heavy capital restructuring, and statutory registers.", badge: "Industrial" },
  { title: "IT & Software Companies", description: "IP protection, copyright for software code, tech startup investor share allotments.", badge: "Tech & Innovation" },
  { title: "Trading Companies", description: "Import/Export corporate legal clearance, trade license alignment, and share structure.", badge: "Commerce" },
  { title: "E-commerce Businesses", description: "Digital platform copyright, merchant agreements, and corporate governance.", badge: "Digital Business" },
  { title: "Investment Companies", description: "Due diligence support, share holding registers, and complex statutory board resolutions.", badge: "Financial" }
];

export const RJSC_SERVICES: RjscService[] = [
  {
    id: "annual-return-filing",
    number: "01",
    title: "RJSC Annual Return Filing",
    imageUrl: "https://i.ibb.co/20fVQZyV/f31f97f7-362a-462f-8929-c0339019afae.png",
    shortDescription: "Mandatory annual submission to maintain legal status, avoid heavy penalties, and stay compliant with RJSC.",
    fullDescription: "Every registered private limited company in Bangladesh must submit annual returns to maintain active status with the Registrar of Joint Stock Companies and Firms (RJSC). We handle complete document preparation, auditor record verification, and official RJSC submission.",
    keyIncludes: [
      "Preparation of Form VIII (Annual Summary of Share Capital)",
      "Preparation of Form Schedule X (List of Directors & Shareholders)",
      "Audited Financial Statement alignment",
      "Official RJSC filing submission & receipt token generation",
      "Compliance verification & record update"
    ],
    requiredDocuments: [
      "Audited Financial Statements (Signed by CA)",
      "Notice & Minutes of Annual General Meeting (AGM)",
      "Updated List of Shareholders & Directors",
      "Copy of Form IX / Form XII from previous filings"
    ],
    estimatedTime: "2-4 Working Days",
    category: "rjsc",
    tagKeywords: ["Annual Return", "Form VIII", "Schedule X", "AGM Return", "RJSC Filing"]
  },
  {
    id: "director-appointment-change",
    number: "02",
    title: "Director Appointment & Change",
    imageUrl: "https://i.ibb.co/4gRL4YDy/28f631ac-9284-4394-aff6-e13193aaf75c.png",
    shortDescription: "Complete legal compliance for appointing, resigning, or replacing directors with Form XII submission.",
    fullDescription: "Changing board members requires strict statutory procedure under the Bangladesh Companies Act 1994. E-Lawyers assists with drafting board resolutions, consent letters, preparing Form XII, and securing RJSC approval.",
    keyIncludes: [
      "Board Resolution for Director Change",
      "Consent Letter of Director (Form IX)",
      "Form XII submission to RJSC",
      "E-TIN and NID / Passport verification",
      "Updating internal Director Register"
    ],
    requiredDocuments: [
      "NID / Passport of Proposed Director",
      "E-TIN Certificate of Proposed Director",
      "Resignation letter (in case of resignation)",
      "Board meeting minutes & approval"
    ],
    estimatedTime: "3-5 Working Days",
    category: "rjsc",
    tagKeywords: ["Director Appointment", "Form XII", "Form IX", "Director Change", "Board Resolution"]
  },
  {
    id: "share-transfer-allotment",
    number: "03",
    title: "Share Transfer & Share Allotment",
    imageUrl: "https://i.ibb.co/tw8LpJRy/2f0083d0-ce85-40b4-8507-91a849b8467f.png",
    shortDescription: "Legal assistance for ownership restructuring, investor entry, and share transfer documentation.",
    fullDescription: "Transferring existing shares or issuing fresh share allotments requires accurate legal documentation, stamp duty payments, board consent, and RJSC record update via Form XV and Share Certificates.",
    keyIncludes: [
      "Share Transfer Instrument (Form 117)",
      "Share Purchase Agreement (SPA) drafting",
      "Form XV (Return of Allotment) submission",
      "Board approvals & Shareholder waivers",
      "Share Certificate issuance & Register update"
    ],
    requiredDocuments: [
      "Buyer and Seller NID/Passport & E-TIN",
      "Existing Share Certificates",
      "Audited Valuation Report (if applicable)",
      "Board Resolution sanctioning transfer/allotment"
    ],
    estimatedTime: "5-7 Working Days",
    category: "rjsc",
    tagKeywords: ["Share Transfer", "Form 117", "Form XV", "Share Allotment", "Share Certificate"]
  },
  {
    id: "authorized-capital-increase",
    number: "04",
    title: "Authorized Capital Increase",
    imageUrl: "https://i.ibb.co/CKddJRxN/55941a29-3331-437b-ab5e-28cf083e22ea.png",
    shortDescription: "Expand your company's maximum share capital ceiling to welcome new investments.",
    fullDescription: "When your business scales or prepares for new equity investments, you need to increase the authorized capital ceiling in the Memorandum of Association (MOA) and submit Form IV & Form VI to RJSC.",
    keyIncludes: [
      "EGM Notice & Extraordinary General Meeting Minutes",
      "Special Resolution for MOA Amendment",
      "Form IV & Form VI filing with RJSC",
      "Treasury challan & stamp duty processing",
      "Updated MOA copy issuance"
    ],
    requiredDocuments: [
      "Current Memorandum & Articles of Association (MOA & AOA)",
      "Latest Form X / Form XII",
      "Board resolution initiating capital increase"
    ],
    estimatedTime: "4-6 Working Days",
    category: "rjsc",
    tagKeywords: ["Authorized Capital Increase", "Form IV", "Form VI", "MOA Amendment", "Special Resolution"]
  },
  {
    id: "company-name-change",
    number: "05",
    title: "Company Name Change",
    imageUrl: "https://i.ibb.co/bjLgvRgJ/06968e5f-30b7-4187-8613-f2806636d533.png",
    shortDescription: "End-to-end management from RJSC name clearance to revised Incorporation Certificate.",
    fullDescription: "Rebranding or strategic renaming requires RJSC Name Clearance, EGM special resolutions, amendment of MOA & AOA, and obtaining a Fresh Certificate of Incorporation from RJSC.",
    keyIncludes: [
      "RJSC Name Clearance application",
      "Special Resolution drafting",
      "Amended MOA & AOA preparation",
      "RJSC submission & Fresh Incorporation Certificate",
      "Gazette/Public notice guidance if applicable"
    ],
    requiredDocuments: [
      "Original Certificate of Incorporation",
      "Approved Name Clearance Letter",
      "Board & EGM Minutes"
    ],
    estimatedTime: "7-10 Working Days",
    category: "rjsc",
    tagKeywords: ["Company Name Change", "Name Clearance", "Fresh Incorporation Certificate", "Rebranding"]
  },
  {
    id: "memorandum-articles-amendment",
    number: "06",
    title: "Memorandum & Articles Amendment",
    imageUrl: "https://i.ibb.co/d0PnGsP4/9915dbaf-a9a6-42b9-bfda-fcef511cdef6.png",
    shortDescription: "Modify business object clauses, governance rules, or internal management regulations.",
    fullDescription: "Adding new line of business activities, altering voting rights, or updating corporate rules requires formal amendment of the Memorandum of Association (MOA) and Articles of Association (AOA) with RJSC.",
    keyIncludes: [
      "Drafting amended Object Clauses in MOA",
      "Updating governance provisions in AOA",
      "EGM Special Resolution drafting",
      "Form VI filing with RJSC and official registration"
    ],
    requiredDocuments: [
      "Existing MOA & AOA",
      "Board resolution for objective change",
      "EGM Special Resolution"
    ],
    estimatedTime: "5-7 Working Days",
    category: "rjsc",
    tagKeywords: ["MOA Amendment", "AOA Amendment", "Object Clause Change", "Form VI", "EGM"]
  },
  {
    id: "paid-up-capital-increase",
    number: "07",
    title: "Paid-Up Capital Increase",
    imageUrl: "https://i.ibb.co/bjxvcLvY/146d1f53-b266-4a6e-b1e7-8f5288b56744.png",
    shortDescription: "Official filing for actual money injected by shareholders against issued shares.",
    fullDescription: "Reflecting new funds or bank equity injection into the company's paid-up capital requires filing Return of Allotment (Form XV) alongside encashment certificates and board resolutions.",
    keyIncludes: [
      "Bank Encashment Certificate verification",
      "Form XV preparation & RJSC filing",
      "Share allotment resolution drafting",
      "Updating Register of Members"
    ],
    requiredDocuments: [
      "Bank Encashment Certificate / Deposit Slip",
      "Board resolution for allotment",
      "Auditor verification letter if needed"
    ],
    estimatedTime: "3-5 Working Days",
    category: "rjsc",
    tagKeywords: ["Paid-Up Capital", "Form XV", "Return of Allotment", "Capital Injection"]
  },
  {
    id: "company-winding-up-closure",
    number: "08",
    title: "Company Winding Up & Closure",
    imageUrl: "https://i.ibb.co/hxykwnPd/d3ad3b76-3456-4e78-8e55-2e87ff96ddcf.png",
    shortDescription: "Legal voluntary liquidation, debt clearance, and official RJSC strike-off.",
    fullDescription: "Closing an inactive company or voluntary winding up requires systematic debt settlement, liquidator appointment, public notice, auditor clearance, and final RJSC strike-off petition.",
    keyIncludes: [
      "Declaration of Solvency preparation",
      "Liquidator appointment resolution",
      "Newspaper publication notice",
      "Auditor tax clearance review",
      "RJSC final dissolution filing"
    ],
    requiredDocuments: [
      "Audited Liquidation Financials",
      "Tax Clearance Certificate (NBR)",
      "Board & Shareholder Liquidation Resolutions"
    ],
    estimatedTime: "2-4 Months",
    category: "rjsc",
    tagKeywords: ["Company Closure", "Winding Up", "Voluntary Liquidation", "RJSC Strike Off"]
  },
  {
    id: "business-ownership-change",
    number: "09",
    title: "Business Ownership Change",
    imageUrl: "https://i.ibb.co/4RZ47NV0/ef8d99b8-c7b4-49b5-86c8-079c28538318.png",
    shortDescription: "Comprehensive legal support for founder exit, investor buyout, or equity takeover.",
    fullDescription: "Changing core ownership structures requires synchronized share transfers, director resignations/appointments, updated statutory registers, and investor protection agreements.",
    keyIncludes: [
      "Share Transfer Form 117 & SPA",
      "Director resignation/appointment Form XII",
      "Shareholders Agreement (SHA) drafting",
      "RJSC filing & certificate updates"
    ],
    requiredDocuments: [
      "NID/Passport & E-TIN of incoming/outgoing owners",
      "Share Certificates",
      "Existing SHA or company records"
    ],
    estimatedTime: "7-12 Working Days",
    category: "rjsc",
    tagKeywords: ["Ownership Change", "Equity Takeover", "Shareholder Restructuring", "SHA"]
  },
  {
    id: "foreign-director-investor-compliance",
    number: "10",
    title: "Foreign Director & Investor Compliance",
    imageUrl: "https://i.ibb.co/cqxFVRm/2300bf6b-c9a2-47dd-bb42-71eec5cff399.png",
    shortDescription: "Specialized compliance for foreign equity, overseas directors, and BIDA alignment.",
    fullDescription: "Foreign nationals investing in Bangladesh or sitting on company boards must satisfy specific regulatory criteria including encashment certificates, BIDA registration, security clearance, and RJSC compliance.",
    keyIncludes: [
      "Foreign Director appointment (Form XII)",
      "Inward Remittance Encashment Certificate verification",
      "BIDA & Bangladesh Bank compliance alignment",
      "Foreign shareholder share allotment Form XV"
    ],
    requiredDocuments: [
      "Passport of Foreign Director/Shareholder (Notarized)",
      "Bank Encashment Certificate for FDI",
      "Board resolution for foreign appointment"
    ],
    estimatedTime: "7-14 Working Days",
    category: "rjsc",
    tagKeywords: ["Foreign Director", "FDI Bangladesh", "Encashment Certificate", "BIDA Compliance"]
  },
  {
    id: "partnership-firm-compliance",
    number: "11",
    title: "Partnership Firm Compliance",
    imageUrl: "https://i.ibb.co/1fChnVpg/0e0d0ffb-250f-4004-9830-875c25216878.png",
    shortDescription: "RJSC Partnership Registration, deed modifications, and partner entry/exit.",
    fullDescription: "We assist partnership businesses with RJSC Firm Registration, Partnership Deed modification, admission of new partners, retirement of existing partners, and capital adjustments.",
    keyIncludes: [
      "Partnership Deed drafting/modification",
      "Form A filing with RJSC for Firm Registration",
      "Form B / Notice of Changes filing",
      "Partner admission & retirement legal notices"
    ],
    requiredDocuments: [
      "Partnership Deed on Stamp Paper",
      "NID & E-TIN of all Partners",
      "Trade License copy"
    ],
    estimatedTime: "5-7 Working Days",
    category: "rjsc",
    tagKeywords: ["Partnership Registration", "Partnership Deed", "Form A", "Firm Compliance"]
  },
  {
    id: "partnership-firm-dissolution",
    number: "12",
    title: "Partnership Firm Dissolution",
    imageUrl: "https://i.ibb.co/ZRfRtPjC/d6cc8324-562e-4653-9326-a3c59539578f.png",
    shortDescription: "Formal cancellation of partnership firm registration with RJSC and asset distribution.",
    fullDescription: "Dissolving a registered partnership firm requires a formal Dissolution Deed, settling liabilities, notifying RJSC via Form C, and cancelling official firm registration.",
    keyIncludes: [
      "Deed of Dissolution drafting",
      "Form C notice filing with RJSC",
      "Settlement agreement between partners",
      "Official Cancellation receipt from RJSC"
    ],
    requiredDocuments: [
      "Original Firm Registration Certificate",
      "Partnership Deed",
      "Dissolution Agreement signed by all partners"
    ],
    estimatedTime: "5-8 Working Days",
    category: "rjsc",
    tagKeywords: ["Partnership Dissolution", "Form C", "Deed of Dissolution", "Firm Cancellation"]
  },
  {
    id: "corporate-documentation-support",
    number: "13",
    title: "Corporate Documentation Support",
    imageUrl: "https://i.ibb.co/whxWGkgL/350c37a1-405c-4eae-a783-647c697b9e5d.png",
    shortDescription: "Drafting board resolutions, meeting minutes, statutory forms, and corporate registers.",
    fullDescription: "Custom drafting of legally binding corporate documentation tailored to Bangladesh Companies Act standards for banks, investors, government tenders, or internal governance.",
    keyIncludes: [
      "Custom Board Resolutions",
      "Special & Extraordinary Resolutions",
      "Shareholder Meeting Minutes",
      "Corporate Power of Attorney (POA)"
    ],
    requiredDocuments: [
      "Company basic details",
      "Specific transaction or banking requirement"
    ],
    estimatedTime: "1-2 Working Days",
    category: "secretarial",
    tagKeywords: ["Board Resolution", "Meeting Minutes", "Corporate POA", "Statutory Forms"]
  },
  {
    id: "director-removal",
    number: "14",
    title: "Director Removal",
    imageUrl: "https://i.ibb.co/HfL5JGGS/2aff04a2-2ab7-453e-84c0-1e58b45b9e12.png",
    shortDescription: "Legal process for removing a non-performing or disqualified director under Companies Act.",
    fullDescription: "Removing a director requires adherence to statutory notice periods, special shareholder resolutions, section 106 procedures of Companies Act 1994, and filing Form XII with RJSC.",
    keyIncludes: [
      "Special Notice under Section 106",
      "EGM Notice & Agenda preparation",
      "Shareholder Resolution for removal",
      "Form XII filing & RJSC record update"
    ],
    requiredDocuments: [
      "Notice sent to the concerned director",
      "EGM Minutes & Attendance Register",
      "Current Form XII"
    ],
    estimatedTime: "10-15 Working Days",
    category: "rjsc",
    tagKeywords: ["Director Removal", "Section 106", "Form XII", "EGM Special Notice"]
  }
];

export const IP_SERVICES = [
  {
    id: "trademark-registration",
    title: "Trademark Registration Bangladesh",
    description: "Protect your brand name, logo, slogan, and visual identity under the Trademarks Act 2009.",
    keySteps: [
      "Comprehensive Trademark Search at Department of Patents, Designs and Trademarks (DPDT)",
      "Application Filing (Form TM-1) & Official Acknowledgment Receipt",
      "Examination Report Response & Hearing representation",
      "Journal Publication in Bangladesh Trademark Journal",
      "Registration Certificate issuance (Valid for 7 years, renewable)"
    ],
    timeline: "9-12 Months for Final Certificate (3 Days for TM Application Receipt & Protection)",
    icon: "ShieldCheck"
  },
  {
    id: "copyright-registration",
    title: "Copyright Registration Bangladesh",
    description: "Protect your software source code, websites, mobile apps, literary works, logos, and digital designs.",
    keySteps: [
      "Copyright Search & Eligibility Assessment",
      "Application Filing at Copyright Office Bangladesh",
      "Work verification & Gazette notice publication",
      "Objection handling & Registrar review",
      "Copyright Certificate issuance (Protection for lifetime + 60 years)"
    ],
    timeline: "1-3 Months for Certificate",
    icon: "FileCode"
  }
];

export const SECRETARIAL_SERVICES = [
  {
    title: "Board Meeting & AGM Documentation",
    description: "Drafting AGM notices, board meeting notices, attendance sheets, meeting minutes, chairman speeches, proxy forms, annual reports, and corporate resolutions.",
    features: ["AGM Notices", "Board Minutes", "Proxy Forms", "Annual Reports"]
  },
  {
    title: "Resolution Drafting & Minutes Preparation",
    description: "Professionally drafted board resolutions, shareholder resolutions, circular resolutions, and statutory minute books.",
    features: ["Board Resolutions", "Shareholder Resolutions", "Circular Resolutions", "Minute Books"]
  },
  {
    title: "Share Register Maintenance",
    description: "Maintaining accurate shareholder records including member registers, share certificates, share transfer logs, and allotment histories.",
    features: ["Member Register", "Share Certificates", "Transfer Log", "Allotment Register"]
  },
  {
    title: "Statutory Register Maintenance",
    description: "Maintaining mandatory statutory registers required under the Bangladesh Companies Act 1994 (Director Register, Charge Register, Share Register).",
    features: ["Director Register", "Mortgage/Charge Register", "Debenture Register", "Audit Compliance"]
  },
  {
    title: "Corporate Record Management",
    description: "Organized digital and physical record management for bank due diligence, audit inspections, and foreign investor reviews.",
    features: ["Digital Archival", "Audit Readiness", "Due Diligence Vault", "Inspection Defense"]
  }
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Free Consultation",
    description: "We understand your company structure, legal requirements, and compliance needs in detail."
  },
  {
    step: "02",
    title: "Document Collection",
    description: "We collect necessary company documents, previous RJSC filings, and director details."
  },
  {
    step: "03",
    title: "Legal Documentation",
    description: "Our corporate lawyers prepare required statutory forms, resolutions, agreements, and registers."
  },
  {
    step: "04",
    title: "Submission & Follow-Up",
    description: "We submit documents to RJSC or relevant authorities and actively follow up with officials."
  },
  {
    step: "05",
    title: "Completion & Delivery",
    description: "Receive approved RJSC certified copies, statutory forms, and official compliance confirmation."
  }
];

export const RISKS_OF_NON_COMPLIANCE = [
  { title: "Monetary Penalties", description: "RJSC levies accumulating daily fines for delayed annual return filings and form submissions.", icon: "AlertTriangle" },
  { title: "RJSC Formal Notices", description: "Unanswered notices can lead to official show-cause or company strike-off proceedings.", icon: "MailWarning" },
  { title: "Banking Complications", description: "Banks lock corporate accounts or deny credit facilities without current RJSC Form X/XII.", icon: "Building2" },
  { title: "Investment Blockers", description: "Institutional investors & venture capitalists reject deals during legal due diligence if registers are irregular.", icon: "ShieldOff" },
  { title: "Audit & Tax Issues", description: "NBR tax audits flag mismatched corporate shareholding or missing capital filing records.", icon: "FileX" },
  { title: "Director Personal Liability", description: "Directors face personal disqualification or penalties under Bangladesh Companies Act for default.", icon: "UserX" }
];

export const FAQS_LIST: FaqItem[] = [
  {
    id: "faq-1",
    question: "How long does RJSC annual return filing take?",
    answer: "Usually, the process can be completed within 2 to 4 working days after receiving complete audited financial statements and required director details.",
    category: "RJSC Filing"
  },
  {
    id: "faq-2",
    question: "Can foreign nationals become company directors in Bangladesh?",
    answer: "Yes. Foreign nationals can become directors in a Bangladesh Private Limited company, subject to holding a valid Passport, E-TIN, and compliance with RJSC Form XII filing.",
    category: "Foreign Investors"
  },
  {
    id: "faq-3",
    question: "Can company shares be transferred easily in Bangladesh?",
    answer: "Yes. Share transfer requires proper Form 117 execution, stamp duty payment, board approval, Share Purchase Agreement (SPA), and filing Form XV or statutory register updates.",
    category: "Share Transfer"
  },
  {
    id: "faq-4",
    question: "When should AGM documentation be prepared?",
    answer: "An Annual General Meeting (AGM) must be held within 18 months of incorporation for new companies, and at least once every calendar year (within 15 months of the previous AGM) for existing companies.",
    category: "AGM & Secretarial"
  },
  {
    id: "faq-5",
    question: "Why are statutory registers mandatory for every company?",
    answer: "Statutory registers (Director Register, Shareholder Register, Charge Register) are mandatory legal records under the Bangladesh Companies Act 1994. They are strictly reviewed during tax audits, banking loan applications, and investment due diligence.",
    category: "Corporate Law"
  },
  {
    id: "faq-6",
    question: "What is the difference between Authorized Capital and Paid-Up Capital?",
    answer: "Authorized Capital is the maximum ceiling of share capital a company is legally allowed to issue as per its MOA. Paid-Up Capital is the actual amount of money shareholders have paid into the company bank account for issued shares.",
    category: "Capital Restructuring"
  },
  {
    id: "faq-7",
    question: "How do I protect my brand logo or software code in Bangladesh?",
    answer: "Brand logos, trade names, and slogans are protected through Trademark Registration under the Trademarks Act 2009. Software source code, mobile apps, and original designs are protected through Copyright Registration.",
    category: "Intellectual Property"
  }
];

export const TARGET_KEYWORDS = {
  primary: [
    "RJSC Compliance Services Bangladesh",
    "RJSC Annual Return Filing Bangladesh",
    "Company Secretarial Services Bangladesh",
    "Corporate Lawyer Bangladesh",
    "Company Lawyer Bangladesh",
    "Corporate Compliance Consultant Bangladesh"
  ],
  secondary: [
    "Director Appointment RJSC",
    "Share Transfer Bangladesh",
    "Paid Up Capital Increase Bangladesh",
    "Authorized Capital Increase Bangladesh",
    "Trademark Registration Bangladesh",
    "Copyright Registration Bangladesh",
    "Board Resolution Drafting",
    "AGM Documentation Service",
    "Corporate Governance Services Bangladesh",
    "Partnership Registration Bangladesh",
    "Company Winding Up Bangladesh",
    "MOA Amendment Bangladesh",
    "AOA Amendment Bangladesh"
  ]
};
