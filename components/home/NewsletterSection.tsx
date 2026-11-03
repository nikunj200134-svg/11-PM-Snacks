'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/Button';
import { siteContent } from '@/content/site';

export function NewsletterSection() {
  const { title, description, inputPlaceholder, buttonText, disclaimer } =
    siteContent.homepage.newsletterSection;

  const [inputVal, setInputVal] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    setSubmitted(true);
    setConfettiActive(true);

    // Turn off confetti after 3.5 seconds
    setTimeout(() => {
      setConfettiActive(false);
    }, 3500);
  };

  return (
    <section className="relative overflow-hidden bg-[#14102B] text-[#FFF4DC] py-20 border-b-2 border-[#14102B]">
      {/* Dynamic Confetti Pop Effect on Submit */}
      {confettiActive && (
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
          {Array.from({ length: 36 }).map((_, i) => {
            const left = Math.random() * 100;
            const delay = Math.random() * 0.5;
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
        {/* Section Eyebrow */}
        <span className="inline-block px-4 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FFC21A] text-[#14102B] border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B] mb-3 rotate-[-1deg]">
          Late Night Perks
        </span>

        {/* 1 H2 & 1 Short Paragraph */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-display uppercase tracking-wider text-[#FFC21A] m-0">
          {title}
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[#FFF4DC]/80 font-medium leading-relaxed max-w-xl">
          {description}
        </p>

        {/* Sign-up Form */}
        {submitted ? (
          <div className="mt-8 p-6 bg-[#2EC27E] text-[#14102B] border-[2.5px] border-[#14102B] rounded-2xl shadow-[6px_6px_0px_#14102B] animate-in zoom-in-95 duration-200">
            <span className="text-2xl block mb-1">🎉</span>
            <strong className="text-xl font-display uppercase tracking-wide block">
              You&apos;re in the Snack Club!
            </strong>
            <p className="text-sm font-bold mt-1">
              Watch out for secret midnight discount codes and test batch drop alerts.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 w-full max-w-lg flex flex-col sm:flex-row gap-3 items-center justify-center"
          >
            <input
              type="text"
              required
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={inputPlaceholder}
              className="w-full sm:flex-1 px-5 py-3.5 rounded-full bg-white text-[#14102B] font-mono text-sm border-[2.5px] border-[#14102B] shadow-[4px_4px_0px_#14102B] focus:outline-none focus:ring-2 focus:ring-[#FFC21A]"
            />
            {/* At most 1 CTA button */}
            <Button type="submit" variant="gold" size="md" className="w-full sm:w-auto shrink-0">
              {buttonText}
            </Button>
          </form>
        )}

        <p className="mt-4 text-xs font-mono text-[#FFF4DC]/60">
          {disclaimer}
        </p>
      </div>
    </section>
  );
}
