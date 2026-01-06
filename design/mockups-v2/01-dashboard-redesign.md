# Dashboard Redesign - BrainKit V2

**Pagina:** DashboardPage.tsx
**Prioridad:** Alta
**Cambios principales:** Hero con progress tracking, streak badge, weekly summary

---

## 1. Estructura de Pagina

### Layout General

```
+------------------------------------------------------------------+
|                           HEADER                                   |
|  [Logo BrainKit]                    [Streak Badge]  [User Avatar]  |
+------------------------------------------------------------------+
|                                                                    |
|  +------------------------------------------------------------+   |
|  |                    HERO / PROGRESS SECTION                  |   |
|  |                                                              |  |
|  |  Welcome back, [Name]!          [StreakBadge: 12 days]      |  |
|  |  Your learning journey continues                             |  |
|  |                                                              |  |
|  |  +------------+  +------------+  +------------+              |  |
|  |  | Cards Due  |  | Studied    |  | Retention  |              |  |
|  |  |    24      |  | This Week  |  |    87%     |              |  |
|  |  |            |  |   156      |  |            |              |  |
|  |  +------------+  +------------+  +------------+              |  |
|  |                                                              |  |
|  |  [========Weekly Progress Bar==========____]  Goal: 200     |  |
|  |   Mon  Tue  Wed  Thu  Fri  Sat  Sun                         |  |
|  +------------------------------------------------------------+  |
|                                                                    |
|  Your Decks                              [+ Create Deck Button]   |
|                                                                    |
|  +------------------+  +------------------+  +------------------+  |
|  |   DECK CARD 1    |  |   DECK CARD 2    |  |   DECK CARD 3    |  |
|  |                  |  |                  |  |                  |  |
|  |  Medical Terms   |  |  Aviation        |  |  Legal Concepts  |  |
|  |  [Progress Ring] |  |  [Progress Ring] |  |  [Progress Ring] |  |
|  |  12 due today    |  |  0 due today     |  |  8 due today     |  |
|  |  [Progress Bar]  |  |  [Progress Bar]  |  |  [Progress Bar]  |  |
|  +------------------+  +------------------+  +------------------+  |
|                                                                    |
+------------------------------------------------------------------+
```

---

## 2. Header Redesign

### Wireframe ASCII

```
+------------------------------------------------------------------+
|                                                                    |
|  [Brain Icon] BrainKit              [Flame 12] [Avatar] [Logout]  |
|                                                                    |
+------------------------------------------------------------------+
     ^                                    ^         ^        ^
     |                                    |         |        |
   Logo con                           Streak    Profile   Ghost
   gradiente                          Badge    Dropdown  Button
   emerald                            amber
```

### Especificaciones CSS

```css
/* Header Container */
.header {
  height: 64px;
  background: white;
  border-bottom: 1px solid var(--color-gray-200);
  position: sticky;
  top: 0;
  z-index: 50;
}

.header-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 700;
  color: var(--color-primary-600);
}

.logo-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #059669 0%, #0D9488 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-icon svg {
  width: 20px;
  height: 20px;
  color: white;
}

/* Header Right */
.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* Streak Badge in Header */
.header-streak {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: var(--color-accent-100);
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-accent-700);
}

.header-streak-icon {
  width: 18px;
  height: 18px;
  color: var(--color-accent-500);
}

/* User Avatar */
.header-avatar {
  width: 36px;
  height: 36px;
  border-radius: 9999px;
  background: linear-gradient(135deg, var(--color-primary-400), var(--color-primary-600));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
}

.header-avatar:hover {
  box-shadow: 0 0 0 2px var(--color-primary-200);
}
```

### Tailwind Classes

```html
<!-- Header -->
<header class="h-16 bg-white border-b border-gray-200 sticky top-0 z-50">
  <div class="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

    <!-- Logo -->
    <a href="/" class="flex items-center gap-2 text-xl font-bold text-primary-600">
      <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-teal-500 rounded-lg flex items-center justify-center">
        <Brain class="w-5 h-5 text-white" />
      </div>
      BrainKit
    </a>

    <!-- Right Side -->
    <div class="flex items-center gap-4">
      <!-- Streak Badge -->
      <div class="flex items-center gap-1.5 px-3 py-1.5 bg-accent-100 rounded-full text-sm font-semibold text-accent-700">
        <Flame class="w-4 h-4 text-accent-500" />
        <span>12</span>
      </div>

      <!-- Avatar -->
      <button class="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold text-sm hover:ring-2 hover:ring-primary-200">
        JD
      </button>

      <!-- Logout -->
      <button class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
        <LogOut class="w-5 h-5" />
      </button>
    </div>
  </div>
</header>
```

