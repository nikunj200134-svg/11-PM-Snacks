export const site = {
  name: '11 PM Snacks',
  tagline: 'Your Cravings. Our Calling.',
  description:
    '11 PM Snacks is an Indian masala-flavoured popcorn brand. Discover Peri Peri, Tangy Tomato, and Cheddar Cheese — small-batch crafted in Gurugram, popped in sunflower oil with zero palm oil.',
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'https://11pmsnacks.com'),
  phone: '+918510801655',
  phoneDisplay: '+91 85108 01655',
  gstin: '06JKWPK0688H1ZD',
  city: 'Gurugram, Haryana',
  addressLines: ['House No. 525/22A, Street 10', 'Shivji Park Colony', 'Gurugram, Haryana 122001'],
  proprietor: 'Kunal Sengar',
};

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/flavours', label: 'Our Flavours', children: [
    { href: '/flavours/peri-peri', label: 'Peri Peri' },
    { href: '/flavours/tangy-tomato', label: 'Tangy Tomato' },
    { href: '/flavours/cheese', label: 'Cheese' },
  ]},
  { href: '/healthy-snacking', label: 'Healthy Snacking' },
  { href: '/why-11pm', label: 'Why 11 PM?' },
  { href: '/ingredients-nutrition', label: 'Ingredients & Nutrition' },
  { href: '/our-process', label: 'Our Process' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
] as const;

export const packIcons = [
  '12g Protein / 100g',
  'High in Dietary Fibre',
  'Rich in Antioxidants',
  'Naturally Cholesterol-Free',
  '100% Gluten Free',
  '100% Whole Grain Corn',
  'Plant-Based Snacking',
  'Sunflower Oil · No Palm Oil',
] as const;

export const nutritionPillars = [
  {
    id: 'protein',
    title: '12g Protein per 100g',
    badge: '12g / 100g',
    icon: '💪',
    short: 'Good source of plant protein',
    description:
      'Provides a substantial 12g of natural plant-based protein per 100g serving [TODO: lab verified]. Fuels active focus, helps keep hunger steady, and satisfies after-hours cravings.',
    highlight: '12g',
    unit: 'per 100g',
    image: '/brand/clusters.png',
  },
  {
    id: 'fibre',
    title: 'High in Dietary Fibre',
    badge: 'Digestive Health',
    icon: '🌾',
    short: 'Promotes gut wellness & fullness',
    description:
      'Popped whole corn kernels are naturally high in dietary fibre to support healthy digestion, feed beneficial gut bacteria, and keep you full longer without sluggishness.',
    highlight: 'High',
    unit: 'Fibre',
    image: '/brand/pop-explosion.png',
  },
  {
    id: 'antioxidants',
    title: 'Natural Polyphenols',
    badge: 'Corn Hull Nutrients',
    icon: '✨',
    short: 'Contains natural polyphenols from the corn hull',
    description:
      'The outer bran and hull of popped whole grain corn concentrates naturally occurring polyphenol plant compounds and wholesome corn nutrients.',
    highlight: 'Rich',
    unit: 'Polyphenols',
    image: '/brand/celebration.png',
  },
  {
    id: 'heart',
    title: 'Naturally Cholesterol-Free',
    badge: 'Zero Palm Oil',
    icon: '❤️',
    short: 'Sunflower oil · 0g trans fat',
    description:
      'Cholesterol-free, made with sunflower oil, no palm oil. Popped exclusively in pure sunflower oil with 0g trans fats and zero hydrogenated fats.',
    highlight: 'Clean',
    unit: 'Sunflower Oil',
    image: '/brand/burst-hero.png',
  },
  {
    id: 'gluten-free',
    title: '100% Gluten Free',
    badge: 'Naturally gluten-free ingredients',
    icon: '🛡️',
    short: 'Naturally gluten-free ingredients',
    description:
      'Corn is an inherently gluten-free whole grain. Enjoy bold, fiery masala indulgence with complete peace of mind, free from wheat, barley, rye, or hidden gluten binders.',
    highlight: '100%',
    unit: 'Gluten Free',
    image: '/brand/peri-burst.png',
  },
  {
    id: 'whole-grain',
    title: '100% Whole Grain Corn',
    badge: 'Unrefined Wholesome',
    icon: '🌽',
    short: 'Unrefined complex carbohydrates',
    description:
      'Crafted from 100% unrefined whole grain corn containing all three parts: the bran, germ, and endosperm. Gives you steady crunch and wholesome plant fibre.',
    highlight: 'Whole',
    unit: 'Grain Goodness',
    image: '/brand/kernels-play.png',
  },
  {
    id: 'plant-based',
    title: 'Vegetarian Recipes',
    badge: 'Pure Vegetarian',
    icon: '🌿',
    short: 'Vegetarian recipes (dairy whey in Cheese)',
    description:
      'Rooted in clean, non-animal agricultural ingredients with no animal fats or chemical shortenings. Peri Peri and Tomato are entirely plant-based; Cheese contains authentic dairy whey.',
    highlight: 'Pure',
    unit: 'Vegetarian',
    image: '/brand/lifestyle-joy.png',
  },
] as const;

