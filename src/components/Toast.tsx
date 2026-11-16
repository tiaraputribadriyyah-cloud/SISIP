import React from 'react';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

interface ToastProps {
  message: string;
  subMessage?: string;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, subMessage, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-bounce-in">
      <div className="bg-[#243D35] text-[#F5F1E8] p-4 rounded-lg shadow-brutal-orange border-2 border-[#252525] flex items-start gap-3">
        <div className="p-1 bg-[#D98555] rounded text-white shrink-0">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm leading-tight text-[#E9DCA7]">{message}</p>
          {subMessage && <p className="text-xs text-cream-200 mt-0.5">{subMessage}</p>}
        </div>
        <button
          onClick={onClose}
          className="text-cream-300 hover:text-white p-0.5 rounded transition-colors"
          aria-label="Tutup notifikasi"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
