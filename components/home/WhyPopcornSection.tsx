'use client';

import Image from 'next/image';
import Link from 'next/link';

interface WhyBenefit {
  id: string;
  icon: string;
  title: string;
  badge: string;
  body: string;
}

const WHY_BENEFITS: WhyBenefit[] = [
  {
    id: 'whole-grain',
    icon: '🌽',
    title: '100% Whole Grain',
    badge: 'Whole Corn Kernel',
    body: 'Popped directly from whole corn kernels with the bran, germ, and endosperm intact. Provides clean complex carbohydrates for steady, crash-free energy.',
  },
  {
    id: 'high-fibre',
    icon: '🌾',
    title: 'High in Dietary Fibre',
    badge: 'Gut Wellness',
    body: 'A natural gut-health champion: supports smooth digestion, feeds beneficial gut bacteria, and keeps you feeling satisfied long after snack time.',
  },
  {
    id: 'plant-protein',
    icon: '💪',
    title: 'Good Source of Plant Protein',
    badge: 'Fuel For Adventure',
    body: 'Natural botanical protein that powers active routines and midnight focus sessions. Clean fuel without heavy animal fats or greasy fillers.',
  },
  {
    id: 'cholesterol-free',
    icon: '❤️',
    title: 'Naturally Cholesterol-Free',
    badge: '0mg Cholesterol',
    body: 'Zero cholesterol and 0g trans fats by nature. Popped light and crisp in pure sunflower oil so you can snack freely without that heavy post-snack slump.',
  },
  {
    id: 'no-palm-oil',
    icon: '🌻',
    title: 'Zero Palm Oil',
    badge: '100% Sunflower Oil',
    body: 'Popped exclusively in refined sunflower oil. We never use cheap hydrogenated palm oil or recycled frying fats. Light crunch that keeps fingers clean.',
  },
  {
    id: 'gluten-free',
    icon: '🛡️',
    title: 'Naturally Gluten-Free Ingredients',
    badge: 'Corn Base',
    body: 'Corn is an inherently gluten-free agricultural grain. Crafted with real spices and clean seasoning, free from wheat starch or hidden gluten binders.',
  },
];

const NUTRITION_ROWS = [
  { nutrient: 'Energy', per30g: '[LAB VALUE: ~140 kcal]', per100g: '[LAB VALUE: ~465 kcal]' },
  { nutrient: 'Plant Protein', per30g: '[LAB VALUE: ~3.6 g]', per100g: '[LAB VALUE: 12.0 g]' },
  { nutrient: 'Dietary Fibre', per30g: '[LAB VALUE: ~2.8 g]', per100g: '[LAB VALUE: 9.4 g]' },
  { nutrient: 'Carbohydrates', per30g: '[LAB VALUE: ~18.5 g]', per100g: '[LAB VALUE: 61.8 g]' },
  { nutrient: 'Total Fat', per30g: '[LAB VALUE: ~6.2 g]', per100g: '[LAB VALUE: 20.6 g]' },
  { nutrient: 'Saturated Fat', per30g: '[LAB VALUE: ~0.9 g]', per100g: '[LAB VALUE: 3.1 g]' },
  { nutrient: 'Trans Fat', per30g: '0.0 g', per100g: '0.0 g' },
  { nutrient: 'Cholesterol', per30g: '0.0 mg', per100g: '0.0 mg' },
  { nutrient: 'Sodium', per30g: '[LAB VALUE: ~165 mg]', per100g: '[LAB VALUE: 550 mg]' },
];

