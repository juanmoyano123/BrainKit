# Study Session Page Redesign - BrainKit V2

**Pagina:** StudySessionPage.tsx
**Prioridad:** Alta
**Cambios principales:** Progress bar real-time, session stats, improved feedback

---

## 1. Estructura de Pagina

### Layout General

```
+------------------------------------------------------------------+
|                      STUDY SESSION HEADER                          |
|  [X Exit]           Session Progress                  [Timer 5:32] |
|  +=================================================+              |
|  |############################################_____|  12/24       |
|  +=================================================+              |
+------------------------------------------------------------------+
|                                                                    |
|                                                                    |
|  +------------------------------------------------------------+   |
|  |                                                              |  |
|  |                      FLASHCARD                               |  |
|  |                                                              |  |
|  |         +----------------------------------+                 |  |
|  |         |                                  |                 |  |
|  |         |                                  |                 |  |
|  |         |     What is the medical term     |                 |  |
|  |         |     for high blood pressure?     |                 |  |
|  |         |                                  |                 |  |
|  |         |                                  |                 |  |
|  |         |       [Click to reveal]          |                 |  |
|  |         |                                  |                 |  |
|  |         +----------------------------------+                 |  |
|  |                                                              |  |
|  +------------------------------------------------------------+  |
|                                                                    |
|                                                                    |
|  +------------------------------------------------------------+   |
|  |                     RATING BUTTONS                          |   |
|  |                                                              |  |
|  |  +----------------+  +----------------+  +----------------+  |  |
|  |  |     HARD       |  |     GOOD       |  |     EASY       |  |  |
|  |  |   [1] Again    |  |   [2] ~1min    |  |   [3] ~10min   |  |  |
|  |  +----------------+  +----------------+  +----------------+  |  |
|  |                                                              |  |
|  +------------------------------------------------------------+  |
|                                                                    |
+------------------------------------------------------------------+
|                      SESSION STATS FOOTER                          |
|       Correct: 10 (83%)    |    Streak: 5    |    Avg: 4.2s       |
+------------------------------------------------------------------+
```

---

## 2. Study Session Header (NUEVO)

### Wireframe ASCII Detallado

```
+------------------------------------------------------------------+
|                                                                    |
|   [X]                                                    [5:32]   |
|   Exit                                                   Timer    |
|                                                                    |
|   Session Progress                               12 of 24 cards   |
|   +======================================================+       |
|   |#################################|_____________________|       |
|   +======================================================+       |
|                                                                    |
+------------------------------------------------------------------+
```

### Especificaciones CSS

```css
/* Session Header */
.session-header {
  background: white;
  border-bottom: 1px solid var(--color-gray-200);
  padding: 16px 24px;
  position: sticky;
  top: 0;
  z-index: 40;
}

.session-header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

/* Exit Button */
.session-exit {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-gray-600);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 150ms;
}

.session-exit:hover {
  background: var(--color-gray-100);
  color: var(--color-gray-800);
}

.session-exit-icon {
  width: 18px;
  height: 18px;
}

/* Timer */
.session-timer {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--color-gray-100);
  border-radius: 9999px;
  font-size: 16px;
  font-weight: 600;
  font-family: var(--font-family-mono);
  color: var(--color-gray-700);
}

.session-timer-icon {
  width: 18px;
  height: 18px;
  color: var(--color-primary-500);
}

/* Progress Section */
.session-progress {
  margin-top: 8px;
}

.session-progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.session-progress-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-gray-600);
}

.session-progress-count {
  font-size: 13px;
  color: var(--color-gray-500);
}

.session-progress-count strong {
  color: var(--color-primary-600);
  font-weight: 600;
}

/* Progress Bar */
.session-progress-bar {
  height: 8px;
  background: var(--color-gray-200);
  border-radius: 4px;
  overflow: hidden;
}

.session-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #10B981 0%, #059669 100%);
  border-radius: 4px;
  transition: width 300ms ease-out;
}

/* Progress with segments */
.session-progress-segmented {
  display: flex;
  gap: 3px;
}

.session-progress-segment {
  flex: 1;
  height: 8px;
  background: var(--color-gray-200);
  border-radius: 4px;
  transition: background-color 200ms;
}

.session-progress-segment-complete {
  background: var(--color-primary-500);
}

.session-progress-segment-correct {
  background: var(--color-success-500);
}

.session-progress-segment-incorrect {
  background: var(--color-error-400);
}

.session-progress-segment-current {
  background: var(--color-accent-400);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
```