export const packSizes = [
  {
    id: 'everyday',
    label: 'Single Munch',
    kicker: 'A quick handful',
    title: 'Your little break, packed with flavour.',
    body: 'A convenient single-serving pouch for work breaks, study sessions, travel, or whenever a craving strikes.',
    image: '/images/peri-peri.webp',
    alt: '11 PM Snacks signature pouch',
    size: 'regular' as const,
  },
  {
    id: 'jumbo',
    label: 'Share Crate',
    kicker: 'For longer moments',
    title: 'More popcorn for the moments that last longer.',
    body: 'Perfect for sharing, movie nights, get-togethers, or when you simply want more of your favourite crunch.',
    image: '/images/cheddar-cheese.webp',
    alt: '11 PM Snacks sharing pouch',
    size: 'jumbo' as const,
  },
] as const;

export const labelChecks = [
  { title: 'Read the ingredient list', body: 'Oils, seasonings, and allergens sit in the ingredients, not in the flavour name on the front.' },
  { title: 'Notice the oil', body: 'Different snacks use different oils. 11 PM Snacks pouches name sunflower oil and do not use palm oil. That is an ingredient choice, not a health ranking of every other oil.' },
  { title: 'Compare the panel', body: 'Saturated fat, sodium, fibre, energy, and serving size are how packs can be compared — once those numbers are on the label you are holding.' },
  { title: 'Portion matters', body: 'How much you eat changes the nutrition you actually consume.' },
  { title: 'Marketing is not the panel', body: 'Front-of-pack lines and icons are not a substitute for ingredients, allergens, and the nutrition information table.' },
] as const;

