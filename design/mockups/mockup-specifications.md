# Especificaciones de Mockups - BrainKit

**Version:** 1.0
**Fecha:** 2025-12-27

Este documento describe las especificaciones visuales detalladas para implementar los mockups de alta fidelidad de BrainKit.

---

## 1. Landing Page

### Hero Section (Desktop 1440px)

```
Dimensiones: 1440 x 800px (above the fold)

HEADER (height: 72px)
+------------------------------------------------------------------+
| Logo: "BrainKit" - Inter 600, 24px, #1E3A8A                      |
| Position: left, padding-left 64px                                 |
|                                                                   |
| Nav Right: padding-right 64px                                     |
| - "Sign In" - Inter 500, 15px, #475569, hover underline          |
| - "Start Free" - Button primary, h:44px, px:24px                  |
+------------------------------------------------------------------+

HERO (padding: 120px 64px)
+------------------------------------------------------------------+
| Left Column (50%)                Right Column (50%)               |
|                                                                   |
| Badge: "For Healthcare Pros"     [Ilustracion/Screenshot]         |
| bg: #EFF6FF, text: #2563EB       Max-width: 560px                |
| px:16, py:6, rounded-full        Shadow-2xl                      |
| Inter 500, 14px                  Border-radius: 24px             |
|                                                                   |
| H1: "Stop Creating Flashcards.                                   |
| Start Remembering."                                               |
| Inter 700, 56px, #0F172A                                         |
| Line-height: 1.1                                                  |
| Max-width: 540px                                                  |
| Margin-top: 24px                                                  |
|                                                                   |
| Subhead: "AI generates mnemonic                                  |
| techniques and flashcards from                                    |
| any list. Spaced repetition                                       |
| handles the rest."                                                |
| Inter 400, 20px, #64748B                                         |
| Line-height: 1.6                                                  |
| Max-width: 480px                                                  |
| Margin-top: 24px                                                  |
|                                                                   |
| CTA Button:                                                       |
| "Create Your First Deck - Free"                                   |
| Button large: h:56px, px:32px                                     |
| bg: #2563EB, hover: #1D4ED8                                      |
| Inter 500, 17px, white                                           |
| Icon: arrow-right, 20px                                           |
| Shadow-lg                                                         |
| Margin-top: 40px                                                  |
|                                                                   |
+------------------------------------------------------------------+
```

### How It Works Section

```
Dimensiones: 1440 x auto (min 600px)
Background: #F8FAFC
Padding: 120px 64px

SECTION HEADER
- "How it works" - Inter 600, 14px, #2563EB, uppercase, tracking-wide
- "3 simple steps to lasting memory" - Inter 700, 40px, #0F172A
- Margin-bottom: 80px
- Text-align: center

STEPS GRID (3 columnas, gap: 48px, max-width: 1120px, centered)

+----------------+ +----------------+ +----------------+
|    Step 1      | |    Step 2      | |    Step 3      |
|                | |                | |                |
| [Icon]         | | [Icon]         | | [Icon]         |
| 64x64px        | | 64x64px        | | 64x64px        |
| bg: #EFF6FF    | | bg: #ECFDF5    | | bg: #FEF3C7    |
| icon: #2563EB  | | icon: #059669  | | icon: #D97706  |
| p: 16px        | | p: 16px        | | p: 16px        |
| rounded: 16px  | | rounded: 16px  | | rounded: 16px  |
|                | |                | |                |
| Number         | | Number         | | Number         |
| "1" - 700, 14px| | "2"            | | "3"            |
| mt: 24px       | |                | |                |
|                | |                | |                |
| Title          | | Title          | | Title          |
| "Paste Your    | | "Choose Your   | | "Study with    |
|  List"         | |  Mnemonic"     | |  Spaced Rep."  |
| Inter 600, 24px| | Inter 600, 24px| | Inter 600, 24px|
| #1E293B        | | #1E293B        | | #1E293B        |
| mt: 16px       | |                | |                |
|                | |                | |                |
| Description    | | Description    | | Description    |
| Inter 400, 16px| | Inter 400, 16px| | Inter 400, 16px|
| #64748B        | | #64748B        | | #64748B        |
| line-height 1.6| |                | |                |
| mt: 12px       | |                | |                |
+----------------+ +----------------+ +----------------+
```

### Pricing Section

