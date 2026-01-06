# Component Library - BrainKit V2

**Version:** 2.0
**Fecha:** Enero 2026
**Enfoque:** Componentes de Progress Tracking

---

## 1. Progress Ring

### Descripcion
Componente circular que muestra porcentaje de progreso/mastery.

### Props Interface

```typescript
interface ProgressRingProps {
  value: number;         // 0-100
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  className?: string;
}
```

### Tamaños

| Size | Dimensions | Stroke Width | Font Size |
|------|------------|--------------|-----------|
| sm   | 48x48px    | 4px          | 12px      |
| md   | 80x80px    | 6px          | 16px      |
| lg   | 120x120px  | 8px          | 24px      |

### CSS/Tailwind Implementation

```tsx
// ProgressRing.tsx
import React from 'react';

interface ProgressRingProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

const sizeConfig = {
  sm: { dimension: 48, strokeWidth: 4, fontSize: 'text-xs', radius: 20 },
  md: { dimension: 80, strokeWidth: 6, fontSize: 'text-base', radius: 33 },
  lg: { dimension: 120, strokeWidth: 8, fontSize: 'text-2xl', radius: 52 },
};

export const ProgressRing: React.FC<ProgressRingProps> = ({
  value,
  size = 'md',
  showLabel = true,
  label,
  className = '',
}) => {
  const config = sizeConfig[size];
  const circumference = 2 * Math.PI * config.radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={config.dimension}
        height={config.dimension}
        className="-rotate-90"
      >
        <defs>
          <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
        {/* Background circle */}
        <circle
          cx={config.dimension / 2}
          cy={config.dimension / 2}
          r={config.radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={config.strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={config.dimension / 2}
          cy={config.dimension / 2}
          r={config.radius}
          fill="none"
          stroke="url(#progress-gradient)"
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-500 ease-out"
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-bold text-gray-900 font-mono ${config.fontSize}`}>
            {value}%
          </span>
          {label && (
            <span className="text-xs text-gray-500 mt-0.5">{label}</span>
          )}
        </div>
      )}
    </div>
  );
};
```

### Usage Examples

```tsx
// Small - En deck cards
<ProgressRing value={75} size="sm" />

// Medium - En deck detail
<ProgressRing value={85} size="md" label="Mastery" />

// Large - En hero sections
<ProgressRing value={92} size="lg" label="Mastery Level" />
```

### Visual Reference

```
     +----------+
    /    ----    \
   /   /      \   \
  |   |  75%   |   |   <- Text centered
  |   |        |   |
   \   \      /   /
    \    ----    /
     +----------+
```

---

## 2. Streak Badge

### Descripcion
Badge que muestra el streak actual del usuario con icono de fuego.

### Props Interface

```typescript
interface StreakBadgeProps {
  count: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'active' | 'frozen';
  showAnimation?: boolean;
  className?: string;
}
```

### Variantes

| Variant | Background | Icon Color | Use Case |
|---------|------------|------------|----------|
| default | accent-100 | accent-500 | Normal state |
| active  | accent-200 with glow | accent-500 | Just incremented |
| frozen  | gray-100 | gray-400 | Streak lost/paused |

### CSS/Tailwind Implementation

```tsx
// StreakBadge.tsx
import React from 'react';
import { Flame } from 'lucide-react';

interface StreakBadgeProps {
  count: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'active' | 'frozen';
  showAnimation?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: { padding: 'px-2.5 py-1', icon: 'w-3.5 h-3.5', text: 'text-xs', gap: 'gap-1' },
  md: { padding: 'px-3 py-1.5', icon: 'w-4 h-4', text: 'text-sm', gap: 'gap-1.5' },
  lg: { padding: 'px-4 py-2', icon: 'w-5 h-5', text: 'text-base', gap: 'gap-2' },
};

const variantConfig = {
  default: {
    bg: 'bg-accent-100',
    text: 'text-accent-700',
    icon: 'text-accent-500',
  },
  active: {
    bg: 'bg-gradient-to-r from-accent-100 to-accent-200 ring-2 ring-accent-300',
    text: 'text-accent-700',
    icon: 'text-accent-500',
  },
  frozen: {
    bg: 'bg-gray-100',
    text: 'text-gray-500',
    icon: 'text-gray-400',
  },
};

