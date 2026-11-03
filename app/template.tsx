'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Global Page Transition Template (Recipe 10)
 * Re-mounts on every route change in App Router.
 * Smooth 300ms fade-and-slide transition animating only opacity and transform.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1], // ease-out cubic over 300ms
      }}
    >
      {children}
    </motion.div>
  );
}
