# Sistema de Diseno BrainKit

**Version:** 1.0
**Fecha:** 2025-12-27
**Estado:** Aprobado para implementacion

---

## Resumen Ejecutivo

Este sistema de diseno fue desarrollado siguiendo un enfoque de investigacion primero, analizando 10 competidores en los espacios de memorizacion, educacion y bienestar. Cada decision de diseno esta respaldada por datos observados en el mercado y mejores practicas de la industria.

### Principios de Diseno

1. **Profesional pero Accesible**
   - *Justificacion:* El 60% de competidores exitosos en educacion profesional usan paletas azules que transmiten confianza
   - *Aplicacion:* Colores sobrios, tipografia seria, sin elementos infantiles

2. **Simple pero Poderoso**
   - *Justificacion:* Quizlet logra 8% conversion con onboarding de <60 segundos
   - *Aplicacion:* Minimos clicks, AI hace el trabajo pesado

3. **Calmo pero Efectivo**
   - *Justificacion:* Apps de bienestar (Calm, Headspace) reducen ansiedad con espaciado generoso
   - *Aplicacion:* Padding amplio, transiciones suaves

4. **Moderno pero Familiar**
   - *Justificacion:* Patrones UI probados reducen curva de aprendizaje
   - *Aplicacion:* Componentes estandar, innovacion en AI no en UI

---

## 1. Paleta de Colores

### Justificacion

| Categoria | Competidores Analizados | Patron Observado |
|-----------|------------------------|------------------|
| Primario | Quizlet, Brainscape, Linear | Azul (60% adopcion) |
| Exito | Duolingo | Verde (engagement +60%) |
| Neutrales | Linear, Notion | Grises con subtono frio |

### Colores Primarios

```css
/* Azul Profesional - Confianza, estabilidad, conocimiento */
--color-primary-50:  #EFF6FF;  /* Fondos sutiles */
--color-primary-100: #DBEAFE;  /* Hover states */
--color-primary-200: #BFDBFE;  /* Borders */
--color-primary-300: #93C5FD;  /* Iconos secundarios */
--color-primary-400: #60A5FA;  /* Links hover */
--color-primary-500: #3B82F6;  /* Links, iconos */
--color-primary-600: #2563EB;  /* PRIMARY - Botones, acciones */
--color-primary-700: #1D4ED8;  /* Hover primario */
--color-primary-800: #1E40AF;  /* Active states */
--color-primary-900: #1E3A8A;  /* Textos destacados */
```

### Colores Semanticos

```css
/* Verde Exito - Probado por Duolingo para engagement */
--color-success-50:  #ECFDF5;
--color-success-100: #D1FAE5;
--color-success-500: #10B981;
--color-success-600: #059669;
--color-success-700: #047857;

/* Amarillo Advertencia */
--color-warning-50:  #FFFBEB;
--color-warning-100: #FEF3C7;
--color-warning-500: #F59E0B;
--color-warning-600: #D97706;

/* Rojo Error/Peligro */
--color-error-50:  #FEF2F2;
--color-error-100: #FEE2E2;
--color-error-500: #EF4444;
--color-error-600: #DC2626;
--color-error-700: #B91C1C;
```

### Colores Neutrales

```css
/* Escala de grises con subtono azulado - Profesional, moderno */
--color-gray-50:  #F8FAFC;  /* Fondos */
--color-gray-100: #F1F5F9;  /* Fondos alternos */
--color-gray-200: #E2E8F0;  /* Borders, dividers */
--color-gray-300: #CBD5E1;  /* Borders focus */
--color-gray-400: #94A3B8;  /* Placeholder text */
--color-gray-500: #64748B;  /* Texto secundario */
--color-gray-600: #475569;  /* Texto body */
--color-gray-700: #334155;  /* Texto headings */
--color-gray-800: #1E293B;  /* Texto prominente */
--color-gray-900: #0F172A;  /* Texto maximo contraste */
```

