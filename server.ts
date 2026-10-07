import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Memory store for consultations
const consultationsStore: Array<{
  id: string;
  createdAt: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  companyType: string;
  serviceCategory: string;
  specificRequirements: string;
  preferredCallbackTime: string;
  status: 'Pending Review' | 'Contacted' | 'Completed';
}> = [];

// Initialize Gemini SDK lazily / safely
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// Health Check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "E-Lawyers Corporate Legal Services API" });
});

// Consultation Submission API
app.post("/api/consultation", (req, res) => {
  try {
    const {
      fullName,
      companyName,
      email,
      phone,
      companyType,
      serviceCategory,
      specificRequirements,
      preferredCallbackTime
    } = req.body;

    if (!fullName || !phone) {
      return res.status(400).json({ error: "Full Name and Phone Number are required." });
    }

    const newTicket = {
      id: `ELAW-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      fullName,
      companyName: companyName || 'N/A',
      email: email || 'N/A',
      phone,
      companyType: companyType || 'Private Limited Company',
      serviceCategory: serviceCategory || 'General RJSC Compliance',
      specificRequirements: specificRequirements || '',
      preferredCallbackTime: preferredCallbackTime || 'As soon as possible',
      status: 'Pending Review' as const
    };

    consultationsStore.unshift(newTicket);

    res.json({
      success: true,
      ticket: newTicket,
      message: "Your consultation request has been submitted successfully! A corporate lawyer from E-Lawyers will contact you shortly."
    });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || "Internal server error" });
  }
});

// Get Consultations List (for live preview status)
app.get("/api/consultations", (_req, res) => {
  res.json({ consultations: consultationsStore });
});

// AI Legal Assistant API
app.post("/api/ai-consultant", async (req, res) => {
  try {
    const { prompt, history } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Fallback response if GEMINI_API_KEY is missing
      return res.json({
        answer: "Thank you for reaching out to E-Lawyers. To get immediate human legal expert assistance regarding RJSC compliance, company registration, share transfers, or trademark filing in Bangladesh, please call us directly at +88 01335230170-81 or email info@elawyersbd.com."
      });
    }

    const systemInstruction = `You are the official AI Corporate Legal Consultant for "E-Lawyers", a premier Legal & Business Consultancy Firm in Dhaka, Bangladesh (Office: G-5, BTI Centara Grand, Panthapath, Dhaka-1205. Phone: +88 01335230170-81, Email: info@elawyersbd.com).

Your expertise covers:
1. Bangladesh Companies Act 1994 and RJSC (Registrar of Joint Stock Companies and Firms) procedures.
2. RJSC Annual Return Filing (Form VIII, Schedule X), Director Appointment & Resignation (Form XII, Form IX), Share Transfer (Form 117, SPA), Authorized/Paid-Up Capital Increase (Form IV, Form VI, Form XV).
3. Company Name Change, MOA & AOA Amendments, Company Winding Up & Closure, Director Removal (Section 106).
4. Intellectual Property: Trademark Registration Bangladesh (Trademarks Act 2009, Form TM-1) & Copyright Registration Bangladesh.
5. Company Secretarial Services: Board Resolutions, AGM Documentation, Share Register & Statutory Registers Maintenance.
6. Foreign Investors, Foreign Directors, BIDA compliance, and Inward Remittance Encashment Certificates.
7. Partnership Firm Registration (Form A), Modification (Form B), and Dissolution (Form C).

Tone: Professional, authoritative, helpful, clear, and reassuring.
Guidelines:
- Provide concise, legally accurate answers according to Bangladesh corporate law.
- State required RJSC forms, typical timelines, and essential documents when relevant.
- Encourage users to book a free consultation with E-Lawyers corporate lawyers for execution and official representation.
- Maintain formatting with clean bullet points.`;

    const model = "gemini-3.6-flash";
    
    // Construct conversation input
    let fullPrompt = prompt;
    if (history && Array.isArray(history) && history.length > 0) {
      const historyContext = history.map((h: any) => `${h.sender === 'user' ? 'Client' : 'E-Lawyers Lawyer'}: ${h.text}`).join('\n');
      fullPrompt = `Previous Conversation:\n${historyContext}\n\nCurrent Client Query: ${prompt}`;
    }

    const response = await ai.models.generateContent({
      model,
      contents: fullPrompt,
      config: {
        systemInstruction,
        temperature: 0.3,
      }
    });

    const answer = response.text || "Thank you for contacting E-Lawyers. Please speak directly with our senior corporate lawyers at +88 01335230170-81 for detailed case guidance.";

    res.json({ answer });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(500).json({ 
      error: "Unable to process legal inquiry at the moment.", 
      details: error?.message || String(error)
    });
  }
});

// Compliance Newsfeed & Statutory Circulars API
app.get("/api/compliance-news", (_req, res) => {
  const newsItems = [
    {
      id: "cir-2026-08",
      title: "RJSC Mandatory Digitization & Online Digital Signature Verification for Form XII",
      source: "Registrar of Joint Stock Companies & Firms (RJSC)",
      date: "July 28, 2026",
      category: "rjsc",
      urgency: "High Impact",
      summary: "RJSC Ministry of Commerce issued Circular No. RJSC/DC/2026/04 enforcing mandatory digital signature certificates (DSC) for all incoming and outgoing director appointment forms (Form XII & Form IX). Manual paper filings for director changes will no longer be accepted.",
      keyTakeaways: [
        "All Private Limited Companies must obtain e-Signatures for managing directors before submitting Form XII.",
        "Foreign directors can verify credentials via Embassy notarization or certified BIDA portal integration.",
        "Processing time reduced from 7 days to 48 hours for verified online filings."
      ],
      affectedEntities: ["Private Limited Companies", "Public Limited Companies", "OPCs"],
      officialReference: "Circular No. RJSC/DC/2026/04",
      link: "https://www.roc.gov.bd"
    },
    {
      id: "cir-2026-07",
      title: "NBR Income Tax Act Amendment: Annual Audited Financial Statement Filings for Private Limited Entities",
      source: "National Board of Revenue (NBR) & FRC",
      date: "July 20, 2026",
      category: "tax_vat",
      urgency: "Gazette Notice",
      summary: "The Financial Reporting Council (FRC) in coordination with NBR has updated the mandatory DVS (Document Verification System) code integration rules for RJSC Schedule X Annual Returns.",
      keyTakeaways: [
        "Audited accounts submitted with RJSC Form VIII must carry an active 18-digit DVS Code from ICAB.",
        "Mismatches between NBR Tax Returns and RJSC Financial Statements will trigger automated audit flags.",
        "Penalty waiver offered for backlogged returns filed before September 30, 2026."
      ],
      affectedEntities: ["Private Limited Companies", "Foreign Subsidiaries"],
      officialReference: "NBR S.R.O. No. 182-Law/Tax/2026",
      link: "https://nbr.gov.bd"
    },
    {
      id: "cir-2026-06",
      title: "BIDA Simplified Royalty & Foreign Technical Assistance Fee Remittance Circular",
      source: "Bangladesh Investment Development Authority (BIDA)",
      date: "July 12, 2026",
      category: "bida_fdi",
      urgency: "Circular",
      summary: "BIDA has relaxed outward remittance approval caps for technical know-how, franchise fees, and software license royalties for foreign joint ventures operating in Bangladesh.",
      keyTakeaways: [
        "Automatic approval threshold raised to 6% of net sales for manufacturing technical fees.",
        "Simplified Form XII & BIDA inward encashment verification required at AD Bank level.",
        "Expedited 5-day clearance for registered IT export & software development entities."
      ],
      affectedEntities: ["Foreign Joint Ventures", "Foreign Branch Offices", "IT Scaleups"],
      officialReference: "BIDA FE Circular No. 14/2026",
      link: "https://bida.gov.bd"
    },
    {
      id: "cir-2026-05",
      title: "DPDT Electronic Trademark Filing System & Expedited Opposition Timeline",
      source: "Department of Patents, Designs and Trademarks (DPDT)",
      date: "July 02, 2026",
      category: "ip_laws",
      urgency: "Circular",
      summary: "DPDT has upgraded the e-Trademark portal to reduce Form TM-1 examination turnaround time to 30 working days.",
      keyTakeaways: [
        "Online TM-1 applications receive instant official filing numbers and priority receipt.",
        "Opposition period strictly enforced at 2 months from Journal publication.",
        "Fast-track processing enabled for well-known foreign marks and corporate brand portfolios."
      ],
      affectedEntities: ["All Corporate Brand Owners", "E-Commerce", "Pharma"],
      officialReference: "DPDT IP Bulletin No. 89/2026",
      link: "https://dpdt.gov.bd"
    },
    {
      id: "cir-2026-04",
      title: "Revised Companies Act Guidelines: One Person Company (OPC) Governance & Nominee Directorship",
      source: "Ministry of Commerce - Govt. of Bangladesh",
      date: "June 25, 2026",
      category: "rjsc",
      urgency: "Amnesty",
      summary: "Clarifications issued on section 392A regarding nominee director succession and conversion of OPCs into multi-shareholder Private Limited Companies upon capital expansion.",
      keyTakeaways: [
        "OPCs exceeding ৳50 Million paid-up capital must convert to Private Limited within 180 days.",
        "Simplified nominee replacement process introduced via electronic Form IX filing.",
        "Nominees are granted zero personal tax liability during transition periods."
      ],
      affectedEntities: ["One Person Companies (OPC)", "Sole Entrepreneurs"],
      officialReference: "MoC Gazette Extra. June 2026",
      link: "https://mincom.gov.bd"
    }
  ];

  res.json({ news: newsItems, total: newsItems.length });
});

async function startServer() {
  // Vite middleware in development mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
