const puppeteer = require('puppeteer-core');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Kunal\\.gemini\\antigravity\\brain\\f6135f91-9724-4fc6-aacc-a247f08002a3';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    defaultViewport: { width: 1440, height: 900 }
  });

  const page = await browser.newPage();
  console.log('Navigating to http://localhost:3000/?replay=true ...');
  await page.goto('http://localhost:3000/?replay=true', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 400));

  // Move mouse across the screen to create the image trail
  console.log('Simulating mouse movement to trigger ImageCursorTrail...');
  const points = [
    { x: 300, y: 300 },
    { x: 360, y: 320 },
    { x: 440, y: 360 },
    { x: 540, y: 400 },
    { x: 660, y: 420 },
    { x: 800, y: 380 },
    { x: 920, y: 340 },
    { x: 1040, y: 320 },
    { x: 1120, y: 380 },
    { x: 1000, y: 480 },
    { x: 860, y: 520 },
    { x: 700, y: 500 },
  ];

  for (const pt of points) {
    await page.mouse.move(pt.x, pt.y);
    await new Promise(r => setTimeout(r, 60));
  }

  // Take screenshot of preloader with the image cursor trail active!
  await page.screenshot({ path: path.join(artifactDir, 'verified-skiper18-cursor-trail.png') });
  console.log('✓ Captured verified-skiper18-cursor-trail.png');

  // Wait for preloader to finish
  console.log('Waiting for preloader exit wipe...');
  await page.waitForFunction(() => !document.querySelector('div[role="dialog"]'), { timeout: 7000 });
  await new Promise(r => setTimeout(r, 800));

  // Screenshot home page after loading
  await page.screenshot({ path: path.join(artifactDir, 'verified-home-after-trail.png') });
  console.log('✓ Captured verified-home-after-trail.png');

  await browser.close();
  console.log('Testing completed successfully!');
}

main().catch(console.error);
