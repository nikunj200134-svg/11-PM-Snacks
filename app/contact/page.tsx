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
  const [formData, setFormData] = useState({
    name: '',
    message: '',
  });

  const [submittedMethod, setSubmittedMethod] = useState<'whatsapp' | 'email' | null>(null);
  const [copied, setCopied] = useState(false);

  const getContactPayload = (): ContactForm => ({
    type: 'General',
    name: formData.name,
    email: '',
    phone: '',
    message: formData.message,
  });

  const handleWhatsAppClick = () => {
    openWhatsApp(getContactPayload());
    setSubmittedMethod('whatsapp');
  };

  const handleEmailClick = () => {
    openEmail(getContactPayload());
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
                            `Hi 11 PM Snacks! 👋\n\nName: ${formData.name || 'Friend'}\n\nMessage:\n${formData.message || "I'd love to connect with your team!"}`
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
                {/* Welcoming Note: Zero Barrier */}
                <div className="p-4 rounded-2xl bg-[#FFF4DC] border-2 border-[#14102B]">
                  <p className="text-sm font-sans font-medium text-[#14102B] m-0 leading-relaxed">
                    For any type of query, wholesale bulk order, flavour feedback, or late-night craving — <strong>we&apos;re just a text away!</strong> You can simply click on WhatsApp or Email below to reach us directly.
                  </p>
                </div>

                {/* Optional Name Field */}
                <div>
                  <label htmlFor="name-input" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#14102B] mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full min-h-[48px] px-4 py-3 rounded-xl border-2 border-[#14102B] font-mono text-base focus:outline-none focus:ring-2 focus:ring-[#FFC21A] bg-[#FFFDF7]"
                  />
                </div>

                {/* Optional Message Field */}
                <div>
                  <label htmlFor="message-input" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#14102B] mb-1">
                    Your Message (Optional)
                  </label>
                  <textarea
                    id="message-input"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share your flavour cravings, wholesale requirements, or midnight snacking thoughts (or leave blank to just say hi)..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#14102B] font-sans text-base focus:outline-none focus:ring-2 focus:ring-[#FFC21A] bg-[#FFFDF7]"
                  />
                </div>

                {/* Dual Direct Buttons: Send on WhatsApp + Send via Email */}
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
                {/* Direct WhatsApp (Phone number hidden, direct chat link) */}
                <div className="p-3.5 rounded-xl bg-[#1F193E] border border-[#FFF4DC]/20">
                  <span className="text-xs text-[#FFC21A] block uppercase font-bold mb-1">
                    Direct WhatsApp:
                  </span>
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-full bg-[#25D366] text-white text-xs font-bold uppercase shadow-[1px_1px_0px_#14102B] hover:opacity-90 transition-opacity"
                    >
                      <span>💬</span> Chat on WhatsApp →
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
                    className="text-base font-bold text-white hover:text-[#FFC21A] transition-colors break-all min-h-[44px] inline-flex items-center"
                  >
                    {OWNER_EMAIL}
                  </a>
                </div>

                {/* Kitchen Address (Shivji Park Colony removed) */}
                <div className="p-3.5 rounded-xl bg-[#1F193E] border border-[#FFF4DC]/20">
                  <span className="text-xs text-[#FFC21A] block uppercase font-bold mb-1">
                    Kitchen Address:
                  </span>
                  <p className="text-sm text-[#FFF4DC]/90 m-0 leading-relaxed font-sans font-medium">
                    Gurgaon, Haryana 122001, India
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
