export type BusinessType =
  | 'Startup'
  | 'Startups'
  | 'Private Limited Company'
  | 'Private Limited Companies'
  | 'One Person Company (OPC)'
  | 'One Person Companies (OPC)'
  | 'Foreign Company'
  | 'Foreign Companies'
  | 'Joint Venture'
  | 'Joint Ventures'
  | 'NGO'
  | 'NGOs'
  | 'Partnership Firm'
  | 'Partnership Firms'
  | 'Manufacturing Company'
  | 'Manufacturing Companies'
  | 'IT & Software Company'
  | 'IT & Software Companies'
  | 'Trading Company'
  | 'Trading Companies'
  | 'E-commerce Business'
  | 'E-commerce Businesses'
  | 'Investment Company'
  | 'Investment Companies';

export interface RjscService {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  keyIncludes: string[];
  requiredDocuments: string[];
  estimatedTime: string;
  category: 'rjsc' | 'ip' | 'secretarial' | 'governance';
  tagKeywords: string[];
  imageUrl?: string;
}

export interface IndustryCategory {
  title: string;
  description: string;
  iconName: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ConsultationRequest {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  companyType: string;
  serviceCategory: string;
  specificRequirements: string;
  preferredCallbackTime: string;
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedAction?: string;
}

export interface ComplianceCalculatorResult {
  estimatedTime: string;
  complexity: 'Low' | 'Medium' | 'High';
  statutoryForms: string[];
  requiredDocs: string[];
  keySteps: string[];
  estimatedGovtFeeRange: string;
  estimatedLegalFeeRange: string;
  riskIfDelayed: string;
}
