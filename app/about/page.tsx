import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { NutritionHighlights } from '@/components/NutritionHighlights';
import { Reveal } from '@/components/Reveal';
import { pageMeta } from '@/lib/metadata';

export const metadata: Metadata = pageMeta({
  title: 'We Don’t Believe You Should Have to Give Up Snacking',
  description:
    'The 11 PM Snacks story: everyday cravings, bold masala popcorn, small-batch production, no palm oil, and two pack sizes — without a fabricated founder myth.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <header className="page-hero wrap">
        <p className="eyebrow">Our story</p>
        <h1 className="display">We Don&apos;t Believe You Should Have to <em>Give Up Snacking.</em></h1>
      </header>

      <section className="section wrap">
        <p className="lede" style={{ fontSize: '1.25rem' }}>
          Life comes with cravings. The afternoon energy dip, the movie-night munchies, the late-night
          study session, the little break between big tasks.
        </p>
        <p className="lede">
          At 11 PM Snacks, we believe these moments deserve a snack worth enjoying.
        </p>
        <p className="lede">
          That&apos;s why we&apos;re building our brand around bold masala flavours, small-batch
          production, and a commitment to making popcorn without palm oil.
        </p>
        <p className="lede">
          We want to make it easier to discover a snack you enjoy while understanding its ingredients
          and nutritional information.
        </p>
        <p className="lede">
          Three flavours. Two pack sizes. Countless everyday snack moments.
        </p>
        <p className="lede">We&apos;re 11 PM Snacks. Your cravings, our calling.</p>
      </section>

      <section className="section cream-band">
        <div className="wrap split">
          <Reveal>
            <p className="eyebrow">Philosophy</p>
            <h2 className="display">Snacking Is a Part of Life. <em>Make Every Crunch Count.</em></h2>
            <p className="lede">
              Big Flavour. Thoughtful Ingredients. Made With Care. We are not a medical food, a
              weight-loss plan, or a reason to feel guilty about other snacks. We are popcorn with
              personality — and a preference for saying what we know.
            </p>
            <p className="lede">
              That includes sunflower oil on the pack, no palm oil in the recipe, and nutrition tables
              only when the lab and the label agree. We would rather skip a founder myth, an award wall,
              or a longer history than the brand has lived.
            </p>
          </Reveal>
          <div className="photo-frame">
            <Image src="/brand/collage.png" alt="11 PM Snacks brand collage with packs and popcorn" width={1200} height={1500} />
          </div>
        </div>
      </section>

      <section className="section wrap">
        <div className="values">
          <article className="value">
            <strong>Mission</strong>
            <p>Make masala-flavoured popcorn people actually want to finish — and can look at on a label without a shrug.</p>
          </article>
          <article className="value">
            <strong>Vision</strong>
            <p>Become the crunch people reach for when the hour is late or the movie is long. Starting with popcorn.</p>
          </article>
          <article className="value">
            <strong>Why popcorn</strong>
            <p>It pops. It carries flavour. It already belongs in the moments we snack through. We did not need a more complicated canvas.</p>
          </article>
        </div>
      </section>

      <section className="section cream-band">
        <div className="wrap split">
          <div className="photo-frame">
            <Image src="/brand/joy-portrait.png" alt="Someone enjoying 11 PM Snacks popcorn" width={900} height={1200} />
          </div>
          <div>
            <p className="eyebrow">Values</p>
            <h2 className="display">The short list.</h2>
            <div className="taste-grid" style={{ marginTop: 24 }}>
              <article className="taste-card">
                <h3>Small batches</h3>
                <p>Work sized so the pop and the seasoning can still be noticed.</p>
              </article>
              <article className="taste-card">
                <h3>Bold masala</h3>
                <p>Peri Peri, Tangy Tomato, Cheese — flavours with personalities, not beige popcorn.</p>
              </article>
              <article className="taste-card">
                <h3>No palm oil</h3>
                <p>An ingredient line we are willing to stand on, without turning it into a health sermon.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <NutritionHighlights
        title="Our Story Is Built On Real Nutrition."
        subtitle="We started 11 PM Snacks so you wouldn't have to sacrifice health for crunch: 12g protein per 100g, heart-healthy sunflower oil, fibre, and clean plant ingredients."
      />

      <section className="closing">
        <p className="eyebrow">Your next handful</p>
        <h2 className="display">Junk Food Is Everywhere. <em>Make Your Next Snack Choice Count.</em></h2>
        <p className="lede" style={{ marginInline: 'auto' }}>
          You don&apos;t need to stop enjoying snack moments. Take a closer look at the crunch you pick.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 12, marginTop: 28 }}>
          <Link className="btn btn-gold" href="/why-11pm">Get to Know 11 PM Snacks</Link>
          <Link className="btn btn-ghost" href="/flavours">Explore Our Flavours</Link>
        </div>
      </section>
    </>
  );
}
