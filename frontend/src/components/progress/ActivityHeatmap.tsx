import { useState } from 'react';
import { cn } from '@/lib/utils';

export interface ActivityData {
  date: string; // YYYY-MM-DD format
  count: number;
}

export interface ActivityHeatmapProps {
  data: ActivityData[];
  year?: number;
  className?: string;
}

const ActivityHeatmap = ({ data, year = new Date().getFullYear(), className }: ActivityHeatmapProps) => {
  const [tooltip, setTooltip] = useState<{ date: string; count: number; x: number; y: number } | null>(null);

  // Generate 53 weeks x 7 days grid
  const weeks = 53;
  const daysPerWeek = 7;

  // Calculate intensity level (0-4)
  const getLevel = (count: number): number => {
    if (count === 0) return 0;
    if (count <= 5) return 1;
    if (count <= 15) return 2;
    if (count <= 30) return 3;
    return 4;
  };

  // Get count for specific date
  const getCountForDate = (date: Date): number => {
    const dateStr = date.toISOString().split('T')[0];
    return data.find((d) => d.date === dateStr)?.count || 0;
  };

  // Generate grid data
  const startDate = new Date(year, 0, 1);
  const dayOfWeek = startDate.getDay();

  const gridData: { date: Date; count: number }[][] = [];
  let currentDate = new Date(startDate);
  currentDate.setDate(currentDate.getDate() - dayOfWeek); // Start from Sunday

  for (let week = 0; week < weeks; week++) {
    const weekData: { date: Date; count: number }[] = [];
    for (let day = 0; day < daysPerWeek; day++) {
      const count = getCountForDate(currentDate);
      weekData.push({ date: new Date(currentDate), count });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    gridData.push(weekData);
  }

  const levelColors = [
    'bg-gray-100', // 0
    'bg-primary-200', // 1
    'bg-primary-400', // 2
    'bg-primary-600', // 3
    'bg-primary-800', // 4
  ];

  const totalCards = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className={cn('relative', className)}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Activity Overview</h3>
        <p className="text-sm text-gray-500">
          {totalCards} cards studied in the last year
        </p>
      </div>

      {/* Heatmap grid */}
      <div className="overflow-x-auto">
        <div className="inline-flex gap-0.5">
          {gridData.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-0.5">
              {week.map((day, dayIndex) => {
                const level = getLevel(day.count);
                const dateStr = day.date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });

                return (
                  <div
                    key={dayIndex}
                    className={cn(
                      'w-2.5 h-2.5 rounded-sm transition-all cursor-pointer',
                      levelColors[level],
                      'hover:ring-2 hover:ring-primary-500 hover:ring-offset-1'
                    )}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setTooltip({
                        date: dateStr,
                        count: day.count,
                        x: rect.left + rect.width / 2,
                        y: rect.top,
                      });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-4">
        <span className="text-xs text-gray-500">Less</span>
        {levelColors.map((color, index) => (
          <div key={index} className={cn('w-2.5 h-2.5 rounded-sm', color)} />
        ))}
        <span className="text-xs text-gray-500">More</span>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg pointer-events-none"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y - 30}px`,
            transform: 'translateX(-50%)',
          }}
        >
          {tooltip.date}: {tooltip.count} cards
        </div>
      )}
    </div>
  );
};

export { ActivityHeatmap };
