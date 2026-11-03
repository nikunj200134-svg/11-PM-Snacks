# HOMEPAGE PATTERN MAP (/references/PATTERN-MAP.md)

This document maps every planned homepage section (and global header navigation) to its foundational pattern slot from `/references/PATTERNS.md`.
Per our strict originality guardrails:
1. **Patterns are reused, never assets.** No copied text, images, illustrations, icons, logos, code, or CSS.
2. **Zero recognition at a glance.** For every section, at least **three** architectural attributes are distinctly transformed: layout proportions, colours, shapes, typography, motion timing, or content order.
3. **Authentic assets only.** All visuals are 11 PM's own pouch photography, popcorn assets, or explicitly tagged placeholders.
4. **Non-negotiable claim boundaries.** "No palm oil" appears at most twice on the homepage. Nutrition details live on `/nutrition`; the homepage contains only a single snapshot.

---

## Complete Section-to-Slot Mapping Table

| Section # | Planned Section | Pattern Slot Drawn On | Primary Adaptation Theme |
|---|---|---|---|
| **01** | Header Navigation | **Slot 8** (Navigation & Mobile Menu) | Floating Cream pill command bar + mood-badge visual drawer |
| **02** | Announcement Bar | **Slot 4** (Marquee & Expressive Type) | High-contrast Midnight Ink strip with Space Mono pricing anchors |
| **03** | Hero | **Slot 1** (Hero) + **Slot 10** (Stickers) | Bagel Fat One headline, burst pouch, and ₹30/₹60 price stickers |
| **04** | Marquee Ribbons | **Slot 4** (Marquee & Expressive Type) | Opposing -2° tilted bands flanked by wavy scallop SVG dividers |
| **05** | Flavour Switcher | **Slot 2** (Flavour Switcher) | 3-way mood switcher with real pouch tones and Midnight Ink contrast |
| **06** | Why 11 PM | **Slot 5** (Feature Cards) + **Slot 10** (Stickers) | Asymmetric tilted sticker cards with Caveat Brush scribbles |
| **07** | Kernel to Crunch Story | **Slot 3** (Scroll Storytelling) | Lightweight linear comic track (reserving pinned GSAP for `/our-story`) |
| **08** | Packs & Pricing | **Slot 5** (Pack & Pricing Cards) | 30g (₹30) vs 90g (₹60) comparison with arcade-button tactile press |
| **09** | Nutrition Snapshot | **Slot 5** (Snapshot Cards) | Single-row transparent facts terminating in link to `/nutrition` |
| **10** | Moments Gallery | **Slot 6** (Social Proof / UGC) | Polaroid-style snacking moments with washi-tape corner accents |
| **11** | Social Proof (Reviews) | **Slot 6** (Social Proof) | Verified early-snacker sticky notes on deep Midnight Ink band |
| **12** | FAQ Accordion | **Slot 7** (FAQ & Footer) | 5 rounded bubble cards with tactile plus/minus toggles |
| **13** | Newsletter | **Slot 7** (Footer / Newsletter) | Late Night Snack Club pill capture with haptic submit button |
| **14** | Monumental Footer | **Slot 7** (FAQ & Footer) | Giant Bagel Fat One wordmark, 3-column sitemap, and FSSAI status |

---

## Detailed Section Specifications

### 01. Header Navigation
- **Slot Drawn On:** **Slot 8** (Navigation & Mobile Menu) + **Slot 9** (Microinteractions)
- **Original Adaptation for 11 PM:** A Cream-toned frosted floating pill bar anchored to the top of the viewport with an unboxed, left-aligned official 11 PM logo and tactile mood-indicator chips inside a desktop dropdown. On mobile, tapping the accessible hamburger opens a full-bleed Midnight Ink overlay featuring oversized Bagel Fat One links, quick flavour shortcuts, and direct wholesale contact.
- **Three Things Changed for Originality:**
  1. *Colours:* Replaced stark modern black/white glass with warm Cream (`#FFF4DC`) at 94% opacity paired with Midnight Ink (`#14102B`) borders and mood-colored accent dots.
  2. *Typography:* Swapped sterile sans-serif navigation items for DM Sans paired with Space Mono chips and Bagel Fat One mobile drawer headlines.
  3. *Shapes:* Replaced sharp angular menus with a rounded 999px floating pill container and hard-shadowed mobile action buttons.
