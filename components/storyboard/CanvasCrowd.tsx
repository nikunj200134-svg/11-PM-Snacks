'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Walker {
  x: number;
  y: number;
  speed: number;
  scale: number;
  color: string;
  legPhase: number;
  direction: 1 | -1;
  height: number;
  width: number;
}

export function CanvasCrowd() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [activePromiseIndex, setActivePromiseIndex] = useState(0);

  const promises = [
    {
      kicker: '11:15 PM · Study & Code',
      text: 'Made for the late-night thinkers, students, and coders pushing commits when the world is asleep.',
    },
    {
      kicker: '11:30 PM · Weekend Marathon',
      text: 'For the streaming binge-watchers who need airy crunch that doesn’t leave grease on their fingers.',
    },
    {
      kicker: '11:45 PM · The Night Owls',
      text: 'For gamers, creators, and commuters who believe cravings shouldn’t mean compromised ingredients.',
    },
    {
      kicker: 'Midnight & Beyond',
      text: 'Your Cravings. Our Calling. Small-batch masala popcorn popped in sunflower oil with zero palm oil.',
    },
  ];

  // Rotate scroll promise periodically or on scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePromiseIndex((prev) => (prev + 1) % promises.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [promises.length]);

  // Canvas Crowd Animation Loop (Skiper39 Canvas Crowd style)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    // Handle high DPI retina screens
    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Pause animation when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    // Initialize crowd walkers with varied depths, speeds and positions
    const walkerColors = ['#14102B', '#FF4B1F', '#FFC21A', '#2EC27E', '#FF7AB8', '#4B4568'];
    const walkerCount = window.innerWidth < 768 ? 16 : 32;

    const walkers: Walker[] = Array.from({ length: walkerCount }).map(() => {
      const scale = Math.random() * 0.45 + 0.65; // depth scale (0.65 to 1.1)
      return {
        x: Math.random() * (canvas.clientWidth + 200) - 100,
        y: canvas.clientHeight - 30 - Math.random() * 70, // ground line
        speed: (Math.random() * 0.8 + 0.5) * scale,
        scale,
        color: walkerColors[Math.floor(Math.random() * walkerColors.length)],
        legPhase: Math.random() * Math.PI * 2,
        direction: Math.random() > 0.4 ? -1 : 1, // Mostly walking left
        height: 58 * scale,
        width: 18 * scale,
      };
    });

    // Draw stylized silhouette character walking cycle
    const drawWalker = (w: Walker, time: number) => {
      const legSwing = Math.sin(time * 0.006 * w.speed + w.legPhase);
      const bobbing = Math.abs(Math.sin(time * 0.012 * w.speed + w.legPhase)) * 3;

      ctx.save();
      ctx.translate(w.x, w.y - bobbing);
      if (w.direction === 1) ctx.scale(-1, 1);

      ctx.fillStyle = w.color;

      // Head
      ctx.beginPath();
      ctx.arc(0, -w.height + 6, 7 * w.scale, 0, Math.PI * 2);
      ctx.fill();

      // Torso / Jacket
      ctx.beginPath();
      ctx.roundRect(-7 * w.scale, -w.height + 14, 14 * w.scale, 24 * w.scale, 4);
      ctx.fill();

      // Left Leg
      ctx.beginPath();
      ctx.moveTo(-3 * w.scale, -w.height + 38);
      ctx.lineTo(-3 * w.scale + legSwing * 10 * w.scale, -w.height + 38 + 20 * w.scale);
      ctx.lineWidth = 3.5 * w.scale;
      ctx.strokeStyle = w.color;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Right Leg
      ctx.beginPath();
      ctx.moveTo(3 * w.scale, -w.height + 38);
      ctx.lineTo(3 * w.scale - legSwing * 10 * w.scale, -w.height + 38 + 20 * w.scale);
      ctx.lineWidth = 3.5 * w.scale;
      ctx.strokeStyle = w.color;
      ctx.lineCap = 'round';
      ctx.stroke();

      ctx.restore();
    };

    let lastTime = 0;
    const render = (time: number) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const clientW = canvas.clientWidth;
      const clientH = canvas.clientHeight;

      ctx.clearRect(0, 0, clientW, clientH);

      // Draw subtle ground horizon shadow
      ctx.fillStyle = 'rgba(20, 16, 43, 0.06)';
      ctx.fillRect(0, clientH - 45, clientW, 45);

      // Sort walkers by Y position for proper depth layering
      walkers.sort((a, b) => a.y - b.y);

      // Update & draw each walker
      for (const w of walkers) {
        if (!reducedMotion) {
          w.x += w.direction * w.speed;

          // Wrap around canvas bounds
          if (w.direction === -1 && w.x < -80) {
            w.x = clientW + 80;
          } else if (w.direction === 1 && w.x > clientW + 80) {
            w.x = -80;
          }
        }

        drawWalker(w, time);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [reducedMotion]);

  const activePromise = promises[activePromiseIndex];

  return (
    <section
      ref={containerRef}
      className="relative bg-[#FFFDF7] py-24 border-b-2 border-[#14102B] overflow-hidden select-none"
    >
      <div className="w-[min(1240px,94vw)] mx-auto relative z-20 flex flex-col items-center text-center">
        {/* Eyebrow */}
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FFC21A] text-[#14102B] border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B] mb-4">
          The 11 PM Community
        </span>

        {/* Narrative Heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-display uppercase tracking-wider text-[#14102B] m-0 max-w-3xl">
          Popcorn For The People Who Own The Night.
        </h2>

        {/* Dynamic Storytelling Copy Track */}
        <div className="mt-8 max-w-2xl min-h-[140px] p-6 sm:p-8 bg-white border-[2.5px] border-[#14102B] rounded-[28px] shadow-[6px_6px_0px_#14102B] transition-all">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF4B1F] block mb-2">
            {activePromise.kicker}
          </span>
          <p className="text-base sm:text-xl font-medium text-[#14102B] leading-relaxed m-0">
            &ldquo;{activePromise.text}&rdquo;
          </p>

          <div className="mt-4 flex justify-center gap-2">
            {promises.map((_, i) => (
              <button
                key={i}
                onClick={() => setActivePromiseIndex(i)}
                aria-label={`Jump to promise ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full border border-[#14102B] transition-all cursor-pointer ${
                  i === activePromiseIndex ? 'bg-[#14102B] w-6' : 'bg-[#FFF4DC]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* HTML5 Canvas Crowd Container (Bottom of section) */}
      <div className="w-full h-44 sm:h-52 relative mt-8 pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>
    </section>
  );
}
