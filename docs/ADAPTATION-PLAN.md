# Skiper UI Adaptation Plan — 11 PM Snacks

This document outlines the architectural adaptation plan for rebuilding the 11 PM Snacks web experience using five Skiper UI-style interaction patterns.

---

## 1. Component Mapping & Acquisition Plan

| Effect Name | Skiper ID | Path A (CLI) | Path B (Original Equivalent) |
| :--- | :--- | :--- | :--- |
| **Words Preloader** | `#8` (`skiper8`) | Authenticate Skiper CLI → `npx shadcn add @skiper-ui/skiper8` | Custom Framer Motion SVG path-morph overlay |
| **Hover Members** | `#6` (`skiper6`) | Authenticate Skiper CLI → `npx shadcn add @skiper-ui/skiper6` | Custom reactive spring-lift typography stage |
| **Siena Parallax** | `#29` (`skiper29`) | Authenticate Skiper CLI → `npx shadcn add @skiper-ui/skiper29` | Lenis + GSAP / Framer Motion scroll-scrub mask |
| **Apple Feature Block** | `#76` (`skiper76`) | Authenticate Skiper CLI → `npx shadcn add @skiper-ui/skiper76` | Bento architecture with interactive pill switcher |
| **Canvas Crowd** | `#39` (`skiper39`) | **Free**: `npx shadcn add "https://skiper-ui.com/r/skiper39.json"` | Installed into `components/ui/skiper-ui/skiper39.tsx` |

---

## 2. Adaptation Matrix for 11 PM SNACKS

### 1. Words Preloader (`#8`)
* **Origin**: Fast cycling typography intro with curved SVG reveal wipe.
* **Data & Text**: 
  - Rapid word progression (250–300 ms each): `Crave` → `Crunch` → `कुरकुरा` → `चटपटा` → `मसाला` → `Pop` → `11 PM SNACKS` (hold 0.4s).
  - Ticking clock icon (🕒) replaces traditional generic dot dividers.
* **Colours**:
  - Full-screen Midnight Ink (`#14102B`) backdrop.
  - Text rendered in warm Cream (`#FFF4DC`) and Cheddar Gold (`#FFC21A`).
* **Images**:
  - Preloads hero pouch WebP images (`/images/peri-peri.webp`, etc.) in the background during the 3-second cycle.
* **Mobile Behaviour**:
  - Auto-scales typography using CSS `clamp(2rem, 8vw, 4.5rem)` so Hindi and English glyphs never wrap awkwardly on portrait screens.
* **Reduced Motion & A11y**:
  - Automatically skipped if `prefers-reduced-motion` is active.
  - `sessionStorage` flag ensures it plays only once per session.
  - Keyboard accessible "Skip" button (`Tab` + `Enter`).
  - Underlying DOM stays mounted with zero layout shift for screen readers and SEO.

---

### 2. Hover Members Hero (`#6`)
* **Origin**: Interactive team/portfolio member grid that morphs central headlines on hover.
* **Data & Text**:
  - Replaces team members with the three signature 11 PM popcorn flavours:
    1. **Peri Peri** (*The Firestarter*)
    2. **Tangy Tomato** (*The Mood Lifter*)
    3. **Cheddar Cheese** (*The Comfort One*)
  - Monumental headline swaps dynamically: `11 PM SNACKS` → `PERI PERI` / `TANGY TOMATO` / `CHEDDAR CHEESE`.
* **Colours**:
  - Dynamic ambient radial glow matching active flavour:
    - Peri Peri: `#FF4B1F` (18% opacity)
    - Tangy Tomato: `#E5262F` (18% opacity)
    - Cheddar Cheese: `#FFC21A` (22% opacity)
  - Midnight Ink neobrutalist borders (`border-[2.5px] border-[#14102B]`).
* **Images**:
  - Uses 3:2 standardized WebP pouches (`peri-peri-showcase.webp`, `tangy-tomato-showcase.webp`, `cheddar-cheese-showcase.webp`).
  - Tactile sticker cards with `shadow-[5px_5px_0px_#14102B]`.
* **Mobile Behaviour**:
  - Converts from desktop hover to touch-swipe / tap selection.
  - Equal height and width cards maintain alignment across smaller viewports.
* **Reduced Motion**:
  - Disables spring-lift transform (`y: -18px`); swaps opacity cleanly.

---

### 3. Siena Parallax (`#29`)
* **Origin**: Scroll-driven documentary scale mask expanding from a framed box to full bleed.
* **Data & Text**:
  - Copy: *"Big Flavour. Thoughtful Oil. Whole grain corn blossoms tumbling in authentic spice blends."*
  - Badge: *"Kettle Popped · Gurugram, India"*.
* **Colours**:
  - Cream border frame (`border-[#FFF4DC]/30`) on deep Midnight Ink backdrop with subtle contrast gradient overlay.
* **Images**:
  - Consumes `/images/cascade.webp` (high-res tumbling seasoned kernels with spice dust).
* **Mobile Behaviour**:
  - Bounds scale factor between `1.0` and `1.05` on mobile to prevent GPU texture lag.
* **Reduced Motion**:
  - Renders a static framed card without scroll-scrub scaling.

---

### 4. Apple Feature Block (`#76`)
* **Origin**: Bento-style hardware architecture feature showcase with interactive variant toggle.
* **Data & Text**:
  - Flavour toggle pills: *Peri Peri*, *Tangy Tomato*, *Cheddar Cheese*.
  - Strict guardrail: **No prices, no pack sizes, no buy buttons**.
  - Exclusively displays *"Coming Soon — Batch 01 Dropping Soon"* and a direct link to the *"Notify Me"* early access capture.
  - Displays three tactile sensory meters: Heat, Tang, and Crunch/Cheese.
* **Colours**:
  - Bento card: Crisp white with Midnight Ink borders (`border-[3px] border-[#14102B]`).
  - Side cards: Midnight Ink (`#14102B`) with Cheddar Gold accents (`#FFC21A`).
* **Images**:
  - 3:2 framed pouch visuals with shadow stamps.
* **Mobile Behaviour**:
  - Bento cards collapse gracefully from 12-column grid into single-column stacked cards.
* **Reduced Motion**:
  - Simple instant tab switching without sliding transitions.

---

### 5. Canvas Crowd (`#39`)
* **Origin**: HTML5 Canvas rendering walking pedestrian sprites with GSAP timelines.
* **Data & Text**:
  - Paired with an overlaid narrative track articulating the 11 PM brand promise:
    > *"Most people today eat without checking whether it is good for them. With 11 PM you only have to crave; we take care of the rest, the way a mother would. Real sunflower oil, no palm oil, small batches in Gurugram."*
* **Colours**:
  - Midnight Ink backdrop with walking silhouettes in neutral tones.
* **Images**:
  - Open Peeps sprite sheet (`/images/peeps/all-peeps.png`, 15 rows × 7 cols).
* **Mobile Behaviour**:
  - Reduces crowd density by 50% on mobile viewports to maintain smooth 60fps canvas performance and conserve battery.
* **Reduced Motion**:
  - Pauses walking GSAP timeline; renders a relaxed stationary crowd tableau or clean static graphic.

---

## 3. Strict Brand Guardrails

1. **Zero Prices & Pack Sizes**: All references to grams, packs, and rupee amounts are omitted. Replaced with *"Coming Soon"* badges and *"Notify Me"* triggers.
2. **Zero Invented Facts**: Lab nutrition values and certifications maintain transparent placeholders (`[TODO: verified]`) logged in `/content/TODO.md`.
3. **Attribution**: Skiper UI and Open Peeps are formally acknowledged in `CREDITS.md` and the website footer.
