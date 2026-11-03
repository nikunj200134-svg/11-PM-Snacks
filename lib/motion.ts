/**
 * MOTION CONFIGURATION & PRESETS
 * Reusable motion tokens tuned for "Sticker Pop at Midnight".
 */

export const springPresets = {
  // Snappy spring for quick UI toggles, tabs, and switches
  snappy: {
    type: 'spring',
    stiffness: 400,
    damping: 25,
  },
  // Bouncy spring for stickers, badges, and card entrances
  bouncy: {
    type: 'spring',
    stiffness: 300,
    damping: 15,
  },
  // Gentle spring for floating ambient animations
  gentle: {
    type: 'spring',
    stiffness: 180,
    damping: 20,
  },
  // Tactile arcade button physics (Slot 9)
  arcadeButton: {
    type: 'spring',
    stiffness: 500,
    damping: 18,
  },
} as const;

// Cubic-bezier easing for smooth slides and reveals
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeInOutCubic = [0.65, 0, 0.35, 1] as const;
