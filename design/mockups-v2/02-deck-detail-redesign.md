# Deck Detail Page Redesign - BrainKit V2

**Pagina:** DeckDetailPage.tsx
**Prioridad:** Alta
**Cambios principales:** Progress ring mastery, study stats, improved CTA

---

## 1. Estructura de Pagina

### Layout General

```
+------------------------------------------------------------------+
|                           HEADER                                   |
|  [< Back]  Deck Name                        [Edit] [Delete]       |
+------------------------------------------------------------------+
|                                                                    |
|  +------------------------------------------------------------+   |
|  |                    MASTERY HERO SECTION                     |   |
|  |                                                              |  |
|  |      +------------------+          +-------------------+     |  |
|  |      |                  |          |                   |     |  |
|  |      |   PROGRESS RING  |          |   STATS COLUMN    |     |  |
|  |      |                  |          |                   |     |  |
|  |      |      [75%]       |          |  Total Cards: 48  |     |  |
|  |      |    Mastery       |          |  Due Today: 12    |     |  |
|  |      |                  |          |  Mastered: 36     |     |  |
|  |      +------------------+          |  Learning: 8      |     |  |
|  |                                    |  New: 4           |     |  |
|  |                                    +-------------------+     |  |
|  |                                                              |  |
|  |  [================== Study Now (12 due) ==================]  |  |
|  |                                                              |  |
|  +------------------------------------------------------------+  |
|                                                                    |
|  +------------------------------------------------------------+   |
|  |                    STUDY STATS CARD                         |   |
|  |                                                              |  |
|  |  Last Session                Today                          |  |
|  |  +-------------+  +-------------+  +-------------+          |  |
|  |  | 24 cards    |  | 87% correct |  | 15 minutes  |          |  |
|  |  | reviewed    |  | answers     |  | study time  |          |  |
|  |  +-------------+  +-------------+  +-------------+          |  |
|  |                                                              |  |
|  +------------------------------------------------------------+  |
|                                                                    |
|  +------------------------------------------------------------+   |
|  |                    FLASHCARDS SECTION                       |   |
|  |                                                              |  |
|  |  Flashcards (48)                    [+ Add Card] [Generate] |  |
|  |                                                              |  |
|  |  +------------------+  +------------------+                  |  |
|  |  | Card Preview 1   |  | Card Preview 2   |  ...            |  |
|  |  +------------------+  +------------------+                  |  |
|  |                                                              |  |
|  +------------------------------------------------------------+  |
|                                                                    |
+------------------------------------------------------------------+
```

---

## 2. Header Actualizado

### Wireframe ASCII

```
+------------------------------------------------------------------+
|                                                                    |
|  [<] Back to Dashboard        Medical Terminology    [Edit][Delete]|
|                               Created Jan 15, 2026                 |
|                                                                    |
+------------------------------------------------------------------+
```

### Especificaciones CSS

```css
.deck-header {
  background: white;
  border-bottom: 1px solid var(--color-gray-200);
  padding: 16px 0;
}

.deck-header-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.deck-header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.deck-header-back {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--color-gray-600);
  font-size: 14px;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 150ms;
}

.deck-header-back:hover {
  background: var(--color-gray-100);
  color: var(--color-gray-800);
}

.deck-header-info {
  border-left: 1px solid var(--color-gray-200);
  padding-left: 16px;
}

.deck-header-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-gray-900);
}

.deck-header-meta {
  font-size: 13px;
  color: var(--color-gray-500);
}

.deck-header-actions {
  display: flex;
  gap: 8px;
}
```

### Tailwind Implementation

```html
<header class="bg-white border-b border-gray-200">
  <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

    <!-- Left Side -->
    <div class="flex items-center gap-4">
      <button class="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
        <ArrowLeft class="w-4 h-4" />
        Back
      </button>
      <div class="border-l border-gray-200 pl-4">
        <h1 class="text-xl font-bold text-gray-900">Medical Terminology</h1>
        <p class="text-sm text-gray-500">Created Jan 15, 2026</p>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex gap-2">
      <button class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
        <Pencil class="w-4 h-4" />
        Edit
      </button>
      <button class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-error-700 bg-white border border-error-300 rounded-lg hover:bg-error-50">
        <Trash2 class="w-4 h-4" />
        Delete
      </button>
    </div>

  </div>
</header>
```

---

## 3. Mastery Hero Section (NUEVO)

