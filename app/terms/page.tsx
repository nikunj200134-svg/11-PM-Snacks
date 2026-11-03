import type { Metadata } from 'next';
import { pageMeta } from '@/lib/metadata';
import { siteContent } from '@/content/site';

export const metadata: Metadata = pageMeta({
  title: 'Terms of Service · 11 PM Snacks',
  description: 'Terms and conditions governing purchases and usage of 11 PM Snacks website.',
  path: '/terms',
});

export default function TermsPage() {
  const { title, lastUpdated, content } = siteContent.innerPages.legalPages.terms;

  return (
    <div className="bg-[#FFF4DC] min-h-screen text-[#14102B] py-16">
      <div className="w-[min(900px,92vw)] mx-auto">
        <div className="bg-white border-[3px] border-[#14102B] rounded-[32px] p-8 sm:p-12 shadow-[8px_8px_0px_#14102B]">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF4B1F] block mb-2">
            Terms &amp; Conditions · Last Updated: {lastUpdated}
          </span>
          <h1 className="text-4xl sm:text-5xl font-display uppercase tracking-wider text-[#14102B] m-0 border-b-2 border-[#14102B] pb-4 mb-6">
            {title}
          </h1>

          <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed font-sans text-[#14102B]/90 whitespace-pre-line">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}
