import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { NutritionHighlights } from '@/components/NutritionHighlights';
import { PackFacts } from '@/components/PackFacts';
import { PackAvailability } from '@/components/PackSizes';
import { ProductVisual } from '@/components/ProductVisual';
import { Reveal } from '@/components/Reveal';
import { VerifiedNote } from '@/components/VerifiedNote';
import { pageMeta } from '@/lib/metadata';
import { flavourBySlug, otherFlavours } from '@/lib/site';

const flavour = flavourBySlug('peri-peri')!;

export const metadata: Metadata = pageMeta({
  title: flavour.headline,
  description: flavour.preview,
  path: flavour.href,
});

export default function PeriPeriPage() {
  return (
    <article className="theme-peri">
      <header className="campaign-hero wrap">
        <div className="campaign-copy">
          <p className="eyebrow">{flavour.kicker}</p>
          <h1 className="display">Bring on the <em>Heat.</em></h1>
          <p className="lede">{flavour.subhead}</p>
          <div className="highlights">
            {flavour.mood.map((mood) => <span key={mood}>{mood}</span>)}
          </div>
        </div>
        <ProductVisual
          src={flavour.pouch}
          alt="11 PM Snacks Peri Peri popcorn pouch"
          priority
          caption="Peri Peri energy"
        />
      </header>

      <section className="section night-band">
        <div className="wrap split">
          <Reveal>
            <p className="eyebrow">Flavour personality</p>
            <h2 className="display">Built for people who like it <em>loud.</em></h2>
            <p className="lede">{flavour.personality}</p>
            <p className="lede">
              Peri Peri is not trying to be a gentle snack. It is the firestarter in the range: masala heat,
              a punchy first handful, and the same popcorn crunch that holds the other two flavours together.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="photo-frame">
              <Image src="/brand/peri-burst.png" alt="Masala-seasoned popcorn with peri peri heat styling" width={1200} height={900} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section wrap">
        <p className="eyebrow">Taste profile</p>
        <h2 className="display">How the heat shows up.</h2>
        <div className="taste-grid" style={{ marginTop: 28 }}>
          {flavour.taste.map((item) => (
            <article key={item.title} className="taste-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section cream-band">
        <div className="wrap split">
          <Image src={flavour.pouch} alt="11 PM Snacks Peri Peri pack artwork" width={900} height={1350} />
          <div>
            <p className="eyebrow">On the pack</p>
            <h2 className="display">Ingredients, allergens, <em>nutrition.</em></h2>
            <p className="lede">
              The Peri Peri pouch artwork states: popped popcorn, made with sunflower oil, and pack icons
              for protein, fibre, and gluten free. Exact ingredient order, allergen declarations, net weight,
              and nutrition figures belong on the printed pack and any laboratory report we publish.
            </p>
            <PackAvailability />
            <PackFacts />
            <VerifiedNote>
              Verified Peri Peri nutrition figures and a full ingredient list are not reproduced as numbers
              here yet. Please read the pack in your hand.
            </VerifiedNote>
            <Link className="btn btn-dark" href="/ingredients-nutrition" style={{ marginTop: 20 }}>
              Ingredients & Nutrition
            </Link>
          </div>
        </div>
      </section>

      <NutritionHighlights
        title="Bold Peri Peri Flavour. Power Nutrition."
        subtitle="Behind the fiery masala heat sits real wholesome fuel: 12g protein per 100g, abundant dietary fibre, antioxidant polyphenols, and zero palm oil."
      />

      <section className="section wrap">
        <p className="eyebrow">Still hungry?</p>
        <h2 className="display">Meet the other moods.</h2>
        <div className="other-flavours" style={{ marginTop: 24 }}>
          {otherFlavours('peri-peri').map((item) => (
            <Link key={item.slug} href={item.href} className={`flavour-card card-${item.theme}`}>
              <Image src={item.pouch} alt="" width={320} height={480} />
              <h3>{item.name}</h3>
              <p>{item.headline}</p>
            </Link>
          ))}
          <Link href="/flavours" className="flavour-card" style={{ background: '#111' }}>
            <h3>All flavours</h3>
            <p>Explore the full crunch collection.</p>
            <span className="kicker">Explore All Flavours →</span>
          </Link>
        </div>
      </section>
    </article>
  );
}
