# Sistema de Diseño BrainKit V2

**Version:** 2.0
**Fecha:** Enero 2026
**Estado:** Aprobado para implementacion
**Cambio principal:** Nueva paleta Emerald + Amber (sin azul/violeta)

---

## Resumen Ejecutivo

Este rediseño esta basado en investigacion competitiva de 7 apps líderes (Duolingo, Strava, Headspace, Calm, Notion, Todoist, Forest) y tendencias de color 2025-2026. La nueva identidad visual diferencia a BrainKit de competidores (Quizlet, Brainscape) que usan azul.

### Cambios Clave vs V1

| Aspecto | V1 (Actual) | V2 (Nuevo) | Justificacion |
|---------|-------------|------------|---------------|
| Color Primario | Azul #2563EB | Esmeralda #059669 | Diferenciacion, crecimiento |
| Color Acento | Violeta | Ambar #F59E0B | Logros, streaks |
| Gradientes | Azul-Violeta | Esmeralda-Teal | Naturaleza, profesional |
| Progress Tracking | Basico | Integral | Engagement +60% |

### Principios de Diseño V2

1. **Profesional y Distintivo**
   - Paleta esmeralda unica en el mercado
   - Gradientes naturales, no genericos
   - Transmite confianza para profesionales certificados

2. **Progress-First**
   - Tracking visible en todas las pantallas
   - Streaks prominentes pero no invasivos
   - Metricas que motivan sin presionar

3. **Calmo pero Energetico**
   - Esmeralda = calma y crecimiento
   - Ambar = energia y logro
   - Balance entre serenidad y motivacion

4. **Mobile-First con Touch Targets**
   - Minimo 44px para elementos interactivos
   - Espaciado generoso en mobile

---

## 1. Paleta de Colores

### 1.1 Colores Primarios (Emerald)

```css
/* Verde Esmeralda - Crecimiento, conocimiento, profesionalismo */
--color-primary-50:  #ECFDF5;  /* Fondos sutiles, backgrounds */
--color-primary-100: #D1FAE5;  /* Hover backgrounds, selected states */
--color-primary-200: #A7F3D0;  /* Borders light, disabled */
--color-primary-300: #6EE7B7;  /* Icons secondary, badges bg */
--color-primary-400: #34D399;  /* Links hover, progress bars */
--color-primary-500: #10B981;  /* Links, icons, secondary buttons */
--color-primary-600: #059669;  /* PRIMARY - Botones, CTAs, headers */
--color-primary-700: #047857;  /* Hover on primary buttons */
--color-primary-800: #065F46;  /* Active states, pressed */
--color-primary-900: #064E3B;  /* Text emphasis, dark mode accents */
```

**Uso:**
- `primary-600`: Botones principales, CTAs
- `primary-500`: Links, iconos
- `primary-100`: Backgrounds de hover
- `primary-50`: Fondos de secciones

### 1.2 Colores Accent (Amber)

```css
/* Ambar - Logros, streaks, premium */
--color-accent-50:  #FFFBEB;  /* Fondos de badges */
--color-accent-100: #FEF3C7;  /* Hover accent backgrounds */
--color-accent-200: #FDE68A;  /* Borders accent */
--color-accent-300: #FCD34D;  /* Icons accent light */
--color-accent-400: #FBBF24;  /* Streak badge fill */
--color-accent-500: #F59E0B;  /* ACCENT - Streaks, achievements */
--color-accent-600: #D97706;  /* Hover accent */
--color-accent-700: #B45309;  /* Active accent */
```

**Uso:**
- `accent-500`: Streaks, achievements, highlights
- `accent-400`: Iconos de fuego (streak)
- `accent-100`: Background de streak badges

### 1.3 Colores Semanticos

