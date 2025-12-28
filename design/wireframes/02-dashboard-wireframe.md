# Wireframe: Dashboard

**Pantalla:** Dashboard (/dashboard)
**Prioridad:** Tier 1 - MVP
**Objetivo:** Centro de control, acceso rapido a estudio

---

## Desktop Layout (1440px)

### Estado: Con Decks y Cards Due

```
+------------------------------------------------------------------+
|                           HEADER                                  |
| [Logo] BrainKit                    [Search]  [Avatar] [+ Create] |
+------------------------------------------------------------------+

+------------------------------------------------------------------+
| SIDEBAR      |               MAIN CONTENT                         |
|              |                                                    |
| [Dashboard]  |  +----------------------------------------------+  |
|  > Active    |  |              SUMMARY BAR                      |  |
| [My Decks]   |  |                                               |  |
| [Statistics] |  |  Good morning, Sarah!                         |  |
|              |  |                                               |  |
| ------------ |  |  +------------------+  +-------------------+  |  |
| ACCOUNT      |  |  | [Fire Icon]      |  | [Card Icon]       |  |  |
| [Settings]   |  |  | 12 day streak    |  | 23 cards due      |  |  |
| [Upgrade]    |  |  +------------------+  +-------------------+  |  |
|              |  |                                               |  |
| ------------ |  |  [Study All Due Cards ->]                    |  |
|              |  |                                               |  |
| [S. Chen]    |  +----------------------------------------------+  |
| [Logout]     |                                                    |
|              |  +----------------------------------------------+  |
+--------------|  |              DECK GRID                        |  |
               |  |                                               |  |
               |  |  +----------+  +----------+  +----------+     |  |
               |  |  |  ACLS    |  |  BLS     |  | Pharm    |     |  |
               |  |  |  Meds    |  | Proto-   |  | Basics   |     |  |
               |  |  |          |  | cols     |  |          |     |  |
               |  |  | [18]     |  | [32]     |  | [45]     |     |  |
               |  |  | 5 due    |  | 12 due   |  | 6 due    |     |  |
               |  |  | Today    |  | Today    |  | Today    |     |  |
               |  |  +----------+  +----------+  +----------+     |  |
               |  |                                               |  |
               |  |  +----------+  +----------+  +----------+     |  |
               |  |  | IV Calc  |  | Neuro    |  |          |     |  |
               |  |  | ulations |  | Assess   |  | [+ Add   |     |  |
               |  |  |          |  | ment     |  |  Deck]   |     |  |
               |  |  | [22]     |  | [15]     |  |          |     |  |
               |  |  | All done |  | All done |  |          |     |  |
               |  |  +----------+  +----------+  +----------+     |  |
               |  |                                               |  |
               |  +----------------------------------------------+  |
               |                                                    |
               |  +----------------------------------------------+  |
               |  |              QUICK STATS                      |  |
               |  |                                               |  |
               |  | [5]        [132]       [89]        [12]       |  |
               |  | Total      Total       Cards       Day        |  |
               |  | Decks      Cards       This Week   Streak     |  |
               |  +----------------------------------------------+  |
               |                                                    |
+------------------------------------------------------------------+
```

### Estado: Empty (Nuevo Usuario)

```
+------------------------------------------------------------------+
|                           HEADER                                  |
| [Logo] BrainKit                    [Search]  [Avatar] [+ Create] |
+------------------------------------------------------------------+

+------------------------------------------------------------------+
| SIDEBAR      |               MAIN CONTENT                         |
|              |                                                    |
| [Dashboard]  |  +----------------------------------------------+  |
|  > Active    |  |                                               |  |
| [My Decks]   |  |                                               |  |
| [Statistics] |  |           [Illustration: Empty state]         |  |
|              |  |                                               |  |
| ------------ |  |                                               |  |
| ACCOUNT      |  |        Create your first study deck           |  |
| [Settings]   |  |                                               |  |
| [Upgrade]    |  |    Paste a list of items you need to          |  |
|              |  |    memorize, and AI will generate             |  |
| ------------ |  |    mnemonic techniques and flashcards.        |  |
|              |  |                                               |  |
| [S. Chen]    |  |        [Create Your First Deck ->]            |  |
| [Logout]     |  |                                               |  |
|              |  +----------------------------------------------+  |
+--------------|                                                    |
+------------------------------------------------------------------+
```

---

## Mobile Layout (375px)

### Estado: Con Decks

