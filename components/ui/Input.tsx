'use client';

import React, { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-800',
            'text-gray-900 dark:text-gray-100 placeholder:text-gray-400',
            'transition-colors focus:outline-none',
            error
              ? 'border-orange-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-200'
              : 'border-gray-200 dark:border-gray-700 focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800',
            'min-h-[48px]',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-orange-600 dark:text-orange-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <textarea
          ref={ref}
          className={cn(
            'w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-800',
            'text-gray-900 dark:text-gray-100 placeholder:text-gray-400',
            'transition-colors focus:outline-none resize-none',
            error
              ? 'border-orange-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-200'
              : 'border-gray-200 dark:border-gray-700 focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800',
            'min-h-[120px]',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-orange-600 dark:text-orange-400">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Input, Textarea };
