import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, icon, type, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
        )}
        <input
          type={type}
          className={cn(
            'h-11 w-full px-4 border border-gray-300 rounded-input text-base bg-white text-gray-900 transition-colors duration-150',
            'placeholder:text-gray-400',
            'focus:border-primary-500 focus:shadow-ring focus:outline-none',
            error && 'border-error-500 focus:shadow-ring-error',
            icon && 'pl-11',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
