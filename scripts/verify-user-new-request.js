const puppeteer = require('puppeteer-core');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Kunal\\.gemini\\antigravity\\brain\\f6135f91-9724-4fc6-aacc-a247f08002a3';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // 1. Desktop 1440px - Header with #D8A2A2 & New Sized Logo
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    sessionStorage.setItem('11pm_preloader_v5', 'true');
  });
  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  // Screenshot desktop header
  const header = await page.$('header');
  if (header) {
    await header.screenshot({ path: path.join(artifactDir, 'verified-header-d8a2a2-desktop.png') });
    console.log('✓ Captured verified-header-d8a2a2-desktop.png');

    // Hover over Notify Me button on desktop to see white hover reflection
    const notifyBtn = await page.$('header a[href="/where-to-buy"]');
    if (notifyBtn) {
      await notifyBtn.hover();
      await new Promise(r => setTimeout(r, 200));
      await header.screenshot({ path: path.join(artifactDir, 'verified-header-notify-hover-white.png') });
      console.log('✓ Captured verified-header-notify-hover-white.png');
    }
  }

  // 2. Mobile 390x844 - Header with #D8A2A2, new Logo, and Hamburger Button
  await page.setViewport({ width: 390, height: 844 });
  await new Promise(r => setTimeout(r, 400));
  if (header) {
    await header.screenshot({ path: path.join(artifactDir, 'verified-header-d8a2a2-mobile.png') });
    console.log('✓ Captured verified-header-d8a2a2-mobile.png');

    // Move mouse over hamburger button
    const burger = await page.$('button[aria-label="Open Mobile Menu"]');
    if (burger) {
      const box = await burger.boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await new Promise(r => setTimeout(r, 200));
        await header.screenshot({ path: path.join(artifactDir, 'verified-header-hamburger-hover-white.png') });
        console.log('✓ Captured verified-header-hamburger-hover-white.png');
      }
    }
  }

  // 3. Test CanvasCrowd scrolling & background transitions (Beat 1 to 5)
  // Snap Beat 1 (Warm Cream)
  await page.evaluate(() => {
    const el = document.querySelector('section.relative.h-\\[300vh\\]');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(artifactDir, 'verified-story-beat1-mobile.png') });
  console.log('✓ Captured verified-story-beat1-mobile.png');

  // Jump to Beat 4 ("We’ll do the worrying...") which user highlighted in Image 2
  const stepBtns = await page.$$('button[aria-label^="Jump to story chapter"]');
  console.log('Found step buttons:', stepBtns.length);
  if (stepBtns.length >= 5) {
    // Click chapter 4 (index 3) - Kitchen Mint
    await stepBtns[3].click();
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(artifactDir, 'verified-story-beat4-worrying-mobile.png') });
    console.log('✓ Captured verified-story-beat4-worrying-mobile.png');

    // Click chapter 2 (index 1) - Dusty Rose
    await stepBtns[1].click();
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(artifactDir, 'verified-story-beat2-dustyrose-mobile.png') });
    console.log('✓ Captured verified-story-beat2-dustyrose-mobile.png');

    // Click chapter 5 (index 4) - Strawberry Popcorn Rose
    await stepBtns[4].click();
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(artifactDir, 'verified-story-beat5-rose-mobile.png') });
    console.log('✓ Captured verified-story-beat5-rose-mobile.png');
  }

  // Also test desktop 1440px for Beat 4
  await page.setViewport({ width: 1440, height: 900 });
  await new Promise(r => setTimeout(r, 600));
  const desktopStepBtns = await page.$$('button[aria-label^="Jump to story chapter"]');
  if (desktopStepBtns.length >= 4) {
    await desktopStepBtns[3].click();
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(artifactDir, 'verified-story-beat4-worrying-desktop.png') });
    console.log('✓ Captured verified-story-beat4-worrying-desktop.png');
  }

  await browser.close();
  console.log('All verification screenshots captured successfully!');
}

main().catch(console.error);