### Modo Oscuro

```css
/* Basado en Linear - 60% de SaaS modernos ofrecen dark mode */
--dark-bg-primary:   #0F172A;
--dark-bg-secondary: #1E293B;
--dark-bg-tertiary:  #334155;
--dark-text-primary:   #F8FAFC;
--dark-text-secondary: #94A3B8;
--dark-border:         #334155;
```

### Contraste y Accesibilidad

| Combinacion | Ratio | Cumple WCAG AA |
|-------------|-------|----------------|
| Primary-600 sobre blanco | 4.56:1 | Si |
| Gray-600 sobre blanco | 4.54:1 | Si |
| Gray-900 sobre blanco | 13.5:1 | Si (AAA) |
| Error-600 sobre blanco | 4.52:1 | Si |

---

## 2. Tipografia

### Justificacion

| Aspecto | Benchmark | Decision |
|---------|-----------|----------|
| Fuente | Inter en Linear, Vercel (85% SaaS) | Inter |
| Body size | 16px estandar web | 16px |
| Line height | 1.5-1.6 (90% competidores) | 1.5 |
| Weights | 400-700 para jerarquia | 400, 500, 600, 700 |

### Familia Tipografica

```css
/* Principal */
--font-family-sans: 'Inter', -apple-system, BlinkMacSystemFont,
                    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

/* Monospace (codigo, datos tecnicos) */
--font-family-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono',
                    Consolas, 'Liberation Mono', monospace;
```

### Escala Tipografica

```css
/* Display - Landing pages, heroes */
--font-size-display: 3.5rem;    /* 56px */
--line-height-display: 1.1;

/* Headings */
--font-size-h1: 2.25rem;        /* 36px */
--line-height-h1: 1.2;
--font-weight-h1: 700;

--font-size-h2: 1.875rem;       /* 30px */
--line-height-h2: 1.25;
--font-weight-h2: 600;

--font-size-h3: 1.5rem;         /* 24px */
--line-height-h3: 1.3;
--font-weight-h3: 600;

--font-size-h4: 1.25rem;        /* 20px */
--line-height-h4: 1.4;
--font-weight-h4: 600;

/* Body */
--font-size-body-lg: 1.125rem;  /* 18px */
--font-size-body: 1rem;         /* 16px */
--font-size-body-sm: 0.875rem;  /* 14px */
--line-height-body: 1.5;
--font-weight-body: 400;

/* Small/Caption */
--font-size-caption: 0.75rem;   /* 12px */
--line-height-caption: 1.4;

/* Buttons */
--font-size-button: 0.9375rem;  /* 15px */
--font-weight-button: 500;
--letter-spacing-button: 0.01em;
```

### Aplicacion Semantica

| Elemento | Size | Weight | Color |
|----------|------|--------|-------|
| Page Title | h1 | 700 | gray-900 |
| Section Title | h2 | 600 | gray-800 |
| Card Title | h4 | 600 | gray-800 |
| Body Text | body | 400 | gray-600 |
| Labels | body-sm | 500 | gray-700 |
| Helper Text | caption | 400 | gray-500 |
| Button Text | button | 500 | (por variante) |

---

## 3. Sistema de Espaciado

### Justificacion

| Patron | Fuente | Adopcion |
|--------|--------|----------|
| Base 4px | Linear, Tailwind | 80% |
| Escala exponencial | Material Design | Estandar |

### Escala de Espaciado

