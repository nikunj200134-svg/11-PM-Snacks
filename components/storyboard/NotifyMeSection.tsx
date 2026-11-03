'use client';

import { useState, useRef } from 'react';
import {
  WHATSAPP_NUMBER,
  OWNER_EMAIL,
  openDropAlertWhatsApp,
  openDropAlertEmail,
  buildDropAlertMessage,
} from '@/lib/contact';

export function NotifyMeSection() {
  const [contactInput, setContactInput] = useState('');
  const [submittedMethod, setSubmittedMethod] = useState<'whatsapp' | 'email' | null>(null);
  const [copied, setCopied] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);

  const fireConfetti = () => {
    setConfettiActive(true);
    setTimeout(() => {
      setConfettiActive(false);
    }, 3500);
  };

  const handleWhatsAppClick = () => {
    openDropAlertWhatsApp(contactInput.trim());
    setSubmittedMethod('whatsapp');
    fireConfetti();
  };

  const handleEmailClick = () => {
    openDropAlertEmail(contactInput.trim());
    setSubmittedMethod('email');
    fireConfetti();
  };

  const dropMessage = buildDropAlertMessage(contactInput.trim(), submittedMethod === 'whatsapp' ? 'WhatsApp' : 'Email');

  const handleCopy = async () => {
    if (navigator?.clipboard) {
      await navigator.clipboard.writeText(dropMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="notify" className="relative overflow-hidden bg-[#14102B] text-[#FFF4DC] py-20 sm:py-24 border-b-2 border-[#14102B] scroll-mt-24">
      {/* Confetti Explosion on Submit */}
      {confettiActive && (
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
          {Array.from({ length: 45 }).map((_, i) => {
            const left = Math.random() * 100;
            const delay = Math.random() * 0.4;
            const colors = ['#FFC21A', '#FF4B1F', '#2EC27E', '#FF7AB8', '#FFF4DC', '#96D0D2'];
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
          Batch 01 is kettle-popping in Gurugram. Choose WhatsApp or Email to lock in priority access, launch crates, and secret discount codes.
        </p>

        {/* Neo-brutalist White Card Container (Same functionality and style as Contact Page) */}
        <div className="mt-8 w-full max-w-xl bg-white border-[3px] border-[#14102B] rounded-[32px] p-6 sm:p-8 shadow-[8px_8px_0px_#FFC21A] text-[#14102B] text-left">
          
          {/* Post-Action Confirmation Banner */}
          {submittedMethod && (
            <div className="mb-6 p-5 sm:p-6 rounded-2xl bg-[#E8F8F0] border-2 border-[#25D366] text-[#14102B] shadow-[4px_4px_0px_#14102B] animate-in zoom-in-95 duration-200">
              <div className="flex items-start gap-3">
                <span className="text-2xl leading-none">🍿</span>
                <div className="flex-1">
                  <h3 className="font-display uppercase text-lg sm:text-xl m-0 text-[#14102B]">
                    Almost Done!
                  </h3>
                  <p className="text-xs sm:text-sm font-sans text-[#14102B]/85 mt-1 leading-relaxed">
                    Press <strong>Send</strong> in {submittedMethod === 'whatsapp' ? 'WhatsApp' : 'Gmail / Email'} to lock your spot on the Batch 01 Gurugram drop list.
                  </p>
                  <div className="mt-3.5 flex flex-wrap items-center gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase border-2 border-[#14102B] bg-white text-[#14102B] shadow-[2px_2px_0px_#14102B] hover:bg-[#FFF4DC] cursor-pointer"
                    >
                      {copied ? '✓ Message Copied!' : '📋 Copy Message'}
                    </button>
                    <a
                      href={
                        submittedMethod === 'whatsapp'
                          ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(dropMessage)}`
                          : `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent('[11 PM Snacks] Batch 01 Drop List Signup')}&body=${encodeURIComponent(dropMessage)}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase border-2 border-[#14102B] bg-[#25D366] text-white shadow-[2px_2px_0px_#14102B] hover:bg-[#20ba59]"
                    >
                      Open {submittedMethod === 'whatsapp' ? 'WhatsApp' : 'Email'} Again →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Friendly Prompt: Zero Form Barriers */}
          <div className="mb-6 p-4 rounded-2xl bg-[#FFFDF7] border-2 border-[#14102B]">
            <p className="text-sm font-sans font-medium text-[#14102B] m-0 leading-relaxed">
              For any type of query, bulk orders, or early access drop alerts — <strong>we&apos;re just a text away!</strong> Simply tap below to reach our Gurugram kitchen team directly on WhatsApp or Email.
            </p>
          </div>

          {/* Optional Message / Contact note */}
          <div className="mb-5">
            <label htmlFor="drop-contact-input" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#14102B] mb-1.5">
              Your Message or Contact (Optional)
            </label>
            <input
              id="drop-contact-input"
              type="text"
              value={contactInput}
              onChange={(e) => setContactInput(e.target.value)}
              placeholder="e.g. Save a Batch 01 crate for me! (or leave blank to just say hi)"
              className="w-full min-h-[48px] px-4 py-3 rounded-xl border-2 border-[#14102B] font-mono text-base focus:outline-none focus:ring-2 focus:ring-[#FFC21A] transition-colors bg-[#FFFDF7]"
            />
          </div>

          {/* Dual Action Buttons (Direct 1-Click Launch) */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
            <button
              type="button"
              onClick={handleWhatsAppClick}
              className="flex-1 min-h-[48px] px-5 py-3.5 rounded-2xl bg-[#25D366] !text-white border-2 border-[#14102B] shadow-[4px_4px_0px_#14102B] font-mono text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#14102B] transition-all cursor-pointer"
            >
              <span>💬</span>
              <span>Send on WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={handleEmailClick}
              className="flex-1 min-h-[48px] px-5 py-3.5 rounded-2xl bg-[#FFC21A] !text-[#14102B] border-2 border-[#14102B] shadow-[4px_4px_0px_#14102B] font-mono text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#14102B] transition-all cursor-pointer"
            >
              <span>✉️</span>
              <span>Send via Email</span>
            </button>
          </div>

          <p className="mt-4 text-xs font-mono text-[#14102B]/60 text-center m-0">
            Strictly zero spam. Directly reaches our kitchen desk ({OWNER_EMAIL}).
          </p>
        </div>

        {/* Direct Contact Trust Bar (Phone number hidden, WhatsApp link & Gmail shown) */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#FFF4DC]/80 font-medium">
          <span>Kitchen Desk:</span>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#25D366] font-bold hover:underline inline-flex items-center gap-1 min-h-[44px]"
          >
            <span>💬</span> Chat on WhatsApp →
          </a>
          <span>·</span>
          <a
            href={`mailto:${OWNER_EMAIL}`}
            className="text-[#FFC21A] font-bold hover:underline inline-flex items-center gap-1 min-h-[44px]"
          >
            <span>✉️</span> {OWNER_EMAIL}
          </a>
        </div>
      </div>
    </section>
  );
}