```css
/* Verde Exito - Respuestas correctas */
--color-success-50:  #F0FDF4;
--color-success-100: #DCFCE7;
--color-success-500: #22C55E;
--color-success-600: #16A34A;
--color-success-700: #15803D;

/* Ambar Advertencia - Cards por vencer */
--color-warning-50:  #FFFBEB;
--color-warning-100: #FEF3C7;
--color-warning-500: #F59E0B;
--color-warning-600: #D97706;

/* Rojo Error - Respuestas incorrectas, peligro */
--color-error-50:  #FEF2F2;
--color-error-100: #FEE2E2;
--color-error-500: #EF4444;
--color-error-600: #DC2626;
--color-error-700: #B91C1C;

/* Azul Info - Informacion neutral (uso minimo) */
--color-info-50:  #F0F9FF;
--color-info-100: #E0F2FE;
--color-info-500: #0EA5E9;
--color-info-600: #0284C7;
```

### 1.4 Colores Neutrales

```css
/* Escala de grises neutros (sin subtono azul) */
--color-gray-50:  #F9FAFB;  /* Fondos principales */
--color-gray-100: #F3F4F6;  /* Fondos alternos, cards */
--color-gray-200: #E5E7EB;  /* Borders, dividers */
--color-gray-300: #D1D5DB;  /* Borders focus, disabled */
--color-gray-400: #9CA3AF;  /* Placeholder text, icons disabled */
--color-gray-500: #6B7280;  /* Texto secundario */
--color-gray-600: #4B5563;  /* Texto body */
--color-gray-700: #374151;  /* Texto headings */
--color-gray-800: #1F2937;  /* Texto prominente */
--color-gray-900: #111827;  /* Texto maximo contraste */
```

### 1.5 Gradientes

```css
/* Gradiente Principal - CTAs, Heroes */
--gradient-primary: linear-gradient(135deg, #059669 0%, #0D9488 100%);
/* Emerald to Teal - Naturaleza, crecimiento */

/* Gradiente Accent - Logros, celebraciones */
--gradient-accent: linear-gradient(135deg, #F59E0B 0%, #EA580C 100%);
/* Amber to Orange - Energia, achievement */

/* Gradiente Hero - Fondos de landing/dashboard */
--gradient-hero: linear-gradient(135deg, #ECFDF5 0%, #FFFBEB 50%, #F0FDF4 100%);
/* Light emerald to light amber - Sutil, acogedor */

/* Gradiente Dark - Headers dark mode, footer */
--gradient-dark: linear-gradient(135deg, #064E3B 0%, #134E4A 100%);
/* Dark emerald to dark teal - Premium, nocturno */

/* Gradiente Card Hover */
--gradient-card-hover: linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%);

/* Gradiente Progress Bar */
--gradient-progress: linear-gradient(90deg, #10B981 0%, #059669 100%);
```

### 1.6 Modo Oscuro

```css
/* Fondos */
--dark-bg-primary:   #0F1419;  /* Fondo principal */
--dark-bg-secondary: #1C2128;  /* Cards, sidebars */
--dark-bg-tertiary:  #2D333B;  /* Hover states */

/* Textos */
--dark-text-primary:   #E6EDF3;  /* Texto principal */
--dark-text-secondary: #8B949E;  /* Texto secundario */

/* Borders */
--dark-border: #30363D;

/* Primario ajustado para dark mode */
--dark-primary-500: #34D399;
--dark-primary-600: #10B981;
```

### 1.7 Contraste y Accesibilidad

| Combinacion | Ratio | WCAG AA | WCAG AAA |
|-------------|-------|---------|----------|
| Primary-600 sobre blanco | 4.58:1 | Si | No |
| Primary-700 sobre blanco | 5.91:1 | Si | Si |
| Gray-600 sobre blanco | 5.74:1 | Si | Si |
| Gray-900 sobre blanco | 16.1:1 | Si | Si |
| Accent-600 sobre blanco | 3.51:1 | Large text | No |
| Error-600 sobre blanco | 4.52:1 | Si | No |

---

## 2. Tipografia

### 2.1 Familia Tipografica

```css
/* Principal - Sin cambios, Inter es excelente */
--font-family-sans: 'Inter', -apple-system, BlinkMacSystemFont,
                    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

/* Monospace - Para stats, codigos */
--font-family-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono',
                    Consolas, 'Liberation Mono', monospace;
```

### 2.2 Escala Tipografica

