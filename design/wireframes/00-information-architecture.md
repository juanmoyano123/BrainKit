# Arquitectura de Informacion - BrainKit

**Fecha:** 2025-12-27
**Version:** 1.0

---

## 1. Mapa del Sitio (Sitemap)

```
BrainKit
|
+-- Landing Page (/)
|   +-- Hero Section
|   +-- How It Works
|   +-- Pricing
|   +-- Footer
|
+-- Auth
|   +-- Login (/login)
|   +-- Register (/register)
|   +-- Forgot Password (/forgot-password)
|   +-- Reset Password (/reset-password)
|
+-- Dashboard (/dashboard) [Protected]
|   +-- Summary Bar
|   +-- Deck Grid
|   +-- Quick Stats
|   +-- Empty State (si no hay decks)
|
+-- Deck Detail (/deck/:id) [Protected]
|   +-- Deck Header
|   +-- Mnemonic Section
|   +-- Flashcard List
|   +-- Study Button
|   |
|   +-- States:
|       +-- Empty (no content) -> List Input
|       +-- Generating -> Loading
|       +-- Mnemonic Selection -> 3 Cards
|       +-- With Flashcards -> Card Grid
|
+-- Study Session (/study/:deckId) [Protected]
|   +-- Fullscreen Mode
|   +-- Card Display
|   +-- Rating Buttons
|   +-- Progress Bar
|   +-- Completion Screen
|
+-- Settings (/settings) [Protected]
|   +-- Profile Section
|   +-- Subscription Section
|   +-- Usage/Limits Section
|   +-- Account Actions
|
+-- Upgrade (/upgrade) [Protected]
    +-- Plan Comparison
    +-- Checkout (Stripe)
```

---

## 2. Jerarquia de Navegacion

### Navegacion Global (Header)

```
+------------------------------------------------------------------+
| [Logo]                                    [User Avatar] [Create] |
+------------------------------------------------------------------+
```

### Navegacion Mobile (Bottom Tabs)

```
+------------------------------------------------------------------+
|  [Home]      [Study]      [Create]      [Profile]                |
|   icon        icon         icon          icon                    |
|   Home       Study        Create        Profile                  |
+------------------------------------------------------------------+
```

### Navegacion Desktop (Sidebar)

```
+-------------------+
| [Logo] BrainKit   |
+-------------------+
| > Dashboard       |
|   My Decks        |
|   Statistics      |
+-------------------+
| ACCOUNT           |
|   Settings        |
|   Upgrade         |
+-------------------+
| [User Info]       |
| [Logout]          |
+-------------------+
```

---

## 3. Flujos de Usuario Principales

### Flujo 1: Primer Uso (Onboarding -> First Deck)

```
Landing Page
    |
    v
[Start Free Button]
    |
    v
Register (Google OAuth / Email)
    |
    v
Dashboard (Empty State)
    |
    v
[Create Your First Deck]
    |
    v
New Deck Page
    |
    v
Paste List
    |
    v
[Generate Mnemonics]
    |
    v
Loading (3-8 seconds)
    |
    v
Mnemonic Selection (3 options)
    |
    v
[Select One]
    |
    v
[Generate Flashcards]
    |
    v
Deck with Cards
    |
    v
[Start Studying]
    |
    v
Study Session
    |
    v
Completion Screen
    |
    v
Dashboard (with deck)
```

### Flujo 2: Estudio Diario (Return User)

```
Notification / Natural Return
    |
    v
Login (si necesario)
    |
    v
Dashboard
    |
    v
[X cards due today - Study Now]
    |
    v
Study Session (only due cards)
    |
    v
Rate each card (Hard/Good/Easy)
    |
    v
Completion Screen
    - Cards reviewed: X
    - Time: Y minutes
    - Streak: Z days
    |
    v
Dashboard (updated)
```

### Flujo 3: Upgrade a Premium

```
Dashboard (or Hit Limit)
    |
    v
Limit Reached Modal
    OR
Settings > Subscription
    |
    v
[Upgrade to Premium]
    |
    v
Upgrade Page (comparison)
    |
    v
[Subscribe - $9.99/month]
    |
    v
Stripe Checkout
    |
    v
Success
    |
    v
Dashboard (Premium badge)
```

---

## 4. Estados de Pantalla

### Dashboard States

| Estado | Condicion | Elementos Visibles |
|--------|-----------|-------------------|
| Empty | 0 decks | Empty illustration, "Create First Deck" CTA |
| Loading | Fetching data | Skeleton cards |
| With Decks | 1+ decks | Deck grid, summary bar, stats |
| With Due Cards | Cards due today | "Study Now" prominent CTA |
| All Caught Up | 0 cards due | Success indicator |

### Deck Detail States