### Wireframe ASCII Detallado

```
+--------------------------------------------------------------------+
|                                                                      |
|  +----------------------------------------------------------------+  |
|  |  MASTERY HERO - bg-gradient-hero rounded-2xl p-8               |  |
|  |                                                                |  |
|  |  +---------------------------+   +---------------------------+ |  |
|  |  |                           |   |                           | |  |
|  |  |      LARGE PROGRESS       |   |     STATS BREAKDOWN       | |  |
|  |  |          RING             |   |                           | |  |
|  |  |                           |   |  +-----+ Total Cards      | |  |
|  |  |         /----\            |   |  | 48  | ---------------  | |  |
|  |  |        /      \           |   |  +-----+                  | |  |
|  |  |       |  75%   |          |   |                           | |  |
|  |  |        \      /           |   |  +-----+ Cards Due        | |  |
|  |  |         \----/            |   |  | 12  | [!!!] Today      | |  |
|  |  |                           |   |  +-----+                  | |  |
|  |  |       Mastery Level       |   |                           | |  |
|  |  |                           |   |  +-----+ Mastered         | |  |
|  |  +---------------------------+   |  | 36  | [====] 75%       | |  |
|  |                                  |  +-----+                  | |  |
|  |                                  |                           | |  |
|  |                                  |  +-----+ Learning         | |  |
|  |                                  |  |  8  | [==] 17%         | |  |
|  |                                  |  +-----+                  | |  |
|  |                                  |                           | |  |
|  |                                  |  +-----+ New              | |  |
|  |                                  |  |  4  | [=] 8%           | |  |
|  |                                  |  +-----+                  | |  |
|  |                                  +---------------------------+ |  |
|  |                                                                |  |
|  |  +----------------------------------------------------------+ |  |
|  |  |     [Play Icon]  Study Now - 12 cards due                | |  |
|  |  +----------------------------------------------------------+ |  |
|  |                                                                |  |
|  +----------------------------------------------------------------+  |
|                                                                      |
+--------------------------------------------------------------------+
```

### Especificaciones CSS

```css
/* Mastery Hero Container */
.mastery-hero {
  background: linear-gradient(135deg, #ECFDF5 0%, #FFFBEB 50%, #F0FDF4 100%);
  border-radius: 24px;
  padding: 32px;
  margin-bottom: 24px;
}

.mastery-hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  margin-bottom: 24px;
}

/* Large Progress Ring */
.mastery-ring-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mastery-ring {
  width: 200px;
  height: 200px;
  position: relative;
}

.mastery-ring-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.mastery-ring-bg {
  stroke: white;
  fill: none;
  stroke-width: 12;
}

.mastery-ring-fill {
  stroke: url(#mastery-gradient);
  fill: none;
  stroke-width: 12;
  stroke-linecap: round;
  transition: stroke-dashoffset 800ms ease;
}

.mastery-ring-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.mastery-ring-percent {
  font-size: 48px;
  font-weight: 800;
  color: var(--color-gray-900);
  font-family: var(--font-family-mono);
  line-height: 1;
}

.mastery-ring-label {
  font-size: 14px;
  color: var(--color-gray-600);
  margin-top: 4px;
}

/* Stats Breakdown */
.mastery-stats {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.mastery-stat-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.mastery-stat-number {
  width: 64px;
  height: 64px;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  color: var(--color-gray-900);
  font-family: var(--font-family-mono);
  box-shadow: var(--shadow-sm);
}

.mastery-stat-info {
  flex: 1;
}

.mastery-stat-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-gray-700);
  margin-bottom: 4px;
}

.mastery-stat-bar {
  height: 6px;
  background: var(--color-gray-200);
  border-radius: 3px;
  overflow: hidden;
}

.mastery-stat-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 500ms ease;
}

.mastery-stat-fill-mastered {
  background: var(--color-primary-500);
}

.mastery-stat-fill-learning {
  background: var(--color-accent-500);
}

.mastery-stat-fill-new {
  background: var(--color-gray-400);
}

/* Due Badge */
.mastery-stat-due-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  background: var(--color-error-100);
  color: var(--color-error-700);
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 8px;
}

/* Study CTA Button */
.study-cta {
  width: 100%;
  height: 56px;
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 200ms ease;
  box-shadow: 0 4px 6px -1px rgb(5 150 105 / 0.2);
}

.study-cta:hover {
  background: linear-gradient(135deg, #047857 0%, #065F46 100%);
  box-shadow: 0 10px 15px -3px rgb(5 150 105 / 0.3);
  transform: translateY(-2px);
}

.study-cta-icon {
  width: 24px;
  height: 24px;
}

.study-cta-disabled {
  background: var(--color-gray-300);
  cursor: not-allowed;
  box-shadow: none;
}

.study-cta-disabled:hover {
  transform: none;
}
```

