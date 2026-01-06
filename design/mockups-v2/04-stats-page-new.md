# Stats Page (NEW) - BrainKit V2

**Pagina:** StatsPage.tsx (NUEVA)
**Prioridad:** Media-Alta
**Descripcion:** Pagina completa de estadisticas y progreso historico

---

## 1. Estructura de Pagina

### Layout General

```
+------------------------------------------------------------------+
|                           HEADER                                   |
|  [Logo]              Your Progress              [Avatar] [Logout]  |
+------------------------------------------------------------------+
|                                                                    |
|  +------------------------------------------------------------+   |
|  |                    HERO STATS SECTION                       |   |
|  |                                                              |  |
|  |  +------------+  +------------+  +------------+  +----------+ |  |
|  |  | Streak     |  | Total      |  | Retention  |  | Study    | |  |
|  |  | 13 days    |  | Studied    |  | Rate       |  | Time     | |  |
|  |  | [Fire]     |  | 2,847      |  | 87%        |  | 24h 32m  | |  |
|  |  +------------+  +------------+  +------------+  +----------+ |  |
|  |                                                              |  |
|  +------------------------------------------------------------+  |
|                                                                    |
|  +------------------------------------------------------------+   |
|  |                 ACTIVITY HEATMAP (GitHub style)             |   |
|  |                                                              |  |
|  |  2025                                                        |  |
|  |  Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec Jan         |  |
|  |  [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]...        |  |
|  |  [ ][ ][ ][ ][ ][#][#][ ][ ][ ][ ][ ][ ][ ][ ][ ]...        |  |
|  |  [ ][ ][ ][#][#][#][#][#][ ][ ][ ][ ][ ][ ][ ][ ]...        |  |
|  |  [ ][ ][ ][#][#][#][#][#][#][ ][ ][ ][ ][ ][ ][ ]...        |  |
|  |  [ ][ ][ ][ ][#][#][#][#][#][#][ ][ ][ ][ ][ ][ ]...        |  |
|  |  Mon                                                         |  |
|  |  Wed                                                         |  |
|  |  Fri                                                         |  |
|  |                                                              |  |
|  |  Legend: [ ] 0  [.] 1-5  [o] 6-15  [O] 16-30  [#] 31+       |  |
|  |                                                              |  |
|  +------------------------------------------------------------+  |
|                                                                    |
|  +---------------------------+  +-----------------------------+   |
|  |    RETENTION OVER TIME    |  |    STUDY TIME BREAKDOWN     |   |
|  |    [Line Chart]           |  |    [Bar Chart by day]       |   |
|  +---------------------------+  +-----------------------------+   |
|                                                                    |
|  +------------------------------------------------------------+   |
|  |                    DECK PERFORMANCE                         |   |
|  |                                                              |  |
|  |  +------------------+  +------------------+  +--------------+ |  |
|  |  | Medical Terms    |  | Aviation         |  | Legal        | |  |
|  |  | [Ring 85%]       |  | [Ring 72%]       |  | [Ring 91%]   | |  |
|  |  | 156 cards        |  | 89 cards         |  | 234 cards    | |  |
|  |  +------------------+  +------------------+  +--------------+ |  |
|  |                                                              |  |
|  +------------------------------------------------------------+  |
|                                                                    |
+------------------------------------------------------------------+
```

---

## 2. Header Stats Page

### Wireframe ASCII

```
+------------------------------------------------------------------+
|                                                                    |
|  [Brain Icon] BrainKit       Your Progress       [Streak] [Avatar] |
|                                                                    |
+------------------------------------------------------------------+
```

### Tailwind Implementation

