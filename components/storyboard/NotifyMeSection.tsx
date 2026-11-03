'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/Button';
import { Magnetic } from '@/components/Magnetic';

export function NotifyMeSection() {
  const [contactInput, setContactInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactInput.trim()) return;

    setSubmitted(true);
    setConfettiActive(true);

    setTimeout(() => {
      setConfettiActive(false);
    }, 3500);
  };

  return (
    <section id="notify" className="relative overflow-hidden bg-[#14102B] text-[#FFF4DC] py-24 border-b-2 border-[#14102B]">
      {/* Confetti Explosion on Submit */}
      {confettiActive && (
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => {
            const left = Math.random() * 100;
            const delay = Math.random() * 0.4;
            const colors = ['#FFC21A', '#FF4B1F', '#2EC27E', '#FF7AB8', '#FFF4DC'];
            const bg = colors[i % colors.length];

            return (
              <span
                key={i}
                style={{
                  left: `${left}%`,
                  backgroundColor: bg,
                  animationDelay: `${delay}s`,
                }}
                className="absolute top-0 w-3 h-3 rounded-sm border border-[#14102B] animate-[confetti-fall_3s_ease-out_forwards]"
              />
            );
          })}
        </div>
      )}

      <div className="w-[min(1240px,94vw)] mx-auto relative z-10 max-w-3xl text-center flex flex-col items-center">
        {/* Eyebrow */}
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FFC21A] text-[#14102B] border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B] mb-4 rotate-[-1deg]">
          Early Access &amp; Drop List
        </span>

        {/* Headline */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-display uppercase tracking-wider text-[#FFC21A] m-0">
          Be First To Crunch When We Drop.
        </h2>

        {/* Lede */}
        <p className="mt-4 text-base sm:text-lg text-[#FFF4DC]/80 font-medium leading-relaxed max-w-xl">
          Batch 01 is kettle-popping in Gurugram. Drop your email or WhatsApp number to unlock early-access priority shipping, launch discounts, and tasting crates.
        </p>

        {/* Form or Success State */}
        {submitted ? (
          <div className="mt-8 p-6 sm:p-8 bg-[#2EC27E] text-[#14102B] border-[3px] border-[#14102B] rounded-2xl shadow-[6px_6px_0px_#14102B] animate-in zoom-in-95 duration-200">
            <span className="text-3xl block mb-1">🍿🎉</span>
            <strong className="text-2xl font-display uppercase tracking-wide block">
              You&apos;re On The Drop List!
            </strong>
            <p className="text-sm sm:text-base font-bold mt-2">
              We&apos;ll notify you at {contactInput} the exact minute our kitchen opens.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 w-full max-w-md flex flex-col sm:flex-row gap-3 items-center justify-center"
          >
            <input
              type="text"
              required
              value={contactInput}
              onChange={(e) => setContactInput(e.target.value)}
              placeholder="Email or WhatsApp number"
              className="w-full sm:flex-1 px-5 py-3.5 rounded-full bg-white text-[#14102B] font-mono text-sm border-[2.5px] border-[#14102B] shadow-[4px_4px_0px_#14102B] focus:outline-none focus:ring-2 focus:ring-[#FFC21A]"
            />
            <Magnetic>
              <Button type="submit" variant="gold" size="md" className="w-full sm:w-auto shrink-0">
                Get Drop Alert →
              </Button>
            </Magnetic>
          </form>
        )}

        <p className="mt-4 text-xs font-mono text-[#FFF4DC]/60">
          Strictly zero spam. Only batch launch notices and secret discount codes.
        </p>
      </div>
    </section>
  );
}
