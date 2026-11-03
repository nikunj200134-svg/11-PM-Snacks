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

  // 1. Check Homepage
  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  // Screenshot Header
  const header = await page.$('header');
  if (header) {
    await header.screenshot({ path: path.join(artifactDir, 'current-09-header.png') });
    console.log('Saved current-09-header.png');
  }

  // Screenshot Crave Crunch (SienaParallax)
  const craveCrunch = await page.$('#crave-crunch, section[class*="bg-[#FDA5CC]"], section[class*="bg-[#fda5cc]"]');
  if (craveCrunch) {
    await craveCrunch.screenshot({ path: path.join(artifactDir, 'current-10-crave-crunch.png') });
    console.log('Saved current-10-crave-crunch.png');
  } else {
    // Try finding by text
    const sections = await page.$$('section');
    console.log(`Found ${sections.length} sections on home page`);
  }

  // Screenshot Features (AppleFeatureBlock)
  const features = await page.$('#features');
  if (features) {
    await features.screenshot({ path: path.join(artifactDir, 'current-02-04-06-features.png') });
    console.log('Saved current-02-04-06-features.png');
  }

  // Screenshot Why Popcorn section
  const whyPopcorn = await page.$('#why-popcorn, section[class*="bg-[#0A0A0A]"], section[class*="bg-[#0a0a0a]"]');
  if (whyPopcorn) {
    await whyPopcorn.screenshot({ path: path.join(artifactDir, 'current-03-why-popcorn.png') });
    console.log('Saved current-03-why-popcorn.png');
  }

  // Screenshot Crowd section
  const crowd = await page.$('canvas, #crowd, section[class*="bg-[#FFC21A]"], section[class*="bg-[#ffc21a]"]');
  if (crowd) {
    const parent = await crowd.evaluateHandle(el => el.closest('section') || el);
    await parent.asElement().screenshot({ path: path.join(artifactDir, 'current-05-crowd.png') });
    console.log('Saved current-05-crowd.png');
  }

  // 2. Check Contact Page
  console.log('Navigating to http://localhost:3000/contact ...');
  await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  const contactMain = await page.$('main');
  if (contactMain) {
    await contactMain.screenshot({ path: path.join(artifactDir, 'current-08-contact.png') });
    console.log('Saved current-08-contact.png');
  }

  await browser.close();
  console.log('All screenshots captured successfully.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
