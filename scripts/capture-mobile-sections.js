const puppeteer = require('puppeteer-core');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Kunal\\.gemini\\antigravity\\brain\\f6135f91-9724-4fc6-aacc-a247f08002a3';

const mobileVps = [
  { name: '320x640', width: 320, height: 640 },
  { name: '360x740', width: 360, height: 740 },
  { name: '390x844', width: 390, height: 844 },
  { name: '430x932', width: 430, height: 932 },
  { name: '768x1024', width: 768, height: 1024 },
];

async function main() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  for (const vp of mobileVps) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height });

    // Set sessionStorage so preloader finishes instantly or let it finish
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      sessionStorage.setItem('11pm_preloader_v5', 'true');
    });
    await page.reload({ waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    // Capture Home
    await page.screenshot({ path: path.join(artifactDir, `phase1-home-hero-${vp.name}.png`) });

    // Scroll down to Flavour Switcher Section & capture
    await page.evaluate(() => {
      const el = document.getElementById('features') || document.getElementById('flavours');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(artifactDir, `phase1-home-switcher-${vp.name}.png`) });

    // Scroll down to Notify Me section & capture
    await page.evaluate(() => {
      const el = document.getElementById('notify');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(artifactDir, `phase1-home-notify-${vp.name}.png`) });

    // Scroll to Footer
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(artifactDir, `phase1-home-footer-${vp.name}.png`) });

    // Test Contact page
    await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(artifactDir, `phase1-contact-full-${vp.name}.png`) });

    await page.close();
  }

  await browser.close();
  console.log('Mobile screenshots captured successfully!');
}

main().catch(console.error);
