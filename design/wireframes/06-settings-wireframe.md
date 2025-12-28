# Wireframe: Settings

**Pantalla:** Settings (/settings)
**Prioridad:** Tier 1 - MVP
**Objetivo:** Gestion de cuenta y suscripcion

---

## Desktop Layout (1440px)

```
+------------------------------------------------------------------+
|                           HEADER                                  |
| [Logo] BrainKit                    [Search]  [Avatar] [+ Create] |
+------------------------------------------------------------------+

+------------------------------------------------------------------+
| SIDEBAR      |               MAIN CONTENT                         |
|              |                                                    |
| [Dashboard]  |  Account Settings                                  |
| [My Decks]   |                                                    |
| [Statistics] |  +----------------------------------------------+  |
|              |  |              PROFILE                          |  |
| ------------ |  |                                               |  |
| ACCOUNT      |  |  +------+                                     |  |
| [Settings]   |  |  |Avatar|  Sarah Chen                         |  |
|  > Active    |  |  | [Ed] |  sarah@hospital.org                 |  |
| [Upgrade]    |  |  +------+                                     |  |
|              |  |                                               |  |
| ------------ |  |  Display Name                                 |  |
|              |  |  +----------------------------------------+   |  |
| [S. Chen]    |  |  | Sarah Chen                             |   |  |
| [Logout]     |  |  +----------------------------------------+   |  |
|              |  |                                               |  |
+--------------|  |  [Save Changes]                               |  |
               |  |                                               |  |
               |  +----------------------------------------------+  |
               |                                                    |
               |  +----------------------------------------------+  |
               |  |            SUBSCRIPTION                       |  |
               |  |                                               |  |
               |  |  Current Plan                                 |  |
               |  |  +----------------------------------------+   |  |
               |  |  | [Crown] PREMIUM                        |   |  |
               |  |  |                                        |   |  |
               |  |  | $9.99/month                            |   |  |
               |  |  | Next billing: January 15, 2025         |   |  |
               |  |  |                                        |   |  |
               |  |  | [Manage Subscription]                  |   |  |
               |  |  +----------------------------------------+   |  |
               |  |                                               |  |
               |  +----------------------------------------------+  |
               |                                                    |
               |  +----------------------------------------------+  |
               |  |              USAGE                            |  |
               |  |                                               |  |
               |  |  (Para usuarios Premium: Sin limites)         |  |
               |  |                                               |  |
               |  |  Generations this month: 12                   |  |
               |  |  Premium: Unlimited                           |  |
               |  |                                               |  |
               |  +----------------------------------------------+  |
               |                                                    |
               |  +----------------------------------------------+  |
               |  |              ACCOUNT                          |  |
               |  |                                               |  |
               |  |  [Change Password]                            |  |
               |  |                                               |  |
               |  |  [Log Out]                                    |  |
               |  |                                               |  |
               |  |  ----------------------------------------     |  |
               |  |  Danger Zone                                  |  |
               |  |                                               |  |
               |  |  [Delete Account]                             |  |
               |  |                                               |  |
               |  +----------------------------------------------+  |
               |                                                    |
+------------------------------------------------------------------+
```

---

## Estado: Usuario Free

```
+----------------------------------------------+
|            SUBSCRIPTION                       |
|                                               |
|  Current Plan                                 |
|  +----------------------------------------+   |
|  | FREE                                   |   |
|  |                                        |   |
|  | 3 mnemonic generations per month       |   |
|  | Basic study features                   |   |
|  +----------------------------------------+   |
|                                               |
|  +----------------------------------------+   |
|  |  Upgrade to Premium                    |   |
|  |                                        |   |
|  |  [Crown] $9.99/month                   |   |
|  |                                        |   |
|  |  [check] Unlimited generations         |   |
|  |  [check] Advanced statistics           |   |
|  |  [check] Priority support              |   |
|  |                                        |   |
|  |  [Upgrade Now ->]                      |   |
|  +----------------------------------------+   |
|                                               |
+----------------------------------------------+

+----------------------------------------------+
|              USAGE                            |
|                                               |
|  Mnemonic Generations                         |
|                                               |
|  [==========                    ] 2 of 3      |
|                                               |
|  Resets on January 1, 2025 (5 days)           |
|                                               |
+----------------------------------------------+
```

---

## Mobile Layout (375px)

```
+--------------------------------+
|           HEADER               |
| [<-]  Settings                 |
+--------------------------------+

+--------------------------------+
|          PROFILE               |
|                                |
|   +------+                     |
|   |Avatar|                     |
|   | [Ed] |                     |
|   +------+                     |
|                                |
|   Sarah Chen                   |
|   sarah@hospital.org           |
|                                |
| Display Name                   |
| +----------------------------+ |
| | Sarah Chen                 | |
| +----------------------------+ |
|                                |
| [Save Changes]                 |
|                                |
+--------------------------------+

+--------------------------------+
|        SUBSCRIPTION            |
|                                |
| Current Plan                   |
| +----------------------------+ |
| | [Crown] PREMIUM            | |
| |                            | |
| | $9.99/month                | |
| | Next: Jan 15, 2025         | |
| |                            | |
| | [Manage Subscription]      | |
| +----------------------------+ |
|                                |
+--------------------------------+

+--------------------------------+
|          ACCOUNT               |
|                                |
| [Change Password]              |
|                                |
| [Log Out]                      |
|                                |
| -------------------------      |
| Danger Zone                    |
|                                |
| [Delete Account]               |
|                                |
+--------------------------------+

+--------------------------------+
|         BOTTOM TABS            |
| [Home]  [Study]  [+]  [Profile]|
+--------------------------------+
```

