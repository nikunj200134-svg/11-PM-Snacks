import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { NutritionHighlights } from '@/components/NutritionHighlights';
import { Reveal } from '@/components/Reveal';
import { pageMeta } from '@/lib/metadata';
import { flavours, labelChecks } from '@/lib/site';

export const metadata: Metadata = pageMeta({
  title: 'Meet a More Thoughtful Kind of Crunch',
  description:
    'Why 11 PM Snacks: everyday cravings, no palm oil, small-batch popcorn, bold masala flavours, and honest labels — without giving up the joy of munching.',
  path: '/why-11pm',
});

export default function WhyPage() {
  return (
    <>
      <header className="page-hero wrap">
        <p className="eyebrow">Snacking is a part of life</p>
        <h1 className="display">Meet a More Thoughtful Kind of <em>Crunch.</em></h1>
        <p className="lede">
          Big Flavour. Thoughtful Ingredients. Made With Care. We understand everyday cravings — and
          we would rather help you choose a snack than tell you to stop snacking.
        </p>
      </header>

      <section className="section cream-band">
        <div className="wrap split">
          <Reveal>
            <p className="eyebrow">The snacking reality</p>
            <h2 className="display">Life Is Full of Cravings. <em>Your Snack Choice Matters.</em></h2>
            <p className="lede">
              From office breaks to movie nights, snacking is part of our everyday lives. But many
              popular packaged snacks contain ingredients or nutritional profiles that may not suit
              everyone&apos;s preferences or dietary needs.
            </p>
            <p className="lede">
              At 11 PM Snacks, we believe you shouldn&apos;t have to give up the joy of munching. We
              want to offer a flavourful alternative made with attention to ingredients, small-batch
              production, and the crunch you love.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="photo-frame">
              <Image src="/brand/lifestyle-share.png" alt="Friends sharing a snack moment with popcorn" width={1200} height={1500} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="statement-band">
        <h2 className="display">Don&apos;t Stop Munching. <em>Start Choosing Thoughtfully.</em></h2>
      </section>

      <section className="section wrap">
        <p className="eyebrow">How to look at a pack</p>
        <h2 className="display">Labels beat slogans.</h2>
        <p className="lede">
          Different snacks have different formulations. We are not saying every packaged snack is
          unhealthy, or that every competing product uses palm oil. You can make a more informed choice
          by reading what is actually on the pack.
        </p>
        <div className="taste-grid" style={{ marginTop: 28 }}>
          {labelChecks.map((item) => (
            <article key={item.title} className="taste-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section cream-band">
        <div className="wrap split">
          <Reveal>
            <p className="eyebrow">A. No palm oil used</p>
            <h2 className="display">Good to Know What&apos;s in <em>Your Snack.</em></h2>
            <p className="lede">
              We don&apos;t use palm oil in our popcorn. We believe ingredient transparency matters, and
              we want you to know the choices behind the crunch.
            </p>
            <p className="lede">
              Avoiding palm oil does not automatically make a food healthy. The overall nutritional
              profile depends on the complete recipe — including the oil used, seasoning, fat content,
              and sodium. Our pouches name sunflower oil. That is what we can stand on today.
            </p>
          </Reveal>
          <div className="photo-frame">
            <Image src="/brand/clusters.png" alt="Close-up of seasoned 11 PM Snacks popcorn" width={1200} height={900} />
          </div>
        </div>
      </section>

      <section className="section wrap">
        <div className="split">
          <div className="photo-frame">
            <Image src="/brand/uniform.png" alt="11 PM Snacks production and packing mood" width={1200} height={1500} />
          </div>
          <Reveal>
            <p className="eyebrow">B. Small-batch production</p>
            <h2 className="display">Small Batches. <em>Made With Care.</em></h2>
            <p className="lede">
              We prepare our popcorn in small batches, paying attention to the popping process,
              seasoning, and packaging. Because the little details matter when you&apos;re making a snack
              people come back to.
            </p>
            <p className="lede">
              Small-batch here means the work is sized so we can watch it. It is not a claim that every
              motion is handmade, and it is not a freshness guarantee or a certification we have not
              earned.
            </p>
            <Link className="btn btn-ghost" href="/our-process" style={{ marginTop: 18 }}>See the process</Link>
          </Reveal>
        </div>
      </section>

      <section className="section night-band">
        <div className="wrap">
          <p className="eyebrow">C. Flavour that makes munching fun</p>
          <h2 className="display">Your Cravings. <em>Three Different Flavours.</em></h2>
          <p className="lede">
            Whether you love a spicy kick, a tangy twist, or a savoury cheesy taste, there&apos;s a
            flavour to explore.
          </p>
          <div className="other-flavours" style={{ marginTop: 32 }}>
            {flavours.map((item) => (
              <Link key={item.slug} href={item.href} className={`flavour-card card-${item.theme}`}>
                <Image src={item.pouch} alt="" width={320} height={480} />
                <h3>{item.name}</h3>
                <p>{item.headline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section cream-band">
        <div className="wrap">
          <p className="eyebrow">D. Everyday snacking</p>
          <h2 className="display">Made for the Moments <em>Between Everything.</em></h2>
          <p className="lede">
            Midnight movies. Long workdays. Study sessions. Family time. Cravings don&apos;t follow a
            clock, and neither should the joy of a good snack. We do not claim this popcorn is right
            for every age group or every dietary requirement — read the pack for ingredients and
            allergens.
          </p>
          <div className="occasion-grid">
            <figure>
              <Image src="/brand/lifestyle-joy.png" alt="Outdoor snack break with popcorn" width={800} height={1000} />
              <figcaption>Work &amp; study breaks</figcaption>
            </figure>
            <figure>
              <Image src="/brand/cafe.png" alt="A cafe table with 11 PM Snacks popcorn" width={800} height={1000} />
              <figcaption>Family time</figcaption>
            </figure>
            <figure>
              <Image src="/brand/celebration.png" alt="Celebratory popcorn moment" width={800} height={1000} />
              <figcaption>Movie nights &amp; get-togethers</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <NutritionHighlights
        title="Why 11 PM Snacks? Fuel That Fits Your Life."
        subtitle="12g protein per 100g, rich in antioxidants, high in dietary fibre, gluten free, heart-friendly sunflower oil, and 100% plant-based crunch."
      />

      <section className="closing">
        <p className="eyebrow">A closer look</p>
        <h2 className="display">Junk Food Is Everywhere. <em>Make Your Next Snack Choice Count.</em></h2>
        <p className="lede" style={{ marginInline: 'auto' }}>
          You don&apos;t need to stop enjoying your favourite snack moments. Just take a closer look at
          what you&apos;re choosing. Discover bold masala flavours, small-batch popcorn, and our
          no-palm-oil approach — not a promise that 11 PM Snacks is automatically healthier than every
          other snack.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 12, marginTop: 28 }}>
          <Link className="btn btn-gold" href="/about">Get to Know 11 PM Snacks</Link>
          <Link className="btn btn-ghost" href="/flavours">Explore Our Flavours</Link>
        </div>
      </section>
    </>
  );
}