export const StreakBadge: React.FC<StreakBadgeProps> = ({
  count,
  size = 'md',
  variant = 'default',
  showAnimation = false,
  className = '',
}) => {
  const sizeClasses = sizeConfig[size];
  const variantClasses = variantConfig[variant];

  return (
    <div
      className={`
        inline-flex items-center rounded-full font-semibold
        ${sizeClasses.padding} ${sizeClasses.gap} ${sizeClasses.text}
        ${variantClasses.bg} ${variantClasses.text}
        ${showAnimation ? 'animate-streak-pulse' : ''}
        ${className}
      `}
    >
      <Flame className={`${sizeClasses.icon} ${variantClasses.icon}`} />
      <span className="font-mono">{count}</span>
    </div>
  );
};
```

### Animation CSS

```css
@keyframes streak-pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); box-shadow: 0 0 20px rgba(245, 158, 11, 0.5); }
  100% { transform: scale(1); }
}

.animate-streak-pulse {
  animation: streak-pulse 0.5s ease-out;
}
```

### Usage Examples

```tsx
// In header
<StreakBadge count={12} size="sm" />

// In hero section
<StreakBadge count={12} size="lg" variant="active" showAnimation />

// Streak lost
<StreakBadge count={0} size="md" variant="frozen" />
```

### Visual Reference

```
+------------------+
|  [Fire] 12       |   <- Default
+------------------+

+------------------+
|  [Fire] 12  glow |   <- Active (con glow)
+------------------+

+------------------+
|  [Fire] 0        |   <- Frozen (gris)
+------------------+
```

---

## 3. Stat Card

### Descripcion
Tarjeta para mostrar una metrica individual con icono, valor y metadata.

### Props Interface

```typescript
interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  meta?: string;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  iconBg?: 'primary' | 'accent' | 'success' | 'gray';
  className?: string;
}
```

### CSS/Tailwind Implementation

```tsx
// StatCard.tsx
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  meta?: string;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  iconBg?: 'primary' | 'accent' | 'success' | 'gray';
  className?: string;
}

const iconBgConfig = {
  primary: 'bg-primary-100 text-primary-600',
  accent: 'bg-accent-100 text-accent-600',
  success: 'bg-success-100 text-success-600',
  gray: 'bg-gray-100 text-gray-600',
};

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  value,
  label,
  meta,
  trend,
  iconBg = 'primary',
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-xl p-5 shadow-sm border border-gray-100 ${className}`}>
      {/* Icon */}
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${iconBgConfig[iconBg]}`}>
        {icon}
      </div>

      {/* Value */}
      <div className="text-3xl font-bold text-gray-900 font-mono mb-1">
        {value}
      </div>

      {/* Label */}
      <div className="text-sm text-gray-500 mb-2">
        {label}
      </div>

      {/* Meta / Trend */}
      {(meta || trend) && (
        <div className="text-xs pt-2 border-t border-gray-100">
          {trend ? (
            <span className={`inline-flex items-center gap-1 font-medium ${
              trend.direction === 'up' ? 'text-success-600' : 'text-error-600'
            }`}>
              {trend.direction === 'up' ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {trend.direction === 'up' ? '+' : ''}{trend.value}%
            </span>
          ) : (
            <span className="text-gray-500">{meta}</span>
          )}
        </div>
      )}
    </div>
  );
};
```

### Usage Examples

```tsx
// Cards due
<StatCard
  icon={<Target className="w-5 h-5" />}
  value={24}
  label="Cards due today"
  iconBg="primary"
/>

// With trend
<StatCard
  icon={<Target className="w-5 h-5" />}
  value="87%"
  label="Retention rate"
  trend={{ value: 3, direction: 'up' }}
  iconBg="success"
/>

// With meta
<StatCard
  icon={<Clock className="w-5 h-5" />}
  value="24h 32m"
  label="Study time"
  meta="This month: 8h 15m"
  iconBg="gray"
/>
```

---

## 4. Progress Bar

### Descripcion
Barra de progreso horizontal con animacion.

### Props Interface

```typescript
interface ProgressBarProps {
  value: number;           // 0-100
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  color?: 'primary' | 'accent' | 'success' | 'error';
  animated?: boolean;
  className?: string;
}
```

### Tamaños

| Size | Height |
|------|--------|
| sm   | 4px    |
| md   | 8px    |
| lg   | 12px   |

### CSS/Tailwind Implementation

```tsx
// ProgressBar.tsx
import React from 'react';

interface ProgressBarProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  color?: 'primary' | 'accent' | 'success' | 'error';
  animated?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