### Tailwind Implementation

```html
<!-- Mastery Hero Section -->
<section class="bg-gradient-to-br from-primary-50 via-accent-50/50 to-primary-50 rounded-3xl p-8 mb-6">

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-6">

    <!-- Progress Ring -->
    <div class="flex flex-col items-center">
      <div class="relative w-48 h-48">
        <!-- SVG Ring -->
        <svg class="w-full h-full -rotate-90" viewBox="0 0 200 200">
          <defs>
            <linearGradient id="mastery-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#10B981" />
              <stop offset="100%" stop-color="#059669" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="88" stroke-width="12" fill="none" class="stroke-white" />
          <circle cx="100" cy="100" r="88" stroke-width="12" fill="none"
                  stroke="url(#mastery-gradient)"
                  stroke-linecap="round"
                  stroke-dasharray="552.9"
                  stroke-dashoffset="138.2" />
        </svg>
        <!-- Center Label -->
        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <span class="text-5xl font-extrabold text-gray-900 font-mono">75%</span>
          <span class="text-sm text-gray-600 mt-1">Mastery Level</span>
        </div>
      </div>
    </div>

    <!-- Stats Breakdown -->
    <div class="space-y-4">

      <!-- Total Cards -->
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl font-bold text-gray-900 font-mono">
          48
        </div>
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-700 mb-1">Total Cards</p>
          <div class="h-1.5 bg-gray-200 rounded-full">
            <div class="h-full bg-gray-400 rounded-full" style="width: 100%"></div>
          </div>
        </div>
      </div>

      <!-- Cards Due -->
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl font-bold text-accent-600 font-mono">
          12
        </div>
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-700 mb-1">
            Cards Due
            <span class="inline-flex items-center gap-1 px-2 py-0.5 bg-error-100 text-error-700 rounded-full text-xs font-semibold ml-2">
              Today
            </span>
          </p>
          <div class="h-1.5 bg-gray-200 rounded-full">
            <div class="h-full bg-accent-500 rounded-full" style="width: 25%"></div>
          </div>
        </div>
      </div>

      <!-- Mastered -->
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl font-bold text-primary-600 font-mono">
          36
        </div>
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-700 mb-1">Mastered (75%)</p>
          <div class="h-1.5 bg-gray-200 rounded-full">
            <div class="h-full bg-primary-500 rounded-full" style="width: 75%"></div>
          </div>
        </div>
      </div>

      <!-- Learning -->
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl font-bold text-gray-700 font-mono">
          8
        </div>
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-700 mb-1">Learning (17%)</p>
          <div class="h-1.5 bg-gray-200 rounded-full">
            <div class="h-full bg-accent-400 rounded-full" style="width: 17%"></div>
          </div>
        </div>
      </div>

      <!-- New -->
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl font-bold text-gray-500 font-mono">
          4
        </div>
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-700 mb-1">New (8%)</p>
          <div class="h-1.5 bg-gray-200 rounded-full">
            <div class="h-full bg-gray-400 rounded-full" style="width: 8%"></div>
          </div>
        </div>
      </div>

    </div>

  </div>

  <!-- Study CTA -->
  <button class="w-full h-14 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:from-primary-700 hover:to-primary-800 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
    <PlayCircle class="w-6 h-6" />
    Study Now - 12 cards due
  </button>

</section>
```

---

## 4. Study Stats Card (NUEVO)

### Wireframe ASCII

```
+--------------------------------------------------------------------+
|                                                                      |
|  Last Study Session                                    View History  |
|                                                                      |
|  +------------------+  +------------------+  +------------------+    |
|  |                  |  |                  |  |                  |    |
|  |  [Layers Icon]   |  |  [Target Icon]   |  |  [Clock Icon]    |    |
|  |                  |  |                  |  |                  |    |
|  |       24         |  |       87%        |  |      15m         |    |
|  |  cards reviewed  |  |  correct rate    |  |  study time      |    |
|  |                  |  |                  |  |                  |    |
|  |   Yesterday      |  |   [+3% arrow]    |  |   Avg: 12m       |    |
|  |                  |  |                  |  |                  |    |
|  +------------------+  +------------------+  +------------------+    |
|                                                                      |
+--------------------------------------------------------------------+
```