export function WhyPopcornSection() {
  return (
    <section
      id="why-popcorn"
      className="py-16 md:py-24 bg-[#FFF4DC] border-b-2 border-[#14102B] text-[#14102B]"
    >
      <div className="w-[min(1240px,94vw)] mx-auto">
        {/* Header Eyebrow & Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FFC21A] text-[#14102B] border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B] mb-3">
            Nature’s Perfect Snack
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wider text-[#14102B] m-0">
            Why Popcorn?
          </h2>
          <p className="mt-3 text-base md:text-lg text-[#14102B]/85 font-medium leading-relaxed">
            Whole corn kernels, clean sunflower oil, and authentic Indian spices. Nothing hidden,
            no shortcuts, and no palm oil.
          </p>
        </div>

        {/* 6 Benefits Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {WHY_BENEFITS.map((item) => (
            <div
              key={item.id}
              className="p-6 md:p-7 bg-white border-[2.5px] border-[#14102B] rounded-3xl shadow-[5px_5px_0px_#14102B] hover:-translate-y-1 hover:shadow-[7px_7px_0px_#14102B] transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-[#FFF4DC] text-[#14102B] border border-[#14102B]">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display uppercase tracking-wider text-[#14102B] m-0">
                  {item.title}
                </h3>
                <p className="mt-3 text-base text-[#14102B]/80 font-medium leading-relaxed">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Brand Image Showcase: Studio Model & Skydiving Adventure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Studio Model - Healthy Snacking */}
          <div className="lg:col-span-5 relative aspect-[4/5] rounded-[28px] overflow-hidden border-[2.5px] border-[#14102B] shadow-[6px_6px_0px_#14102B] bg-[#14102B]">
            <Image
              src="/brand/studio-model.png"
              alt="11 PM Snacks healthy snacking model holding fresh popcorn pouch"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              loading="lazy"
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/95 backdrop-blur-sm border-2 border-[#14102B] rounded-2xl shadow-[3px_3px_0px_#14102B]">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF4B1F] block">
                Healthy Snacking
              </span>
              <p className="text-sm font-bold text-[#14102B] m-0 mt-0.5">
                Thoughtful late-night munching without the morning regret.
              </p>
            </div>
          </div>

          {/* Skydiving Adventure - Fuel For Adventure */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="relative aspect-[16/9] rounded-[28px] overflow-hidden border-[2.5px] border-[#14102B] shadow-[6px_6px_0px_#14102B] bg-[#14102B]">
              <Image
                src="/brand/skydiving-trio.png"
                alt="Skydiving trio enjoying 11 PM Snacks at sunset - Fuel for adventure"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                loading="lazy"
                className="object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FFC21A] text-[#14102B] border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B]">
                  Fuel For Adventure
                </span>
              </div>
            </div>

            <div className="p-6 md:p-8 bg-white border-[2.5px] border-[#14102B] rounded-3xl shadow-[5px_5px_0px_#14102B]">
              <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-wider text-[#14102B] m-0">
                Loud Flavour. Clean Nutrition.
              </h3>
              <p className="mt-2 text-base text-[#14102B]/85 font-medium leading-relaxed">
                Whether you’re wrapping up an 11 PM work sprint, road-tripping with friends, or
                unwinding over a weekend film, popcorn gives you high-volume crunch with natural
                plant fibre and unrefined whole grain energy.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FFF4DC] border border-[#14102B]">
                  🌻 Zero Palm Oil
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FFF4DC] border border-[#14102B]">
                  🌽 100% Whole Grain
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FFF4DC] border border-[#14102B]">
                  ⚡ Popped in Gurugram
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Nutrition Values Table (Per 30g and Per 100g) */}
        <div className="bg-white border-[2.5px] border-[#14102B] rounded-3xl p-6 sm:p-8 md:p-10 shadow-[6px_6px_0px_#14102B]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-[#14102B]">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF4B1F]">
                Standardised Nutrition Panel
              </span>
              <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-wider text-[#14102B] m-0">
                Nutritional Information
              </h3>
            </div>
            <Link
              href="/nutrition"
              className="inline-flex items-center gap-1 text-sm font-mono font-bold text-[#14102B] hover:text-[#FF4B1F] underline underline-offset-4"
            >
              Full Ingredient Breakdown →
            </Link>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm sm:text-base font-sans">
              <thead>
                <tr className="border-b-2 border-[#14102B] text-xs font-mono font-bold uppercase tracking-wider text-[#14102B]/70">
                  <th className="py-3 px-4">Nutrient Metric</th>
                  <th className="py-3 px-4">Per 30g Single Munch</th>
                  <th className="py-3 px-4">Per 100g Serving</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#14102B]/10 font-medium text-[#14102B]">
                {NUTRITION_ROWS.map((row) => (
                  <tr key={row.nutrient} className="hover:bg-[#FFF4DC]/40 transition-colors">
                    <td className="py-3 px-4 font-bold">{row.nutrient}</td>
                    <td className="py-3 px-4 font-mono text-xs sm:text-sm text-[#FF4B1F] font-bold">
                      {row.per30g}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs sm:text-sm text-[#14102B]">
                      {row.per100g}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footnote */}
          <div className="mt-6 pt-4 border-t border-[#14102B]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-[#14102B]/65">
            <p className="m-0">
              * Values per lab-tested product. See nutrition panel. Figures subject to final
              certified FSSAI laboratory batch analysis.
            </p>
            <span className="font-bold text-[#FF4B1F] shrink-0">[LAB REPORT PENDING]</span>
          </div>
        </div>
      </div>
    </section>
  );
}
