import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/Button';
import { Meter } from '@/components/Meter';
import { Accordion } from '@/components/Accordion';
import { PackCard } from '@/components/PackCard';
import { pageMeta } from '@/lib/metadata';
import { siteContent, type FlavourItem } from '@/content/site';

interface FlavourPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return siteContent.flavours.map((f) => ({
    slug: f.slug,
  }));
}

export async function generateMetadata({ params }: FlavourPageProps): Promise<Metadata> {
  const { slug } = await params;
  const flavour = siteContent.flavours.find((f) => f.slug === slug);

  if (!flavour) {
    return pageMeta({
      title: 'Flavour Not Found · 11 PM Snacks',
      description: 'The requested masala popcorn flavour could not be found.',
      path: '/flavours',
    });
  }

  return pageMeta({
    title: `${flavour.name} (${flavour.subtitle}) · 11 PM Snacks`,
    description: `${flavour.headline} ${flavour.description}`,
    path: flavour.href,
  });
}

export default async function FlavourDetailPage({ params }: FlavourPageProps) {
  const { slug } = await params;
  const flavour = siteContent.flavours.find((f) => f.slug === slug);

  if (!flavour) {
    notFound();
  }

  // Cross-link to the other two flavours
  const otherFlavours = siteContent.flavours.filter((f) => f.slug !== slug);

  // Dynamic Theme Styling: Flavour colour takes over the hero
  const heroBgColor = {
    peri: 'bg-[#FF4B1F]',
    tomato: 'bg-[#E5262F]',
    cheddar: 'bg-[#FFC21A]',
  }[flavour.tone];

  // Contrast Guard: Text on yellow/peri is strictly Midnight Ink, Tomato is White
  const heroTextColor = flavour.tone === 'tomato' ? 'text-white' : 'text-[#14102B]';
  const heroMutedColor = flavour.tone === 'tomato' ? 'text-white/80' : 'text-[#14102B]/80';
  const heroPillColor = flavour.tone === 'tomato' ? 'bg-white text-[#14102B]' : 'bg-[#14102B] text-[#FFF4DC]';

  return (
    <div className="bg-[#FFF4DC] min-h-screen text-[#14102B]">
      {/* 1. Flavour Color Takes Over the Hero */}
      <section className={`relative overflow-hidden pt-12 pb-20 border-b-2 border-[#14102B] transition-colors ${heroBgColor}`}>
        <div className="w-[min(1240px,94vw)] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          {/* Hero Copy */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B] ${heroPillColor}`}>
                {flavour.subtitle}
              </span>
              <span className="text-lg font-scribble font-bold text-[#14102B]">
                {flavour.moodTag}
              </span>
            </div>

            <h1 className={`text-5xl sm:text-6xl md:text-7xl font-display uppercase tracking-wider leading-[0.98] m-0 ${heroTextColor}`}>
              {flavour.name}
            </h1>

            <p className={`mt-4 text-xl sm:text-2xl font-display uppercase tracking-wide opacity-95 ${heroTextColor}`}>
              {flavour.headline}
            </p>

            <p className={`mt-4 text-base sm:text-lg font-medium leading-relaxed max-w-xl ${heroMutedColor}`}>
              {flavour.description}
            </p>

            {/* Tasting Notes */}
            <div className="mt-6 flex flex-wrap gap-2">
              {flavour.tastingNotes.map((note, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-sans font-bold bg-white text-[#14102B] border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B]"
                >
                  ✦ {note}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="#packs" variant="midnight" size="lg">
                Choose Pack Size →
              </Button>
              <Button href="/flavours" variant="outline" size="lg">
                Back to All Flavours
              </Button>
            </div>
          </div>

          {/* Floating Pouch Visual */}
          <div className="lg:col-span-5 flex items-center justify-center p-4">
            <div className="relative group transition-transform duration-300 hover:scale-105 w-full max-w-lg aspect-[3/2] rounded-3xl overflow-hidden border-[3px] border-[#14102B] shadow-[8px_8px_0px_#14102B]">
              <Image
                src={flavour.pouch}
                alt={`${flavour.name} Masala Popcorn Pouch`}
                fill
                sizes="(max-width: 1024px) 90vw, 500px"
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Sensory Taste Meters */}
      <section className="py-14 bg-white border-b-2 border-[#14102B]">
        <div className="w-[min(1240px,94vw)] mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FFC21A] text-[#14102B] border border-[#14102B] mb-2">
              Sensory Profile
            </span>
            <h2 className="text-3xl sm:text-4xl font-display uppercase tracking-wider text-[#14102B] m-0">
              Taste Breakdown
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Meter label="Heat Level" level={flavour.meters.heat} icon="🔥" tone={flavour.tone} />
            <Meter label="Tanginess" level={flavour.meters.tang} icon="🍅" tone={flavour.tone} />
            <Meter
              label={flavour.meters.thirdLabel}
              level={flavour.meters.crunchOrCheese}
              icon={flavour.meters.thirdIcon}
              tone={flavour.tone}
            />
          </div>
        </div>
      </section>

      {/* 3. Ingredients & Allergens + Nutrition Table */}
      <section className="py-16 bg-[#FFF4DC] border-b-2 border-[#14102B]">
        <div className="w-[min(1240px,94vw)] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Ingredients Left Column */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="bg-white border-[2.5px] border-[#14102B] rounded-[28px] p-6 sm:p-8 shadow-[6px_6px_0px_#14102B]">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#2EC27E] text-[#14102B] border border-[#14102B] mb-3">
                Real Food Only
              </span>
              <h2 className="text-3xl font-display uppercase tracking-wider text-[#14102B] m-0">
                Ingredients
              </h2>
              <ul className="mt-4 space-y-2 list-none p-0 text-sm font-sans font-medium text-[#14102B]/90">
                {flavour.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start gap-2.5 py-1.5 border-b border-[#14102B]/10">
                    <span className="text-[#FF4B1F] font-bold">✓</span>
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 p-4 rounded-xl bg-[#FFF4DC] border border-[#14102B] text-xs font-mono text-[#14102B]">
                <strong className="block text-[#FF4B1F] uppercase mb-1">Allergen Notice:</strong>
                {flavour.allergens}
              </div>
            </div>
          </div>

          {/* Nutrition Table Right Column */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="bg-white border-[2.5px] border-[#14102B] rounded-[28px] p-6 sm:p-8 shadow-[6px_6px_0px_#14102B]">
              <div className="flex items-baseline justify-between border-b-2 border-[#14102B] pb-3 mb-4">
                <div>
                  <h3 className="text-2xl font-display uppercase tracking-wider text-[#14102B] m-0">
                    Nutrition Values
                  </h3>
                  <p className="text-xs font-mono text-[#14102B]/60 mt-0.5">
                    Standardised per serving &amp; 100g [TODO: serving size]
                  </p>
                </div>
                <Link
                  href="/nutrition"
                  className="text-xs font-mono font-bold text-[#FF4B1F] hover:underline"
                >
                  Full Nutrition Guide →
                </Link>
              </div>

              <div className="space-y-1.5 font-mono text-xs sm:text-sm">
                <div className="grid grid-cols-12 py-1 font-bold text-[#14102B]/60 border-b border-[#14102B]/10 uppercase">
                  <span className="col-span-6">Nutrient</span>
                  <span className="col-span-3 text-right">Per Serving</span>
                  <span className="col-span-3 text-right">Per 100g</span>
                </div>
                {flavour.nutritionTable.map((row, i) => (
                  <div key={i} className="grid grid-cols-12 py-1.5 border-b border-[#14102B]/5">
                    <span className="col-span-6 font-semibold text-[#14102B]">{row.nutrient}</span>
                    <span className="col-span-3 text-right text-[#14102B]/80">{row.perServing}</span>
                    <span className="col-span-3 text-right font-bold text-[#14102B]">{row.per100g}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-2.5 bg-[#FFF4DC] border border-dashed border-[#14102B] rounded-lg text-center text-xs font-mono text-[#14102B]">
                {flavour.nutritionSnapshot.caloriesPerServing}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Pairing Ideas */}
      <section className="py-16 bg-[#14102B] text-[#FFF4DC] border-b-2 border-[#14102B]">
        <div className="w-[min(1240px,94vw)] mx-auto flex flex-col gap-10">
          <div className="text-center max-w-xl mx-auto">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FF7AB8] text-[#14102B] border border-[#14102B] mb-2">
              Snack Combinations
            </span>
            <h2 className="text-3xl sm:text-4xl font-display uppercase tracking-wider text-[#FFC21A] m-0">
              Pairing Inspirations
            </h2>
            <p className="mt-2 text-sm text-[#FFF4DC]/80 font-medium">
              Curated drink and snack companions that match the {flavour.name} vibe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {flavour.pairings.map((pair, i) => (
              <div
                key={i}
                className="p-6 rounded-[24px] bg-[#1F193E] border-2 border-[#FFF4DC]/20 shadow-[4px_4px_0px_#FFC21A] flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl block mb-3">{pair.icon}</span>
                  <h3 className="text-xl font-display uppercase tracking-wider text-[#FFC21A] m-0">
                    {pair.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#FFF4DC]/80 leading-relaxed">
                    {pair.desc}
                  </p>
                </div>
                <span className="mt-4 pt-3 border-t border-[#FFF4DC]/10 text-xs font-mono font-bold text-[#FF7AB8]">
                  Verified Pairing
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Pack Availability */}
      <section id="packs" className="py-16 bg-[#FFF4DC] border-b-2 border-[#14102B]">
        <div className="w-[min(1240px,94vw)] mx-auto flex flex-col items-center gap-6 text-center max-w-xl">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FFC21A] text-[#14102B] border border-[#14102B]">
            Batch 01 Launch
          </span>
          <h2 className="text-3xl sm:text-4xl font-display uppercase tracking-wider text-[#14102B] m-0">
            {flavour.name} Availability
          </h2>
          <p className="text-sm text-[#14102B]/80 font-medium">
            Handcrafted in small batches in Gurugram, India. All pricing and pack sizes will be officially announced with Batch 01 [TODO: launch date].
          </p>
          <div className="mt-2 flex items-center gap-4">
            <Button href="/where-to-buy" variant="gold" size="lg">
              Notify Me When Live →
            </Button>
          </div>
        </div>
      </section>

      {/* 6. Mini FAQ */}
      <section className="py-16 bg-[#FFFDF7] border-b-2 border-[#14102B]">
        <div className="w-[min(1240px,94vw)] mx-auto flex flex-col gap-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#2EC27E] text-[#14102B] border border-[#14102B] mb-2">
              Flavour Q&amp;A
            </span>
            <h2 className="text-3xl sm:text-4xl font-display uppercase tracking-wider text-[#14102B] m-0">
              {flavour.name} FAQ
            </h2>
          </div>

          <Accordion items={flavour.miniFaq} />
        </div>
      </section>

      {/* 7. Cross-Links to the other two flavours */}
      <section className="py-16 bg-[#14102B] text-[#FFF4DC]">
        <div className="w-[min(1240px,94vw)] mx-auto flex flex-col gap-8 text-center">
          <div>
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FFC21A] text-[#14102B] border border-[#14102B] mb-2">
              Explore More
            </span>
            <h2 className="text-3xl sm:text-4xl font-display uppercase tracking-wider text-[#FFC21A] m-0">
              Try Another Mood
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto w-full">
            {otherFlavours.map((other) => (
              <Link
                key={other.id}
                href={other.href}
                className="p-6 rounded-[28px] bg-white text-[#14102B] border-[2.5px] border-[#14102B] shadow-[6px_6px_0px_#FFC21A] hover:shadow-[8px_8px_0px_#FFC21A] hover:-translate-y-1 transition-all duration-200 flex items-center justify-between gap-4 text-left group"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-[#FF4B1F] block">
                    {other.subtitle}
                  </span>
                  <h3 className="text-2xl font-display uppercase tracking-wide text-[#14102B] group-hover:text-[#FF4B1F] transition-colors mt-0.5">
                    {other.name}
                  </h3>
                  <p className="text-xs text-[#14102B]/70 mt-1 line-clamp-1 font-medium">
                    {other.headline}
                  </p>
                </div>
                <span className="w-10 h-10 rounded-full bg-[#14102B] text-[#FFF4DC] flex items-center justify-center font-bold text-lg shrink-0 group-hover:bg-[#FF4B1F] transition-colors">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
