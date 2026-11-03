'use client';

import { useState, useRef } from 'react';
import {
  openWhatsApp,
  openEmail,
  copyMessage,
  validate,
  WHATSAPP_NUMBER,
  OWNER_EMAIL,
  type ContactForm,
} from '@/lib/contact';

export default function ContactPage() {
  const [isWholesale, setIsWholesale] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [submittedMethod, setSubmittedMethod] = useState<'whatsapp' | 'email' | null>(null);
  const [copied, setCopied] = useState(false);

  // Input refs for auto-focusing on first invalid field
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const getContactPayload = (): ContactForm => ({
    type: isWholesale ? 'Wholesale B2B' : 'Personal',
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    message: formData.message,
  });

  const handleWhatsAppClick = () => {
    const payload = getContactPayload();
    const validationErrors = validate(payload);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      if (validationErrors.name) nameRef.current?.focus();
      else if (validationErrors.email) emailRef.current?.focus();
      else if (validationErrors.phone) phoneRef.current?.focus();
      else if (validationErrors.message) messageRef.current?.focus();
      return;
    }

    setErrors({});
    // Call directly inside user gesture
    openWhatsApp(payload);
    setSubmittedMethod('whatsapp');
  };

  const handleEmailClick = () => {
    const payload = getContactPayload();
    const validationErrors = validate(payload);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      if (validationErrors.name) nameRef.current?.focus();
      else if (validationErrors.email) emailRef.current?.focus();
      else if (validationErrors.phone) phoneRef.current?.focus();
      else if (validationErrors.message) messageRef.current?.focus();
      return;
    }

    setErrors({});
    // Call directly inside user gesture
    openEmail(payload);
    setSubmittedMethod('email');
  };

  const handleCopy = async () => {
    await copyMessage(getContactPayload());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-[#FFF4DC] min-h-screen text-[#14102B]">
      {/* 1. Page Hero */}
      <section className="pt-16 pb-12 border-b-2 border-[#14102B]">
        <div className="w-[min(1240px,94vw)] mx-auto max-w-3xl text-center flex flex-col items-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FFC21A] text-[#14102B] border-2 border-[#14102B] shadow-[3px_3px_0px_#14102B] mb-4 rotate-[-1deg]">
            Gurugram Kitchen Desk
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display uppercase tracking-wider text-[#14102B] m-0">
            Reach Out To 11 PM
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#14102B]/80 font-medium leading-relaxed max-w-xl">
            Whether you want custom event orders, cafe stocking, or just want to tell us your favorite midnight flavour craving.
          </p>
        </div>
      </section>

      {/* 2. Main Contact Grid */}
      <section className="py-16 border-b-2 border-[#14102B]">
        <div className="w-[min(1240px,94vw)] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Form with WhatsApp + Email buttons */}
          <div className="lg:col-span-7">
            <div className="bg-white border-[3px] border-[#14102B] rounded-[32px] p-6 sm:p-10 shadow-[8px_8px_0px_#14102B]">
              {/* After Click Post-Send Banner */}
              {submittedMethod && (
                <div className="mb-6 p-5 sm:p-6 rounded-2xl bg-[#E8F8F0] border-2 border-[#25D366] text-[#14102B] shadow-[4px_4px_0px_#14102B]">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl leading-none">🚀</span>
                    <div className="flex-1">
                      <h3 className="font-display uppercase text-lg sm:text-xl m-0 text-[#14102B]">
                        Almost Done!
                      </h3>
                      <p className="text-xs sm:text-sm font-sans text-[#14102B]/85 mt-1 leading-relaxed">
                        Press <strong>Send</strong> in {submittedMethod === 'whatsapp' ? 'WhatsApp' : 'Gmail / Email'} to deliver your note to our Gurugram kitchen team.
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
                          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                            `Hi 11 PM Snacks! 👋\n\nInquiry: ${isWholesale ? 'Wholesale B2B' : 'Personal'}\nName: ${formData.name || 'Friend'}\n\nMessage:\n${formData.message}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase border-2 border-[#14102B] bg-[#25D366] text-white shadow-[2px_2px_0px_#14102B] hover:opacity-95"
                        >
                          Direct wa.me Link →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <form noValidate onSubmit={(e) => e.preventDefault()} className="space-y-6">
                {/* Inquiry Type Toggle Switch (Personal vs Wholesale B2B) */}
                <div className="p-4 rounded-2xl bg-[#FFF4DC] border-2 border-[#14102B] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <label id="inquiry-type-label" className="text-sm font-display uppercase tracking-wide block text-[#14102B]">
                      Inquiry Type
                    </label>
                    <span className="text-xs font-sans text-[#14102B]/75">
                      {isWholesale
                        ? 'Commercial wholesale, office pantry, college fest or retail stockist'
                        : 'Personal snacking, flavor feedback or general question'}
                    </span>
                  </div>

                  <div
                    role="radiogroup"
                    aria-labelledby="inquiry-type-label"
                    className="inline-flex p-1 bg-white border-2 border-[#14102B] rounded-full shrink-0 shadow-[2px_2px_0px_#14102B]"
                  >
                    <button
                      type="button"
                      role="radio"
                      aria-checked={!isWholesale}
                      onClick={() => setIsWholesale(false)}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') setIsWholesale(true);
                      }}
                      className={`px-4 py-2 rounded-full text-xs font-mono font-black uppercase cursor-pointer transition-all ${
                        !isWholesale
                          ? 'bg-[#14102B] !text-white shadow-[1px_1px_0px_#14102B]'
                          : '!text-[#14102B] hover:bg-[#14102B]/10'
                      }`}
                    >
                      Personal
                    </button>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={isWholesale}
                      onClick={() => setIsWholesale(true)}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') setIsWholesale(false);
                      }}
                      className={`px-4 py-2 rounded-full text-xs font-mono font-black uppercase cursor-pointer transition-all ${
                        isWholesale
                          ? 'bg-[#14102B] !text-white shadow-[1px_1px_0px_#14102B]'
                          : '!text-[#14102B] hover:bg-[#14102B]/10'
                      }`}
                    >
                      Wholesale B2B
                    </button>
                  </div>
                </div>

                {/* Name & Email Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name-input" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#14102B] mb-1">
                      Your Name *
                    </label>
                    <input
                      id="name-input"
                      ref={nameRef}
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Kunal Sharma"
                      className={`w-full min-h-[48px] px-4 py-3 rounded-xl border-2 border-[#14102B] font-mono text-base focus:outline-none focus:ring-2 focus:ring-[#FFC21A] ${
                        errors.name ? 'border-red-500 bg-red-50' : 'bg-[#FFFDF7]'
                      }`}
                    />
                    {errors.name && (
                      <span role="alert" aria-live="polite" className="text-xs font-mono text-red-600 mt-1 block font-bold">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email-input" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#14102B] mb-1">
                      Email Address *
                    </label>
                    <input
                      id="email-input"
                      ref={emailRef}
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@domain.com"
                      className={`w-full min-h-[48px] px-4 py-3 rounded-xl border-2 border-[#14102B] font-mono text-base focus:outline-none focus:ring-2 focus:ring-[#FFC21A] ${
                        errors.email ? 'border-red-500 bg-red-50' : 'bg-[#FFFDF7]'
                      }`}
                    />
                    {errors.email && (
                      <span role="alert" aria-live="polite" className="text-xs font-mono text-red-600 mt-1 block font-bold">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Phone Number (WhatsApp) */}
                <div>
                  <label htmlFor="phone-input" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#14102B] mb-1">
                    Phone Number (WhatsApp)
                  </label>
                  <input
                    id="phone-input"
                    ref={phoneRef}
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 85108 01655"
                    className={`w-full min-h-[48px] px-4 py-3 rounded-xl border-2 border-[#14102B] font-mono text-base focus:outline-none focus:ring-2 focus:ring-[#FFC21A] ${
                      errors.phone ? 'border-red-500 bg-red-50' : 'bg-[#FFFDF7]'
                    }`}
                  />
                  {errors.phone && (
                    <span role="alert" aria-live="polite" className="text-xs font-mono text-red-600 mt-1 block font-bold">
                      {errors.phone}
                    </span>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message-input" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#14102B] mb-1">
                    Your Message *
                  </label>
                  <textarea
                    id="message-input"
                    ref={messageRef}
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      isWholesale
                        ? 'Tell us about your retail location, office pantry order, or wholesale carton requirements...'
                        : 'Share your flavour cravings, feedback, or midnight snacking thoughts...'
                    }
                    className={`w-full px-4 py-3 rounded-xl border-2 border-[#14102B] font-sans text-base focus:outline-none focus:ring-2 focus:ring-[#FFC21A] ${
                      errors.message ? 'border-red-500 bg-red-50' : 'bg-[#FFFDF7]'
                    }`}
                  />
                  {errors.message && (
                    <span role="alert" aria-live="polite" className="text-xs font-mono text-red-600 mt-1 block font-bold">
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Dual Pre-filled Action Buttons: Send on WhatsApp + Send via Email */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
                  <button
                    type="button"
                    onClick={handleWhatsAppClick}
                    className="flex-1 min-h-[48px] px-6 py-3.5 rounded-2xl bg-[#25D366] !text-white border-2 border-[#14102B] shadow-[4px_4px_0px_#14102B] font-mono text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#14102B] transition-all cursor-pointer"
                  >
                    <span>💬</span>
                    <span>Send on WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleEmailClick}
                    className="flex-1 min-h-[48px] px-6 py-3.5 rounded-2xl bg-[#FFC21A] !text-[#14102B] border-2 border-[#14102B] shadow-[4px_4px_0px_#14102B] font-mono text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#14102B] transition-all cursor-pointer"
                  >
                    <span>✉️</span>
                    <span>Send via Email</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right: Direct Contacts & Gurugram Kitchen Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-[#14102B] text-[#FFF4DC] border-[3px] border-[#14102B] rounded-[32px] p-6 sm:p-8 shadow-[8px_8px_0px_#FFC21A]">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FFC21A] block mb-2">
                Direct Contact
              </span>
              <h2 className="text-3xl font-display uppercase tracking-wider text-[#FFF4DC] m-0">
                Kitchen Desk
              </h2>

              <div className="mt-6 space-y-4 font-mono text-sm">
                {/* Phone Call / Direct WhatsApp */}
                <div className="p-3.5 rounded-xl bg-[#1F193E] border border-[#FFF4DC]/20">
                  <span className="text-xs text-[#FFC21A] block uppercase font-bold mb-1">
                    Call / WhatsApp:
                  </span>
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href="tel:+918510801655"
                      className="text-base font-bold text-white hover:text-[#FFC21A] transition-colors"
                    >
                      +91 85108 01655
                    </a>
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#25D366] text-white text-xs font-bold uppercase shadow-[1px_1px_0px_#14102B] hover:opacity-90"
                    >
                      Chat on WhatsApp →
                    </a>
                  </div>
                </div>

                {/* Email Desk */}
                <div className="p-3.5 rounded-xl bg-[#1F193E] border border-[#FFF4DC]/20">
                  <span className="text-xs text-[#FFC21A] block uppercase font-bold mb-1">
                    Email Desk:
                  </span>
                  <a
                    href={`mailto:${OWNER_EMAIL}`}
                    className="text-base font-bold text-white hover:text-[#FFC21A] transition-colors break-all"
                  >
                    {OWNER_EMAIL}
                  </a>
                </div>

                {/* Kitchen Address */}
                <div className="p-3.5 rounded-xl bg-[#1F193E] border border-[#FFF4DC]/20">
                  <span className="text-xs text-[#FFC21A] block uppercase font-bold mb-1">
                    Kitchen Address:
                  </span>
                  <p className="text-sm text-[#FFF4DC]/90 m-0 leading-relaxed font-sans font-medium">
                    Shivji Park Colony, Gurugram, Haryana 122001, India
                  </p>
                </div>

                {/* Dispatch Hours */}
                <div className="p-3.5 rounded-xl bg-[#1F193E] border border-[#FFF4DC]/20">
                  <span className="text-xs text-[#FFC21A] block uppercase font-bold mb-1">
                    Dispatch Hours:
                  </span>
                  <p className="text-sm text-[#FFF4DC]/90 m-0 font-sans font-medium">
                    Monday to Saturday, 10:00 AM – 8:00 PM IST
                  </p>
                </div>

                {/* Note: FSSAI line is intentionally hidden until valid licence number is available in config */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
