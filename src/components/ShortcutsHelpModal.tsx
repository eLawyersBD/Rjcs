import React, { useEffect } from 'react';
import { X, Command, Keyboard, CheckCircle2, Sparkles, Scale } from 'lucide-react';

interface ShortcutsHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsHelpModal: React.FC<ShortcutsHelpModalProps> = ({ isOpen, onClose }) => {
  const isMac = typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const shortcutGroups = [
    {
      title: 'Global Navigation & Search',
      shortcuts: [
        { key: isMac ? '⌘ K' : 'Ctrl + K', description: 'Open Global Command Palette & Service Search' },
        { key: 'Esc', description: 'Close any active modal, drawer, or search overlay' },
        { key: 'Ctrl + / or ?', description: 'Open this Keyboard Shortcuts Cheat Sheet' }
      ]
    },
    {
      title: 'Quick Actions & Modals',
      shortcuts: [
        { key: isMac ? 'Option + C' : 'Alt + C', description: 'Book Free Legal Consultation' },
        { key: isMac ? 'Option + A' : 'Alt + A', description: 'Toggle AI Legal Assistant' },
        { key: isMac ? 'Option + L' : 'Alt + L', description: 'Switch Language (English / বাংলা)' }
      ]
    },
    {
      title: 'Search Palette Controls',
      shortcuts: [
        { key: '↑ / ↓', description: 'Move selection up or down in command list' },
        { key: 'Enter ↵', description: 'Execute selected command or open service' }
      ]
    }
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-6 transition-all transform animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif text-slate-900">Keyboard Shortcuts</h3>
              <p className="text-xs text-slate-500">Power user navigation for E-Lawyers Portal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Groups */}
        <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-1">
          {shortcutGroups.map((group, idx) => (
            <div key={idx} className="space-y-2.5">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                {group.title}
              </h4>
              <div className="bg-slate-50 border border-slate-200 rounded-xl divide-y divide-slate-200/80 overflow-hidden">
                {group.shortcuts.map((sc, sIdx) => (
                  <div key={sIdx} className="flex items-center justify-between px-3.5 py-2.5 text-xs">
                    <span className="text-slate-700 font-medium">{sc.description}</span>
                    <kbd className="px-2 py-1 bg-white border border-slate-300 rounded-md font-mono text-[11px] font-bold text-slate-800 shadow-2xs whitespace-nowrap">
                      {sc.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-200">
          <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Active across all sections</span>
          </div>
          <button
            onClick={onClose}
            className="bg-[#00C896] hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-colors shadow-sm"
          >
            Got it (Esc)
          </button>
        </div>
      </div>
    </div>
  );
};
