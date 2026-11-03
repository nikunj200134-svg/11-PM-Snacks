# PATTERN SPECIFICATIONS (/references/PATTERNS.md)

This document defines the generic interaction, layout, motion, and accessibility patterns for all 10 architectural UI slots. In accordance with strict guidelines, all patterns are described generically with zero brand names, site-specific copy, proprietary colors, illustrations, or production code.

---

## Clarifications & Initial Audit Notes
> **Audit Status:**
> - `/references/REFERENCES.md` was read and confirmed to be an empty file (0 bytes).
> - Subfolders `slot-1` through `slot-10` contain no local screenshot image files.
> - The specifications below are formulated directly from the 10 defined slot archetypes established in the reference curation phase.
>
> **Questions for Next Phase:**
> 1. *Scroll Storytelling (Slot 3):* Do you prefer a pure CSS sticky approach (`position: sticky`) with standard viewport intersection observers, or do you require a full scrubbed GSAP `ScrollTrigger` timeline with pinned canvas stages?
> 2. *Product Switcher (Slot 2):* Should the chromatic background shift apply strictly to the component container, or should it bleed to adjacent section bands via CSS variables?
> 3. *Motion Philosophy:* For low-power and mobile performance, should ambient floating animations (Slot 1, Slot 4, Slot 10) default to lightweight hardware-accelerated CSS keyframes, reserving Framer Motion strictly for user-driven interactions?

---

## Slot 1: Hero — Oversized Headline & Dynamic Product Focal Point

### 1. Underlying Pattern (Plain Words)
An assertive introductory viewport section pairing an oversized, characterful display headline with an elevated, centrally staged product visual. The focal product is framed by floating supporting elements (ingredient accents, certification badges, and depth particles) that immediately establish product category, appetite appeal, and brand attitude within the first three seconds of viewing.

### 2. Layout Structure
- **Desktop:** A two-column or balanced asymmetric grid. The primary column contains the text hierarchy: category eyebrow, high-impact display headline, concise lede paragraph, and a grouped primary/secondary CTA pair. The secondary column showcases an isolated product visual hovering over an ambient focal glow, flanked by 2–3 positioned callout badges.
- **Mobile:** A single vertical stack. The eyebrow and headline lead at the top, immediately followed by the product visual (scaled to ~70–80vw for instant visual connection), with the supporting lede copy and full-width stacked CTA buttons anchored above the fold.

### 3. Motion Specifications
- **Trigger:** Page load / component mount.
- **Headline & Text Stack:** Staggered fade and slide-up. Duration: `0.6s`. Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (easeOut). Offset: `translateY(24px) -> translateY(0px)`. Stagger delay: `0.08s` between text lines.
- **Product Visual:** Scale and opacity entrance (`scale(0.92) -> scale(1)`, `opacity: 0 -> 1`, duration: `0.8s`, easeOut), transitioning seamlessly into an ambient continuous float (`translateY(0px)` to `translateY(-10px)` and back, duration: `4.5s`, `easeInOut`, infinite loop).
- **Floating Badges:** Delayed entrance (delay: `0.4s`, duration: `0.5s`) with gentle counter-floating vertical translation (`translateY(0px)` to `translateY(6px)`, duration: `5s`, infinite loop).

### 4. Guiding the Eye & Driving the Click
The viewer's gaze lands on the contrasting central product visual, moves immediately left to the oversized display headline for context, tracks down through the concise value statement, and terminates at the high-contrast primary CTA button. Peripheral floating badges pull the eye outward to confirm product credibility before refocusing on the action button.

### 5. Accessibility Risks & Reduced-Motion Alternatives
- **Risks:** Continuous infinite floating can trigger vestibular disorientation; low-contrast text over layered graphic elements; decorative badge images lacking proper accessibility tagging.
- **Reduced-Motion Alternative:** Deactivate all infinite translation loops; replace entrance slide offsets with a brief static opacity fade (`opacity: 0 -> 1` in `0.2s`); guarantee all text layers sit on high-contrast solid backgrounds with proper semantic heading rank (`h1`).

