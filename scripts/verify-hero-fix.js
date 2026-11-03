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

  const page = await browser.newPage();

  // 1. Mobile (390px) Default
  await page.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await page.evaluate(() => sessionStorage.setItem('11pm_preloader_v3', 'seen'));
  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({
    path: path.join(OUT_DIR, 'hero-fixed-mobile-390px.png'),
    clip: { x: 0, y: 0, width: 390, height: 800 }
  });
  console.log('Saved hero-fixed-mobile-390px.png');

  // Click Cheddar Cheese dot on Mobile
  await page.evaluate(() => {
    const dots = document.querySelectorAll('button[aria-label*="Select"]');
    if (dots.length >= 3) dots[2].click();
  });
  await new Promise(r => setTimeout(r, 800));

  await page.screenshot({
    path: path.join(OUT_DIR, 'hero-fixed-mobile-cheddar-390px.png'),
    clip: { x: 0, y: 0, width: 390, height: 800 }
  });
  console.log('Saved hero-fixed-mobile-cheddar-390px.png');

  // 2. Desktop (1440px) Cheddar Cheese hover
  await page.setViewport({ width: 1440, height: 950 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  const cards = await page.$$('div.cursor-pointer');
  if (cards.length >= 3) {
    await cards[2].hover();
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(OUT_DIR, 'hero-fixed-desktop-cheddar-1440px.png'),
      clip: { x: 0, y: 0, width: 1440, height: 900 }
    });
    console.log('Saved hero-fixed-desktop-cheddar-1440px.png');
  }

  await browser.close();
  console.log('All verification captures saved successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