```html
<header class="bg-white border-b border-gray-200">
  <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

    <!-- Logo -->
    <a href="/dashboard" class="flex items-center gap-2 text-xl font-bold text-primary-600">
      <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-teal-500 rounded-lg flex items-center justify-center">
        <Brain class="w-5 h-5 text-white" />
      </div>
      BrainKit
    </a>

    <!-- Page Title -->
    <h1 class="text-lg font-semibold text-gray-900">Your Progress</h1>

    <!-- Right Side -->
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-1.5 px-3 py-1.5 bg-accent-100 rounded-full text-sm font-semibold text-accent-700">
        <Flame class="w-4 h-4 text-accent-500" />
        <span>13</span>
      </div>
      <button class="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold text-sm">
        JD
      </button>
    </div>

  </div>
</header>
```

---

## 3. Hero Stats Section

### Wireframe ASCII Detallado

```
+--------------------------------------------------------------------+
|                                                                      |
|  +----------------------------------------------------------------+  |
|  |  HERO STATS - bg-gradient-hero rounded-3xl p-8                 |  |
|  |                                                                |  |
|  |  +------------+  +------------+  +------------+  +------------+|  |
|  |  |            |  |            |  |            |  |            ||  |
|  |  |  [Flame]   |  |  [Layers]  |  |  [Target]  |  |  [Clock]   ||  |
|  |  |            |  |            |  |            |  |            ||  |
|  |  |    13      |  |   2,847    |  |    87%     |  |   24h 32m  ||  |
|  |  |            |  |            |  |            |  |            ||  |
|  |  | day streak |  | cards      |  | retention  |  | study time ||  |
|  |  |            |  | studied    |  | rate       |  |            ||  |
|  |  | Best: 21   |  | This month |  | +3% vs     |  | This month ||  |
|  |  |            |  | : 312      |  | last month |  | : 8h 15m   ||  |
|  |  +------------+  +------------+  +------------+  +------------+|  |
|  |                                                                |  |
|  +----------------------------------------------------------------+  |
|                                                                      |
+--------------------------------------------------------------------+
```

### Especificaciones CSS

```css
.hero-stats {
  background: linear-gradient(135deg, #ECFDF5 0%, #FFFBEB 50%, #F0FDF4 100%);
  border-radius: 24px;
  padding: 32px;
  margin-bottom: 32px;
}

.hero-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.hero-stat-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  box-shadow: var(--shadow-sm);
}

.hero-stat-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-stat-icon-streak {
  background: var(--color-accent-100);
  color: var(--color-accent-600);
}

.hero-stat-icon-cards {
  background: var(--color-primary-100);
  color: var(--color-primary-600);
}

.hero-stat-icon-retention {
  background: var(--color-success-100);
  color: var(--color-success-600);
}

.hero-stat-icon-time {
  background: var(--color-gray-100);
  color: var(--color-gray-600);
}

.hero-stat-value {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-gray-900);
  font-family: var(--font-family-mono);
  line-height: 1;
  margin-bottom: 8px;
}

.hero-stat-label {
  font-size: 14px;
  color: var(--color-gray-600);
  margin-bottom: 12px;
}

.hero-stat-meta {
  font-size: 12px;
  color: var(--color-gray-500);
  padding-top: 12px;
  border-top: 1px solid var(--color-gray-100);
}

.hero-stat-trend {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
}

.hero-stat-trend-up {
  color: var(--color-success-600);
}

.hero-stat-trend-down {
  color: var(--color-error-600);
}
```

### Tailwind Implementation