---

## 3. Hero / Progress Section (NUEVO)

### Wireframe ASCII Detallado

```
+--------------------------------------------------------------------+
|                                                                      |
|  +----------------------------------------------------------------+  |
|  |                                                                |  |
|  |   HERO SECTION - bg-gradient-hero rounded-2xl p-8             |  |
|  |                                                                |  |
|  |   +---------------------------+    +------------------------+  |  |
|  |   |  LEFT SIDE                |    |  RIGHT SIDE            |  |  |
|  |   |                           |    |                        |  |  |
|  |   |  Welcome back, John!      |    |  [STREAK BADGE LARGE]  |  |  |
|  |   |  Your learning journey    |    |                        |  |  |
|  |   |  continues                |    |    [Flame Icon]        |  |  |
|  |   |                           |    |        12              |  |  |
|  |   |  [Study Now Button]       |    |     day streak         |  |  |
|  |   |                           |    |                        |  |  |
|  |   +---------------------------+    +------------------------+  |  |
|  |                                                                |  |
|  +----------------------------------------------------------------+  |
|                                                                      |
|  +----------------------------------------------------------------+  |
|  |                    STATS ROW                                   |  |
|  |                                                                |  |
|  |  +---------------+  +---------------+  +---------------+       |  |
|  |  |  STAT CARD    |  |  STAT CARD    |  |  STAT CARD    |       |  |
|  |  |               |  |               |  |               |       |  |
|  |  |  [Target]     |  |  [Layers]     |  |  [TrendingUp] |       |  |
|  |  |      24       |  |     156       |  |      87%      |       |  |
|  |  |  Cards due    |  | Cards studied |  |  Retention    |       |  |
|  |  |  today        |  | this week     |  |  rate         |       |  |
|  |  +---------------+  +---------------+  +---------------+       |  |
|  |                                                                |  |
|  +----------------------------------------------------------------+  |
|                                                                      |
|  +----------------------------------------------------------------+  |
|  |                    WEEKLY PROGRESS                             |  |
|  |                                                                |  |
|  |  This Week's Progress                      Goal: 200 cards     |  |
|  |                                                                |  |
|  |  +----+  +----+  +----+  +----+  +----+  +----+  +----+        |  |
|  |  |    |  |    |  |    |  |    |  |    |  |    |  |    |        |  |
|  |  |####|  |####|  |####|  |##  |  |    |  |    |  |    |        |  |
|  |  |####|  |####|  |####|  |##  |  |    |  |    |  |    |        |  |
|  |  |####|  |####|  |####|  |##  |  |    |  |    |  |    |        |  |
|  |  +----+  +----+  +----+  +----+  +----+  +----+  +----+        |  |
|  |   Mon     Tue    Wed     Thu     Fri     Sat     Sun          |  |
|  |   32      28     45      21       -       -       -           |  |
|  |                                                                |  |
|  |  [============== 156/200 ================______] 78%          |  |
|  |                                                                |  |
|  +----------------------------------------------------------------+  |
|                                                                      |
+--------------------------------------------------------------------+
```

### Especificaciones CSS