### Tailwind Implementation

```html
<!-- Study Session Header -->
<header class="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">

  <!-- Top Row -->
  <div class="flex justify-between items-center mb-3">

    <!-- Exit Button -->
    <button class="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
      <X class="w-4 h-4" />
      Exit
    </button>

    <!-- Timer -->
    <div class="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-base font-semibold font-mono text-gray-700">
      <Clock class="w-4 h-4 text-primary-500" />
      5:32
    </div>

  </div>

  <!-- Progress Section -->
  <div>
    <div class="flex justify-between items-center mb-2">
      <span class="text-sm font-medium text-gray-600">Session Progress</span>
      <span class="text-sm text-gray-500">
        <strong class="text-primary-600 font-semibold">12</strong> of 24 cards
      </span>
    </div>

    <!-- Option A: Continuous Progress Bar -->
    <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
      <div class="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-300" style="width: 50%"></div>
    </div>

    <!-- Option B: Segmented Progress (shows correct/incorrect) -->
    <!--
    <div class="flex gap-1">
      <div class="flex-1 h-2 bg-success-500 rounded"></div>
      <div class="flex-1 h-2 bg-success-500 rounded"></div>
      <div class="flex-1 h-2 bg-error-400 rounded"></div>
      <div class="flex-1 h-2 bg-success-500 rounded"></div>
      <div class="flex-1 h-2 bg-accent-400 rounded animate-pulse"></div>
      <div class="flex-1 h-2 bg-gray-200 rounded"></div>
      ... more segments
    </div>
    -->
  </div>

</header>
```

---

## 3. Flashcard Display (Actualizado)

### Wireframe ASCII - Question State

```
+------------------------------------------------------------------+
|                                                                    |
|                                                                    |
|            +----------------------------------------+             |
|            |                                        |             |
|            |                                        |             |
|            |                                        |             |
|            |     What is the medical term for       |             |
|            |     high blood pressure?               |             |
|            |                                        |             |
|            |                                        |             |
|            |                                        |             |
|            |          [Tap to reveal]               |             |
|            |                                        |             |
|            +----------------------------------------+             |
|                                                                    |
|                                                                    |
+------------------------------------------------------------------+
```

### Wireframe ASCII - Answer State

```
+------------------------------------------------------------------+
|                                                                    |
|                                                                    |
|            +----------------------------------------+             |
|            |                                        |             |
|            |           QUESTION                     |             |
|            |     What is the medical term for       |             |
|            |     high blood pressure?               |             |
|            |                                        |             |
|            |  --------------------------------      |             |
|            |                                        |             |
|            |           ANSWER                       |             |
|            |                                        |             |
|            |      Hypertension                      |             |
|            |                                        |             |
|            |                                        |             |
|            +----------------------------------------+             |
|                                                                    |
|                                                                    |
+------------------------------------------------------------------+
```

### Especificaciones CSS

```css
/* Flashcard Container */
.flashcard-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 280px); /* Account for header and footer */
  padding: 24px;
}

/* Flashcard */
.flashcard {
  width: 100%;
  max-width: 640px;
  min-height: 320px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 20px 40px -10px rgb(0 0 0 / 0.1), 0 0 0 1px rgb(0 0 0 / 0.05);
  padding: 48px;
  cursor: pointer;
  transition: all 200ms ease;
  position: relative;
  overflow: hidden;
}

.flashcard:hover {
  box-shadow: 0 25px 50px -10px rgb(0 0 0 / 0.15), 0 0 0 1px rgb(0 0 0 / 0.05);
}

/* Gradient border effect */
.flashcard::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #10B981 0%, #0D9488 50%, #059669 100%);
}

/* Flashcard Content */
.flashcard-content {
  text-align: center;
}

.flashcard-label {
  display: inline-block;
  padding: 6px 14px;
  background: var(--color-gray-100);
  color: var(--color-gray-600);
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 24px;
}

.flashcard-text {
  font-size: 1.5rem;
  line-height: 1.5;
  color: var(--color-gray-800);
  font-weight: 500;
}

/* Reveal Button */
.flashcard-reveal {
  margin-top: 32px;
  padding: 12px 24px;
  background: var(--color-primary-100);
  color: var(--color-primary-700);
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 150ms;
}

.flashcard-reveal:hover {
  background: var(--color-primary-200);
}

/* Answer State */
.flashcard-answer-state .flashcard-question {
  font-size: 1.125rem;
  color: var(--color-gray-600);
  margin-bottom: 24px;
}

.flashcard-divider {
  width: 60px;
  height: 2px;
  background: var(--color-gray-200);
  margin: 24px auto;
}

.flashcard-answer {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--color-primary-700);
}

/* Keyboard Hint */
.flashcard-hint {
  position: absolute;
  bottom: 16px;
  right: 16px;
  font-size: 12px;
  color: var(--color-gray-400);
}

.flashcard-hint kbd {
  display: inline-block;
  padding: 2px 8px;
  background: var(--color-gray-100);
  border-radius: 4px;
  font-family: var(--font-family-mono);
  font-size: 11px;
  margin-left: 4px;
}
```

