import { cn } from '@/lib/utils';

export type SegmentResult = 'correct' | 'incorrect' | 'pending';

export interface SessionProgressBarProps {
  current: number;
  total: number;
  results?: SegmentResult[]; // Results for each card
  showSegmented?: boolean;
  className?: string;
}

const SessionProgressBar = ({
  current,
  total,
  results = [],
  showSegmented = false,
  className,
}: SessionProgressBarProps) => {
  const progress = (current / total) * 100;

  const segmentColors: Record<SegmentResult, string> = {
    correct: 'bg-success-600',
    incorrect: 'bg-error-600',
    pending: 'bg-gray-200',
  };

  if (showSegmented && results.length > 0) {
    return (
      <div className={cn('w-full', className)}>
        <div className="flex items-center gap-0.5 h-2 rounded-full overflow-hidden bg-gray-100">
          {Array.from({ length: total }).map((_, index) => {
            const result = results[index] || 'pending';
            const isCurrent = index === current;

            return (
              <div
                key={index}
                className={cn(
                  'flex-1 h-full transition-all duration-200',
                  segmentColors[result],
                  isCurrent && 'animate-pulse ring-1 ring-primary-500'
                )}
              />
            );
          })}
        </div>
      </div>
    );
  }

  // Continuous mode
  return (
    <div className={cn('w-full', className)}>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-progress rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.min(100, progress)}%` }}
        />
      </div>
    </div>
  );
};

export { SessionProgressBar };
