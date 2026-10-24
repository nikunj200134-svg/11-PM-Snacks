'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/Logo';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className="chrome">
      <p className="announce">
        12g Protein / 100g · High in Dietary Fibre · Rich in Antioxidants · Supports Heart Health · 100% Gluten Free · Whole Wheat &amp; Grain · Plant-Based Snacking
      </p>

      {/* Main Creative Modern Header */}
      <header className="site-header-creative">
        <div className="header-creative-inner">
          {/* Left: Free-floating Logo (no box, no border) */}
          <div className="header-logo-side">
            <Logo />
          </div>

          {/* Center Navigation Links with creative mood badges */}
          <nav className="nav-creative-links" aria-label="Main Navigation">
            <details className="nav-creative-drop">
              <summary className={pathname.startsWith('/flavours') ? 'is-active' : ''}>
                <span>Flavours</span>
                <span className="nav-flavour-badge">3 Moods</span>
                <span className="drop-arrow">▾</span>
              </summary>
              <ul className="nav-creative-dropdown">
                <li>
                  <Link href="/flavours" className="drop-heading-link">
                    <strong>All Flavours Range</strong>
                    <span>Peri Peri · Tangy Tomato · Cheese</span>
                  </Link>
                </li>
                <li className="drop-divider" />
                <li>
                  <Link href="/flavours/peri-peri" className="drop-item-peri">
                    <span className="drop-item-emoji">🔥</span>
                    <div>
                      <strong>Peri Peri</strong>
                      <small>The Firestarter · Bold Heat</small>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/flavours/tangy-tomato" className="drop-item-tomato">
                    <span className="drop-item-emoji">🍅</span>
                    <div>
                      <strong>Tangy Tomato</strong>
                      <small>The Mood Lifter · Bright Zest</small>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/flavours/cheese" className="drop-item-cheese">
                    <span className="drop-item-emoji">🧀</span>
                    <div>
                      <strong>Cheddar Cheese</strong>
                      <small>The Comfort One · Savoury Snap</small>
                    </div>
                  </Link>
                </li>
              </ul>
            </details>

            <Link
              href="/healthy-snacking"
              className={`nav-link-item ${pathname === '/healthy-snacking' ? 'is-active' : ''}`}
            >
              <span>Healthy Snacking</span>
              <span className="nav-flavour-badge" style={{ background: '#d9a61d', color: '#1a0f10' }}>Guide</span>
            </Link>

            <Link
              href="/why-11pm"
              className={`nav-link-item ${pathname === '/why-11pm' ? 'is-active' : ''}`}
            >
              Why 11 PM?
            </Link>

            <Link
              href="/ingredients-nutrition"
              className={`nav-link-item ${pathname === '/ingredients-nutrition' ? 'is-active' : ''}`}
            >
              <span>Ingredients</span>
              <span className="nav-pill-tag">12g Protein</span>
            </Link>

            <Link
              href="/our-process"
              className={`nav-link-item ${pathname === '/our-process' ? 'is-active' : ''}`}
            >
              Our Process
            </Link>

            <Link
              href="/about"
              className={`nav-link-item ${pathname === '/about' ? 'is-active' : ''}`}
            >
              Our Story
            </Link>

            <Link
              href="/contact"
              className={`nav-link-item ${pathname === '/contact' ? 'is-active' : ''}`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action: Creative CTA Button */}
          <div className="header-creative-right">
            <Link className="btn-creative-cta" href="/flavours">
              <span>Find Your Crunch</span>
              <span className="btn-arrow">→</span>
            </Link>

            {/* Mobile Controls */}
            <div className="mobile-controls-wrap">
              <Link className="btn-mobile-pill" href="/flavours">
                Flavours
              </Link>
              <button
                className="menu-toggle-creative"
                type="button"
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? 'Close navigation' : 'Open navigation'}
                onClick={() => setOpen((v) => !v)}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      {open ? (
        <nav className="mobile-panel" id="mobile-nav" aria-label="Mobile">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          
          <div className="mobile-section">
            <span className="mobile-label">Signature Flavours</span>
            <div className="mobile-sub">
              <Link href="/flavours" onClick={() => setOpen(false)}>All Flavours Range</Link>
              <Link href="/flavours/peri-peri" onClick={() => setOpen(false)}>🔥 Peri Peri (Bold Heat)</Link>
              <Link href="/flavours/tangy-tomato" onClick={() => setOpen(false)}>🍅 Tangy Tomato (Zesty)</Link>
              <Link href="/flavours/cheese" onClick={() => setOpen(false)}>🧀 Cheddar Cheese (Comfort)</Link>
            </div>
          </div>

          <Link href="/healthy-snacking" onClick={() => setOpen(false)}>Healthy Snacking Guide</Link>
          <Link href="/why-11pm" onClick={() => setOpen(false)}>Why 11 PM?</Link>
          <Link href="/ingredients-nutrition" onClick={() => setOpen(false)}>Ingredients &amp; Nutrition (12g Protein)</Link>
          <Link href="/our-process" onClick={() => setOpen(false)}>Our Process</Link>
          <Link href="/about" onClick={() => setOpen(false)}>Our Story</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>Contact Us</Link>

          <Link className="btn btn-gold" href="/flavours" onClick={() => setOpen(false)} style={{ marginTop: 12 }}>
            Explore All Flavours →
          </Link>
        </nav>
      ) : null}
    </div>
  );
}
