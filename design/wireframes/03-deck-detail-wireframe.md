# Wireframe: Deck Detail

**Pantalla:** Deck Detail (/deck/:id)
**Prioridad:** Tier 1 - MVP
**Objetivo:** Gestionar contenido del deck, iniciar estudio

---

## Estado 1: Deck Vacio (Nuevo - Input de Lista)

### Desktop Layout (1440px)

```
+------------------------------------------------------------------+
|                           HEADER                                  |
| [<- Back] ACLS Medications                    [Edit] [Delete]    |
+------------------------------------------------------------------+

+------------------------------------------------------------------+
|                        MAIN CONTENT                               |
|                                                                   |
|  +--------------------------------------------------------------+ |
|  |                     LIST INPUT AREA                           | |
|  |                                                               | |
|  |  Paste your list of items to memorize                         | |
|  |                                                               | |
|  |  +----------------------------------------------------------+ | |
|  |  |                                                          | | |
|  |  |  (placeholder text)                                      | | |
|  |  |  Paste your list here...                                 | | |
|  |  |                                                          | | |
|  |  |  Examples:                                               | | |
|  |  |  - Medication names (Epinephrine, Amiodarone...)         | | |
|  |  |  - Protocol steps (1. Assess scene, 2. Check response)  | | |
|  |  |  - Vocabulary terms                                      | | |
|  |  |                                                          | | |
|  |  |                                                          | | |
|  |  |                                                          | | |
|  |  |                                                          | | |
|  |  +----------------------------------------------------------+ | |
|  |                                                               | |
|  |  8 items detected                         [Character count]   | |
|  |                                                               | |
|  |  +----------------------------------------------------------+ | |
|  |  |              [Generate Mnemonics ->]                     | | |
|  |  +----------------------------------------------------------+ | |
|  |                                                               | |
|  |  Tip: Works best with 3-50 items. Separate items with new    | |
|  |  lines, commas, or numbered lists.                            | |
|  |                                                               | |
|  +--------------------------------------------------------------+ |
|                                                                   |
+------------------------------------------------------------------+
```

### Mobile Layout (375px)

```
+--------------------------------+
|           HEADER               |
| [<-]  ACLS Medications  [...]  |
+--------------------------------+

+--------------------------------+
|                                |
|  Paste your list of items      |
|  to memorize                   |
|                                |
|  +---------------------------+ |
|  |                           | |
|  |  Paste your list here...  | |
|  |                           | |
|  |                           | |
|  |                           | |
|  |                           | |
|  |                           | |
|  |                           | |
|  +---------------------------+ |
|                                |
|  8 items detected              |
|                                |
|  [Generate Mnemonics ->     ]  |
|                                |
+--------------------------------+
```

---

## Estado 2: Generando Mnemotecnias (Loading)

### Desktop Layout

```
+------------------------------------------------------------------+
|                           HEADER                                  |
| [<- Back] ACLS Medications                    [Edit] [Delete]    |
+------------------------------------------------------------------+

+------------------------------------------------------------------+
|                        MAIN CONTENT                               |
|                                                                   |
|  +--------------------------------------------------------------+ |
|  |                    GENERATING...                              | |
|  |                                                               | |
|  |                                                               | |
|  |                   [Spinner Animation]                         | |
|  |                                                               | |
|  |               Generating 3 mnemonic options...                | |
|  |                                                               | |
|  |               This usually takes 3-8 seconds.                 | |
|  |                                                               | |
|  |  +----------------------------------------------------------+ | |
|  |  |  [=========                                   ] 40%      | | |
|  |  +----------------------------------------------------------+ | |
|  |                                                               | |
|  |  [Cancel]                                                     | |
|  |                                                               | |
|  +--------------------------------------------------------------+ |
|                                                                   |
+------------------------------------------------------------------+
```

---

## Estado 3: Seleccion de Mnemotecnias

### Desktop Layout (1440px)

```
+------------------------------------------------------------------+
|                           HEADER                                  |
| [<- Back] ACLS Medications                    [Regenerate All]   |
+------------------------------------------------------------------+

+------------------------------------------------------------------+
|                        MAIN CONTENT                               |
|                                                                   |
|  Choose your mnemonic technique                                   |
|  Select the one that resonates best with your learning style     |
|                                                                   |
|  +------------------+ +------------------+ +------------------+   |
|  | ACROSTIC         | | STORY            | | VISUAL PATTERN   |   |
|  | [Badge: Acro]    | | [Badge: Story]   | | [Badge: Visual]  |   |
|  |                  | |                  | |                  |   |
|  | "EALA Memory"    | | "The ER Journey" | | "Med Cabinet"    |   |
|  |                  | |                  | |                  |   |
|  | E - Epinephrine  | | Picture yourself | | Imagine a        |   |
|  | A - Amiodarone   | | in a busy ER...  | | medicine cabinet |   |
|  | L - Lidocaine    | | The alarms       | | with 4 shelves...|   |
|  | A - Atropine     | | sound as...      | |                  |   |
|  |                  | |                  | |                  |   |
|  | [Show More v]    | | [Show More v]    | | [Show More v]    |   |
|  |                  | |                  | |                  |   |
|  | How to use:      | | How to use:      | | How to use:      |   |
|  | Repeat "EALA"    | | Walk through     | | Visualize each   |   |
|  | before shift...  | | the story...     | | shelf...         |   |
|  |                  | |                  | |                  |   |
|  | [Use This One]   | | [Use This One]   | | [Use This One]   |   |
|  +------------------+ +------------------+ +------------------+   |
|                                                                   |
+------------------------------------------------------------------+
```