---

## Componentes Detallados

### Profile Section

```
+----------------------------------------------+
|  PROFILE                                      |
|                                               |
|  +--------+                                   |
|  | Avatar |  <- Clickable to change          |
|  | [Edit] |     Opens file picker             |
|  +--------+                                   |
|                                               |
|  Sarah Chen                    <- H2          |
|  sarah@hospital.org            <- Muted text  |
|                                               |
|  Display Name                  <- Label       |
|  +----------------------------------------+   |
|  | Sarah Chen                             |   |
|  +----------------------------------------+   |
|                                               |
|  [Save Changes]                <- Primary btn |
|                                               |
+----------------------------------------------+

Especificaciones Avatar:
- Size: 80px (desktop), 64px (mobile)
- Border-radius: 50%
- Overlay on hover: "Edit" icon
- File types: jpg, png, webp
- Max size: 2MB
```

### Subscription Card (Premium)

```
+----------------------------------------------+
|  [Crown Icon] PREMIUM              [Badge]    |
|                                               |
|  $9.99/month                                  |
|  Next billing: January 15, 2025              |
|                                               |
|  [Manage Subscription ->]        Secondary    |
+----------------------------------------------+

Especificaciones:
- Background: Gradient or primary tint
- Crown icon: 24px, gold
- Badge: "Active" pill, green
- Manage button: Opens Stripe portal
```

### Subscription Card (Free)

```
+----------------------------------------------+
|  FREE                                         |
|                                               |
|  3 mnemonic generations per month            |
|  Basic study features                        |
+----------------------------------------------+

Especificaciones:
- Background: Gray-50
- No special styling
- Simple text description
```

### Upgrade CTA Card

```
+----------------------------------------------+
|  [Crown Icon]  Upgrade to Premium             |
|                                               |
|  $9.99/month                                  |
|                                               |
|  [check] Unlimited generations                |
|  [check] Advanced statistics                  |
|  [check] Priority support                     |
|                                               |
|  [Upgrade Now ->]                Primary      |
+----------------------------------------------+

Especificaciones:
- Border: Primary color, 2px
- Background: Primary-50 tint
- Checkmarks: Green
- CTA: Primary button, full width
```

### Usage Meter (Free)

```
+----------------------------------------------+
|  Mnemonic Generations                         |
|                                               |
|  [==========                    ]             |
|  2 of 3 used                                  |
|                                               |
|  Resets on January 1, 2025 (5 days)          |
+----------------------------------------------+

Especificaciones:
- Progress bar: Primary color fill
- 3/3: Red color, "Limit reached"
- Reset date: Muted text
```

### Danger Zone

```
+----------------------------------------------+
|  ----------------------------------------     |
|  Danger Zone                    <- Red header |
|                                               |
|  [Delete Account]               <- Red button |
|                                               |
|  This will permanently delete your account    |
|  and all your data.             <- Muted text |
+----------------------------------------------+

Especificaciones:
- Separator: Full width line
- Header: Red-500 text, bold
- Button: Red outline, becomes filled on hover
- Confirmation: Required before action
```

---

## Modal: Delete Account Confirmation

```
+----------------------------------------------+
|  Delete Account?                              |
|                                               |
|  This action is permanent and cannot be       |
|  undone. All your decks, flashcards, and      |
|  progress will be deleted.                    |
|                                               |
|  Type "DELETE" to confirm:                    |
|  +----------------------------------------+   |
|  |                                        |   |
|  +----------------------------------------+   |
|                                               |
|  [Cancel]              [Delete My Account]    |
|  Secondary             Red, disabled until    |
|                        "DELETE" typed         |
+----------------------------------------------+
```

---

## Modal: Change Password

```
+----------------------------------------------+
|  Change Password                              |
|                                               |
|  Current Password                             |
|  +----------------------------------------+   |
|  | ************                     [Eye] |   |
|  +----------------------------------------+   |
|                                               |
|  New Password                                 |
|  +----------------------------------------+   |
|  | ************                     [Eye] |   |
|  +----------------------------------------+   |
|  [=======     ] Strong                        |
|                                               |
|  Confirm New Password                         |
|  +----------------------------------------+   |
|  | ************                     [Eye] |   |
|  +----------------------------------------+   |
|                                               |
|  [Cancel]              [Change Password]      |
+----------------------------------------------+
```

---

## Interacciones

| Elemento | Accion | Resultado |
|----------|--------|-----------|
| Avatar | Click | Open file picker |
| Save Changes | Click | Save profile, show toast |
| Manage Subscription | Click | Open Stripe portal |
| Upgrade Now | Click | Navigate to /upgrade |
| Change Password | Click | Open modal |
| Log Out | Click | Clear session, redirect to landing |
| Delete Account | Click | Open confirmation modal |

---

## Toast Messages

### Success
```
[check] Profile updated successfully
[check] Password changed successfully
```

### Error
```
[!] Failed to update profile. Please try again.
[!] Current password is incorrect.
```

---

## Metricas

| Metrica | Target |
|---------|--------|
| Profile completion | >80% |
| Avatar upload rate | >30% |
| Upgrade clicks | >5% of free users |
| Churn from settings | <2% |
| Password change rate | <5% monthly |