```
Dimensiones: 1440 x auto
Background: white
Padding: 120px 64px

SECTION HEADER
- "Pricing" - Inter 600, 14px, #2563EB, uppercase
- "Simple, transparent pricing" - Inter 700, 40px, #0F172A
- Margin-bottom: 64px
- Text-align: center

PRICING CARDS (2 columnas, gap: 32px, max-width: 880px, centered)

+---------------------------------+ +----------------------------------+
|           FREE                  | |           PREMIUM                |
|                                 | |                                  |
| Background: white               | | Background: #EFF6FF              |
| Border: 1px #E2E8F0             | | Border: 2px #2563EB              |
| Border-radius: 16px             | | Border-radius: 16px              |
| Padding: 40px                   | | Padding: 40px                    |
|                                 | |                                  |
| Plan name: "Free"               | | Badge: "Most Popular"            |
| Inter 600, 20px, #1E293B        | | bg: #2563EB, text: white         |
|                                 | | px:12, py:4, rounded-full        |
| Price: "$0"                     | | Inter 500, 12px                  |
| Inter 700, 48px, #0F172A        | | Position: top-right, -12px       |
| "/month" - 400, 16px, #64748B   | |                                  |
|                                 | | Plan name: "Premium"             |
| Features list:                  | | Inter 600, 20px, #1E293B         |
| - [check] 3 generations/mo      | |                                  |
| - [check] Full SRS system       | | Price: "$9.99"                   |
| - [check] Unlimited study       | | Inter 700, 48px, #0F172A         |
|                                 | | "/month" - 400, 16px             |
| Check icon: #10B981             | |                                  |
| Text: Inter 400, 16px, #475569  | | Features list:                   |
| Line-height: 2.5                | | - [check] Unlimited generations  |
|                                 | | - [check] Full SRS system        |
| CTA: "Start Free"               | | - [check] Advanced statistics    |
| Button secondary, full-width    | | - [check] Priority support       |
| h: 48px                         | |                                  |
|                                 | | CTA: "Start Free, Upgrade Later" |
|                                 | | Button primary, full-width       |
|                                 | | h: 48px                          |
+---------------------------------+ +----------------------------------+
```

---

## 2. Dashboard

### Desktop Layout (1440px)

```
HEADER (height: 64px, bg: white, border-bottom: 1px #E2E8F0)
+------------------------------------------------------------------+
| Logo (left, ml: 24px)             Search | Avatar | Create (right)|
|                                   gap: 16px, mr: 24px            |
| "BrainKit"                        Search: w:240px, h:40px        |
| Inter 600, 20px, #1E3A8A          Avatar: 36px, rounded-full     |
|                                   Create: Button primary, h:40px  |
+------------------------------------------------------------------+

LAYOUT (sidebar + main)
+------------------------------------------------------------------+
| SIDEBAR      |               MAIN CONTENT                         |
| w: 256px     |               flex-1                               |
| bg: #F8FAFC  |               bg: white                            |
| pt: 24px     |               p: 32px                              |
| border-right |                                                    |
|              |                                                    |
| Nav Item:    |                                                    |
| h: 44px      |  SUMMARY BAR                                       |
| px: 16px     |  bg: gradient(135deg, #EFF6FF, #F8FAFC)           |
| rounded: 8px |  border-radius: 16px                               |
| mb: 4px      |  padding: 32px                                     |
|              |  margin-bottom: 32px                               |
| Active:      |                                                    |
| bg: #EFF6FF  |  "Good morning, Sarah!"                            |
| text: #2563EB|  Inter 600, 28px, #0F172A                         |
| border-left: |                                                    |
| 3px #2563EB  |  Stats Row (flex, gap: 24px, mt: 16px):           |
|              |  - Streak: [Fire icon] "12 day streak"            |
| Inactive:    |  - Due: [Cards icon] "23 cards due today"         |
| text: #475569|  Icon: 24px, bg: white, p:8, rounded:8            |
| hover:       |  Text: Inter 500, 16px, #475569                   |
| bg: #F1F5F9  |                                                    |
|              |  CTA: "Study All Due Cards"                        |
| Divider:     |  Button primary, h: 48px, mt: 24px                 |
| h: 1px       |                                                    |
| bg: #E2E8F0  +---------------------------------------------------+
| mx: 16px     |                                                    |
| my: 16px     |  DECK GRID                                         |
|              |  "Your Decks" - Inter 600, 20px, #1E293B          |
| Sections:    |  grid-template-columns: repeat(3, 1fr)             |
| - Dashboard  |  gap: 24px                                         |
| - My Decks   |  margin-top: 24px                                  |
| - Statistics |                                                    |
| ------------ |  +----------+ +----------+ +----------+            |
| - Settings   |  | DeckCard | | DeckCard | | DeckCard |            |
| - Upgrade    |  |          | |          | |          |            |
|              |  +----------+ +----------+ +----------+            |
| USER SECTION |                                                    |
| (bottom)     |  +----------+ +----------+ +----------+            |
| Avatar 40px  |  | DeckCard | | DeckCard | | + New    |            |
| Name         |  |          | |          | |  Deck    |            |
| [Logout]     |  +----------+ +----------+ +----------+            |
|              |                                                    |
+------------------------------------------------------------------+

DECK CARD COMPONENT
+----------------------------------+
| Padding: 20px                    |
| Border: 1px #E2E8F0              |
| Border-radius: 12px              |
| Background: white                |
| Shadow: sm                       |
| Transition: all 200ms            |
|                                  |
| Hover:                           |
| Border-color: #93C5FD            |
| Shadow: md                       |
| Transform: translateY(-2px)      |
|                                  |
| Title: "ACLS Medications"        |
| Inter 600, 18px, #1E293B         |
| Truncate at 25 chars             |
|                                  |
| Card count: "[18] flashcards"    |
| Inter 400, 14px, #64748B         |
| margin-top: 8px                  |
|                                  |
| Due badge (if due > 0):          |
| bg: #FEF3C7, text: #92400E       |
| px: 8px, py: 4px                 |
| rounded: 4px                     |
| Inter 500, 12px                  |
| "5 cards due"                    |
| margin-top: 12px                 |
|                                  |
| Last studied:                    |
| "Studied 2 hours ago"            |
| Inter 400, 12px, #94A3B8         |
| margin-top: 16px                 |
| border-top: 1px #F1F5F9          |
| padding-top: 12px                |
+----------------------------------+
```

