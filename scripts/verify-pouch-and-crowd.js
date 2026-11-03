const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT_DIR = 'C:\\Users\\Kunal\\.gemini\\antigravity\\brain\\f6135f91-9724-4fc6-aacc-a247f08002a3';

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  // 1. Desktop 1440x900 - Hero
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500)); // wait for animations to settle

  await page.screenshot({
    path: path.join(OUT_DIR, 'hero-square-aligned-1440px.png'),
    clip: { x: 0, y: 0, width: 1440, height: 850 }
  });
  console.log('Saved hero-square-aligned-1440px.png');

  // 2. Mobile 390x844 - Hero
  await page.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  await page.screenshot({
    path: path.join(OUT_DIR, 'hero-square-aligned-390px.png'),
    clip: { x: 0, y: 0, width: 390, height: 750 }
  });
  console.log('Saved hero-square-aligned-390px.png');

  // 3. Scroll to Story Section and capture Beat 4 and Beat 5
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Scroll down to the story section
  await page.evaluate(() => {
    window.scrollTo(0, 1600);
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(OUT_DIR, 'story-beat-1440px.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('Saved story-beat-1440px.png');

  await browser.close();
  console.log('Verification captures complete!');
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
