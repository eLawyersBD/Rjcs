import React, { useState, useEffect, useMemo } from 'react';
import {
  FileSpreadsheet,
  Search,
  X,
  ExternalLink,
  Download,
  Copy,
  Check,
  RefreshCw,
  Table,
  Lock,
  Loader2,
  Maximize2,
  Minimize2,
  Printer,
  Sparkles,
  Filter,
  FileText
} from 'lucide-react';
import { getSpreadsheetValues } from '../lib/googleAuth';

interface GoogleSheetPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  spreadsheetId: string | null;
  spreadsheetName: string;
  accessToken: string | null;
  webViewLink?: string;
}

export const GoogleSheetPreviewModal: React.FC<GoogleSheetPreviewModalProps> = ({
  isOpen,
  onClose,
  spreadsheetId,
  spreadsheetName,
  accessToken,
  webViewLink
}) => {
  const [sheetValues, setSheetValues] = useState<any[][]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [range, setRange] = useState<string>('A1:Z100');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<string | null>(null);

  // Load sheet values whenever spreadsheetId or range changes
  useEffect(() => {
    if (isOpen && spreadsheetId && accessToken) {
      loadSheetData();
    }
  }, [isOpen, spreadsheetId, accessToken, range]);

  const loadSheetData = async () => {
    if (!spreadsheetId || !accessToken) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await getSpreadsheetValues(accessToken, spreadsheetId, range);
      setSheetValues(data || []);
      setLastRefreshedAt(
        new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    } catch (err: any) {
      setError(err.message || 'Failed to fetch spreadsheet data from Google Sheets API');
      setSheetValues([]);
    } finally {
      setIsLoading(false);
    }
  };

  const headers = useMemo(() => {
    if (sheetValues.length > 0) {
      return sheetValues[0];
    }
    return [];
  }, [sheetValues]);

  const rows = useMemo(() => {
    if (sheetValues.length > 1) {
      return sheetValues.slice(1);
    }
    return [];
  }, [sheetValues]);

  // Filter rows based on search query
  const filteredRows = useMemo(() => {
    if (!searchQuery.trim()) return rows;
    const query = searchQuery.toLowerCase();
    return rows.filter((row) =>
      row.some((cell) => cell && String(cell).toLowerCase().includes(query))
    );
  }, [rows, searchQuery]);

  // Copy as CSV
  const handleCopyAsCsv = () => {
    if (sheetValues.length === 0) return;
    const csvContent = sheetValues
      .map((row) => row.map((cell) => `"${String(cell || '').replace(/"/g, '""')}"`).join(','))
      .join('\n');

    navigator.clipboard.writeText(csvContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Download CSV
  const handleDownloadCsv = () => {
    if (sheetValues.length === 0) return;
    const csvContent = sheetValues
      .map((row) => row.map((cell) => `"${String(cell || '').replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${spreadsheetName.replace(/\s+/g, '_')}_preview.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print view
  const handlePrint = () => {
    window.print();
  };

  // Convert column index to Excel column header (0 -> A, 1 -> B, etc.)
  const getColLetter = (index: number) => {
    let letter = '';
    while (index >= 0) {
      letter = String.fromCharCode((index % 26) + 65) + letter;
      index = Math.floor(index / 26) - 1;
    }
    return letter;
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        className={`w-full bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          isExpanded ? 'max-w-7xl h-[92vh]' : 'max-w-5xl h-[82vh]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-2xl shrink-0">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white truncate font-serif">
                  {spreadsheetName || 'Google Sheet Read-Only Preview'}
                </h3>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 font-mono uppercase tracking-wider">
                  <Lock className="w-3 h-3" /> Read-Only Preview
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate">
                Live Google Sheets API Data Stream • ID: <span className="font-mono">{spreadsheetId}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
              title={isExpanded ? 'Collapse View' : 'Expand Full Screen'}
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
              title="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toolbar Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-slate-50 border-b border-slate-200 shrink-0 text-xs">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cells, forms, dates, fees..."
              className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-8 py-2 text-xs focus:outline-none focus:border-emerald-600 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Stats & Controls */}
          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <span className="bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-xl font-mono text-[11px] font-bold shadow-sm flex items-center gap-1.5">
              <Table className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                {filteredRows.length} / {rows.length} Rows
              </span>
            </span>

            {lastRefreshedAt && (
              <span className="bg-slate-100 text-slate-500 border border-slate-200 px-2.5 py-1.5 rounded-xl font-mono text-[10px] font-semibold hidden md:inline-block">
                Last Refreshed: {lastRefreshedAt}
              </span>
            )}

            <button
              onClick={loadSheetData}
              disabled={isLoading}
              className="px-3 py-1.5 text-emerald-900 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl font-bold transition-all shadow-xs flex items-center gap-1.5 text-xs"
              title="Manually re-fetch live spreadsheet data from Google Sheets API"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-600 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Re-fetching...' : 'Re-Fetch Sheet Data'}</span>
            </button>

            <button
              onClick={handleCopyAsCsv}
              className="px-3 py-1.5 text-slate-700 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl font-bold transition-all shadow-sm flex items-center gap-1.5"
              title="Copy table as CSV"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy CSV</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadCsv}
              className="px-3 py-1.5 text-slate-700 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl font-bold transition-all shadow-sm flex items-center gap-1.5"
              title="Download CSV file"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export CSV</span>
            </button>

            {webViewLink && (
              <a
                href={webViewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                title="Open directly in Google Sheets"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Sheets</span>
              </a>
            )}
          </div>
        </div>

        {/* Read-Only Grid Display */}
        <div className="flex-1 overflow-auto bg-slate-100 p-4">
          {isLoading ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-3 py-12">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
              <p className="text-xs font-semibold">Streaming live data from Google Sheets API...</p>
            </div>
          ) : error ? (
            <div className="p-6 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs space-y-2 max-w-lg mx-auto my-8">
              <div className="flex items-center gap-2 font-bold text-rose-900">
                <Lock className="w-4 h-4" />
                <span>Unable to Preview Spreadsheet</span>
              </div>
              <p>{error}</p>
              <button
                onClick={loadSheetData}
                className="mt-2 px-3 py-1.5 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700"
              >
                Try Again
              </button>
            </div>
          ) : sheetValues.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2 py-12">
              <Table className="w-10 h-10 text-slate-300" />
              <p className="text-xs font-semibold">No data rows found in range {range}</p>
            </div>
          ) : (
            <div className="border border-slate-300 rounded-2xl overflow-hidden bg-white shadow-md">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs select-text">
                  <thead>
                    {/* Row 1: Column Header Letters (A, B, C...) */}
                    <tr className="bg-slate-200/80 border-b border-slate-300 text-slate-500 font-mono text-[10px] text-center">
                      <th className="p-2 border-r border-slate-300 w-10 bg-slate-300/60 font-bold">#</th>
                      {headers.map((_, idx) => (
                        <th key={idx} className="p-1.5 border-r border-slate-300 font-bold uppercase">
                          {getColLetter(idx)}
                        </th>
                      ))}
                    </tr>
                    {/* Row 2: First Data Row as Table Header */}
                    <tr className="bg-slate-900 text-slate-100 font-bold border-b border-slate-800">
                      <td className="p-3 border-r border-slate-800 text-center font-mono text-[11px] bg-slate-950 text-slate-400">
                        1
                      </td>
                      {headers.map((col: any, idx: number) => (
                        <th key={idx} className="p-3 border-r border-slate-800 whitespace-nowrap font-serif">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredRows.map((row: any[], rIdx: number) => {
                      const actualRowIndex = rIdx + 2;
                      return (
                        <tr key={rIdx} className="hover:bg-amber-50/60 transition-colors">
                          <td className="p-3 border-r border-slate-200 text-center font-mono text-[10px] text-slate-400 bg-slate-50 font-bold">
                            {actualRowIndex}
                          </td>
                          {headers.map((_, cIdx: number) => {
                            const cellValue = row[cIdx] !== undefined ? row[cIdx] : '';
                            const isHighlighted =
                              searchQuery &&
                              cellValue &&
                              String(cellValue).toLowerCase().includes(searchQuery.toLowerCase());

                            return (
                              <td
                                key={cIdx}
                                className={`p-3 border-r border-slate-200/80 text-slate-800 whitespace-nowrap transition-colors ${
                                  isHighlighted ? 'bg-amber-200/80 font-bold text-amber-950' : ''
                                }`}
                              >
                                {cellValue}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-3.5 bg-slate-900 text-slate-300 border-t border-slate-800 shrink-0 text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>
              Google Workspace Live Sync • Powered by Google Sheets API v4
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-400">
              Read-only mode active. Edits are disabled in this preview view.
            </span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