### Tailwind Implementation

```html
<!-- Flashcard Container -->
<div class="flex items-center justify-center min-h-[calc(100vh-280px)] p-6">

  <!-- Flashcard - Question State -->
  <div class="w-full max-w-2xl min-h-[320px] bg-white rounded-3xl shadow-2xl p-12 cursor-pointer transition-all hover:shadow-[0_25px_50px_-10px_rgba(0,0,0,0.15)] relative overflow-hidden">

    <!-- Top gradient border -->
    <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-teal-500 to-primary-600"></div>

    <!-- Content -->
    <div class="text-center">
      <span class="inline-block px-3.5 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold uppercase tracking-wide mb-6">
        Question
      </span>

      <p class="text-2xl text-gray-800 font-medium leading-relaxed">
        What is the medical term for high blood pressure?
      </p>

      <!-- Reveal Button -->
      <button class="mt-8 px-6 py-3 bg-primary-100 text-primary-700 rounded-xl text-sm font-semibold hover:bg-primary-200 transition-colors">
        Tap to reveal answer
      </button>
    </div>

    <!-- Keyboard Hint -->
    <div class="absolute bottom-4 right-4 text-xs text-gray-400">
      Press <kbd class="px-2 py-0.5 bg-gray-100 rounded font-mono text-xs">Space</kbd>
    </div>

  </div>

  <!-- Flashcard - Answer State -->
  <div class="w-full max-w-2xl min-h-[320px] bg-white rounded-3xl shadow-2xl p-12 relative overflow-hidden">

    <!-- Top gradient border -->
    <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-teal-500 to-primary-600"></div>

    <!-- Content -->
    <div class="text-center">
      <span class="inline-block px-3.5 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold uppercase tracking-wide mb-4">
        Question
      </span>

      <p class="text-lg text-gray-600 mb-6">
        What is the medical term for high blood pressure?
      </p>

      <div class="w-16 h-0.5 bg-gray-200 mx-auto mb-6"></div>

      <span class="inline-block px-3.5 py-1.5 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold uppercase tracking-wide mb-4">
        Answer
      </span>

      <p class="text-3xl text-primary-700 font-semibold">
        Hypertension
      </p>
    </div>

  </div>

</div>
```

---

## 4. Rating Buttons (Actualizado)

### Wireframe ASCII

```
+------------------------------------------------------------------+
|                                                                    |
|     +-------------------+  +-------------------+  +-------------------+
|     |                   |  |                   |  |                   |
|     |       HARD        |  |       GOOD        |  |       EASY        |
|     |                   |  |                   |  |                   |
|     |    [X] Again      |  |   [O] ~1 min      |  |  [Check] ~10 min  |
|     |                   |  |                   |  |                   |
|     |       [1]         |  |       [2]         |  |       [3]         |
|     |                   |  |                   |  |                   |
|     +-------------------+  +-------------------+  +-------------------+
|                                                                    |
+------------------------------------------------------------------+
```

### Especificaciones CSS

