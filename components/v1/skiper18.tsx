'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export interface ImageCursorTrailProps {
  items: string[];
  maxNumberOfImages?: number;
  distance?: number;
  imgClass?: string;
  className?: string;
  fadeAnimation?: boolean;
  children?: React.ReactNode;
}

interface TrailItem {
  id: number;
  x: number;
  y: number;
  src: string;
  rotation: number;
}

/**
 * Skiper UI Component #18 - ImageCursorTrail
 * Renders an interactive, spring-animated trail of custom images following
 * cursor or touch movement across the screen.
 */
export function ImageCursorTrail({
  items,
  maxNumberOfImages = 8,
  distance = 20,
  imgClass = 'w-28 h-28 sm:w-36 sm:h-36',
  className = 'h-screen h-[100dvh] w-full',
  fadeAnimation = true,
  children,
}: ImageCursorTrailProps) {
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const imageIndexRef = useRef(0);
  const idCounterRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const addImage = useCallback(
    (clientX: number, clientY: number) => {
      if (!items || items.length === 0) return;

      if (lastPosRef.current) {
        const dx = clientX - lastPosRef.current.x;
        const dy = clientY - lastPosRef.current.y;
        const d = Math.hypot(dx, dy);
        if (d < distance) return;
      }

      lastPosRef.current = { x: clientX, y: clientY };

      const src = items[imageIndexRef.current % items.length];
      imageIndexRef.current += 1;
      const id = ++idCounterRef.current;
      const rotation = (Math.random() - 0.5) * 28; // -14deg to +14deg

      setTrail((prev) => {
        const next = [...prev, { id, x: clientX, y: clientY, src, rotation }];
        if (next.length > maxNumberOfImages) {
          return next.slice(next.length - maxNumberOfImages);
        }
        return next;
      });

      if (fadeAnimation) {
        setTimeout(() => {
          setTrail((prev) => prev.filter((item) => item.id !== id));
        }, 1500);
      }
    },
    [items, distance, maxNumberOfImages, fadeAnimation]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    addImage(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches && e.touches.length > 0) {
      addImage(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className={`relative select-none ${className}`}
    >
      {/* Interactive Cursor Trail Images Layer */}
      <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
        <AnimatePresence>
          {trail.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.5, rotate: item.rotation - 8 }}
              animate={{ opacity: 1, scale: 1, rotate: item.rotation }}
              exit={{ opacity: 0, scale: 0.4, transition: { duration: 0.35, ease: 'easeIn' } }}
              transition={{ type: 'spring', stiffness: 380, damping: 24 }}
              style={{
                position: 'fixed',
                left: item.x,
                top: item.y,
                transform: 'translate(-50%, -50%)',
              }}
              className="pointer-events-none z-30"
            >
              <div
                className={`relative overflow-hidden rounded-2xl border-[2.5px] border-[#14102B] shadow-[6px_6px_0px_#14102B] bg-[#14102B] ${imgClass}`}
              >
                <Image
                  src={item.src}
                  alt="11 PM Snacks Trail"
                  fill
                  sizes="160px"
                  priority
                  className="object-cover"
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Children Layer (Words preloader content, timer, skip button) */}
      <div className="relative z-40 h-full w-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
