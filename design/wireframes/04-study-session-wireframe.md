# Wireframe: Study Session

**Pantalla:** Study Session (/study/:deckId)
**Prioridad:** Tier 1 - MVP
**Objetivo:** Experiencia de estudio enfocada con SRS

---

## Flujo de Estados

```
[Session Start]
     |
     v
[Question View] <----+
     |               |
     v               |
[Show Answer]        |
     |               |
     v               |
[Answer + Rating]    |
     |               |
     +-- (next) -----+
     |
     v (all done)
[Completion Screen]
```

---

## Estado 1: Vista de Pregunta

### Desktop Layout (1440px)

```
+------------------------------------------------------------------+
|                      MINIMAL HEADER                               |
| [X Close]           Card 3 of 8           ACLS Medications        |
|            [=================================           ] 37%     |
+------------------------------------------------------------------+

+------------------------------------------------------------------+
|                                                                   |
|                                                                   |
|                                                                   |
|                                                                   |
|                   +------------------------------+                |
|                   |                              |                |
|                   |                              |                |
|                   |    What is the first         |                |
|                   |    medication administered   |                |
|                   |    in ACLS protocols?        |                |
|                   |                              |                |
|                   |                              |                |
|                   +------------------------------+                |
|                                                                   |
|                                                                   |
|                   +------------------------------+                |
|                   |       [Show Answer]          |                |
|                   +------------------------------+                |
|                                                                   |
|                   Press SPACE or click to reveal                  |
|                                                                   |
|                                                                   |
+------------------------------------------------------------------+
```

### Mobile Layout (375px)

```
+--------------------------------+
|         MINI HEADER            |
| [X]    Card 3/8                |
| [========              ] 37%   |
+--------------------------------+

+--------------------------------+
|                                |
|                                |
|                                |
|                                |
|   +------------------------+   |
|   |                        |   |
|   |  What is the first     |   |
|   |  medication            |   |
|   |  administered in       |   |
|   |  ACLS protocols?       |   |
|   |                        |   |
|   +------------------------+   |
|                                |
|                                |
|                                |
|                                |
|                                |
|                                |
+--------------------------------+

+--------------------------------+
|      [Show Answer]             |
|                                |
|      Tap card to flip          |
+--------------------------------+
```

---

## Estado 2: Vista de Respuesta (Con Rating)

### Desktop Layout (1440px)

```
+------------------------------------------------------------------+
|                      MINIMAL HEADER                               |
| [X Close]           Card 3 of 8           ACLS Medications        |
|            [=================================           ] 37%     |
+------------------------------------------------------------------+

+------------------------------------------------------------------+
|                                                                   |
|                                                                   |
|                   +------------------------------+                |
|                   |          FRONT               |                |
|                   |                              |                |
|                   |    What is the first         |                |
|                   |    medication administered   |                |
|                   |    in ACLS protocols?        |                |
|                   |                              |                |
|                   +------------------------------+                |
|                          | (flip) |                               |
|                          v        v                               |
|                   +------------------------------+                |
|                   |          BACK                |                |
|                   |                              |                |
|                   |    EPINEPHRINE               |                |
|                   |                              |                |
|                   |    In the EALA mnemonic,     |                |
|                   |    E stands for Epinephrine  |                |
|                   |    - the first medication    |                |
|                   |    given in cardiac arrest.  |                |
|                   |                              |                |
|                   +------------------------------+                |
|                                                                   |
|                                                                   |
|   +----------------+  +----------------+  +----------------+      |
|   |     HARD       |  |     GOOD       |  |     EASY       |      |
|   |                |  |                |  |                |      |
|   |   [1] Again    |  |   [3] ~1 day   |  |   [5] ~4 days  |      |
|   |   tomorrow     |  |                |  |                |      |
|   +----------------+  +----------------+  +----------------+      |
|                                                                   |
|           Press 1, 3, or 5 to rate and continue                   |
|                                                                   |
+------------------------------------------------------------------+
```