### Especificaciones CSS

```css
.study-stats-card {
  background: white;
  border: 1px solid var(--color-gray-200);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
}

.study-stats-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.study-stats-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-gray-800);
}

.study-stats-link {
  font-size: 13px;
  color: var(--color-primary-600);
  font-weight: 500;
}

.study-stats-link:hover {
  text-decoration: underline;
}

.study-stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.study-stat-item {
  text-align: center;
  padding: 16px;
  background: var(--color-gray-50);
  border-radius: 12px;
}

.study-stat-icon {
  width: 40px;
  height: 40px;
  margin: 0 auto 12px;
  background: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-xs);
}

.study-stat-icon svg {
  width: 20px;
  height: 20px;
  color: var(--color-primary-600);
}

.study-stat-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--color-gray-900);
  font-family: var(--font-family-mono);
  margin-bottom: 4px;
}

.study-stat-label {
  font-size: 13px;
  color: var(--color-gray-600);
  margin-bottom: 8px;
}

.study-stat-meta {
  font-size: 12px;
  color: var(--color-gray-500);
}

.study-stat-trend {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  font-size: 12px;
  font-weight: 500;
}

.study-stat-trend-up {
  color: var(--color-success-600);
}

.study-stat-trend-down {
  color: var(--color-error-600);
}
```

### Tailwind Implementation

```html
<!-- Study Stats Card -->
<div class="bg-white border border-gray-200 rounded-2xl p-6 mb-6">

  <!-- Header -->
  <div class="flex justify-between items-center mb-5">
    <h3 class="text-base font-semibold text-gray-800">Last Study Session</h3>
    <a href="#" class="text-sm text-primary-600 font-medium hover:underline">View History</a>
  </div>

  <!-- Stats Grid -->
  <div class="grid grid-cols-3 gap-4">

    <!-- Cards Reviewed -->
    <div class="text-center p-4 bg-gray-50 rounded-xl">
      <div class="w-10 h-10 mx-auto mb-3 bg-white rounded-lg shadow-sm flex items-center justify-center">
        <Layers class="w-5 h-5 text-primary-600" />
      </div>
      <div class="text-3xl font-bold text-gray-900 font-mono">24</div>
      <div class="text-sm text-gray-600 mb-2">cards reviewed</div>
      <div class="text-xs text-gray-500">Yesterday</div>
    </div>

    <!-- Correct Rate -->
    <div class="text-center p-4 bg-gray-50 rounded-xl">
      <div class="w-10 h-10 mx-auto mb-3 bg-white rounded-lg shadow-sm flex items-center justify-center">
        <Target class="w-5 h-5 text-primary-600" />
      </div>
      <div class="text-3xl font-bold text-gray-900 font-mono">87%</div>
      <div class="text-sm text-gray-600 mb-2">correct rate</div>
      <div class="inline-flex items-center gap-1 text-xs font-medium text-success-600">
        <TrendingUp class="w-3 h-3" />
        +3%
      </div>
    </div>

    <!-- Study Time -->
    <div class="text-center p-4 bg-gray-50 rounded-xl">
      <div class="w-10 h-10 mx-auto mb-3 bg-white rounded-lg shadow-sm flex items-center justify-center">
        <Clock class="w-5 h-5 text-primary-600" />
      </div>
      <div class="text-3xl font-bold text-gray-900 font-mono">15m</div>
      <div class="text-sm text-gray-600 mb-2">study time</div>
      <div class="text-xs text-gray-500">Avg: 12m</div>
    </div>

  </div>

</div>
```

---

## 5. Flashcards Section (Actualizado)

### Wireframe ASCII

```
+--------------------------------------------------------------------+
|                                                                      |
|  Flashcards (48)                          [+ Add Card] [AI Generate] |
|                                                                      |
|  Filter: [All v]  [Mastered]  [Learning]  [New]  [Due]              |
|                                                                      |
|  +------------------------+  +------------------------+              |
|  |                        |  |                        |              |
|  |  Q: What is the        |  |  Q: Define            |              |
|  |  medical term for...   |  |  hypertension...      |              |
|  |                        |  |                        |              |
|  |  [###] Mastered        |  |  [##_] Learning       |              |
|  |  Due: 3 days           |  |  Due: Today           |              |
|  |                        |  |                        |              |
|  |  [Edit] [Delete]       |  |  [Edit] [Delete]      |              |
|  +------------------------+  +------------------------+              |
|                                                                      |
|  +------------------------+  +------------------------+              |
|  | ...                    |  | ...                    |              |
|  +------------------------+  +------------------------+              |
|                                                                      |
+--------------------------------------------------------------------+
```

