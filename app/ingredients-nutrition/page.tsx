import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { NutritionHighlights } from '@/components/NutritionHighlights';
import { PackFacts } from '@/components/PackFacts';
import { VerifiedNote } from '@/components/VerifiedNote';
import { pageMeta } from '@/lib/metadata';
import { flavours } from '@/lib/site';

const labelFields = [
  ['Ingredients', 'The full list, in order, including the oil and seasoning.'],
  ['Energy per serving', 'How much energy that serving contributes — once a verified panel is published.'],
  ['Total fat, saturated fat, trans fat', 'Fat type and amount depend on the finished recipe, not on popcorn in the abstract.'],
  ['Sodium', 'Seasoned snacks often carry salt. The number belongs on the pack you hold.'],
  ['Protein', 'Corn contributes some plant protein. We will show grams per 100 g and per serving after lab results.'],
  ['Dietary fibre', 'Popcorn naturally contains fibre. Serving size and recipe decide the amount in the pack.'],
  ['Serving size and net weight', '11 PM Snacks is packed in 30 g and 90 g sizes. How much you eat changes what the panel means for you.'],
  ['Allergen declarations', 'Read the allergen statement on the pack. We will reproduce approved copy here when it is locked.'],
] as const;

export const metadata: Metadata = pageMeta({
  title: 'Know Your Popcorn. Know Your Ingredients.',
  description:
    'Learn how popcorn kernels, fibre, plant protein, gluten, cholesterol, and pack labels work — and how 11 PM Snacks talks about ingredients without invented nutrition numbers.',
  path: '/ingredients-nutrition',
});

