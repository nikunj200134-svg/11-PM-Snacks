import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { nutritionPillars } from '@/lib/site';

export function NutritionHighlights({
  title = 'Power-Packed Snacking. Real Nutrition.',
  subtitle = 'High in dietary fibre, rich in antioxidants, heart-healthy, gluten-free, whole grain goodness, 100% plant-based, and packed with 12g protein per 100g.',
  kicker = 'Clean Fuel · Serious Crunch',
  className = '',
  id = 'nutrition-highlights',
}: {
  title?: string;
  subtitle?: string;
  kicker?: string;
  className?: string;
  id?: string;
}) {
  return (
    <section className={`section nutrition-section cream-band ${className}`} id={id}>
      <div className="wrap">
        <Reveal>
          <div className="nutrition-hero-header">
            <span className="eyebrow">{kicker}</span>
            <h2 className="display">{title}</h2>
            <p className="lede">{subtitle}</p>
          </div>
        </Reveal>

        <div className="nutrition-showcase-grid">
          {nutritionPillars.map((pillar, index) => (
            <article key={pillar.id} className="nutrition-card">
              <Reveal delay={index * 0.05}>
                <div className="nutrition-card-header">
                  <span className="nutrition-icon" aria-hidden="true">{pillar.icon}</span>
                  <span className="nutrition-badge">{pillar.badge}</span>
                </div>

                <div className="nutrition-visual-thumb">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    width={500}
                    height={380}
                    className="nutrition-thumb-img"
                  />
                  <div className="nutrition-stat-pill">
                    <strong>{pillar.highlight}</strong>
                    <span>{pillar.unit}</span>
                  </div>
                </div>

                <div className="nutrition-card-body">
                  <h3 className="nutrition-card-title">{pillar.title}</h3>
                  <p className="nutrition-card-short">{pillar.short}</p>
                  <p className="nutrition-card-desc">{pillar.description}</p>
                </div>
              </Reveal>
            </article>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="nutrition-banner-bar">
            <div className="nutrition-banner-text">
              <span className="kicker">Honest &amp; Wholesome</span>
              <p>
                <strong>12g Protein / 100g</strong> · <strong>High in Dietary Fibre</strong> · <strong>Rich in Antioxidants</strong> · <strong>Supports Heart Health</strong> · <strong>100% Gluten Free</strong> · <strong>Whole Wheat &amp; Grain</strong> · <strong>Plant-Based Snacking</strong>
              </p>
            </div>
            <Link className="btn btn-gold" href="/ingredients-nutrition">
              Explore Nutrition Details →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
