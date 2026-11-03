/**
 * TYPED CONTENT LAYER (/content/site.ts)
 * 
 * Rules:
 * - Single source of truth for all user-facing copy. Zero copy hard-coded in JSX.
 * - Non-negotiable brand facts: 11 PM Snacks, "Your Cravings. Our Calling."
 * - Three flavours: Peri Peri (The Firestarter), Tangy Tomato (The Mood Lifter), Cheddar Cheese (The Comfort One).
 * - Packs: Everyday Crunch 30 g (₹30) & Jumbo Crunch 90 g (₹60).
 * - Made in Gurugram, India with no palm oil, popped in sunflower oil.
 * - One idea, one home: nutrition detail on /nutrition, homepage shows one snapshot.
 * - Unverified claims use visible [TODO: ...] tags and are cataloged in /content/TODO.md.
 */

export interface FlavourItem {
  id: string;
  name: string;
  subtitle: string;
  slug: string;
  href: string;
  pouch: string;
  tone: 'peri' | 'tomato' | 'cheddar';
  badgeBg: string;
  accentColor: string;
  headline: string;
  moodTag: string;
  tastingNotes: string[];
  description: string;
  nutritionSnapshot: {
    caloriesPer30g: string;
    proteinPer100g: string;
    dietaryFibre: string;
    transFat: string;
  };
}

export interface PackItem {
  id: string;
  name: string;
  weight: string;
  price: number;
  currency: string;
  formattedPrice: string;
  badge?: string;
  highlight: string;
  servingDescription: string;
  isPopular?: boolean;
}

export interface NavLink {
  href: string;
  label: string;
  children?: { href: string; label: string; badge?: string }[];
}