```css
/* Hero Container */
.dashboard-hero {
  background: linear-gradient(135deg, #ECFDF5 0%, #FFFBEB 50%, #F0FDF4 100%);
  border-radius: 24px;
  padding: 32px;
  margin-bottom: 32px;
}

.hero-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

/* Hero Left */
.hero-left h2 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-gray-900);
  margin-bottom: 8px;
}

.hero-left p {
  font-size: 1.125rem;
  color: var(--color-gray-600);
  margin-bottom: 24px;
}

/* Hero Streak (Large) */
.hero-streak {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 32px;
  background: white;
  border-radius: 16px;
  box-shadow: var(--shadow-md);
}

.hero-streak-icon {
  width: 48px;
  height: 48px;
  color: var(--color-accent-500);
  margin-bottom: 8px;
}

.hero-streak-count {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-accent-600);
  font-family: var(--font-family-mono);
}

.hero-streak-label {
  font-size: 14px;
  color: var(--color-gray-600);
}

/* Stats Row */
.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}

/* Individual Stat Card */
.stat-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: var(--shadow-sm);
}

.stat-card-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.stat-card-icon-primary {
  background: var(--color-primary-100);
  color: var(--color-primary-600);
}

.stat-card-icon-accent {
  background: var(--color-accent-100);
  color: var(--color-accent-600);
}

.stat-card-icon-success {
  background: var(--color-success-100);
  color: var(--color-success-600);
}

.stat-card-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-gray-900);
  font-family: var(--font-family-mono);
  margin-bottom: 4px;
}

.stat-card-label {
  font-size: 14px;
  color: var(--color-gray-500);
}

/* Weekly Progress Section */
.weekly-progress-section {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: var(--shadow-sm);
}

.weekly-progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.weekly-progress-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-gray-800);
}

.weekly-progress-goal {
  font-size: 14px;
  color: var(--color-gray-500);
}

/* Day Columns */
.weekly-bars {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.weekly-bar-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.weekly-bar {
  width: 100%;
  height: 80px;
  background: var(--color-gray-100);
  border-radius: 6px;
  position: relative;
  overflow: hidden;
}

.weekly-bar-fill {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, #10B981 0%, #059669 100%);
  border-radius: 6px;
  transition: height 300ms ease;
}

.weekly-bar-today .weekly-bar-fill {
  background: linear-gradient(180deg, #F59E0B 0%, #D97706 100%);
}

.weekly-bar-label {
  font-size: 12px;
  color: var(--color-gray-500);
}

.weekly-bar-count {
  font-size: 11px;
  color: var(--color-gray-600);
  font-weight: 500;
}

/* Total Progress Bar */
.total-progress {
  margin-top: 16px;
}

.total-progress-bar {
  height: 8px;
  background: var(--color-gray-200);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.total-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #10B981 0%, #059669 100%);
  border-radius: 4px;
  transition: width 500ms ease;
}

.total-progress-text {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}

.total-progress-count {
  color: var(--color-gray-700);
  font-weight: 500;
}

.total-progress-percent {
  color: var(--color-primary-600);
  font-weight: 600;
}
```

### Tailwind Implementation

