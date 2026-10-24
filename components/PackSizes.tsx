import Image from 'next/image';
import Link from 'next/link';
import { packSizes } from '@/lib/site';
import { Reveal } from '@/components/Reveal';

export function PackAvailability() {
  return (
    <p className="lede" style={{ color: 'inherit' }}>
      Each flavour comes in two pack sizes: 30 g Everyday Crunch at ₹30, and 90 g Jumbo Crunch at ₹60.
    </p>
  );
}

export function PackSizes({
  eyebrow = 'Two pack sizes',
}: {
  eyebrow?: string;
}) {
  return (
    <section className="section cream-band">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="display">Your Crunch. <em>Your Size.</em></h2>
          <p className="lede">
            Whether you&apos;re craving a quick snack or settling in for a longer movie night, pick the
            pack that fits your moment.
          </p>
        </Reveal>
        <div className="pack-grid">
          {packSizes.map((pack, index) => (
            <article key={pack.id} className={`pack-tile pack-${pack.size}`}>
              <Reveal delay={index * 0.06}>
                <p className="kicker">{pack.kicker}</p>
                <div className="pack-meta">
                  <span>{pack.label}</span>
                  <span className="pack-price">{pack.price}</span>
                </div>
                <p className="pack-weight">{pack.weight}</p>
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
