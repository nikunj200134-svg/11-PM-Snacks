import type { Metadata } from 'next';
import { Accordion } from '@/components/Accordion';
import { Button } from '@/components/Button';
import { pageMeta } from '@/lib/metadata';
import { siteContent } from '@/content/site';

export const metadata: Metadata = pageMeta({
  title: 'Frequently Asked Questions · 11 PM Snacks',
  description:
    'Answers to all your questions regarding cooking oil, pack sizes, ingredients, Gurugram production, shipping timelines, and wholesale.',
  path: '/faq',
});

export default function FAQPage() {
  const { eyebrow, title, description, categories } = siteContent.innerPages.faqPage;

  // Compile all Q&As for FAQPage JSON-LD Schema
  const allFaqItems = categories.flatMap((cat) => cat.items);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <div className="bg-[#FFF4DC] min-h-screen text-[#14102B]">
      {/* FAQPage Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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

      {/* 2. Grouped FAQ Categories */}
      <section className="py-16 border-b-2 border-[#14102B]">
        <div className="w-[min(1240px,94vw)] mx-auto max-w-4xl flex flex-col gap-14">
          {categories.map((category, idx) => (
            <div key={idx} className="flex flex-col gap-6">
              <div className="flex items-center gap-3 border-b-2 border-[#14102B] pb-3">
                <span className="w-8 h-8 rounded-full bg-[#14102B] text-[#FFF4DC] text-xs font-mono font-bold flex items-center justify-center">
                  0{idx + 1}
                </span>
                <h2 className="text-2xl sm:text-3xl font-display uppercase tracking-wider text-[#14102B] m-0">
                  {category.name}
                </h2>
              </div>

              {/* Accordion Component */}
              <Accordion items={category.items} />
            </div>
          ))}
        </div>
      </section>

      {/* 3. Still Have Questions Callout */}
      <section className="py-16 bg-[#14102B] text-[#FFF4DC]">
        <div className="w-[min(1240px,94vw)] mx-auto max-w-2xl text-center flex flex-col items-center">
          <span className="text-3xl mb-2">💬</span>
          <h2 className="text-3xl sm:text-4xl font-display uppercase tracking-wider text-[#FFC21A] m-0">
            Have a Different Question?
          </h2>
          <p className="mt-3 text-base text-[#FFF4DC]/80 font-medium">
            Reach out to our Gurugram team directly. We are happy to talk popcorn, wholesale orders, or spice recipes.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="gold" size="md">
              Send Us a Message →
            </Button>
            <Button href="/nutrition" variant="outline" size="md">
              Check Nutrition Details
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
