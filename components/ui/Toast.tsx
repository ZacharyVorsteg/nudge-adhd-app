'use client';

import React from 'react';
import { X, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  id: string;
  message: string;
  variant: ToastVariant;
  onClose: (id: string) => void;
}

const variantConfig = {
  success: {
    icon: CheckCircle,
    containerClass: 'bg-sage-50 dark:bg-sage-900/90 border-sage-200 dark:border-sage-800',
    iconClass: 'text-sage-600 dark:text-sage-400',
    textClass: 'text-sage-800 dark:text-sage-200',
  },
  error: {
    icon: XCircle,
    containerClass: 'bg-red-50 dark:bg-red-900/90 border-red-200 dark:border-red-800',
    iconClass: 'text-red-600 dark:text-red-400',
    textClass: 'text-red-800 dark:text-red-200',
  },
  warning: {
    icon: AlertTriangle,
    containerClass: 'bg-yellow-50 dark:bg-yellow-900/90 border-yellow-200 dark:border-yellow-800',
    iconClass: 'text-yellow-600 dark:text-yellow-400',
    textClass: 'text-yellow-800 dark:text-yellow-200',
  },
  info: {
    icon: Info,
    containerClass: 'bg-primary-50 dark:bg-primary-900/90 border-primary-200 dark:border-primary-800',
    iconClass: 'text-primary-600 dark:text-primary-400',
    textClass: 'text-primary-800 dark:text-primary-200',
  },
};

export function Toast({ id, message, variant, onClose }: ToastProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-sm',
        'animate-slide-up transition-all duration-300',
        'max-w-sm w-full',
        config.containerClass
      )}
      role="alert"
    >
      <Icon className={cn('w-5 h-5 flex-shrink-0', config.iconClass)} />
      <p className={cn('flex-1 text-sm font-medium', config.textClass)}>
        {message}
      </p>
      <button
        onClick={() => onClose(id)}
        className={cn(
          'flex-shrink-0 p-1 rounded-lg transition-colors',
          'hover:bg-black/10 dark:hover:bg-white/10',
          config.textClass
        )}
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export interface ToastContainerProps {
  toasts: Array<{
    id: string;
    message: string;
    variant: ToastVariant;
  }>;
  onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          variant={toast.variant}
          onClose={onClose}
        />
      ))}
    </div>
  );
}