---

## 3. Mnemonic Selection

### Layout (Desktop 1440px)

```
HEADER
+------------------------------------------------------------------+
| [<- Back]  "ACLS Medications"              [Regenerate All]       |
| Inter 500, 14px, #64748B                   Button ghost           |
+------------------------------------------------------------------+

CONTENT (max-width: 1200px, mx: auto, py: 48px)

Section Header:
"Choose your mnemonic technique" - Inter 600, 28px, #0F172A
"Select the one that resonates best with your learning style"
Inter 400, 16px, #64748B, mt: 8px

MNEMONIC CARDS (grid: 3 columns, gap: 24px, mt: 32px)

+----------------------------------+
| MNEMONIC CARD                    |
|                                  |
| Padding: 24px                    |
| Border: 2px #E2E8F0              |
| Border-radius: 12px              |
| Background: white                |
| Min-height: 320px                |
|                                  |
| States:                          |
| - Default: as above              |
| - Hover: border #93C5FD          |
| - Selected: border #2563EB,      |
|   bg #EFF6FF, checkmark icon     |
| - Dimmed: opacity 0.6            |
|                                  |
| BADGE (top)                      |
| "ACROSTIC"                       |
| bg: #E0E7FF, text: #3730A3       |
| px: 12px, py: 4px                |
| rounded-full                     |
| Inter 600, 11px, uppercase       |
| letter-spacing: 0.05em           |
|                                  |
| TITLE                            |
| "EALA Memory Phrase"             |
| Inter 600, 20px, #1E293B         |
| margin-top: 16px                 |
|                                  |
| CONTENT PREVIEW                  |
| "E - Epinephrine                 |
|  A - Amiodarone                  |
|  L - Lidocaine                   |
|  A - Atropine"                   |
| Inter 400, 15px, #475569         |
| line-height: 1.8                 |
| margin-top: 16px                 |
| max-height: 120px                |
| overflow: hidden                 |
|                                  |
| EXPAND BUTTON                    |
| "Show more"                      |
| Button ghost, small              |
| Icon: chevron-down               |
| margin-top: 8px                  |
|                                  |
| HOW TO USE                       |
| bg: #F8FAFC                      |
| padding: 16px                    |
| border-radius: 8px               |
| margin-top: 16px                 |
| "How to use this:"               |
| Inter 600, 13px, #64748B         |
| Description text...              |
| Inter 400, 14px, #475569         |
|                                  |
| CTA BUTTON                       |
| "Use This Mnemonic"              |
| Button secondary, full-width     |
| height: 44px                     |
| margin-top: 20px                 |
|                                  |
+----------------------------------+

CONTINUE BUTTON (fixed bottom or inline)
When selected:
"Continue to Flashcards" - Button primary, h: 52px
Full-width on mobile, max-w: 400px on desktop
Centered, mt: 48px
```