```html
<!-- Hero Stats Section -->
<section class="bg-gradient-to-br from-primary-50 via-accent-50/50 to-primary-50 rounded-3xl p-8 mb-8">
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-5">

    <!-- Streak -->
    <div class="bg-white rounded-2xl p-6 text-center shadow-sm">
      <div class="w-12 h-12 mx-auto mb-4 bg-accent-100 text-accent-600 rounded-xl flex items-center justify-center">
        <Flame class="w-6 h-6" />
      </div>
      <div class="text-4xl font-extrabold text-gray-900 font-mono mb-2">13</div>
      <div class="text-sm text-gray-600 mb-3">day streak</div>
      <div class="text-xs text-gray-500 pt-3 border-t border-gray-100">
        Best: <span class="font-semibold text-gray-700">21 days</span>
      </div>
    </div>

    <!-- Cards Studied -->
    <div class="bg-white rounded-2xl p-6 text-center shadow-sm">
      <div class="w-12 h-12 mx-auto mb-4 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center">
        <Layers class="w-6 h-6" />
      </div>
      <div class="text-4xl font-extrabold text-gray-900 font-mono mb-2">2,847</div>
      <div class="text-sm text-gray-600 mb-3">cards studied</div>
      <div class="text-xs text-gray-500 pt-3 border-t border-gray-100">
        This month: <span class="font-semibold text-gray-700">312</span>
      </div>
    </div>

    <!-- Retention Rate -->
    <div class="bg-white rounded-2xl p-6 text-center shadow-sm">
      <div class="w-12 h-12 mx-auto mb-4 bg-success-100 text-success-600 rounded-xl flex items-center justify-center">
        <Target class="w-6 h-6" />
      </div>
      <div class="text-4xl font-extrabold text-gray-900 font-mono mb-2">87%</div>
      <div class="text-sm text-gray-600 mb-3">retention rate</div>
      <div class="text-xs pt-3 border-t border-gray-100">
        <span class="inline-flex items-center gap-1 text-success-600 font-medium">
          <TrendingUp class="w-3 h-3" />
          +3% vs last month
        </span>
      </div>
    </div>

    <!-- Study Time -->
    <div class="bg-white rounded-2xl p-6 text-center shadow-sm">
      <div class="w-12 h-12 mx-auto mb-4 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center">
        <Clock class="w-6 h-6" />
      </div>
      <div class="text-4xl font-extrabold text-gray-900 font-mono mb-2">24h</div>
      <div class="text-sm text-gray-600 mb-3">study time</div>
      <div class="text-xs text-gray-500 pt-3 border-t border-gray-100">
        This month: <span class="font-semibold text-gray-700">8h 15m</span>
      </div>
    </div>

  </div>
</section>
```

---

## 4. Activity Heatmap (GitHub Style)

### Wireframe ASCII Detallado

```
+--------------------------------------------------------------------+
|                                                                      |
|  Activity                                              Less [===] More
|                                                                      |
|       Jan   Feb   Mar   Apr   May   Jun   Jul   Aug   Sep   Oct   Nov|
|  Mon  [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]  |
|       [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]  |
|  Wed  [ ][ ][ ][.][o][o][O][O][#][#][#][O][o][.][.][ ][ ][ ][ ][ ]  |
|       [ ][ ][ ][.][o][O][#][#][#][#][#][#][O][o][o][.][ ][ ][ ][ ]  |
|  Fri  [ ][ ][ ][ ][.][o][O][#][#][#][#][O][o][o][.][.][ ][ ][ ][ ]  |
|       [ ][ ][ ][ ][ ][.][o][O][O][#][O][o][.][.][ ][ ][ ][ ][ ][ ]  |
|  Sun  [ ][ ][ ][ ][ ][ ][.][o][o][O][o][.][.][ ][ ][ ][ ][ ][ ][ ]  |
|                                                                      |
|  536 cards studied in the last year                                  |
|                                                                      |
+--------------------------------------------------------------------+
```

### Especificaciones CSS

