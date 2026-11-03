const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT_DIR = 'C:\\Users\\Kunal\\.gemini\\antigravity\\brain\\f6135f91-9724-4fc6-aacc-a247f08002a3';

async function checkCrowd() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  // Find CanvasCrowd section position
  const rect = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    // Section with 300vh height
    const crowdSec = sections.find(s => s.classList.contains('h-[300vh]'));
    if (!crowdSec) return null;
    const box = crowdSec.getBoundingClientRect();
    return { top: box.top + window.scrollY, height: crowdSec.offsetHeight };
  });

  console.log('Crowd section position:', rect);

  if (rect) {
    // Scroll to beat 3 (around top + 0.5 * height)
    await page.evaluate((top, height) => {
      window.scrollTo(0, top + height * 0.5);
    }, rect.top, rect.height);
    await new Promise(r => setTimeout(r, 800));

    await page.screenshot({
      path: path.join(OUT_DIR, 'crowd-beat-3-desktop.png')
    });
    console.log('Saved crowd-beat-3-desktop.png');

    // Scroll to beat 4 / 5 (around top + 0.85 * height)
    await page.evaluate((top, height) => {
      window.scrollTo(0, top + height * 0.85);
    }, rect.top, rect.height);
    await new Promise(r => setTimeout(r, 800));

    await page.screenshot({
      path: path.join(OUT_DIR, 'crowd-beat-5-desktop.png')
    });
    console.log('Saved crowd-beat-5-desktop.png');
  }

  // Also check mobile 390px
  await page.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  const mobileRect = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    const crowdSec = sections.find(s => s.classList.contains('h-[300vh]'));
    if (!crowdSec) return null;
    const box = crowdSec.getBoundingClientRect();
    return { top: box.top + window.scrollY, height: crowdSec.offsetHeight };
  });

  if (mobileRect) {
    await page.evaluate((top, height) => {
      window.scrollTo(0, top + height * 0.8);
    }, mobileRect.top, mobileRect.height);
    await new Promise(r => setTimeout(r, 800));

    await page.screenshot({
      path: path.join(OUT_DIR, 'crowd-mobile-390px.png')
    });
    console.log('Saved crowd-mobile-390px.png');
  }

  await browser.close();
}

checkCrowd().catch(console.error);
