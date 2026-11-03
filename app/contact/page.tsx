'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/Button';
import { siteContent } from '@/content/site';

export default function ContactPage() {
  const { eyebrow, title, description, directContacts } =
    siteContent.innerPages.contactPage;
  const brand = siteContent.brand;

  const [isWholesale, setIsWholesale] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    estimatedCartons: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim()) errs.message = 'Please enter a message.';
    if (isWholesale && !formData.company.trim()) {
      errs.company = 'Please tell us your company, cafe, or store name.';
    }
    return errs;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FFF4DC] min-h-screen text-[#14102B]">
      {/* 1. Page Hero */}
      <section className="pt-16 pb-12 border-b-2 border-[#14102B]">
        <div className="w-[min(1240px,94vw)] mx-auto max-w-3xl text-center flex flex-col items-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FFC21A] text-[#14102B] border-2 border-[#14102B] shadow-[3px_3px_0px_#14102B] mb-4 rotate-[-1deg]">
            {eyebrow}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display uppercase tracking-wider text-[#14102B] m-0">
            {title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#14102B]/80 font-medium leading-relaxed">
            {description}
          </p>
        </div>
      </section>

      {/* 2. Main Contact Grid */}
      <section className="py-16 border-b-2 border-[#14102B]">
        <div className="w-[min(1240px,94vw)] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Validated Contact Form with Wholesale Toggle */}
          <div className="lg:col-span-7">
            <div className="bg-white border-[3px] border-[#14102B] rounded-[32px] p-6 sm:p-10 shadow-[8px_8px_0px_#14102B]">
              {submitted ? (
                <div className="p-8 text-center bg-[#2EC27E] text-[#14102B] border-2 border-[#14102B] rounded-2xl shadow-[4px_4px_0px_#14102B]">
                  <span className="text-4xl block mb-2">🎉</span>
                  <h3 className="text-3xl font-display uppercase tracking-wider m-0">
                    Message Received!
                  </h3>
                  <p className="mt-2 text-sm sm:text-base font-bold">
                    Thank you, {formData.name}. Our Gurugram kitchen team will review your {isWholesale ? 'wholesale' : 'snack'} inquiry and get back to you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        company: '',
                        estimatedCartons: '',
                        message: '',
                      });
                    }}
                    className="mt-6 px-6 py-2.5 rounded-full bg-[#14102B] text-[#FFF4DC] font-mono text-xs font-bold uppercase cursor-pointer hover:bg-black"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Wholesale Toggle Switch */}
                  <div className="p-4 rounded-2xl bg-[#FFF4DC] border-2 border-[#14102B] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <strong className="text-sm font-display uppercase tracking-wide block text-[#14102B]">
                        Inquiry Type
                      </strong>
                      <span className="text-xs font-sans text-[#14102B]/75">
                        {isWholesale
                          ? 'Commercial wholesale, college, office pantry or retail stockist'
                          : 'Personal snacking, flavor feedback or general question'}
                      </span>
                    </div>

                    <div className="inline-flex p-1 bg-white border border-[#14102B] rounded-full shrink-0">
                      <button
                        type="button"
                        onClick={() => setIsWholesale(false)}
                        className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase cursor-pointer transition-all ${
                          !isWholesale
                            ? 'bg-[#14102B] text-[#FFF4DC]'
                            : 'text-[#14102B] hover:bg-[#14102B]/10'
                        }`}
                      >
                        Snack Lover
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsWholesale(true)}
                        className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase cursor-pointer transition-all ${
                          isWholesale
                            ? 'bg-[#FF4B1F] text-white'
                            : 'text-[#14102B] hover:bg-[#14102B]/10'
                        }`}
                      >
                        Wholesale B2B
                      </button>
                    </div>
                  </div>

                  {/* Name & Email Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#14102B] mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Kunal Sharma"
                        className={`w-full px-4 py-3 rounded-xl border-2 border-[#14102B] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC21A] ${
                          errors.name ? 'border-red-500 bg-red-50' : 'bg-[#FFFDF7]'
                        }`}
                      />
                      {errors.name && (
                        <span className="text-xs font-mono text-red-600 mt-1 block">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#14102B] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@domain.com"
                        className={`w-full px-4 py-3 rounded-xl border-2 border-[#14102B] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC21A] ${
                          errors.email ? 'border-red-500 bg-red-50' : 'bg-[#FFFDF7]'
                        }`}
                      />
                      {errors.email && (
                        <span className="text-xs font-mono text-red-600 mt-1 block">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#14102B] mb-1">
                      Phone Number (WhatsApp)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#14102B] bg-[#FFFDF7] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC21A]"
                    />
                  </div>

                  {/* Extra Wholesale Specific Fields */}
                  {isWholesale && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#FFFDF7] border-2 border-dashed border-[#14102B] animate-in fade-in duration-200">
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#FF4B1F] mb-1">
                          Company / Store / Cafe Name *
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="e.g. Cyber City Pantries"
                          className={`w-full px-4 py-2.5 rounded-xl border-2 border-[#14102B] font-mono text-sm focus:outline-none ${
                            errors.company ? 'border-red-500 bg-red-50' : 'bg-white'
                          }`}
                        />
                        {errors.company && (
                          <span className="text-xs font-mono text-red-600 mt-1 block">
                            {errors.company}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#14102B] mb-1">
                          Est. Monthly Cartons
                        </label>
                        <input
                          type="text"
                          value={formData.estimatedCartons}
                          onChange={(e) => setFormData({ ...formData, estimatedCartons: e.target.value })}
                          placeholder="e.g. 20 - 50 cartons"
                          className="w-full px-4 py-2.5 rounded-xl border-2 border-[#14102B] bg-white font-mono text-sm focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Message Field */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#14102B] mb-1">
                      Your Message *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={
                        isWholesale
                          ? 'Tell us about your distribution location, retail store format, or order schedule...'
                          : 'Share your flavour cravings, feedback, or late night snack thoughts...'
                      }
                      className={`w-full px-4 py-3 rounded-xl border-2 border-[#14102B] font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC21A] ${
                        errors.message ? 'border-red-500 bg-red-50' : 'bg-[#FFFDF7]'
                      }`}
                    />
                    {errors.message && (
                      <span className="text-xs font-mono text-red-600 mt-1 block">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  <Button type="submit" variant="gold" size="lg" className="w-full text-center">
                    {isWholesale ? 'Submit Wholesale Application →' : 'Send Message →'}
                  </Button>
                </form>
              )}
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
                <div className="p-3 rounded-xl bg-[#1F193E] border border-[#FFF4DC]/20">
                  <span className="text-xs text-[#FFC21A] block uppercase font-bold">Call / WhatsApp:</span>
                  <a
                    href={`tel:${directContacts.phoneTel}`}
                    className="text-base font-bold text-white hover:text-[#FFC21A] transition-colors"
                  >
                    {directContacts.phone}
                  </a>
                </div>

                <div className="p-3 rounded-xl bg-[#1F193E] border border-[#FFF4DC]/20">
                  <span className="text-xs text-[#FFC21A] block uppercase font-bold">Kitchen Address:</span>
                  <p className="text-xs text-[#FFF4DC]/80 m-0 mt-0.5 leading-relaxed font-sans">
                    {directContacts.location}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#1F193E] border border-[#FFF4DC]/20">
                  <span className="text-xs text-[#FFC21A] block uppercase font-bold">Dispatch Hours:</span>
                  <p className="text-xs text-[#FFF4DC]/80 m-0 mt-0.5 font-sans">
                    {directContacts.hours}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#1F193E] border border-[#FFF4DC]/20">
                  <span className="text-xs text-[#FFC21A] block uppercase font-bold">FSSAI Status:</span>
                  <p className="text-xs text-[#FFF4DC]/60 m-0 mt-0.5">
                    {brand.contact.fssaiPlaceholder}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
