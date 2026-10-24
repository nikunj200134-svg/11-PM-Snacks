import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { NutritionHighlights } from '@/components/NutritionHighlights';
import { Reveal } from '@/components/Reveal';
import { pageMeta } from '@/lib/metadata';

export const metadata: Metadata = pageMeta({
  title: 'Healthy Snacking Guide · Why Nutrition Matters',
  description:
    'Discover how proper nutrition, a balanced diet, and mindful plant-based snacking can transform your everyday energy. Snacking does not have to mean unhealthy.',
  path: '/healthy-snacking',
});

const snackComparison = [
  {
    feature: 'Oil Used',
    junk: 'Palm oil or recycled cooking oils high in saturated fats',
    healthy: 'Clean, heart-smart sunflower oil (0% palm oil)',
  },
  {
    feature: 'Grain Base',
    junk: 'Refined flour (maida), high-starch fillers & additives',
    healthy: '100% unrefined whole grain corn with bran & germ',
  },
  {
    feature: 'Dietary Fibre',
    junk: 'Stripped away during heavy industrial processing',
    healthy: 'Naturally rich in fibre — promotes gut microbiome health',
  },
  {
    feature: 'Plant Protein',
    junk: 'Negligible protein, high empty calories & sugar spikes',
    healthy: '12g clean plant-based protein per 100g serving',
  },
  {
    feature: 'Cooking Method',
    junk: 'Deep-fried in oil vats at extreme temperatures',
    healthy: 'Hot-air & small-batch popped, light & airy snap',
  },
  {
    feature: 'Post-Snack Feeling',
    junk: 'Sluggishness, bloating, and steep energy crash',
    healthy: 'Steady, sustained energy and lasting satiety',
  },
];

const snackingPillars = [
  {
    icon: '🧠',
    title: 'Cognitive Focus & Energy',
    desc: 'When you snack on complex whole grains instead of refined sugar, glucose is released steadily into your bloodstream. This prevents mid-day brain fog and sustains sharp concentration through long meetings or study sessions.',
  },
  {
    icon: '⚖️',
    title: 'Prevents Mealtime Overeating',
    desc: 'Going 5 to 6 hours without nourishment causes blood sugar dips that trigger intense hunger hormones (ghrelin). A mindful, high-fibre snack between meals keeps hunger stabilized so you make rational meal choices.',
  },
  {
    icon: '🧬',
    title: 'Cellular Defense with Antioxidants',
    desc: 'Whole grain popcorn hulls concentrate powerful polyphenols — active plant antioxidants that help protect cells from daily oxidative stress, pollution, and inflammation.',
  },
  {
    icon: '❤️',
    title: 'Cardiovascular Care',
    desc: 'Replacing artery-clogging palm oils and trans-fats with heart-healthy sunflower oil supports healthy cholesterol ratios and arterial elasticity for long-term heart health.',
  },
];

