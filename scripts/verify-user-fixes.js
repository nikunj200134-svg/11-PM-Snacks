const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT_DIR = 'C:\\Users\\Kunal\\.gemini\\antigravity\\brain\\f6135f91-9724-4fc6-aacc-a247f08002a3';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  // 1. Mobile View (390px) - Header Logo Size & Seamless Dark Background
  console.log('Capturing Mobile Header...');
  const mobilePage = await browser.newPage();
  await mobilePage.evaluateOnNewDocument(() => {
    sessionStorage.setItem('11pm_preloader_v3', 'seen');
  });
  await mobilePage.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 800));

  await mobilePage.screenshot({
    path: path.join(OUT_DIR, 'fixed-mobile-header-390px.png'),
    clip: { x: 0, y: 0, width: 390, height: 280 }
  });
  console.log('Saved fixed-mobile-header-390px.png');
  await mobilePage.close();

  // 2. Desktop View (1440px)
  const page = await browser.newPage();
  await page.evaluateOnNewDocument(() => {
    sessionStorage.setItem('11pm_preloader_v3', 'seen');
  });
  await page.setViewport({ width: 1440, height: 1100 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Capture AppleFeatureBlock: Flavour Switcher Tabs + Sensory Profile (Image 1 fix)
  console.log('Capturing Flavour Switcher & Sensory Profile...');
  await page.evaluate(() => {
    const el = document.getElementById('features');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({
    path: path.join(OUT_DIR, 'fixed-flavour-switcher-and-meters-1440px.png'),
    clip: { x: 80, y: 0, width: 1280, height: 850 }
  });
  console.log('Saved fixed-flavour-switcher-and-meters-1440px.png');

  // Capture Square Lifestyle Photo Cards (Image 3 fix)
  console.log('Capturing Square Lifestyle Photo Cards...');
  const photoGridInfo = await page.evaluate(() => {
    const heading = Array.from(document.querySelectorAll('h4')).find(h => h.textContent.includes('Craftsmanship & Lifestyle'));
    if (!heading) return null;
    const container = heading.closest('div');
    container.scrollIntoView({ behavior: 'instant', block: 'center' });
    const rect = container.getBoundingClientRect();
    return { top: window.scrollY + rect.top, height: rect.height };
  });

  if (photoGridInfo) {
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(OUT_DIR, 'fixed-square-photo-cards-1440px.png'),
      clip: { x: 80, y: Math.max(0, photoGridInfo.top - 20), width: 1280, height: photoGridInfo.height + 50 }
    });
    console.log('Saved fixed-square-photo-cards-1440px.png');
  }

  // Capture Why Popcorn Section (Image 2 fix: 4 stat cards removed, only 6 commitment cards remain)
  console.log('Capturing Why Popcorn Section...');
  await page.evaluate(() => {
    const el = document.getElementById('why-popcorn');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 1000));

  const whyEl = await page.$('#why-popcorn');
  if (whyEl) {
    await whyEl.screenshot({
      path: path.join(OUT_DIR, 'fixed-why-popcorn-1440px.png')
    });
    console.log('Saved fixed-why-popcorn-1440px.png');
  }

  await page.close();
  await browser.close();
  console.log('All verification captures completed successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