const colorConfig = {
  primary: 'bg-gradient-to-r from-primary-500 to-primary-600',
  accent: 'bg-gradient-to-r from-accent-500 to-accent-600',
  success: 'bg-gradient-to-r from-success-500 to-success-600',
  error: 'bg-gradient-to-r from-error-500 to-error-600',
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  size = 'md',
  showLabel = false,
  color = 'primary',
  animated = true,
  className = '',
}) => {
  return (
    <div className={className}>
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeConfig[size]}`}>
        <div
          className={`h-full rounded-full ${colorConfig[color]} ${animated ? 'transition-all duration-500 ease-out' : ''}`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between mt-1 text-xs">
          <span className="text-gray-500">{value}%</span>
        </div>
      )}
    </div>
  );
};
```

### Usage Examples

```tsx
// Simple
<ProgressBar value={75} />

// With label
<ProgressBar value={75} showLabel />

// Accent color
<ProgressBar value={50} color="accent" />

// Small size
<ProgressBar value={90} size="sm" />
```

---

## 5. Weekly Progress

### Descripcion
Visualizacion de progreso semanal con 7 barras verticales.

### Props Interface

```typescript
interface WeeklyProgressProps {
  data: {
    day: string;
    count: number;
    isToday?: boolean;
  }[];
  goal?: number;
  showLabels?: boolean;
  className?: string;
}
```

### CSS/Tailwind Implementation

```tsx
// WeeklyProgress.tsx
import React from 'react';

interface DayData {
  day: string;
  count: number;
  isToday?: boolean;
}

interface WeeklyProgressProps {
  data: DayData[];
  goal?: number;
  showLabels?: boolean;
  className?: string;
}

export const WeeklyProgress: React.FC<WeeklyProgressProps> = ({
  data,
  goal = 30,
  showLabels = true,
  className = '',
}) => {
  const maxCount = Math.max(...data.map(d => d.count), goal);

  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-base font-semibold text-gray-800">This Week</h3>
        <span className="text-sm text-gray-500">Goal: {goal} cards/day</span>
      </div>

      {/* Bars */}
      <div className="flex gap-2 mb-4">
        {data.map((day, index) => {
          const heightPercent = (day.count / maxCount) * 100;
          const isToday = day.isToday;

          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              {/* Bar container */}
              <div className="w-full h-20 bg-gray-100 rounded-md relative overflow-hidden">
                <div
                  className={`absolute bottom-0 left-0 right-0 rounded-md transition-all duration-300 ${
                    isToday
                      ? 'bg-gradient-to-t from-accent-600 to-accent-400'
                      : 'bg-gradient-to-t from-primary-600 to-primary-400'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
                {/* Goal line */}
                {goal && (
                  <div
                    className="absolute left-0 right-0 border-t-2 border-dashed border-gray-300"
                    style={{ bottom: `${(goal / maxCount) * 100}%` }}
                  />
                )}
              </div>

              {/* Labels */}
              {showLabels && (
                <>
                  <span className={`text-xs ${isToday ? 'font-semibold text-accent-600' : 'text-gray-500'}`}>
                    {day.day}
                  </span>
                  <span className="text-xs text-gray-600 font-medium">
                    {day.count || '-'}
                  </span>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Total Progress Bar */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, (data.reduce((a, b) => a + b.count, 0) / (goal * 7)) * 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-700 font-medium">
            {data.reduce((a, b) => a + b.count, 0)} / {goal * 7} cards
          </span>
          <span className="text-primary-600 font-semibold">
            {Math.round((data.reduce((a, b) => a + b.count, 0) / (goal * 7)) * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};
```

### Usage Example

```tsx
<WeeklyProgress
  data={[
    { day: 'Mon', count: 32 },
    { day: 'Tue', count: 28 },
    { day: 'Wed', count: 45 },
    { day: 'Thu', count: 21, isToday: true },
    { day: 'Fri', count: 0 },
    { day: 'Sat', count: 0 },
    { day: 'Sun', count: 0 },
  ]}
  goal={30}
/>
```

---

## 6. Activity Heatmap

### Descripcion
Calendario heatmap estilo GitHub que muestra actividad diaria.

### Props Interface

```typescript
interface ActivityHeatmapProps {
  data: {
    date: string;  // "2026-01-15"
    count: number;
  }[];
  year?: number;
  className?: string;
}
```

### Intensity Levels

| Level | Count Range | Color |
|-------|-------------|-------|
| 0     | 0           | gray-100 |
| 1     | 1-5         | primary-200 |
| 2     | 6-15        | primary-400 |
| 3     | 16-30       | primary-600 |
| 4     | 31+         | primary-800 |

### CSS/Tailwind Implementation

```tsx
// ActivityHeatmap.tsx
import React from 'react';

interface HeatmapData {
  date: string;
  count: number;
}

interface ActivityHeatmapProps {
  data: HeatmapData[];
  year?: number;
  className?: string;
}

const getLevel = (count: number): number => {
  if (count === 0) return 0;
  if (count <= 5) return 1;
  if (count <= 15) return 2;
  if (count <= 30) return 3;
  return 4;
};

const levelColors = {
  0: 'bg-gray-100',
  1: 'bg-primary-200',
  2: 'bg-primary-400',
  3: 'bg-primary-600',
  4: 'bg-primary-800',
};

export const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({
  data,
  year = new Date().getFullYear(),
  className = '',
}) => {
  // Generate all weeks of the year
  const weeks = generateWeeks(year, data);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const totalCount = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className={`bg-white rounded-2xl p-6 border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-base font-semibold text-gray-800">Activity</h3>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          Less
          {[0, 1, 2, 3, 4].map(level => (
            <div key={level} className={`w-3 h-3 rounded-sm ${levelColors[level]}`} />
          ))}
          More
        </div>
      </div>

      {/* Heatmap */}
      <div className="overflow-x-auto">
        {/* Month labels */}
        <div className="flex pl-8 mb-2">
          {months.map(month => (
            <span key={month} className="text-xs text-gray-500 w-16">{month}</span>
          ))}
        </div>

        {/* Grid */}
        <div className="flex">
          {/* Day labels */}
          <div className="flex flex-col gap-1 mr-2">
            <span className="text-[10px] text-gray-500 h-3 leading-3"></span>
            <span className="text-[10px] text-gray-500 h-3 leading-3">Mon</span>
            <span className="text-[10px] text-gray-500 h-3 leading-3"></span>
            <span className="text-[10px] text-gray-500 h-3 leading-3">Wed</span>
            <span className="text-[10px] text-gray-500 h-3 leading-3"></span>
            <span className="text-[10px] text-gray-500 h-3 leading-3">Fri</span>
            <span className="text-[10px] text-gray-500 h-3 leading-3"></span>
          </div>

          {/* Weeks */}
          <div className="flex gap-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`w-3 h-3 rounded-sm cursor-pointer hover:ring-2 hover:ring-primary-500 hover:ring-offset-1 transition-transform hover:scale-110 ${
                      levelColors[getLevel(day?.count || 0)]
                    }`}
                    title={day ? `${day.date}: ${day.count} cards` : ''}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary */}
      <p className="mt-4 text-sm text-gray-600">
        <strong className="text-gray-800 font-semibold">{totalCount.toLocaleString()}</strong> cards studied in {year}
      </p>
    </div>
  );
};

// Helper function to generate weeks
function generateWeeks(year: number, data: HeatmapData[]) {
  // Implementation to generate 53 weeks with 7 days each
  // Returns array of weeks, each week is array of 7 days
  // ... implementation details
}
```

---

## 7. Session Progress Bar

### Descripcion
Barra de progreso especial para sesiones de estudio con segmentos.

### Props Interface

```typescript
interface SessionProgressBarProps {
  current: number;
  total: number;
  results?: ('correct' | 'incorrect' | 'pending')[];
  showSegmented?: boolean;
  className?: string;
}
```

### CSS/Tailwind Implementation

```tsx
// SessionProgressBar.tsx
import React from 'react';

interface SessionProgressBarProps {
  current: number;
  total: number;
  results?: ('correct' | 'incorrect' | 'pending')[];
  showSegmented?: boolean;
  className?: string;
}

export const SessionProgressBar: React.FC<SessionProgressBarProps> = ({
  current,
  total,
  results = [],
  showSegmented = false,
  className = '',
}) => {
  if (showSegmented && results.length > 0) {
    return (
      <div className={className}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">Session Progress</span>
          <span className="text-sm text-gray-500">
            <strong className="text-primary-600 font-semibold">{current}</strong> of {total}
          </span>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: total }).map((_, index) => {
            const result = results[index];
            let bgColor = 'bg-gray-200'; // pending/future

            if (index < current) {
              if (result === 'correct') bgColor = 'bg-success-500';
              else if (result === 'incorrect') bgColor = 'bg-error-400';
              else bgColor = 'bg-primary-500';
            } else if (index === current) {
              bgColor = 'bg-accent-400 animate-pulse';
            }

            return (
              <div
                key={index}
                className={`flex-1 h-2 rounded ${bgColor} transition-colors duration-200`}
              />
            );
          })}
        </div>
      </div>
    );
  }

  // Simple continuous bar
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600">Session Progress</span>
        <span className="text-sm text-gray-500">
          <strong className="text-primary-600 font-semibold">{current}</strong> of {total}
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-300"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
    </div>
  );
};
```

### Usage Examples

```tsx
// Simple
<SessionProgressBar current={12} total={24} />

// Segmented with results
<SessionProgressBar
  current={5}
  total={10}
  results={['correct', 'correct', 'incorrect', 'correct', 'correct']}
  showSegmented
/>
```

---

## 8. Due Badge

### Descripcion
Badge para mostrar cards pendientes de revision.

### Props Interface

```typescript
interface DueBadgeProps {
  count: number;
  urgency?: 'none' | 'soon' | 'urgent';
  className?: string;
}
```

### Variantes

| Urgency | Condition | Colors |
|---------|-----------|--------|
| none    | 0 due     | success-100/700 |
| soon    | 1-10 due  | accent-100/700 |
| urgent  | 10+ due   | error-100/700 |

### CSS/Tailwind Implementation

```tsx
// DueBadge.tsx
import React from 'react';
import { Clock, Check, AlertCircle } from 'lucide-react';

interface DueBadgeProps {
  count: number;
  urgency?: 'none' | 'soon' | 'urgent';
  className?: string;
}

const urgencyConfig = {
  none: {
    bg: 'bg-success-100',
    text: 'text-success-700',
    icon: Check,
  },
  soon: {
    bg: 'bg-accent-100',
    text: 'text-accent-700',
    icon: Clock,
  },
  urgent: {
    bg: 'bg-error-100',
    text: 'text-error-700',
    icon: AlertCircle,
  },
};

export const DueBadge: React.FC<DueBadgeProps> = ({
  count,
  urgency = count === 0 ? 'none' : count <= 10 ? 'soon' : 'urgent',
  className = '',
}) => {
  const config = urgencyConfig[urgency];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text} ${className}`}>
      <Icon className="w-3 h-3" />
      {count === 0 ? 'All done!' : `${count} due`}
    </span>
  );
};
```

### Usage Examples

```tsx
// All caught up
<DueBadge count={0} />

// Some due
<DueBadge count={5} />

// Many due (urgent)
<DueBadge count={24} />
```

---

## 9. Component Export Index

```tsx
// components/progress/index.ts

export { ProgressRing } from './ProgressRing';
export { StreakBadge } from './StreakBadge';
export { StatCard } from './StatCard';
export { ProgressBar } from './ProgressBar';
export { WeeklyProgress } from './WeeklyProgress';
export { ActivityHeatmap } from './ActivityHeatmap';
export { SessionProgressBar } from './SessionProgressBar';
export { DueBadge } from './DueBadge';

// Types
export type { ProgressRingProps } from './ProgressRing';
export type { StreakBadgeProps } from './StreakBadge';
export type { StatCardProps } from './StatCard';
export type { ProgressBarProps } from './ProgressBar';
export type { WeeklyProgressProps } from './WeeklyProgress';
export type { ActivityHeatmapProps } from './ActivityHeatmap';
export type { SessionProgressBarProps } from './SessionProgressBar';
export type { DueBadgeProps } from './DueBadge';
```

---

## 10. Folder Structure

```
src/
  components/
    progress/
      ProgressRing.tsx
      StreakBadge.tsx
      StatCard.tsx
      ProgressBar.tsx
      WeeklyProgress.tsx
      ActivityHeatmap.tsx
      SessionProgressBar.tsx
      DueBadge.tsx
      index.ts
```

---

## 11. Implementation Checklist

- [ ] ProgressRing component
- [ ] StreakBadge component
- [ ] StatCard component
- [ ] ProgressBar component
- [ ] WeeklyProgress component
- [ ] ActivityHeatmap component
- [ ] SessionProgressBar component
- [ ] DueBadge component
- [ ] Export index file
- [ ] Storybook stories (optional)
- [ ] Unit tests

---

*Component Library - BrainKit V2*
*Fecha: Enero 2026*