- **Risk & Mitigation:** Mobile drawer scroll lock can trap focus or miscalculate viewport height on mobile browsers with dynamic address bars. *Mitigation:* Use CSS `100dvh` and explicit accessible focus-trap and escape key listener.

---

### 02. Announcement Bar
- **Slot Drawn On:** **Slot 4** (Marquee & Expressive Type)
- **Original Adaptation for 11 PM:** A single-line high-contrast announcement ribbon running across the very top above the header in Midnight Ink with crisp Cream typography. It highlights genuine brand anchors (Everyday Crunch ₹30, Jumbo Crunch ₹60, popped in sunflower oil with zero palm oil) separated by bold star glyphs.
- **Three Things Changed for Originality:**
  1. *Layout Proportions:* Kept as a slim 36px static/subtle ticker rather than oversized multi-track banner walls to keep initial fold focus on the hero.
  2. *Typography:* Uses Space Mono monospaced tabular caps (`var(--font-mono)`) instead of condensed grotesque display fonts.
  3. *Content Order:* Leads with concrete pack prices (₹30 and ₹60) and sunflower oil verification before sensory appetite adjectives.
- **Risk & Mitigation:** Moving text can violate WCAG 2.2.2 if too fast or unpausable. *Mitigation:* Set gentle speed (24s loop), pause on hover, and freeze entirely under `prefers-reduced-motion`.

---

### 03. Hero
- **Slot Drawn On:** **Slot 1** (Hero) + **Slot 10** (Stickers)
- **Original Adaptation for 11 PM:** A high-voltage split hero pairing an oversized Bagel Fat One headline (*"Your Cravings. Our Calling."*) with a dynamic, floating 11 PM burst pouch surrounded by roasted popcorn kernels and hand-drawn stickers. Space Mono price pills (`30 g ₹30` / `90 g ₹60`) are embedded right beside the primary CTA pair to address price-conscious Gen Z users immediately.
- **Three Things Changed for Originality:**
  1. *Typography:* Replaced clean modern sans or luxury serif with friendly, hyper-bold `Bagel Fat One` and hand-drawn `Caveat Brush` scribbles.
  2. *Colours & Lighting:* Uses warm Cream (`#FFF4DC`) background with Midnight Ink ink outlines (`2.5px #14102B`) and hard 6px offset shadows instead of diffused gradients or soft drop-shadows.
  3. *Content Order:* Places explicit pack weights and Indian Rupee pricing directly within the primary CTA cluster before the fold, eliminating pricing ambiguity.
- **Risk & Mitigation:** High visual density from floating badges, kernel accents, and headlines could cause cognitive clutter on small mobile screens. *Mitigation:* Hide peripheral decorative kernels on screens under 640px, keeping only the pouch and core CTA stack.

---

### 04. Marquee Ribbons
- **Slot Drawn On:** **Slot 4** (Marquee & Expressive Type) + **Slot 10** (Stickers)
- **Original Adaptation for 11 PM:** Dual full-bleed transition ribbons angled at a fixed -2° slant across the page break, framed by organic wavy SVG dividers. Track 1 runs left in Cheddar Gold (`#FFC21A`) with Midnight Ink text, while Track 2 runs right in Midnight Ink with Cream text, shouting real brand mottos (`ZERO PALM OIL ★ 100% WHOLE GRAIN ★ CRUNCH O'CLOCK`).
- **Three Things Changed for Originality:**
  1. *Shapes:* Embedded within organic wavy scallop dividers rather than flat rectangular cutouts.
  2. *Colours:* High-contrast Cheddar Gold and Midnight Ink contrast pair meeting strict AA contrast rules.
  3. *Motion Timing:* Decoupled into two opposing directions with smooth hardware-accelerated CSS keyframes instead of heavy JavaScript scroll listeners.