```css
/* Rating Container */
.rating-container {
  padding: 24px;
  max-width: 600px;
  margin: 0 auto;
}

.rating-buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

/* Rating Button Base */
.rating-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  transition: all 150ms ease;
  position: relative;
  overflow: hidden;
}

.rating-button:active {
  transform: scale(0.97);
}

.rating-button-icon {
  width: 32px;
  height: 32px;
  margin-bottom: 8px;
}

.rating-button-label {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 4px;
}

.rating-button-time {
  font-size: 13px;
  opacity: 0.8;
}

.rating-button-key {
  position: absolute;
  bottom: 8px;
  font-size: 11px;
  font-weight: 600;
  opacity: 0.5;
  font-family: var(--font-family-mono);
}

/* Hard Button */
.rating-hard {
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
  color: white;
  box-shadow: 0 4px 6px -1px rgb(239 68 68 / 0.3);
}

.rating-hard:hover {
  background: linear-gradient(135deg, #DC2626 0%, #B91C1C 100%);
  box-shadow: 0 6px 10px -1px rgb(239 68 68 / 0.4);
  transform: translateY(-2px);
}

/* Good Button */
.rating-good {
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  color: white;
  box-shadow: 0 4px 6px -1px rgb(245 158 11 / 0.3);
}

.rating-good:hover {
  background: linear-gradient(135deg, #D97706 0%, #B45309 100%);
  box-shadow: 0 6px 10px -1px rgb(245 158 11 / 0.4);
  transform: translateY(-2px);
}

/* Easy Button */
.rating-easy {
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  color: white;
  box-shadow: 0 4px 6px -1px rgb(16 185 129 / 0.3);
}

.rating-easy:hover {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  box-shadow: 0 6px 10px -1px rgb(16 185 129 / 0.4);
  transform: translateY(-2px);
}

/* Disabled state (when showing question) */
.rating-button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.rating-button:disabled:hover {
  transform: none;
}
```

### Tailwind Implementation

```html
<!-- Rating Buttons -->
<div class="p-6 max-w-xl mx-auto">
  <div class="grid grid-cols-3 gap-4">

    <!-- Hard Button -->
    <button class="flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-error-500 to-error-600 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-[0.97] relative">
      <XCircle class="w-8 h-8 mb-2" />
      <span class="text-base font-bold">Hard</span>
      <span class="text-sm opacity-80">Again</span>
      <span class="absolute bottom-2 text-xs font-mono opacity-50">1</span>
    </button>

    <!-- Good Button -->
    <button class="flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-[0.97] relative">
      <Circle class="w-8 h-8 mb-2" />
      <span class="text-base font-bold">Good</span>
      <span class="text-sm opacity-80">~1 min</span>
      <span class="absolute bottom-2 text-xs font-mono opacity-50">2</span>
    </button>

    <!-- Easy Button -->
    <button class="flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-[0.97] relative">
      <CheckCircle class="w-8 h-8 mb-2" />
      <span class="text-base font-bold">Easy</span>
      <span class="text-sm opacity-80">~10 min</span>
      <span class="absolute bottom-2 text-xs font-mono opacity-50">3</span>
    </button>

  </div>
</div>
```

---

## 5. Session Stats Footer (NUEVO)

### Wireframe ASCII

```
+------------------------------------------------------------------+
|                                                                    |
|   Correct: 10 (83%)    |    Streak: 5    |    Avg. Time: 4.2s     |
|                                                                    |
+------------------------------------------------------------------+
```

### Especificaciones CSS

```css
.session-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid var(--color-gray-200);
  padding: 12px 24px;
  z-index: 40;
}

.session-footer-inner {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 32px;
}

.session-stat {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.session-stat-icon {
  width: 18px;
  height: 18px;
}

.session-stat-icon-success {
  color: var(--color-success-500);
}

.session-stat-icon-streak {
  color: var(--color-accent-500);
}

.session-stat-icon-time {
  color: var(--color-gray-500);
}

.session-stat-label {
  color: var(--color-gray-600);
}

.session-stat-value {
  font-weight: 600;
  color: var(--color-gray-900);
}

.session-stat-divider {
  width: 1px;
  height: 24px;
  background: var(--color-gray-200);
}
```

### Tailwind Implementation

```html
<!-- Session Stats Footer -->
<footer class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-6 z-40">
  <div class="max-w-xl mx-auto flex justify-center gap-8">

    <!-- Correct Rate -->
    <div class="flex items-center gap-2 text-sm">
      <CheckCircle class="w-4 h-4 text-success-500" />
      <span class="text-gray-600">Correct:</span>
      <span class="font-semibold text-gray-900">10 (83%)</span>
    </div>

    <div class="w-px h-6 bg-gray-200"></div>

    <!-- Current Streak -->
    <div class="flex items-center gap-2 text-sm">
      <Flame class="w-4 h-4 text-accent-500" />
      <span class="text-gray-600">Streak:</span>
      <span class="font-semibold text-gray-900">5</span>
    </div>

    <div class="w-px h-6 bg-gray-200"></div>

    <!-- Average Time -->
    <div class="flex items-center gap-2 text-sm">
      <Timer class="w-4 h-4 text-gray-500" />
      <span class="text-gray-600">Avg:</span>
      <span class="font-semibold text-gray-900">4.2s</span>
    </div>

  </div>
</footer>
```

