import Image from 'next/image';
import Link from 'next/link';
import { packSizes } from '@/lib/site';
import { Reveal } from '@/components/Reveal';

export function PackAvailability() {
  return (
    <p className="lede" style={{ color: 'inherit' }}>
      Each signature flavour is handcrafted in small batches using sunflower oil. Launching soon with early access.
    </p>
  );
}

export function PackSizes({
  eyebrow = 'Batch Editions',
}: {
  eyebrow?: string;
}) {
  return (
    <section className="section cream-band">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="display">Your Crunch. <em>Fresh Batches.</em></h2>
          <p className="lede">
            Whether you&apos;re craving a quick snack or settling in for a late-night movie marathon, our fresh batches are dropped in limited runs.
          </p>
        </Reveal>
        <div className="pack-grid">
          {packSizes.map((pack, index) => (
            <article key={pack.id} className={`pack-tile pack-${pack.size}`}>
              <Reveal delay={index * 0.06}>
                <p className="kicker">{pack.kicker}</p>
                <div className="pack-meta">
                  <span>{pack.label}</span>
                  <span className="pack-badge">Coming Soon</span>
                </div>
                <p className="pack-batch">Limited Release</p>
                <Image src={pack.image} alt={pack.alt} width={900} height={1350} />
                <h3>{pack.title}</h3>
                <p>{pack.body}</p>
                <Link className="btn btn-dark" href="/flavours">Explore the Flavours</Link>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