- **Risk & Mitigation:** Diagonal tilt can cause horizontal scrollbar spillover or text cut-off on mobile. *Mitigation:* Wrap in an `overflow-hidden` container with `width: 100vw; margin-left: calc(50% - 50vw)`.

---

### 05. Flavour Switcher
- **Slot Drawn On:** **Slot 2** (Flavour Switcher) + **Slot 9** (Microinteractions)
- **Original Adaptation for 11 PM:** An interactive 3-way mood switcher letting users click between Peri Peri (The Firestarter), Tangy Tomato (The Mood Lifter), and Cheddar Cheese (The Comfort One). Selecting a flavour transitions the card's background hue dynamically, springs the matching pouch visual into view, and updates authentic tasting notes and mood chips.
- **Three Things Changed for Originality:**
  1. *Colours:* Samples 11 PM's exact pouch tones (Peri Peri Fire `#FF4B1F`, Tangy Tomato `#E5262F`, Cheddar Gold `#FFC21A`) with mandatory Midnight Ink contrast on warm backgrounds.
  2. *Layout Proportions:* Mobile-first horizontal tab bar with tactile sticker buttons positioned above the pouch, keeping controls within thumb reach.
  3. *Shapes:* Framed inside a 28px rounded sticker card with 2.5px ink outline and hard 6px offset shadow.
- **Risk & Mitigation:** Rapid color transitions could fail contrast or distract users. *Mitigation:* Confine color shift strictly to the switcher card container rather than flashing the entire viewport, and enforce `#14102B` text color.

---

### 06. Why 11 PM
- **Slot Drawn On:** **Slot 5** (Feature Cards) + **Slot 10** (Stickers)
- **Original Adaptation for 11 PM:** A 3-pillar benefit card grid highlighting why 11 PM hits differently: (1) Small-batch popped in Gurugram, (2) Popped in sunflower oil with zero palm oil, and (3) Masala recipes made with whole grain corn. Each pillar is styled as a physical sticker card tilted slightly with Caveat Brush annotations.
- **Three Things Changed for Originality:**
  1. *Shapes:* Asymmetric card rotations (-2°, 0°, +2°) with tactile offset shadows rather than standard flat uniform card rows.
  2. *Typography:* Caveat Brush scribble sub-notes paired with Space Mono feature tags and Bagel Fat One headings.
  3. *Content Order:* Leads with the sunflower oil / zero palm oil promise as a positive ingredient choice rather than a preachy health lecture.
- **Risk & Mitigation:** "Why 11 PM" could repeat claims already stated in the hero. *Mitigation:* Strict "one idea, one home" guardrail—this section focuses purely on kitchen craft details, reserving nutrition assays for `/nutrition`.

---

### 07. Kernel to Crunch Scroll Story
- **Slot Drawn On:** **Slot 3** (Scroll Storytelling)
- **Original Adaptation for 11 PM:** A mobile-friendly preview of 11 PM's seed-to-seasoning journey on the homepage (with the full pinned GSAP story reserved for `/our-story`). It walks through 4 simple steps: Sourcing unrefined corn ➔ Hot-air popping ➔ Light sunflower oil mist ➔ Small-batch masala toss.
- **Three Things Changed for Originality:**
  1. *Motion Timing:* On the homepage, uses an unpinned, lightweight intersection-observer step track rather than aggressive scroll-hijacking, leaving the heavy GSAP pinned canvas exclusively for `/our-story`.
  2. *Shapes:* Step indicators styled as circular corn-kernel sticker stamps with thick 2.5px outlines and step counters (`01` to `04`).
  3. *Colours:* Alternating cream and soft gold step cards rather than dark industrial tech aesthetics.
