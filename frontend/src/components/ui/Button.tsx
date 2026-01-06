import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium cursor-pointer transition-all duration-150 focus:outline-none focus:shadow-ring disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: 'bg-gradient-primary text-white hover:shadow-md active:scale-[0.98]',
      accent: 'bg-gradient-accent text-white hover:shadow-md active:scale-[0.98]',
      secondary:
        'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-primary-300',
      ghost: 'bg-transparent text-primary-600 hover:bg-primary-50',
      danger: 'bg-error-600 text-white hover:bg-error-700 active:scale-[0.98]',
    };

    const sizes = {
      sm: 'h-9 px-4 text-sm rounded-md',
      md: 'h-11 px-5 text-[15px] rounded-button',
      lg: 'h-[52px] px-6 text-base rounded-button',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
