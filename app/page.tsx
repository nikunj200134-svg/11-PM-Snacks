import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { NutritionHighlights } from '@/components/NutritionHighlights';
import { PackSizes } from '@/components/PackSizes';
import { ProductVisual } from '@/components/ProductVisual';
import { Reveal } from '@/components/Reveal';
import { pageMeta } from '@/lib/metadata';
import { flavours } from '@/lib/site';

export const metadata: Metadata = pageMeta({
  title: 'Your Cravings. Our Calling.',
  description:
    'Meet the crunch that hits different. 11 PM Snacks makes small-batch masala popcorn — Peri Peri, Tangy Tomato, and Cheese — without palm oil.',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <section className="hero wrap">
        <div>
          <p className="eyebrow">Late-night cravings. All-day crunch.</p>
          <h1 className="display">
            Your Cravings.<br />Our <em>Calling.</em>
          </h1>
          <p className="lede">
            Big Flavour. Thoughtful Ingredients. Made With Care. Meet the crunch that hits different —
            small-batch masala popcorn for the snack-worthy moments you already have.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 28 }}>
            <Link className="btn btn-gold" href="/flavours">Explore Our Flavours</Link>
            <Link className="btn btn-ghost" href="/about">Discover Our Story</Link>
          </div>
          <Link href="/healthy-snacking" className="hero-guide-banner" aria-label="Explore Healthy Snacking Guide">
            <span className="guide-pill">Nutrition Guide</span>
            <span className="guide-text">
              <strong>Snacking Doesn&apos;t Mean Unhealthy:</strong> Why Nutrition Matters →
            </span>
          </Link>
        </div>
        <ProductVisual
          src="/brand/burst-hero.png"
          alt="11 PM Snacks pouch bursting with seasoned popcorn"
          priority
          caption="Crunch o’clock"
        />
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} style={{ display: 'flex', gap: 28 }}>
              <span>12g Protein / 100g</span><i>★</i>
              <span>High Dietary Fibre</span><i>★</i>
              <span>Rich in Antioxidants</span><i>★</i>
              <span>Supports Heart Health</span><i>★</i>
              <span>100% Gluten Free</span><i>★</i>
              <span>Whole Wheat &amp; Grain</span><i>★</i>
              <span>Plant-Based Snacking</span><i>★</i>
              <span>Peri Peri</span><i>★</i><span>Tangy Tomato</span><i>★</i><span>Cheese</span><i>★</i>
            </span>
          ))}
        </div>
      </div>

      <section className="section wrap">
        <Reveal>
          <p className="eyebrow">Pick your popcorn personality</p>
          <h2 className="display">Three Flavours. <em>Three Different Moods.</em></h2>
        </Reveal>
        <div className="flavour-preview" style={{ marginTop: 36 }}>
          {flavours.map((item) => (
            <Link key={item.slug} href={item.href} className={`flavour-card card-${item.theme}`}>
              <Image src={item.pouch} alt="" width={420} height={630} />
              <span className="kicker">{item.kicker}</span>
              <h3>{item.name}</h3>
              <p>{item.preview}</p>
              <span className="kicker" style={{ marginTop: 16 }}>{item.cta} →</span>
            </Link>
          ))}
        </div>
        <div style={{ marginTop: 28 }}>
          <Link className="btn btn-ghost" href="/flavours">Explore All Flavours</Link>
        </div>
      </section>

      <section className="section cream-band">
        <div className="wrap split">
          <Reveal>
            <p className="eyebrow">A little more personality in every pop</p>
            <h2 className="display">Not Just Another <em>Popcorn Brand.</em></h2>
            <p className="lede">
              Snacking is a part of life. Make every crunch count. We prepare popcorn in small batches,
              season it with bold masala personalities, and leave palm oil out of the recipe — without
              telling anyone to stop munching.
            </p>
            <Link className="btn btn-dark" href="/why-11pm" style={{ marginTop: 22 }}>Why 11 PM Snacks?</Link>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="photo-frame">
              <Image
                src="/brand/showcase.png"
                alt="11 PM Snacks flavour range with peri peri, tangy tomato, and cheese popcorn"
                width={1200}
                height={1500}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <PackSizes />

      <section className="section wrap">
        <Reveal>
          <p className="eyebrow">The 11 PM difference</p>
          <h2 className="display">What we come back to.</h2>
        </Reveal>
        <div className="values" style={{ marginTop: 32 }}>
          {[
            ['Made in Small Batches', 'Attention on the pop, the seasoning, and the details that make a batch feel considered.'],
            ['Bold Masala Flavours', 'Peri Peri, Tangy Tomato, and Cheese — three moods, one serious crunch.'],
            ['No Palm Oil Used', 'A conscious ingredient choice. Not a shortcut, and not a claim that every other oil is automatically better.'],
          ].map(([title, body]) => (
            <Link key={title} href="/why-11pm" className="value">
              <strong>{title}</strong>
              <p>{body}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section cream-band">
        <div className="wrap split">
          <Reveal>
            <p className="eyebrow">A little kernel know-how</p>
            <h2 className="display">Get to Know <em>Your Popcorn.</em></h2>
            <p className="lede">
              Popcorn starts as a kernel with a job to do. Once it pops, you get a snack that naturally
              brings dietary fibre and plant-based protein — amounts in the finished, seasoned product
              belong on a verified nutrition panel, not in a guess.
            </p>
            <Link className="btn btn-dark" href="/ingredients-nutrition">Explore Ingredients & Nutrition</Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="photo-frame">
              <Image
                src="/brand/clusters.png"
                alt="Close-up of masala-seasoned 11 PM Snacks popcorn"
                width={1200}
                height={900}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Healthy Snacking Guide Feature Section */}
      <section className="section wrap" id="healthy-snacking">
        <div className="split" style={{ alignItems: 'center' }}>
          <Reveal>
            <p className="eyebrow">Nutrition Guide · Health Matters</p>
            <h2 className="display">
              Snacking Doesn&apos;t Mean Unhealthy. <em>Choose Smarter.</em>
            </h2>
            <p className="lede">
              We have been taught to feel guilty about snacking. But cravings aren&apos;t bad —
              ultra-processed junk is. Proper nutrition and smart snacking give you continuous mental
              focus, active metabolism, and guilt-free crunch.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 14, margin: '26px 0 28px' }}>
              <div style={{ padding: '16px', background: '#fff', border: '1px solid var(--stroke)', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <span style={{ fontSize: 26, display: 'block', marginBottom: 8 }}>🧠</span>
                <strong style={{ fontFamily: 'var(--font-display)', fontSize: 17, textTransform: 'uppercase', color: 'var(--ink)', letterSpacing: '0.02em', display: 'block' }}>Sustained Energy</strong>
                <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--muted)', lineHeight: 1.55 }}>Whole grain complex carbs prevent steep glucose spikes and midday brain fog.</p>
              </div>
              <div style={{ padding: '16px', background: '#fff', border: '1px solid var(--stroke)', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <span style={{ fontSize: 26, display: 'block', marginBottom: 8 }}>🌾</span>
                <strong style={{ fontFamily: 'var(--font-display)', fontSize: 17, textTransform: 'uppercase', color: 'var(--ink)', letterSpacing: '0.02em', display: 'block' }}>Dietary Fibre</strong>
                <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--muted)', lineHeight: 1.55 }}>Promotes smooth gut digestion and provides lasting satiety between daily meals.</p>
              </div>
              <div style={{ padding: '16px', background: '#fff', border: '1px solid var(--stroke)', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <span style={{ fontSize: 26, display: 'block', marginBottom: 8 }}>❤️</span>
                <strong style={{ fontFamily: 'var(--font-display)', fontSize: 17, textTransform: 'uppercase', color: 'var(--ink)', letterSpacing: '0.02em', display: 'block' }}>Zero Palm Oil</strong>
                <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--muted)', lineHeight: 1.55 }}>Crafted in heart-friendly sunflower oil with 0g trans-fat and zero cholesterol.</p>
              </div>
              <div style={{ padding: '16px', background: '#fff', border: '1px solid var(--stroke)', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <span style={{ fontSize: 26, display: 'block', marginBottom: 8 }}>⚡</span>
                <strong style={{ fontFamily: 'var(--font-display)', fontSize: 17, textTransform: 'uppercase', color: 'var(--ink)', letterSpacing: '0.02em', display: 'block' }}>12g Plant Protein</strong>
                <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--muted)', lineHeight: 1.55 }}>Naturally power-packed per 100g to fuel recovery and keep hunger stabilized.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link className="btn btn-gold" href="/healthy-snacking">
                Explore Healthy Snacking Guide →
              </Link>
              <Link className="btn btn-ghost" href="/ingredients-nutrition">
                View Full Nutrition Details
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="photo-frame">
              <Image
                src="/brand/lifestyle-share.png"
                alt="Friends enjoying healthy whole grain popcorn snacking together"
                width={1200}
                height={1500}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <NutritionHighlights />

      <section className="closing">
        <p className="eyebrow">A closer look</p>
        <h2 className="display">Junk Food Is Everywhere. <em>Make Your Next Snack Choice Count.</em></h2>
        <p className="lede" style={{ marginInline: 'auto' }}>
          You don&apos;t need to stop enjoying your favourite snack moments. Just take a closer look at
          what you&apos;re choosing.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 12, marginTop: 28 }}>
          <Link className="btn btn-gold" href="/why-11pm">Get to Know 11 PM Snacks</Link>
          <Link className="btn btn-ghost" href="/flavours">Explore Our Flavours</Link>
        </div>
      </section>
    </>
  );
}