### Mobile Layout (375px)

```
+--------------------------------+
|         MINI HEADER            |
| [X]    Card 3/8                |
| [========              ] 37%   |
+--------------------------------+

+--------------------------------+
|                                |
|   +------------------------+   |
|   |        FRONT           |   |
|   | What is the first      |   |
|   | medication...          |   |
|   +------------------------+   |
|            | |                 |
|            v v                 |
|   +------------------------+   |
|   |        BACK            |   |
|   |                        |   |
|   |    EPINEPHRINE         |   |
|   |                        |   |
|   | In the EALA mnemonic,  |   |
|   | E stands for           |   |
|   | Epinephrine - the      |   |
|   | first medication...    |   |
|   |                        |   |
|   +------------------------+   |
|                                |
+--------------------------------+

+--------------------------------+
|                                |
| +--------+ +--------+ +------+ |
| | HARD   | | GOOD   | | EASY | |
| |   1    | |   3    | |  5   | |
| | Again  | | ~1 day | | ~4d  | |
| +--------+ +--------+ +------+ |
|                                |
+--------------------------------+
```

---

## Estado 3: Pantalla de Finalizacion

### Desktop Layout (1440px)

```
+------------------------------------------------------------------+
|                      MINIMAL HEADER                               |
| [X Close]                                    ACLS Medications     |
+------------------------------------------------------------------+

+------------------------------------------------------------------+
|                                                                   |
|                                                                   |
|                                                                   |
|                        [Celebration Icon]                         |
|                                                                   |
|                       Session Complete!                           |
|                                                                   |
|                                                                   |
|           +------------------------------------------+            |
|           |                                          |            |
|           |    [8]           [4:32]        [92%]     |            |
|           |    Cards         Minutes       Correct   |            |
|           |    Reviewed      Studied       Rate      |            |
|           |                                          |            |
|           +------------------------------------------+            |
|                                                                   |
|                                                                   |
|           +------------------------------------------+            |
|           |           Next Reviews                   |            |
|           |                                          |            |
|           |  Tomorrow:        3 cards                |            |
|           |  In 3 days:       4 cards                |            |
|           |  In 1 week:       1 card                 |            |
|           +------------------------------------------+            |
|                                                                   |
|                                                                   |
|           +------------------------------------------+            |
|           |          [Study More Cards]              |            |
|           +------------------------------------------+            |
|           |                                          |            |
|           |          [Return to Dashboard]           |            |
|           |                                          |            |
|           +------------------------------------------+            |
|                                                                   |
|                                                                   |
|                   [Fire Icon] 12 day streak!                      |
|                                                                   |
+------------------------------------------------------------------+
```

### Mobile Layout (375px)

```
+--------------------------------+
|         MINI HEADER            |
| [X]                            |
+--------------------------------+

+--------------------------------+
|                                |
|     [Celebration Animation]    |
|                                |
|       Session Complete!        |
|                                |
| +----------------------------+ |
| |                            | |
| |  [8]       [4:32]   [92%]  | |
| |  Cards     Mins     Rate   | |
| |                            | |
| +----------------------------+ |
|                                |
| +----------------------------+ |
| |     Next Reviews           | |
| |                            | |
| |  Tomorrow:      3 cards    | |
| |  In 3 days:     4 cards    | |
| |  In 1 week:     1 card     | |
| +----------------------------+ |
|                                |
| [Study More Cards          ]   |
|                                |
| [Return to Dashboard       ]   |
|                                |
| [Fire] 12 day streak!          |
|                                |
+--------------------------------+
```

---

## Componentes Detallados

### Progress Bar (Header)
```
+------------------------------------------------------------------+
| [========================================                  ] 75%  |
+------------------------------------------------------------------+

Especificaciones:
- Height: 4px
- Background: Gray-200
- Fill: Primary color
- Transition: 300ms ease
- Border-radius: 2px
```