### 6. Implementation Architecture (Next.js, Tailwind, Framer Motion)
- **Next.js:** Server component hosting an optimized `<Image priority />` element to ensure optimal Largest Contentful Paint (LCP).
- **Tailwind:** Responsive grid utilities (`grid grid-cols-1 lg:grid-cols-2 items-center min-h-[85vh] gap-8`).
- **Framer Motion / CSS:** Simple `motion.div` for initial staggered entry; ambient floating handled via pure CSS `@keyframes` with `will-change: transform` to eliminate JavaScript main-thread overhead.

---

## Slot 2: Flavour or Product Switcher — Interactive Variant Selector with Color Morph

### 1. Underlying Pattern (Plain Words)
An interactive preview module where selecting different product variants updates the product render and nutritional descriptors in real time while dynamically transitioning the contextual background color palette of the container to match the selected variant's flavor profile.

### 2. Layout Structure
- **Desktop:** A two-column split card. The left column contains an interactive selector bar (pill tabs or color swatches), variant title, sensory tasting notes, key nutrition metrics, and an immediate purchase action. The right column houses an isolated high-resolution product shot that swaps smoothly.
- **Mobile:** Vertical stacked card. The variant switcher tabs sit fixed or horizontally scrollable at the top, followed by the central product visual, with flavor copy, nutrition stats, and full-width purchase CTA stacked underneath.

### 3. Motion Specifications
- **Trigger:** User tap, click, or keyboard navigation on variant selector pills.
- **Background Palette Morph:** Container background color transition. Duration: `0.45s`. Easing: `easeInOut`. Transition: smooth interpolation of background color tokens.
- **Product Visual Swap:** Current variant exits with `scale(0.95)`, `opacity: 0`, and slight lateral offset (`x: -16px`) in `0.2s`. New variant enters with `scale(1.04) -> scale(1)`, `opacity: 0 -> 1`, and `x: 16px -> 0px` in `0.3s` using spring dynamics (`damping: 24, stiffness: 260`).
- **Textual Details:** Instant crossfade (`opacity: 0 -> 1`, duration: `0.2s`, `easeOut`).

### 4. Guiding the Eye & Driving the Click
The responsive full-canvas color shift provides immediate positive visual feedback, gamifying the discovery process. The user's eye bounces between the variant selector, the dynamic product transformation, and the reactive CTA button, building purchase confidence without navigating away from the page.

### 5. Accessibility Risks & Reduced-Motion Alternatives
- **Risks:** Rapid full-screen color changes can cause sensory fatigue or fail WCAG contrast ratios if foreground text color does not update synchronously; tabs must support full keyboard navigation (`role="tablist"`, `role="tab"`, `aria-selected="true"`).
- **Reduced-Motion Alternative:** Disable lateral slide and scaling on the product image; swap images with an instantaneous opacity fade; keep container background color neutral, expressing flavor differentiation solely through static border accents or badge highlights.

### 6. Implementation Architecture (Next.js, Tailwind, Framer Motion)
- **Next.js:** Client component (`'use client'`) maintaining active index state (`const [active, setActive] = useState(0)`).
- **Tailwind:** Inline dynamic style or CSS variables for background transition (`transition-colors duration-500 ease-in-out`).
- **Framer Motion:** `<AnimatePresence mode="wait">` wrapping `<motion.div key={activeVariant.id}>` for seamless exit/entry lifecycle orchestration.

---

## Slot 3: Scroll Storytelling — Pinned Canvas with Step-by-Step Narrative

### 1. Underlying Pattern (Plain Words)
A synchronized narrative sequence where a central product or process visual stays pinned in the viewport while the user scrolls vertically, serving as a stable anchor while sequential process chapters, annotations, and ingredient milestones scroll past and trigger coordinated visual transformations.

### 2. Layout Structure
- **Desktop:** A 50/50 split-screen container. The left side is a viewport-height sticky column holding the pinned product visual and dynamic step indicators. The right side is a tall vertical scroll track with distinct story stages spaced 80vh–100vh apart, each featuring step counters, headers, descriptive text, and technical chips.
- **Mobile:** Linear step cards with sticky progress indicator, or a horizontal swipeable card track with pagination indicators to avoid excessive vertical scrolling on handheld touchscreens.

