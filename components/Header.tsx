'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { siteContent } from '@/content/site';
import { Button } from '@/components/Button';

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollYRef = useRef(0);

  // Shrink header on scroll (Slot 8)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is active, preserving exact scroll position without jumping
  useEffect(() => {
    if (mobileMenuOpen) {
      scrollYRef.current = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.width = '100%';
    } else {
      const top = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (top) {
        window.scrollTo(0, parseInt(top || '0', 10) * -1);
      }
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [mobileMenuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Accessible Skip to Content Link (WCAG 2.4.1) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:px-4 focus:py-2.5 focus:bg-[#FFC21A] focus:text-[#14102B] focus:font-bold focus:rounded-xl focus:border-2 focus:border-[#14102B] focus:shadow-[4px_4px_0px_#14102B] focus:outline-none"
      >
        Skip to main content
      </a>

      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'py-2 sm:py-2.5 bg-[#D8A2A2]/95 backdrop-blur-md border-b-2 border-[#14102B] shadow-[0_4px_20px_rgba(20,16,43,0.12)]'
            : 'py-2.5 sm:py-3.5 bg-[#D8A2A2] border-b-2 border-[#14102B]'
        }`}
      >
        <div className="w-[min(1240px,94vw)] mx-auto flex items-center justify-between gap-4">
          {/* Left: Enhanced, Prominent Logo on Mobile & Desktop */}
          <Link
            href="/"
            aria-label="11 PM Snacks Home"
            className="flex items-center shrink-0 transition-transform duration-200 hover:scale-105"
          >
            <Image
              src="/brand/logo-official.png"
              alt="11 PM Snacks"
              width={120}
              height={104}
              priority
              style={{
                height: isScrolled ? '38px' : '46px',
                width: 'auto',
                maxHeight: isScrolled ? '38px' : '48px',
              }}
              className={`w-auto object-contain transition-all duration-300 ${
                isScrolled
                  ? 'h-[36px] sm:h-[38px] max-h-[38px]'
                  : 'h-[44px] sm:h-[46px] max-h-[48px]'
              }`}
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-3" aria-label="Main Navigation">
            {siteContent.navigation.map((item) => {
              if (item.children) {
                return (
                  <div key={item.label} className="relative group">
                    <button
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 font-black text-sm tracking-wide !text-[#14102B] hover:!text-[#FF4B1F] rounded-full hover:bg-black/5 transition-colors cursor-pointer"
                      aria-haspopup="true"
                    >
                      <span>{item.label}</span>
                      <span className="text-xs font-mono font-black px-1.5 py-0.5 rounded-full bg-[#FFC21A] !text-[#14102B] border border-[#14102B]/30 shadow-[1px_1px_0px_#14102B]">
                        3 Moods
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 !text-[#14102B] group-hover:rotate-180 transition-transform duration-200" />
                    </button>

                    {/* Interactive Dropdown (Slot 8) */}
                    <div className="absolute top-full left-0 pt-2 hidden group-hover:block group-focus-within:block z-50">
                      <div className="w-64 bg-white border-2 border-[#14102B] rounded-2xl shadow-[6px_6px_0px_#14102B] p-2 flex flex-col gap-1">
                        <Link
                          href="/flavours"
                          className="px-3 py-2 rounded-xl text-xs font-mono font-black uppercase tracking-wider text-[#FF4B1F] hover:bg-[#FFF4DC] transition-colors"
                        >
                          All Flavours Range →
                        </Link>
                        <div className="h-[2px] bg-[#14102B]/10 my-0.5" />
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-bold text-[#14102B] hover:bg-[#FFF4DC] hover:text-[#FF4B1F] transition-colors"
                          >
                            <span>{child.label}</span>
                            <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded-full bg-[#14102B]/10 text-[#14102B]">
                              {child.badge}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 font-black text-sm tracking-wide rounded-full transition-all ${
                    isActive
                      ? 'bg-white hover:bg-white !text-[#14102B] border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B]'
                      : '!text-[#14102B] hover:!text-[#14102B] hover:bg-white/40'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Actions: Minimal Notify Me CTA with White Hover Reflection */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              href="/where-to-buy"
              variant="gold"
              size="sm"
              className="hover:!bg-white hover:!text-[#14102B] transition-colors duration-200"
            >
              Notify Me →
            </Button>
          </div>

          {/* Mobile Hamburger Toggle (Reflects White instead of Yellow on hover/cursor) */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Mobile Menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            className="md:hidden inline-flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl border-2 border-[#14102B] bg-[#FFC21A] hover:bg-white active:bg-white text-[#14102B] shadow-[3px_3px_0px_#14102B] hover:shadow-[4px_4px_0px_#14102B] hover:-translate-y-0.5 active:translate-x-[1px] active:translate-y-[1px] transition-all duration-200 cursor-pointer"
          >
            <Menu className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer (Slot 8) */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 bg-[#14102B] text-[#FFF4DC] flex flex-col justify-between p-6 overflow-y-auto animate-in fade-in duration-200"
        >
          {/* Top Bar inside Drawer */}
          <div className="flex items-center justify-between pb-6 border-b border-[#FFF4DC]/20">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 min-h-[44px]"
            >
              <Image
                src="/brand/logo-official.png"
                alt="11 PM Snacks"
                width={100}
                height={87}
                className="h-9 w-auto object-contain bg-white rounded-lg p-1 border border-[#FFF4DC]/20"
              />
              <span className="text-xl font-display uppercase tracking-wider text-[#FFC21A]">
                11 PM SNACKS
              </span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Mobile Menu"
              className="w-11 h-11 min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-full border-2 border-[#FFF4DC] bg-[#FFF4DC] text-[#14102B] shadow-[3px_3px_0px_#FFC21A] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
            >
              <X className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>

          {/* Links Hierarchy with Bagel Fat One Typography */}
          <nav className="flex flex-col gap-3 py-6">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-4xl font-display uppercase tracking-wider hover:text-[#FFC21A] transition-colors min-h-[44px] flex items-center"
            >
              Home
            </Link>

            <div className="flex flex-col gap-2 pt-2 pb-2">
              <span className="text-xs font-mono font-bold tracking-widest text-[#FFC21A] uppercase">
                The 3 Moods
              </span>
              <div className="grid grid-cols-1 gap-1.5 pl-2 border-l-2 border-[#FFC21A]/30">
                <Link
                  href="/flavours/peri-peri"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xl font-bold hover:text-[#FF4B1F] transition-colors flex items-center justify-between min-h-[44px] py-1"
                >
                  <span>Peri Peri</span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#FF4B1F] text-[#14102B]">
                    Firestarter
                  </span>
                </Link>
                <Link
                  href="/flavours/tangy-tomato"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xl font-bold hover:text-[#E5262F] transition-colors flex items-center justify-between min-h-[44px] py-1"
                >
                  <span>Tangy Tomato</span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#E5262F] text-white">
                    Mood Lifter
                  </span>
                </Link>
                <Link
                  href="/flavours/cheddar-cheese"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xl font-bold hover:text-[#FFC21A] transition-colors flex items-center justify-between min-h-[44px] py-1"
                >
                  <span>Cheddar Cheese</span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#FFC21A] text-[#14102B]">
                    Comfort One
                  </span>
                </Link>
              </div>
            </div>

            <Link
              href="/nutrition"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl sm:text-3xl font-display uppercase tracking-wider hover:text-[#FFC21A] transition-colors min-h-[44px] flex items-center"
            >
              Nutrition &amp; Ingredients
            </Link>
            <Link
              href="/our-story"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl sm:text-3xl font-display uppercase tracking-wider hover:text-[#FFC21A] transition-colors min-h-[44px] flex items-center"
            >
              Our Story
            </Link>
            <Link
              href="/where-to-buy"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl sm:text-3xl font-display uppercase tracking-wider hover:text-[#FFC21A] transition-colors min-h-[44px] flex items-center"
            >
              Where to Buy
            </Link>
            <Link
              href="/faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl sm:text-3xl font-display uppercase tracking-wider hover:text-[#FFC21A] transition-colors min-h-[44px] flex items-center"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl sm:text-3xl font-display uppercase tracking-wider hover:text-[#FFC21A] transition-colors min-h-[44px] flex items-center"
            >
              Contact
            </Link>
          </nav>

          {/* Bottom Drawer Actions */}
          <div className="pt-6 border-t border-[#FFF4DC]/20 flex flex-col gap-3">
            <Button
              href="/where-to-buy"
              variant="gold"
              size="lg"
              className="w-full text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Notify Me For Launch →
            </Button>
            <p className="text-center text-xs font-mono text-[#FFF4DC]/60">
              Made with care in Gurugram, India · Zero Palm Oil
            </p>
          </div>
        </div>
      )}
    </>
  );
}
