import { Clock, Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DueBadgeProps {
  count: number;
  urgency?: 'none' | 'soon' | 'urgent' | 'auto';
  className?: string;
}

const DueBadge = ({ count, urgency = 'auto', className }: DueBadgeProps) => {
  // Auto-determine urgency based on count
  const getUrgency = (): 'none' | 'soon' | 'urgent' => {
    if (urgency !== 'auto') return urgency;
    if (count === 0) return 'none';
    if (count <= 10) return 'soon';
    return 'urgent';
  };

  const actualUrgency = getUrgency();

  const variants = {
    none: {
      bg: 'bg-success-100 text-success-700',
      icon: Check,
      iconColor: 'text-success-600',
    },
    soon: {
      bg: 'bg-accent-100 text-accent-700',
      icon: Clock,
      iconColor: 'text-accent-600',
    },
    urgent: {
      bg: 'bg-error-100 text-error-700',
      icon: AlertCircle,
      iconColor: 'text-error-600',
    },
  };

  const { bg, icon: Icon, iconColor } = variants[actualUrgency];

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold',
        bg,
        className
      )}
    >
      <Icon size={14} className={iconColor} />
      <span>{count === 0 ? 'All done' : `${count} due`}</span>
    </div>
  );
};

export { DueBadge };
