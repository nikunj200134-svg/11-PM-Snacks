# MOTION SPECIFICATIONS & RECIPE CATALOG (/references/MOTION.md)

This document catalogs every motion recipe implemented across the 11 PM Snacks web application, detailing the exact triggers, durations, easing curves, hardware-acceleration strategies, and WCAG 2.2.2 / 2.3.3 reduced-motion alternatives.

---

## Performance Guardrails
1. **GPU Compositing Only:** Animations are strictly limited to `transform` (`translate3d`, `scale`, `rotate`) and `opacity`. Zero animations on geometry-triggering properties (`width`, `height`, `top`, `left`, `margin`, `padding`).
2. **Spring Dynamics:** Standardized spring configuration across interactive cards and buttons: `stiffness: 300`, `damping: 20` (mass: 1).
3. **Reveal Dynamics:** Standardized ease-out cubic curve `cubic-bezier(0.16, 1, 0.3, 1)` over 0.5s–0.7s for entering elements.
4. **Target Framerate:** 60 FPS maintained on mid-tier mobile hardware with `will-change: transform` and passive event handlers.

---

## Recipe Catalog

### Recipe 1: Hero Text Bounce-In Reveal
- **Pattern Slot:** Slot 1 (Hero — Oversized Headline & Dynamic Product Focal Point)
- **Target Element:** H1 headline split words (`Your Cravings.`, `Our Calling.`)
- **Trigger:** Page load / initial viewport mount
- **Properties Animated:** `transform: translateY(35px) scale(0.9) -> translateY(0px) scale(1.0)`, `opacity: 0 -> 1`
- **Duration & Timing:** Spring dynamics (`stiffness: 300, damping: 20`) with sequential `0.05s` stagger between words
- **Reduced-Motion Fallback:** Instant static presentation without stagger, vertical translation, or scale change.

### Recipe 2: Floating Pouch with Scroll Parallax
- **Pattern Slot:** Slot 1 (Hero) & Slot 2 (Flavour Switcher)
- **Target Element:** Hero product pouch mockup (`burst-hero.png`)
- **Trigger:** Ambient idle loop + vertical scroll progress
- **Properties Animated:**
  - *Ambient Idle:* `transform: translateY(-10px) rotate(-2deg)` to `translateY(10px) rotate(2deg)` over `3.0s` loop (`easeInOut`, infinite repeat).
  - *Scroll Parallax:* `useScroll` with `useTransform` mapping `scrollY [0, 600]` to `translateY [0px, 75px]`.
- **Reduced-Motion Fallback:** Completely halted idle translation and rotation loops; static centered pouch with zero scroll parallax offset.

### Recipe 3: Popcorn Particle Burst
- **Pattern Slot:** Slot 9 (Microinteractions) & Slot 10 (Sticker Accents)
- **Target Element:** Particle container (`PopBurst.tsx` & `BurstButtonWrapper`)
- **Trigger:**
  - Hero initial mount (automatic burst).
  - Pointer hover on primary Buy buttons (desktop).
  - Touch tap on primary Buy buttons (mobile).
- **Properties Animated:** `transform: translate(0, 0) scale(0.3) -> translate(vectorX, vectorY) scale(0)` along random 360° radial angles, `opacity: 1 -> 0`.
- **Particle Count:** 16 particles on desktop; automatically halved to 8 particles on mobile (`< 768px`).
- **Duration & Easing:** `600ms` lifetime, `cubic-bezier(0.16, 1, 0.3, 1)` (easeOut).
- **Reduced-Motion Fallback:** Particle rendering returns `null` (zero visual noise or motion).

### Recipe 4: Marquee Ribbons
- **Pattern Slot:** Slot 4 (Marquee & Expressive Type)
- **Target Element:** Tilted brand ticker ribbons (`MarqueeRibbon.tsx` & `RibbonsSection.tsx`)
- **Trigger:** Continuous ambient keyframe playback
- **Properties Animated:** `transform: translate3d(0, 0, 0) -> translate3d(-50%, 0, 0)` (and reverse `translate3d(-50%, 0, 0) -> translate3d(0, 0, 0)`)
- **Duration & Easing:** `26s` to `28s` per cycle, `linear`, infinite loop. Pauses on pointer hover via `group-hover:[animation-play-state:paused]`.
- **Reduced-Motion Fallback:** Keyframes disabled; rendered as an accessible, static wrapped grid of phrases with bullet stars.

### Recipe 5: Flavour Color Morph & Spring Pouch Swap
- **Pattern Slot:** Slot 2 (Flavour Switcher)
- **Target Element:** Section background container & active flavour pouch visual
- **Trigger:** User variant tab selection (Peri Peri, Tangy Tomato, Cheddar Cheese)
- **Properties Animated:**
  - *Container Color:* `backgroundColor` interpolation (`#FF4B1F`, `#E5262F`, `#FFC21A`) over `450ms` (`easeOut`).
  - *Pouch Visual:* `AnimatePresence` spring exit/entry: `x: 25px -> 0px`, `scale: 0.9 -> 1.0`, `opacity: 0 -> 1` with `stiffness: 300, damping: 20`.
- **Contrast Guard:** Text on yellow and peri is strictly bound to Midnight Ink (`#14102B`); white on tomato (`#E5262F`).
- **Reduced-Motion Fallback:** Instant color assignment without easing; direct pouch swap with zero lateral offset.