---

## 4. Study Session

### Fullscreen Layout

```
Background: #F8FAFC
Height: 100vh

MINIMAL HEADER (height: 56px, bg: transparent)
+------------------------------------------------------------------+
| [X Close]               Card 3 of 8            "ACLS Meds"        |
| Button ghost            Inter 500, 14px        Inter 400, 14px    |
| Icon only, 24px         #475569                #94A3B8            |
|                                                                   |
| Progress Bar (full width, below header content):                  |
| height: 4px                                                       |
| bg: #E2E8F0                                                       |
| fill: #2563EB                                                     |
| width: 37.5% (3/8)                                               |
+------------------------------------------------------------------+

CARD AREA (flex, justify-center, align-center, flex-1)

+------------------------------------------+
|              FLASHCARD                    |
|                                           |
| Width: 100%                               |
| Max-width: 640px                          |
| Min-height: 280px                         |
| Padding: 48px                             |
| Background: white                         |
| Border-radius: 20px                       |
| Box-shadow: xl                            |
| Margin: 0 auto                            |
|                                           |
| QUESTION STATE:                           |
| Text: Inter 500, 26px, #1E293B            |
| Text-align: center                        |
| Line-height: 1.5                          |
|                                           |
| "What is the first medication             |
|  administered in ACLS protocols?"         |
|                                           |
+------------------------------------------+

SHOW ANSWER BUTTON (below card, centered)
"Show Answer"
Button primary, h: 52px, w: 200px
margin-top: 32px

Hint text below:
"Press SPACE or tap to reveal"
Inter 400, 14px, #94A3B8
margin-top: 16px
```

### Answer State with Rating

```
CARD AREA (after flip)

+------------------------------------------+
|           FLASHCARD (flipped)             |
|                                           |
| FRONT (top, smaller):                     |
| bg: #F8FAFC                               |
| padding: 16px                             |
| border-radius: 12px                       |
| Text: Inter 400, 15px, #64748B            |
| "What is the first medication..."         |
|                                           |
| DIVIDER                                   |
| height: 1px, bg: #E2E8F0                  |
| margin: 24px 0                            |
|                                           |
| ANSWER:                                   |
| "EPINEPHRINE"                             |
| Inter 700, 28px, #0F172A                  |
| margin-bottom: 16px                       |
|                                           |
| "In the EALA mnemonic, E stands for       |
|  Epinephrine - the first medication       |
|  given in cardiac arrest."                |
| Inter 400, 17px, #475569                  |
| line-height: 1.6                          |
|                                           |
+------------------------------------------+

RATING BUTTONS (below card)
Flex, gap: 16px, max-width: 640px, mx: auto
margin-top: 32px

+------------------+ +------------------+ +------------------+
|       HARD       | |       GOOD       | |       EASY       |
|                  | |                  | |                  |
| bg: #EF4444      | | bg: #F59E0B      | | bg: #10B981      |
| hover: #DC2626   | | hover: #D97706   | | hover: #059669   |
| text: white      | | text: #1E293B    | | text: white      |
|                  | |                  | |                  |
| height: 72px     | | height: 72px     | | height: 72px     |
| flex: 1          | | flex: 1          | | flex: 1          |
| border-radius:12 | | border-radius:12 | | border-radius:12 |
|                  | |                  | |                  |
| Label: "Hard"    | | Label: "Good"    | | Label: "Easy"    |
| Inter 600, 16px  | | Inter 600, 16px  | | Inter 600, 16px  |
|                  | |                  | |                  |
| Hint: "[1]"      | | Hint: "[3]"      | | Hint: "[5]"      |
| Inter 400, 12px  | | opacity: 0.8     | | opacity: 0.8     |
|                  | |                  | |                  |
| Subtext:         | | Subtext:         | | Subtext:         |
| "Review tomorrow"| | "Review in ~1d"  | | "Review in ~4d"  |
| Inter 400, 12px  | | Inter 400, 12px  | | Inter 400, 12px  |
+------------------+ +------------------+ +------------------+

Keyboard hint below:
"Press 1, 3, or 5 to rate and continue"
Inter 400, 14px, #94A3B8, text-align: center
margin-top: 24px
```

### Completion Screen

