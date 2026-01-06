import { cn } from '@/lib/utils';

export interface ProgressBarProps {
  value: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  color?: 'primary' | 'accent' | 'success' | 'error';
  animated?: boolean;
  className?: string;
}

const ProgressBar = ({
  value,
  size = 'md',
  showLabel = false,
  color = 'primary',
  animated = true,
  className,
}: ProgressBarProps) => {
  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const colors = {
    primary: 'bg-gradient-progress',
    accent: 'bg-gradient-accent',
    success: 'bg-success-600',
    error: 'bg-error-600',
  };

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between mb-1">
        {showLabel && (
          <span className="text-sm font-medium text-gray-700">{Math.round(value)}%</span>
        )}
      </div>
      <div className={cn('w-full bg-gray-200 rounded-full overflow-hidden', sizes[size])}>
        <div
          className={cn(
            'h-full rounded-full',
            colors[color],
            animated && 'transition-all duration-300 ease-out'
          )}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
};

export { ProgressBar };
