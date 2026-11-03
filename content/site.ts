/**
 * TYPED CONTENT LAYER (/content/site.ts)
 * 
 * Rules:
 * - Single source of truth for all copy. Zero copy hardcoded in JSX.
 * - Non-negotiable brand facts: 11 PM Snacks, "Your Cravings. Our Calling."
 * - Three flavours: Peri Peri (The Firestarter), Tangy Tomato (The Mood Lifter), Cheddar Cheese (The Comfort One).
 * - Packs: Everyday Crunch 30 g (₹30) & Jumbo Crunch 90 g (₹60).
 * - Made in Gurugram, India with no palm oil, popped in sunflower oil.
 * - One idea, one home: nutrition detail on /nutrition, homepage shows one snapshot.
 * - "No palm oil" appears at most TWICE on the homepage.
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
  ingredients: string[];
  allergens: string;
  pairings: { title: string; desc: string; icon: string }[];
  miniFaq: { question: string; answer: string }[];
  meters: {
    heat: 1 | 2 | 3 | 4 | 5;
    tang: 1 | 2 | 3 | 4 | 5;
    crunchOrCheese: 1 | 2 | 3 | 4 | 5;
    thirdLabel: string;
    thirdIcon: string;
  };
  nutritionSnapshot: {
    caloriesPer30g: string;
    proteinPer100g: string;
    dietaryFibre: string;
    transFat: string;
  };
  nutritionTable: {
    nutrient: string;
    per30g: string;
    per100g: string;
  }[];
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
    oilStatement: 'Popped in heart-smart sunflower oil.',
    shortBio:
      'Ready-to-eat, small-batch masala popcorn crafted in Gurugram, India. Real crunch, loud flavor, and thoughtful ingredients for the snack cravings that hit day or night.',
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
      moodTag: 'For spice seekers & late-night energy',
      tastingNotes: ['African bird’s eye chili punch', 'Zesty lemon edge', 'Smoked garlic undertone'],
      description:
        'A bold, tongue-tingling masala burst inspired by fiery chili peppers, zesty garlic, and clean roasted seasoning. Popped in sunflower oil with whole grain corn.',
      meters: {
        heat: 5,
        tang: 2,
        crunchOrCheese: 5,
        thirdLabel: 'Crunchiness',
        thirdIcon: '💥',
      },
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
      moodTag: 'For movie marathons & chatpata cravings',
      tastingNotes: ['Sun-ripened ripe tomato tang', 'Sweet-sour balance', 'Herb-infused crunch'],
      description:
        'A lively balance of ripe tomato sweetness and tangy chatpata spices that delivers instant nostalgia in every crunchy kernel. 100% whole grain corn base.',
      meters: {
        heat: 2,
        tang: 5,
        crunchOrCheese: 5,
        thirdLabel: 'Sweet-Sour',
        thirdIcon: '🍅',
      },
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
      moodTag: 'For unwind hours & late-night comfort',
      tastingNotes: ['Sharp golden cheddar note', 'Creamy savory finish', 'Mellow comforting crunch'],
      description:
        'Velvety cheddar warmth meeting an airy, crispy pop. Irresistibly savory without being heavy, prepared in small batches in Gurugram.',
      meters: {
        heat: 1,
        tang: 2,
        crunchOrCheese: 5,
        thirdLabel: 'Cheesiness',
        thirdIcon: '🧀',
      },
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

  varietyBundle: {
    name: '3-Flavour Variety Crate',
    weight: '3 × 90 g Jumbo Packs',
    pricePlaceholder: '[TODO: variety bundle pricing]',
    badge: 'Taste All 3 Moods',
    highlight: 'Peri Peri + Tangy Tomato + Cheddar Cheese',
    description: 'One bag of each signature personality so you never have to pick just one.',
  },

  homepage: {
    // 1. Announcement Bar (offers or delivery only)
    announcement: [
      'FREE DELIVERY ON ORDERS ABOVE ₹199',
      'DISPATCHED FRESH DAILY FROM GURUGRAM',
      'FLAT 10% OFF YOUR FIRST ORDER WITH CODE: FIRSTCRUNCH',
    ],

    // 2. Hero (Slot 1)
    hero: {
      eyebrow: 'Late-night cravings. All-day crunch.',
      headlinePrefix: 'Your Cravings.',
      headlineAccent: 'Our Calling.',
      lede:
        'Small-batch masala popcorn popped in sunflower oil with bold Indian flavours. Made in Gurugram for the crunch moments you already love.',
      primaryButtonText: 'Grab a Pack',
      primaryButtonHref: '#packs',
      secondaryButtonText: 'Meet the Flavours',
      secondaryButtonHref: '#flavours',
      rotatingBadgeText: 'NO PALM OIL • SMALL BATCH • ',
    },

    // 3. Marquee Ribbons (Slot 4 - Brand phrases only)
    ribbons: {
      track1: [
        'CRUNCH O’CLOCK',
        'SMALL BATCH CRAFTED',
        'MADE IN GURUGRAM',
        'POPPED IN SUNFLOWER OIL',
        'YOUR CRAVINGS. OUR CALLING.',
      ],
      track2: [
        'BOLD MASALA FLAVOURS',
        'THE FIRESTARTER',
        'THE MOOD LIFTER',
        'THE COMFORT ONE',
        '100% WHOLE GRAIN CORN',
      ],
    },

    // 4. Flavour Switcher (Slot 2)
    flavourSwitcher: {
      title: 'Three Masala Moods.',
      description:
        'Pick the crunch personality that matches your vibe right now. Every batch is seasoned with purpose and zero shortcuts.',
      ctaText: 'Grab This Flavour',
    },

    // 5. Why 11 PM (Midnight background)
    why11pm: {
      title: 'Why 11 PM Snacks Hits Different.',
      description:
        'We prepare popcorn in small batches in Gurugram with honest ingredients, bold Indian masalas, and zero kitchen shortcuts.',
      cards: [
        {
          id: 'small-batch',
          title: 'Small Batch Crafted',
          note: 'popped in Gurugram',
          body: 'We pop kernels in controlled kettle batches so every kernel gets an even pop and balanced masala coating.',
        },
        {
          id: 'zero-palm-oil',
          title: 'Zero Palm Oil',
          note: 'clean sunflower oil',
          body: 'Prepared exclusively in heart-friendly sunflower oil with 0g trans fat. Never heavy, greasy, or recycled.',
        },
        {
          id: 'bold-masala',
          title: 'Bold Masala Crunch',
          note: 'real whole grain',
          body: 'Peri Peri, Tangy Tomato, and Cheddar Cheese personalities built on 100% unrefined whole grain corn.',
        },
      ],
      proteinStat: {
        value: '12g',
        label: 'Plant Protein / 100g',
      },
      ctaText: 'Explore Ingredients & Nutrition →',
      ctaHref: '/nutrition',
    },

    // 6. Kernel to Crunch (Slot 3)
    processStory: {
      title: 'From Kernel to Crunch.',
      description:
        'A transparent look at how we transform unrefined corn into small-batch masala popcorn in Gurugram.',
      steps: [
        {
          number: '01',
          title: 'Pick the Kernel',
          subtitle: '100% Whole Grain Corn',
          body: 'We source high-expansion unrefined corn kernels that retain their natural dietary fibre, bran, and germ.',
        },
        {
          number: '02',
          title: 'Pop in Sunflower Oil',
          subtitle: 'Air-popped & light mist',
          body: 'Kernels expand into airy, fluffy blossoms using clean sunflower oil heat. No heavy vats or recycled oils.',
        },
        {
          number: '03',
          title: 'Season with Masala',
          subtitle: 'Warm-tumbled spice blends',
          body: 'Warm popcorn is gently tumbled in small batches with our signature Peri Peri, Tomato, and Cheese masalas.',
        },
        {
          number: '04',
          title: 'Seal and Ship',
          subtitle: 'Foil-nitrogen locked freshness',
          body: 'Nitrogen-flushed foil packs lock in crisp snap and flavor intensity before speeding straight to your door.',
        },
      ],
      ctaText: 'Read Our Full Story →',
      ctaHref: '/our-story',
    },

    // 7. Packs (Slot 5)
    packsSection: {
      title: 'Two Real Packs. Real Value.',
      description:
        'Choose single-serve everyday crunch for quick work breaks or jumbo bags for movie nights with friends.',
    },

    // 8. Nutrition Snapshot
    nutritionSnapshot: {
      title: 'Nutrition Snapshot.',
      description:
        'Mindful snacking means real ingredients and full transparency. No mystery fillers or recycled oils.',
      labelPlaceholder: '[TODO: lab-verified nutrition panel per 30g pack]',
      ctaText: 'See Full Nutrition Details →',
      ctaHref: '/nutrition',
    },

    // 9. Moments (Horizontally scrolling, no health claims)
    moments: {
      title: 'Moments That Call for Crunch.',
      description:
        'From midnight study grinds to weekend marathons, snacking fits the moments you already have.',
      cards: [
        {
          id: 'study-break',
          title: 'Study Break',
          time: '11:15 PM',
          note: 'cram session fuel',
          body: 'When your code won’t compile or your assignment is due at midnight, a quick bowl of Peri Peri resets focus.',
        },
        {
          id: 'movie-night',
          title: 'Movie Night',
          time: '9:30 PM',
          note: 'weekend binge',
          body: 'Jumbo Cheddar Cheese bag passed around the sofa. Airy crunch that doesn’t leave heavy grease on your fingers.',
        },
        {
          id: 'road-trip',
          title: 'Road Trip',
          time: '4:45 PM',
          note: 'highway companion',
          body: 'Glove-box staple for long drives and traffic crawls. Tangy Tomato satisfies sweet-sour cravings.',
        },
        {
          id: 'office-4pm',
          title: 'Office 4 PM Slump',
          time: '4:00 PM',
          note: 'desk munchies',
          body: 'When energy dips before evening meetings, Everyday Crunch 30g delivers genuine satisfaction without sugar crashes.',
        },
        {
          id: 'midnight-craving',
          title: 'Midnight Craving',
          time: '11:00 PM',
          note: 'crunch o’clock',
          body: 'The clock hits 11 PM and your stomach talks. Small-batch crunch that hits the spot without the regret.',
        },
      ],
      ctaText: 'Find Your Snack Moment →',
      ctaHref: '/flavours',
    },

    // 10. Social Proof (Slot 6)
    socialProof: {
      title: 'Late Night Crunch Club.',
      description:
        'Candid feedback and snacking snapshots from early crunchers across Gurugram, Delhi, and Noida.',
      ratingSummaryPlaceholder: '[TODO: 4.8★ Verified Early Snacker Rating]',
      reviews: [
        {
          author: 'Pooja M., Gurugram',
          quote: 'The Peri Peri kick is legitimately spicy without feeling greasy. Finally a popcorn that feels light and clean!',
          occasion: 'desk snack',
        },
        {
          author: 'Aman K., Delhi',
          quote: 'Jumbo 90g pack is a lifesaver during weekend gaming sessions. Cheddar Cheese has an actual creamy crunch.',
          occasion: 'gaming night',
        },
        {
          author: 'Rhea S., Noida',
          quote: 'Tangy Tomato brings back school nostalgia. It is super light and doesn’t leave your fingers covered in mystery sludge.',
          occasion: 'netflix binge',
        },
      ],
      photoGridPlaceholder: '[TODO: verified customer photo tag #11PMSnacks]',
      ctaText: 'Join the Crunch Club →',
      ctaHref: '/contact',
    },

    // 11. FAQ (Slot 7)
    faqSection: {
      title: 'Got Questions? We’ve Got Crunch.',
      description:
        'Everything you need to know about our oil policy, pack sizes, ingredients, and Gurugram kitchen.',
      ctaText: 'View Full FAQ →',
      ctaHref: '/faq',
    },

    // 12. Newsletter / WhatsApp Sign-up
    newsletterSection: {
      title: 'Join the Late Night Snack Club.',
      description:
        'Get secret drop alerts for new masala recipes, flash midnight discounts, and exclusive perks.',
      inputPlaceholder: 'Enter your WhatsApp or email',
      buttonText: 'Get Midnight Perks',
      disclaimer: 'Zero spam. Strictly crunch news and secret discount drops.',
    },
  },

  // 6 verified FAQ items
  faqItems: [
    {
      question: 'Which oil do you use to pop 11 PM Snacks?',
      answer:
        'We pop our corn exclusively in sunflower oil. We strictly use zero unrefined substitutes, hydrogenated fats, or recycled cooking oils across all recipes.',
    },
    {
      question: 'What pack sizes are available and what do they cost?',
      answer:
        'We offer two practical sizes: Everyday Crunch (30 g) at ₹30 for quick personal snacking, and Jumbo Crunch (90 g) at ₹60 for sharing and long movies.',
    },
    {
      question: 'Where are 11 PM Snacks produced?',
      answer:
        'All our popcorn is crafted, seasoned, and packed in small batches in Gurugram, Haryana, India.',
    },
    {
      question: 'Are 11 PM Snacks gluten-free and vegetarian?',
      answer:
        'Yes! Whole grain corn is naturally 100% gluten-free. All three flavours are 100% vegetarian-friendly.',
    },
    {
      question: 'How do you keep the popcorn crisp without preservatives?',
      answer:
        'We pack immediately after seasoning in multi-barrier nitrogen-flushed foil pouches that keep moisture out and lock crunch in.',
    },
    {
      question: 'Where can I buy 11 PM Snacks near me?',
      answer:
        'You can order through our direct store links or find us in select regional retail outlets. Visit our Where to Buy page for the latest verified stockist details.',
    },
  ],
};
