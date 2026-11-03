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
  await page.setViewport({ width: 1440, height: 1200 });
  await page.goto('http://localhost:3000/nutrition', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  const el = await page.evaluate(() => {
    const cards = document.querySelectorAll('div.aspect-square');
    if (!cards.length) return null;
    const parent = cards[0].parentElement;
    parent.scrollIntoView({ behavior: 'instant', block: 'center' });
    const rect = parent.getBoundingClientRect();
    return { top: window.scrollY + rect.top, height: rect.height, width: rect.width };
  });

  if (el) {
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({
      path: path.join(OUT_DIR, 'nutrition-6cards-desktop.png'),
      clip: { x: 80, y: Math.max(0, el.top - 120), width: 1280, height: el.height + 200 }
    });
    console.log('Saved nutrition-6cards-desktop.png');
  }

  // Also CanvasCrowd check on homepage
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  // scroll to crowd section
  const crowdTop = await page.evaluate(() => {
    const s = Array.from(document.querySelectorAll('section')).find(el => el.classList.contains('h-[300vh]'));
    if (!s) return null;
    return s.offsetTop;
  });

  if (crowdTop) {
    await page.evaluate((top) => {
      window.scrollTo(0, top + 150);
    }, crowdTop);
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(OUT_DIR, 'canvas-crowd-clean-desktop.png'),
      clip: { x: 0, y: 0, width: 1440, height: 950 }
    });
    console.log('Saved canvas-crowd-clean-desktop.png');
  }

  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
