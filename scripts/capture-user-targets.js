const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT_DIR = 'C:\\Users\\Kunal\\.gemini\\antigravity\\brain\\f6135f91-9724-4fc6-aacc-a247f08002a3';

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  // 1. DESKTOP 1440x950
  const page = await browser.newPage();
  await page.evaluateOnNewDocument(() => {
    sessionStorage.setItem('11pm_preloader_v3', 'seen');
  });
  await page.setViewport({ width: 1440, height: 950 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  // Check if preloader is visible, click skip if so
  await page.evaluate(() => {
    const btn = document.querySelector('button');
    if (btn && btn.textContent && btn.textContent.includes('Skip')) {
      btn.click();
    }
  });
  await new Promise(r => setTimeout(r, 600));

  // Target 1: Hero Default (Pouch alignment, curves, spacing, proof chips)
  console.log('Capturing Target 1: Hero default desktop...');
  await page.screenshot({
    path: path.join(OUT_DIR, 'target-hero-default-desktop.png'),
    clip: { x: 0, y: 70, width: 1440, height: 860 }
  });

  // Target 2: Hero Cheddar Hover ("CHEDDAR CHEESE" title full fit, no clipping)
  console.log('Capturing Target 2: Hero cheddar hover desktop...');
  const pouchCards = await page.$$('section:first-of-type div.cursor-pointer');
  if (pouchCards.length >= 3) {
    await pouchCards[2].hover();
    await new Promise(r => setTimeout(r, 700));
    await page.screenshot({
      path: path.join(OUT_DIR, 'target-hero-cheddar-hover-desktop.png'),
      clip: { x: 0, y: 70, width: 1440, height: 860 }
    });
  }

  // Target 3: SienaParallax ("CRAVE · CRUNCH" editorial, movie night image, no popcorn emoji)
  console.log('Capturing Target 3: SienaParallax desktop...');
  const sienaBox = await page.evaluate(() => {
    const el = document.querySelector('section.h-\\[200vh\\]');
    if (!el) return null;
    return { top: el.offsetTop };
  });
  if (sienaBox) {
    await page.evaluate((top) => {
      window.scrollTo(0, top + 150);
    }, sienaBox.top);
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(OUT_DIR, 'target-siena-desktop.png'),
      clip: { x: 0, y: 0, width: 1440, height: 950 }
    });
  }

  // Target 4: CanvasCrowd (Clean narrative, no ugly badge chips, no dark pill collision)
  console.log('Capturing Target 4: CanvasCrowd desktop...');
  const crowdBox = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    const el = sections.find(s => s.classList.contains('h-[300vh]'));
    if (!el) return null;
    return { top: el.offsetTop };
  });
  if (crowdBox) {
    await page.evaluate((top) => {
      window.scrollTo(0, top + 100);
    }, crowdBox.top);
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(OUT_DIR, 'target-canvas-crowd-desktop.png'),
      clip: { x: 0, y: 0, width: 1440, height: 950 }
    });
  }

  // Target 5: Nutrition Page 6 Cards (/nutrition)
  console.log('Capturing Target 5: Nutrition Page 6 Cards desktop...');
  await page.goto('http://localhost:3000/nutrition', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));
  const nutritionCardsSection = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h2'));
    const h = headings.find(el => el.textContent.includes('Why We Pop in Sunflower Oil'));
    if (!h) return null;
    const parentSec = h.closest('section');
    if (!parentSec) return null;
    return { top: parentSec.offsetTop, height: parentSec.offsetHeight };
  });

  if (nutritionCardsSection) {
    await page.evaluate((top) => {
      window.scrollTo(0, top - 30);
    }, nutritionCardsSection.top);
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(OUT_DIR, 'target-nutrition-cards-desktop.png'),
      clip: { x: 0, y: 0, width: 1440, height: 950 }
    });
  }

  // Target 6: Why Popcorn Section on homepage (#why-popcorn)
  console.log('Capturing Target 6: Why Popcorn Section desktop...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await page.evaluate(() => {
    const el = document.getElementById('why-popcorn');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1200));
  const whyPopcornEl = await page.$('#why-popcorn');
  if (whyPopcornEl) {
    await whyPopcornEl.screenshot({
      path: path.join(OUT_DIR, 'target-why-popcorn-desktop.png')
    });
  }

  // 2. MOBILE 390x844
  console.log('Capturing Mobile targets...');
  const mobilePage = await browser.newPage();
  await mobilePage.evaluateOnNewDocument(() => {
    sessionStorage.setItem('11pm_preloader_v3', 'seen');
  });
  await mobilePage.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  await mobilePage.evaluate(() => {
    const btn = document.querySelector('button');
    if (btn && btn.textContent && btn.textContent.includes('Skip')) {
      btn.click();
    }
  });
  await new Promise(r => setTimeout(r, 600));

  await mobilePage.screenshot({
    path: path.join(OUT_DIR, 'target-hero-mobile.png'),
    clip: { x: 0, y: 60, width: 390, height: 750 }
  });

  await mobilePage.close();
  await page.close();
  await browser.close();
  console.log('All targets captured successfully!');
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