### 3. Motion Specifications
- **Trigger:** Scroll progress within container bounds (`ScrollTrigger` or scroll progress observer).
- **Pinning Lifecycle:** Visual container pins at `top: 0` when the section header hits the viewport top and unpins when the final chapter reaches completion. Distance: `250vh` to `350vh` of total scroll distance.
- **Step Transitions:** As each chapter reaches 50% viewport height, its opacity transitions (`opacity: 0.15 -> 1.0`, duration: scrubbed over 100px of scroll) while previous chapters dim (`opacity: 1.0 -> 0.15`).
- **Graphic Accents:** Pinned visual updates its highlight mask or micro-rotation (`rotate: 0deg -> 5deg`) in sync with the active process step.

### 4. Guiding the Eye & Driving the Click
Pinning the visual eliminates scroll fatigue by providing a persistent resting point for the eyes while the informative copy advances. The explicit step counter (e.g., 01 to 04) creates an intuitive narrative closure that naturally culminates in a "Taste the Craft" conversion button at the end of the timeline.

### 5. Accessibility Risks & Reduced-Motion Alternatives
- **Risks:** Scroll-hijacking can trap keyboard users or cause disorientation for screen reader users; scrubbed motion can trigger nausea in users with vestibular sensitivity.
- **Reduced-Motion Alternative:** Unpin the layout entirely; render chapters as a clean vertical ordered list or 4-column card grid with static imagery, semantic headings (`h3`), and zero scroll-tied coordinate transformations.

### 6. Implementation Architecture (Next.js, Tailwind, Framer Motion / GSAP)
- **Next.js & Tailwind:** Tall relative outer wrapper (`relative h-[300vh]`) paired with a sticky viewport column (`sticky top-0 h-screen flex items-center justify-center`).
- **Motion Engine:** Framer Motion `useScroll({ target: containerRef })` with `useTransform` for scroll-linked chapter opacity, or GSAP `ScrollTrigger.create({ trigger, pin, scrub: true })` for strict desktop coordinate locking.

---

## Slot 4: Marquee & Expressive Type — High-Velocity Tickers & Bold Ribbons

### 1. Underlying Pattern (Plain Words)
Continuous moving text ribbons and oversized poster-scale display headings spanning edge-to-edge. These banners utilize rhythmic punctuation symbols (stars, bullets, glyphs) and opposing motion vectors to inject energy, brand voice, and persistent value propositions across section breaks.

### 2. Layout Structure
- **Desktop:** Full-bleed horizontal ribbons spanning 100vw, placed as section transitions or under the hero. Frequently configured as dual stacked tracks running in opposing directions (Track 1 moving left, Track 2 moving right) with a subtle rotational angle (-2° to 2°) to disrupt strict horizontal layout lines.
- **Mobile:** Identical full-bleed container with typography scaled proportionally down (e.g. from 3rem to 1.5rem) to ensure 2–3 words and separation glyphs remain visible simultaneously on compact screens.

### 3. Motion Specifications
- **Trigger:** Continuous ambient playback upon mount; optionally pauses or decelerates on pointer hover or touch focus.
- **Translation:** Continuous horizontal shift along the X axis (`translateX(0%) -> translateX(-50%)`). Duration: `18s` to `26s` per cycle depending on content length. Easing: `linear`. Repeat: `Infinity`.
- **Hover Micro-State:** Motion decelerates smoothly to 0.25x speed over `0.4s` (`easeOut`) when hovered.

### 4. Guiding the Eye & Driving the Click
Horizontal movement creates an immediate contrast against the vertical scrolling habit, functioning as an intentional visual pause that pulls wandering eyes back to core product claims (e.g., protein metrics, clean oils, artisanal pop).

