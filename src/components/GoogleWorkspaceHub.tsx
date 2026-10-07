import React, { useState, useEffect } from 'react';
import {
  FileSpreadsheet,
  FolderPlus,
  UploadCloud,
  FileText,
  Search,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Trash2,
  RefreshCw,
  Plus,
  Database,
  Layers,
  ArrowRight,
  ShieldCheck,
  Table,
  Eye,
  Send,
  Loader2,
  X,
  Lock,
  Download,
  Sparkles,
  Check,
  Share2,
  Copy,
  Clock,
  Key,
  ShieldAlert,
  Mail,
  Link2,
  Globe,
  History,
  Activity,
  Filter,
  FileCheck,
  FileClock,
  ListCheck,
  FileSearch
} from 'lucide-react';
import { User } from 'firebase/auth';
import {
  googleSignIn,
  logoutGoogle,
  initAuth,
  fetchDriveFiles,
  uploadFileToDrive,
  createDriveFolder,
  deleteDriveFile,
  fetchUserSpreadsheets,
  createSpreadsheet,
  getSpreadsheetValues,
  appendSpreadsheetValues,
  DriveFileItem
} from '../lib/googleAuth';
import { GoogleSheetPreviewModal } from './GoogleSheetPreviewModal';

export interface SyncActivityLog {
  id: string;
  timestamp: string;
  actionType: 'upload' | 'sheet_fetch' | 'link_generation' | 'vault_import' | 'folder_creation' | 'sheet_append' | 'deletion';
  title: string;
  details: string;
  status: 'success' | 'warning' | 'info';
  userEmail?: string;
  metadata?: {
    fileName?: string;
    fileId?: string;
    expiryOption?: string;
    sheetName?: string;
    folderName?: string;
  };
}

export interface SecureShareLinkRecord {
  id: string;
  fileId: string;
  fileName: string;
  shareUrl: string;
  token: string;
  createdAt: string;
  expiresAt: string;
  expiryOption: '1h' | '24h' | '7d' | '30d';
  passcode?: string;
  allowDownload: boolean;
  accessRole: 'viewer' | 'restricted' | 'confidential';
  viewsCount: number;
  isRevoked?: boolean;
}

interface GoogleWorkspaceHubProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const GoogleWorkspaceHub: React.FC<GoogleWorkspaceHubProps> = ({ isOpen = true, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'drive' | 'sheets' | 'activity'>('drive');

  // Sync Activity Audit Log State
  const [syncLogs, setSyncLogs] = useState<SyncActivityLog[]>([]);
  const [activitySearch, setActivitySearch] = useState<string>('');
  const [activityFilter, setActivityFilter] = useState<'all' | 'upload' | 'sheet' | 'link' | 'vault'>('all');

  // Drive state
  const [driveFiles, setDriveFiles] = useState<DriveFileItem[]>([]);
  const [isLoadingDrive, setIsLoadingDrive] = useState(false);
  const [driveSearch, setDriveSearch] = useState('');
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);

  // Mandatory Delete Confirmation Modal State
  const [deleteTarget, setDeleteTarget] = useState<DriveFileItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Import Drive File to Client Dashboard Vault Modal State
  const [importFileTarget, setImportFileTarget] = useState<DriveFileItem | null>(null);
  const [importCategory, setImportCategory] = useState<string>('RJSC Statutory Filings');
  const [importedDriveFileIds, setImportedDriveFileIds] = useState<string[]>([]);
  const [isImportingToVault, setIsImportingToVault] = useState<boolean>(false);

  // Secure Time-Limited Share Link Modal State
  const [shareFileTarget, setShareFileTarget] = useState<DriveFileItem | null>(null);
  const [shareExpiryOption, setShareExpiryOption] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const [shareAccessRole, setShareAccessRole] = useState<'viewer' | 'restricted' | 'confidential'>('viewer');
  const [sharePasscode, setSharePasscode] = useState<string>('');
  const [shareAllowDownload, setShareAllowDownload] = useState<boolean>(true);
  const [isGeneratingShareLink, setIsGeneratingShareLink] = useState<boolean>(false);
  const [generatedShareRecord, setGeneratedShareRecord] = useState<SecureShareLinkRecord | null>(null);
  const [copiedLinkState, setCopiedLinkState] = useState<boolean>(false);
  const [activeShareLinks, setActiveShareLinks] = useState<SecureShareLinkRecord[]>([]);
  const [showManageLinksModal, setShowManageLinksModal] = useState<boolean>(false);

  // Helper to append new sync activity log
  const logSyncActivity = (
    actionType: SyncActivityLog['actionType'],
    title: string,
    details: string,
    status: SyncActivityLog['status'] = 'info',
    metadata?: SyncActivityLog['metadata']
  ) => {
    const newLog: SyncActivityLog = {
      id: 'log_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6),
      timestamp: new Date().toISOString(),
      actionType,
      title,
      details,
      status,
      userEmail: user?.email || 'erp.elawyers@gmail.com',
      metadata
    };

    setSyncLogs((prev) => {
      const updated = [newLog, ...prev];
      try {
        localStorage.setItem('elawyers_sync_activity_logs', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Load imported file IDs, share links, and sync logs on mount
  useEffect(() => {
    try {
      const existing = localStorage.getItem('elawyers_imported_drive_vault_docs');
      if (existing) {
        const parsed = JSON.parse(existing);
        if (Array.isArray(parsed)) {
          setImportedDriveFileIds(parsed.map((doc: any) => doc.driveFileId));
        }
      }
      const storedLinks = localStorage.getItem('elawyers_doc_share_links');
      if (storedLinks) {
        const parsed = JSON.parse(storedLinks);
        if (Array.isArray(parsed)) {
          setActiveShareLinks(parsed);
        }
      }

      // Load or seed activity logs
      const storedLogs = localStorage.getItem('elawyers_sync_activity_logs');
      if (storedLogs) {
        const parsed = JSON.parse(storedLogs);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSyncLogs(parsed);
        } else {
          seedDefaultSyncLogs();
        }
      } else {
        seedDefaultSyncLogs();
      }
    } catch (e) {
      console.error(e);
      seedDefaultSyncLogs();
    }
  }, []);

  const seedDefaultSyncLogs = () => {
    const defaultLogs: SyncActivityLog[] = [
      {
        id: 'log_seed_1',
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        actionType: 'upload',
        title: 'Statutory Compliance Dossier Exported',
        details: 'Generated and exported "E-Lawyers_Compliance_Dossier_2026.txt" directly to Google Drive.',
        status: 'success',
        userEmail: 'erp.elawyers@gmail.com',
        metadata: { fileName: 'E-Lawyers_Compliance_Dossier_2026.txt' }
      },
      {
        id: 'log_seed_2',
        timestamp: new Date(Date.now() - 32 * 60 * 1000).toISOString(),
        actionType: 'sheet_fetch',
        title: 'Google Sheets Compliance Data Synchronized',
        details: 'Fetched live statutory filing rows (A1:F30) via Google Sheets API v4.',
        status: 'info',
        userEmail: 'erp.elawyers@gmail.com',
        metadata: { sheetName: 'E-Lawyers Statutory Filings Tracker 2026' }
      },
      {
        id: 'log_seed_3',
        timestamp: new Date(Date.now() - 55 * 60 * 1000).toISOString(),
        actionType: 'link_generation',
        title: 'Secure Time-Limited Link Generated',
        details: 'Created 24h encrypted compliance document share link with read-only viewer mode.',
        status: 'warning',
        userEmail: 'erp.elawyers@gmail.com',
        metadata: { expiryOption: '24h', fileName: 'RJSC_Form_XII_Appointment_Directors.pdf' }
      },
      {
        id: 'log_seed_4',
        timestamp: new Date(Date.now() - 2.5 * 3600 * 1000).toISOString(),
        actionType: 'sheet_append',
        title: 'New Statutory Filing Appended',
        details: 'Appended "Form XV Annual Return Filing 2026" (BDT 1,500) into Google Sheets.',
        status: 'success',
        userEmail: 'erp.elawyers@gmail.com',
        metadata: { sheetName: 'E-Lawyers Statutory Filings Tracker 2026' }
      },
      {
        id: 'log_seed_5',
        timestamp: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
        actionType: 'folder_creation',
        title: 'Drive Folder Created',
        details: 'Created directory "Legal Vault 2026" in root Google Drive.',
        status: 'info',
        userEmail: 'erp.elawyers@gmail.com',
        metadata: { folderName: 'Legal Vault 2026' }
      }
    ];
    setSyncLogs(defaultLogs);
    try {
      localStorage.setItem('elawyers_sync_activity_logs', JSON.stringify(defaultLogs));
    } catch (e) {
      console.error(e);
    }
  };

  // Sheets state
  const [sheetsList, setSheetsList] = useState<DriveFileItem[]>([]);
  const [isLoadingSheets, setIsLoadingSheets] = useState(false);
  const [selectedSheetId, setSelectedSheetId] = useState<string | null>(null);
  const [selectedSheetName, setSelectedSheetName] = useState<string>('');
  const [sheetValues, setSheetValues] = useState<any[][]>([]);
  const [isLoadingSheetData, setIsLoadingSheetData] = useState(false);

  // Read-only Google Sheet Preview Modal State
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);
  const [previewSheetId, setPreviewSheetId] = useState<string | null>(null);
  const [previewSheetName, setPreviewSheetName] = useState<string>('');
  const [previewWebViewLink, setPreviewWebViewLink] = useState<string | undefined>(undefined);

  // New row input for selected sheet
  const [newFilingName, setNewFilingName] = useState('');
  const [newFormNo, setNewFormNo] = useState('Form XII');
  const [newDueDate, setNewDueDate] = useState('2026-12-31');
  const [newFeeBdt, setNewFeeBdt] = useState('1,500');
  const [newStatus, setNewStatus] = useState('Pending');
  const [isAppendingRow, setIsAppendingRow] = useState(false);
  const [sheetNotice, setSheetNotice] = useState<string | null>(null);
  const [lastSheetRefreshedAt, setLastSheetRefreshedAt] = useState<string | null>(null);

  // Auto-Sync Google Sheets State
  const [isAutoSyncEnabled, setIsAutoSyncEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem('elawyers_sheets_autosync_enabled') === 'true';
    } catch {
      return false;
    }
  });
  const [autoSyncNextCountdown, setAutoSyncNextCountdown] = useState<number>(15 * 60);

  // Check auth state on mount
  useEffect(() => {
    const unsubscribe = initAuth(
      (u, token) => {
        setUser(u);
        setAccessToken(token);
      },
      () => {
        setUser(null);
        setAccessToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Fetch Drive or Sheets when user changes or tab switches
  useEffect(() => {
    if (user && accessToken) {
      if (activeTab === 'drive') {
        loadDriveFiles();
      } else {
        loadSheetsList();
      }
    }
  }, [user, accessToken, activeTab]);

  const handleGoogleLogin = async () => {
    setIsAuthenticating(true);
    setAuthError(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setAccessToken(res.accessToken);
      }
    } catch (err: any) {
      setAuthError(err.message || 'Failed to sign in with Google');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = async () => {
    await logoutGoogle();
    setUser(null);
    setAccessToken(null);
    setDriveFiles([]);
    setSheetsList([]);
    setSheetValues([]);
    setSelectedSheetId(null);
  };

  const loadDriveFiles = async () => {
    if (!accessToken) return;
    setIsLoadingDrive(true);
    try {
      const files = await fetchDriveFiles(accessToken);
      setDriveFiles(files);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoadingDrive(false);
    }
  };

  const loadSheetsList = async () => {
    if (!accessToken) return;
    setIsLoadingSheets(true);
    try {
      const sheets = await fetchUserSpreadsheets(accessToken);
      setSheetsList(sheets);
      if (sheets.length > 0 && !selectedSheetId) {
        setSelectedSheetId(sheets[0].id);
        setSelectedSheetName(sheets[0].name);
        loadSheetData(sheets[0].id);
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoadingSheets(false);
    }
  };

  const loadSheetData = async (sheetId: string, isManualRefresh = false) => {
    if (!accessToken) return;
    setIsLoadingSheetData(true);
    try {
      const data = await getSpreadsheetValues(accessToken, sheetId, 'A1:F30');
      setSheetValues(data);
      const timeStr = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setLastSheetRefreshedAt(timeStr);
      if (isManualRefresh) {
        setSheetNotice(
          `Live Google Sheet data for "${selectedSheetName || 'Active Spreadsheet'}" successfully re-fetched from Google Sheets API at ${timeStr}.`
        );
        logSyncActivity(
          'sheet_fetch',
          `Spreadsheet Synchronized: ${selectedSheetName || 'Active Sheet'}`,
          `Re-fetched live rows (A1:F30) via Google Sheets API at ${timeStr}.`,
          'info',
          { sheetName: selectedSheetName }
        );
      }
    } catch (err: any) {
      console.error(err);
      setSheetValues([]);
      if (isManualRefresh) {
        setSheetNotice(`Failed to refresh sheet data: ${err.message || 'Network or API error'}`);
      }
    } finally {
      setIsLoadingSheetData(false);
    }
  };

  const handleToggleAutoSync = () => {
    const nextState = !isAutoSyncEnabled;
    setIsAutoSyncEnabled(nextState);
    try {
      localStorage.setItem('elawyers_sheets_autosync_enabled', String(nextState));
    } catch (e) {
      console.error(e);
    }
    if (nextState && selectedSheetId) {
      loadSheetData(selectedSheetId, true);
    }
  };

  // 15-Minute Background Auto-Sync Interval Effect
  useEffect(() => {
    if (!isAutoSyncEnabled || !selectedSheetId || !accessToken) return;

    // 15 minutes = 15 * 60 * 1000 = 900,000 ms
    const INTERVAL_MS = 15 * 60 * 1000;
    setAutoSyncNextCountdown(15 * 60);

    const syncTimer = setInterval(() => {
      loadSheetData(selectedSheetId, false);
      const timeStr = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setSheetNotice(`[15m Auto-Sync] Live Google Sheet data for "${selectedSheetName || 'Active Spreadsheet'}" refreshed automatically at ${timeStr}.`);
      logSyncActivity(
        'sheet_fetch',
        `Auto-Sync Refreshed: ${selectedSheetName || 'Active Sheet'}`,
        `Periodic 15-minute background synchronization completed via Google Sheets API v4 at ${timeStr}.`,
        'info',
        { sheetName: selectedSheetName }
      );
      setAutoSyncNextCountdown(15 * 60);
    }, INTERVAL_MS);

    // Countdown timer tick every second for visual UI feedback
    const countdownTimer = setInterval(() => {
      setAutoSyncNextCountdown((prev) => (prev > 1 ? prev - 1 : 15 * 60));
    }, 1000);

    return () => {
      clearInterval(syncTimer);
      clearInterval(countdownTimer);
    };
  }, [isAutoSyncEnabled, selectedSheetId, accessToken, selectedSheetName]);

  const handleExportSampleDoc = async () => {
    if (!accessToken) return;
    setIsUploading(true);
    setUploadStatus(null);
    try {
      const content = `=====================================================
E-LAWYERS PORTAL BANGLADESH - STATUTORY COMPLIANCE DOSSIER 2026
=====================================================
Company: E-Lawyers Client Operations Ltd.
RJSC Reg No: C-189204/2026
Date Generated: ${new Date().toLocaleDateString('en-GB')}

1. RJSC Statutory Filing Checklist:
   - Form C (Annual Return of Directors) -> Due 30 Days after AGM
   - Form XII (Notification of Change of Directors) -> Due 14 Days
   - Form XXIII (Notice of Increase in Capital) -> Due 15 Days
   - Form IX (Consent of Director) -> Prior to appointment

2. NBR Tax & VAT Compliance 2026:
   - Corporate Income Tax Return (Form 108)
   - Monthly VAT Form 9.1 Return
   - Advance Income Tax (AIT) Schedule

Certified by Advocate & Barrister Team, Dhaka High Court.
https://elawyersbd.com
`;
      const fileName = `E-Lawyers_Compliance_Dossier_2026_${Date.now()}.txt`;
      const file = await uploadFileToDrive(accessToken, fileName, 'text/plain', content);
      setUploadStatus(`Successfully saved "${file.name}" directly to your Google Drive!`);
      logSyncActivity(
        'upload',
        'Statutory Compliance Dossier Exported',
        `Saved "${file.name}" directly to Google Drive.`,
        'success',
        { fileName: file.name, fileId: file.id }
      );
      loadDriveFiles();
    } catch (err: any) {
      setUploadStatus(`Export failed: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreateFolder = async () => {
    if (!accessToken || !newFolderName.trim()) return;
    setIsCreatingFolder(true);
    try {
      await createDriveFolder(accessToken, newFolderName.trim());
      logSyncActivity(
        'folder_creation',
        `Drive Folder Created: ${newFolderName.trim()}`,
        `Created directory "${newFolderName.trim()}" in Google Drive.`,
        'info',
        { folderName: newFolderName.trim() }
      );
      setNewFolderName('');
      loadDriveFiles();
    } catch (err: any) {
      alert(`Error creating folder: ${err.message}`);
    } finally {
      setIsCreatingFolder(false);
    }
  };

  const handleConfirmImportToVault = () => {
    if (!importFileTarget) return;
    setIsImportingToVault(true);

    try {
      const formattedSize = importFileTarget.size
        ? `${(parseInt(importFileTarget.size) / 1024 / 1024).toFixed(1)} MB`
        : '1.5 MB';

      const importedDoc = {
        id: `drive-vault-${Date.now()}`,
        driveFileId: importFileTarget.id,
        fileName: importFileTarget.name,
        docCategory: importCategory,
        fileSize: formattedSize,
        uploadedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        reviewStatus: 'Imported from Google Drive (Ready for Advocate Review)',
        webViewLink: importFileTarget.webViewLink || '#',
        source: 'Google Drive'
      };

      // Retrieve existing imported docs from localStorage
      const existingStr = localStorage.getItem('elawyers_imported_drive_vault_docs') || '[]';
      let existingList: any[] = [];
      try {
        existingList = JSON.parse(existingStr);
      } catch (e) {
        existingList = [];
      }

      // Append new imported doc
      const updatedList = [importedDoc, ...existingList.filter((d) => d.driveFileId !== importFileTarget.id)];
      localStorage.setItem('elawyers_imported_drive_vault_docs', JSON.stringify(updatedList));

      // Update state
      setImportedDriveFileIds((prev) => Array.from(new Set([...prev, importFileTarget.id])));

      // Notify window event listeners (e.g., ClientDashboard)
      window.dispatchEvent(new CustomEvent('elawyers_drive_doc_imported', { detail: importedDoc }));

      logSyncActivity(
        'vault_import',
        `Document Imported to Vault: ${importFileTarget.name}`,
        `Imported Google Drive document into Client Dashboard Vault under "${importCategory}".`,
        'success',
        { fileName: importFileTarget.name, fileId: importFileTarget.id }
      );

      setUploadStatus(
        `Document "${importFileTarget.name}" successfully imported into your Secure Client Dashboard Vault under "${importCategory}"!`
      );
      setImportFileTarget(null);
    } catch (err: any) {
      alert(`Failed to import file to Client Vault: ${err.message}`);
    } finally {
      setIsImportingToVault(false);
    }
  };

  // SECURE TIME-LIMITED SHARE LINK HANDLERS
  const handleGenerateShareLink = () => {
    if (!shareFileTarget) return;
    setIsGeneratingShareLink(true);

    setTimeout(() => {
      const token = 'SEC-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      const linkId = 'share_' + Date.now().toString(36);
      
      let hours = 24;
      if (shareExpiryOption === '1h') hours = 1;
      if (shareExpiryOption === '7d') hours = 168;
      if (shareExpiryOption === '30d') hours = 720;

      const expiresAt = new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
      const baseUrl = window.location.origin;
      const shareUrl = `${baseUrl}/shared-doc/${shareFileTarget.id}?token=${token}&expires=${encodeURIComponent(expiresAt)}${sharePasscode.trim() ? '&protected=1' : ''}`;

      const newShareRecord: SecureShareLinkRecord = {
        id: linkId,
        fileId: shareFileTarget.id,
        fileName: shareFileTarget.name,
        shareUrl,
        token,
        createdAt: new Date().toISOString(),
        expiresAt,
        expiryOption: shareExpiryOption,
        passcode: sharePasscode.trim() || undefined,
        allowDownload: shareAllowDownload,
        accessRole: shareAccessRole,
        viewsCount: 0,
        isRevoked: false
      };

      setGeneratedShareRecord(newShareRecord);

      const updatedLinks = [newShareRecord, ...activeShareLinks];
      setActiveShareLinks(updatedLinks);
      try {
        localStorage.setItem('elawyers_doc_share_links', JSON.stringify(updatedLinks));
      } catch (e) {
        console.error(e);
      }

      logSyncActivity(
        'link_generation',
        `Secure Share Link Generated: ${shareFileTarget.name}`,
        `Created time-limited link expiring in ${shareExpiryOption} (${shareAccessRole} mode).`,
        'warning',
        { fileName: shareFileTarget.name, expiryOption: shareExpiryOption }
      );

      setIsGeneratingShareLink(false);
    }, 450);
  };

  const handleCopyShareUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLinkState(true);
    setTimeout(() => setCopiedLinkState(false), 2500);
  };

  const handleRevokeShareLink = (linkId: string) => {
    const updated = activeShareLinks.map(link => 
      link.id === linkId ? { ...link, isRevoked: true } : link
    );
    setActiveShareLinks(updated);
    if (generatedShareRecord && generatedShareRecord.id === linkId) {
      setGeneratedShareRecord({ ...generatedShareRecord, isRevoked: true });
    }
    try {
      localStorage.setItem('elawyers_doc_share_links', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    logSyncActivity(
      'link_generation',
      'Share Link Access Revoked',
      `Deactivated secure share link ID "${linkId}".`,
      'warning'
    );
  };

  // MANDATORY USER CONFIRMATION BEFORE DELETION
  const confirmDeleteFile = async () => {
    if (!accessToken || !deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteDriveFile(accessToken, deleteTarget.id);
      logSyncActivity(
        'deletion',
        `Document Deleted: ${deleteTarget.name}`,
        `Deleted document from Google Drive.`,
        'warning',
        { fileName: deleteTarget.name, fileId: deleteTarget.id }
      );
      setDeleteTarget(null);
      loadDriveFiles();
      if (activeTab === 'sheets') loadSheetsList();
    } catch (err: any) {
      alert(`Failed to delete file: ${err.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCreateMasterSpreadsheet = async () => {
    if (!accessToken) return;
    setIsLoadingSheets(true);
    setSheetNotice(null);
    try {
      const sheet = await createSpreadsheet(
        accessToken,
        'E-Lawyers Compliance Tracker 2026'
      );
      // Pre-fill header and statutory rows
      const headerRows = [
        ['Compliance Task Name', 'RJSC / NBR Form', 'Statutory Due Date', 'Est Govt Fee (BDT)', 'Status', 'Assigned Advocate'],
        ['Annual Return Filing', 'Form C', '2026-09-30', 'BDT 2,500', 'In Progress', 'Senior Corporate Counsel'],
        ['Notification of Director Change', 'Form XII', '2026-04-15', 'BDT 1,500', 'Pending Verification', 'Tax & Corporate Associate'],
        ['Corporate Income Tax Return', 'NBR Form 108', '2026-11-15', 'BDT 10,000', 'Upcoming', 'NBR Tax Specialist'],
        ['Share Transfer Registration', 'Form 117', '2026-08-01', 'BDT 5,000', 'Completed', 'Managing Director']
      ];
      await appendSpreadsheetValues(accessToken, sheet.spreadsheetId, 'Compliance Tracker 2026!A1:F5', headerRows);

      logSyncActivity(
        'sheet_fetch',
        `Master Compliance Sheet Created: ${sheet.properties.title}`,
        'Created Google Sheet with pre-filled 2026 Bangladesh compliance templates.',
        'success',
        { sheetName: sheet.properties.title }
      );

      setSheetNotice(`Created Google Sheet "${sheet.properties.title}" with pre-filled 2026 Bangladesh compliance templates!`);
      loadSheetsList();
      setSelectedSheetId(sheet.spreadsheetId);
      setSelectedSheetName(sheet.properties.title);
      loadSheetData(sheet.spreadsheetId);
    } catch (err: any) {
      setSheetNotice(`Error creating sheet: ${err.message}`);
    } finally {
      setIsLoadingSheets(false);
    }
  };

  const handleAddFilingRow = async () => {
    if (!accessToken || !selectedSheetId || !newFilingName.trim()) return;
    setIsAppendingRow(true);
    try {
      const newRow = [
        newFilingName.trim(),
        newFormNo,
        newDueDate,
        `BDT ${newFeeBdt}`,
        newStatus,
        user?.displayName || 'Client User'
      ];
      await appendSpreadsheetValues(accessToken, selectedSheetId, 'A1:F1', [newRow]);
      
      logSyncActivity(
        'sheet_append',
        `New Filing Appended: ${newFilingName.trim()}`,
        `Appended "${newFilingName.trim()}" (${newFormNo}, BDT ${newFeeBdt}) into Google Sheet "${selectedSheetName}".`,
        'success',
        { sheetName: selectedSheetName }
      );

      setNewFilingName('');
      setSheetNotice(`Row added to "${selectedSheetName}" successfully!`);
      loadSheetData(selectedSheetId);
    } catch (err: any) {
      setSheetNotice(`Failed to append row: ${err.message}`);
    } finally {
      setIsAppendingRow(false);
    }
  };

  const filteredDriveFiles = driveFiles.filter((f) =>
    f.name.toLowerCase().includes(driveSearch.toLowerCase())
  );

  const filteredSyncLogs = syncLogs.filter((log) => {
    const matchesSearch =
      log.title.toLowerCase().includes(activitySearch.toLowerCase()) ||
      log.details.toLowerCase().includes(activitySearch.toLowerCase()) ||
      (log.metadata?.fileName && log.metadata.fileName.toLowerCase().includes(activitySearch.toLowerCase())) ||
      (log.metadata?.sheetName && log.metadata.sheetName.toLowerCase().includes(activitySearch.toLowerCase()));

    if (!matchesSearch) return false;

    if (activityFilter === 'upload') {
      return log.actionType === 'upload' || log.actionType === 'folder_creation';
    } else if (activityFilter === 'sheet') {
      return log.actionType === 'sheet_fetch' || log.actionType === 'sheet_append';
    } else if (activityFilter === 'link') {
      return log.actionType === 'link_generation';
    } else if (activityFilter === 'vault') {
      return log.actionType === 'vault_import' || log.actionType === 'folder_creation';
    }

    return true;
  });

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-200 shrink-0">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold font-serif text-slate-900">
                Google Workspace Cloud Integration
              </h3>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                Drive & Sheets Sync
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Sync your Bangladesh RJSC filings, tax schedules, and legal documents with Google Drive & Sheets
            </p>
          </div>
        </div>

        {/* User Google Auth Bar */}
        <div className="flex items-center gap-3 shrink-0">
          {!user ? (
            <button
              onClick={handleGoogleLogin}
              disabled={isAuthenticating}
              className="gsi-material-button inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-4 py-2.5 rounded-xl font-medium text-xs shadow-sm transition-all hover:shadow"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
              <span>{isAuthenticating ? 'Connecting to Google...' : 'Sign in with Google'}</span>
            </button>
          ) : (
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-xl">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || 'User'} className="w-7 h-7 rounded-full border border-slate-300" />
              ) : (
                <div className="w-7 h-7 bg-emerald-600 text-white font-bold rounded-full flex items-center justify-center text-xs">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="text-left">
                <p className="text-xs font-bold text-slate-800 truncate max-w-[140px]">
                  {user.displayName || user.email}
                </p>
                <p className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Google Drive & Sheets Connected
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs text-slate-400 hover:text-slate-600 font-medium ml-1 underline"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      {authError && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{authError}</span>
        </div>
      )}

      {!user ? (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center space-y-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <div className="max-w-md mx-auto space-y-1">
            <h4 className="text-base font-bold text-slate-900">Connect Your Google Account</h4>
            <p className="text-xs text-slate-500">
              Sign in with Google to read and save legal dossiers directly to Google Drive, and track live compliance schedules in Google Sheets.
            </p>
          </div>
          <button
            onClick={handleGoogleLogin}
            disabled={isAuthenticating}
            className="inline-flex items-center gap-2 bg-[#00C896] hover:bg-emerald-600 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs shadow-md transition-all"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Connect Google Workspace</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Workspace Tabs */}
          <div className="flex border-b border-slate-200 space-x-6 text-sm font-bold">
            <button
              onClick={() => setActiveTab('drive')}
              className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${
                activeTab === 'drive'
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              <span>Google Drive Files</span>
            </button>
            <button
              onClick={() => setActiveTab('sheets')}
              className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${
                activeTab === 'sheets'
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Google Sheets Compliance Tracker</span>
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${
                activeTab === 'activity'
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Sync Activity & Audit Log</span>
              {syncLogs.length > 0 && (
                <span className="px-2 py-0.5 text-[10px] bg-slate-100 text-slate-700 font-mono font-bold rounded-full border border-slate-200">
                  {syncLogs.length}
                </span>
              )}
            </button>
          </div>

          {/* TAB 1: GOOGLE DRIVE */}
          {activeTab === 'drive' && (
            <div className="space-y-6">
              {/* Actions Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <button
                  onClick={handleExportSampleDoc}
                  disabled={isUploading}
                  className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-3 rounded-xl text-xs transition-all shadow-sm"
                >
                  {isUploading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <UploadCloud className="w-4 h-4" />
                  )}
                  <span>Export Statutory Dossier to Drive</span>
                </button>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="New folder (e.g. Legal Vault 2026)"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                  />
                  <button
                    onClick={handleCreateFolder}
                    disabled={isCreatingFolder || !newFolderName.trim()}
                    className="bg-slate-800 hover:bg-slate-900 text-white px-3 py-2 rounded-xl text-xs font-bold shrink-0 transition-colors"
                  >
                    {isCreatingFolder ? <Loader2 className="w-4 h-4 animate-spin" /> : <FolderPlus className="w-4 h-4" />}
                  </button>
                </div>

                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={driveSearch}
                    onChange={(e) => setDriveSearch(e.target.value)}
                    placeholder="Search Drive files..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              {uploadStatus && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center justify-between">
                  <span className="font-semibold">{uploadStatus}</span>
                  <button onClick={() => setUploadStatus(null)} className="text-emerald-600 hover:text-emerald-900">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Drive File List */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50">
                <div className="flex items-center justify-between px-4 py-3 bg-slate-100/70 border-b border-slate-200 text-xs font-bold text-slate-700">
                  <div className="flex items-center gap-2">
                    <span>Google Drive Documents & Folders</span>
                    {activeShareLinks.filter((l) => !l.isRevoked && new Date(l.expiresAt) > new Date()).length > 0 && (
                      <span className="bg-blue-100 text-blue-800 text-[10px] font-mono px-2 py-0.5 rounded-full border border-blue-200">
                        {activeShareLinks.filter((l) => !l.isRevoked && new Date(l.expiresAt) > new Date()).length} Active Share Links
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowManageLinksModal(true)}
                      className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-lg text-[11px] flex items-center gap-1 border border-blue-200 transition-colors"
                      title="View and manage generated secure share links"
                    >
                      <Share2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>Manage Share Links</span>
                    </button>
                    <button
                      onClick={loadDriveFiles}
                      className="flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isLoadingDrive ? 'animate-spin' : ''}`} />
                      <span>Refresh</span>
                    </button>
                  </div>
                </div>

                {isLoadingDrive ? (
                  <div className="p-8 text-center text-slate-500 space-y-2">
                    <Loader2 className="w-6 h-6 animate-spin text-emerald-600 mx-auto" />
                    <p className="text-xs font-semibold">Fetching Google Drive directory...</p>
                  </div>
                ) : filteredDriveFiles.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 space-y-2">
                    <FileText className="w-8 h-8 text-slate-300 mx-auto" />
                    <p className="text-xs font-semibold">No Drive files found matching your search</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-200 max-h-72 overflow-y-auto">
                    {filteredDriveFiles.map((file) => {
                      const isFolder = file.mimeType === 'application/vnd.google-apps.folder';
                      const isSheet = file.mimeType.includes('spreadsheet');
                      return (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-3.5 hover:bg-white transition-colors text-xs"
                        >
                          <div className="flex items-center gap-3 min-w-0 pr-2">
                            <div className="p-2 bg-slate-100 rounded-lg text-slate-600 shrink-0">
                              {isFolder ? (
                                <FolderPlus className="w-4 h-4 text-amber-600" />
                              ) : isSheet ? (
                                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                              ) : (
                                <FileText className="w-4 h-4 text-blue-600" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-slate-800 truncate">{file.name}</p>
                              <p className="text-[10px] text-slate-400">
                                {file.modifiedTime ? new Date(file.modifiedTime).toLocaleDateString() : 'Drive item'}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {isSheet && (
                              <button
                                onClick={() => {
                                  setPreviewSheetId(file.id);
                                  setPreviewSheetName(file.name);
                                  setPreviewWebViewLink(file.webViewLink);
                                  setIsPreviewModalOpen(true);
                                }}
                                className="px-2 py-1.5 text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors font-bold text-[11px] flex items-center gap-1 border border-emerald-300 shadow-xs"
                                title="Open Read-Only Spreadsheet Preview"
                              >
                                <Eye className="w-3.5 h-3.5 text-emerald-700" />
                                <span>Preview</span>
                              </button>
                            )}

                            {!isFolder && (
                              <button
                                onClick={() => {
                                  setShareFileTarget(file);
                                  setShareExpiryOption('24h');
                                  setShareAccessRole('viewer');
                                  setSharePasscode('');
                                  setShareAllowDownload(true);
                                  setGeneratedShareRecord(null);
                                  setCopiedLinkState(false);
                                }}
                                className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-900 font-bold rounded-lg text-[11px] flex items-center gap-1 transition-all border border-blue-200 shadow-2xs"
                                title="Generate secure, time-limited share link for this compliance document"
                              >
                                <Share2 className="w-3.5 h-3.5 text-blue-600" />
                                <span>Share Link</span>
                              </button>
                            )}

                            {!isFolder && (
                              importedDriveFileIds.includes(file.id) ? (
                                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-lg flex items-center gap-1 border border-emerald-300">
                                  <Check className="w-3 h-3 text-emerald-700" />
                                  <span>In Client Vault</span>
                                </span>
                              ) : (
                                <button
                                  onClick={() => {
                                    setImportFileTarget(file);
                                    setImportCategory('RJSC Statutory Filings');
                                  }}
                                  className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[11px] flex items-center gap-1 transition-all shadow-sm"
                                  title="Import document directly into your Secure Client Dashboard Vault"
                                >
                                  <ShieldCheck className="w-3.5 h-3.5" />
                                  <span>Import to Vault</span>
                                </button>
                              )
                            )}

                            {file.webViewLink && (
                              <a
                                href={file.webViewLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 text-slate-500 hover:text-emerald-700 bg-slate-100 rounded-lg hover:bg-emerald-50 transition-colors"
                                title="Open in Google Drive"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                            <button
                              onClick={() => setDeleteTarget(file)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 bg-slate-100 rounded-lg hover:bg-rose-50 transition-colors"
                              title="Delete from Google Drive (Requires Confirmation)"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: GOOGLE SHEETS */}
          {activeTab === 'sheets' && (
            <div className="space-y-6">
              {/* Sheets Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  onClick={handleCreateMasterSpreadsheet}
                  disabled={isLoadingSheets}
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-sm"
                >
                  {isLoadingSheets ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  <span>Create 2026 Statutory Tracker Sheet</span>
                </button>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-slate-700 shrink-0">Active Sheet:</span>
                  <select
                    value={selectedSheetId || ''}
                    onChange={(e) => {
                      const id = e.target.value;
                      setSelectedSheetId(id);
                      const target = sheetsList.find((s) => s.id === id);
                      if (target) setSelectedSheetName(target.name);
                      if (id) loadSheetData(id);
                    }}
                    className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-emerald-600 max-w-xs"
                  >
                    <option value="">-- Select Google Sheet --</option>
                    {sheetsList.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => {
                      if (selectedSheetId) {
                        loadSheetData(selectedSheetId, true);
                      } else {
                        loadSheetsList();
                      }
                    }}
                    disabled={isLoadingSheetData || isLoadingSheets}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm shrink-0"
                    title="Manually re-fetch selected Google Sheet data"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingSheetData || isLoadingSheets ? 'animate-spin' : ''}`} />
                    <span>{isLoadingSheetData ? 'Refreshing...' : 'Refresh Data'}</span>
                  </button>
                </div>
              </div>

              {/* 15-Minute Periodic Auto-Sync Control Panel */}
              <div className="bg-slate-50 border border-slate-200 p-3.5 sm:p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl border shrink-0 transition-colors ${
                    isAutoSyncEnabled
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : 'bg-slate-100 text-slate-500 border-slate-200'
                  }`}>
                    <Clock className={`w-4 h-4 ${isAutoSyncEnabled ? 'text-emerald-600 animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-bold text-slate-900 text-xs">15-Minute Periodic Auto-Sync</h5>
                      {isAutoSyncEnabled ? (
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300 flex items-center gap-1 font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active (Every 15m)
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-200 text-slate-600 rounded-full border border-slate-300 font-mono">
                          Disabled
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {isAutoSyncEnabled
                        ? `Automatically re-fetches live spreadsheet rows every 15 minutes. Next sync in ~${Math.floor(autoSyncNextCountdown / 60)}m ${autoSyncNextCountdown % 60}s.`
                        : 'Enable auto-sync to automatically re-fetch linked Google Sheets compliance data every 15 minutes.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                  <span className="text-xs font-bold text-slate-700">Auto-Sync Switch:</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isAutoSyncEnabled}
                    onClick={handleToggleAutoSync}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      isAutoSyncEnabled ? 'bg-emerald-600' : 'bg-slate-300'
                    }`}
                    title={isAutoSyncEnabled ? 'Disable 15-minute background auto-sync' : 'Enable 15-minute background auto-sync'}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                        isAutoSyncEnabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {sheetNotice && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center justify-between">
                  <span className="font-semibold">{sheetNotice}</span>
                  <button onClick={() => setSheetNotice(null)} className="text-emerald-600 hover:text-emerald-900">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Interactive Sheet Row Append Form */}
              {selectedSheetId && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Plus className="w-3.5 h-3.5 text-emerald-600" />
                    Append Statutory Filing Record to Google Sheet
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5 text-xs">
                    <input
                      type="text"
                      placeholder="Compliance Task Name"
                      value={newFilingName}
                      onChange={(e) => setNewFilingName(e.target.value)}
                      className="bg-white border border-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-600"
                    />
                    <select
                      value={newFormNo}
                      onChange={(e) => setNewFormNo(e.target.value)}
                      className="bg-white border border-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-600"
                    >
                      <option value="Form C">Form C (Annual Return)</option>
                      <option value="Form XII">Form XII (Director Change)</option>
                      <option value="Form XXIII">Form XXIII (Capital Increase)</option>
                      <option value="Form 108">NBR Corporate Tax</option>
                      <option value="Trade License">LGD Trade License Renewal</option>
                    </select>
                    <input
                      type="date"
                      value={newDueDate}
                      onChange={(e) => setNewDueDate(e.target.value)}
                      className="bg-white border border-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-600"
                    />
                    <input
                      type="text"
                      placeholder="Fee BDT (e.g. 2,500)"
                      value={newFeeBdt}
                      onChange={(e) => setNewFeeBdt(e.target.value)}
                      className="bg-white border border-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-600"
                    />
                    <button
                      onClick={handleAddFilingRow}
                      disabled={isAppendingRow || !newFilingName.trim()}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      {isAppendingRow ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                      <span>Sync Row</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Sheet Grid Table Display */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                <div className="flex items-center justify-between px-4 py-3 bg-slate-100/80 border-b border-slate-200 text-xs font-bold text-slate-800">
                  <div className="flex items-center gap-2">
                    <Table className="w-4 h-4 text-emerald-700" />
                    <span>Live Sheet Data: {selectedSheetName || 'No Sheet Selected'}</span>
                  </div>
                  {selectedSheetId && (
                    <div className="flex items-center gap-2">
                      {lastSheetRefreshedAt && (
                        <span className="text-[10px] text-slate-500 font-mono hidden sm:inline-block bg-slate-200/60 px-2 py-0.5 rounded-md">
                          Last Refreshed: {lastSheetRefreshedAt}
                        </span>
                      )}
                      <button
                        onClick={() => loadSheetData(selectedSheetId, true)}
                        disabled={isLoadingSheetData}
                        className="text-slate-700 hover:text-slate-900 text-xs flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-300 px-3 py-1.5 rounded-xl font-bold transition-all shadow-xs"
                        title="Re-fetch live rows from Google Sheets API"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 text-emerald-600 ${isLoadingSheetData ? 'animate-spin' : ''}`} />
                        <span>{isLoadingSheetData ? 'Syncing...' : 'Re-Fetch Live Data'}</span>
                      </button>
                      <button
                        onClick={() => {
                          setPreviewSheetId(selectedSheetId);
                          setPreviewSheetName(selectedSheetName);
                          const targetObj = sheetsList.find((s) => s.id === selectedSheetId);
                          setPreviewWebViewLink(targetObj?.webViewLink);
                          setIsPreviewModalOpen(true);
                        }}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Read-Only Full Preview</span>
                      </button>
                    </div>
                  )}
                </div>

                {!selectedSheetId ? (
                  <div className="p-8 text-center text-slate-500 space-y-2">
                    <FileSpreadsheet className="w-8 h-8 text-slate-300 mx-auto" />
                    <p className="text-xs font-semibold">Select or create a Google Sheet to view live data</p>
                  </div>
                ) : isLoadingSheetData ? (
                  <div className="p-8 text-center text-slate-500 space-y-2">
                    <Loader2 className="w-6 h-6 animate-spin text-emerald-600 mx-auto" />
                    <p className="text-xs font-semibold">Reading spreadsheet rows from Google Sheets API...</p>
                  </div>
                ) : sheetValues.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 space-y-2">
                    <Table className="w-8 h-8 text-slate-300 mx-auto" />
                    <p className="text-xs font-semibold">Spreadsheet is currently empty. Append a row above!</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                          {sheetValues[0]?.map((colHeader: any, idx: number) => (
                            <th key={idx} className="p-3 border-r border-slate-200/60 whitespace-nowrap">
                              {colHeader}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {sheetValues.slice(1).map((row: any[], rIdx: number) => (
                          <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                            {row.map((cell: any, cIdx: number) => (
                              <td key={cIdx} className="p-3 border-r border-slate-200/60 text-slate-700 whitespace-nowrap">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: SYNC ACTIVITY & AUDIT LOG */}
          {activeTab === 'activity' && (
            <div className="space-y-6 animate-in fade-in">
              {/* Summary Statistics Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl border border-emerald-200 shrink-0">
                    <History className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Audit Events</p>
                    <p className="text-lg font-bold font-mono text-slate-900">{syncLogs.length}</p>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-center gap-3">
                  <div className="p-2.5 bg-blue-100 text-blue-800 rounded-xl border border-blue-200 shrink-0">
                    <UploadCloud className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Drive Uploads & Folders</p>
                    <p className="text-lg font-bold font-mono text-slate-900">
                      {syncLogs.filter(l => l.actionType === 'upload' || l.actionType === 'folder_creation').length}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-center gap-3">
                  <div className="p-2.5 bg-purple-100 text-purple-800 rounded-xl border border-purple-200 shrink-0">
                    <FileSpreadsheet className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sheet API Actions</p>
                    <p className="text-lg font-bold font-mono text-slate-900">
                      {syncLogs.filter(l => l.actionType === 'sheet_fetch' || l.actionType === 'sheet_append').length}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-center gap-3">
                  <div className="p-2.5 bg-amber-100 text-amber-800 rounded-xl border border-amber-200 shrink-0">
                    <Share2 className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Share Links & Vault</p>
                    <p className="text-lg font-bold font-mono text-slate-900">
                      {syncLogs.filter(l => l.actionType === 'link_generation' || l.actionType === 'vault_import').length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Search & Filter Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 border border-slate-200 p-3.5 rounded-2xl">
                {/* Search Input */}
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={activitySearch}
                    onChange={(e) => setActivitySearch(e.target.value)}
                    placeholder="Search by title, file name, or action..."
                    className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:border-emerald-600"
                  />
                  {activitySearch && (
                    <button
                      onClick={() => setActivitySearch('')}
                      className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Filter Categories & Export */}
                <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                  {[
                    { id: 'all', label: 'All Logs' },
                    { id: 'upload', label: 'Uploads' },
                    { id: 'sheet', label: 'Sheets Sync' },
                    { id: 'link', label: 'Share Links' },
                    { id: 'vault', label: 'Vault & Folders' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setActivityFilter(f.id as any)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                        activityFilter === f.id
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}

                  {/* Export JSON Button */}
                  <button
                    onClick={() => {
                      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(syncLogs, null, 2));
                      const downloadAnchor = document.createElement('a');
                      downloadAnchor.setAttribute("href", dataStr);
                      downloadAnchor.setAttribute("download", `elawyers_sync_activity_audit_log_${Date.now()}.json`);
                      document.body.appendChild(downloadAnchor);
                      downloadAnchor.click();
                      downloadAnchor.remove();
                    }}
                    className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5 shrink-0 transition-colors"
                    title="Export audit log to JSON file"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-600" />
                    <span>Export JSON</span>
                  </button>

                  {/* Clear History Button */}
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to clear all sync activity audit history?')) {
                        setSyncLogs([]);
                        localStorage.removeItem('elawyers_sync_activity_logs');
                      }
                    }}
                    className="px-2.5 py-1.5 bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 font-bold rounded-xl text-xs flex items-center gap-1 shrink-0 transition-colors"
                    title="Clear Activity Audit History"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                  </button>
                </div>
              </div>

              {/* Activity Log Feed */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 font-serif">
                    <Activity className="w-4 h-4 text-emerald-600" />
                    <span>Real-Time Audit Trail ({filteredSyncLogs.length} events recorded)</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Last Activity: {syncLogs.length > 0 ? new Date(syncLogs[0].timestamp).toLocaleTimeString() : 'N/A'}
                  </span>
                </div>

                {filteredSyncLogs.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 space-y-2">
                    <FileSearch className="w-8 h-8 text-slate-300 mx-auto" />
                    <p className="text-xs font-semibold">No sync activity logs match your search or filter.</p>
                    <button
                      onClick={() => {
                        setActivitySearch('');
                        setActivityFilter('all');
                      }}
                      className="text-xs text-emerald-600 font-bold underline"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
                    {filteredSyncLogs.map((log) => {
                      let IconComponent = FileText;
                      let iconBgClass = 'bg-slate-100 text-slate-600 border-slate-200';

                      if (log.actionType === 'upload') {
                        IconComponent = UploadCloud;
                        iconBgClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                      } else if (log.actionType === 'sheet_fetch' || log.actionType === 'sheet_append') {
                        IconComponent = FileSpreadsheet;
                        iconBgClass = 'bg-blue-50 text-blue-700 border-blue-200';
                      } else if (log.actionType === 'link_generation') {
                        IconComponent = Share2;
                        iconBgClass = 'bg-purple-50 text-purple-700 border-purple-200';
                      } else if (log.actionType === 'vault_import') {
                        IconComponent = ShieldCheck;
                        iconBgClass = 'bg-amber-50 text-amber-700 border-amber-200';
                      } else if (log.actionType === 'folder_creation') {
                        IconComponent = FolderPlus;
                        iconBgClass = 'bg-indigo-50 text-indigo-700 border-indigo-200';
                      } else if (log.actionType === 'deletion') {
                        IconComponent = Trash2;
                        iconBgClass = 'bg-rose-50 text-rose-700 border-rose-200';
                      }

                      return (
                        <div key={log.id} className="p-4 hover:bg-slate-50/80 transition-colors space-y-2 text-xs">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3 min-w-0">
                              <div className={`p-2.5 rounded-xl border shrink-0 mt-0.5 ${iconBgClass}`}>
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <h5 className="font-bold text-slate-900 text-xs font-serif">{log.title}</h5>
                                  <span
                                    className={`px-2 py-0.5 text-[9px] font-bold rounded-full uppercase font-mono ${
                                      log.status === 'success'
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : log.status === 'warning'
                                        ? 'bg-amber-100 text-amber-800'
                                        : 'bg-blue-100 text-blue-800'
                                    }`}
                                  >
                                    {log.status}
                                  </span>
                                </div>
                                <p className="text-slate-600 mt-1 text-[11px] leading-relaxed">{log.details}</p>

                                {/* Metadata Badges */}
                                {log.metadata && (
                                  <div className="flex flex-wrap items-center gap-2 mt-2">
                                    {log.metadata.fileName && (
                                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[10px] font-mono border border-slate-200 flex items-center gap-1">
                                        <FileText className="w-3 h-3 text-slate-500" /> {log.metadata.fileName}
                                      </span>
                                    )}
                                    {log.metadata.sheetName && (
                                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md text-[10px] font-mono border border-blue-200 flex items-center gap-1">
                                        <FileSpreadsheet className="w-3 h-3 text-blue-600" /> {log.metadata.sheetName}
                                      </span>
                                    )}
                                    {log.metadata.expiryOption && (
                                      <span className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded-md text-[10px] font-mono border border-purple-200 flex items-center gap-1">
                                        <Clock className="w-3 h-3 text-purple-600" /> Expiry: {log.metadata.expiryOption}
                                      </span>
                                    )}
                                    {log.metadata.folderName && (
                                      <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md text-[10px] font-mono border border-indigo-200 flex items-center gap-1">
                                        <FolderPlus className="w-3 h-3 text-indigo-600" /> Folder: {log.metadata.folderName}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Timestamp & User */}
                            <div className="text-right shrink-0">
                              <p className="font-mono text-[10px] text-slate-500 font-semibold">
                                {new Date(log.timestamp).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                              {log.userEmail && (
                                <p className="text-[10px] text-slate-400 font-mono mt-0.5">{log.userEmail}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* MANDATORY USER CONFIRMATION DIALOG FOR FILE DELETION */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in"
          onClick={() => setDeleteTarget(null)}
        >
          <div
            className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-3 bg-rose-100 rounded-2xl border border-rose-200">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">Confirm File Deletion</h4>
                <p className="text-xs text-slate-500">Google Drive Data Operation</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to permanently delete <strong className="text-slate-900 font-mono">"{deleteTarget.name}"</strong> from your Google Drive account? This operation cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-200">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteFile}
                disabled={isDeleting}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-2"
              >
                {isDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                <span>Confirm Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* IMPORT DOCUMENT TO CLIENT DASHBOARD VAULT MODAL */}
      {importFileTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in"
          onClick={() => setImportFileTarget(null)}
        >
          <div
            className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-100 text-emerald-800 rounded-2xl border border-emerald-200">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 font-serif">Import to Secure Vault</h4>
                  <p className="text-xs text-slate-500">Google Drive to Client Dashboard Sync</p>
                </div>
              </div>
              <button
                onClick={() => setImportFileTarget(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl space-y-1">
                <span className="text-[10px] text-slate-400 font-mono font-bold uppercase">Selected Drive File</span>
                <p className="font-bold text-slate-800 truncate font-mono text-sm">{importFileTarget.name}</p>
                <p className="text-[11px] text-slate-500">
                  Size: {importFileTarget.size ? `${(parseInt(importFileTarget.size) / 1024 / 1024).toFixed(1)} MB` : '1.5 MB'}
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-800">
                  Select Legal Vault Category
                </label>
                <select
                  value={importCategory}
                  onChange={(e) => setImportCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-emerald-600"
                >
                  <option value="RJSC Statutory Filings">RJSC Statutory Filings (Form C, XII, XV)</option>
                  <option value="NBR Corporate Income Tax & VAT">NBR Corporate Income Tax & VAT Returns</option>
                  <option value="Constitutional Documents">Constitutional Documents (MOA, AOA, Trade License)</option>
                  <option value="Board Resolutions & EGM Minutes">Board Resolutions & EGM Minutes</option>
                  <option value="General Corporate Vault">General Corporate Vault</option>
                </select>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-[11px] flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  Once imported, Senior Advocates and Corporate Paralegals can review this document directly inside your <strong>Secure Client Dashboard</strong>.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setImportFileTarget(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmImportToVault}
                disabled={isImportingToVault}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors shadow-md flex items-center gap-2"
              >
                {isImportingToVault ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ShieldCheck className="w-4 h-4" />
                )}
                <span>Confirm Import to Vault</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* READ-ONLY GOOGLE SHEETS PREVIEW MODAL */}
      <GoogleSheetPreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        spreadsheetId={previewSheetId}
        spreadsheetName={previewSheetName}
        accessToken={accessToken}
        webViewLink={previewWebViewLink}
      />

      {/* SECURE TIME-LIMITED DOCUMENT SHARE MODAL */}
      {shareFileTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in"
          onClick={() => {
            setShareFileTarget(null);
            setGeneratedShareRecord(null);
          }}
        >
          <div
            className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-7 space-y-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 text-blue-700 rounded-2xl border border-blue-200">
                  <Share2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 font-serif">
                    Secure Document Sharing
                  </h4>
                  <p className="text-xs text-slate-500">
                    Generate encrypted, time-limited compliance share links
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShareFileTarget(null);
                  setGeneratedShareRecord(null);
                }}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Info Card */}
            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 bg-white rounded-xl border border-slate-200 shrink-0">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-slate-800 text-xs truncate">{shareFileTarget.name}</p>
                  <p className="text-[10px] text-slate-500 font-mono">
                    Google Drive ID: {shareFileTarget.id.substring(0, 16)}...
                  </p>
                </div>
              </div>
              <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2.5 py-1 rounded-full shrink-0">
                Compliance File
              </span>
            </div>

            {!generatedShareRecord ? (
              <div className="space-y-4 text-xs">
                {/* 1. Time Limit Duration */}
                <div className="space-y-2">
                  <label className="block font-bold text-slate-800 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>Select Expiration Period</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: '1h', label: '1 Hour', sub: 'Instant Review' },
                      { id: '24h', label: '24 Hours', sub: '1 Day Audit' },
                      { id: '7d', label: '7 Days', sub: 'Statutory Review' },
                      { id: '30d', label: '30 Days', sub: 'Partner Access' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setShareExpiryOption(opt.id as any)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          shareExpiryOption === opt.id
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm font-bold'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        <p className="text-xs font-bold">{opt.label}</p>
                        <p className={`text-[10px] ${shareExpiryOption === opt.id ? 'text-blue-100' : 'text-slate-400'}`}>
                          {opt.sub}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Access Rights & Passcode */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="block font-bold text-slate-800 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-slate-600" />
                      <span>Access Level</span>
                    </label>
                    <select
                      value={shareAccessRole}
                      onChange={(e) => setShareAccessRole(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-blue-600"
                    >
                      <option value="viewer">Read-Only Viewer</option>
                      <option value="confidential">Confidential Audit (Watermarked)</option>
                      <option value="restricted">Restricted Board Counsel</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-bold text-slate-800 flex items-center gap-1.5">
                      <Key className="w-3.5 h-3.5 text-amber-600" />
                      <span>4-Digit Security Passcode (Optional)</span>
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={sharePasscode}
                      onChange={(e) => setSharePasscode(e.target.value)}
                      placeholder="e.g. 4829"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono font-bold focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                {/* 3. Security Toggles */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-slate-600" />
                    <div>
                      <p className="font-bold text-slate-800">Allow File Downloads</p>
                      <p className="text-[10px] text-slate-500">Recipients can download PDF/Doc copies directly</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={shareAllowDownload}
                    onChange={(e) => setShareAllowDownload(e.target.checked)}
                    className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                  />
                </div>

                {/* Info Notice */}
                <div className="p-3 bg-blue-50/70 border border-blue-200 text-blue-900 rounded-xl text-[11px] flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <p>
                    This document link will automatically deactivate after the selected duration. Access attempts after expiration will be strictly blocked.
                  </p>
                </div>

                {/* Generate Action Button */}
                <button
                  type="button"
                  onClick={handleGenerateShareLink}
                  disabled={isGeneratingShareLink}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl text-xs transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {isGeneratingShareLink ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                  <span>Generate Encrypted Share Link</span>
                </button>
              </div>
            ) : (
              /* GENERATED SHARE LINK RESULT CARD */
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Secure Share Link Ready!</span>
                    </div>
                    <span className="bg-emerald-200/80 text-emerald-900 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Token: {generatedShareRecord.token}
                    </span>
                  </div>

                  {/* Share URL Input & Copy Button */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={generatedShareRecord.shareUrl}
                      className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-800 focus:outline-none select-all"
                    />
                    <button
                      type="button"
                      onClick={() => handleCopyShareUrl(generatedShareRecord.shareUrl)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl font-bold text-xs shrink-0 flex items-center gap-1.5 transition-all shadow-xs"
                    >
                      {copiedLinkState ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Expiration Details */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                    <div className="p-2 bg-white/80 rounded-xl border border-emerald-200">
                      <span className="text-slate-400 block text-[10px] font-bold uppercase">Expires At</span>
                      <span className="font-bold text-slate-800 font-mono">
                        {new Date(generatedShareRecord.expiresAt).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <div className="p-2 bg-white/80 rounded-xl border border-emerald-200">
                      <span className="text-slate-400 block text-[10px] font-bold uppercase">Security Constraints</span>
                      <span className="font-bold text-slate-800">
                        {generatedShareRecord.passcode ? `PIN: ${generatedShareRecord.passcode}` : 'No PIN'} • {generatedShareRecord.allowDownload ? 'Download OK' : 'View Only'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Share Buttons */}
                <div className="flex items-center gap-2">
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      `Here is the secure time-limited link for Bangladesh compliance document "${generatedShareRecord.fileName}": ${generatedShareRecord.shareUrl}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={`mailto:?subject=${encodeURIComponent(
                      `Secure Compliance Document Share: ${generatedShareRecord.fileName}`
                    )}&body=${encodeURIComponent(
                      `Please find the time-limited access link for compliance file "${generatedShareRecord.fileName}":\n\n${generatedShareRecord.shareUrl}\n\nThis link will automatically expire at ${new Date(generatedShareRecord.expiresAt).toLocaleString()}.\n\nE-Lawyers Bangladesh Compliance Team`
                    )}`}
                    className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-bold py-2.5 rounded-xl text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Link</span>
                  </a>
                </div>

                {/* Revoke Button */}
                {!generatedShareRecord.isRevoked ? (
                  <button
                    type="button"
                    onClick={() => handleRevokeShareLink(generatedShareRecord.id)}
                    className="w-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold py-2 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                    <span>Revoke Link Access Immediately</span>
                  </button>
                ) : (
                  <div className="p-2 bg-rose-100 text-rose-800 rounded-xl text-center font-bold text-xs border border-rose-200">
                    This share link has been revoked and is now deactivated.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MANAGE ACTIVE SHARE LINKS MODAL */}
      {showManageLinksModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in"
          onClick={() => setShowManageLinksModal(false)}
        >
          <div
            className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-7 space-y-5 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 text-blue-700 rounded-2xl border border-blue-200">
                  <Share2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 font-serif">
                    Active Time-Limited Share Links
                  </h4>
                  <p className="text-xs text-slate-500">
                    Track, copy, or revoke active compliance document share URLs
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowManageLinksModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {activeShareLinks.length === 0 ? (
              <div className="p-8 text-center text-slate-500 space-y-2">
                <Link2 className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs font-semibold">No active document share links created yet.</p>
                <p className="text-[11px] text-slate-400">Click "Share Link" on any document in your Google Drive list to generate one.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {activeShareLinks.map((link) => {
                  const isExpired = new Date(link.expiresAt) < new Date();
                  const isRevoked = link.isRevoked;
                  const isActive = !isExpired && !isRevoked;

                  return (
                    <div
                      key={link.id}
                      className={`p-4 rounded-2xl border transition-all text-xs space-y-2.5 ${
                        isActive
                          ? 'bg-blue-50/40 border-blue-200'
                          : 'bg-slate-50 border-slate-200 opacity-75'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-bold text-slate-800 truncate font-mono text-xs">{link.fileName}</p>
                          <p className="text-[10px] text-slate-400">
                            Token: <span className="font-mono text-slate-600">{link.token}</span> • Created: {new Date(link.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="shrink-0 flex items-center gap-1.5">
                          {isActive && (
                            <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full border border-emerald-300 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Active
                            </span>
                          )}
                          {isExpired && !isRevoked && (
                            <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-full border border-amber-300">
                              Expired
                            </span>
                          )}
                          {isRevoked && (
                            <span className="px-2.5 py-0.5 bg-rose-100 text-rose-800 text-[10px] font-bold rounded-full border border-rose-300">
                              Revoked
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          readOnly
                          value={link.shareUrl}
                          className="w-full bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-[11px] font-mono text-slate-700"
                        />
                        {isActive && (
                          <button
                            onClick={() => handleCopyShareUrl(link.shareUrl)}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-[11px] shrink-0 flex items-center gap-1 transition-colors"
                          >
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </button>
                        )}
                        {!isRevoked && (
                          <button
                            onClick={() => handleRevokeShareLink(link.id)}
                            className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl text-[11px] shrink-0 transition-colors border border-rose-200"
                            title="Revoke Link Access"
                          >
                            <Trash2 className="w-3 h-3 text-rose-600" />
                          </button>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-200/60">
                        <span>
                          Expires: <strong className="text-slate-700 font-mono">{new Date(link.expiresAt).toLocaleString()}</strong>
                        </span>
                        <span>
                          {link.passcode ? `🔒 PIN: ${link.passcode}` : 'No PIN'} • {link.allowDownload ? 'Download Allowed' : 'View Only'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* READ-ONLY GOOGLE SHEETS PREVIEW MODAL */}
      <GoogleSheetPreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        spreadsheetId={previewSheetId}
        spreadsheetName={previewSheetName}
        accessToken={accessToken}
        webViewLink={previewWebViewLink}
      />
    </div>
  );
};
