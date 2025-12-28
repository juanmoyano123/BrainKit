# BrainKit - Prototipos HTML/CSS/JS

Este directorio contiene bocetos estáticos de las pantallas principales de BrainKit, creados únicamente con HTML, CSS y JavaScript vanilla (sin funcionalidad backend).

## 📁 Archivos

### 01-landing.html
**Landing Page**
- Hero section con propuesta de valor
- "How it works" - 3 pasos
- Social proof (profesiones)
- Pricing cards (Free vs Premium)
- Footer

### 02-dashboard.html
**Dashboard con Decks**
- Sidebar de navegación (desktop)
- Summary bar con streak y cards due
- Grid de deck cards con estados
- Quick stats
- Layout responsive (desktop/mobile)

### 03-deck-detail.html
**Deck Detail - Selección de Mnemotecnias**
- Selección de 3 mnemonic cards (Acrostic, Story, Visual)
- Interacción de selección (click para seleccionar)
- Cards dimmed cuando se selecciona una opción
- Botón "Continue to Flashcards" aparece al seleccionar

### 04-study-session.html
**Study Session con Flashcards**
- Flashcard con flip animation (click o SPACE)
- Rating buttons (Hard/Good/Easy)
- Keyboard shortcuts (1, 3, 5)
- Progress bar animada
- Completion screen con stats
- Totalmente interactivo

## 🎨 Design System

Todos los prototipos siguen fielmente el **Design System** documentado en `/design/design-system.md`:

- **Colores**: Azul primario (#2563EB), verdes/amarillos/rojos semánticos, escala de grises
- **Tipografía**: Inter (Google Fonts)
- **Espaciado**: Sistema basado en 4px (Tailwind-style)
- **Componentes**: Buttons, Cards, Badges, Progress bars
- **Animaciones**: Transitions sutiles (150-300ms)

## 🚀 Cómo usar

1. **Abrir en navegador**:
   ```bash
   open 01-landing.html
   ```

2. **Live Server** (recomendado):
   - Usar extensión Live Server en VS Code
   - Click derecho → "Open with Live Server"

3. **Navegar entre pantallas**:
   - Los prototipos NO están conectados entre sí
   - Cada archivo es independiente
   - Los links son placeholders (`href="#"`)

## ✨ Funcionalidad Interactiva

### 03-deck-detail.html
- ✅ Click en mnemonic card para seleccionar
- ✅ Otras cards se atenúan (dimmed)
- ✅ Botón "Continue" aparece al seleccionar

### 04-study-session.html
- ✅ Click en flashcard o SPACE para flip
- ✅ Rating buttons funcionales
- ✅ Keyboard shortcuts (1, 3, 5)
- ✅ Progress bar animada
- ✅ Completion screen después de 8 cards

## 📱 Responsive Design

Todos los prototipos son responsive:
- **Desktop**: 1024px+ (sidebar, grid de 3 columnas)
- **Tablet**: 640-1023px (grid de 2 columnas)
- **Mobile**: <640px (stack, 1 columna)

## 🔧 Tecnologías

- **HTML5** puro
- **CSS3** (variables CSS, grid, flexbox, animations)
- **JavaScript** vanilla (sin frameworks)
- **Google Fonts** (Inter)

## 📝 Notas

- **Sin backend**: Solo maquetación visual
- **Sin persistencia**: Los datos son hardcoded
- **Sin routing**: Cada página es independiente
- **Sin validación**: Los forms no envían datos

## 🎯 Propósito

Estos prototipos sirven para:
1. **Validar visualmente** el design system
2. **Testear interacciones** básicas
3. **Compartir con stakeholders** sin deploy
4. **Referencia para implementación** con Next.js + Supabase

---

**Generado el**: 2025-12-27
**Basado en**: design-system.md, wireframes/, mockups/