### 5. Accessibility Risks & Reduced-Motion Alternatives
- **Risks:** Direct failure of WCAG 2.2.2 (Pause, Stop, Hide) if continuous motion cannot be stopped; severe distraction for cognitive disabilities.
- **Reduced-Motion Alternative:** Automatically pause motion when `prefers-reduced-motion: reduce` is detected; render text as a clean static centered wrap with bullet dividers; provide an explicit accessible pause button if active by default.

### 6. Implementation Architecture (Next.js, Tailwind, Framer Motion)
- **Tailwind:** Overflow-hidden flex wrapper (`overflow-hidden whitespace-nowrap select-none flex w-full`).
- **Next.js & Motion:** Two identical content fragments inside a flex row animated via hardware-accelerated CSS keyframe `@keyframes marquee { 0% { transform: translate3d(0,0,0); } 100% { transform: translate3d(-50%,0,0); } }` to avoid JavaScript thread congestion.

---

## Slot 5: Pack & Pricing Cards — Tiered Bundle Architecture & Direct Purchase

### 1. Underlying Pattern (Plain Words)
A structured product comparison grid presenting purchasing tiers (single unit, multipack bundle, variety crate). Each card provides structured information hierarchy: pack photography, prominent value badges, per-serving price transparency, purchase cadence selectors (one-time vs. recurring), and full-width purchase buttons.

### 2. Layout Structure
- **Desktop:** 2 to 3 equal-height vertical cards in an aligned grid. The flagship or most economical tier is highlighted via an elevated border, subtle vertical offset (`translate-y-[-8px]`), or top badge ribbon.
- **Mobile:** Vertically stacked cards or a horizontal snap carousel (`snap-x mandatory w-[85vw]`) with peek margins that allow effortless thumb-swiping between options.

### 3. Motion Specifications
- **Trigger:** Pointer hover (desktop), touch active state (mobile), and toggle click.
- **Card Hover Elevation:** Card elevates upward (`y: 0px -> -6px`), drop shadow expands (`0 4px 12px -> 0 16px 32px rgba(0,0,0,0.08)`). Duration: `0.25s`. Easing: `cubic-bezier(0.2, 0.8, 0.2, 1)`.
- **Cadence Switcher:** Sliding pill background moves laterally between purchase options (`x: 0 -> 100%`). Duration: `0.2s`. Easing: `easeInOut`.
- **Button Press:** Button scales down slightly on press (`scale(0.97)`, `0.08s`), rebounding instantly on release.

### 4. Guiding the Eye & Driving the Click
The "Best Value" ribbon acts as the primary visual entry point. The eye tracks from the pack shot down to the total price, notes the per-unit savings badge, and lands on the prominent, full-width CTA button.

### 5. Accessibility Risks & Reduced-Motion Alternatives
- **Risks:** Screen readers missing context if radio toggles lack explicit labels (`aria-checked`, `role="radiogroup"`); price changes failing to announce dynamically via live regions.
- **Reduced-Motion Alternative:** Maintain static card elevation without hover translation; indicate focus and selection through high-contrast solid borders (`border-2`) and focus rings (`focus-visible:ring-2`).

### 6. Implementation Architecture (Next.js, Tailwind, Framer Motion)
- **Next.js & Tailwind:** Standard responsive grid (`grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch`). Cards use Tailwind hover and transition utilities (`transition-all duration-200 hover:-translate-y-1.5 hover:shadow-xl`).
- **Framer Motion:** Micro-interactions on buttons via `motion.button` with `whileTap={{ scale: 0.98 }}`.

---

## Slot 6: Social Proof — Tiered Trust Matrix & UGC Media Grid

### 1. Underlying Pattern (Plain Words)
A comprehensive credibility block combining three complementary layers of proof: quantitative verification (aggregate star ratings, verified buyer count), authoritative media badges, and an authentic masonry photo/quote grid featuring real customers in candid snacking settings.

### 2. Layout Structure
- **Desktop:** Three-tier vertical layout: (1) Centered star rating and verified count header above press quote strip; (2) 3-column masonry or grid displaying customer photos with quote overlays; (3) community hashtag CTA.
- **Mobile:** Stacked rating summary header followed by a horizontal swipeable customer card carousel with snap points (`snap-x mandatory`).