---

## 6. Session Complete Screen (Actualizado)

### Wireframe ASCII

```
+------------------------------------------------------------------+
|                                                                    |
|                      SESSION COMPLETE                              |
|                                                                    |
|                    [Trophy/Celebration Icon]                       |
|                                                                    |
|                     Great job, John!                               |
|                  You completed today's review                      |
|                                                                    |
|  +------------------------------------------------------------+   |
|  |                     STATS SUMMARY                           |   |
|  |                                                              |  |
|  |  +------------+  +------------+  +------------+              |  |
|  |  |     24     |  |    87%     |  |    8:45    |              |  |
|  |  |   cards    |  |  correct   |  |   total    |              |  |
|  |  |  reviewed  |  |    rate    |  |   time     |              |  |
|  |  +------------+  +------------+  +------------+              |  |
|  |                                                              |  |
|  +------------------------------------------------------------+  |
|                                                                    |
|  +------------------------------------------------------------+   |
|  |                     STREAK UPDATE                           |   |
|  |                                                              |  |
|  |      [Flame]  Your streak is now 13 days!                   |  |
|  |                                                              |  |
|  +------------------------------------------------------------+  |
|                                                                    |
|           [Continue Studying]    [Back to Deck]                   |
|                                                                    |
+------------------------------------------------------------------+
```

### Especificaciones CSS

```css
.session-complete {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(135deg, #ECFDF5 0%, #FFFBEB 50%, #F0FDF4 100%);
}

.session-complete-card {
  background: white;
  border-radius: 24px;
  padding: 48px;
  max-width: 480px;
  width: 100%;
  text-align: center;
  box-shadow: var(--shadow-xl);
}

.session-complete-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  background: linear-gradient(135deg, var(--color-primary-100) 0%, var(--color-accent-100) 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.session-complete-icon svg {
  width: 40px;
  height: 40px;
  color: var(--color-primary-600);
}

.session-complete-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--color-gray-900);
  margin-bottom: 8px;
}

.session-complete-subtitle {
  font-size: 16px;
  color: var(--color-gray-600);
  margin-bottom: 32px;
}

/* Stats Summary */
.session-complete-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.session-complete-stat {
  padding: 16px;
  background: var(--color-gray-50);
  border-radius: 12px;
}

.session-complete-stat-value {
  font-size: 32px;
  font-weight: 700;
  color: var(--color-gray-900);
  font-family: var(--font-family-mono);
}

.session-complete-stat-label {
  font-size: 13px;
  color: var(--color-gray-500);
  margin-top: 4px;
}

/* Streak Banner */
.session-complete-streak {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px;
  background: linear-gradient(135deg, var(--color-accent-100) 0%, var(--color-accent-50) 100%);
  border-radius: 12px;
  margin-bottom: 32px;
}

.session-complete-streak-icon {
  width: 32px;
  height: 32px;
  color: var(--color-accent-500);
}

.session-complete-streak-text {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-accent-700);
}

/* Actions */
.session-complete-actions {
  display: flex;
  gap: 12px;
}

.session-complete-actions button {
  flex: 1;
}
```

### Tailwind Implementation

