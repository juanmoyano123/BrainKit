import { TrendingUp, TrendingDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  meta?: string;
  trend?: 'up' | 'down';
  iconBg?: 'primary' | 'accent' | 'success' | 'gray';
  className?: string;
}

const StatCard = ({
  icon: Icon,
  value,
  label,
  meta,
  trend,
  iconBg = 'primary',
  className,
}: StatCardProps) => {
  const iconBgColors = {
    primary: 'bg-primary-100 text-primary-600',
    accent: 'bg-accent-100 text-accent-600',
    success: 'bg-success-100 text-success-600',
    gray: 'bg-gray-100 text-gray-600',
  };

  return (
    <div
      className={cn(
        'bg-white rounded-card p-5 border border-gray-200 shadow-card',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-900 font-mono animate-count-up">
            {value}
          </p>
          {(meta || trend) && (
            <div className="flex items-center gap-2 mt-2">
              {trend && (
                <span
                  className={cn(
                    'inline-flex items-center gap-1 text-xs font-medium',
                    trend === 'up' && 'text-success-600',
                    trend === 'down' && 'text-error-600'
                  )}
                >
                  {trend === 'up' ? (
                    <TrendingUp size={14} />
                  ) : (
                    <TrendingDown size={14} />
                  )}
                </span>
              )}
              {meta && <span className="text-xs text-gray-500">{meta}</span>}
            </div>
          )}
        </div>
        <div className={cn('rounded-lg p-3', iconBgColors[iconBg])}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

export { StatCard };
