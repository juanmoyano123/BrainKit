import { cn } from '@/lib/utils';

export interface ProgressRingProps {
  value: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

const ProgressRing = ({
  value,
  size = 'md',
  showLabel = true,
  label,
  className,
}: ProgressRingProps) => {
  const sizes = {
    sm: { dimension: 48, strokeWidth: 4, fontSize: 'text-sm' },
    md: { dimension: 80, strokeWidth: 6, fontSize: 'text-lg' },
    lg: { dimension: 120, strokeWidth: 8, fontSize: 'text-2xl' },
  };

  const { dimension, strokeWidth, fontSize } = sizes[size];
  const radius = (dimension - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        width={dimension}
        height={dimension}
        className="transform -rotate-90"
      >
        {/* Gradient definition */}
        <defs>
          <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#0D9488" />
          </linearGradient>
        </defs>

        {/* Background circle */}
        <circle
          cx={dimension / 2}
          cy={dimension / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200"
        />

        {/* Progress circle */}
        <circle
          cx={dimension / 2}
          cy={dimension / 2}
          r={radius}
          stroke="url(#progress-gradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500 ease-out"
        />
      </svg>

      {/* Label */}
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn('font-bold text-gray-900', fontSize)}>
            {label || `${Math.round(value)}%`}
          </span>
        </div>
      )}
    </div>
  );
};

export { ProgressRing };
