import type { Metadata } from 'next';
import Link from 'next/link';
import { NutritionHighlights } from '@/components/NutritionHighlights';
import { pageMeta } from '@/lib/metadata';
import { site } from '@/lib/site';

export const metadata: Metadata = pageMeta({
  title: 'Let’s Talk Snacks',
  description: 'Contact 11 PM Snacks in Gurugram for flavour questions and business enquiries.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <header className="page-hero wrap">
        <p className="eyebrow">Say hello</p>
        <h1 className="display">Let’s Talk <em>Snacks.</em></h1>
        <p className="lede">
          Have a question, want to know more about our flavours, or interested in working with us?
          We’d love to hear from you.
        </p>
      </header>

      <section className="section wrap split">
        <article className="contact-card">
          <p className="kicker">Phone</p>
          <h2 className="display" style={{ fontSize: '2rem', margin: '10px 0' }}>Call the business line</h2>
          <p>
            <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
          </p>
        </article>
        <article className="contact-card">
          <p className="kicker">Registered office</p>
          <h2 className="display" style={{ fontSize: '2rem', margin: '10px 0' }}>{site.city}</h2>
          {site.addressLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </article>
      </section>

      <section className="section cream-band">
        <div className="wrap split">
          <div>
            <p className="eyebrow">Business and distribution</p>
            <h2 className="display">If you stock snacks for a living.</h2>
            <p className="lede">
              For distribution, retail, or other business conversations, call the number above and tell
              us what you need. We are a GST-registered business in Gurugram.
            </p>
            <p className="lede">GSTIN {site.gstin}</p>
          </div>
          <article className="info-card" style={{ background: '#fff', borderColor: '#ead9c0' }}>
            <h3>What we have not listed yet</h3>
            <p>
              A public email address and social profiles will appear here when they are verified. We
              are not publishing placeholder inboxes or inactive handles. There is no contact form on
              this page because there is no form backend behind it.
            </p>
            <Link href="/flavours">Meanwhile, meet the flavours →</Link>
          </article>
        </div>
      </section>

      <NutritionHighlights
        title="Wholesome Snacking Partners"
        subtitle="Stock our popcorn with pride: 12g protein per 100g, rich in antioxidants, high in fibre, gluten free, sunflower oil, and 100% plant-based."
      />
    </>
  );
}
