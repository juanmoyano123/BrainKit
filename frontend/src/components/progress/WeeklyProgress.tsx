import { cn } from '@/lib/utils';

export interface DayData {
  day: string; // Mon, Tue, Wed, etc.
  value: number; // number of cards studied
}

export interface WeeklyProgressProps {
  data: DayData[]; // Should have 7 items
  goal?: number;
  showLabels?: boolean;
  className?: string;
}

const WeeklyProgress = ({
  data,
  goal,
  showLabels = true,
  className,
}: WeeklyProgressProps) => {
  const maxValue = Math.max(...data.map((d) => d.value), goal || 0);
  const totalCards = data.reduce((sum, d) => sum + d.value, 0);
  const totalGoal = (goal || 0) * 7;
  const overallProgress = totalGoal > 0 ? (totalCards / totalGoal) * 100 : 0;

  const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });

  return (
    <div className={cn('w-full', className)}>
      {/* Weekly bars */}
      <div className="flex items-end justify-between gap-1.5 h-32 mb-2">
        {data.map((dayData, index) => {
          const height = maxValue > 0 ? (dayData.value / maxValue) * 100 : 0;
          const isToday = dayData.day === today;

          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="relative w-full h-full">
                {/* Goal line */}
                {goal && maxValue > 0 && (
                  <div
                    className="absolute w-full border-t border-dashed border-gray-400"
                    style={{ bottom: `${(goal / maxValue) * 100}%` }}
                  />
                )}
                {/* Bar */}
                <div className="absolute bottom-0 w-full">
                  <div
                    className={cn(
                      'w-full rounded-t transition-all duration-300 ease-out',
                      isToday ? 'bg-gradient-accent' : 'bg-gradient-progress'
                    )}
                    style={{ height: `${height}%`, minHeight: dayData.value > 0 ? '4px' : '0' }}
                  />
                </div>
              </div>
              {/* Label */}
              {showLabels && (
                <span
                  className={cn(
                    'text-xs font-medium',
                    isToday ? 'text-accent-700' : 'text-gray-500'
                  )}
                >
                  {dayData.day.slice(0, 1)}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Total progress bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Weekly Progress</span>
          <span className="text-sm font-mono text-gray-900">
            {totalCards}/{totalGoal} cards
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-progress rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, overallProgress)}%` }}
          />
        </div>
        <span className="text-xs text-gray-500 mt-1 inline-block">
          {Math.round(overallProgress)}% of weekly goal
        </span>
      </div>
    </div>
  );
};

export { WeeklyProgress };