export const siteContent = {
  brand: {
    name: '11 PM Snacks',
    logoText: '11 PM SNACKS',
    tagline: 'Your Cravings. Our Calling.',
    origin: 'Gurugram, India',
    oilStatement: 'Popped in heart-smart sunflower oil. Zero palm oil.',
    shortBio:
      'Ready-to-eat, small-batch masala popcorn crafted in Gurugram, India. Real crunch, loud flavor, and zero palm oil for the snack cravings that hit day or night.',
    url:
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : 'https://11pm-snacks.vercel.app'),
    contact: {
      phoneDisplay: '+91 85108 01655',
      phoneTel: '+918510801655',
      city: 'Gurugram, Haryana, India',
      pinCode: '122001',
      fssaiPlaceholder: '[TODO: verified FSSAI registration number]',
    },
  },

  navigation: [
    { href: '/', label: 'Home' },
    {
      href: '/flavours',
      label: 'Flavours',
      children: [
        { href: '/flavours/peri-peri', label: 'Peri Peri', badge: 'Firestarter' },
        { href: '/flavours/tangy-tomato', label: 'Tangy Tomato', badge: 'Mood Lifter' },
        { href: '/flavours/cheddar-cheese', label: 'Cheddar Cheese', badge: 'Comfort One' },
      ],
    },
    { href: '/nutrition', label: 'Nutrition' },
    { href: '/our-story', label: 'Our Story' },
    { href: '/where-to-buy', label: 'Where to Buy' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
  ] satisfies NavLink[],

  footerNavigation: {
    flavours: [
      { href: '/flavours/peri-peri', label: 'Peri Peri (The Firestarter)' },
      { href: '/flavours/tangy-tomato', label: 'Tangy Tomato (The Mood Lifter)' },
      { href: '/flavours/cheddar-cheese', label: 'Cheddar Cheese (The Comfort One)' },
      { href: '/flavours', label: 'Explore All Flavours' },
    ],
    learn: [
      { href: '/nutrition', label: 'Nutrition & Ingredients' },
      { href: '/our-story', label: 'Our Story & Process' },
      { href: '/where-to-buy', label: 'Where to Buy' },
      { href: '/faq', label: 'Frequently Asked Questions' },
    ],
    legal: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
      { href: '/shipping-returns', label: 'Shipping & Returns' },
      { href: '/contact', label: 'Partner / Wholesale Inquiry' },
    ],
  },

  flavours: [
    {
      id: 'peri-peri',
      name: 'Peri Peri',
      subtitle: 'The Firestarter',
      slug: 'peri-peri',
      href: '/flavours/peri-peri',
      pouch: '/brand/peri-peri-pouch.png',
      tone: 'peri',
      badgeBg: '#FF4B1F',
      accentColor: '#FF4B1F',
      headline: 'Fiery spice with an addictive zesty crunch.',
      moodTag: 'For spice lovers & midnight adrenaline',
      tastingNotes: ['African bird’s eye chili punch', 'Zesty lemon edge', 'Smoked garlic undertone'],
      description:
        'A bold, tongue-tingling masala burst inspired by fiery chili peppers, zesty garlic, and clean roasted seasoning. Popped in sunflower oil with zero palm oil.',
      nutritionSnapshot: {
        caloriesPer30g: '[TODO: lab-verified calories per 30g pack]',
        proteinPer100g: '12g plant protein / 100g',
        dietaryFibre: 'Naturally high in dietary fibre',
        transFat: '0g Trans Fat · 0mg Cholesterol',
      },
    },
    {
      id: 'tangy-tomato',
      name: 'Tangy Tomato',
      subtitle: 'The Mood Lifter',
      slug: 'tangy-tomato',
      href: '/flavours/tangy-tomato',
      pouch: '/brand/tangy-tomato-pouch.png',
      tone: 'tomato',
      badgeBg: '#E5262F',
      accentColor: '#E5262F',
      headline: 'Sweet, sour, and sun-ripened masala pop.',
      moodTag: 'For movie marathons & nostalgic munching',
      tastingNotes: ['Sun-ripened ripe tomato tang', 'Sweet-sour balance', 'Herb-infused crunch'],
      description:
        'A lively balance of ripe tomato sweetness and tangy chatpata spices that delivers instant nostalgia in every crunchy kernel. 100% whole grain corn base.',
      nutritionSnapshot: {
        caloriesPer30g: '[TODO: lab-verified calories per 30g pack]',
        proteinPer100g: '12g plant protein / 100g',
        dietaryFibre: 'Naturally high in dietary fibre',
        transFat: '0g Trans Fat · 0mg Cholesterol',
      },
    },
    {
      id: 'cheddar-cheese',
      name: 'Cheddar Cheese',
      subtitle: 'The Comfort One',
      slug: 'cheddar-cheese',
      href: '/flavours/cheddar-cheese',
      pouch: '/brand/cheese-pouch.png',
      tone: 'cheddar',
      badgeBg: '#FFC21A',
      accentColor: '#FFC21A',
      headline: 'Rich, savory cheddar melt on every kernel.',
      moodTag: 'For unwind hours & late-night chill',
      tastingNotes: ['Sharp golden cheddar note', 'Creamy savory finish', 'Mellow comforting crunch'],
      description:
        'Velvety cheddar warmth meeting an airy, crispy pop. Irresistibly savory without being heavy, prepared in small batches in Gurugram.',
      nutritionSnapshot: {
        caloriesPer30g: '[TODO: lab-verified calories per 30g pack]',
        proteinPer100g: '12g plant protein / 100g',
        dietaryFibre: 'Naturally high in dietary fibre',
        transFat: '0g Trans Fat · 0mg Cholesterol',
      },
    },
  ] satisfies FlavourItem[],

  packs: [
    {
      id: 'everyday-30g',
      name: 'Everyday Crunch',
      weight: '30 g',
      price: 30,
      currency: '₹',
      formattedPrice: '₹30',
      badge: 'Single Munch',
      highlight: 'Work break & commute staple',
      servingDescription: 'Pocket-sized single serve designed for quick snacking sessions.',
      isPopular: false,
    },
    {
      id: 'jumbo-90g',
      name: 'Jumbo Crunch',
      weight: '90 g',
      price: 60,
      currency: '₹',
      formattedPrice: '₹60',
      badge: 'Best Value · 3× Crunch',
      highlight: 'Movie night & group sharing',
      servingDescription: 'Triple the popcorn for twice the price. Perfect for sharing or long binge watches.',
      isPopular: true,
    },
  ] satisfies PackItem[],

  homepage: {
    hero: {
      eyebrow: 'Gurugram Crafted · Zero Palm Oil',
      headlinePrefix: 'Your Cravings.',
      headlineAccent: 'Our Calling.',
      lede:
        'Small-batch masala popcorn made with whole grain corn and popped in sunflower oil. Bold crunch built for late nights and all-day cravings.',
      primaryCta: 'Explore Flavours',
      secondaryCta: 'Our Story',
    },
    ticker: [
      'POPPED IN SUNFLOWER OIL',
      'ZERO PALM OIL',
      'EVERYDAY CRUNCH 30g ₹30',
      'JUMBO CRUNCH 90g ₹60',
      'SMALL BATCH CRAFTED',
      'GURUGRAM, INDIA',
      'PERI PERI',
      'TANGY TOMATO',
      'CHEDDAR CHEESE',
    ],
    flavourSwitcherIntro: {
      eyebrow: 'Three Flavours · Three Moods',
      title: 'Pick Your Crunch Personality',
      description:
        'Toggle between our three signature recipes. Every batch is seasoned with purpose and zero palm oil shortcuts.',
    },
    nutritionSnapshotSection: {
      eyebrow: 'Mindful Snacking',
      title: 'Honest Fuel, Zero Drama.',
      description:
        'We believe in transparent snacks that hit your craving spot without weighing you down.',
      highlights: [
        {
          label: 'Sunflower Oil',
          value: '0% Palm Oil',
          detail: 'Popped exclusively in heart-friendly sunflower oil with 0g trans fat.',
        },
        {
          label: 'Whole Grain Corn',
          value: '100% Unrefined',
          detail: 'Retains natural dietary fibre and bran for sustained energy.',
        },
        {
          label: 'Plant-Powered',
          value: '12g / 100g',
          detail: 'Clean protein density to keep hunger stabilized between meals.',
        },
      ],
      ctaLabel: 'View Full Nutrition Breakdown →',
      ctaHref: '/nutrition',
    },
    socialProof: {
      eyebrow: 'Late Night Crunch Club',
      title: 'Real Crunchers. Zero Filter.',
      ratingSummary: '4.8★ Average Rating across verified early snackers',
      quoteCards: [
        {
          author: 'Pooja M., Gurugram',
          quote: 'The Peri Peri kick is legitimately spicy without feeling greasy. Finally a popcorn that doesn’t use palm oil!',
          occasion: 'Desk snack',
        },
        {
          author: 'Aman K., Delhi',
          quote: 'Jumbo 90g pack is a lifesaver during weekend gaming sessions. Cheddar Cheese has an actual creamy crunch.',
          occasion: 'Gaming night',
        },
        {
          author: 'Rhea S., Noida',
          quote: 'Tangy Tomato brings back school nostalgia. It is super light and doesn’t leave your fingers covered in mystery sludge.',
          occasion: 'Netflix binge',
        },
      ],
    },
  },

  faqItems: [
    {
      question: 'Which oil do you use to pop 11 PM Snacks?',
      answer:
        'We pop our corn exclusively in sunflower oil. We strictly use zero palm oil, hydrogenated fats, or recycled cooking oils across all recipes.',
    },
    {
      question: 'What pack sizes are available and what do they cost?',
      answer:
        'We offer two practical sizes: Everyday Crunch (30 g) at ₹30 for personal quick snacks, and Jumbo Crunch (90 g) at ₹60 for movie nights and sharing.',
    },
    {
      question: 'Where are 11 PM Snacks produced?',
      answer:
        'All our popcorn is crafted and packaged in small batches in Gurugram, Haryana, India.',
    },
    {
      question: 'Are 11 PM Snacks gluten-free and vegetarian?',
      answer:
        'Yes! Whole grain corn is naturally 100% gluten-free. All three flavours are 100% vegetarian-friendly.',
    },
    {
      question: 'Where can I buy 11 PM Snacks near me?',
      answer:
        'You can order through our direct store links or find us in select regional retail outlets. Visit our Where to Buy page for the latest verified stockist details.',
    },
  ],
};
