# Wireframe: Landing Page

**Pantalla:** Landing Page (/)
**Prioridad:** Tier 1 - MVP
**Objetivo:** Convertir visitantes en usuarios registrados

---

## Desktop Layout (1440px)

```
+------------------------------------------------------------------+
|                           HEADER                                  |
| [Logo] BrainKit                      [Sign In]  [Start Free ->]  |
+------------------------------------------------------------------+

+------------------------------------------------------------------+
|                         HERO SECTION                              |
|                                                                   |
|   +---------------------------+  +----------------------------+   |
|   |                           |  |                            |   |
|   | Stop Creating Flashcards. |  |    [Hero Illustration]     |   |
|   | Start Remembering.        |  |                            |   |
|   |                           |  |    App screenshot or       |   |
|   | AI generates mnemonic     |  |    illustrated memory      |   |
|   | techniques and flashcards |  |    palace concept          |   |
|   | from any list. Spaced     |  |                            |   |
|   | repetition handles the    |  |                            |   |
|   | rest.                     |  |                            |   |
|   |                           |  |                            |   |
|   | [Create Your First Deck   |  |                            |   |
|   |  - Free ->]               |  |                            |   |
|   |                           |  |                            |   |
|   +---------------------------+  +----------------------------+   |
|                                                                   |
+------------------------------------------------------------------+

+------------------------------------------------------------------+
|                       HOW IT WORKS                                |
|                                                                   |
|         How it works - 3 simple steps                             |
|                                                                   |
|   +----------------+  +----------------+  +----------------+      |
|   |    [Icon]      |  |    [Icon]      |  |    [Icon]      |      |
|   |                |  |                |  |                |      |
|   | 1. Paste Your  |  | 2. Choose Your |  | 3. Study with  |      |
|   |    List        |  |    Mnemonic    |  |    SRS         |      |
|   |                |  |                |  |                |      |
|   | Paste any list |  | AI generates 3 |  | Spaced repeti- |      |
|   | of procedures, |  | mnemonic tech- |  | tion schedules |      |
|   | medications,   |  | niques. Pick   |  | reviews for    |      |
|   | or protocols.  |  | your favorite. |  | optimal memory.|      |
|   +----------------+  +----------------+  +----------------+      |
|                                                                   |
+------------------------------------------------------------------+

+------------------------------------------------------------------+
|                      SOCIAL PROOF                                 |
|                                                                   |
|            Designed for professionals who can't                   |
|                    afford to forget                               |
|                                                                   |
|   +----------+  +----------+  +----------+  +----------+          |
|   | [Icon]   |  | [Icon]   |  | [Icon]   |  | [Icon]   |          |
|   | Nurses   |  | Pilots   |  | IT Pros  |  | Legal    |          |
|   +----------+  +----------+  +----------+  +----------+          |
|                                                                   |
+------------------------------------------------------------------+

+------------------------------------------------------------------+
|                         PRICING                                   |
|                                                                   |
|                  Simple, transparent pricing                      |
|                                                                   |
|   +---------------------------+  +----------------------------+   |
|   |          FREE             |  |         PREMIUM            |   |
|   |         $0/mo             |  |        $9.99/mo            |   |
|   |                           |  |                            |   |
|   | [check] 3 generations/mo  |  | [check] Unlimited gen.     |   |
|   | [check] Full SRS system   |  | [check] Full SRS system    |   |
|   | [check] Unlimited study   |  | [check] Unlimited study    |   |
|   |                           |  | [check] Advanced stats     |   |
|   |                           |  | [check] Priority support   |   |
|   |                           |  |                            |   |
|   | [Start Free ->]           |  | [Start Free, Upgrade Later]|   |
|   +---------------------------+  +----------------------------+   |
|                                                                   |
+------------------------------------------------------------------+

+------------------------------------------------------------------+
|                          FOOTER                                   |
|                                                                   |
|   BrainKit                Privacy | Terms | Contact               |
|                                                                   |
|   (c) 2025 BrainKit. All rights reserved.                        |
+------------------------------------------------------------------+
```

---

## Mobile Layout (375px)

