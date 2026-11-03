import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const sourceDir = 'C:\\Users\\Kunal\\OneDrive\\Desktop\\11pm curspr\\images';
const targetDir = path.resolve('public', 'images');

// Mapping original filenames to clean lowercase-hyphenated names
const fileMapping = [
  {
    original: 'Peri Peri Popcorn Snack Showcase.png',
    hyphenated: 'peri-peri-showcase.png',
    flavour: 'Peri Peri',
  },
  {
    original: 'Tangy Tomato Popcorn Snack Bag.png',
    hyphenated: 'tangy-tomato-showcase.png',
    flavour: 'Tangy Tomato',
  },
  {
    original: '11 PM Cheese Popcorn Crunch.png',
    hyphenated: 'cheddar-cheese-showcase.png',
    flavour: 'Cheddar Cheese',
  },
  {
    original: '11 PM Peri Peri Popcorn Ad.png',
    hyphenated: 'peri-peri-ad.png',
    flavour: 'Peri Peri',
  },
  {
    original: '11 PM Popcorn Snack Trio.png',
    hyphenated: 'snack-trio.png',
    flavour: 'All Three (Trio)',
  },
  {
    original: '11PM Snacks Popcorn Flavor Showcase.png',
    hyphenated: 'flavour-showcase.png',
    flavour: 'All Three (Showcase)',
  },
  {
    original: 'Spicy Seasoned Popcorn Cascade.png',
    hyphenated: 'spicy-cascade.png',
    flavour: 'General (Spice Cascade)',
  },
  {
    original: '11 PM Snacks Movie Night.png',
    hyphenated: 'movie-night.png',
    flavour: 'All Three (Lifestyle)',
  },
  {
    original: 'WhatsApp Image 2026-11-03 at 12.34.56 PM (1).jpeg',
    hyphenated: 'packaging-spec-nutrition.jpg',
    flavour: 'All Three (Packaging & Nutrition)',
  },
  {
    original: 'WhatsApp Image 2026-11-03 at 12.34.56 PM.jpeg',
    hyphenated: 'packaging-flat-dieline.jpg',
    flavour: 'All Three (Die-cut & Pouch Flat)',
  },
];

async function run() {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const results = [];

  for (const item of fileMapping) {
    const srcPath = path.join(sourceDir, item.original);
    const destHyphenated = path.join(targetDir, item.hyphenated);
    const webpFilename = item.hyphenated.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    const destWebp = path.join(targetDir, webpFilename);

    // 1. Copy source to lowercase-hyphenated if not identical
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destHyphenated);
    }

    // 2. Read metadata with Sharp
    const metadata = await sharp(destHyphenated).metadata();

    // 3. Convert to optimized WebP strictly under 150 KB
    // Max dimension 1280px ensures crisp 2x retina display while keeping WebP <= 140 KB
    const width = metadata.width > 1280 ? 1280 : metadata.width;
    
    // We start with quality 78 and adjust dynamically if needed to guarantee < 150 KB
    let quality = 78;
    let buffer = await sharp(destHyphenated)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toBuffer();

    while (buffer.length > 150 * 1024 && quality > 40) {
      quality -= 6;
      buffer = await sharp(destHyphenated)
        .resize({ width: Math.round(width * 0.95), withoutEnlargement: true })
        .webp({ quality, effort: 6 })
        .toBuffer();
    }

    fs.writeFileSync(destWebp, buffer);

    const statOriginal = fs.statSync(destHyphenated);
    const statWebp = fs.statSync(destWebp);

    results.push({
      original: item.original,
      hyphenated: item.hyphenated,
      webp: webpFilename,
      flavour: item.flavour,
      width: metadata.width,
      height: metadata.height,
      hasAlpha: metadata.hasAlpha || false,
      originalSizeKB: Math.round(statOriginal.size / 1024),
      webpSizeKB: (statWebp.size / 1024).toFixed(1),
      isUnder150KB: statWebp.size <= 150 * 1024,
    });
  }

  // Also create optimized aliases for existing references
  const aliasPairs = [
    { from: 'peri-peri-showcase.webp', to: 'peri-peri.webp' },
    { from: 'tangy-tomato-showcase.webp', to: 'tangy-tomato.webp' },
    { from: 'cheddar-cheese-showcase.webp', to: 'cheddar-cheese.webp' },
    { from: 'spicy-cascade.webp', to: 'cascade.webp' },
    { from: 'flavour-showcase.webp', to: 'showcase.webp' },
    { from: 'snack-trio.webp', to: 'trio.webp' },
  ];

  for (const pair of aliasPairs) {
    const src = path.join(targetDir, pair.from);
    const dest = path.join(targetDir, pair.to);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
    }
  }

  console.log(JSON.stringify(results, null, 2));
}

run().catch(console.error);
