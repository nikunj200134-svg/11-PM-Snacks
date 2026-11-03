import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { Meter } from '@/components/Meter';
import { pageMeta } from '@/lib/metadata';
import { siteContent } from '@/content/site';

export const metadata: Metadata = pageMeta({
  title: 'Three Masala Flavours · 11 PM Snacks',
  description:
    'Explore Peri Peri (The Firestarter), Tangy Tomato (The Mood Lifter), and Cheddar Cheese (The Comfort One). Small-batch masala popcorn crafted in Gurugram with sunflower oil.',
  path: '/flavours',
});

export default function FlavoursPage() {
  const { eyebrow, title, description, comparisonStrip } =
    siteContent.innerPages.flavoursIndex;
  const flavours = siteContent.flavours;

  return (
    <div className="bg-[#FFF4DC] min-h-screen text-[#14102B]">
      {/* Page Hero */}
      <section className="pt-16 pb-12 border-b-2 border-[#14102B]">
        <div className="w-[min(1240px,94vw)] mx-auto max-w-3xl text-center flex flex-col items-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FFC21A] text-[#14102B] border-2 border-[#14102B] shadow-[3px_3px_0px_#14102B] mb-4 rotate-[-1deg]">
            {eyebrow}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display uppercase tracking-wider text-[#14102B] m-0">
            {title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#14102B]/80 font-medium leading-relaxed">
            {description}
          </p>
        </div>
      </section>

      {/* Flavour Range Banner: Three-Pack Flatlay */}
      <section className="py-8 bg-white border-b-2 border-[#14102B]">
        <div className="w-[min(1240px,94vw)] mx-auto">
          <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full rounded-[28px] overflow-hidden border-[2.5px] border-[#14102B] shadow-[6px_6px_0px_#14102B] bg-[#14102B]">
            <Image
              src="/brand/three-pack-flatlay.png"
              alt="11 PM Snacks three-pack flatlay featuring Peri Peri, Tangy Tomato, and Cheddar Cheese"
              fill
              sizes="(max-width: 1240px) 100vw, 1240px"
              priority
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 px-4 py-2 bg-white/95 backdrop-blur-sm border-2 border-[#14102B] rounded-2xl shadow-[3px_3px_0px_#14102B]">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF4B1F] block">
                The Batch 01 Trio
              </span>
              <p className="text-sm font-bold text-[#14102B] m-0">
                Peri Peri · Tangy Tomato · Cheddar Cheese
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Large Flavour Cards */}
      <section className="py-16 border-b-2 border-[#14102B]">
        <div className="w-[min(1240px,94vw)] mx-auto flex flex-col gap-14">
          {flavours.map((flavour, idx) => {
            const cardBgColors = {
              peri: 'bg-[#FFF9F5] border-[#FF4B1F]',
              tomato: 'bg-[#FFF6F6] border-[#E5262F]',
              cheddar: 'bg-[#FFFDF4] border-[#FFC21A]',
            }[flavour.tone];

            const badgeStyles = {
              peri: 'bg-[#FF4B1F] text-[#14102B]',
              tomato: 'bg-[#E5262F] text-white',
              cheddar: 'bg-[#FFC21A] text-[#14102B]',
            }[flavour.tone];

            const isEven = idx % 2 === 1;

            return (
              <article
                key={flavour.id}
                id={flavour.slug}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 rounded-[32px] border-[3px] border-[#14102B] shadow-[8px_8px_0px_#14102B] ${cardBgColors}`}
              >
                {/* Visual Side */}
                <div
                  className={`lg:col-span-5 flex items-center justify-center p-4 min-h-[300px] ${
                    isEven ? 'lg:order-2' : ''
                  }`}
                >
                  <div className="relative group transition-transform duration-300 hover:scale-105">
                    <div className="absolute inset-0 rounded-full bg-[#14102B]/5 blur-xl -z-10" />
                    <Image
                      src={flavour.pouch}
                      alt={`${flavour.name} Masala Popcorn Pouch`}
                      width={400}
                      height={520}
                      priority={idx === 0}
                      className="w-auto h-72 sm:h-88 md:h-96 object-contain filter drop-shadow-[0_20px_28px_rgba(20,16,43,0.22)]"
                    />
                  </div>
                </div>

                {/* Details Side */}
                <div
                  className={`lg:col-span-7 flex flex-col justify-between gap-6 ${
                    isEven ? 'lg:order-1' : ''
                  }`}
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span
                        className={`px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase border border-[#14102B] ${badgeStyles}`}
                      >
                        {flavour.subtitle}
                      </span>
                      <span className="text-sm font-scribble text-[#FF4B1F] text-xl">
                        {flavour.moodTag}
                      </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wider text-[#14102B] m-0">
                      {flavour.name}
                    </h2>

                    <p className="mt-3 text-base sm:text-lg text-[#14102B]/85 font-medium leading-relaxed">
                      {flavour.description}
                    </p>

                    {/* Tasting Notes Chips */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {flavour.tastingNotes.map((note, noteIdx) => (
                        <span
                          key={noteIdx}
                          className="px-3 py-1 rounded-lg text-xs font-sans font-bold bg-[#FFF4DC] border border-[#14102B] text-[#14102B] shadow-[2px_2px_0px_#14102B]"
                        >
                          ✦ {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sensory Taste Profile */}
                  <div className="pt-4 border-t-2 border-[#14102B]/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#14102B]/75">
                        Flavour Profile & Intensity
                      </span>
                      <span className="text-[10px] font-mono text-[#14102B]/50 hidden sm:inline">
                        Sensory characteristics · Not a review rating
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <Meter label="Heat" level={flavour.meters.heat} icon="🔥" tone={flavour.tone} />
                      <Meter label="Tang" level={flavour.meters.tang} icon="🍅" tone={flavour.tone} />
                      <Meter
                        label={flavour.meters.thirdLabel}
                        level={flavour.meters.crunchOrCheese}
                        icon={flavour.meters.thirdIcon}
                        tone={flavour.tone}
                      />
                    </div>
                  </div>

                  {/* Explore & Buy Actions */}
                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <Button href={flavour.href} variant="midnight" size="md">
                      Explore {flavour.name} Details →
                    </Button>
                    <span className="text-xs font-mono text-[#FF4B1F] font-bold">
                      Batch 01 Dropping Soon · Coming Soon
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Compact Comparison Strip */}
      <section className="py-16 bg-[#14102B] text-[#FFF4DC] border-b-2 border-[#14102B]">
        <div className="w-[min(1240px,94vw)] mx-auto flex flex-col gap-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FFC21A] text-[#14102B] border border-[#14102B] mb-2">
              Sensory Breakdown
            </span>
            <h2 className="text-3xl sm:text-4xl font-display uppercase tracking-wider text-[#FFC21A] m-0">
              {comparisonStrip.title}
            </h2>
          </div>

          {/* Matrix Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b-2 border-[#FFF4DC]/20 text-xs uppercase tracking-wider text-[#FFC21A]">
                  {comparisonStrip.headers.map((h, i) => (
                    <th key={i} className="py-3 px-4 font-bold">
                      {h}
                    </th>
                  ))}
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FFF4DC]/10 text-sm">
                {comparisonStrip.rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#FFF4DC]/5 transition-colors">
                    <td className="py-4 px-4 font-bold text-base text-[#FFF4DC] flex items-center gap-2">
                      <span
                        style={{ backgroundColor: row.badgeBg }}
                        className="w-3 h-3 rounded-full border border-[#14102B]"
                      />
                      {row.name}
                    </td>
                    <td className="py-4 px-4 text-[#FF4B1F] font-bold">{row.heat}</td>
                    <td className="py-4 px-4 text-[#FFC21A] font-bold">{row.tang}</td>
                    <td className="py-4 px-4 text-[#FFF4DC]/80 font-sans text-xs">{row.keyNote}</td>
                    <td className="py-4 px-4 text-[#FFF4DC]/80 font-sans text-xs">{row.bestFor}</td>
                    <td className="py-4 px-4 text-right">
                      <Link
                        href={row.href}
                        className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FFC21A] text-[#14102B] hover:bg-white transition-colors"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
