import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { NutritionHighlights } from '@/components/NutritionHighlights';
import { PackSizes } from '@/components/PackSizes';
import { pageMeta } from '@/lib/metadata';
import { flavours } from '@/lib/site';

export const metadata: Metadata = pageMeta({
  title: 'Find Your Kind of Crunch',
  description: 'Three signature 11 PM Snacks flavours. Three different personalities. Explore Peri Peri, Tangy Tomato, and Cheese popcorn.',
  path: '/flavours',
});

export default function FlavoursPage() {
  return (
    <>
      <header className="page-hero wrap">
        <p className="eyebrow">The collection</p>
        <h1 className="display">Find Your Kind of <em>Crunch.</em></h1>
        <p className="lede">
          Three signature flavours. Three different personalities. Two pack sizes — 30 g at ₹30 and 90 g
          at ₹60. One seriously satisfying snack experience, with nothing added to a cart.
        </p>
      </header>

      <div className="wrap showcase">
        {flavours.map((item, index) => (
          <article key={item.slug} className={`showcase-block show-${item.theme}`}>
            <div>
              <span className="kicker">{item.kicker}</span>
              <h2 className="display" style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)', margin: '10px 0 16px' }}>
                {item.headline}
              </h2>
              <p className="lede">{item.preview}</p>
              <p className="kicker" style={{ margin: '18px 0' }}>{item.mood.join(' · ')}</p>
              <Link className="btn btn-gold" href={item.href}>{item.cta}</Link>
            </div>
            <Image
              src={item.pouch}
              alt={`11 PM Snacks ${item.name} popcorn pouch`}
              width={900}
              height={1350}
              priority={index === 0}
            />
          </article>
        ))}
      </div>

      <PackSizes eyebrow="Pick your moment" />
      <NutritionHighlights
        title="Wholesome Goodness. In Every Flavour."
        subtitle="Whichever flavour matches your mood, every crunch delivers 12g protein per 100g, high dietary fibre, rich antioxidants, and zero palm oil."
      />
    </>
  );
}