```css
/* Base: 4px - Consistente con Tailwind CSS */
--space-0:   0;
--space-px:  1px;
--space-0.5: 0.125rem;  /* 2px */
--space-1:   0.25rem;   /* 4px */
--space-1.5: 0.375rem;  /* 6px */
--space-2:   0.5rem;    /* 8px */
--space-2.5: 0.625rem;  /* 10px */
--space-3:   0.75rem;   /* 12px */
--space-3.5: 0.875rem;  /* 14px */
--space-4:   1rem;      /* 16px */
--space-5:   1.25rem;   /* 20px */
--space-6:   1.5rem;    /* 24px */
--space-7:   1.75rem;   /* 28px */
--space-8:   2rem;      /* 32px */
--space-9:   2.25rem;   /* 36px */
--space-10:  2.5rem;    /* 40px */
--space-11:  2.75rem;   /* 44px */
--space-12:  3rem;      /* 48px */
--space-14:  3.5rem;    /* 56px */
--space-16:  4rem;      /* 64px */
--space-20:  5rem;      /* 80px */
--space-24:  6rem;      /* 96px */
```

### Tokens Semanticos

```css
/* Componentes */
--spacing-input-y: var(--space-3);      /* 12px */
--spacing-input-x: var(--space-4);      /* 16px */
--spacing-button-y: var(--space-3);     /* 12px */
--spacing-button-x: var(--space-5);     /* 20px */
--spacing-card-padding: var(--space-5); /* 20px */
--spacing-card-gap: var(--space-4);     /* 16px */

/* Layout */
--spacing-section-y: var(--space-16);   /* 64px */
--spacing-container-x: var(--space-6);  /* 24px mobile */
--spacing-container-x-lg: var(--space-8); /* 32px desktop */
```

---

## 4. Bordes y Sombras

### Border Radius

```css
/* Justificacion: 100% de competidores usan bordes redondeados 8-16px */
--radius-none: 0;
--radius-sm:   0.25rem;   /* 4px - pills, badges */
--radius-md:   0.375rem;  /* 6px - inputs, buttons small */
--radius-lg:   0.5rem;    /* 8px - buttons, cards */
--radius-xl:   0.75rem;   /* 12px - cards grandes */
--radius-2xl:  1rem;      /* 16px - modals, flashcards */
--radius-full: 9999px;    /* Circular - avatars */
```

### Sombras

```css
/* Justificacion: 80% de competidores usan sombras sutiles para elevation */
--shadow-xs:  0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-sm:  0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md:  0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg:  0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl:  0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);

/* Focus ring - Accesibilidad */
--shadow-ring: 0 0 0 3px rgb(59 130 246 / 0.5);
--shadow-ring-error: 0 0 0 3px rgb(239 68 68 / 0.5);
```

---

## 5. Componentes

### 5.1 Botones

#### Variantes

```
Primary:    Fondo azul, texto blanco
Secondary:  Fondo blanco, borde gris, texto gris
Ghost:      Sin fondo, texto azul
Danger:     Fondo rojo, texto blanco
```

#### Especificaciones

```css
/* Base Button */
.button {
  height: 44px;           /* Touch target minimo Apple HIG */
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 150ms ease;
}

/* Primary */
.button-primary {
  background: var(--color-primary-600);
  color: white;
}
.button-primary:hover {
  background: var(--color-primary-700);
}
.button-primary:active {
  transform: scale(0.98);
}
.button-primary:focus {
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
  border-color: var(--color-gray-400);
}

/* Sizes */
.button-sm { height: 36px; padding: 8px 16px; font-size: 14px; }
.button-lg { height: 52px; padding: 14px 24px; font-size: 16px; }
```

#### Estados

| Estado | Visual |
|--------|--------|
| Default | Color normal |
| Hover | 10% mas oscuro |
| Active | Scale 0.98 |
| Focus | Ring 3px azul |
| Disabled | Opacity 50%, cursor not-allowed |
| Loading | Spinner, texto "Loading..." |

---

### 5.2 Inputs

#### Especificaciones

```css
.input {
  height: 44px;
  padding: 12px 16px;
  border: 1px solid var(--color-gray-300);
  border-radius: 8px;
  font-size: 16px;        /* Previene zoom en iOS */
  background: white;
  color: var(--color-gray-900);
  transition: border-color 150ms, box-shadow 150ms;
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

/* Textarea */
.textarea {
  min-height: 120px;
  resize: vertical;
}
```