```css
.activity-heatmap {
  background: white;
  border: 1px solid var(--color-gray-200);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
}

.activity-heatmap-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.activity-heatmap-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-gray-800);
}

.activity-heatmap-legend {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--color-gray-500);
}

.activity-heatmap-legend-cell {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

/* Heatmap Grid */
.heatmap-container {
  overflow-x: auto;
}

.heatmap-grid {
  display: flex;
  gap: 4px;
}

.heatmap-week {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.heatmap-cell {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  cursor: pointer;
  transition: all 150ms;
}

.heatmap-cell:hover {
  transform: scale(1.2);
  outline: 2px solid var(--color-primary-500);
  outline-offset: 1px;
}

/* Intensity Levels - Primary Green */
.heatmap-level-0 { background: var(--color-gray-100); }
.heatmap-level-1 { background: var(--color-primary-200); }
.heatmap-level-2 { background: var(--color-primary-400); }
.heatmap-level-3 { background: var(--color-primary-600); }
.heatmap-level-4 { background: var(--color-primary-800); }

/* Month Labels */
.heatmap-months {
  display: flex;
  padding-left: 32px;
  margin-bottom: 8px;
}

.heatmap-month {
  font-size: 11px;
  color: var(--color-gray-500);
  width: calc(12px * 4 + 4px * 4);
}

/* Day Labels */
.heatmap-days {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-right: 8px;
}

.heatmap-day {
  font-size: 10px;
  color: var(--color-gray-500);
  height: 12px;
  line-height: 12px;
}

/* Summary */
.heatmap-summary {
  margin-top: 16px;
  font-size: 13px;
  color: var(--color-gray-600);
}

.heatmap-summary strong {
  color: var(--color-gray-800);
  font-weight: 600;
}

/* Tooltip */
.heatmap-tooltip {
  position: fixed;
  background: var(--color-gray-900);
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  pointer-events: none;
  z-index: 50;
}

.heatmap-tooltip-date {
  font-weight: 600;
  margin-bottom: 2px;
}

.heatmap-tooltip-count {
  color: var(--color-gray-300);
}
```

### Tailwind Implementation

```html
<!-- Activity Heatmap -->
<section class="bg-white border border-gray-200 rounded-2xl p-6 mb-6">

  <!-- Header -->
  <div class="flex justify-between items-center mb-5">
    <h3 class="text-base font-semibold text-gray-800">Activity</h3>
    <div class="flex items-center gap-1 text-xs text-gray-500">
      Less
      <div class="w-3 h-3 rounded-sm bg-gray-100"></div>
      <div class="w-3 h-3 rounded-sm bg-primary-200"></div>
      <div class="w-3 h-3 rounded-sm bg-primary-400"></div>
      <div class="w-3 h-3 rounded-sm bg-primary-600"></div>
      <div class="w-3 h-3 rounded-sm bg-primary-800"></div>
      More
    </div>
  </div>

  <!-- Heatmap Grid (simplified example) -->
  <div class="overflow-x-auto">

    <!-- Month Labels -->
    <div class="flex pl-8 mb-2">
      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
        <span class="text-xs text-gray-500 w-16">{month}</span>
      ))}
    </div>

    <!-- Grid -->
    <div class="flex">
      <!-- Day labels -->
      <div class="flex flex-col gap-1 mr-2">
        <span class="text-[10px] text-gray-500 h-3 leading-3"></span>
        <span class="text-[10px] text-gray-500 h-3 leading-3">Mon</span>
        <span class="text-[10px] text-gray-500 h-3 leading-3"></span>
        <span class="text-[10px] text-gray-500 h-3 leading-3">Wed</span>
        <span class="text-[10px] text-gray-500 h-3 leading-3"></span>
        <span class="text-[10px] text-gray-500 h-3 leading-3">Fri</span>
        <span class="text-[10px] text-gray-500 h-3 leading-3"></span>
      </div>

      <!-- Weeks -->
      <div class="flex gap-1">
        {/* Generate 53 weeks of cells */}
        {Array.from({ length: 53 }).map((_, weekIndex) => (
          <div class="flex flex-col gap-1" key={weekIndex}>
            {Array.from({ length: 7 }).map((_, dayIndex) => {
              const level = Math.floor(Math.random() * 5); // Demo random
              return (
                <div
                  key={dayIndex}
                  class={`w-3 h-3 rounded-sm cursor-pointer hover:scale-125 hover:ring-2 hover:ring-primary-500 hover:ring-offset-1 transition-transform
                    ${level === 0 ? 'bg-gray-100' :
                      level === 1 ? 'bg-primary-200' :
                      level === 2 ? 'bg-primary-400' :
                      level === 3 ? 'bg-primary-600' :
                      'bg-primary-800'}`}
                  title={`Jan ${dayIndex + 1}: ${level * 10} cards`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  </div>

  <!-- Summary -->
  <p class="mt-4 text-sm text-gray-600">
    <strong class="text-gray-800 font-semibold">2,847</strong> cards studied in the last year
  </p>

</section>
```

