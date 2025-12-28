import { forwardRef } from 'react';
import type { TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'w-full px-4 py-3 border border-gray-300 rounded-input text-base bg-white text-gray-900 transition-colors duration-150',
          'placeholder:text-gray-400',
          'focus:border-primary-500 focus:shadow-ring focus:outline-none',
          'resize-none',
          error && 'border-error-500 focus:shadow-ring-error',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