### Estado: Con Seleccion Activa

```
+------------------------------------------------------------------+
|                        MAIN CONTENT                               |
|                                                                   |
|  Choose your mnemonic technique                                   |
|                                                                   |
|  +------------------+ +==================+ +------------------+   |
|  |                  | ||  SELECTED       || |                  |   |
|  | ACROSTIC         | || STORY           || | VISUAL PATTERN   |   |
|  | (dimmed)         | ||                 || | (dimmed)         |   |
|  |                  | || [checkmark]     || |                  |   |
|  |                  | ||                 || |                  |   |
|  |                  | || "The ER Journey"|| |                  |   |
|  |                  | ||                 || |                  |   |
|  |                  | || Full content... || |                  |   |
|  |                  | ||                 || |                  |   |
|  +------------------+ +==================+ +------------------+   |
|                                                                   |
|  +--------------------------------------------------------------+ |
|  |           [Continue to Flashcards ->]                        | |
|  +--------------------------------------------------------------+ |
|                                                                   |
+------------------------------------------------------------------+
```

### Mobile Layout (375px)

```
+--------------------------------+
|           HEADER               |
| [<-]  ACLS Meds      [Regen]   |
+--------------------------------+

+--------------------------------+
|                                |
|  Choose your mnemonic          |
|                                |
| +----------------------------+ |
| | ACROSTIC          [Badge]  | |
| |                            | |
| | "EALA Memory Phrase"       | |
| |                            | |
| | E - Epinephrine            | |
| | A - Amiodarone             | |
| | L - Lidocaine              | |
| | A - Atropine               | |
| |                            | |
| |        [Show More v]       | |
| |                            | |
| | [Use This One]             | |
| +----------------------------+ |
|                                |
| +----------------------------+ |
| | STORY             [Badge]  | |
| |                            | |
| | "The ER Journey"           | |
| |                            | |
| | Picture yourself in...     | |
| |        [Show More v]       | |
| |                            | |
| | [Use This One]             | |
| +----------------------------+ |
|                                |
| +----------------------------+ |
| | VISUAL PATTERN    [Badge]  | |
| |                            | |
| | "Medicine Cabinet Method"  | |
| |                            | |
| | Imagine a cabinet with...  | |
| |        [Show More v]       | |
| |                            | |
| | [Use This One]             | |
| +----------------------------+ |
|                                |
+--------------------------------+

(When selected, sticky footer appears)

+--------------------------------+
| [Continue to Flashcards ->  ]  |
+--------------------------------+
```

---

## Estado 4: Deck con Flashcards

### Desktop Layout (1440px)

```
+------------------------------------------------------------------+
|                           HEADER                                  |
| [<- Back] ACLS Medications                    [Edit] [Delete]    |
+------------------------------------------------------------------+

+------------------------------------------------------------------+
| SIDEBAR          |           MAIN CONTENT                         |
|                  |                                                |
| DECK INFO        |  +------------------------------------------+  |
|                  |  |              STATUS BAR                   |  |
| [18] Cards       |  |                                          |  |
| [5] Due today    |  |  18 flashcards    5 due today   92% ret  |  |
| 92% Retention    |  |                                          |  |
|                  |  |  [Start Studying ->]                     |  |
| Last studied:    |  |                                          |  |
| 2 hours ago      |  +------------------------------------------+  |
|                  |                                                |
| ----------       |  +------------------------------------------+  |
|                  |  |            YOUR MNEMONIC                  |  |
| MNEMONIC         |  |                                          |  |
|                  |  |  Story Technique: "The ER Journey"       |  |
| Story Technique  |  |                                          |  |
|                  |  |  Picture yourself in a busy ER. The      |  |
| [View Full ->]   |  |  alarms sound as a code blue is called.  |  |
|                  |  |  You rush to the crash cart and grab     |  |
|                  |  |  Epinephrine first...                    |  |
|                  |  |                                          |  |
|                  |  |  [Read Full Mnemonic v]                  |  |
|                  |  |                                          |  |
|                  |  +------------------------------------------+  |
|                  |                                                |
|                  |  +------------------------------------------+  |
|                  |  |            FLASHCARDS                    |  |
|                  |  |                                          |  |
|                  |  |  All (18)   Due (5)   New (0)            |  |
|                  |  |                                          |  |
|                  |  |  +--------+ +--------+ +--------+        |  |
|                  |  |  | Card 1 | | Card 2 | | Card 3 |        |  |
|                  |  |  |        | |        | |        |        |  |
|                  |  |  | What   | | In the | | What   |        |  |
|                  |  |  | is the | | EALA   | | comes  |        |  |
|                  |  |  | first  | | mnem.. | | after  |        |  |
|                  |  |  | med?   | |        | | Amio?  |        |  |
|                  |  |  |        | |        | |        |        |  |
|                  |  |  | [Edit] | | [Edit] | | [Edit] |        |  |
|                  |  |  +--------+ +--------+ +--------+        |  |
|                  |  |                                          |  |
|                  |  |  +--------+ +--------+ +--------+        |  |
|                  |  |  | Card 4 | | Card 5 | | Card 6 |        |  |
|                  |  |  |  ...   | |  ...   | |  ...   |        |  |
|                  |  |  +--------+ +--------+ +--------+        |  |
|                  |  |                                          |  |
|                  |  +------------------------------------------+  |
|                  |                                                |
+------------------------------------------------------------------+
```