### Especificaciones CSS

```css
.flashcards-section {
  background: white;
  border: 1px solid var(--color-gray-200);
  border-radius: 16px;
  padding: 24px;
}

.flashcards-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.flashcards-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-gray-800);
}

.flashcards-count {
  font-weight: 400;
  color: var(--color-gray-500);
}

.flashcards-actions {
  display: flex;
  gap: 8px;
}

/* Filter Tabs */
.flashcards-filters {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.flashcard-filter {
  padding: 8px 16px;
  border-radius: 9999px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition: all 150ms;
  border: 1px solid transparent;
}

.flashcard-filter-inactive {
  background: var(--color-gray-100);
  color: var(--color-gray-600);
}

.flashcard-filter-inactive:hover {
  background: var(--color-gray-200);
}

.flashcard-filter-active {
  background: var(--color-primary-100);
  color: var(--color-primary-700);
  border-color: var(--color-primary-200);
}

/* Flashcard Preview Grid */
.flashcard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

/* Individual Flashcard Preview */
.flashcard-preview {
  background: var(--color-gray-50);
  border: 1px solid var(--color-gray-200);
  border-radius: 12px;
  padding: 16px;
  transition: all 150ms;
}

.flashcard-preview:hover {
  border-color: var(--color-primary-300);
  box-shadow: var(--shadow-sm);
}

.flashcard-preview-question {
  font-size: 14px;
  color: var(--color-gray-700);
  margin-bottom: 12px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.flashcard-preview-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

/* Status Badge */
.flashcard-status {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 600;
}

.flashcard-status-mastered {
  background: var(--color-primary-100);
  color: var(--color-primary-700);
}

.flashcard-status-learning {
  background: var(--color-accent-100);
  color: var(--color-accent-700);
}

.flashcard-status-new {
  background: var(--color-gray-200);
  color: var(--color-gray-600);
}

.flashcard-due {
  font-size: 12px;
  color: var(--color-gray-500);
}

.flashcard-due-today {
  color: var(--color-error-600);
  font-weight: 500;
}

.flashcard-preview-actions {
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 150ms;
}

.flashcard-preview:hover .flashcard-preview-actions {
  opacity: 1;
}
```

### Tailwind Implementation

```html
<!-- Flashcards Section -->
<section class="bg-white border border-gray-200 rounded-2xl p-6">

  <!-- Header -->
  <div class="flex justify-between items-center mb-5">
    <h3 class="text-lg font-semibold text-gray-800">
      Flashcards <span class="font-normal text-gray-500">(48)</span>
    </h3>
    <div class="flex gap-2">
      <button class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
        <Plus class="w-4 h-4" />
        Add Card
      </button>
      <button class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg hover:from-primary-700 hover:to-primary-800">
        <Sparkles class="w-4 h-4" />
        AI Generate
      </button>
    </div>
  </div>

  <!-- Filters -->
  <div class="flex gap-2 mb-5 overflow-x-auto pb-1">
    <button class="px-4 py-2 rounded-full text-sm font-medium bg-primary-100 text-primary-700 border border-primary-200">
      All (48)
    </button>
    <button class="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200">
      Mastered (36)
    </button>
    <button class="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200">
      Learning (8)
    </button>
    <button class="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200">
      New (4)
    </button>
    <button class="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200">
      Due Today (12)
    </button>
  </div>

  <!-- Flashcard Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

    <!-- Flashcard Preview - Mastered -->
    <div class="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-primary-300 hover:shadow-sm transition-all group">
      <p class="text-sm text-gray-700 mb-3 line-clamp-2">
        Q: What is the medical term for high blood pressure?
      </p>
      <div class="flex justify-between items-center mb-3">
        <span class="inline-flex items-center gap-1 px-2.5 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold">
          <Check class="w-3 h-3" />
          Mastered
        </span>
        <span class="text-xs text-gray-500">Due: 3 days</span>
      </div>
      <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button class="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
          Edit
        </button>
        <button class="px-3 py-1.5 text-xs font-medium text-error-600 bg-white border border-gray-200 rounded-lg hover:bg-error-50 hover:border-error-200">
          Delete
        </button>
      </div>
    </div>

    <!-- Flashcard Preview - Learning -->
    <div class="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-primary-300 hover:shadow-sm transition-all group">
      <p class="text-sm text-gray-700 mb-3 line-clamp-2">
        Q: Define the difference between systolic and diastolic pressure.
      </p>
      <div class="flex justify-between items-center mb-3">
        <span class="inline-flex items-center gap-1 px-2.5 py-1 bg-accent-100 text-accent-700 rounded-full text-xs font-semibold">
          <RefreshCw class="w-3 h-3" />
          Learning
        </span>
        <span class="text-xs text-error-600 font-medium">Due: Today</span>
      </div>
      <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button class="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
          Edit
        </button>
        <button class="px-3 py-1.5 text-xs font-medium text-error-600 bg-white border border-gray-200 rounded-lg hover:bg-error-50 hover:border-error-200">
          Delete
        </button>
      </div>
    </div>

    <!-- More cards... -->

  </div>

</section>
```