```html
<!-- Hero Section -->
<section class="bg-gradient-to-br from-primary-50 via-accent-50/50 to-primary-50 rounded-3xl p-8 mb-8">

  <!-- Hero Content -->
  <div class="flex justify-between items-start mb-8">

    <!-- Left Side -->
    <div>
      <h2 class="text-3xl font-bold text-gray-900 mb-2">
        Welcome back, John!
      </h2>
      <p class="text-lg text-gray-600 mb-6">
        Your learning journey continues
      </p>
      <button class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-medium rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all shadow-md hover:shadow-lg">
        <Play class="w-5 h-5" />
        Study Now
      </button>
    </div>

    <!-- Streak Badge Large -->
    <div class="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md">
      <Flame class="w-12 h-12 text-accent-500 mb-2" />
      <span class="text-4xl font-bold text-accent-600 font-mono">12</span>
      <span class="text-sm text-gray-600">day streak</span>
    </div>

  </div>

  <!-- Stats Row -->
  <div class="grid grid-cols-3 gap-4 mb-8">

    <!-- Cards Due -->
    <div class="bg-white rounded-xl p-5 shadow-sm">
      <div class="w-10 h-10 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mb-3">
        <Target class="w-5 h-5" />
      </div>
      <div class="text-3xl font-bold text-gray-900 font-mono">24</div>
      <div class="text-sm text-gray-500">Cards due today</div>
    </div>

    <!-- Cards Studied -->
    <div class="bg-white rounded-xl p-5 shadow-sm">
      <div class="w-10 h-10 bg-accent-100 text-accent-600 rounded-lg flex items-center justify-center mb-3">
        <Layers class="w-5 h-5" />
      </div>
      <div class="text-3xl font-bold text-gray-900 font-mono">156</div>
      <div class="text-sm text-gray-500">Studied this week</div>
    </div>

    <!-- Retention Rate -->
    <div class="bg-white rounded-xl p-5 shadow-sm">
      <div class="w-10 h-10 bg-success-100 text-success-600 rounded-lg flex items-center justify-center mb-3">
        <TrendingUp class="w-5 h-5" />
      </div>
      <div class="text-3xl font-bold text-gray-900 font-mono">87%</div>
      <div class="text-sm text-gray-500">Retention rate</div>
    </div>

  </div>

  <!-- Weekly Progress -->
  <div class="bg-white rounded-xl p-6 shadow-sm">
    <div class="flex justify-between items-center mb-5">
      <h3 class="text-base font-semibold text-gray-800">This Week's Progress</h3>
      <span class="text-sm text-gray-500">Goal: 200 cards</span>
    </div>

    <!-- Day Bars -->
    <div class="flex gap-2 mb-4">
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
        <div key={day} class="flex-1 flex flex-col items-center gap-1">
          <div class="w-full h-20 bg-gray-100 rounded-md relative overflow-hidden">
            <div
              class={`absolute bottom-0 left-0 right-0 rounded-md ${i === 3 ? 'bg-gradient-to-t from-accent-600 to-accent-500' : 'bg-gradient-to-t from-primary-600 to-primary-500'}`}
              style={{ height: `${[80, 70, 100, 50, 0, 0, 0][i]}%` }}
            />
          </div>
          <span class="text-xs text-gray-500">{day}</span>
          <span class="text-xs font-medium text-gray-600">{[32, 28, 45, 21, '-', '-', '-'][i]}</span>
        </div>
      ))}
    </div>

    <!-- Total Progress Bar -->
    <div class="mt-4">
      <div class="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
        <div class="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full" style={{ width: '78%' }} />
      </div>
      <div class="flex justify-between text-sm">
        <span class="text-gray-700 font-medium">156 / 200 cards</span>
        <span class="text-primary-600 font-semibold">78%</span>
      </div>
    </div>
  </div>

</section>
```

---

## 4. Deck Cards Redesign

### Wireframe ASCII

```
+----------------------------------+
|                                  |
|  Medical Terminology             |  <- Title (h4, gray-800)
|  24 cards | Last studied 2h ago  |  <- Meta (caption, gray-500)
|                                  |
|  +------+   Due: 8 cards         |  <- Progress Ring + Due badge
|  | 75%  |   [================]   |     Ring muestra mastery
|  +------+   Mastery: 75%         |     Bar muestra mastery
|                                  |
|  [Edit] [Delete]                 |  <- Actions (hidden, show on hover)
|                                  |
|  [==============================]|  <- Bottom progress bar (mastery)
+----------------------------------+
```

### Especificaciones CSS

```css
.deck-card {
  background: white;
  border: 1px solid var(--color-gray-200);
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
  transition: all 200ms ease;
  position: relative;
  overflow: hidden;
}

.deck-card:hover {
  border-color: var(--color-primary-300);
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-2px);
}

.deck-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.deck-card-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-gray-800);
  margin-bottom: 4px;
}

.deck-card-meta {
  font-size: 13px;
  color: var(--color-gray-500);
}

/* Due Badge */
.deck-card-due {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
}

.deck-card-due-urgent {
  background: var(--color-error-100);
  color: var(--color-error-700);
}

.deck-card-due-soon {
  background: var(--color-accent-100);
  color: var(--color-accent-700);
}

.deck-card-due-none {
  background: var(--color-success-100);
  color: var(--color-success-700);
}

/* Progress Section */
.deck-card-progress {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* Mini Progress Ring */
.deck-card-ring {
  width: 56px;
  height: 56px;
  position: relative;
}

.deck-card-ring-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.deck-card-ring-bg {
  stroke: var(--color-gray-200);
  fill: none;
  stroke-width: 4;
}

.deck-card-ring-fill {
  stroke: url(#gradient-primary);
  fill: none;
  stroke-width: 4;
  stroke-linecap: round;
  transition: stroke-dashoffset 500ms ease;
}

.deck-card-ring-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  font-weight: 700;
  color: var(--color-gray-700);
}

/* Progress Info */
.deck-card-progress-info {
  flex: 1;
}

.deck-card-progress-label {
  font-size: 13px;
  color: var(--color-gray-500);
  margin-bottom: 6px;
}

.deck-card-progress-bar {
  height: 6px;
  background: var(--color-gray-200);
  border-radius: 3px;
  overflow: hidden;
}

.deck-card-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #10B981 0%, #059669 100%);
  border-radius: 3px;
}

/* Bottom Progress Strip */
.deck-card-bottom-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--color-gray-100);
}

.deck-card-bottom-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #10B981 0%, #0D9488 100%);
}

/* Hover Actions */
.deck-card-actions {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 150ms;
}

.deck-card:hover .deck-card-actions {
  opacity: 1;
}

.deck-card-action {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: white;
  border: 1px solid var(--color-gray-200);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-gray-500);
  transition: all 150ms;
}

.deck-card-action:hover {
  background: var(--color-gray-50);
  color: var(--color-gray-700);
}

.deck-card-action-danger:hover {
  background: var(--color-error-50);
  color: var(--color-error-600);
  border-color: var(--color-error-200);
}
```

