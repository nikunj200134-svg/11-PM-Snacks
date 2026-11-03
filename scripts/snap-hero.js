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
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  // Screenshot HoverHero
  const hero = await page.$('section');
  if (hero) {
    await hero.screenshot({ path: path.join(artifactDir, 'current-01-hero-desktop.png') });
    console.log('Saved current-01-hero-desktop.png');
  }

  // Switch to mobile viewport
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  const heroMobile = await page.$('section');
  if (heroMobile) {
    await heroMobile.screenshot({ path: path.join(artifactDir, 'current-01-hero-mobile.png') });
    console.log('Saved current-01-hero-mobile.png');
  }

  await browser.close();
}

main().catch(console.error);
