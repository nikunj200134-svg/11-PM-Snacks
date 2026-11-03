const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/Kunal/.gemini/antigravity/brain/f6135f91-9724-4fc6-aacc-a247f08002a3/baselines';
if (!fs.existsSync(ARTIFACT_DIR)) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
}

const routes = [
  { name: 'home', path: '/' },
  { name: 'flavours', path: '/flavours' },
  { name: 'peri-peri', path: '/flavours/peri-peri' },
  { name: 'tangy-tomato', path: '/flavours/tangy-tomato' },
  { name: 'cheese', path: '/flavours/cheddar-cheese' },
  { name: 'nutrition', path: '/nutrition' },
  { name: 'our-story', path: '/our-story' },
  { name: 'where-to-buy', path: '/where-to-buy' },
  { name: 'faq', path: '/faq' },
  { name: 'contact', path: '/contact' }
];

const desktopViewports = [
  { width: 1280, height: 800, label: '1280' },
  { width: 1920, height: 1080, label: '1920' }
];

const mobileViewports = [
  { width: 360, height: 740, label: '360' },
  { width: 390, height: 844, label: '390' },
  { width: 768, height: 1024, label: '768' }
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Helper to dismiss preloader or wait
  async function preparePage(url, vp) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3000' + url, { waitUntil: 'networkidle0', timeout: 30000 });
    // If on home, dismiss preloader by waiting
    if (url === '/') {
      await new Promise(r => setTimeout(r, 3600));
    } else {
      await new Promise(r => setTimeout(r, 600));
    }
  }

  console.log('Capturing Desktop Baselines (1280, 1920)...');
  for (const r of routes) {
    for (const vp of desktopViewports) {
      await preparePage(r.path, vp);
      const filename = path.join(ARTIFACT_DIR, `baseline-desk-${r.name}-${vp.label}.png`);
      await page.screenshot({ path: filename, fullPage: false });
      console.log(`  Saved ${r.name} @ ${vp.label}`);
    }
  }

  console.log('Capturing Mobile Baselines (360, 390, 768)...');
  for (const r of routes) {
    for (const vp of mobileViewports) {
      await preparePage(r.path, vp);
      const filename = path.join(ARTIFACT_DIR, `baseline-mob-${r.name}-${vp.label}.png`);
      await page.screenshot({ path: filename, fullPage: false });
      console.log(`  Saved ${r.name} @ ${vp.label}`);
    }
  }

  await browser.close();
  console.log('All baseline screenshots captured!');
})();