### 3. Motion Specifications
- **Trigger:** Viewport scroll entry and pointer hover.
- **Grid Item Entrance:** Staggered fade and slide-up as cards cross viewport threshold (`opacity: 0 -> 1`, `y: 20px -> 0px`). Duration: `0.4s`. Easing: `easeOut`. Stagger: `0.05s`.
- **Card Hover:** Background photo zooms subtly (`scale(1) -> scale(1.04)`) inside an `overflow-hidden` container while the review text card elevates slightly. Duration: `0.3s`. Easing: `easeOut`.

### 4. Guiding the Eye & Driving the Click
Numerical ratings provide immediate rational reassurance; lifestyle imagery triggers emotional identification (seeing real people enjoying the product); succinct quotes resolve lingering taste or digestive doubts, nudging the user to purchase.

### 5. Accessibility Risks & Reduced-Motion Alternatives
- **Risks:** Missing descriptive `alt` text on user-generated photos; text placed directly over busy photography with poor contrast; auto-rotating sliders that steal keyboard focus.
- **Reduced-Motion Alternative:** Static grid layout without entrance staggers; hover zoom disabled; quotes placed on solid high-contrast background cards underneath images rather than transparent overlays.

### 6. Implementation Architecture (Next.js, Tailwind, Framer Motion)
- **Tailwind:** Responsive CSS grid (`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`).
- **Next.js:** `<Image sizes="(max-width: 768px) 100vw, 33vw" />` for optimized asset delivery.
- **Framer Motion:** `motion.div` with `whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}`.

---

## Slot 7: FAQ & Footer — Approachable Accordion & Monumental Grounding

### 1. Underlying Pattern (Plain Words)
A cohesive closing system composed of: (1) a welcoming, rounded accordion addressing essential ingredient, allergen, and shipping questions with conversational clarity; and (2) an expansive, high-contrast footer featuring an edge-to-edge brand wordmark, newsletter invitation, structured sitemap columns, and regulatory compliance marks.

### 2. Layout Structure
- **Desktop:**
  - *FAQ:* Centered narrow container (max-width ~720px) with bubble accordion rows.
  - *Footer:* Wide multi-column layout with brand mission and newsletter signup on the left, 3–4 categorized link columns in the center, and legal/regulatory marks in a pinned bottom strip.
- **Mobile:**
  - *FAQ:* Full-width accordion rows with touch targets exceeding 48px.
  - *Footer:* Stacked single-column hierarchy: newsletter block ➔ collapsible link stacks ➔ centered legal/compliance footer bar.

### 3. Motion Specifications
- **Trigger:** Click or keyboard activation (`Enter` / `Space`) on accordion headers.
- **Accordion Expansion:** Container height interpolates from `0` to `auto` (or scrollHeight). Duration: `0.28s`. Easing: `cubic-bezier(0.4, 0, 0.2, 1)`. Content fades in (`opacity: 0 -> 1`, duration: `0.2s`).
- **Accordion Indicator Icon:** Rotates from `0deg` to `180deg` (or `0deg` to `45deg` for plus-to-close icons). Duration: `0.2s`. Easing: `easeInOut`.
- **Footer Link Hover:** Subtle lateral translation (`x: 0px -> 4px`) with color transition. Duration: `0.15s`. Easing: `easeOut`.

### 4. Guiding the Eye & Driving the Click
The FAQ resolves final checkout hesitations (shipping times, freshness, dietary safety). The monumental footer acts as a visual anchor that establishes organizational legitimacy and provides secondary exploration links, ensuring no user reaches an unresolved dead end.

### 5. Accessibility Risks & Reduced-Motion Alternatives
- **Risks:** Missing semantic ARIA attributes (`aria-expanded`, `aria-controls`); low-contrast text on dark footer backgrounds; keyboard focus traps.
- **Reduced-Motion Alternative:** Instant display toggle without height interpolation (`display: none` to `display: block`); static indicator icons that swap glyphs instantly; semantic reliance on HTML `<details>` and `<summary>` elements.