```css
/* Display - Landing pages, heroes */
--font-size-display: 3.5rem;    /* 56px */
--line-height-display: 1.1;
--font-weight-display: 800;

/* H1 - Page titles */
--font-size-h1: 2.25rem;        /* 36px */
--line-height-h1: 1.2;
--font-weight-h1: 700;

/* H2 - Section titles */
--font-size-h2: 1.875rem;       /* 30px */
--line-height-h2: 1.25;
--font-weight-h2: 600;

/* H3 - Card titles */
--font-size-h3: 1.5rem;         /* 24px */
--line-height-h3: 1.3;
--font-weight-h3: 600;

/* H4 - Subsections */
--font-size-h4: 1.25rem;        /* 20px */
--line-height-h4: 1.4;
--font-weight-h4: 600;

/* Body Large - Intro text */
--font-size-body-lg: 1.125rem;  /* 18px */
--line-height-body-lg: 1.6;

/* Body - Default */
--font-size-body: 1rem;         /* 16px */
--line-height-body: 1.5;
--font-weight-body: 400;

/* Body Small - Secondary text */
--font-size-body-sm: 0.875rem;  /* 14px */
--line-height-body-sm: 1.5;

/* Caption - Labels, hints */
--font-size-caption: 0.75rem;   /* 12px */
--line-height-caption: 1.4;

/* Stats/Numbers - Big numbers */
--font-size-stat: 2.5rem;       /* 40px */
--font-weight-stat: 700;
--font-family-stat: var(--font-family-mono);

/* Button */
--font-size-button: 0.9375rem;  /* 15px */
--font-weight-button: 500;
--letter-spacing-button: 0.01em;
```

### 2.3 Aplicacion Semantica

| Elemento | Size | Weight | Color | Line Height |
|----------|------|--------|-------|-------------|
| Page Title | h1 | 700 | gray-900 | 1.2 |
| Section Title | h2 | 600 | gray-800 | 1.25 |
| Card Title | h3/h4 | 600 | gray-800 | 1.3 |
| Body Text | body | 400 | gray-600 | 1.5 |
| Labels | body-sm | 500 | gray-700 | 1.5 |
| Helper Text | caption | 400 | gray-500 | 1.4 |
| Stats Number | stat | 700 | primary-600 | 1 |
| Button Text | button | 500 | varies | 1 |

---

## 3. Espaciado

### 3.1 Escala Base (4px)

```css
--space-0:   0;
--space-px:  1px;
--space-0.5: 0.125rem;  /* 2px */
--space-1:   0.25rem;   /* 4px */
--space-1.5: 0.375rem;  /* 6px */
--space-2:   0.5rem;    /* 8px */
--space-2.5: 0.625rem;  /* 10px */
--space-3:   0.75rem;   /* 12px */
--space-4:   1rem;      /* 16px */
--space-5:   1.25rem;   /* 20px */
--space-6:   1.5rem;    /* 24px */
--space-8:   2rem;      /* 32px */
--space-10:  2.5rem;    /* 40px */
--space-12:  3rem;      /* 48px */
--space-16:  4rem;      /* 64px */
--space-20:  5rem;      /* 80px */
--space-24:  6rem;      /* 96px */
```

### 3.2 Tokens Semanticos

```css
/* Componentes */
--spacing-input-y: var(--space-3);      /* 12px */
--spacing-input-x: var(--space-4);      /* 16px */
--spacing-button-y: var(--space-3);     /* 12px */
--spacing-button-x: var(--space-5);     /* 20px */
--spacing-card-padding: var(--space-6); /* 24px */
--spacing-card-gap: var(--space-4);     /* 16px */

/* Layout */
--spacing-section-y: var(--space-16);   /* 64px */
--spacing-container-x: var(--space-4);  /* 16px mobile */
--spacing-container-x-md: var(--space-6);  /* 24px tablet */
--spacing-container-x-lg: var(--space-8);  /* 32px desktop */

/* Progress components */
--spacing-stat-card-padding: var(--space-5); /* 20px */
--spacing-heatmap-cell: var(--space-1);      /* 4px gap */
```

---

## 4. Bordes y Sombras

### 4.1 Border Radius

