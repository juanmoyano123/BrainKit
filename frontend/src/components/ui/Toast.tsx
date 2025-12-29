/**
 * Toast Component
 *
 * Simple toast notification for success/error messages.
 */

import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg z-50',
        'animate-in slide-in-from-bottom-5 fade-in duration-300',
        type === 'success' && 'bg-success-50 border border-success-200 text-success-800',
        type === 'error' && 'bg-error-50 border border-error-200 text-error-800'
      )}
    >
      {type === 'success' ? (
        <CheckCircle className="w-5 h-5 text-success-600" />
      ) : (
        <AlertCircle className="w-5 h-5 text-error-600" />
      )}
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 p-1 hover:bg-black/5 rounded">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