export const flavours = [
  {
    slug: 'peri-peri',
    name: 'Peri Peri',
    href: '/flavours/peri-peri',
    kicker: '01 / The Firestarter',
    headline: 'Bring on the Heat.',
    subhead: 'Bold flavour. Fiery attitude. Serious crunch.',
    preview: 'A fiery masala kick meets satisfying popcorn crunch. Made for the ones who like their snacks bold, punchy, and full of attitude.',
    cta: 'Discover Peri Peri',
    theme: 'peri' as const,
    mood: ['Bold', 'Punchy', 'Spicy'],
    pouch: '/brand/peri-peri-pouch.png',
    burst: '/brand/peri-burst.png',
    personality:
      'Peri Peri is the flavour that walks in loud. It is built for people who want masala with heat, crunch with attitude, and a snack that does not fade into the background.',
    taste: [
      { title: 'Heat first', body: 'A peri peri masala kick leads the flavour, with warmth that builds across a handful rather than disappearing on the first crunch.' },
      { title: 'Savoury spice', body: 'The seasoning is designed to taste like a snack you remember — spicy, seasoned, and unapologetically bold.' },
      { title: 'Serious crunch', body: 'Under the heat is still popcorn: light, popped, and made to be eaten by the handful.' },
    ],
  },
  {
    slug: 'tangy-tomato',
    name: 'Tangy Tomato',
    href: '/flavours/tangy-tomato',
    kicker: '02 / The Mood Lifter',
    headline: 'Get Ready to Tang.',
    subhead: 'A tangy twist. A satisfying crunch. A whole lot of flavour.',
    preview: 'A delicious tomato twist brings a tangy burst of flavour to every handful. Bright, lively, and made for your next snack-time craving.',
    cta: 'Discover Tangy Tomato',
    theme: 'tomato' as const,
    mood: ['Zesty', 'Bright', 'Lively'],
    pouch: '/brand/tangy-tomato-pouch.png',
    burst: '/brand/kernels-play.png',
    personality:
      'Tangy Tomato is the flavour that brightens the room. It is tomato-led, lively, and made for snack breaks that need a little spark rather than a slow burn.',
    taste: [
      { title: 'Tomato-led tang', body: 'The flavour leans into a tomato twist — bright, tangy, and immediately recognisable in a handful.' },
      { title: 'A lively masala', body: 'This is still a masala popcorn, just with a different personality: punchy without chasing heat for heat’s sake.' },
      { title: 'Snack-time energy', body: 'It is the flavour we imagine for afternoon cravings, study breaks, and any moment that needs a lift.' },
    ],
  },
  {
    slug: 'cheese',
    name: 'Cheese',
    href: '/flavours/cheese',
    kicker: '03 / The Comfort One',
    headline: 'Cheesy. Crunchy. Unforgettable.',
    subhead: 'Your favourite savoury mood, now with a popcorn crunch.',
    preview: 'Rich savoury cheese flavour meets the satisfying crunch of popcorn. A comforting favourite with a flavour worth coming back for.',
    cta: 'Discover Cheese',
    theme: 'cheese' as const,
    mood: ['Savoury', 'Comforting', 'Golden'],
    pouch: '/brand/cheese-pouch.png',
    burst: '/brand/kernels-burst.png',
    personality:
      'Cheese is the flavour people reach for when they want something familiar and still a little special. Savoury, comforting, and built around a golden popcorn crunch.',
    taste: [
      { title: 'Savoury cheese', body: 'A rich cheddar cheese flavour leads, designed as a comforting masala-snack mood rather than a plain buttered popcorn.' },
      { title: 'Warm and familiar', body: 'This is the crowd favourite energy: easy to share, easy to keep eating, and hard to confuse with the other two.' },
      { title: 'Crunch that stays', body: 'The cheese seasoning sits on popcorn that is popped and packed to keep that light, satisfying snap.' },
    ],
  },
] as const;

export type Flavour = (typeof flavours)[number];

export function flavourBySlug(slug: string) {
  return flavours.find((item) => item.slug === slug);
}

export function otherFlavours(slug: string) {
  return flavours.filter((item) => item.slug !== slug);
}

export const processSteps = [
  {
    n: '01',
    title: 'Selecting the kernels',
    body: 'Every batch starts with popcorn maize — a popping variety of corn, chosen for the snack we want to make. We work in small batches so the details stay visible from the first scoop of kernels.',
  },
  {
    n: '02',
    title: 'Popping',
    body: 'Heat turns each kernel into popcorn. We pop in small batches so we can watch the process, rather than treating popcorn as an afterthought on a long production line.',
  },
  {
    n: '03',
    title: 'Cooling',
    body: 'Freshly popped corn needs a pause. Cooling helps the crunch settle before seasoning goes on, so flavour has a better surface to hold.',
  },
  {
    n: '04',
    title: 'Seasoning',
    body: 'This is where Peri Peri, Tangy Tomato, and Cheese become themselves. Flavour seasoning is applied after popping, in the batch, with attention to coverage and character.',
  },
  {
    n: '05',
    title: 'Quality checks',
    body: 'We look at the batch before it is packed — the pop, the seasoning, the details that decide whether a handful feels like 11 PM Snacks.',
  },
  {
    n: '06',
    title: 'Packing and sealing',
    body: 'Popcorn is packed and sealed so the crunch you meet at snack time is the crunch we packed. Pack copy is where verified ingredients, allergens, and nutrition belong.',
  },
] as const;
