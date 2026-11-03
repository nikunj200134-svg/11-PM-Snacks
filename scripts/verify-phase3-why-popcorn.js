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

  // 1. Desktop 1440px
  const page = await browser.newPage();
  await page.evaluateOnNewDocument(() => {
    sessionStorage.setItem('11pm_preloader_v3', 'true');
  });
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  // Scroll down so dynamic component loads
  await page.evaluate(() => {
    const el = document.getElementById('why-popcorn');
    if (el) el.scrollIntoView({ behavior: 'instant' });
    else window.scrollTo(0, 3200);
  });
  await new Promise(r => setTimeout(r, 2000));

  const desktopEl = await page.$('#why-popcorn');
  if (desktopEl) {
    const box = await desktopEl.boundingBox();
    console.log('Desktop #why-popcorn box:', box);
    await desktopEl.screenshot({
      path: path.join(OUT_DIR, 'phase3-why-popcorn-desktop-1440px.png')
    });
    console.log('Saved phase3-why-popcorn-desktop-1440px.png');
  } else {
    console.error('Could not find #why-popcorn on desktop');
  }
  await page.close();

  // 2. Mobile 390px
  const mobilePage = await browser.newPage();
  await mobilePage.evaluateOnNewDocument(() => {
    sessionStorage.setItem('11pm_preloader_v3', 'true');
  });
  await mobilePage.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  await mobilePage.evaluate(() => {
    const el = document.getElementById('why-popcorn');
    if (el) el.scrollIntoView({ behavior: 'instant' });
    else window.scrollTo(0, 3800);
  });
  await new Promise(r => setTimeout(r, 2000));

  const mobileEl = await mobilePage.$('#why-popcorn');
  if (mobileEl) {
    const box = await mobileEl.boundingBox();
    console.log('Mobile #why-popcorn box:', box);
    await mobileEl.screenshot({
      path: path.join(OUT_DIR, 'phase3-why-popcorn-mobile-390px.png')
    });
    console.log('Saved phase3-why-popcorn-mobile-390px.png');
  } else {
    console.error('Could not find #why-popcorn on mobile');
  }
  await mobilePage.close();

  await browser.close();
  console.log('Phase 3 captures completed successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
