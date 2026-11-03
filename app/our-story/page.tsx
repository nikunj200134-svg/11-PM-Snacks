import type { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { pageMeta } from '@/lib/metadata';
import { siteContent } from '@/content/site';

export const metadata: Metadata = pageMeta({
  title: 'Our Story · 11 PM Snacks',
  description:
    'Born at 11 PM in Gurugram. How late-night cravings sparked our small-batch masala popcorn popped in sunflower oil with zero palm oil.',
  path: '/our-story',
});

export default function OurStoryPage() {
  const { eyebrow, title, description, originStory, pillars } =
    siteContent.innerPages.ourStoryPage;
  const processSteps = siteContent.homepage.processStory.steps;

  return (
    <div className="bg-[#FFF4DC] min-h-screen text-[#14102B]">
      {/* 1. Page Hero */}
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

      {/* 2. Origin Narrative: Born at 11 PM in Gurugram (Merging About) */}
      <section className="py-16 border-b-2 border-[#14102B]">
        <div className="w-[min(1240px,94vw)] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF4B1F]">
              The Genesis Moment
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wider text-[#14102B] m-0">
              {originStory.heading}
            </h2>
            <p className="mt-2 text-lg font-bold text-[#14102B] leading-relaxed">
              {originStory.lead}
            </p>
            <p className="text-base text-[#14102B]/85 font-medium leading-relaxed">
              {originStory.narrative}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-white text-[#14102B] border border-[#14102B]">
                📍 Gurugram, Haryana (122001)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-[#FFC21A] text-[#14102B] border border-[#14102B]">
                🍿 Kettle Popped Daily
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative p-4 bg-white border-[3px] border-[#14102B] rounded-[32px] shadow-[8px_8px_0px_#14102B] rotate-1">
              <Image
                src="/brand/showcase.png"
                alt="11 PM Snacks three masala flavours lineup"
                width={500}
                height={500}
                className="w-full h-auto rounded-2xl object-cover"
              />
              <span className="block mt-3 text-center text-xs font-mono font-bold text-[#14102B]/70">
                Shivji Park Colony Kitchen, Gurugram
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 3 Kitchen Pillars (Merging Why 11 PM) */}
      <section className="py-16 bg-[#14102B] text-[#FFF4DC] border-b-2 border-[#14102B]">
        <div className="w-[min(1240px,94vw)] mx-auto flex flex-col gap-10">
          <div className="text-center max-w-xl mx-auto">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FFC21A] text-[#14102B] border border-[#14102B] mb-2">
              Our Core Rules
            </span>
            <h2 className="text-3xl sm:text-4xl font-display uppercase tracking-wider text-[#FFC21A] m-0">
              Three Things We Refuse to Compromise On
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar) => (
              <div
                key={pillar.number}
                className="p-8 rounded-[28px] bg-[#1F193E] border-2 border-[#FFF4DC]/20 shadow-[6px_6px_0px_#FFC21A] flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#FFC21A] text-[#14102B] inline-block mb-4">
                    Pillar {pillar.number}
                  </span>
                  <h3 className="text-2xl font-display uppercase tracking-wider text-[#FFF4DC] m-0">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm text-[#FFF4DC]/80 font-medium leading-relaxed">
                    {pillar.body}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#FFF4DC]/10 text-xs font-mono text-[#2EC27E] font-bold">
                  ✓ Verified Kitchen Policy
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Compact Kernel to Crunch Timeline (Merging Our Process) */}
      <section className="py-16 bg-[#FFF4DC] border-b-2 border-[#14102B]">
        <div className="w-[min(1240px,94vw)] mx-auto max-w-4xl flex flex-col gap-10">
          <div className="text-center">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#2EC27E] text-[#14102B] border border-[#14102B] mb-2">
              Kitchen Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-display uppercase tracking-wider text-[#14102B] m-0">
              From Kernel to Crunch Timeline
            </h2>
            <p className="mt-2 text-sm text-[#14102B]/80 font-medium">
              Four transparent steps taken in small batches every single day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {processSteps.map((step) => (
              <div
                key={step.number}
                className="p-6 bg-white border-[2.5px] border-[#14102B] rounded-[24px] shadow-[4px_4px_0px_#14102B] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 rounded-full bg-[#14102B] text-[#FFF4DC] text-xs font-mono font-bold flex items-center justify-center">
                      {step.number}
                    </span>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF4B1F]">
                      {step.subtitle}
                    </span>
                  </div>
                  <h3 className="text-2xl font-display uppercase tracking-wider text-[#14102B] m-0">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#14102B]/80 leading-relaxed">
                    {step.body}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#14102B]/10 text-xs font-mono text-[#14102B]/60 font-semibold">
                  Step {step.number} Complete
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <Button href="/flavours" variant="gold" size="lg">
              Explore Our Flavours →
            </Button>
            <Button href="/where-to-buy" variant="outline" size="lg">
              Where to Buy
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