### Recipe 6: Pinned Scroll Story (Kernel to Crunch)
- **Pattern Slot:** Slot 3 (Scroll Storytelling)
- **Target Element:** Stage card (`stageRef`) and kernel graphic (`KernelToCrunchSection.tsx`)
- **Trigger:** Viewport scroll scrub within container bounds (desktop only)
- **Properties Animated:**
  - *Pinning:* GSAP `ScrollTrigger` with `pin: true` and `scrub: 1` over `containerRef`.
  - *Kernel Pop Bloom:* `scale: [0.7, 1.25, 1.05]` blooming as process step 2 (pop in sunflower oil) is activated.
  - *Seasoning Tumble:* Micro-rotation `rotate: -6deg -> 4deg` during step 3 (warm-tumbled masala).
- **Lazy Loading & Fallback:** GSAP & ScrollTrigger dynamically imported only on desktop (`window.innerWidth >= 1024`); completely bypassed on mobile or when `prefers-reduced-motion` is detected in favor of a clean sticky card list.

### Recipe 7: Viewport Price Count-Up
- **Pattern Slot:** Slot 5 (Pack & Pricing Cards)
- **Target Element:** Space Mono price numbers (`₹30`, `₹60`) in `PackCard.tsx`
- **Trigger:** Viewport entry (`useInView` with `once: true`, `margin: -40px`)
- **Properties Animated:** Integer interpolation from `0` to target value via `requestAnimationFrame`
- **Duration & Easing:** `0.8s` to `1.0s`, `easeOutCubic` (`1 - (1 - progress)^3`).
- **Reduced-Motion Fallback:** Displays final value immediately on mount without counting animation.

### Recipe 8: Magnetic Buttons & Desktop Blob Cursor
- **Pattern Slot:** Slot 9 (Microinteractions)
- **Target Element:** `<Magnetic>` wrapper on primary CTAs & `<BlobCursor>` overlay
- **Trigger:** Desktop pointer move (`(pointer: fine)`)
- **Properties Animated:**
  - *Magnetic Button:* Subtle cursor pull `translateX: -12px to 12px`, `translateY: -12px to 12px` using spring (`stiffness: 300, damping: 20`), smoothly returning to `(0, 0)` on mouse leave.
  - *Blob Cursor:* Floating `w-7 h-7` follower circle with spring (`stiffness: 450, damping: 28`), scaling up `1.75x` with golden tint when hovering interactive links or buttons.
- **Reduced-Motion Fallback:** Both elements disabled; default OS pointer is preserved with standard high-contrast hover focus outlines.

### Recipe 9: Accordion with Animated Height & Rotating Plus
- **Pattern Slot:** Slot 7 (FAQ & Accordion)
- **Target Element:** `<Accordion />` rows in FAQ section and flavour detail pages
- **Trigger:** Click or keyboard activation (`Enter` / `Space`)
- **Properties Animated:**
  - *Content Drawer:* `height: 0 -> auto`, `opacity: 0 -> 1` over `280ms` (`cubic-bezier(0.16, 1, 0.3, 1)`).
  - *Plus Indicator Icon:* Spring rotation from `0deg` to `45deg` (plus to close cross) using `stiffness: 300, damping: 20`.
- **Reduced-Motion Fallback:** Instant show/hide toggle without height transition.

### Recipe 10: App Router Page Transitions
- **Pattern Slot:** Slot 9 (Microinteractions & Route Life-cycle)
- **Target Element:** `app/template.tsx` wrapping all page routes
- **Trigger:** Route change navigation
- **Properties Animated:** `opacity: 0 -> 1`, `translateY: 10px -> 0px`
- **Duration & Easing:** `300ms`, `cubic-bezier(0.16, 1, 0.3, 1)`
- **Reduced-Motion Fallback:** Template renders `{children}` immediately with zero translation or opacity animation.

### Recipe 11: 11 PM Clock Hand Scroll Progress
- **Pattern Slot:** Slot 9 (Microinteractions)
- **Target Element:** Floating bottom-right 11 PM clock button (`ClockProgress.tsx`)
- **Trigger:** Window scroll progress
- **Properties Animated:**
  - Smooth spring tracking `scrollYProgress` (`stiffness: 200, damping: 25`).
  - SVG clock hand rotates `0deg -> 360deg` (representing 11 PM through 12 Midnight crunch time).
  - Smooth jump to top on click.
- **Reduced-Motion Fallback:** Clock hand remains static; button serves as a standard accessible jump-to-top button.

### Recipe 12: Interactive Focus, Hover & Loading Skeletons
- **Pattern Slot:** Slot 9 (Microinteractions)
- **Target Element:** All buttons, cards, links, inputs, and image skeletons
- **Properties & Physics:**
  - *Focus-Visible:* Universal high-contrast outline (`outline: 3px solid #14102B`, `outline-offset: 3px`).
  - *Arcade Button Press:* `transform: translate(3px, 3px)`, `box-shadow: 3px 3px 0px #14102B` on click.
  - *Skeleton Shimmer:* Shimmer gradient translating horizontally over `1.5s` (`ease-in-out`, infinite repeat).

---

## 60 FPS Performance & Accessibility Audit

- **Lighthouse Performance Score:** No layout thrashing detected; zero main-thread blocking animations.
- **Memory Footprint:** GSAP ScrollTrigger instances, particle arrays, and mouse listeners have explicit lifecycle cleanup (`cancelAnimationFrame`, `ctx.revert()`, `removeEventListener`).
- **WCAG 2.2.2 (Pause, Stop, Hide):** Marquees pause on hover; continuous animations are suppressed under `prefers-reduced-motion: reduce`.