| Estado | Condicion | Elementos Visibles |
|--------|-----------|-------------------|
| Empty | New deck, no list | Large text area, "Generate" button |
| Generating | API call in progress | Loading skeleton, progress indicator |
| Mnemonic Selection | 3 mnemonics ready | 3 mnemonic cards, select buttons |
| With Cards | Flashcards generated | Card grid, mnemonic preview, study button |
| Studying | Active session | Fullscreen study mode |

### Study Session States

| Estado | Condicion | Elementos Visibles |
|--------|-----------|-------------------|
| Question | Card front | Question text, "Show Answer" button |
| Answer | Card flipped | Answer text, rating buttons |
| Complete | All cards done | Stats summary, "Study More" / "Done" |
| Paused | User exited | Save prompt, resume option |

---

## 5. Componentes Reutilizables

### Componentes Globales

```
Header
  - Logo
  - Navigation Links (desktop)
  - User Menu
  - Create Button

Sidebar (desktop)
  - Navigation Items
  - User Section
  - Collapse Toggle

Bottom Tabs (mobile)
  - Tab Items (4 max)
  - Active Indicator

Footer
  - Links
  - Copyright
```

### Componentes de Contenido

```
DeckCard
  - Deck Name
  - Card Count Badge
  - Due Count Badge
  - Last Studied
  - Progress Indicator

FlashcardPreview
  - Front Text
  - Back Text (on hover/tap)
  - Edit Button
  - Delete Button

MnemonicCard
  - Type Badge (Acrostic/Story/Visual)
  - Title
  - Content Preview
  - Expand Button
  - Select Button

StatsCard
  - Metric Label
  - Value (large)
  - Trend Indicator (optional)
```

### Componentes de Interaccion

```
Button
  - Variants: Primary, Secondary, Ghost, Danger
  - Sizes: sm, md, lg
  - States: Default, Hover, Active, Disabled, Loading

Input
  - Types: Text, Email, Password, Textarea
  - States: Default, Focus, Error, Disabled
  - Addons: Icon prefix, Character counter

Modal
  - Header with title and close
  - Body content
  - Footer with actions

Toast/Notification
  - Types: Success, Error, Warning, Info
  - Auto-dismiss (5s)
  - Manual dismiss

Rating Buttons
  - 3 options: Hard, Good, Easy
  - Colors: Red, Yellow, Green
  - Keyboard shortcuts visible
```

---

## 6. Responsive Breakpoints

```
Mobile:     0 - 639px      (1 column, bottom tabs)
Tablet:     640 - 1023px   (2 columns, sidebar optional)
Desktop:    1024 - 1279px  (3 columns, sidebar)
Large:      1280px+        (4 columns, expanded sidebar)
```

### Layout por Breakpoint

| Pantalla | Mobile | Tablet | Desktop |
|----------|--------|--------|---------|
| Landing | Stack | Stack | 2 cols hero |
| Dashboard | 1 col | 2 cols | 3-4 cols |
| Deck Detail | Stack | 2 cols | Sidebar + content |
| Study | Fullscreen | Fullscreen | Fullscreen |
| Settings | Stack | Stack | Sidebar + content |

---

## 7. Accesibilidad (A11y)

### Navegacion por Teclado

| Elemento | Tecla | Accion |
|----------|-------|--------|
| Links/Buttons | Tab | Focus siguiente |
| Links/Buttons | Enter/Space | Activar |
| Modals | Escape | Cerrar |
| Study Cards | Space | Flip card |
| Rating | 1/3/5 | Seleccionar rating |
| Dropdowns | Arrow keys | Navegar opciones |

### ARIA Labels Requeridos

```
- Navigation landmarks
- Button purposes
- Form field labels
- Error messages (aria-describedby)
- Loading states (aria-live)
- Progress (aria-valuenow)
```

### Contraste Minimo

```
- Text on background: 4.5:1 (AA)
- Large text: 3:1
- UI components: 3:1
- Focus indicators: 3:1
```

---

## 8. Prioridad de Pantallas (Tier 1 MVP)

### Tier 1 - Core (MVP Must Have)

1. **Landing Page** - Conversion
2. **Register/Login** - Authentication
3. **Dashboard** - Home base
4. **Deck Detail (empty)** - List input
5. **Mnemonic Selection** - Core value
6. **Deck Detail (with cards)** - Card management
7. **Study Session** - Core experience
8. **Settings** - Account management

### Tier 2 - Important (Post-MVP)

9. Upgrade Page
10. Advanced Statistics
11. Forgot Password flow
12. Mobile-optimized views

### Tier 3 - Nice to Have

13. Export functionality
14. Public sharing
15. Collaborative features

---

*Este documento sirve como base para los wireframes y mockups detallados*
