'use client';

import { useState, useRef, type MouseEvent, type ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface TiltCardProps {
  children: ReactNode;
  maxTilt?: number;
  className?: string;
}

export function TiltCard({
  children,
  maxTilt = 6,
  className = '',
}: TiltCardProps) {
  const reducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalize coordinates (-1 to 1)
    const xPct = (mouseX / width - 0.5) * 2;
    const yPct = (mouseY / height - 0.5) * 2;

    setTilt({
      x: -yPct * maxTilt, // Tilt along X axis based on vertical mouse
      y: xPct * maxTilt,  // Tilt along Y axis based on horizontal mouse
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const transformStyle = reducedMotion
    ? undefined
    : {
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.4s ease-out' : 'transform 0.1s ease-out',
      };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={transformStyle}
      className={`relative will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
