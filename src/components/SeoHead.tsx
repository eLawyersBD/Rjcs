import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoHeadProps {
  activeSection: string;
  currentLanguage: 'EN' | 'BN';
}

interface MetaInfo {
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
  keywordsEn: string;
  keywordsBn: string;
}

const SECTION_SEO_MAP: Record<string, MetaInfo> = {
  hero: {
    titleEn: 'E-Lawyers Bangladesh | Top Corporate, RJSC & IP Legal Services Dhaka',
    titleBn: 'ই-লয়ার্স বাংলাদেশ | কর্পোরেট, আরজেএসসি ও আইপি আইনি সেবা ঢাকা',
    descEn: 'Leading corporate legal firm in Bangladesh specializing in RJSC company registration, trademark IP protection, annual returns, and secretarial compliance.',
    descBn: 'বাংলাদেশে বিশ্বস্ত আরজেএসসি কোম্পানি রেজিস্ট্রেশন, ট্রেডমার্ক আইনি সেবা ও সিক্রেটারিয়াল কমপ্লায়েন্স কনসালট্যান্ট।',
    keywordsEn: 'Corporate Lawyers Bangladesh, RJSC Company Registration Dhaka, Trademark Lawyer, Company Secretary Bangladesh',
    keywordsBn: 'কর্পোরেট আইনজীবী ঢাকা, আরজেএসসি রেজিস্ট্রেশন, কোম্পানি আইন সেবা, ট্রেডমার্ক নিবন্ধন'
  },
  'rjsc-services': {
    titleEn: 'RJSC Services & Fast-Track Company Registration | E-Lawyers Bangladesh',
    titleBn: 'আরজেএসসি সেবা ও দ্রুততম কোম্পানি নিবন্ধন | ই-লয়ার্স বাংলাদেশ',
    descEn: 'Professional RJSC incorporation for Private Limited, OPC, and Foreign Joint Ventures. Filing Form VIII, Form XV, Form IX & Form XII in Bangladesh.',
    descBn: 'বাংলাদেশে আরজেএসসি প্রাইভেট লিমিটেড কোম্পানি নিবন্ধন, শেয়ার হস্তান্তর, ফরম ১৫ ও রিটার্ন ফাইল সেবা।',
    keywordsEn: 'RJSC Registration, Form VIII Filing, Form XII Director Change, Private Limited Incorporation Bangladesh',
    keywordsBn: 'আরজেএসসি ফরম ১২, ফরম ১৫, প্রাইভেট লিমিটেড নিবন্ধন, শেয়ার মূলধন বৃদ্ধি'
  },
  'ip-services': {
    titleEn: 'Trademark & Intellectual Property Rights (DPDT) | E-Lawyers',
    titleBn: 'ট্রেডমার্ক ও বুদ্ধিবৃত্তিক সম্পদ আইনি সুরক্ষা (ডিপিডিটি) | ই-লয়ার্স',
    descEn: 'Comprehensive trademark registration, copyright filing, brand defense, and IP litigation under Bangladesh DPDT authority.',
    descBn: 'ডিপিডিটি বাংলাদেশে ব্র্যান্ড পেটেন্ট, কপিরাইট ও ট্রেডমার্ক রেজিস্ট্রেশন আইনি সেবা।',
    keywordsEn: 'Trademark Registration Bangladesh, DPDT Copyright Filing, IP Lawyer Dhaka, Patent Attorney',
    keywordsBn: 'ট্রেডমার্ক রেজিস্ট্রি বাংলাদেশ, ব্র্যান্ড কপিরাইট, ডিপিডিটি ফাইল'
  },
  secretarial: {
    titleEn: 'Company Secretarial & Governance Compliance | E-Lawyers Bangladesh',
    titleBn: 'কোম্পানি সিক্রেটারিয়াল ও গভর্নেন্স কমপ্লায়েন্স | ই-লয়ার্স',
    descEn: 'Board resolution drafting, AGM Schedule X, ICAB DVS audit coordination, and Bangladesh statutory corporate governance.',
    descBn: 'কোম্পানি বোর্ড রেজুলেশন, এজিএম শিডিউল এক্স ও আইসিএবি ডিভিএস অডিট ফাইল সহায়তা।',
    keywordsEn: 'Company Secretary Dhaka, AGM Notice Schedule X, Corporate Governance Bangladesh, Board Resolution',
    keywordsBn: 'কোম্পানি সিক্রেটারি, এজিএম নোটিশ, বোর্ড রেজুলেশন, ডিভিএস অডিট'
  },
  'compliance-calendar': {
    titleEn: 'Bangladesh Statutory Compliance Calendar 2026 | E-Lawyers',
    titleBn: 'বাংলাদেশ সংবিধিবদ্ধ কমপ্লায়েন্স ক্যালেন্ডার ২০২৬ | ই-লয়ার্স',
    descEn: 'Stay compliant with RJSC annual filing cutoffs, NBR VAT/Tax deadlines, and BIDA foreign remittance statutory calendar with email alerts.',
    descBn: 'আরজেএসসি বার্ষিক রিটার্ন, এনবিআর ভ্যাট/ট্যাক্স ও বিডা রেমিট্যান্স সংবিধিবদ্ধ সময়সীমা ক্যালেন্ডার।',
    keywordsEn: 'RJSC Deadline Calendar 2026, NBR Corporate Tax Day, Statutory Filing Bangladesh, Compliance Reminder',
    keywordsBn: 'আরজেএসসি ডেডলাইন ক্যালেন্ডার, এনবিআর ট্যাক্স ডে, সংবিধিবদ্ধ সময়সীমা'
  },
  'client-dashboard': {
    titleEn: 'Secure Client RJSC Status Tracker & Document Vault | E-Lawyers',
    titleBn: 'ক্লায়েন্ট আরজেএসসি ট্র্যাকার ও এনক্রিপ্টেড ডকুমেন্ট ভল্ট | ই-লয়ার্স',
    descEn: 'Real-time 4-stage tracking for RJSC corporate filings, Form XV/XII progress bar, and 256-bit SSL Firebase document vault.',
    descBn: 'আরজেএসসি ফাইলিং রিয়েল-টাইম ট্র্যাকিং ও এনক্রিপ্টেড ক্লায়েন্ট ডকুমেন্ট ভল্ট।',
    keywordsEn: 'RJSC Tracking Status, Legal Document Vault, Filing Stage Progress Bar, Corporate Portal',
    keywordsBn: 'আরজেএসসি ফাইলিং ট্র্যাকার, আইনি ডকুমেন্ট ভল্ট, স্টেপ প্রোগ্রেস'
  },
  'compliance-newsfeed': {
    titleEn: 'Bangladesh Corporate Legal Gazette & Regulatory Updates | E-Lawyers',
    titleBn: 'বাংলাদেশ কর্পোরেট আইনি নিউজফিড ও গেজেট আপডেট | ই-লয়ার্স',
    descEn: 'Latest statutory notifications from RJSC, NBR Tax Circle, BIDA FDI policies, and Bangladesh Gazette legal notices.',
    descBn: 'আরজেএসসি, এনবিআর ট্যাক্স সার্কেল ও বিডা রেগুলেশন সম্পর্কিত সর্বশেষ আইনি বুলেটিন।',
    keywordsEn: 'Bangladesh Gazette Legal News, Corporate Law Updates Dhaka, RJSC Circulars, NBR VAT Amendments',
    keywordsBn: 'বাংলাদেশ গেজেট বুলেটিন, আরজেএসসি সার্কুলার, এনবিআর ভ্যাট আইন'
  },
  'coverage-map': {
    titleEn: 'Nationwide Legal Coverage Across 64 Bangladesh Districts | E-Lawyers',
    titleBn: 'দেশব্যাপী ৬৪ জেলায় আইনি সহায়তা নেটওয়ার্ক | ই-লয়ার্স',
    descEn: 'Supreme Court advocates and district court legal representatives across Dhaka, Chittagong, Sylhet, Rajshahi, and all 64 districts.',
    descBn: 'সুপ্রিম কোর্ট ও জেলা জজ কোর্টে ঢাকা, চট্টগ্রাম, সিলেট সহ ৬৪ জেলায় আইনি নেটওয়ার্ক।',
    keywordsEn: 'Supreme Court Advocate Dhaka, Bangladesh District Court Lawyer, 64 Districts Legal Coverage',
    keywordsBn: 'সুপ্রিম কোর্ট আইনজীবী, ৬৪ জেলায় জেলা জজ কোর্ট আইনি সেবা'
  },
  contact: {
    titleEn: 'Book Lawyer Consultation | E-Lawyers Corporate Office Gulshan Dhaka',
    titleBn: 'আইনি পরামর্শ বুকিং ও গুলশান অফিস যোগাযোগ | ই-লয়ার্স',
    descEn: 'Schedule in-person or virtual corporate legal consultations with senior advocates at Gulshan-2, Dhaka.',
    descBn: 'গুলশান-২ ঢাকা অফিসে প্রবীণ আইনজীবীদের সাথে ইন-পার্সন বা অনলাইন পরামর্শ অ্যাপয়েন্টমেন্ট বুকিং।',
    keywordsEn: 'Book Corporate Lawyer Dhaka, Legal Consultation Gulshan, Advocate Appointment Bangladesh',
    keywordsBn: 'আইনজীবী অ্যাপয়েন্টমেন্ট বুকিং, গুলশান আইনি পরামর্শ, অ্যাডভোকেট চ্যাম্বার'
  }
};

export const SeoHead: React.FC<SeoHeadProps> = ({ activeSection, currentLanguage }) => {
  const isBn = currentLanguage === 'BN';
  const meta = SECTION_SEO_MAP[activeSection] || SECTION_SEO_MAP.hero;

  const pageTitle = isBn ? meta.titleBn : meta.titleEn;
  const pageDesc = isBn ? meta.descBn : meta.descEn;
  const pageKeywords = isBn ? meta.keywordsBn : meta.keywordsEn;

  const canonicalUrl = 'https://e-lawyers.com.bd';
  const ogImageUrl = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200';

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDesc} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="author" content="E-Lawyers Corporate Legal Consultants Bangladesh" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content={isBn ? 'Bengali' : 'English'} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook / LinkedIn Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:site_name" content="E-Lawyers Bangladesh" />
      <meta property="og:locale" content={isBn ? 'bn_BD' : 'en_US'} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      <meta name="twitter:image" content={ogImageUrl} />
    </Helmet>
  );
};
