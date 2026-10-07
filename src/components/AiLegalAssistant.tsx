import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, Loader2, Scale, User, RefreshCw, ChevronRight, MessageSquare } from 'lucide-react';
import { AiChatMessage } from '../types';

interface AiLegalAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultation: (serviceCategory?: string) => void;
}

export const AiLegalAssistant: React.FC<AiLegalAssistantProps> = ({
  isOpen,
  onClose,
  onOpenConsultation
}) => {
  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: "Assalamu Alaikum! I am the E-Lawyers AI Corporate Advisor. I can answer questions regarding Bangladesh Companies Act 1994, RJSC annual return deadlines, director changes, share transfers, trademark registration, or secretarial requirements. How can I assist your business today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const samplePrompts = [
    "When is the RJSC Annual Return filing deadline?",
    "What are the steps for appointing a Foreign Director?",
    "How to transfer shares in a Private Limited company?",
    "How much does Trademark registration cost in Bangladesh?",
    "What documents are needed for Increasing Authorized Capital?"
  ];

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSendMessage = async (textToSend?: string) => {
    const promptText = textToSend || inputPrompt;
    if (!promptText.trim() || isLoading) return;

    const userMessage: AiChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          history: messages.slice(-6)
        })
      });

      const data = await response.json();

      const assistantMsg: AiChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: data.answer || "Thank you. For customized legal assistance, please speak with our senior corporate lawyers directly.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      const errorMsg: AiChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: "I am having trouble connecting to the legal knowledge base right now. Please book a consultation at https://appointment.accounticca.com/.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-lg bg-white border-l border-slate-200 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-500 text-slate-950 rounded-lg font-bold shadow-sm">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-slate-900 text-sm font-serif">E-Lawyers AI Advisor</h3>
                <span className="bg-amber-100 text-amber-800 border border-amber-300 text-[10px] px-1.5 py-0.2 rounded font-mono font-semibold">
                  Gemini 3.6
                </span>
              </div>
              <p className="text-[11px] text-slate-600">Bangladesh Companies Act & RJSC Knowledge Base</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-200"
            aria-label="Close Assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          {messages.map((msg) => {
            const isAi = msg.sender === 'assistant';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isAi ? 'justify-start' : 'justify-end'}`}
              >
                {isAi && (
                  <div className="w-7 h-7 rounded-lg bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center shrink-0 mt-1">
                    <Scale className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                  isAi
                    ? 'bg-white text-slate-800 border border-slate-200 shadow-sm'
                    : 'bg-amber-500 text-slate-950 font-medium'
                }`}>
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <div className={`text-[10px] mt-1.5 flex items-center justify-between gap-2 ${
                    isAi ? 'text-slate-400' : 'text-slate-900/70 font-semibold'
                  }`}>
                    <span>{msg.timestamp}</span>
                    {isAi && (
                      <button
                        onClick={() => {
                          window.open('https://appointment.accounticca.com/', '_blank');
                        }}
                        className="text-amber-800 font-semibold hover:underline flex items-center gap-0.5"
                      >
                        Talk to Human Lawyer <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                {!isAi && (
                  <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 items-center text-xs text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200">
              <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
              <span>Analyzing Bangladesh Companies Act & RJSC regulations...</span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Suggested Prompts Strip */}
        <div className="px-4 py-2 bg-slate-100 border-t border-slate-200">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-600" />
            Suggested Legal Inquiries:
          </p>
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {samplePrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="shrink-0 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-amber-800 text-[11px] px-2.5 py-1 rounded-lg transition-all text-left whitespace-nowrap shadow-sm"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Ask about RJSC filing, director change, share transfer..."
              disabled={isLoading}
              className="flex-1 bg-slate-50 border border-slate-300 focus:border-amber-500 text-slate-900 placeholder-slate-400 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isLoading || !inputPrompt.trim()}
              className="bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold p-2.5 rounded-xl transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-[10px] text-slate-500 text-center mt-2">
            AI responses provide general legal information based on Bangladesh laws. For official representation, consult E-Lawyers corporate team.
          </p>
        </div>

      </div>
    </div>
  );
};