### Flashcard (Study Mode)
```
+------------------------------------------+
|                                          |
|                                          |
|        Question or Answer text           |
|        centered and large                |
|                                          |
|                                          |
+------------------------------------------+

Especificaciones:
- Max-width: 600px
- Min-height: 200px
- Padding: 48px
- Background: White (light) / Gray-800 (dark)
- Border-radius: 16px
- Shadow: lg
- Typography: 24px (desktop), 18px (mobile)
- Text-align: center
```

### Rating Buttons
```
+------------------+  +------------------+  +------------------+
|       HARD       |  |       GOOD       |  |       EASY       |
|                  |  |                  |  |                  |
|   Keyboard: 1    |  |   Keyboard: 3    |  |   Keyboard: 5    |
|                  |  |                  |  |                  |
|   Review again   |  |   Review in      |  |   Review in      |
|   tomorrow       |  |   1 day          |  |   4 days         |
+------------------+  +------------------+  +------------------+

Especificaciones:
- Min-width: 120px (desktop), flex-1 (mobile)
- Height: 80px (desktop), 64px (mobile)
- Border-radius: 12px
- Colors:
  - Hard: Red-500 bg, white text
  - Good: Yellow-500 bg, dark text
  - Easy: Green-500 bg, white text
- Hover: Darken 10%
- Active: Scale 0.98
```

### Completion Stats
```
+------------------------------------------+
|                                          |
|    [Icon]          [Icon]       [Icon]   |
|     8               4:32          92%    |
|    Cards           Minutes      Correct  |
|    Reviewed        Studied       Rate    |
|                                          |
+------------------------------------------+

Especificaciones:
- Layout: Flex, space-between
- Icons: 32px, muted color
- Numbers: 36px, bold, primary
- Labels: 14px, muted
```

---

## Interacciones y Animaciones

### Flip Animation
```
Card Question State
        |
        | (click/space/tap)
        v
[Rotation Y: 0deg -> 90deg] 150ms
        |
        v
[Switch content]
        |
        v
[Rotation Y: 90deg -> 0deg] 150ms
        |
        v
Card Answer State (with rating)
```

### Rating Feedback
```
[Click Rating Button]
        |
        v
[Scale down 0.95] 50ms
        |
        v
[Scale up 1.0] 100ms
        |
        v
[Slide out current card] 200ms
        |
        v
[Slide in next card] 200ms
```

### Completion Celebration
```
[All cards done]
        |
        v
[Confetti animation] 1500ms
        |
        v
[Stats counter animation] 500ms
[Numbers count up from 0]
```

---

## Keyboard Shortcuts

| Tecla | Accion |
|-------|--------|
| Space | Show answer / Flip card |
| 1 | Rate Hard |
| 3 | Rate Good |
| 5 | Rate Easy |
| Escape | Pause session (confirm) |
| Arrow Right | Skip (if enabled) |

---

## Gestos Mobile

| Gesto | Accion |
|-------|--------|
| Tap card | Flip |
| Swipe left | Rate Hard |
| Swipe right | Rate Easy |
| Swipe up | Rate Good |
| Long press | Pause menu |

---

## Estados de Error

### Network Error Durante Estudio
```
+------------------------------------------+
| [Warning Icon]                           |
|                                          |
| Connection Lost                          |
|                                          |
| Your progress is saved locally.          |
| We'll sync when you're back online.      |
|                                          |
| [Continue Offline]  [Pause Session]      |
+------------------------------------------+
```

### Exit Confirmation
```
+------------------------------------------+
| Pause Study Session?                     |
|                                          |
| Your progress is saved. You can          |
| continue where you left off.             |
|                                          |
| [Continue Studying]  [Exit]              |
+------------------------------------------+
```

---

## Metricas

| Metrica | Target | Medicion |
|---------|--------|----------|
| Session completion rate | >70% | Started vs completed |
| Avg session duration | 5-10 min | Time tracking |
| Cards per minute | 3-5 | Cards / time |
| Rating distribution | 20/60/20 | H/G/E split |
| Keyboard usage | >40% | Desktop users |