```
+--------------------------------+
|           HEADER               |
| [Logo]              [Avatar]   |
+--------------------------------+

+--------------------------------+
|         SUMMARY BAR            |
|                                |
| Good morning, Sarah!           |
|                                |
| +------------+ +-------------+ |
| | [Fire]     | | [Card]      | |
| | 12 day     | | 23 cards    | |
| | streak     | | due         | |
| +------------+ +-------------+ |
|                                |
| [Study All Due Cards ->     ]  |
|                                |
+--------------------------------+

+--------------------------------+
|          DECK LIST             |
|                                |
| +----------------------------+ |
| | ACLS Medications           | |
| | [18 cards]    5 due today  | |
| | Last studied: 2 hours ago  | |
| +----------------------------+ |
|                                |
| +----------------------------+ |
| | BLS Protocols              | |
| | [32 cards]   12 due today  | |
| | Last studied: Yesterday    | |
| +----------------------------+ |
|                                |
| +----------------------------+ |
| | Pharmacology Basics        | |
| | [45 cards]    6 due today  | |
| | Last studied: 3 days ago   | |
| +----------------------------+ |
|                                |
| +----------------------------+ |
| | IV Calculations            | |
| | [22 cards]        All done | |
| | Last studied: Today        | |
| +----------------------------+ |
|                                |
+--------------------------------+

+--------------------------------+
|        QUICK STATS             |
| (horizontal scroll)            |
|                                |
| [5 Decks] [132 Cards] [89 Wk] |
|                                |
+--------------------------------+

+--------------------------------+
|         BOTTOM TABS            |
| [Home]  [Study]  [+]  [Profile]|
+--------------------------------+
```

### Estado: Empty (Mobile)

```
+--------------------------------+
|           HEADER               |
| [Logo]              [Avatar]   |
+--------------------------------+

+--------------------------------+
|                                |
|                                |
|   [Illustration: Empty]        |
|                                |
|   Create your first            |
|   study deck                   |
|                                |
|   Paste a list of items        |
|   you need to memorize,        |
|   and AI will generate         |
|   mnemonic techniques          |
|   and flashcards.              |
|                                |
|   [Create Your First Deck ->]  |
|                                |
|                                |
+--------------------------------+

+--------------------------------+
|         BOTTOM TABS            |
| [Home]  [Study]  [+]  [Profile]|
+--------------------------------+
```

---

## Especificaciones de Componentes

### Header
- **Logo:** 32px height, izquierda
- **Search:** Input con icono, 240px width desktop
- **Avatar:** 36px circular, dropdown on click
- **Create Button:** Primary, icono + texto

### Sidebar (Desktop)
- **Width:** 240px (expandido), 64px (colapsado)
- **Items:** Icon + label, hover highlight
- **Active:** Background highlight, left border
- **Sections:** Separados por divider

### Summary Bar
- **Background:** Subtle gradient o solid light
- **Greeting:** H2, personalizado con nombre
- **Streak:** Icon + numero prominente
- **Due Cards:** Icon + numero + badge

### Deck Cards
- **Size:** Min 200px, responsive grid
- **Content:**
  - Nombre del deck (truncate 25 chars)
  - Card count badge
  - Due count (si > 0) o "All done"
  - Last studied timestamp
- **Hover:** Elevation increase, subtle

### Empty State
- **Illustration:** Centered, ~200px
- **Title:** H2, centered
- **Description:** 2-3 lineas, muted color
- **CTA:** Primary button, prominent

### Quick Stats
- **Layout:** 4 columnas desktop, scroll mobile
- **Cards:** Numero grande + label small
- **Icons:** Opcional, 24px

### Bottom Tabs (Mobile)
- **Height:** 56px
- **Items:** 4 max, icon + label
- **Active:** Color primario, filled icon
- **Create:** Floating action style o tab

---

## Interacciones

| Elemento | Accion | Resultado |
|----------|--------|-----------|
| Deck Card | Click | Navigate to /deck/:id |
| Study All | Click | Start combined session |
| Create | Click | Open create deck modal |
| Avatar | Click | Open dropdown menu |
| Search | Focus | Expand, show suggestions |
| Streak | Hover | Show streak details |
| Sidebar item | Click | Navigate to section |

### Gestos Mobile

| Gesto | Elemento | Resultado |
|-------|----------|-----------|
| Pull down | Deck list | Refresh |
| Swipe right | Deck card | Quick study |
| Swipe left | Deck card | Delete (confirm) |
| Long press | Deck card | Options menu |

---

## Estados de Loading

### Skeleton Loading

```
+--------------------------------+
|         SUMMARY BAR            |
| [====  ====  ====  ====     ]  |
| [====  ======]  [====  ====]   |
+--------------------------------+

+--------------------------------+
|          DECK GRID             |
|                                |
| +----------+  +----------+     |
| | [======] |  | [======] |     |
| | [====]   |  | [====]   |     |
| | [==]     |  | [==]     |     |
| +----------+  +----------+     |
|                                |
+--------------------------------+
```

---

## Metricas de Exito

| Metrica | Target | Medicion |
|---------|--------|----------|
| Time to first study | <10s | Desde dashboard load |
| Deck click rate | >60% | Clicks / usuarios |
| Study All usage | >30% | Cuando hay cards due |
| Return visits | D7 30% | Retention |
