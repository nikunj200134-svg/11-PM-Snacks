import type { Metadata } from 'next';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/Button';
import { Sticker } from '@/components/Sticker';
import { RotatingTextBadge } from '@/components/RotatingTextBadge';
import { MarqueeRibbon } from '@/components/MarqueeRibbon';
import { SectionHeading } from '@/components/SectionHeading';
import { WavyDivider } from '@/components/WavyDivider';
import { FlavourCard } from '@/components/FlavourCard';
import { PackCard } from '@/components/PackCard';
import { StatChip } from '@/components/StatChip';
import { Accordion } from '@/components/Accordion';
import { PopBurst } from '@/components/PopBurst';
import { TiltCard } from '@/components/TiltCard';
import { ReviewCard } from '@/components/ReviewCard';
import { Meter } from '@/components/Meter';
import { siteContent } from '@/content/site';

export const metadata: Metadata = {
  title: 'Design System & Component Styleguide | 11 PM Snacks',
  description:
    'Sticker Pop at Midnight component library and interactive design system styleguide for 11 PM Snacks.',
};

export default function StyleguidePage() {
  const flavours = siteContent.flavours;
  const packs = siteContent.packs;
  const sampleReview = siteContent.homepage.socialProof.reviews[0];
  const faqItems = siteContent.faqItems.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FFF4DC] text-[#14102B]">
      {/* 1. AnnouncementBar */}
      <section className="border-b-2 border-[#14102B]">
        <div className="bg-[#14102B] text-xs font-mono text-[#FFC21A] py-1 px-4 text-center font-bold">
          1. Component: AnnouncementBar (Slot 4)
        </div>
        <AnnouncementBar />
      </section>

      {/* 2. Header */}
      <section className="border-b-2 border-[#14102B]">
        <div className="bg-[#14102B] text-xs font-mono text-[#FFC21A] py-1 px-4 text-center font-bold">
          2. Component: Header (Sticky, Shrinks on Scroll, Full-Screen Mobile Drawer · Slot 8)
        </div>
        <Header />
      </section>

      {/* Styleguide Main Showcase Container */}
      <main className="w-[min(1240px,94vw)] mx-auto py-16 flex flex-col gap-24">
        {/* Styleguide Header */}
        <div className="text-center flex flex-col items-center">
          <span className="inline-block px-4 py-1 rounded-full text-xs font-mono font-bold uppercase bg-[#FFC21A] text-[#14102B] border-2 border-[#14102B] shadow-[3px_3px_0px_#14102B] mb-4 rotate-[-2deg]">
            Prompt 4 · Design Foundation
          </span>
          <h1 className="text-4xl sm:text-6xl font-display uppercase tracking-wider text-[#14102B] m-0">
            Sticker Pop at Midnight
          </h1>
          <p className="mt-4 text-lg font-medium text-[#14102B]/80 max-w-2xl leading-relaxed">
            Interactive component showcase and design system tokens for 11 PM Snacks.
            Every component is typed, accessible, and mapped to `/references/PATTERN-MAP.md`.
          </p>

          {/* Color Tokens Palette Preview */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 w-full max-w-4xl">
            {[
              { name: 'Midnight Ink', hex: '#14102B', bg: 'bg-[#14102B]', text: 'text-[#FFF4DC]' },
              { name: 'Cream', hex: '#FFF4DC', bg: 'bg-[#FFF4DC]', text: 'text-[#14102B]' },
              { name: 'Peri Peri Fire', hex: '#FF4B1F', bg: 'bg-[#FF4B1F]', text: 'text-[#14102B]' },
              { name: 'Tangy Tomato', hex: '#E5262F', bg: 'bg-[#E5262F]', text: 'text-white' },
              { name: 'Leaf Green', hex: '#2EC27E', bg: 'bg-[#2EC27E]', text: 'text-[#14102B]' },
              { name: 'Cheddar Gold', hex: '#FFC21A', bg: 'bg-[#FFC21A]', text: 'text-[#14102B]' },
              { name: 'Pop Pink', hex: '#FF7AB8', bg: 'bg-[#FF7AB8]', text: 'text-[#14102B]' },
            ].map((color) => (
              <div
                key={color.name}
                className={`p-3 rounded-2xl border-2 border-[#14102B] shadow-[4px_4px_0px_#14102B] flex flex-col justify-between h-24 ${color.bg} ${color.text}`}
              >
                <span className="font-bold text-xs">{color.name}</span>
                <span className="font-mono text-[11px] font-bold opacity-80">{color.hex}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. SectionHeading */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b-2 border-[#14102B] pb-2">
            <span className="font-mono font-bold text-xs text-[#FF4B1F]">08. COMPONENT</span>
            <h3 className="font-display text-xl uppercase tracking-wider text-[#14102B]">
              SectionHeading
            </h3>
          </div>
          <div className="p-8 bg-white border-[2.5px] border-[#14102B] rounded-3xl shadow-[6px_6px_0px_#14102B]">
            <SectionHeading
              eyebrow="Snack Revolution"
              title="Bold Masala Flavours."
              highlightText="Never Boring."
              scribbleNote="popped fresh in Gurugram!"
              lede="Every handful of 11 PM Snacks delivers explosive Indian masala personality without palm oil shortcuts."
            />
          </div>
        </section>

        {/* 4. Button */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b-2 border-[#14102B] pb-2">
            <span className="font-mono font-bold text-xs text-[#FF4B1F]">04. COMPONENT</span>
            <h3 className="font-display text-xl uppercase tracking-wider text-[#14102B]">
              Button (Arcade Physics · Pop on Hover · Squish on Press · Slot 9)
            </h3>
          </div>
          <div className="p-8 bg-white border-[2.5px] border-[#14102B] rounded-3xl shadow-[6px_6px_0px_#14102B] flex flex-wrap items-center gap-4">
            <Button variant="gold" size="lg">
              Cheddar Gold (Large)
            </Button>
            <Button variant="peri" size="md">
              Peri Peri (Medium)
            </Button>
            <Button variant="tomato" size="md">
              Tangy Tomato
            </Button>
            <Button variant="midnight" size="md">
              Midnight Ink
            </Button>
            <Button variant="outline" size="sm">
              Outline (Small)
            </Button>
            <Button variant="gold" size="md" disabled>
              Disabled State
            </Button>
          </div>
        </section>

        {/* 5. Sticker & 6. RotatingTextBadge */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b-2 border-[#14102B] pb-2">
            <span className="font-mono font-bold text-xs text-[#FF4B1F]">05 &amp; 06. COMPONENTS</span>
            <h3 className="font-display text-xl uppercase tracking-wider text-[#14102B]">
              Sticker &amp; RotatingTextBadge (Slot 10)
            </h3>
          </div>
          <div className="p-8 bg-white border-[2.5px] border-[#14102B] rounded-3xl shadow-[6px_6px_0px_#14102B] flex flex-wrap items-center justify-around gap-8">
            <div className="flex flex-wrap items-center gap-3">
              <Sticker variant="gold" tilt={-3}>
                0% Palm Oil
              </Sticker>
              <Sticker variant="peri" tilt={2}>
                The Firestarter 🔥
              </Sticker>
              <Sticker variant="leaf" tilt={-2}>
                100% Whole Grain
              </Sticker>
              <Sticker variant="pink" tilt={3}>
                12g Plant Protein
              </Sticker>
              <Sticker variant="midnight" tilt={-4}>
                Gurugram Crafted
              </Sticker>
            </div>

            <div className="flex items-center gap-6">
              <RotatingTextBadge size="sm" variant="gold" centerText="🍿" />
              <RotatingTextBadge size="md" variant="peri" centerText="🔥" />
              <RotatingTextBadge size="lg" variant="midnight" centerText="✨" />
            </div>
          </div>
        </section>

        {/* 7. MarqueeRibbon & 9. WavyDivider */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b-2 border-[#14102B] pb-2">
            <span className="font-mono font-bold text-xs text-[#FF4B1F]">07 &amp; 09. COMPONENTS</span>
            <h3 className="font-display text-xl uppercase tracking-wider text-[#14102B]">
              MarqueeRibbon (Slot 4) &amp; WavyDivider (Slot 10)
            </h3>
          </div>
          <div className="bg-[#14102B] rounded-3xl overflow-hidden py-10 shadow-[6px_6px_0px_#14102B]">
            <WavyDivider fillColor="#FFC21A" direction="down" />
            <MarqueeRibbon
              items={[
                'ZERO PALM OIL',
                'POPPED IN SUNFLOWER OIL',
                'BATCH 01 DROPPING SOON',
                'CRAFTED IN SMALL BATCHES',
                'GURUGRAM CRAFTED',
              ]}
              variant="gold"
              tilt={-1}
              speedSeconds={20}
            />
            <MarqueeRibbon
              items={[
                'THE FIRESTARTER PERI PERI',
                'THE MOOD LIFTER TOMATO',
                'THE COMFORT ONE CHEDDAR CHEESE',
                '100% WHOLE GRAIN CORN',
              ]}
              variant="midnight"
              direction="right"
              tilt={1}
              speedSeconds={24}
            />
            <WavyDivider fillColor="#FFF4DC" direction="up" />
          </div>
        </section>

        {/* 10. FlavourCard & 17. Meter */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b-2 border-[#14102B] pb-2">
            <span className="font-mono font-bold text-xs text-[#FF4B1F]">10 &amp; 17. COMPONENTS</span>
            <h3 className="font-display text-xl uppercase tracking-wider text-[#14102B]">
              FlavourCard (Slot 2) &amp; Meter (Sensory Flavour Profile)
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {flavours.map((flavour) => (
              <div key={flavour.id} className="flex flex-col gap-4">
                <FlavourCard flavour={flavour} />
                <div className="p-4 bg-white border-2 border-[#14102B] rounded-2xl shadow-[4px_4px_0px_#14102B]">
                  <Meter
                    label={
                      flavour.tone === 'peri'
                        ? 'Heat Intensity'
                        : flavour.tone === 'tomato'
                        ? 'Tang Level'
                        : 'Cheesiness'
                    }
                    level={flavour.tone === 'peri' ? 5 : flavour.tone === 'tomato' ? 4 : 5}
                    tone={flavour.tone}
                    icon={flavour.tone === 'peri' ? '🔥' : flavour.tone === 'tomato' ? '🍅' : '🧀'}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 11. PackCard */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b-2 border-[#14102B] pb-2">
            <span className="font-mono font-bold text-xs text-[#FF4B1F]">11. COMPONENT</span>
            <h3 className="font-display text-xl uppercase tracking-wider text-[#14102B]">
              PackCard (Slot 5 · Batch 01 Showcase)
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
            {packs.map((pack) => (
              <PackCard key={pack.id} pack={pack} />
            ))}
          </div>
        </section>

        {/* 12. StatChip */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b-2 border-[#14102B] pb-2">
            <span className="font-mono font-bold text-xs text-[#FF4B1F]">12. COMPONENT</span>
            <h3 className="font-display text-xl uppercase tracking-wider text-[#14102B]">
              StatChip (Metric Badges)
            </h3>
          </div>
          <div className="p-8 bg-white border-[2.5px] border-[#14102B] rounded-3xl shadow-[6px_6px_0px_#14102B] flex flex-wrap gap-4 items-center">
            <StatChip value="12g" label="Plant Protein / 100g" icon="⚡" variant="gold" />
            <StatChip value="0%" label="Palm Oil Used" icon="❤️" variant="peri" />
            <StatChip value="100%" label="Whole Grain Corn" icon="🌾" variant="leaf" />
            <StatChip value="Batch 01" label="Limited Drop" icon="🍿" variant="cream" />
            <StatChip value="Sunflower" label="Kettle Popped" icon="🌻" variant="pink" />
            <StatChip value="0g" label="Trans Fat" icon="🛡️" variant="midnight" />
          </div>
        </section>

        {/* 13. Accordion */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b-2 border-[#14102B] pb-2">
            <span className="font-mono font-bold text-xs text-[#FF4B1F]">13. COMPONENT</span>
            <h3 className="font-display text-xl uppercase tracking-wider text-[#14102B]">
              Accordion (FAQ Bubble Cards · Slot 7)
            </h3>
          </div>
          <Accordion items={faqItems} />
        </section>

        {/* 14. PopBurst & 15. TiltCard */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b-2 border-[#14102B] pb-2">
            <span className="font-mono font-bold text-xs text-[#FF4B1F]">14 &amp; 15. COMPONENTS</span>
            <h3 className="font-display text-xl uppercase tracking-wider text-[#14102B]">
              PopBurst (Particle Burst) &amp; TiltCard (3D Pointer Spring Tilt · Slot 9)
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* PopBurst container */}
            <div className="relative h-64 bg-white border-[2.5px] border-[#14102B] rounded-3xl shadow-[6px_6px_0px_#14102B] p-6 flex flex-col items-center justify-center overflow-hidden">
              <PopBurst density="medium" />
              <span className="font-display text-2xl uppercase tracking-wider text-[#14102B]">
                PopBurst Effect Active
              </span>
              <span className="text-xs font-mono text-[#14102B]/60 mt-1">
                Ambient floating popcorn, chili flakes, and cheese particles
              </span>
            </div>

            {/* TiltCard container */}
            <TiltCard maxTilt={8}>
              <div className="h-64 bg-[#FFC21A] border-[2.5px] border-[#14102B] rounded-3xl shadow-[6px_6px_0px_#14102B] p-8 flex flex-col justify-between cursor-pointer">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#14102B]">
                  Interactive 3D Spring Tilt
                </span>
                <div>
                  <h4 className="text-3xl font-display uppercase tracking-wider text-[#14102B] m-0">
                    Move Cursor Over Me
                  </h4>
                  <p className="text-sm font-medium text-[#14102B]/85 mt-2">
                    Dynamic pointer normalization calculates perspective rotation in real time.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-[#14102B]">
                  Auto-disables under prefers-reduced-motion →
                </span>
              </div>
            </TiltCard>
          </div>
        </section>

        {/* 16. ReviewCard */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b-2 border-[#14102B] pb-2">
            <span className="font-mono font-bold text-xs text-[#FF4B1F]">16. COMPONENT</span>
            <h3 className="font-display text-xl uppercase tracking-wider text-[#14102B]">
              ReviewCard (Candid Sticky Notes · Slot 6)
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ReviewCard review={sampleReview} tilt={-2} />
            <ReviewCard
              review={{
                author: 'Aman K., Delhi',
                quote:
                  'This signature pack is a lifesaver during weekend gaming sessions. Cheddar Cheese has an actual creamy crunch.',
                occasion: 'gaming night',
                rating: 5,
              }}
              tilt={1}
            />
            <ReviewCard
              review={{
                author: 'Rhea S., Noida',
                quote:
                  'Tangy Tomato brings back school nostalgia. It is super light and doesn’t leave your fingers covered in mystery sludge.',
                occasion: 'netflix binge',
                rating: 5,
              }}
              tilt={-1}
            />
          </div>
        </section>
      </main>

      {/* 3. Footer */}
      <section className="border-t-2 border-[#14102B]">
        <div className="bg-[#14102B] text-xs font-mono text-[#FFC21A] py-1 px-4 text-center font-bold">
          3. Component: Footer (Monumental Edge-to-Edge Wordmark · Slot 7)
        </div>
        <Footer />
      </section>
    </div>
  );
}