---

## 5. Charts Section

### Wireframe ASCII

```
+---------------------------+  +-----------------------------+
|  RETENTION OVER TIME      |  |  STUDY TIME BY DAY          |
|                           |  |                             |
|     100%                  |  |        ##                   |
|      90%     -----        |  |   ##   ##   ##              |
|      80%   --     --      |  |   ##   ##   ## ##           |
|      70%  -         -     |  |   ## # ## # ## ## #         |
|           |__|__|__|__|   |  |   Mo Tu We Th Fr Sa Su      |
|           Jan Feb Mar Apr |  |                             |
|                           |  |                             |
+---------------------------+  +-----------------------------+
```

### Especificaciones CSS

```css
.charts-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 24px;
}

.chart-card {
  background: white;
  border: 1px solid var(--color-gray-200);
  border-radius: 16px;
  padding: 24px;
}

.chart-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.chart-card-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-gray-800);
}

.chart-card-period {
  font-size: 13px;
  color: var(--color-gray-500);
}

.chart-container {
  height: 200px;
}
```

### Tailwind Implementation

```html
<!-- Charts Section -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

  <!-- Retention Over Time -->
  <div class="bg-white border border-gray-200 rounded-2xl p-6">
    <div class="flex justify-between items-center mb-5">
      <h3 class="text-base font-semibold text-gray-800">Retention Over Time</h3>
      <span class="text-sm text-gray-500">Last 6 months</span>
    </div>
    <div class="h-48">
      <!-- Chart component (Recharts/Chart.js) goes here -->
      <div class="w-full h-full flex items-end justify-around gap-2 px-2">
        {[75, 78, 82, 85, 84, 87].map((value, i) => (
          <div class="flex flex-col items-center gap-2 flex-1">
            <div
              class="w-full bg-gradient-to-t from-primary-500 to-primary-400 rounded-t"
              style={{ height: `${value}%` }}
            />
            <span class="text-xs text-gray-500">
              {['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'][i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>

  <!-- Study Time by Day -->
  <div class="bg-white border border-gray-200 rounded-2xl p-6">
    <div class="flex justify-between items-center mb-5">
      <h3 class="text-base font-semibold text-gray-800">Study Time by Day</h3>
      <span class="text-sm text-gray-500">This week</span>
    </div>
    <div class="h-48">
      <!-- Bar chart -->
      <div class="w-full h-full flex items-end justify-around gap-3 px-2">
        {[45, 30, 60, 25, 50, 15, 20].map((value, i) => (
          <div class="flex flex-col items-center gap-2 flex-1">
            <div
              class={`w-full rounded-t transition-all ${i === 2 ? 'bg-gradient-to-t from-accent-500 to-accent-400' : 'bg-gradient-to-t from-primary-500 to-primary-400'}`}
              style={{ height: `${(value / 60) * 100}%` }}
            />
            <span class="text-xs text-gray-500">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>

</div>
```

---

## 6. Deck Performance Section

### Wireframe ASCII

