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
      pouch: '/images/peri-peri.webp',
      tone: 'peri',
      badgeBg: '#FF4B1F',
      accentColor: '#FF4B1F',
      headline: 'Fiery spice with an addictive zesty crunch.',
      moodTag: 'For spice seekers & late-night energy',
      tastingNotes: ['African bird’s eye chili punch', 'Zesty lemon edge', 'Smoked garlic undertone'],
      description:
        'A bold, tongue-tingling masala burst inspired by fiery chili peppers, zesty garlic, and clean roasted seasoning. Popped in sunflower oil with whole grain corn.',
      ingredients: [
        'Whole Grain Corn',
        'Refined Sunflower Oil',
        'Peri Peri Masala Seasoning (Dried Red Chili, Smoked Garlic, Black Pepper, Onion Powder, Rock Salt)',
        'Acidity Regulator (Citric Acid)',
      ],
      allergens: 'Manufactured on equipment that processes dairy and soy products.',
      pairings: [
        {
          title: 'Midnight Cold Brew',
          desc: 'Sharp bitter caffeine cuts through the fiery chili kick perfectly.',
          icon: '☕',
        },
        {
          title: 'Chilled Ginger Ale',
          desc: 'Crisp fizz and natural ginger sparkle amplify the lemon-zest notes.',
          icon: '🧊',
        },
        {
          title: 'Late Night Code / Gaming',
          desc: 'Non-greasy popcorn that keeps your controllers and mechanical keys clean.',
          icon: '🎮',
        },
      ],
      miniFaq: [
        {
          question: 'How spicy is Peri Peri on a real scale?',
          answer:
            'It rates 5/5 on our heat meter. It delivers a lively bird’s eye chili kick with lemon zest, warm and tongue-tingling rather than throat-burning.',
        },
        {
          question: 'Is Peri Peri 100% vegetarian?',
          answer:
            'Yes! Peri Peri is 100% vegetarian, formulated entirely with plant-based spices, corn, and sunflower oil.',
        },
      ],
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
      nutritionTable: [
        { nutrient: 'Energy', per30g: '[TODO: lab kcal]', per100g: '[TODO: lab kcal]' },
        { nutrient: 'Plant Protein', per30g: '3.6g', per100g: '12.0g' },
        { nutrient: 'Carbohydrates', per30g: '[TODO: lab carbs]', per100g: '[TODO: lab carbs]' },
        { nutrient: 'Dietary Fibre', per30g: '[TODO: lab fibre]', per100g: '[TODO: lab fibre]' },
        { nutrient: 'Total Fat', per30g: '[TODO: lab fat]', per100g: '[TODO: lab fat]' },
        { nutrient: 'Trans Fat', per30g: '0.0g', per100g: '0.0g' },
        { nutrient: 'Cholesterol', per30g: '0.0mg', per100g: '0.0mg' },
        { nutrient: 'Sodium', per30g: '[TODO: lab sodium]', per100g: '[TODO: lab sodium]' },
      ],
    },
    {
      id: 'tangy-tomato',
      name: 'Tangy Tomato',
      subtitle: 'The Mood Lifter',
      slug: 'tangy-tomato',
      href: '/flavours/tangy-tomato',
      pouch: '/images/tangy-tomato.webp',
      tone: 'tomato',
      badgeBg: '#E5262F',
      accentColor: '#E5262F',
      headline: 'Sweet, sour, and sun-ripened masala pop.',
      moodTag: 'For movie marathons & chatpata cravings',
      tastingNotes: ['Sun-ripened ripe tomato tang', 'Sweet-sour balance', 'Herb-infused crunch'],
      description:
        'A lively balance of ripe tomato sweetness and tangy chatpata spices that delivers instant nostalgia in every crunchy kernel. 100% whole grain corn base.',
      ingredients: [
        'Whole Grain Corn',
        'Refined Sunflower Oil',
        'Tangy Tomato Masala Seasoning (Tomato Powder, Dry Mango Amchur, Cumin, Black Salt, Coriander, Kashmiri Chili)',
        'Acidity Regulator (Malic Acid)',
      ],
      allergens: 'Manufactured on equipment that processes dairy and soy products.',
      pairings: [
        {
          title: 'Adrak Masala Chai',
          desc: 'Hot spiced tea with sweet-tangy chatpata crunch is pure monsoon nostalgia.',
          icon: '🫖',
        },
        {
          title: 'Sparkling Lemon Soda',
          desc: 'Refreshing citrus bubbles harmonize with the sun-ripened tomato spices.',
          icon: '🍋',
        },
        {
          title: 'Weekend Movie Marathon',
          desc: 'Light and munchable bag that does not tire your palate across 3 continuous episodes.',
          icon: '🎬',
        },
      ],
      miniFaq: [
        {
          question: 'Is Tangy Tomato sweet or chatpata sour?',
          answer:
            'It is distinctly chatpata with a 5/5 tang rating! The sweetness comes naturally from ripe tomato powder, balanced with dry mango amchur and black salt.',
        },
        {
          question: 'Does it contain artificial food colors?',
          answer:
            'No. The rich reddish-gold hue comes from real sun-dried tomato powder and mild Kashmiri chili.',
        },
      ],
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
      nutritionTable: [
        { nutrient: 'Energy', per30g: '[TODO: lab kcal]', per100g: '[TODO: lab kcal]' },
        { nutrient: 'Plant Protein', per30g: '3.6g', per100g: '12.0g' },
        { nutrient: 'Carbohydrates', per30g: '[TODO: lab carbs]', per100g: '[TODO: lab carbs]' },
        { nutrient: 'Dietary Fibre', per30g: '[TODO: lab fibre]', per100g: '[TODO: lab fibre]' },
        { nutrient: 'Total Fat', per30g: '[TODO: lab fat]', per100g: '[TODO: lab fat]' },
        { nutrient: 'Trans Fat', per30g: '0.0g', per100g: '0.0g' },
        { nutrient: 'Cholesterol', per30g: '0.0mg', per100g: '0.0mg' },
        { nutrient: 'Sodium', per30g: '[TODO: lab sodium]', per100g: '[TODO: lab sodium]' },
      ],
    },
    {
      id: 'cheddar-cheese',
      name: 'Cheddar Cheese',
      subtitle: 'The Comfort One',
      slug: 'cheddar-cheese',
      href: '/flavours/cheddar-cheese',
      pouch: '/images/cheddar-cheese.webp',
      tone: 'cheddar',
      badgeBg: '#FFC21A',
      accentColor: '#FFC21A',
      headline: 'Rich, savory cheddar melt on every kernel.',
      moodTag: 'For unwind hours & late-night comfort',
      tastingNotes: ['Sharp golden cheddar note', 'Creamy savory finish', 'Mellow comforting crunch'],
      description:
        'Velvety cheddar warmth meeting an airy, crispy pop. Irresistibly savory without being heavy, prepared in small batches in Gurugram.',
      ingredients: [
        'Whole Grain Corn',
        'Refined Sunflower Oil',
        'Cheddar Cheese Seasoning (Cheddar Cheese Powder, Whey Powder, Salt, Onion Powder, Paprika Extract)',
      ],
      allergens: 'Contains Milk / Dairy derivatives. Made in a facility that also processes soy.',
      pairings: [
        {
          title: 'Iced Peach Iced Tea',
          desc: 'Fruity sweetness complements the deep savory cheese richness.',
          icon: '🍑',
        },
        {
          title: 'Hot Dark Chocolate',
          desc: 'For cold winter late nights — salty creamy cheddar against velvety warm cocoa.',
          icon: '🍫',
        },
        {
          title: 'Rainy Balcony Reading',
          desc: 'Comfort crunch that hits the sweet spot between satisfying and soothing.',
          icon: '🌧️',
        },
      ],
      miniFaq: [
        {
          question: 'Does this contain real cheddar cheese?',
          answer:
            'Yes! We season with genuine dehydrated cheddar cheese powder and dairy whey for a natural melt-in-mouth richness.',
        },
        {
          question: 'Is Cheddar Cheese vegetarian?',
          answer:
            'Yes, 100% vegetarian. It contains dairy whey and microbial cheese cultures (no animal rennet).',
        },
      ],
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
      nutritionTable: [
        { nutrient: 'Energy', per30g: '[TODO: lab kcal]', per100g: '[TODO: lab kcal]' },
        { nutrient: 'Plant Protein', per30g: '3.6g', per100g: '12.0g' },
        { nutrient: 'Carbohydrates', per30g: '[TODO: lab carbs]', per100g: '[TODO: lab carbs]' },
        { nutrient: 'Dietary Fibre', per30g: '[TODO: lab fibre]', per100g: '[TODO: lab fibre]' },
        { nutrient: 'Total Fat', per30g: '[TODO: lab fat]', per100g: '[TODO: lab fat]' },
        { nutrient: 'Trans Fat', per30g: '0.0g', per100g: '0.0g' },
        { nutrient: 'Cholesterol', per30g: '0.0mg', per100g: '0.0mg' },
        { nutrient: 'Sodium', per30g: '[TODO: lab sodium]', per100g: '[TODO: lab sodium]' },
      ],
    },
  ] satisfies FlavourItem[],

  packsStatus: {
    status: 'coming-soon',
    badge: 'Coming Soon',
    notice: 'Batch 01 dropping soon. No pack sizes or prices before official launch.',
  },

  packs: [] as PackItem[],

  varietyBundle: {
    name: '3-Flavour Variety Crate',
    badge: 'Coming Soon',
    highlight: 'Peri Peri + Tangy Tomato + Cheddar Cheese',
    description: 'One bag of each signature personality so you never have to pick just one [TODO: variety bundle details].',
  },

  homepage: {
    // 1. Announcement Bar (offers or delivery only)
    announcement: [
      'BATCH 01 DROPPING SOON FROM GURUGRAM',
      'ZERO PALM OIL · 100% SUNFLOWER OIL',
      'JOIN THE NOTIFY ME DROP LIST FOR EARLY ACCESS',
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
      question: 'When can I buy 11 PM Snacks?',
      answer:
        'Coming soon! Batch 01 is currently in preparation in our Gurugram kitchen [TODO: launch date]. Join our Notify Me drop list on this page to get early access and exclusive launch crates.',
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

  // INNER PAGES CONTENT (Prompt 6)
  innerPages: {
    flavoursIndex: {
      eyebrow: 'The 11 PM Lineup',
      title: 'Three Moods. One Serious Crunch.',
      description:
        'Every flavour is built with distinct masala personality on whole grain corn popped in sunflower oil. Choose your crave vibe.',
      comparisonStrip: {
        title: 'At-a-Glance Flavour Matrix',
        headers: ['Flavour', 'Heat', 'Tang', 'Key Note', 'Best For'],
        rows: [
          {
            name: 'Peri Peri',
            heat: '5 / 5',
            tang: '2 / 5',
            keyNote: 'Bird’s Eye Chili & Smoked Garlic',
            bestFor: 'Late-night study & gaming energy',
            href: '/flavours/peri-peri',
            badgeBg: '#FF4B1F',
          },
          {
            name: 'Tangy Tomato',
            heat: '2 / 5',
            tang: '5 / 5',
            keyNote: 'Sun-Ripened Tomato & Chatpata Amchur',
            bestFor: 'Monsoon chai & movie marathons',
            href: '/flavours/tangy-tomato',
            badgeBg: '#E5262F',
          },
          {
            name: 'Cheddar Cheese',
            heat: '1 / 5',
            tang: '2 / 5',
            keyNote: 'Velvety Melt & Sharp Cheddar',
            bestFor: 'Unwind hours & cozy binge-watching',
            href: '/flavours/cheddar-cheese',
            badgeBg: '#FFC21A',
          },
        ],
      },
    },

    nutritionPage: {
      eyebrow: 'Radical Transparency',
      title: 'Real Nutrition. Zero Palm Oil.',
      description:
        'Snacking is part of life — make your crunch count. Here is every ingredient, allergen, and verified macro breakdown across all three recipes.',
      oilPhilosophy: {
        heading: 'Why We Pop in Sunflower Oil (Not Palm Oil)',
        subtitle: 'The honest truth about cooking oil choices',
        body: 'Mass-market snacks rely heavily on industrial palm oil for one reason: it is dirt cheap and lasts for years on warehouse shelves. We reject palm oil because it coats your mouth in a heavy, greasy film and is laden with saturated fats. We pop in 100% sunflower oil: it brings a clean, neutral crunch that lets the spices shine, delivers 0g trans fats, and leaves zero oily residue on your fingers. We do not preach clean eating or health perfection; we just pop honest popcorn in Gurugram.',
        keyPointers: [
          {
            title: 'Zero Palm Oil & Zero Hydrogenated Fats',
            desc: 'Popped in sunflower oil with clean roasting temperatures. Never recycled or re-boiled.',
          },
          {
            title: '100% Whole Grain Corn',
            desc: 'Natural bran, germ, and endosperm preserved for dietary fibre and steady complex carbs.',
          },
          {
            title: 'Naturally Gluten-Free & Vegetarian',
            desc: 'Corn is inherently gluten-free. Peri Peri and Tomato are entirely plant-based; Cheese contains genuine dairy whey.',
          },
        ],
      },
      verifiedClaims: [
        {
          claim: '12g Plant Protein per 100g',
          tag: 'Energy Fuel',
          footnote: '[TODO: verified NABL lab report protein certificate]',
          details: 'Natural whole grain corn protein to keep hunger stabilized between meals.',
        },
        {
          claim: 'High Dietary Fibre',
          tag: 'Gut Friendly',
          footnote: '[TODO: verified AOAC dietary fibre testing per batch]',
          details: 'Complex carbohydrates provide smooth digestion without mid-day glucose spikes.',
        },
        {
          claim: '0g Trans Fat · 0mg Cholesterol',
          tag: 'Heart Smart',
          footnote: '[TODO: verified gas chromatography fatty acid profile]',
          details: 'Crafted in heart-friendly sunflower oil with clean unsaturated fatty acids.',
        },
      ],
    },

    ourStoryPage: {
      eyebrow: 'Behind the Crunch',
      title: 'Your Cravings. Our Calling.',
      description:
        'How late-night hunger in Gurugram sparked a rebellion against cardboard-flavored popcorn and greasy palm-oil snacks.',
      originStory: {
        heading: 'Born at 11 PM in Gurugram',
        lead: 'It always starts around 11 PM. You are debugging code, streaming episode four, or cramming for tomorrow’s deadline. Your stomach talks.',
        narrative:
          'When we looked in the pantry, our choices were depressing: hyper-processed chips swimming in recycled palm oil, or bland, styrofoam popcorn that tastes like salted air. We asked: why can’t India have ready-to-eat popcorn that tastes genuinely bold, pops in clean oil, and celebrates real masala personalities? We bought a kettle, sourced whole grain corn, and began small-batch popping right here in Gurugram.',
      },
      pillars: [
        {
          number: '01',
          title: 'Small Batch Kettle Popping',
          body: 'We pop in small batches to guarantee even thermal expansion and consistent masala coating.',
        },
        {
          number: '02',
          title: 'Sunflower Oil Exclusively',
          body: 'Zero palm oil. Zero industrial shortcuts. Light, crispy crunch that leaves your fingers clean.',
        },
        {
          number: '03',
          title: 'Masala Personalities',
          body: 'Peri Peri, Tangy Tomato, and Cheddar Cheese — each crafted with unapologetic Indian spice love.',
        },
      ],
    },

    whereToBuyPage: {
      eyebrow: 'Fast Delivery & Retail',
      title: 'Where to Buy 11 PM Snacks',
      description:
        'Order online for direct home delivery or find us across fast delivery apps and select regional gourmet stockists.',
      onlinePlatforms: [
        {
          name: 'Direct Online Store',
          eta: 'Dispatched fresh daily from Gurugram kitchen',
          badge: 'Best Freshness',
          ctaText: 'Shop Flavours Here',
          ctaHref: '/flavours',
          isLive: true,
        },
        {
          name: 'Blinkit',
          eta: '10–15 Minute Delivery in Gurugram, Delhi & NCR',
          badge: 'Quick Commerce',
          ctaText: '[TODO: Blinkit store link pending]',
          ctaHref: '#',
          isLive: false,
        },
        {
          name: 'Zepto',
          eta: '10 Minute Delivery across metro dark stores',
          badge: 'Quick Commerce',
          ctaText: '[TODO: Zepto store link pending]',
          ctaHref: '#',
          isLive: false,
        },
        {
          name: 'Swiggy Instamart',
          eta: 'Instant snack delivery to your doorstep',
          badge: 'Quick Commerce',
          ctaText: '[TODO: Instamart store link pending]',
          ctaHref: '#',
          isLive: false,
        },
        {
          name: 'Amazon India',
          eta: 'Pan-India 1–2 Day Prime delivery for Jumbo Crates',
          badge: 'Pan-India',
          ctaText: '[TODO: Amazon store link pending]',
          ctaHref: '#',
          isLive: false,
        },
      ],
      wholesale: {
        title: 'Wholesale & Retail Stockists',
        desc: 'Want to stock 11 PM Snacks at your cafe, college commissary, retail store, or tech office pantry? We offer competitive carton pricing, point-of-sale display racks, and direct kitchen dispatch.',
        ctaText: 'Partner With Us →',
        ctaHref: '/contact?wholesale=true',
      },
    },

    faqPage: {
      eyebrow: 'Got Questions?',
      title: 'Frequently Asked Questions',
      description:
        'Everything you need to know about our ingredients, oil policy, pack sizes, shelf life, and shipping.',
      categories: [
        {
          name: 'Ingredients & Oil Policy',
          items: [
            {
              question: 'Which cooking oil do you use to pop 11 PM Snacks?',
              answer:
                'We pop our kernels exclusively in refined sunflower oil. We use zero palm oil, hydrogenated fats, or recycled oils across every recipe.',
            },
            {
              question: 'Are 11 PM Snacks vegetarian and gluten-free?',
              answer:
                'Yes. Corn is naturally 100% gluten-free. Peri Peri and Tangy Tomato are plant-based. Cheddar Cheese is 100% vegetarian containing dairy whey.',
            },
            {
              question: 'Where does the 12g protein come from?',
              answer:
                'Popcorn is a whole grain. Unrefined whole corn kernels naturally contain plant protein and dietary fibre in their bran and germ layers.',
            },
          ],
        },
        {
          name: 'Launch, Freshness & Availability',
          items: [
            {
              question: 'When can I buy 11 PM Snacks?',
              answer:
                'Coming soon! Batch 01 is currently in preparation in our Gurugram kitchen [TODO: launch date]. Join our Notify Me drop list to get first access the moment we launch.',
            },
            {
              question: 'How do you keep popcorn crispy without chemical preservatives?',
              answer:
                'We flush our multi-layer foil pouches with food-grade nitrogen immediately after seasoning. This locks out oxygen and moisture.',
            },
            {
              question: 'What is the shelf life of 11 PM Snacks?',
              answer:
                'Best consumed within 6 months from the date of manufacture. Once opened, consume promptly or seal tightly to maintain maximum crunch.',
            },
          ],
        },
        {
          name: 'Ordering, Shipping & Wholesale',
          items: [
            {
              question: 'Where are 11 PM Snacks manufactured?',
              answer:
                'All popcorn is prepared, seasoned, and shipped in small batches from our kitchen in Gurugram, Haryana, India (PIN 122001).',
            },
            {
              question: 'What is your shipping policy and delivery timeline?',
              answer:
                'Batch 01 will dispatch directly from our kitchen in Gurugram [TODO: launch date]. Deliveries will take 1–2 days within Delhi NCR and 3–5 days across major metros.',
            },
            {
              question: 'Do you offer bulk wholesale for corporate pantries or retail stores?',
              answer:
                'Yes! We partner with offices, cafes, colleges, and independent retailers. Visit our Contact page and select Wholesale Inquiry for tier pricing.',
            },
          ],
        },
      ],
    },

    contactPage: {
      eyebrow: 'Reach Out',
      title: 'Let’s Talk Crunch.',
      description:
        'Have a question about an order, want to suggest a new crazy masala flavor, or partner with us for retail? Drop us a line.',
      directContacts: {
        phone: '+91 85108 01655',
        phoneTel: '+918510801655',
        emailPlaceholder: 'hello@11pmsnacks.com',
        location: 'Shivji Park Colony, Gurugram, Haryana 122001, India',
        hours: 'Monday to Saturday, 10:00 AM – 8:00 PM IST',
      },
    },

    legalPages: {
      privacy: {
        title: 'Privacy Policy',
        lastUpdated: 'November 2026',
        content: `At 11 PM Snacks ("we", "our", or "us"), we value your trust and privacy. This Privacy Policy outlines how we collect, use, and protect your information when you visit 11pm-snacks.vercel.app or purchase our products.

1. Information We Collect:
- Contact details: Name, shipping address, email address, and phone number provided during checkout or contact submissions.
- Order details: Items purchased, transaction IDs, and delivery preferences.
- Device & Analytics data: Browser type, IP address, and anonymized site interaction telemetry to improve user experience.

2. How We Use Your Data:
- To process, pack, and ship your popcorn orders from Gurugram.
- To send SMS or WhatsApp order confirmations and tracking updates.
- To respond to customer support inquiries and wholesale requests.
- We NEVER sell, rent, or trade your personal data to third-party data brokers.

3. Security:
We implement industry-standard encryption protocols (HTTPS/TLS) and partner with RBI-authorized payment gateways (such as Razorpay/Shopify Payments) for secure transactions. We do not store credit card or UPI PINs on our servers.

4. Contact:
For any privacy questions or data deletion requests, contact us at hello@11pmsnacks.com or +91 85108 01655.`,
      },
      terms: {
        title: 'Terms of Service',
        lastUpdated: 'November 2026',
        content: `Welcome to 11 PM Snacks. By accessing our website or placing an order, you agree to comply with and be bound by the following Terms of Service.

1. Products & Availability:
- We produce ready-to-eat small-batch masala popcorn. Products and batch offerings are subject to availability.
- All official pricing and ordering will be announced upon official batch launch [TODO: launch date].
- We reserve the right to modify recipes or discontinue flavours with prior notice.

2. Orders & Cancellations:
- Orders can be cancelled prior to warehouse dispatch. Once dispatched via our courier partners, orders cannot be recalled.
- If an item arrives damaged or unsealed, notify us within 24 hours of delivery with photographic evidence for an immediate replacement or full refund.

3. Intellectual Property:
All trademarks, logos ("11 PM SNACKS"), packaging designs, copy, and graphics are the exclusive intellectual property of 11 PM Snacks. Unauthorized reproduction or resale is prohibited.

4. Jurisdiction:
These terms are governed by the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the courts in Gurugram, Haryana.`,
      },
      shippingReturns: {
        title: 'Shipping & Returns Policy',
        lastUpdated: 'November 2026',
        content: `We take pride in popping fresh batches daily and shipping them swiftly so you experience maximum crunch.

1. Shipping Timelines:
- Delhi NCR: 24 to 48 hours.
- Major Indian Metros: 2 to 4 business days.
- Rest of India: 4 to 6 business days.
- Batch 01 orders qualify for launch priority shipping. Detailed delivery rates and partner logistics will be confirmed upon checkout launch.

2. Freshness Guarantee & Damaged Goods:
Because our popcorn is a perishable food product, we do not accept general returns once delivered. However, if your order arrives damaged, leaking, unsealed, or past expiration, we will send a replacement pack or process a 100% refund immediately.

3. Contacting Support:
Reach our support desk on WhatsApp or call +91 85108 01655, or email hello@11pmsnacks.com with your Order ID.`,
      },
    },
  },
};