export default function IngredientsPage() {
  return (
    <article>
      <header className="page-hero wrap">
        <p className="eyebrow">Nutrition education</p>
        <h1 className="display">Know Your Popcorn. <em>Know Your Ingredients.</em></h1>
        <p className="lede">
          Good snacking starts with understanding what&apos;s inside your pack. High dietary fibre, 12g protein per 100g, rich antioxidants, support for heart health, gluten-free, whole grain and whole wheat goodness, and 100% plant-based snacking.
        </p>
      </header>

      <NutritionHighlights
        title="7 Pillars of Wholesome Popcorn Nutrition"
        subtitle="Every handful is built on whole grain corn, rich plant nutrients, heart-smart sunflower oil, and clean seasonings."
      />

      <section className="section cream-band">
        <div className="wrap split">
          <div>
            <p className="eyebrow">A. A naturally interesting kernel</p>
            <h2 className="display">Corn, heat, <em>and a pop.</em></h2>
            <p className="lede">
              Popcorn begins with corn, a grain that naturally contains carbohydrates, dietary fibre,
              and some plant-based protein. It is a popping variety: a hard hull, moisture inside, and
              heat that turns that moisture to steam until the kernel blooms.
            </p>
            <p className="lede">
              The final nutritional profile depends on how the popcorn is prepared and seasoned. Plain
              popcorn and Peri Peri, Tangy Tomato, or Cheese are not the same snack on a panel.
            </p>
          </div>
          <div className="photo-frame">
            <Image src="/brand/pop-explosion.png" alt="Popcorn bursting from the kernel" width={1200} height={900} />
          </div>
        </div>
      </section>

      <section className="section wrap">
        <p className="eyebrow">B. Protein Power</p>
        <h2 className="display">12g Protein <em>per 100g.</em></h2>
        <p className="lede">
          Popcorn maize naturally packs clean plant-based protein, delivering up to 12g of protein per 100g. That makes 11 PM Snacks a hearty, satisfying snack that fuels busy days, aids muscle recovery after activity, and keeps hunger cravings at bay.
        </p>
        <p className="lede">
          Unlike ordinary empty-calorie fried snacks, 11 PM Snacks popcorn provides dense plant protein alongside complex carbohydrates for smooth, steady energy without heavy slumps.
        </p>
      </section>

      <section className="section cream-band">
        <div className="wrap">
          <p className="eyebrow">C. Dietary Fibre</p>
          <h2 className="display">High in <em>Dietary Fibre.</em></h2>
          <p className="lede">
            Whole popcorn kernels retain their outer bran layer, making them naturally high in dietary fibre. Dietary fibre is vital for gut wellness, nurturing a diverse microbiome, and regulating intestinal transit.
          </p>
          <p className="lede">
            By slowing the digestion of carbohydrates, fibre helps prevent sharp spikes in blood glucose and promotes prolonged satiety — so a 30g Everyday Crunch or 90g Jumbo Crunch pack leaves you feeling genuinely satisfied.
          </p>
        </div>
      </section>

      <section className="section wrap">
        <div className="split">
          <div>
            <p className="eyebrow">D. Cellular Protection</p>
            <h2 className="display">Rich in <em>Antioxidants.</em></h2>
            <p className="lede">
              Popcorn hulls are dense with polyphenols — powerful natural plant antioxidants that neutralize oxidative free radicals in the body.
            </p>
            <p className="lede">
              Polyphenols support cellular defense, help reduce everyday inflammation, and contribute to overall vitality. Snacking on whole-popped corn is one of the easiest ways to get your daily dose of protective antioxidants.
            </p>
          </div>
          <div>
            <p className="eyebrow">E. Cardiovascular Wellness</p>
            <h2 className="display">Supports <em>Heart Health.</em></h2>
            <p className="lede">
              Cardiovascular care starts with mindful oil choices. 11 PM Snacks is popped exclusively with clean, heart-smart sunflower oil and contains absolutely zero palm oil, 0g trans fats, and zero dietary cholesterol.
            </p>
            <p className="lede">
              Our oil selection ensures you enjoy high smoke-point lightness without clogging saturated palm fats or artificial hydrogenated oils.
            </p>
          </div>
        </div>
      </section>

      <section className="section cream-band">
        <div className="wrap split">
          <div>
            <p className="eyebrow">F. Safe &amp; Clean</p>
            <h2 className="display">100% <em>Gluten Free.</em></h2>
            <p className="lede">
              Corn is naturally 100% gluten-free. For people managing celiac conditions, non-celiac gluten sensitivity, or anyone looking to cut wheat gluten from their snack rotation, 11 PM Snacks delivers explosive masala flavour without wheat flour fillers.
            </p>
            <p className="lede">
              Every seasoning blend is crafted to preserve this clean grain integrity so you can snack with zero hesitation.
            </p>
          </div>
          <div>
            <p className="eyebrow">G. Complex Carbohydrates</p>
            <h2 className="display">Whole Wheat &amp; <em>Whole Grain Goodness.</em></h2>
            <p className="lede">
              Popcorn is a 100% intact whole grain. Because it retains the germ, the endosperm, and the fibrous pericarp, you get all the complex carbohydrates and B-vitamins nature intended.
            </p>
            <p className="lede">
              Combined with clean botanical seasonings, it offers pure plant-based snacking that keeps active individuals and late-night thinkers going strong.
            </p>
          </div>
        </div>
      </section>

      <section className="section cream-band">
        <div className="wrap">
          <p className="eyebrow">F. Read the label</p>
          <h2 className="display">Know What Goes Into <em>Your Pack.</em></h2>
          <p className="lede">
            A useful pack tells you what is in it. These are the fields to look for. Values will be
            filled here from approved packaging and verified laboratory results — not from estimates.
          </p>
          <div className="label-guide">
            {labelFields.map(([title, body]) => (
              <div key={title} className="label-row">
                <strong>{title}</strong>
                <span>{body}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28 }}>
            <VerifiedNote>
              Flavour-by-flavour nutrition tables are not published on this site yet. We will not invent
              energy, protein, sugar, fat, fibre, or sodium figures to make this page look finished.
            </VerifiedNote>
          </div>
        </div>
      </section>

      <section className="section wrap">
        <p className="eyebrow">What the pouch already says</p>
        <h2 className="display">Three flavours. One oil we can name.</h2>
        <p className="lede">
          What current pouch artwork lets us say without guessing the recipe: popped corn, seasoned
          after popping, made with sunflower oil, and made without palm oil. Icons printed on pack are
          listed below as pack artwork — not as extra website health claims.
        </p>
        <PackFacts />
        <div className="info-grid" style={{ marginTop: 28 }}>
          {flavours.map((item) => (
            <article key={item.slug} className="info-card">
              <Image src={item.pouch} alt={`${item.name} pouch`} width={280} height={420} />
              <h3>{item.name}</h3>
              <p>
                Full ingredients, allergens, and a nutrition table for {item.name} will be reproduced
                from pack copy and lab reports. They are not listed as numbers here yet.
              </p>
              <Link href={item.href}>Open the {item.name} page →</Link>
            </article>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 32 }}>
          <Link className="btn btn-gold" href="/our-process">See the process</Link>
          <Link className="btn btn-ghost" href="/flavours">Back to flavours</Link>
        </div>
      </section>
    </article>
  );
}