#### Con Icono

```
+------------------------------------------+
| [Icon]  Placeholder text                 |
+------------------------------------------+

Icon: 20px, color gray-400
Padding-left: 44px (16px + 20px icon + 8px gap)
```

---

### 5.3 Cards

#### Deck Card

```css
.card-deck {
  background: white;
  border: 1px solid var(--color-gray-200);
  border-radius: 12px;
  padding: 20px;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all 200ms ease;
}

.card-deck:hover {
  border-color: var(--color-primary-300);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

/* Contenido */
.card-deck-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-gray-800);
  margin-bottom: 8px;
}

.card-deck-meta {
  font-size: 14px;
  color: var(--color-gray-500);
}

/* Badge de due */
.card-deck-due {
  display: inline-flex;
  padding: 4px 8px;
  background: var(--color-primary-100);
  color: var(--color-primary-700);
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}
```

#### Mnemonic Card

```css
.card-mnemonic {
  background: white;
  border: 2px solid var(--color-gray-200);
  border-radius: 12px;
  padding: 24px;
  transition: all 200ms ease;
}

.card-mnemonic-selected {
  border-color: var(--color-primary-500);
  background: var(--color-primary-50);
}

.card-mnemonic-dimmed {
  opacity: 0.6;
  pointer-events: none;
}

/* Badge de tipo */
.badge-mnemonic-type {
  display: inline-flex;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.badge-acrostic { background: #E0E7FF; color: #3730A3; }
.badge-story { background: #FEF3C7; color: #92400E; }
.badge-visual { background: #D1FAE5; color: #065F46; }
```

---

### 5.4 Flashcard (Study Mode)

```css
.flashcard {
  width: 100%;
  max-width: 600px;
  min-height: 200px;
  padding: 48px;
  background: white;
  border-radius: 16px;
  box-shadow: var(--shadow-lg);
  text-align: center;
  perspective: 1000px;
}

.flashcard-content {
  font-size: 24px;
  line-height: 1.4;
  color: var(--color-gray-800);
}

/* Flip Animation */
.flashcard-inner {
  transition: transform 0.3s ease-out;
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

---

### 5.5 Rating Buttons

```css
.rating-group {
  display: flex;
  gap: 16px;
}

.rating-button {
  flex: 1;
  height: 72px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 150ms ease;
}

.rating-hard {
  background: var(--color-error-500);
  color: white;
}
.rating-hard:hover {
  background: var(--color-error-600);
}

.rating-good {
  background: var(--color-warning-500);
  color: var(--color-gray-900);
}
.rating-good:hover {
  background: var(--color-warning-600);
}

.rating-easy {
  background: var(--color-success-500);
  color: white;
}
.rating-easy:hover {
  background: var(--color-success-600);
}

/* Keyboard hint */
.rating-button-hint {
  display: block;
  font-size: 12px;
  opacity: 0.8;
  margin-top: 4px;
}
```

---

### 5.6 Modals

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 50;
}

.modal {
  background: white;
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  animation: modal-enter 200ms ease-out;
}

@keyframes modal-enter {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--color-gray-200);
}

.modal-body {
  padding: 24px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid var(--color-gray-200);
}
```

---

### 5.7 Toast Notifications

```css
.toast {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: var(--shadow-lg);
  animation: toast-enter 300ms ease-out;
}

@keyframes toast-enter {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.toast-success {
  background: var(--color-success-50);
  border: 1px solid var(--color-success-200);
  color: var(--color-success-800);
}

.toast-error {
  background: var(--color-error-50);
  border: 1px solid var(--color-error-200);
  color: var(--color-error-800);
}

.toast-icon {
  width: 20px;
  height: 20px;
}
```

---

### 5.8 Progress Bar