```
+--------------------------------+
|           HEADER               |
| [Logo]              [Menu ===] |
+--------------------------------+

+--------------------------------+
|         HERO SECTION           |
|                                |
| Stop Creating                  |
| Flashcards.                    |
| Start Remembering.             |
|                                |
| AI generates mnemonic          |
| techniques and flashcards      |
| from any list. Spaced          |
| repetition handles the rest.   |
|                                |
| [Create Your First Deck        |
|  - Free ->                   ] |
|                                |
| +----------------------------+ |
| |    [Hero Illustration]     | |
| |                            | |
| +----------------------------+ |
|                                |
+--------------------------------+

+--------------------------------+
|       HOW IT WORKS             |
|                                |
|    How it works                |
|                                |
| +----------------------------+ |
| |         [Icon]             | |
| |    1. Paste Your List      | |
| |    Description text...     | |
| +----------------------------+ |
|                                |
| +----------------------------+ |
| |         [Icon]             | |
| |   2. Choose Your Mnemonic  | |
| |    Description text...     | |
| +----------------------------+ |
|                                |
| +----------------------------+ |
| |         [Icon]             | |
| |    3. Study with SRS       | |
| |    Description text...     | |
| +----------------------------+ |
|                                |
+--------------------------------+

+--------------------------------+
|       SOCIAL PROOF             |
|                                |
|  Designed for professionals    |
|  who can't afford to forget    |
|                                |
| [Nurse] [Pilot] [IT] [Legal]   |
|                                |
+--------------------------------+

+--------------------------------+
|         PRICING                |
|                                |
| +----------------------------+ |
| |          FREE              | |
| |         $0/mo              | |
| |                            | |
| | [check] 3 generations/mo   | |
| | [check] Full SRS system    | |
| | [check] Unlimited study    | |
| |                            | |
| | [Start Free ->]            | |
| +----------------------------+ |
|                                |
| +----------------------------+ |
| |        PREMIUM             | |
| |       $9.99/mo             | |
| |                            | |
| | [check] Unlimited gen.     | |
| | [check] Advanced stats     | |
| | [check] Priority support   | |
| |                            | |
| | [Start Free, Upgrade Later]| |
| +----------------------------+ |
|                                |
+--------------------------------+

+--------------------------------+
|          FOOTER                |
|                                |
| Privacy | Terms | Contact      |
|                                |
| (c) 2025 BrainKit              |
+--------------------------------+
```

---

## Especificaciones de Componentes

### Header
- **Logo:** Izquierda, clickeable -> home
- **Sign In:** Link secundario, texto
- **Start Free:** Button primario, prominente
- **Sticky:** Si, despues de scroll

### Hero Section
- **Headline:** H1, maximo 8 palabras
- **Subheadline:** Texto, maximo 25 palabras
- **CTA:** Button primario, full-width mobile
- **Ilustracion:** 50% ancho desktop, 100% mobile

### How It Works
- **Icons:** 48x48px, color primario
- **Titles:** H3, bold
- **Descriptions:** Texto regular, 2-3 lineas max
- **Layout:** 3 columnas desktop, stack mobile

### Social Proof
- **Icons:** Profesiones, 32x32px
- **Labels:** Texto small, subtle

### Pricing Cards
- **Border:** 1px border, radius 12px
- **Premium:** Highlighted (border color primario)
- **Checkmarks:** Color verde exito
- **CTAs:** Button en cada card

### Footer
- **Links:** Texto small, hover underline
- **Copyright:** Texto xs, color subtle

---

## Interacciones

| Elemento | Accion | Resultado |
|----------|--------|-----------|
| "Start Free" | Click | Redirect a /register |
| "Sign In" | Click | Redirect a /login |
| Logo | Click | Scroll to top / Home |
| Pricing CTA | Click | Redirect a /register |
| Menu mobile | Click | Open mobile menu |

---

## Copy Principal (Texto Sugerido)

### Headline
> Stop Creating Flashcards. Start Remembering.

### Subheadline
> AI generates mnemonic techniques and flashcards from any list. Spaced repetition handles the rest.

### CTA Principal
> Create Your First Deck - Free

### How It Works

**Paso 1: Paste Your List**
> Paste any list of procedures, medications, protocols, or technical knowledge you need to memorize.

**Paso 2: Choose Your Mnemonic**
> AI instantly generates 3 different mnemonic techniques. Pick the one that clicks with your brain.

**Paso 3: Study with Spaced Repetition**
> Auto-generated flashcards + scientifically-proven spacing. Retain 95%+ without the guesswork.

---

## Metricas de Exito

| Metrica | Target | Benchmark |
|---------|--------|-----------|
| Visitor to Signup | 10% | 8% (Quizlet) |
| Time on Page | >60s | Industry avg |
| Scroll Depth | >75% | To pricing section |
| CTA Clicks | 15% visitors | Industry avg |