export default function HealthySnackingPage() {
  return (
    <article>
      {/* Educational Hero */}
      <header className="page-hero wrap">
        <p className="eyebrow">Nutrition Education · Health Matters</p>
        <h1 className="display">
          Snacking Doesn&apos;t Mean Unhealthy. <em>Choose Better.</em>
        </h1>
        <p className="lede">
          We have been taught to feel guilty about cravings. But snacking itself isn&apos;t the enemy —
          unconscious, ultra-processed junk is. Discover how mindful, nutrient-dense snacking fits
          seamlessly into a balanced, energizing lifestyle.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
          <Link className="btn btn-gold" href="/flavours">Explore Clean Crunch</Link>
          <Link className="btn btn-ghost" href="/ingredients-nutrition">See Full Nutrition</Link>
        </div>
      </header>

      {/* Educational Pillar Section 1: The Modern Snacking Reality */}
      <section className="section cream-band">
        <div className="wrap split">
          <Reveal>
            <p className="eyebrow">The Snacking Truth</p>
            <h2 className="display">
              Why A Proper Diet <em>Needs Smart Snacks.</em>
            </h2>
            <p className="lede">
              Between busy workdays, gym sessions, late-night studies, and weekend films, our bodies
              burn continuous energy. Waiting until dinner when you&apos;re ravenous often leads to heavy,
              unbalanced meals and sluggish digestion.
            </p>
            <p className="lede">
              A nutritious snack is an opportunity to fuel your body with dietary fibre, plant protein,
              and protective polyphenols. It bridges the gap between meals, keeping your metabolism
              active and your mood balanced.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="photo-frame">
              <Image
                src="/brand/lifestyle-share.png"
                alt="Friends enjoying a healthy snack break together"
                width={1200}
                height={1500}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4 Health Pillars Grid */}
      <section className="section wrap">
        <Reveal>
          <div style={{ textAlign: 'center', maxWidth: '44rem', marginInline: 'auto' }}>
            <p className="eyebrow" style={{ justifyContent: 'center' }}>Science-Backed Nutrition</p>
            <h2 className="display">How Mindful Snacking <em>Supports Your Body.</em></h2>
            <p className="lede" style={{ marginInline: 'auto' }}>
              Snacking with intention supports four critical pillars of everyday health:
            </p>
          </div>
        </Reveal>

        <div className="taste-grid" style={{ marginTop: 36 }}>
          {snackingPillars.map((pillar) => (
            <article key={pillar.title} className="taste-card" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontSize: 32 }} aria-hidden="true">{pillar.icon}</span>
              <h3>{pillar.title}</h3>
              <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>{pillar.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Comparison: Typical Junk vs. 11 PM Whole Grain Popcorn */}
      <section className="section night-band">
        <div className="wrap">
          <Reveal>
            <div style={{ textAlign: 'center', maxWidth: '48rem', marginInline: 'auto', marginBottom: 40 }}>
              <p className="eyebrow" style={{ justifyContent: 'center', color: 'var(--gold)' }}>The Comparison</p>
              <h2 className="display" style={{ color: '#fff' }}>
                Ultra-Processed Junk vs. <em>Clean Popcorn.</em>
              </h2>
              <p className="lede" style={{ color: '#f3e6d6', marginInline: 'auto' }}>
                Knowing how to read labels empowers you to choose snacks that nourish rather than deplete:
              </p>
            </div>
          </Reveal>

          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'left',
                background: 'rgba(255, 255, 255, 0.04)',
                borderRadius: 12,
                overflow: 'hidden',
                border: '1px solid rgba(240, 196, 58, 0.3)',
              }}
            >
              <thead>
                <tr style={{ background: 'rgba(240, 196, 58, 0.15)', borderBottom: '2px solid var(--gold)' }}>
                  <th style={{ padding: '16px 20px', fontFamily: 'var(--font-display)', fontSize: 20, letterSpacing: '0.06em', color: 'var(--gold)', textTransform: 'uppercase' }}>Nutrition Aspect</th>
                  <th style={{ padding: '16px 20px', fontFamily: 'var(--font-display)', fontSize: 20, letterSpacing: '0.06em', color: '#ff7b72', textTransform: 'uppercase' }}>Ordinary Fried Snacks / Chips</th>
                  <th style={{ padding: '16px 20px', fontFamily: 'var(--font-display)', fontSize: 20, letterSpacing: '0.06em', color: 'var(--gold)', textTransform: 'uppercase' }}>11 PM Whole Grain Popcorn</th>
                </tr>
              </thead>
              <tbody>
                {snackComparison.map((row, idx) => (
                  <tr key={row.feature} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', background: idx % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.02)' }}>
                    <td style={{ padding: '16px 20px', fontWeight: 700, color: 'var(--cream)', fontSize: 15 }}>{row.feature}</td>
                    <td style={{ padding: '16px 20px', color: '#e6a19b', fontSize: 14 }}>{row.junk}</td>
                    <td style={{ padding: '16px 20px', color: '#f6ebd8', fontWeight: 600, fontSize: 14 }}>{row.healthy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5 Golden Rules of Healthy Snacking */}
      <section className="section wrap">
        <div className="split">
          <Reveal>
            <p className="eyebrow">Practical Wisdom</p>
            <h2 className="display">5 Golden Rules of <em>Smart Snacking.</em></h2>
            <div style={{ display: 'grid', gap: 16, marginTop: 24 }}>
              {[
                ['1. Check The First Ingredient', 'Look for 100% whole grains or real agricultural produce, not refined flour or starches.'],
                ['2. Look For Visible Fibre', 'Snacks with high dietary fibre digest slowly, providing sustained stamina without sharp hunger rebounds.'],
                ['3. Insist on Zero Palm Oil', 'Pick snacks prepared with heart-healthy oils like sunflower oil with 0g trans fats and zero cholesterol.'],
                ['4. Power Up With Plant Protein', 'Look for natural protein (like 12g protein per 100g) that repairs muscles and keeps cravings in check.'],
                ['5. Portion With Intention', 'Choose single-serve 30g Everyday packs for quick work breaks, or 90g Jumbo packs when sharing with friends.'],
              ].map(([rule, desc]) => (
                <div key={rule} style={{ padding: '14px 18px', background: '#fff', borderLeft: '4px solid var(--gold)', borderRadius: '0 8px 8px 0', border: '1px solid var(--stroke)', borderLeftWidth: 4, borderLeftColor: 'var(--gold)' }}>
                  <strong style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--ink)' }}>{rule}</strong>
                  <span style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.5 }}>{desc}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="photo-frame">
              <Image
                src="/brand/lifestyle-joy.png"
                alt="Outdoor healthy lifestyle with popcorn snack"
                width={1200}
                height={1500}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 7 Pillars of 11 PM Popcorn */}
      <NutritionHighlights
        title="Popcorn Reimagined: The Healthy Snacker’s Choice"
        subtitle="Every handful of 11 PM Snacks is small-batch popped from 100% whole grain corn, delivering 12g protein per 100g, rich antioxidants, and zero palm oil."
      />

      {/* Closing Call to Action */}
      <section className="closing">
        <p className="eyebrow">Your Health Matters</p>
        <h2 className="display">
          Don&apos;t Stop Snacking. <em>Start Snacking Smarter.</em>
        </h2>
        <p className="lede" style={{ marginInline: 'auto' }}>
          Celebrate your cravings with bold masala flavour, honest ingredients, and the crunch your body deserves.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 12, marginTop: 28 }}>
          <Link className="btn btn-gold" href="/flavours">Explore Our Flavours</Link>
          <Link className="btn btn-ghost" href="/why-11pm">Why 11 PM Snacks</Link>
        </div>
      </section>
    </article>
  );
}
