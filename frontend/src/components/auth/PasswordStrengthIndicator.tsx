/**
 * Password Strength Indicator Component
 *
 * Displays a visual indicator of password strength with:
 * - Color-coded progress bar (red/yellow/green)
 * - Strength label (Weak/Medium/Strong)
 * - Requirements checklist
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface PasswordStrengthIndicatorProps {
  password: string;
  className?: string;
}

/**
 * Calculate password strength based on requirements
 */
const calculatePasswordStrength = (password: string) => {
  let strength = 0;
  const checks = {
    length: password.length >= 8,
    number: /[0-9]/.test(password),
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  // Award points for each requirement met
  if (checks.length) strength += 20;
  if (checks.number) strength += 20;
  if (checks.uppercase) strength += 20;
  if (checks.lowercase) strength += 20;
  if (checks.special) strength += 20;

  // Bonus for longer passwords
  if (password.length >= 12) strength += 10;
  if (password.length >= 16) strength += 10;

  // Cap at 100
  strength = Math.min(strength, 100);

  return { strength, checks };
};

/**
 * Get strength level and color
 */
const getStrengthLevel = (strength: number) => {
  if (strength < 40) {
    return {
      level: 'Weak',
      color: 'error',
      bgColor: 'bg-error-500',
      textColor: 'text-error-700',
    };
  } else if (strength < 70) {
    return {
      level: 'Medium',
      color: 'warning',
      bgColor: 'bg-warning-500',
      textColor: 'text-warning-700',
    };
  } else {
    return {
      level: 'Strong',
      color: 'success',
      bgColor: 'bg-success-500',
      textColor: 'text-success-700',
    };
  }
};

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  password,
  className,
}) => {
  // Don't show indicator if password is empty
  if (!password) {
    return null;
  }

  const { strength, checks } = calculatePasswordStrength(password);
  const { level, bgColor, textColor } = getStrengthLevel(strength);

  return (
    <div className={cn('space-y-2', className)}>
      {/* Progress bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Password strength</span>
          <span className={cn('text-sm font-semibold', textColor)}>{level}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={cn('h-full rounded-full transition-all duration-300', bgColor)}
            style={{ width: `${strength}%` }}
          />
        </div>
      </div>

      {/* Requirements checklist */}
      <div className="space-y-1">
        <p className="text-xs text-gray-600">Password must contain:</p>
        <ul className="space-y-0.5 text-xs">
          <RequirementItem met={checks.length} text="At least 8 characters" />
          <RequirementItem met={checks.number} text="At least 1 number" />
          <RequirementItem met={checks.uppercase} text="At least 1 uppercase letter" />
        </ul>
      </div>
    </div>
  );
};

/**
 * Individual requirement item
 */
interface RequirementItemProps {
  met: boolean;
  text: string;
}

const RequirementItem: React.FC<RequirementItemProps> = ({ met, text }) => {
  return (
    <li className="flex items-center gap-1.5">
      {met ? (
        <svg
          className="w-4 h-4 text-success-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <circle cx="12" cy="12" r="10" strokeWidth={2} />
        </svg>
      )}
      <span className={cn('text-xs', met ? 'text-success-700' : 'text-gray-600')}>{text}</span>
    </li>
  );
};