```
+--------------------------------------------------------------------+
|                                                                      |
|  Deck Performance                                                    |
|                                                                      |
|  +------------------+  +------------------+  +------------------+    |
|  |                  |  |                  |  |                  |    |
|  |  Medical Terms   |  |  Aviation Procs  |  |  Legal Concepts  |    |
|  |                  |  |                  |  |                  |    |
|  |   +--------+     |  |   +--------+     |  |   +--------+     |    |
|  |   |  85%   |     |  |   |  72%   |     |  |   |  91%   |     |    |
|  |   +--------+     |  |   +--------+     |  |   +--------+     |    |
|  |                  |  |                  |  |                  |    |
|  |  156 cards       |  |  89 cards        |  |  234 cards       |    |
|  |  12 due today    |  |  5 due today     |  |  3 due today     |    |
|  |                  |  |                  |  |                  |    |
|  +------------------+  +------------------+  +------------------+    |
|                                                                      |
+--------------------------------------------------------------------+
```

### Tailwind Implementation

```html
<!-- Deck Performance Section -->
<section class="bg-white border border-gray-200 rounded-2xl p-6">

  <h3 class="text-base font-semibold text-gray-800 mb-5">Deck Performance</h3>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

    {decks.map(deck => (
      <div class="p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">

        <h4 class="text-base font-semibold text-gray-800 mb-4">{deck.name}</h4>

        <!-- Progress Ring -->
        <div class="flex items-center gap-4 mb-4">
          <div class="relative w-16 h-16">
            <svg class="w-full h-full -rotate-90" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="28" stroke-width="6" fill="none" class="stroke-gray-200" />
              <circle cx="32" cy="32" r="28" stroke-width="6" fill="none"
                      class="stroke-primary-500"
                      stroke-linecap="round"
                      stroke-dasharray="176"
                      stroke-dashoffset={176 - (176 * deck.mastery / 100)} />
            </svg>
            <span class="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-700">
              {deck.mastery}%
            </span>
          </div>

          <div>
            <p class="text-sm text-gray-600">{deck.cardCount} cards</p>
            <p class="text-sm text-accent-600 font-medium">{deck.dueCount} due today</p>
          </div>
        </div>

        <!-- Mini Stats -->
        <div class="flex gap-4 text-xs text-gray-500">
          <span>Retention: {deck.retention}%</span>
          <span>Studied: {deck.studiedThisWeek} this week</span>
        </div>

      </div>
    ))}

  </div>

</section>
```

---

## 7. Responsive Behavior

### Mobile (< 768px)

```css
@media (max-width: 768px) {
  .hero-stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .charts-section {
    grid-template-columns: 1fr;
  }

  .heatmap-container {
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
  }
}
```

---

## 8. Data Requirements

```typescript
// GET /api/stats/overview
interface StatsOverview {
  streak: {
    current: number;
    best: number;
  };
  total_cards_studied: number;
  cards_this_month: number;
  retention_rate: number;
  retention_change: number; // vs last month
  total_study_time_minutes: number;
  study_time_this_month_minutes: number;
}

// GET /api/stats/activity?year=2026
interface ActivityData {
  year: number;
  data: {
    date: string; // "2026-01-15"
    count: number;
  }[];
  total: number;
}

// GET /api/stats/retention-history?months=6
interface RetentionHistory {
  data: {
    month: string; // "2025-09"
    rate: number;
  }[];
}

// GET /api/stats/study-time?period=week
interface StudyTimeByDay {
  data: {
    day: string; // "Mon"
    minutes: number;
  }[];
}

// GET /api/stats/deck-performance
interface DeckPerformance {
  deck_id: string;
  name: string;
  mastery: number;
  card_count: number;
  due_count: number;
  retention: number;
  studied_this_week: number;
}
```

---

## 9. Implementation Checklist

- [ ] Crear ruta /stats en router
- [ ] Crear StatsPage.tsx
- [ ] Crear componente HeroStats
- [ ] Crear componente ActivityHeatmap
- [ ] Crear componente RetentionChart (Recharts)
- [ ] Crear componente StudyTimeChart
- [ ] Crear componente DeckPerformance
- [ ] Implementar API endpoints
- [ ] Agregar link a Stats en navegacion
- [ ] Testing responsive

---

*Stats Page (NEW) - BrainKit V2*
*Fecha: Enero 2026*
