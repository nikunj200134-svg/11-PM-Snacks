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

const flavour = flavourBySlug('tangy-tomato')!;

export const metadata: Metadata = pageMeta({
  title: flavour.headline,
  description: flavour.preview,
  path: flavour.href,
});

export default function TangyTomatoPage() {
  return (
    <article className="theme-tomato">
      <header className="page-hero wrap" style={{ textAlign: 'center' }}>
        <p className="eyebrow" style={{ justifyContent: 'center' }}>{flavour.kicker}</p>
        <h1 className="display">Get Ready to <em>Tang.</em></h1>
        <p className="lede" style={{ marginInline: 'auto' }}>{flavour.subhead}</p>
      </header>

      <div className="wrap" style={{ paddingBottom: 48 }}>
        <ProductVisual
          src={flavour.pouch}
          alt="11 PM Snacks Tangy Tomato popcorn pouch"
          priority
          caption="Tomato twist"
        />
      </div>

      <section className="section cream-band">
        <div className="wrap">
          <p className="eyebrow">A brighter kind of masala</p>
          <h2 className="display" style={{ maxWidth: '16ch' }}>The flavour that lifts the room.</h2>
          <div className="split" style={{ marginTop: 28, alignItems: 'start' }}>
            <p className="lede">{flavour.personality}</p>
            <p className="lede">
              Where Peri Peri brings heat, Tangy Tomato brings spark. It is tomato-led, lively, and made
              for the snack break that needs energy — a movie intermission, a study stretch, a late
              afternoon that asks for something punchy.
            </p>
          </div>
        </div>
      </section>

      <section className="section wrap">
        <div className="split">
          <div>
            <p className="eyebrow">Taste profile</p>
            <h2 className="display">Tang first. Crunch after.</h2>
            <div style={{ display: 'grid', gap: 16, marginTop: 24 }}>
              {flavour.taste.map((item) => (
                <article key={item.title} className="taste-card">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="photo-frame">
            <Image src="/brand/celebration.png" alt="Seasoned popcorn clusters" width={900} height={900} />
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'linear-gradient(90deg, #ef4e32 0%, #ff8a4a 100%)', color: '#fff7ea' }}>
        <div className="wrap split">
          <div>
            <h2 className="display">What we can say today.</h2>
            <p className="lede" style={{ color: '#fff3e6' }}>
              The Tangy Tomato pouch artwork states sunflower oil and the same pack icons as the rest of
              the range. Ingredient lists, allergens, and nutrition values will be published from approved
              pack copy and laboratory reports — not estimated for the website.
            </p>
            <PackAvailability />
            <PackFacts />
            <VerifiedNote>
              No invented tomato percentages, spice blends, or nutrition tables. Check the pack, then
              come back to Ingredients & Nutrition as verified data is added.
            </VerifiedNote>
            <Link className="btn btn-dark" href="/ingredients-nutrition" style={{ marginTop: 20 }}>
              Ingredients & Nutrition
            </Link>
          </div>
          <Image src={flavour.pouch} alt="11 PM Snacks Tangy Tomato packaging" width={900} height={1350} />
        </div>
      </section>

      <NutritionHighlights
        title="Tangy Spark. Real Wholesome Energy."
        subtitle="Bright, lively crunch loaded with 12g protein per 100g, dietary fibre, heart-healthy sunflower oil, and rich natural antioxidants."
      />

      <section className="section wrap">
        <h2 className="display">If tang is not the mood.</h2>
        <div className="other-flavours" style={{ marginTop: 24 }}>
          {otherFlavours('tangy-tomato').map((item) => (
            <Link key={item.slug} href={item.href} className={`flavour-card card-${item.theme}`}>
              <Image src={item.pouch} alt="" width={320} height={480} />
              <h3>{item.name}</h3>
              <p>{item.headline}</p>
            </Link>
          ))}
          <Link href="/flavours" className="flavour-card" style={{ background: '#111' }}>
            <span className="kicker">Collection</span>
            <h3>Explore All Flavours</h3>
          </Link>
        </div>
      </section>
    </article>
  );
}
