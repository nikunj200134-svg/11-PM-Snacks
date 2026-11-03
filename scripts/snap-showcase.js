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
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // Smoothly scroll down the page to trigger all IntersectionObservers, whileInView animations, and lazy images
  await page.evaluate(async () => {
    const distance = 400;
    const totalHeight = document.body.scrollHeight;
    let scrolled = 0;
    while (scrolled < totalHeight) {
      window.scrollBy(0, distance);
      scrolled += distance;
      await new Promise(r => setTimeout(r, 100));
    }
    // Scroll back to top
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 500));
  });

  // Give all images and Framer Motion elements 1 second to settle
  await new Promise(r => setTimeout(r, 1500));

  // 1. Capture Header
  const header = await page.$('header');
  if (header) {
    await header.screenshot({ path: path.join(artifactDir, 'showcase-09-header.png') });
    console.log('✓ Captured showcase-09-header.png');
  }

  // 2. Capture Hero
  const hero = await page.$('section');
  if (hero) {
    await hero.screenshot({ path: path.join(artifactDir, 'showcase-01-hero.png') });
    console.log('✓ Captured showcase-01-hero.png');
  }

  // 3. Scroll to Crave Crunch & capture
  await page.evaluate(() => {
    const el = document.getElementById('crave-crunch') || document.querySelector('section[class*="bg-[#FDA5CC]"]');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 800));
  const craveCrunch = await page.$('#crave-crunch') || await page.$('section[class*="bg-[#FDA5CC]"]');
  if (craveCrunch) {
    await craveCrunch.screenshot({ path: path.join(artifactDir, 'showcase-10-crave-crunch.png') });
    console.log('✓ Captured showcase-10-crave-crunch.png');
  }

  // 4. Scroll to Features (AppleFeatureBlock) & capture
  await page.evaluate(() => {
    const el = document.getElementById('features');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 800));
  const features = await page.$('#features');
  if (features) {
    await features.screenshot({ path: path.join(artifactDir, 'showcase-02-04-06-features.png') });
    console.log('✓ Captured showcase-02-04-06-features.png');
  }

  // 5. Scroll to Why Popcorn & capture
  await page.evaluate(() => {
    const el = document.getElementById('why-popcorn');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 800));
  const whyPopcorn = await page.$('#why-popcorn');
  if (whyPopcorn) {
    await whyPopcorn.screenshot({ path: path.join(artifactDir, 'showcase-03-why-popcorn.png') });
    console.log('✓ Captured showcase-03-why-popcorn.png');
  }

  // 6. Scroll to Crowd & capture
  await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 1200));
  const canvas = await page.$('canvas');
  if (canvas) {
    const crowdSection = await canvas.evaluateHandle(el => el.closest('section') || el);
    await crowdSection.asElement().screenshot({ path: path.join(artifactDir, 'showcase-05-crowd.png') });
    console.log('✓ Captured showcase-05-crowd.png');
  }

  // 7. Contact Page
  await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  const contactMain = await page.$('main');
  if (contactMain) {
    await contactMain.screenshot({ path: path.join(artifactDir, 'showcase-08-contact.png') });
    console.log('✓ Captured showcase-08-contact.png');
  }

  await browser.close();
  console.log('All showcase screenshots captured successfully!');
}

main().catch(console.error);