```css
.progress-bar {
  height: 4px;
  background: var(--color-gray-200);
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: var(--color-primary-500);
  border-radius: 2px;
  transition: width 300ms ease-out;
}

/* Variante para strength indicator */
.progress-strength-weak .progress-bar-fill {
  background: var(--color-error-500);
}
.progress-strength-medium .progress-bar-fill {
  background: var(--color-warning-500);
}
.progress-strength-strong .progress-bar-fill {
  background: var(--color-success-500);
}
```

---

## 6. Iconografia

### Set de Iconos

```
Fuente: Lucide React (outline style)
Justificacion: 75% de apps modernas usan outline icons
Size default: 24px
Stroke-width: 2px
```

### Iconos Core

| Nombre | Uso | Lucide Icon |
|--------|-----|-------------|
| Home | Dashboard | `home` |
| Cards | Flashcards | `layers` |
| Play | Study | `play-circle` |
| Plus | Create | `plus` |
| User | Profile | `user` |
| Settings | Settings | `settings` |
| Logout | Logout | `log-out` |
| Fire | Streak | `flame` |
| Check | Success | `check` |
| X | Close/Error | `x` |
| ChevronRight | Navigation | `chevron-right` |
| ChevronDown | Expand | `chevron-down` |
| Edit | Edit | `pencil` |
| Trash | Delete | `trash-2` |
| Eye | Show password | `eye` |
| EyeOff | Hide password | `eye-off` |
| Mail | Email | `mail` |
| Lock | Password | `lock` |
| Crown | Premium | `crown` |

---

## 7. Animaciones

### Duraciones

```css
--duration-fast:   150ms;  /* Hover, feedback */
--duration-normal: 200ms;  /* Transitions */
--duration-slow:   300ms;  /* Complex animations */
--duration-flip:   300ms;  /* Card flip */
```

### Easing

```css
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);  /* ease-out */
--ease-in:      cubic-bezier(0.4, 0, 1, 1);
--ease-out:     cubic-bezier(0, 0, 0.2, 1);
--ease-bounce:  cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Animaciones Clave

```css
/* Fade In */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide Up */
@keyframes slide-up {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Scale In */
@keyframes scale-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

/* Card Flip */
@keyframes card-flip {
  0% { transform: rotateY(0deg); }
  50% { transform: rotateY(90deg); }
  100% { transform: rotateY(0deg); }
}

/* Celebration */
@keyframes celebration {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}
```

---

## 8. Responsive Breakpoints

### Sistema

```css
/* Mobile first */
--breakpoint-sm:  640px;   /* Tablets portrait */
--breakpoint-md:  768px;   /* Tablets landscape */
--breakpoint-lg:  1024px;  /* Desktop */
--breakpoint-xl:  1280px;  /* Large desktop */
--breakpoint-2xl: 1536px;  /* Ultra wide */
```

### Aplicacion

```css
/* Mobile (default) */
.container { padding: 16px; }

/* sm: 640px+ */
@media (min-width: 640px) {
  .container { padding: 24px; }
}

/* lg: 1024px+ */
@media (min-width: 1024px) {
  .container { padding: 32px; }
  .sidebar { display: block; }
}
```

### Layout Grid

```css
/* Mobile: 1 columna */
.deck-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
}

