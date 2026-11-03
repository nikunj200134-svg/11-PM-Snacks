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
  await page.evaluateOnNewDocument(() => {
    sessionStorage.setItem('11pm_preloader_v3', 'seen');
  });
  await page.setViewport({ width: 1440, height: 950 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // 1. Scroll to SienaParallax via scrollIntoView
  await page.evaluate(() => {
    const siena = document.querySelector('section.h-\\[200vh\\]');
    if (siena) siena.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({
    path: path.join(OUT_DIR, 'clean-siena-1440px.png')
  });
  console.log('Saved clean-siena-1440px.png');

  // 2. Scroll to CanvasCrowd via scrollIntoView
  await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    const crowd = sections.find(s => s.classList.contains('h-[300vh]'));
    if (crowd) crowd.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 1500));

  await page.screenshot({
    path: path.join(OUT_DIR, 'clean-crowd-1440px.png')
  });
  console.log('Saved clean-crowd-1440px.png');

  await browser.close();
}

main().catch(console.error);