### 6. Implementation Architecture (Next.js, Tailwind, Framer Motion)
- **Semantic / Lightweight:** Native HTML `<details className="group border rounded-xl p-4">` with `<summary className="cursor-pointer list-none flex justify-between font-bold">`.
- **Framer Motion Alternative:** `<AnimatePresence>` wrapping `<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>`.

---

## Slot 8: Navigation & Mobile Menu — Floating Command Bar & Full-Screen Visual Drawer

### 1. Underlying Pattern (Plain Words)
A persistent navigation header anchored at the top of the viewport with frosted glass translucency that maintains access to primary category links, cart state, and purchase CTAs, paired with a full-screen slide-down drawer on mobile featuring visual product shortcuts and oversized type.

### 2. Layout Structure
- **Desktop:** Centered floating pill or top bar. Brand mark anchored on the left, primary navigation links with visual mega-dropdowns in the center, and utility triggers (search, cart count badge, primary action button) grouped on the right.
- **Mobile:** Compact header bar housing brand mark, cart button, and accessible hamburger toggle. Activation opens an immersive full-screen slide-down drawer with large typography links, product thumbnail shortcuts, and customer care links.

### 3. Motion Specifications
- **Trigger:** Viewport scroll past threshold (>50px), link hover (desktop dropdown), and hamburger toggle (mobile drawer).
- **Header Scroll Docking:** Padding reduces slightly (`padding: 16px -> 10px`), background shifts from transparent to frosted blur (`backdrop-blur-md bg-white/80`). Duration: `0.2s`. Easing: `easeOut`.
- **Desktop Mega-Dropdown:** Drops and fades into view (`opacity: 0 -> 1`, `y: -8px -> 0px`). Duration: `0.18s`. Easing: `easeOut`.
- **Mobile Drawer Entrance:** Full-screen drawer slides vertically (`y: -100% -> 0%`). Duration: `0.35s`. Easing: `cubic-bezier(0.32, 0.72, 0, 1)`. Links stagger in with `0.04s` delays.

### 4. Guiding the Eye & Driving the Click
Persistent visibility ensures conversion triggers (cart, checkout, product categories) are reachable at any point during exploration without requiring users to scroll back to the top. Visual thumbnails in dropdowns accelerate product recognition.

### 5. Accessibility Risks & Reduced-Motion Alternatives
- **Risks:** Missing keyboard focus trapping in the mobile drawer; missing `aria-expanded` attributes on hamburger button; dropdown menus that collapse prematurely during keyboard tab navigation.
- **Reduced-Motion Alternative:** Header remains visually static without scroll-linked interpolation; mobile drawer opens with an instantaneous opacity fade rather than a slide; dropdown menus appear instantly upon focus.

### 6. Implementation Architecture (Next.js, Tailwind, Framer Motion)
- **Tailwind:** `sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-black/5`.
- **Framer Motion:** `<AnimatePresence>` managing mobile drawer lifecycle: `<motion.nav initial={{ y: '-100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }} transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}>` with document body scroll locked when active.

---

## Slot 9: Microinteractions — Elastic Haptic Physics & Tactile Feedback Loops

### 1. Underlying Pattern (Plain Words)
Intentional, subtle interactive physics applied to buttons, cards, tags, and inputs that respond to cursor movement, clicks, and state changes, giving the digital interface a tangible, responsive, and tactile physical character.

### 2. Layout Structure
- **Desktop:** Distributed across interactive components throughout the site: button hover states, card elevation shifts, form focus rings, and magnetic attraction on key action buttons.
- **Mobile:** Centered on touch feedback: momentary compression/scale-down on touch contact, spring rebound on release, and cart counter bounce notifications upon item addition.

