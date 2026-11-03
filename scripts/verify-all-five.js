const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT_DIR = 'C:\\Users\\Kunal\\.gemini\\antigravity\\brain\\f6135f91-9724-4fc6-aacc-a247f08002a3';

async function captureAllFive() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  // -------------------------------------------------------------
  // 1. DESKTOP 1440x950
  // -------------------------------------------------------------
  const page = await browser.newPage();
  await page.evaluateOnNewDocument(() => {
    sessionStorage.setItem('11pm_preloader_v3', 'true');
  });
  await page.setViewport({ width: 1440, height: 950 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  // Screenshot 5 & 2 & 4: HoverHero default (Items 2, 4, 5 check)
  console.log('Capturing Hero default...');
  await page.screenshot({
    path: path.join(OUT_DIR, 'verify-hero-default-1440px.png'),
    clip: { x: 0, y: 0, width: 1440, height: 920 }
  });

  // Hover over Cheddar Cheese card to verify Item 5 ("CHEDDAR CHEESE" full headline, zero clipping)
  console.log('Hovering over Cheddar Cheese...');
  const cards = await page.$$('div.cursor-pointer');
  if (cards.length >= 3) {
    await cards[2].hover();
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(OUT_DIR, 'verify-hero-cheddar-1440px.png'),
      clip: { x: 0, y: 0, width: 1440, height: 920 }
    });
  }

  // Screenshot 3: SienaParallax ("CRAVE · CRUNCH" editorial without emoji)
  console.log('Capturing SienaParallax...');
  const siena = await page.evaluate(() => {
    const el = document.querySelector('section.h-\\[200vh\\]');
    if (!el) return null;
    return { top: el.offsetTop, height: el.offsetHeight };
  });
  if (siena) {
    await page.evaluate((top) => {
      window.scrollTo(0, top + 120);
    }, siena.top);
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(OUT_DIR, 'verify-siena-desktop-1440px.png')
    });
  }

  // Screenshot 1: CanvasCrowd (Crowd story, verify NO cluttered chips / NO overlapping dark pill)
  console.log('Capturing CanvasCrowd...');
  const crowd = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    const el = sections.find(s => s.classList.contains('h-[300vh]'));
    if (!el) return null;
    return { top: el.offsetTop, height: el.offsetHeight };
  });
  if (crowd) {
    await page.evaluate((top) => {
      window.scrollTo(0, top + 100);
    }, crowd.top);
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({
      path: path.join(OUT_DIR, 'verify-canvas-crowd-desktop-1440px.png')
    });
  }

  // Screenshot 4 (Nutrition Page 6 Cards: Good source of protein, gut friendly, gluten free, etc.)
  console.log('Capturing /nutrition 6 cards...');
  await page.goto('http://localhost:3000/nutrition', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({
    path: path.join(OUT_DIR, 'verify-nutrition-cards-desktop-1440px.png'),
    fullPage: false,
    clip: { x: 0, y: 400, width: 1440, height: 850 }
  });

  // -------------------------------------------------------------
  // 2. MOBILE 390x844
  // -------------------------------------------------------------
  const mobilePage = await browser.newPage();
  await mobilePage.evaluateOnNewDocument(() => {
    sessionStorage.setItem('11pm_preloader_v3', 'true');
  });
  await mobilePage.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  console.log('Capturing Mobile Hero...');
  await mobilePage.screenshot({
    path: path.join(OUT_DIR, 'verify-hero-mobile-390px.png'),
    clip: { x: 0, y: 0, width: 390, height: 820 }
  });

  // Click Cheddar Cheese dot
  const dots = await mobilePage.$$('button[aria-label*="Select"]');
  if (dots.length >= 3) {
    await dots[2].click();
    await new Promise(r => setTimeout(r, 800));
    await mobilePage.screenshot({
      path: path.join(OUT_DIR, 'verify-hero-cheddar-mobile-390px.png'),
      clip: { x: 0, y: 0, width: 390, height: 820 }
    });
  }

  // Capture Mobile /nutrition cards
  console.log('Capturing Mobile /nutrition cards...');
  await mobilePage.goto('http://localhost:3000/nutrition', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));
  await mobilePage.screenshot({
    path: path.join(OUT_DIR, 'verify-nutrition-cards-mobile-390px.png'),
    clip: { x: 0, y: 650, width: 390, height: 950 }
  });

  await browser.close();
  console.log('Successfully captured all five verification targets!');
}

captureAllFive().catch(err => {
  console.error(err);
  process.exit(1);
});