- **Risk & Mitigation:** Scroll-hijacking on the homepage can frustrate users trying to browse down to pricing quickly. *Mitigation:* Keep homepage story unpinned and fully linear; reserve pinned ScrollTrigger strictly for `/our-story`.

---

### 08. Packs & Pricing
- **Slot Drawn On:** **Slot 5** (Pack & Pricing Cards) + **Slot 9** (Microinteractions)
- **Original Adaptation for 11 PM:** A side-by-side comparison of 11 PM’s two real packs: Everyday Crunch 30 g (₹30) and Jumbo Crunch 90 g (₹60). The Jumbo pack features a tilted "Best Value · 3× Crunch" sticker ribbon, transparent per-gram value breakdown, and a prominent Midnight Ink tactile "Buy Now" button.
- **Three Things Changed for Originality:**
  1. *Content Truthfulness:* Strictly limited to the 2 verified commercial SKUs (₹30 and ₹60); zero invented subscriptions or fake bundle discounts.
  2. *Typography:* Space Mono numbers for pricing (`₹30`, `₹60`) scaled to 2rem with hard offset drop-shadow tags.
  3. *Shapes:* Distinct sticker-pop card packaging with thick ink outlines, rounded 32px corners, and tactile arcade-button click physics (`active:translate(3px, 3px)`).
- **Risk & Mitigation:** Ambiguity about where "Buy Now" leads. *Mitigation:* Clear subtext indicating direct ordering or stockist redirection, logged in `/content/TODO.md`.

---

### 09. Nutrition Snapshot
- **Slot Drawn On:** **Slot 5** (Snapshot Cards) + **Slot 10** (Stickers)
- **Original Adaptation for 11 PM:** A single, clean snapshot section satisfying the "one idea, one home" rule: 3 compact fact cards highlighting Sunflower Oil (0% Palm Oil), 100% Whole Grain Corn, and 12g Plant Protein per 100g. It terminates with a direct button leading to `/nutrition` for lab-verified details.
- **Three Things Changed for Originality:**
  1. *Content Order:* Confined to a concise single-row snapshot on the homepage, removing all duplicate pills, banners, and comparison tables to prevent preachy repetition.
  2. *Shapes:* Pill-shaped sticker metric badges with 2px ink borders and Space Mono metric callouts.
  3. *Colours:* Uses Pop Pink (`#FF7AB8`) and Leaf Green (`#2EC27E`) highlight accents on Cream instead of pharmaceutical greens or clinical white tables.
- **Risk & Mitigation:** Violating the non-negotiable rule of repeating "No palm oil" more than twice on the homepage. *Mitigation:* Count audit: mention 1 in announcement bar, mention 2 here in this snapshot. Nowhere else on the homepage.

---

### 10. Moments Gallery
- **Slot Drawn On:** **Slot 6** (Social Proof / UGC) + **Slot 10** (Stickers)
- **Original Adaptation for 11 PM:** A high-spirited visual strip of everyday snacking moments (late-night gaming, desk munching, movie binge, post-college hunger) presented as polaroid-style sticker cards taped onto the Cream background at slight tilts.
- **Three Things Changed for Originality:**
  1. *Layout Proportions:* Horizontal thumb-scrollable swipe track on mobile (`snap-x mandatory`) rather than heavy desktop-centric masonry columns.
  2. *Typography:* Handwritten `Caveat Brush` scribbles indicating the relatable snacking occasions on each card.
  3. *Shapes:* Polaroid frames with simulated washi-tape stickers at the corners and 6px hard offset drop-shadows.
- **Risk & Mitigation:** Heavy imagery slowing down initial page load. *Mitigation:* Use Next.js `<Image loading="lazy" sizes="..." />` with WebP/AVIF compression.

---