---

## 6. Empty States

### No Cards Yet

```html
<div class="text-center py-16">
  <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center">
    <Layers class="w-12 h-12 text-primary-600" />
  </div>
  <h3 class="text-xl font-bold text-gray-900 mb-2">No flashcards yet</h3>
  <p class="text-gray-600 mb-6 max-w-sm mx-auto">
    Add content to this deck by pasting a list or uploading a PDF. AI will generate mnemonics and flashcards automatically.
  </p>
  <div class="flex gap-3 justify-center">
    <button class="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-medium rounded-lg">
      <FileText class="w-4 h-4" />
      Paste List
    </button>
    <button class="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
      <Upload class="w-4 h-4" />
      Upload PDF
    </button>
  </div>
</div>
```

### All Cards Reviewed

```html
<div class="text-center py-12 bg-primary-50 rounded-xl">
  <div class="w-20 h-20 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
    <Check class="w-10 h-10 text-primary-600" />
  </div>
  <h3 class="text-lg font-bold text-gray-900 mb-2">All caught up!</h3>
  <p class="text-gray-600 mb-4">No cards due for review right now.</p>
  <p class="text-sm text-gray-500">Next review: Tomorrow at 9:00 AM</p>
</div>
```

---

## 7. Responsive Behavior

### Mobile (< 640px)

```css
@media (max-width: 640px) {
  .mastery-hero-content {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .mastery-ring {
    width: 160px;
    height: 160px;
  }

  .mastery-ring-percent {
    font-size: 36px;
  }

  .study-stats-grid {
    grid-template-columns: 1fr;
  }

  .flashcard-grid {
    grid-template-columns: 1fr;
  }

  .flashcards-header {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }

  .flashcards-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
```

---

## 8. Data Requirements

### API Endpoints

```typescript
// GET /api/decks/:id (actualizado)
interface DeckDetail {
  id: string;
  name: string;
  description?: string;
  created_at: string;

  // Nuevos campos
  card_count: number;
  cards_due: number;
  cards_mastered: number;
  cards_learning: number;
  cards_new: number;
  mastery_percentage: number;

  // Stats de ultima sesion
  last_session?: {
    date: string;
    cards_reviewed: number;
    correct_rate: number;
    study_time_seconds: number;
  };

  // Metricas
  average_correct_rate: number;
  average_study_time: number;
}

// GET /api/decks/:id/flashcards
interface Flashcard {
  id: string;
  front: string;
  back: string;
  status: 'new' | 'learning' | 'mastered';
  due_date: string;
  ease_factor: number;
  interval: number;
}
```

---

## 9. Implementation Checklist

- [ ] Actualizar header con nueva paleta
- [ ] Crear componente MasteryHero con progress ring
- [ ] Crear componente StatsBreakdown
- [ ] Agregar StudyStatsCard
- [ ] Actualizar FlashcardList con filtros
- [ ] Crear FlashcardPreview con status badges
- [ ] Implementar empty states
- [ ] Agregar animaciones de progress ring
- [ ] Actualizar API endpoint /decks/:id
- [ ] Responsive testing

---

*Deck Detail Redesign - BrainKit V2*
*Fecha: Enero 2026*
