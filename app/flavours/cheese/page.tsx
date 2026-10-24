import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { NutritionHighlights } from '@/components/NutritionHighlights';
import { PackFacts } from '@/components/PackFacts';
import { PackAvailability } from '@/components/PackSizes';
import { ProductVisual } from '@/components/ProductVisual';
import { VerifiedNote } from '@/components/VerifiedNote';
import { pageMeta } from '@/lib/metadata';
import { flavourBySlug, otherFlavours } from '@/lib/site';

const flavour = flavourBySlug('cheese')!;

export const metadata: Metadata = pageMeta({
  title: flavour.headline,
  description: flavour.preview,
  path: flavour.href,
});

export default function CheesePage() {
  return (
    <article className="theme-cheese">
      <header className="campaign-hero wrap" style={{ minHeight: '70vh' }}>
        <div>
          <p className="eyebrow">{flavour.kicker}</p>
          <h1 className="display">Cheesy. Crunchy. <em>Unforgettable.</em></h1>
          <p className="lede">{flavour.subhead}</p>
          <p className="lede" style={{ marginTop: 16 }}>{flavour.personality}</p>
        </div>
        <ProductVisual
          src={flavour.pouch}
          alt="11 PM Snacks Cheddar Cheese popcorn pouch"
          priority
          caption="Golden hour"
        />
      </header>

      <section className="section night-band">
        <div className="wrap">
          <p className="eyebrow">Taste profile</p>
          <h2 className="display">Comfort, with a popcorn snap.</h2>
          <div className="taste-grid" style={{ marginTop: 28 }}>
            {flavour.taste.map((item) => (
              <article key={item.title} className="taste-card">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section cream-band">
        <div className="wrap split">
          <div>
            <p className="eyebrow">The crowd favourite</p>
            <h2 className="display">A savoury mood you already know.</h2>
            <p className="lede">
              The pack names this flavour Cheddar Cheese. It is rich, savoury, and built to feel familiar —
              still popcorn, still 11 PM, still made without palm oil.
            </p>
            <div className="highlights">
              {flavour.mood.map((mood) => <span key={mood}>{mood}</span>)}
            </div>
          </div>
          <div className="photo-frame">
            <Image src="/brand/cafe.png" alt="Warm 11 PM Snacks brand setting with popcorn" width={1200} height={1500} />
          </div>
        </div>
      </section>

      <section className="section wrap">
        <article className="info-card">
          <h3>Product information, when verified</h3>
          <p>
            Cheese popcorn uses the same small-batch path as the rest of the range: popcorn maize,
            popping with sunflower oil and without palm oil, then cheddar cheese seasoning. Net weight,
            full ingredients, allergens, and nutrition will be listed from pack artwork and lab reports.
          </p>
          <PackAvailability />
          <PackFacts />
          <VerifiedNote>
            We are not publishing a Cheese nutrition table until verified laboratory results are
            available. Until then, the pack is the source of truth.
          </VerifiedNote>
          <Link className="btn btn-gold" href="/ingredients-nutrition" style={{ marginTop: 18 }}>
            Ingredients & Nutrition
          </Link>
        </article>
      </section>

      <NutritionHighlights
        title="Comforting Cheese. Clean Ingredients."
        subtitle="Savoury indulgence that loves your body back: 12g protein per 100g, natural dietary fibre, antioxidant protection, and zero palm oil."
      />

      <section className="closing">
        <h2 className="display">More crunch, <em>other moods.</em></h2>
        <div className="other-flavours wrap" style={{ marginTop: 28, textAlign: 'left' }}>
          {otherFlavours('cheese').map((item) => (
            <Link key={item.slug} href={item.href} className={`flavour-card card-${item.theme}`}>
              <Image src={item.pouch} alt="" width={320} height={480} />
              <h3>{item.name}</h3>
              <p>{item.headline}</p>
            </Link>
          ))}
          <Link href="/flavours" className="btn btn-ghost" style={{ alignSelf: 'center', justifyContent: 'center' }}>
            Explore All Flavours
          </Link>
        </div>
      </section>
    </article>
  );
}
