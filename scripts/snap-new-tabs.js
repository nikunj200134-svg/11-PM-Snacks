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
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  await page.evaluate(() => {
    const el = document.getElementById('features');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 1000));

  // Find the switcher container
  const tablist = await page.$('[role="tablist"]');
  if (tablist) {
    // 1. Peri Peri (default selected)
    await tablist.screenshot({
      path: path.join(artifactDir, 'v2-tabs-peri-peri-1440px.png')
    });
    console.log('Saved v2-tabs-peri-peri-1440px.png');

    // 2. Tangy Tomato
    const tabs = await page.$$('[role="tab"]');
    if (tabs[1]) {
      await tabs[1].click();
      await new Promise(r => setTimeout(r, 500));
      await tablist.screenshot({
        path: path.join(artifactDir, 'v2-tabs-tangy-tomato-1440px.png')
      });
      console.log('Saved v2-tabs-tangy-tomato-1440px.png');
    }

    // 3. Cheddar Cheese
    if (tabs[2]) {
      await tabs[2].click();
      await new Promise(r => setTimeout(r, 500));
      await tablist.screenshot({
        path: path.join(artifactDir, 'v2-tabs-cheddar-cheese-1440px.png')
      });
      console.log('Saved v2-tabs-cheddar-cheese-1440px.png');
    }
  }

  // Full section screenshot
  await page.screenshot({
    path: path.join(artifactDir, 'v2-full-section-1440px.png')
  });
  console.log('Saved v2-full-section-1440px.png');

  // Mobile 390px
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844 });
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await mobilePage.evaluate(() => {
    const el = document.getElementById('features');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 1000));

  const mobileTablist = await mobilePage.$('[role="tablist"]');
  if (mobileTablist) {
    await mobileTablist.screenshot({
      path: path.join(artifactDir, 'v2-mobile-tabs-390px.png')
    });
    console.log('Saved v2-mobile-tabs-390px.png');
  }

  // Mobile full section top
  await mobilePage.screenshot({
    path: path.join(artifactDir, 'v2-mobile-section-390px.png')
  });
  console.log('Saved v2-mobile-section-390px.png');

  await browser.close();
})();