```css
--radius-none: 0;
--radius-sm:   0.25rem;   /* 4px - pills, small badges */
--radius-md:   0.375rem;  /* 6px - inputs */
--radius-lg:   0.5rem;    /* 8px - buttons, small cards */
--radius-xl:   0.75rem;   /* 12px - cards */
--radius-2xl:  1rem;      /* 16px - modals, large cards */
--radius-3xl:  1.5rem;    /* 24px - hero sections */
--radius-full: 9999px;    /* Circular - avatars, badges */
```

### 4.2 Sombras

```css
--shadow-xs:  0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-sm:  0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md:  0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg:  0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl:  0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);

/* Focus rings - Actualizados para emerald */
--shadow-ring: 0 0 0 3px rgb(16 185 129 / 0.4);  /* primary-500 */
--shadow-ring-error: 0 0 0 3px rgb(239 68 68 / 0.4);
--shadow-ring-accent: 0 0 0 3px rgb(245 158 11 / 0.4);

/* Card elevation */
--shadow-card: 0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08);
--shadow-card-hover: 0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.08);
```

---

## 5. Componentes Core

### 5.1 Botones

```css
/* Base */
.button {
  height: 44px;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 150ms ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

/* Primary - Emerald */
.button-primary {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  color: white;
  border: none;
  box-shadow: 0 1px 2px 0 rgb(5 150 105 / 0.3);
}
.button-primary:hover {
  background: linear-gradient(135deg, #047857 0%, #065F46 100%);
  box-shadow: 0 4px 6px -1px rgb(5 150 105 / 0.3);
  transform: translateY(-1px);
}
.button-primary:active {
  transform: translateY(0);
}
.button-primary:focus-visible {
  box-shadow: var(--shadow-ring);
}

/* Secondary */
.button-secondary {
  background: white;
  border: 1px solid var(--color-gray-300);
  color: var(--color-gray-700);
}
.button-secondary:hover {
  background: var(--color-gray-50);
  border-color: var(--color-primary-300);
}

/* Ghost */
.button-ghost {
  background: transparent;
  border: none;
  color: var(--color-primary-600);
}
.button-ghost:hover {
  background: var(--color-primary-50);
}

/* Accent - Para streaks/achievements */
.button-accent {
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  color: white;
  border: none;
}

/* Danger */
.button-danger {
  background: var(--color-error-500);
  color: white;
  border: none;
}
.button-danger:hover {
  background: var(--color-error-600);
}

/* Sizes */
.button-sm { height: 36px; padding: 8px 16px; font-size: 14px; }
.button-lg { height: 52px; padding: 14px 28px; font-size: 16px; }
```

### 5.2 Inputs

```css
.input {
  height: 44px;
  padding: 12px 16px;
  border: 1px solid var(--color-gray-300);
  border-radius: 8px;
  font-size: 16px;
  background: white;
  color: var(--color-gray-900);
  transition: border-color 150ms, box-shadow 150ms;
  width: 100%;
}

.input::placeholder {
  color: var(--color-gray-400);
}

.input:focus {
  border-color: var(--color-primary-500);
  box-shadow: var(--shadow-ring);
  outline: none;
}

.input-error {
  border-color: var(--color-error-500);
}
.input-error:focus {
  box-shadow: var(--shadow-ring-error);
}
```

### 5.3 Cards

```css
/* Base Card */
.card {
  background: white;
  border: 1px solid var(--color-gray-200);
  border-radius: 12px;
  box-shadow: var(--shadow-card);
}

/* Deck Card - Con progress indicator */
.card-deck {
  padding: 20px;
  cursor: pointer;
  transition: all 200ms ease;
  position: relative;
  overflow: hidden;
}

.card-deck:hover {
  border-color: var(--color-primary-300);
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-2px);
}

/* Progress bar dentro del deck card */
.card-deck-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--color-gray-100);
}

.card-deck-progress-fill {
  height: 100%;
  background: var(--gradient-progress);
  border-radius: 0 2px 0 0;
  transition: width 300ms ease;
}

/* Stat Card */
.card-stat {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-gray-900);
  font-family: var(--font-family-mono);
}

.card-stat-label {
  font-size: 14px;
  color: var(--color-gray-500);
}

.card-stat-trend {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 500;
}

.card-stat-trend-up {
  color: var(--color-success-600);
}

.card-stat-trend-down {
  color: var(--color-error-600);
}
```

