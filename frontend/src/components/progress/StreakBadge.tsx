import { Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StreakBadgeProps {
  count: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'active' | 'frozen';
  showAnimation?: boolean;
  className?: string;
}

const StreakBadge = ({
  count,
  size = 'md',
  variant = 'default',
  showAnimation = false,
  className,
}: StreakBadgeProps) => {
  const sizes = {
    sm: { icon: 16, text: 'text-sm', padding: 'px-2 py-1', gap: 'gap-1' },
    md: { icon: 20, text: 'text-base', padding: 'px-3 py-1.5', gap: 'gap-1.5' },
    lg: { icon: 48, text: 'text-4xl', padding: 'px-6 py-4', gap: 'gap-3' },
  };

  const variants = {
    default: 'bg-accent-100 text-accent-700',
    active:
      'bg-gradient-to-br from-accent-100 to-accent-200 text-accent-700 ring-2 ring-accent-300',
    frozen: 'bg-gray-100 text-gray-500',
  };

  const iconColors = {
    default: 'text-accent-500',
    active: 'text-accent-500',
    frozen: 'text-gray-400',
  };

  const { icon, text, padding, gap } = sizes[size];

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full font-semibold font-mono',
        variants[variant],
        padding,
        gap,
        showAnimation && 'animate-streak-pulse',
        className
      )}
    >
      <Flame size={icon} className={iconColors[variant]} fill="currentColor" />
      <span className={text}>{count}</span>
      {size === 'lg' && <span className="text-sm font-normal">day streak</span>}
    </div>
  );
};

export { StreakBadge };