### Tailwind Implementation

```html
<!-- Deck Card -->
<div class="bg-white border border-gray-200 rounded-2xl p-6 cursor-pointer transition-all hover:border-primary-300 hover:shadow-lg hover:-translate-y-0.5 relative overflow-hidden group">

  <!-- Header -->
  <div class="flex justify-between items-start mb-4">
    <div>
      <h3 class="text-lg font-semibold text-gray-800 mb-1">Medical Terminology</h3>
      <p class="text-sm text-gray-500">24 cards | Last studied 2h ago</p>
    </div>

    <!-- Due Badge -->
    <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-accent-100 text-accent-700">
      <Clock class="w-3 h-3" />
      8 due
    </span>
  </div>

  <!-- Progress Section -->
  <div class="flex items-center gap-4">

    <!-- Mini Progress Ring -->
    <div class="w-14 h-14 relative">
      <svg class="w-full h-full -rotate-90">
        <circle cx="28" cy="28" r="24" stroke-width="4" fill="none" class="stroke-gray-200" />
        <circle cx="28" cy="28" r="24" stroke-width="4" fill="none"
                class="stroke-primary-500"
                stroke-linecap="round"
                stroke-dasharray="150.8"
                stroke-dashoffset="37.7" />
      </svg>
      <span class="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">75%</span>
    </div>

    <!-- Progress Info -->
    <div class="flex-1">
      <p class="text-sm text-gray-500 mb-1.5">Mastery: 75%</p>
      <div class="h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div class="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full" style="width: 75%"></div>
      </div>
    </div>

  </div>

  <!-- Hover Actions -->
  <div class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
    <button class="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-700">
      <Pencil class="w-4 h-4" />
    </button>
    <button class="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-error-50 hover:text-error-600 hover:border-error-200">
      <Trash2 class="w-4 h-4" />
    </button>
  </div>

  <!-- Bottom Progress Strip -->
  <div class="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
    <div class="h-full bg-gradient-to-r from-primary-500 to-teal-500" style="width: 75%"></div>
  </div>

</div>
```

---

## 5. Empty State (Actualizado)

### Wireframe ASCII

```
+------------------------------------------------------------------+
|                                                                    |
|                     [Illustration - Book/Cards]                   |
|                                                                    |
|                    Create your first deck                         |
|                                                                    |
|          Start your learning journey by creating a deck.          |
|            Paste any list and AI will generate mnemonics          |
|                    and flashcards automatically.                  |
|                                                                    |
|                   [+ Create Your First Deck]                      |
|                                                                    |
+------------------------------------------------------------------+
```

### Especificaciones CSS

```css
.empty-state {
  text-align: center;
  padding: 64px 24px;
  max-width: 480px;
  margin: 0 auto;
}

.empty-state-icon {
  width: 120px;
  height: 120px;
  margin: 0 auto 24px;
  background: linear-gradient(135deg, var(--color-primary-100) 0%, var(--color-accent-100) 100%);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-state-icon svg {
  width: 56px;
  height: 56px;
  color: var(--color-primary-600);
}

.empty-state-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-gray-900);
  margin-bottom: 12px;
}

.empty-state-description {
  font-size: 16px;
  color: var(--color-gray-600);
  line-height: 1.6;
  margin-bottom: 32px;
}

.empty-state-button {
  /* Uses button-primary styles with larger size */
}
```