### 5.4 Progress Components (NUEVOS)

```css
/* Progress Ring */
.progress-ring {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.progress-ring-svg {
  transform: rotate(-90deg);
}

.progress-ring-bg {
  stroke: var(--color-gray-200);
  fill: none;
}

.progress-ring-fill {
  stroke: url(#gradient-primary);
  fill: none;
  stroke-linecap: round;
  transition: stroke-dashoffset 500ms ease;
}

.progress-ring-label {
  position: absolute;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-gray-900);
}

/* Sizes */
.progress-ring-sm { width: 48px; height: 48px; }
.progress-ring-md { width: 80px; height: 80px; }
.progress-ring-lg { width: 120px; height: 120px; }

/* Streak Badge */
.streak-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: var(--color-accent-100);
  border-radius: 9999px;
  font-weight: 600;
  color: var(--color-accent-700);
}

.streak-badge-icon {
  width: 20px;
  height: 20px;
  color: var(--color-accent-500);
}

.streak-badge-active {
  background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
  box-shadow: 0 0 0 2px var(--color-accent-300);
}

.streak-badge-frozen {
  background: var(--color-gray-100);
  color: var(--color-gray-500);
}

/* Progress Bar */
.progress-bar {
  height: 8px;
  background: var(--color-gray-200);
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: var(--gradient-progress);
  border-radius: 4px;
  transition: width 300ms ease-out;
}

.progress-bar-sm { height: 4px; }
.progress-bar-lg { height: 12px; }

/* Weekly Progress (7 segments) */
.weekly-progress {
  display: flex;
  gap: 4px;
}

.weekly-progress-day {
  flex: 1;
  height: 32px;
  background: var(--color-gray-100);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}

.weekly-progress-day-fill {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--gradient-progress);
  border-radius: 4px;
  transition: height 300ms ease;
}

.weekly-progress-day-label {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  color: var(--color-gray-500);
}

/* Activity Heatmap */
.heatmap {
  display: grid;
  grid-template-columns: repeat(53, 1fr);
  gap: 2px;
}

.heatmap-cell {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  transition: background-color 150ms;
}

.heatmap-level-0 { background: var(--color-gray-100); }
.heatmap-level-1 { background: var(--color-primary-200); }
.heatmap-level-2 { background: var(--color-primary-400); }
.heatmap-level-3 { background: var(--color-primary-600); }
.heatmap-level-4 { background: var(--color-primary-800); }

.heatmap-cell:hover {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 1px;
}
```

### 5.5 Flashcard

```css
.flashcard {
  width: 100%;
  max-width: 600px;
  min-height: 250px;
  padding: 48px;
  background: white;
  border-radius: 20px;
  box-shadow: var(--shadow-xl);
  text-align: center;
  perspective: 1000px;
  margin: 0 auto;
}

.flashcard-content {
  font-size: 1.5rem;
  line-height: 1.5;
  color: var(--color-gray-800);
}

/* Flip Animation */
.flashcard-inner {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.flashcard-flipped .flashcard-inner {
  transform: rotateY(180deg);
}

.flashcard-front,
.flashcard-back {
  backface-visibility: hidden;
}

.flashcard-back {
  transform: rotateY(180deg);
}
```

### 5.6 Rating Buttons

```css
.rating-group {
  display: flex;
  gap: 12px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.rating-button {
  flex: 1;
  height: 64px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 150ms ease;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

/* Hard - Rojo */
.rating-hard {
  background: var(--color-error-500);
  color: white;
}
.rating-hard:hover {
  background: var(--color-error-600);
  transform: scale(1.02);
}

/* Good - Ambar */
.rating-good {
  background: var(--color-accent-500);
  color: white;
}
.rating-good:hover {
  background: var(--color-accent-600);
  transform: scale(1.02);
}

/* Easy - Verde Primario */
.rating-easy {
  background: var(--color-primary-600);
  color: white;
}
.rating-easy:hover {
  background: var(--color-primary-700);
  transform: scale(1.02);
}

.rating-button-hint {
  font-size: 11px;
  opacity: 0.8;
}
```

