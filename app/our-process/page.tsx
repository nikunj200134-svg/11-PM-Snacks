import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { NutritionHighlights } from '@/components/NutritionHighlights';
import { Reveal } from '@/components/Reveal';
import { pageMeta } from '@/lib/metadata';
import { processSteps } from '@/lib/site';

export const metadata: Metadata = pageMeta({
  title: 'From Kernel to Crunch',
  description: 'How 11 PM Snacks popcorn is prepared: kernels, popping, cooling, seasoning, checks, and packing — in small batches.',
  path: '/our-process',
});

export default function ProcessPage() {
  return (
    <>
      <header className="page-hero wrap">
        <p className="eyebrow">The making of a handful</p>
        <h1 className="display">From Kernel to <em>Crunch.</em></h1>
        <p className="lede">Every great handful starts with the little details.</p>
      </header>

      <section className="wrap" style={{ paddingBottom: 40 }}>
        <Image
          src="/brand/burst-hero.png"
          alt="11 PM Snacks pouch after popping, seasoning, and packing"
          width={900}
          height={1200}
          style={{ width: 'min(360px, 70%)', marginInline: 'auto', display: 'block' }}
          priority
        />
      </section>

      <section className="section cream-band">
        <div className="wrap">
          <p className="lede" style={{ marginBottom: 12 }}>
            This is the path a batch follows. Some of it is done with dedicated popping, cooling,
            seasoning, and packing equipment. None of it is described here as a fully manual craft
            unless that is how a particular step is actually run.
          </p>
          <ol className="timeline">
            {processSteps.map((step, index) => (
              <li key={step.n} className="step">
                <Reveal delay={index * 0.04}>
                  <span className="n">{step.n}</span>
                  <h2 className="display" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>{step.title}</h2>
                  <p className="lede">{step.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section wrap split">
        <div className="photo-frame">
          <Image src="/brand/peri-burst.png" alt="Seasoned popcorn after flavour is applied" width={1200} height={900} />
        </div>
        <div>
          <p className="eyebrow">Why the order matters</p>
          <h2 className="display">Pop first. Flavour after.</h2>
          <p className="lede">
            Seasoning sits on popped corn, not inside the kernel. Cooling before flavour helps the
            crunch, and a check before packing is how a small batch stays a small batch — not a mystery
            process, just a sequence we refuse to rush past.
          </p>
        </div>
      </section>

      <NutritionHighlights
        title="Pure Process. Pure Nutrition."
        subtitle="Small batch craft preserves the natural plant power: 12g protein per 100g, digestive fibre, heart-friendly sunflower oil, and antioxidant richness."
      />

      <section className="closing">
        <h2 className="display">Small Batches. <em>Big Crunch.</em></h2>
        <Link className="btn btn-gold" href="/why-11pm">Why 11 PM Snacks</Link>
      </section>
    </>
  );
}