```html
<!-- Session Complete Screen -->
<div class="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-primary-50 via-accent-50/50 to-primary-50">

  <div class="bg-white rounded-3xl p-12 max-w-md w-full text-center shadow-xl">

    <!-- Icon -->
    <div class="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center">
      <Trophy class="w-10 h-10 text-primary-600" />
    </div>

    <!-- Title -->
    <h1 class="text-3xl font-bold text-gray-900 mb-2">Great job, John!</h1>
    <p class="text-gray-600 mb-8">You completed today's review</p>

    <!-- Stats -->
    <div class="grid grid-cols-3 gap-4 mb-6">
      <div class="p-4 bg-gray-50 rounded-xl">
        <div class="text-3xl font-bold text-gray-900 font-mono">24</div>
        <div class="text-sm text-gray-500 mt-1">cards reviewed</div>
      </div>
      <div class="p-4 bg-gray-50 rounded-xl">
        <div class="text-3xl font-bold text-gray-900 font-mono">87%</div>
        <div class="text-sm text-gray-500 mt-1">correct rate</div>
      </div>
      <div class="p-4 bg-gray-50 rounded-xl">
        <div class="text-3xl font-bold text-gray-900 font-mono">8:45</div>
        <div class="text-sm text-gray-500 mt-1">total time</div>
      </div>
    </div>

    <!-- Streak Banner -->
    <div class="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-accent-100 to-accent-50 rounded-xl mb-8">
      <Flame class="w-8 h-8 text-accent-500" />
      <span class="text-base font-semibold text-accent-700">Your streak is now 13 days!</span>
    </div>

    <!-- Actions -->
    <div class="flex gap-3">
      <button class="flex-1 px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors">
        Back to Deck
      </button>
      <button class="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-medium rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all">
        Continue Studying
      </button>
    </div>

  </div>

</div>
```

---

## 7. Estados Especiales

### No Cards Due

```html
<div class="min-h-screen flex items-center justify-center p-6 bg-gray-50">
  <div class="text-center max-w-md">
    <div class="w-20 h-20 mx-auto mb-6 bg-primary-100 rounded-2xl flex items-center justify-center">
      <CheckCircle class="w-10 h-10 text-primary-600" />
    </div>
    <h2 class="text-2xl font-bold text-gray-900 mb-2">All caught up!</h2>
    <p class="text-gray-600 mb-6">No cards are due for review right now. Great job keeping up with your studies!</p>
    <p class="text-sm text-gray-500 mb-8">Next review: Tomorrow at 9:00 AM</p>
    <button class="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors">
      <ArrowLeft class="w-4 h-4 inline mr-2" />
      Back to Deck
    </button>
  </div>
</div>
```

### Error State

```html
<div class="min-h-screen flex items-center justify-center p-6 bg-gray-50">
  <div class="text-center max-w-md">
    <div class="w-20 h-20 mx-auto mb-6 bg-error-100 rounded-2xl flex items-center justify-center">
      <AlertTriangle class="w-10 h-10 text-error-600" />
    </div>
    <h2 class="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
    <p class="text-gray-600 mb-8">We couldn't load your study session. Please try again.</p>
    <div class="flex gap-3 justify-center">
      <button class="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50">
        Back to Deck
      </button>
      <button class="px-6 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700">
        Try Again
      </button>
    </div>
  </div>
</div>
```

---

## 8. Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Reveal answer |
| `1` | Rate as Hard |
| `2` | Rate as Good |
| `3` | Rate as Easy |
| `Escape` | Exit session (with confirmation) |

---

## 9. Animations

```css
/* Card reveal animation */
@keyframes reveal {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.flashcard-answer {
  animation: reveal 300ms ease-out;
}

/* Correct answer celebration */
@keyframes correct-pulse {
  0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
  100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

.flashcard-correct {
  animation: correct-pulse 0.5s ease-out;
}

/* Progress bar fill */
@keyframes progress-fill {
  from { width: var(--prev-width); }
  to { width: var(--new-width); }
}
```

---

## 10. Data Requirements

```typescript
// Study Session State
interface StudySession {
  deck_id: string;
  started_at: string;
  cards_total: number;
  cards_reviewed: number;
  cards_correct: number;
  current_streak: number;
  time_elapsed_seconds: number;
}

// Card Review
interface CardReview {
  flashcard_id: string;
  quality: 1 | 3 | 5; // Hard, Good, Easy
  time_to_answer_ms: number;
}

// Session Complete Response
interface SessionSummary {
  cards_reviewed: number;
  correct_rate: number;
  total_time_seconds: number;
  streak_updated: number;
  cards_remaining: number;
}
```

---

## 11. Implementation Checklist

- [ ] Crear SessionHeader con progress bar
- [ ] Agregar timer en tiempo real
- [ ] Actualizar Flashcard con nueva paleta
- [ ] Agregar gradient border a flashcard
- [ ] Actualizar RatingButtons con nuevos colores
- [ ] Crear SessionFooter con stats en vivo
- [ ] Actualizar SessionComplete screen
- [ ] Implementar keyboard shortcuts
- [ ] Agregar animaciones de feedback
- [ ] Testing responsive mobile

---

*Study Session Redesign - BrainKit V2*
*Fecha: Enero 2026*