---

## 6. Responsive Behavior

### Mobile (< 640px)

```css
@media (max-width: 640px) {
  .dashboard-hero {
    padding: 20px;
  }

  .hero-content {
    flex-direction: column;
    gap: 24px;
  }

  .hero-streak {
    width: 100%;
    flex-direction: row;
    justify-content: center;
    padding: 16px;
  }

  .stats-row {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .weekly-bars {
    gap: 4px;
  }

  .weekly-bar {
    height: 60px;
  }

  .deck-grid {
    grid-template-columns: 1fr;
  }
}
```

### Tablet (640px - 1024px)

```css
@media (min-width: 640px) and (max-width: 1024px) {
  .stats-row {
    grid-template-columns: repeat(3, 1fr);
  }

  .deck-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

### Desktop (> 1024px)

```css
@media (min-width: 1024px) {
  .deck-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## 7. Estados

### Loading State

```html
<!-- Skeleton para Hero Stats -->
<div class="animate-pulse">
  <div class="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
  <div class="h-4 bg-gray-200 rounded w-1/2"></div>
</div>

<!-- Skeleton para Deck Cards -->
<div class="bg-white border border-gray-200 rounded-2xl p-6 animate-pulse">
  <div class="h-5 bg-gray-200 rounded w-2/3 mb-2"></div>
  <div class="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
  <div class="flex items-center gap-4">
    <div class="w-14 h-14 bg-gray-200 rounded-full"></div>
    <div class="flex-1">
      <div class="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
      <div class="h-2 bg-gray-200 rounded"></div>
    </div>
  </div>
</div>
```

### Error State

```html
<div class="bg-error-50 border border-error-200 rounded-xl p-4 mb-6">
  <p class="text-sm text-error-800 font-medium">Failed to load dashboard data</p>
  <button class="text-sm text-error-600 underline mt-1">Try again</button>
</div>
```

---

## 8. Interacciones

### Streak Badge Animation

```css
/* Cuando el streak incrementa */
.streak-badge-increment {
  animation: streak-pulse 0.5s ease-out;
}

@keyframes streak-pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.15); box-shadow: 0 0 20px rgba(245, 158, 11, 0.5); }
  100% { transform: scale(1); }
}
```

### Weekly Progress Fill Animation

```css
.weekly-bar-fill {
  animation: fill-up 500ms ease-out;
}

@keyframes fill-up {
  from { height: 0; }
}
```

### Stat Counter Animation

```javascript
// Animacion de numeros que cuentan hacia arriba
function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    element.innerText = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}
```

---

## 9. Data Requirements

### API Endpoints Necesarios

```typescript
// GET /api/stats/dashboard
interface DashboardStats {
  streak: {
    current: number;
    best: number;
    last_study_date: string;
  };
  today: {
    cards_due: number;
    cards_studied: number;
  };
  week: {
    cards_studied: number;
    goal: number;
    daily_counts: number[]; // [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
  };
  retention_rate: number; // 0-100
}

// GET /api/decks (actualizado)
interface Deck {
  id: string;
  name: string;
  description?: string;
  card_count: number;
  cards_due: number;
  mastery_percentage: number; // NUEVO
  last_studied_at: string;
  created_at: string;
}
```

---

## 10. Implementation Checklist

- [ ] Actualizar Header con logo emerald y streak badge
- [ ] Crear componente HeroSection con stats
- [ ] Crear componente StatCard
- [ ] Crear componente WeeklyProgress
- [ ] Crear componente StreakBadge
- [ ] Actualizar DeckCard con progress ring
- [ ] Agregar mini progress bar al DeckCard
- [ ] Implementar skeleton loading states
- [ ] Agregar animaciones de streak/progress
- [ ] Crear endpoint /api/stats/dashboard
- [ ] Agregar mastery_percentage a decks
- [ ] Responsive testing mobile/tablet/desktop

---

*Dashboard Redesign - BrainKit V2*
*Fecha: Enero 2026*