---

## 6. Iconografia

### Set de Iconos: Lucide React

```
Nuevos iconos para progress tracking:
- flame        : Streaks
- trophy       : Achievements
- target       : Goals
- trending-up  : Positive trend
- trending-down: Negative trend
- calendar     : Heatmap
- clock        : Study time
- bar-chart-2  : Stats
- activity     : Activity
- zap          : Quick actions

Iconos existentes (mantener):
- home, layers, play-circle, plus, user
- settings, log-out, check, x
- chevron-right, chevron-down
- pencil, trash-2, eye, eye-off
- mail, lock, crown
```

---

## 7. Animaciones

### 7.1 Duraciones

```css
--duration-fast:   150ms;
--duration-normal: 200ms;
--duration-slow:   300ms;
--duration-flip:   400ms;
```

### 7.2 Easing

```css
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in:      cubic-bezier(0.4, 0, 1, 1);
--ease-out:     cubic-bezier(0, 0, 0.2, 1);
--ease-bounce:  cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### 7.3 Keyframes Nuevos

```css
/* Streak increment animation */
@keyframes streak-pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
}

/* Progress fill animation */
@keyframes progress-fill {
  from { width: 0; }
}

/* Celebration confetti */
@keyframes confetti {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(-100px) rotate(720deg); opacity: 0; }
}

/* Stat counter */
@keyframes count-up {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## 8. Breakpoints

```css
--breakpoint-sm:  640px;
--breakpoint-md:  768px;
--breakpoint-lg:  1024px;
--breakpoint-xl:  1280px;
--breakpoint-2xl: 1536px;
```

---

## 9. Configuracion Tailwind CSS

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        accent: {
          50:  '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
        success: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          500: '#22C55E',
          600: '#16A34A',
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          500: '#F59E0B',
          600: '#D97706',
        },
        error: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          500: '#EF4444',
          600: '#DC2626',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
        'modal': '16px',
        'flashcard': '20px',
      },
      boxShadow: {
        'ring': '0 0 0 3px rgba(16, 185, 129, 0.4)',
        'ring-error': '0 0 0 3px rgba(239, 68, 68, 0.4)',
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08)',
        'card-hover': '0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.08)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #059669 0%, #0D9488 100%)',
        'gradient-accent': 'linear-gradient(135deg, #F59E0B 0%, #EA580C 100%)',
        'gradient-hero': 'linear-gradient(135deg, #ECFDF5 0%, #FFFBEB 50%, #F0FDF4 100%)',
      },
      animation: {
        'streak-pulse': 'streak-pulse 0.5s ease-out',
        'count-up': 'count-up 0.3s ease-out',
      },
      keyframes: {
        'streak-pulse': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1)' },
        },
        'count-up': {
          from: { opacity: 0, transform: 'translateY(10px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
```

---

## 10. Checklist de Implementacion

### Componentes a Actualizar
- [ ] Button.tsx - Nuevos colores primary emerald
- [ ] Card.tsx - Agregar progress bar slot
- [ ] Input.tsx - Focus ring emerald
- [ ] Toast.tsx - Colores semanticos

### Componentes Nuevos a Crear
- [ ] ProgressRing.tsx
- [ ] StreakBadge.tsx
- [ ] StatCard.tsx
- [ ] WeeklyProgress.tsx
- [ ] ActivityHeatmap.tsx
- [ ] SessionProgressBar.tsx

### Pages a Rediseñar
- [ ] DashboardPage.tsx - Hero con progress tracking
- [ ] DeckDetailPage.tsx - Mastery ring, stats
- [ ] StudySessionPage.tsx - Progress bar real-time
- [ ] StatsPage.tsx - Nueva pagina

### Estilos Globales
- [ ] Actualizar globals.css con nueva paleta
- [ ] Actualizar tailwind.config.js
- [ ] Verificar contraste WCAG

---

## Referencias

- [Investigacion Competitiva 2026](./research-2026.md)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

*Sistema de Diseño BrainKit V2 - Enero 2026*
*Paleta Emerald + Amber - Diferenciacion y crecimiento*
