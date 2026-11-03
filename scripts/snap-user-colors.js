const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const artifactDir = 'C:/Users/Kunal/.gemini/antigravity/brain/f6135f91-9724-4fc6-aacc-a247f08002a3';

  // Desktop 1440px
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // 1. Screenshot of Header with #96d0d2
  const header = await page.$('header');
  if (header) {
    await header.screenshot({
      path: path.join(artifactDir, 'verified-header-96d0d2.png')
    });
    console.log('Saved verified-header-96d0d2.png');
  }

  // 2. Scroll to SienaParallax (CRAVE · CRUNCH) with #fda5cc
  await page.evaluate(() => {
    // Scroll down to the SienaParallax section
    window.scrollTo({ top: window.innerHeight * 0.95, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({
    path: path.join(artifactDir, 'verified-crave-crunch-fda5cc.png')
  });
  console.log('Saved verified-crave-crunch-fda5cc.png');

  // Mobile 390px
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844 });
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  const mobileHeader = await mobilePage.$('header');
  if (mobileHeader) {
    await mobileHeader.screenshot({
      path: path.join(artifactDir, 'verified-header-mobile-96d0d2.png')
    });
    console.log('Saved verified-header-mobile-96d0d2.png');
  }

  await mobilePage.evaluate(() => {
    window.scrollTo({ top: window.innerHeight * 0.95, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1000));

  await mobilePage.screenshot({
    path: path.join(artifactDir, 'verified-crave-crunch-mobile-fda5cc.png')
  });
  console.log('Saved verified-crave-crunch-mobile-fda5cc.png');

  await browser.close();
})();