### 3. Motion Specifications
- **Trigger:** Pointer hover, pointer coordinate movement, active click/press, and successful form/cart state updates.
- **Button Hover & Press:** Hover scales up (`scale(1) -> scale(1.03)`), shadow deepens. Duration: `0.18s`. Active click compresses (`scale(0.96)`, duration: `0.08s`). Easing: `easeOut`.
- **Card Magnetic Tilt:** 3D card tilt based on pointer coordinates (`rotateX: -4deg to 4deg`, `rotateY: -4deg to 4deg`). Dynamics: spring (`stiffness: 300, damping: 20`).
- **Cart Badge Pulse:** When incremented, badge scales up (`scale(1) -> scale(1.35) -> scale(1)`). Duration: `0.28s`. Dynamics: spring (`stiffness: 400, damping: 10`).

### 4. Guiding the Eye & Driving the Click
Microinteractions supply immediate sensory confirmation that an interface element is active and responsive. Elastic rebound dynamics create subtle psychological satisfaction, reinforcing engagement and making clicking enjoyable.

### 5. Accessibility Risks & Reduced-Motion Alternatives
- **Risks:** Custom cursors or exaggerated tilt mechanics can cause visual nausea or impede users with fine motor impairments; excessive bouncing creates visual distraction.
- **Reduced-Motion Alternative:** Deactivate magnetic cursor pull and 3D card tilting; replace spring scale animations with standard high-contrast color shifts and clean focus outlines (`focus-visible:ring-2`).

### 6. Implementation Architecture (Next.js, Tailwind, Framer Motion)
- **Tailwind:** Standard utility transitions `transition-transform duration-150 active:scale-95 hover:-translate-y-0.5`.
- **Framer Motion:** Reusable wrapper props on `<motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 17 }} />`.

---

## Slot 10 (Optional): Sticker & Illustration Style — Tactile Badge Accents & Organic Seals

### 1. Underlying Pattern (Plain Words)
Decorative badge accents resembling physical peelable stickers, retro starburst seals, hand-drawn indicator arrows, and organic scalloped dividers positioned across photography and container borders. They introduce human craftsmanship, playful personality, and quick-scan certification proof points.

### 2. Layout Structure
- **Desktop:** Positioned as absolute-positioned accent layers overlapping container edges, floating adjacent to key headlines, or anchored to product mockup corners at slight playful angles (-8° to 8°). Scalloped SVG dividers separate contrasting content bands.
- **Mobile:** Scaled down proportionally (~75% size) and kept within card margins to prevent horizontal overflow and protect touch target accessibility.

### 3. Motion Specifications
- **Trigger:** Component mount, ambient continuous idle, and pointer hover.
- **Ambient Idle Wobble:** Subtle rotation rocking (`rotate(-4deg) -> rotate(4deg)`). Duration: `6s`. Easing: `easeInOut`. Repeat: `Infinity`.
- **Hover Activation:** Sticker scales up (`scale(1) -> scale(1.12)`) and straightens slightly (`rotate(0deg)`). Duration: `0.2s`. Dynamics: spring (`stiffness: 220, damping: 14`).

### 4. Guiding the Eye & Driving the Click
Organic, non-rectilinear shapes naturally capture peripheral vision within a structured grid. Starbursts and tilted badge accents disrupt layout monotony, instantly drawing attention to unique product attributes (e.g. dietary claims, artisanal craftsmanship, clean oil certification).

### 5. Accessibility Risks & Reduced-Motion Alternatives
- **Risks:** Text baked into rotated image stickers may be illegible or inaccessible to screen readers without proper text alternatives; overlapping graphics may obscure reading copy.
- **Reduced-Motion Alternative:** Halt all continuous idle wobble animations; render stickers at static upright or modest angles; ensure all badge text is represented in semantic HTML with proper contrast and `aria-hidden="true"` on purely decorative graphic elements.

### 6. Implementation Architecture (Next.js, Tailwind, Framer Motion)
- **Tailwind:** Absolute positioning utilities (`absolute -top-3 -right-3 rotate-6 select-none pointer-events-none`).
- **Framer Motion:** `<motion.div whileHover={{ scale: 1.1, rotate: 0 }} transition={{ type: 'spring', stiffness: 300 }}>` wrapping optimized SVG or PNG sticker assets.