### 11. Social Proof (Reviews)
- **Slot Drawn On:** **Slot 6** (Social Proof)
- **Original Adaptation for 11 PM:** A grounded, authentic review card cluster showcasing verified early-snacker quotes alongside a star rating summary badge (`4.8★ Early Snackers`). Each review card is styled as a cream sticky note with an ink outline and punchy, unvarnished feedback.
- **Three Things Changed for Originality:**
  1. *Content Truthfulness:* Excluded fake press logos (Vogue, NYT); uses only realistic early-customer feedback clearly attributed with name and city.
  2. *Colours:* Warm Cream sticky-note cards on deep Midnight Ink band, creating maximum visual separation from daytime sections.
  3. *Typography:* DM Sans body text for review quotes paired with Space Mono author stamps (`[Name], [City]`).
- **Risk & Mitigation:** Looking like generic e-commerce review widgets. *Mitigation:* Custom sticker pop styling with subtle -2° to +2° tilts and bold verified checkmarks.

---

### 12. FAQ Accordion
- **Slot Drawn On:** **Slot 7** (FAQ & Footer)
- **Original Adaptation for 11 PM:** A 5-item bubble accordion answering the core questions: oil used, pack sizes & prices, Gurugram manufacturing, gluten-free/veg verification, and store locations. Each accordion row is a self-contained sticker card that pops open smoothly with an elastic plus/minus indicator.
- **Three Things Changed for Originality:**
  1. *Shapes:* Individual rounded bubble rows (`rounded-2xl`) with 2.5px ink borders and hard offset shadows instead of flat borderless dividers.
  2. *Typography:* Question titles rendered in bold DM Sans (`font-bold`) with Space Mono Q/A badge indicators.
  3. *Motion Timing:* Native HTML `<details>` and `<summary>` enhancement with smooth 0.25s height transition and zero JavaScript layout shift.
- **Risk & Mitigation:** Accordions hiding key information from search engine crawlers. *Mitigation:* Fully crawlable semantic HTML markup with structured FAQ schema metadata.

---

### 13. Newsletter ("Late Night Snack Club")
- **Slot Drawn On:** **Slot 7** (Footer / Newsletter) + **Slot 9** (Microinteractions)
- **Original Adaptation for 11 PM:** A cheeky, non-corporate invite: *"Join the Late Night Snack Club."* Users enter their phone or email to get drop alerts for new masala flavours and secret midnight discounts, with an arcade-style submit button.
- **Three Things Changed for Originality:**
  1. *Layout Proportions:* Compact horizontal pill form with embedded button inside the input container on desktop, cleanly stacking on mobile.
  2. *Colours:* Cheddar Gold submit button with Midnight Ink icon inside a high-contrast Midnight Ink container.
  3. *Shapes:* 999px pill input with 2.5px ink border and tactile button press animation (`active:translate-y-1`).
- **Risk & Mitigation:** Spam perception or broken form submit. *Mitigation:* Clear microcopy (*"Zero spam. Only fresh crunch alerts."*) and accessible validation states.

---

### 14. Monumental Footer
- **Slot Drawn On:** **Slot 7** (FAQ & Footer)
- **Original Adaptation for 11 PM:** A monumental midnight anchor featuring an edge-to-edge Bagel Fat One `11 PM SNACKS` display wordmark running across the top. Below sit 3 structured navigation columns (Flavours, Learn, Legal), Gurugram factory address lines, FSSAI placeholder (`[TODO: verified FSSAI registration number]`), and copyright bar.
- **Three Things Changed for Originality:**
  1. *Typography:* Giant `Bagel Fat One` wordmark across the footer base with `Space Mono` micro-labels.
  2. *Colours:* Solid Midnight Ink (`#14102B`) background with Cream (`#FFF4DC`) links and Pop Pink highlight hover dots.
  3. *Content Order:* Front-faces verified manufacturing transparency (Shivji Park Colony, Gurugram) and legal links before social icons.
- **Risk & Mitigation:** Accessibility contrast failures on dark footer backgrounds. *Mitigation:* Cream text on Midnight Ink guarantees an ultra-high 15.8:1 contrast ratio, surpassing WCAG AAA.