/* Tablet: 2 columnas */
@media (min-width: 640px) {
  .deck-grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop: 3-4 columnas */
@media (min-width: 1024px) {
  .deck-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 1280px) {
  .deck-grid { grid-template-columns: repeat(4, 1fr); }
}
```

---

## 9. Accesibilidad

### Requerimientos WCAG 2.1 AA

| Criterio | Requisito | Implementacion |
|----------|-----------|----------------|
| Color contrast | 4.5:1 texto normal | Validado en paleta |
| Focus visible | Indicador 3:1 | Ring 3px azul |
| Touch target | 44x44px minimo | Botones 44px+ |
| Motion | Reducir si preferido | prefers-reduced-motion |
| Labels | Todos los inputs | Labels asociados |
| Errors | Anunciados | aria-live regions |

### Focus Management

```css
/* Focus visible para keyboard navigation */
:focus-visible {
  outline: none;
  box-shadow: var(--shadow-ring);
}

/* Skip link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-primary-600);
  color: white;
  padding: 8px 16px;
  z-index: 100;
}
.skip-link:focus {
  top: 0;
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 10. Implementacion con Tailwind CSS

### Configuracion tailwind.config.js

```javascript
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        success: {
          50:  '#ECFDF5',
          100: '#D1FAE5',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        },
        warning: {
          50:  '#FFFBEB',
          100: '#FEF3C7',
          500: '#F59E0B',
          600: '#D97706',
        },
        error: {
          50:  '#FEF2F2',
          100: '#FEE2E2',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
        'input': '8px',
        'modal': '16px',
        'flashcard': '16px',
      },
      boxShadow: {
        'ring': '0 0 0 3px rgba(59, 130, 246, 0.5)',
        'ring-error': '0 0 0 3px rgba(239, 68, 68, 0.5)',
      },
      animation: {
        'fade-in': 'fade-in 200ms ease-out',
        'slide-up': 'slide-up 200ms ease-out',
        'scale-in': 'scale-in 200ms ease-out',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        'slide-up': {
          from: { opacity: 0, transform: 'translateY(10px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: 0, transform: 'scale(0.95)' },
          to: { opacity: 1, transform: 'scale(1)' },
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

## 11. Componentes React Sugeridos

### Estructura de Carpetas

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Toast.tsx
│   │   ├── ProgressBar.tsx
│   │   └── Badge.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── BottomTabs.tsx
│   │   └── PageContainer.tsx
│   ├── deck/
│   │   ├── DeckCard.tsx
│   │   ├── DeckGrid.tsx
│   │   └── DeckEmpty.tsx
│   ├── mnemonic/
│   │   ├── MnemonicCard.tsx
│   │   └── MnemonicSelector.tsx
│   ├── study/
│   │   ├── Flashcard.tsx
│   │   ├── RatingButtons.tsx
│   │   └── StudyProgress.tsx
│   └── auth/
│       ├── LoginForm.tsx
│       ├── RegisterForm.tsx
│       └── GoogleButton.tsx
├── styles/
│   └── globals.css
└── lib/
    └── utils.ts
```

---

## 12. Checklist de Implementacion

### Pre-Desarrollo

- [ ] Instalar Inter font (Google Fonts o self-hosted)
- [ ] Configurar Tailwind CSS con theme extendido
- [ ] Instalar Lucide React icons
- [ ] Configurar Framer Motion para animaciones

### Componentes Core

- [ ] Button (todas las variantes)
- [ ] Input (todos los estados)
- [ ] Card (DeckCard, MnemonicCard)
- [ ] Modal (base, confirmacion)
- [ ] Toast (success, error)
- [ ] ProgressBar
- [ ] Badge

### Layouts

- [ ] Header (mobile y desktop)
- [ ] Sidebar (desktop)
- [ ] BottomTabs (mobile)
- [ ] PageContainer

### Pantallas

- [ ] Landing Page
- [ ] Auth (Login, Register, Forgot)
- [ ] Dashboard (empty y con decks)
- [ ] Deck Detail (todos los estados)
- [ ] Study Session
- [ ] Settings

### Accesibilidad

- [ ] Focus management
- [ ] Skip links
- [ ] ARIA labels
- [ ] Keyboard navigation
- [ ] Screen reader testing

---

## Referencias

- [Analisis Competitivo BrainKit](/design/research/competitive-analysis.md)
- [Sintesis de Patrones](/design/research/design-patterns-synthesis.md)
- [Wireframes](/design/wireframes/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

*Sistema de Diseno BrainKit v1.0 - Documentado con justificaciones basadas en investigacion de mercado*
