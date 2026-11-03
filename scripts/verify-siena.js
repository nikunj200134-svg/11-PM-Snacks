const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT_DIR = 'C:\\Users\\Kunal\\.gemini\\antigravity\\brain\\f6135f91-9724-4fc6-aacc-a247f08002a3';

async function verifySiena() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  // Desktop 1440x900
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  // Find SienaParallax section offset
  const sienaInfo = await page.evaluate(() => {
    const s = document.querySelectorAll('section');
    // SienaParallax is the section right after hero (index 1 or with h-[200vh])
    const sec = Array.from(s).find(el => el.classList.contains('h-[200vh]'));
    if (!sec) return null;
    return { top: sec.offsetTop, height: sec.offsetHeight };
  });

  console.log('Siena section info:', sienaInfo);

  if (sienaInfo) {
    // Scroll to start of SienaParallax (when sticky enters)
    await page.evaluate((top) => {
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, top + 100);
    }, sienaInfo.top);
    await new Promise(r => setTimeout(r, 1000));

    await page.screenshot({
      path: path.join(OUT_DIR, 'siena-desktop-start-1440px.png')
    });
    console.log('Saved siena-desktop-start-1440px.png');

    // Scroll to mid-expansion
    await page.evaluate((top, height) => {
      window.scrollTo(0, top + height * 0.45);
    }, sienaInfo.top, sienaInfo.height);
    await new Promise(r => setTimeout(r, 1000));

    await page.screenshot({
      path: path.join(OUT_DIR, 'siena-desktop-mid-1440px.png')
    });
    console.log('Saved siena-desktop-mid-1440px.png');

    // Scroll to full bleed reveal
    await page.evaluate((top, height) => {
      window.scrollTo(0, top + height * 0.85);
    }, sienaInfo.top, sienaInfo.height);
    await new Promise(r => setTimeout(r, 1000));

    await page.screenshot({
      path: path.join(OUT_DIR, 'siena-desktop-reveal-1440px.png')
    });
    console.log('Saved siena-desktop-reveal-1440px.png');
  }

  // Mobile 390x844
  await page.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  const mobileSiena = await page.evaluate(() => {
    const s = document.querySelectorAll('section');
    const sec = Array.from(s).find(el => el.classList.contains('h-[200vh]'));
    if (!sec) return null;
    return { top: sec.offsetTop, height: sec.offsetHeight };
  });

  if (mobileSiena) {
    await page.evaluate((top) => {
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, top + 80);
    }, mobileSiena.top);
    await new Promise(r => setTimeout(r, 1000));

    await page.screenshot({
      path: path.join(OUT_DIR, 'siena-mobile-390px.png')
    });
    console.log('Saved siena-mobile-390px.png');
  }

  await browser.close();
}

verifySiena().catch(console.error);
