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

  // 1. Mobile 390px Viewport (Header Logo & Clean Seamless Look)
  console.log('Capturing Mobile Header...');
  const mobilePage = await browser.newPage();
  await mobilePage.evaluateOnNewDocument(() => {
    sessionStorage.setItem('11pm_preloader_v3', 'seen');
  });
  await mobilePage.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  await mobilePage.screenshot({
    path: path.join(OUT_DIR, 'verified-mobile-header-390px.png'),
    clip: { x: 0, y: 0, width: 390, height: 260 }
  });
  console.log('Saved verified-mobile-header-390px.png');
  await mobilePage.close();

  // 2. Desktop 1440px Viewport
  const page = await browser.newPage();
  await page.evaluateOnNewDocument(() => {
    sessionStorage.setItem('11pm_preloader_v3', 'seen');
  });
  await page.setViewport({ width: 1440, height: 1100 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 800));

  // Element 1: Features Card (Flavour Switcher Tabs + Flavour Intensity Profile)
  console.log('Capturing Flavour Switcher Card...');
  const featuresEl = await page.$('#features');
  if (featuresEl) {
    await featuresEl.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));

    // Find the main card inside #features
    const cardEl = await page.$('#features .bg-white.border-\\[3px\\]');
    if (cardEl) {
      await cardEl.screenshot({
        path: path.join(OUT_DIR, 'verified-flavour-switcher-and-meters-1440px.png')
      });
      console.log('Saved verified-flavour-switcher-and-meters-1440px.png');
    }

    // Element 2: Square Lifestyle Photo Cards
    const photoGrid = await page.$('#features .grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4');
    if (photoGrid) {
      await photoGrid.scrollIntoView();
      await new Promise(r => setTimeout(r, 600));
      await photoGrid.screenshot({
        path: path.join(OUT_DIR, 'verified-square-lifestyle-photos-1440px.png')
      });
      console.log('Saved verified-square-lifestyle-photos-1440px.png');
    }
  }

  // Element 3: Why Popcorn Section (with stat cards removed)
  console.log('Capturing Why Popcorn Section...');
  const whyPopcornEl = await page.$('#why-popcorn');
  if (whyPopcornEl) {
    await whyPopcornEl.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));
    await whyPopcornEl.screenshot({
      path: path.join(OUT_DIR, 'verified-why-popcorn-clean-1440px.png')
    });
    console.log('Saved verified-why-popcorn-clean-1440px.png');
  }

  await page.close();
  await browser.close();
  console.log('All verifications captured successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