```
Background: #F8FAFC
Full height, flex, justify-center, align-center

+------------------------------------------+
|          COMPLETION CONTENT               |
|                                           |
| CELEBRATION ICON                          |
| 80x80px, animated scale pulse             |
| [Checkmark in circle]                     |
| bg: #D1FAE5, icon: #059669                |
|                                           |
| TITLE                                     |
| "Session Complete!"                       |
| Inter 700, 32px, #0F172A                  |
| margin-top: 24px                          |
|                                           |
| STATS ROW                                 |
| bg: white                                 |
| border-radius: 16px                       |
| padding: 32px                             |
| box-shadow: lg                            |
| margin-top: 32px                          |
| display: flex, gap: 48px                  |
|                                           |
|    [8]          [4:32]        [92%]       |
|   Cards         Minutes       Correct     |
|   Reviewed      Studied       Rate        |
|                                           |
| Number: Inter 700, 36px, #0F172A          |
| Label: Inter 400, 14px, #64748B           |
|                                           |
| NEXT REVIEWS BOX                          |
| bg: #F1F5F9                               |
| border-radius: 12px                       |
| padding: 24px                             |
| margin-top: 24px                          |
|                                           |
| "Next Reviews"                            |
| Inter 600, 16px, #475569                  |
|                                           |
| Tomorrow:      3 cards                    |
| In 3 days:     4 cards                    |
| In 1 week:     1 card                     |
| Inter 400, 15px, #64748B                  |
| Line-height: 2                            |
|                                           |
| ACTIONS                                   |
| margin-top: 32px                          |
| flex, flex-direction: column, gap: 12px   |
|                                           |
| "Study More Cards"                        |
| Button secondary, h: 52px, w: 300px       |
|                                           |
| "Return to Dashboard"                     |
| Button primary, h: 52px, w: 300px         |
|                                           |
| STREAK                                    |
| [Fire icon] "12 day streak!"              |
| Inter 600, 18px, #D97706                  |
| margin-top: 32px                          |
|                                           |
+------------------------------------------+
```

---

## 5. Mobile Adaptations

### Breakpoint: 375px (iPhone)

```
General Adaptations:
- Remove sidebar
- Add bottom tabs (h: 56px)
- Single column layouts
- Full-width buttons
- Reduced padding (16-24px)
- Font sizes slightly reduced

BOTTOM TABS
+------------------------------------------------------------------+
|   [Home]      [Study]      [+]        [Profile]                  |
|   icon        icon         icon       icon                       |
|   label       label        label      label                      |
|                                                                   |
| Height: 56px                                                      |
| Background: white                                                 |
| Border-top: 1px #E2E8F0                                          |
| Safe-area-inset-bottom (iOS)                                      |
|                                                                   |
| Tab Item:                                                         |
| Icon: 24px                                                        |
| Label: Inter 500, 11px                                           |
| Gap: 4px                                                          |
|                                                                   |
| Active:                                                           |
| Color: #2563EB                                                    |
| Icon: filled variant                                             |
|                                                                   |
| Inactive:                                                         |
| Color: #64748B                                                    |
+------------------------------------------------------------------+

DECK CARDS (Mobile)
- Full width
- Stack vertically
- Increased touch targets
- Swipe actions (optional)

STUDY SESSION (Mobile)
- Card fills most of screen
- Rating buttons: full width, stacked or row
- Larger touch targets (min 48px)
- Swipe gestures: left=hard, right=easy
```

---

## 6. Color Specifications Summary

### Primary Actions
- Background: #2563EB
- Hover: #1D4ED8
- Active: #1E40AF
- Text: white

### Secondary Actions
- Background: white
- Border: #CBD5E1
- Hover background: #F8FAFC
- Text: #475569

### Success States
- Background: #D1FAE5
- Text: #065F46
- Icon: #059669

### Warning States
- Background: #FEF3C7
- Text: #92400E
- Icon: #D97706

### Error States
- Background: #FEE2E2
- Text: #991B1B
- Icon: #DC2626

### Text Hierarchy
- Primary: #0F172A
- Secondary: #475569
- Tertiary: #64748B
- Disabled: #94A3B8
- Placeholder: #94A3B8

---

## 7. Icon Specifications

### Sizes
- XS: 16px (inline, badges)
- SM: 20px (inputs, buttons)
- MD: 24px (navigation, actions)
- LG: 32px (empty states)
- XL: 48px (feature icons)
- 2XL: 64px (illustrations)

### Stroke Width
- Default: 2px
- Fine: 1.5px

### Color Usage
- Interactive: inherit from text
- Decorative: #64748B
- Active: #2563EB
- Success: #10B981
- Warning: #F59E0B
- Error: #EF4444

---

*Especificaciones listas para implementacion en Figma, Sketch, o directamente en codigo*