### Mobile Layout (375px)

```
+--------------------------------+
|           HEADER               |
| [<-]  ACLS Meds        [...]   |
+--------------------------------+

+--------------------------------+
|          STATUS BAR            |
|                                |
| [18 cards]  [5 due]  [92% ret] |
|                                |
| [Start Studying ->          ]  |
|                                |
+--------------------------------+

+--------------------------------+
|         YOUR MNEMONIC          |
|                                |
| [Story] "The ER Journey"       |
|                                |
| Picture yourself in a busy     |
| ER. The alarms sound as...     |
|                                |
| [Read Full Mnemonic v]         |
|                                |
+--------------------------------+

+--------------------------------+
|          FLASHCARDS            |
|                                |
| [All] [Due (5)] [New]          |
|                                |
| +----------------------------+ |
| | What is the first          | |
| | medication in ACLS?        | |
| |             [Edit] [Del]   | |
| +----------------------------+ |
|                                |
| +----------------------------+ |
| | In the EALA mnemonic,      | |
| | what does E stand for?     | |
| |             [Edit] [Del]   | |
| +----------------------------+ |
|                                |
| +----------------------------+ |
| | What comes after           | |
| | Amiodarone in protocol?    | |
| |             [Edit] [Del]   | |
| +----------------------------+ |
|                                |
+--------------------------------+
```

---

## Componentes Detallados

### Mnemonic Card (Seleccion)
```
+----------------------------------+
| [BADGE: Type]                    |
|                                  |
| "Title of Mnemonic"              |
|                                  |
| Preview content text that        |
| gives user idea of the           |
| technique used...                |
|                                  |
| [Show More / Show Less]          |
|                                  |
| How to use this:                 |
| Brief instruction text...        |
|                                  |
| [Use This Mnemonic]              |
+----------------------------------+

Estados:
- Default: Border normal
- Hover: Border primary, slight elevation
- Selected: Border primary 2px, background tint, checkmark
- Dimmed: Opacity 60%, no interactions
```

### Flashcard Preview
```
+----------------------------------+
| Question text goes here and      |
| can span multiple lines...       |
|                                  |
|                    [Edit] [Del]  |
+----------------------------------+

Hover/Tap:
+----------------------------------+
|         FRONT                    |
|                                  |
| Question text...                 |
|                                  |
|         [Tap to flip]            |
+----------------------------------+
         |
         v (flip animation)
+----------------------------------+
|         BACK                     |
|                                  |
| Answer text with                 |
| mnemonic reference...            |
|                                  |
|         [Tap to flip back]       |
+----------------------------------+
```

### Text Area (List Input)
```
+----------------------------------+
| Paste your list here...          | <- Placeholder
|                                  |
| [Cursor]                         |
|                                  |
|                                  |
|                                  |
+----------------------------------+
| 0 items detected     0/10000    | <- Counter line
```

---

## Interacciones

| Elemento | Accion | Resultado |
|----------|--------|-----------|
| Generate | Click | Start API call, show loading |
| Mnemonic card | Click | Expand full content |
| Use This | Click | Select mnemonic, enable Continue |
| Continue | Click | Generate flashcards |
| Start Studying | Click | Navigate to study session |
| Card preview | Click/Tap | Flip animation |
| Edit card | Click | Open edit modal |
| Delete card | Click | Confirm then remove |
| Regenerate | Click | Confirm, new generation |

---

## Validaciones

### List Input
| Validacion | Mensaje de Error |
|------------|------------------|
| Empty | "Please paste a list of items to memorize" |
| <3 items | "Please enter at least 3 items" |
| >50 items | "Maximum 50 items per list. You entered X." |
| >10000 chars | "Content too long. Please shorten." |

### Estados de Error
```
+----------------------------------+
| [!] Generation Failed            |
|                                  |
| We couldn't generate mnemonics   |
| right now. Please try again.     |
|                                  |
| [Try Again]  [Cancel]            |
+----------------------------------+
```

---

## Metricas

| Metrica | Target |
|---------|--------|
| Mnemonic selection rate | >85% |
| Time to select | <60 seconds |
| Flashcard generation | <10 seconds |
| Edit rate | <10% (quality indicator) |
