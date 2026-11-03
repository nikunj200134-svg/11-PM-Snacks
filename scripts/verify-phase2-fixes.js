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

  // 1. Desktop Hero (Full Hero Element screenshot)
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await page.evaluate(() => sessionStorage.setItem('11pm_preloader_v3', 'seen'));
  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));
  
  const heroEl = await page.$('section');
  if (heroEl) {
    await heroEl.screenshot({ path: path.join(OUT_DIR, 'phase2-hero-desktop-1440px.png') });
    console.log('Saved phase2-hero-desktop-1440px.png');
  }

  // 2. Mobile Hero (Full Hero Element screenshot)
  await page.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));
  const mobileHeroEl = await page.$('section');
  if (mobileHeroEl) {
    await mobileHeroEl.screenshot({ path: path.join(OUT_DIR, 'phase2-hero-mobile-390px.png') });
    console.log('Saved phase2-hero-mobile-390px.png');
  }

  // 3. Desktop Nutrition Cards
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto('http://localhost:3000/nutrition', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));
  // Find the "Our Kitchen Commitment" section
  const sections = await page.$$('section');
  // Section 3 is Kitchen Commitment
  if (sections.length >= 3) {
    await sections[2].screenshot({ path: path.join(OUT_DIR, 'phase2-nutrition-cards-desktop-1440px.png') });
    console.log('Saved phase2-nutrition-cards-desktop-1440px.png');
  }

  // 4. Mobile Nutrition Cards
  await page.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/nutrition', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));
  const mobileSections = await page.$$('section');
  if (mobileSections.length >= 3) {
    await mobileSections[2].screenshot({ path: path.join(OUT_DIR, 'phase2-nutrition-cards-mobile-390px.png') });
    console.log('Saved phase2-nutrition-cards-mobile-390px.png');
  }

  // 5. Desktop Pack Cards (Packs Section)
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto('http://localhost:3000/styleguide', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));
  // find pack card container
  const packCard = await page.$('article.rounded-\\[32px\\]');
  if (packCard) {
    await packCard.screenshot({ path: path.join(OUT_DIR, 'phase2-packcards-desktop-1440px.png') });
    console.log('Saved phase2-packcards-desktop-1440px.png');
  }

  // 6. Footer (Desktop)
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  const footerEl = await page.$('footer');
  if (footerEl) {
    await footerEl.screenshot({ path: path.join(OUT_DIR, 'phase2-footer-desktop-1440px.png') });
    console.log('Saved phase2-footer-desktop-1440px.png');
  }

  await browser.close();
  console.log('All elements captured cleanly!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
