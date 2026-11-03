const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const artifactDir = 'C:/Users/Kunal/.gemini/antigravity/brain/f6135f91-9724-4fc6-aacc-a247f08002a3';
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle0' });

  // Fill form
  await page.type('#name-input', 'Kunal Sharma');
  await page.type('#email-input', 'kunal@example.com');
  await page.type('#phone-input', '9876543210');
  await page.type('#message-input', 'Looking to order small batches of Peri Peri and Cheese popcorn for our Gurugram office pantry!');

  // Click WhatsApp button
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('Send on WhatsApp')) {
      // Stub window.open so no popup error in headless
      await page.evaluate(() => { window.open = () => null; });
      await btn.click();
      break;
    }
  }

  await new Promise(r => setTimeout(r, 600));

  // Screenshot form with post-send banner
  await page.screenshot({
    path: path.join(artifactDir, 'verified-contact-post-click-banner.png')
  });
  console.log('Saved verified-contact-post-click-banner.png');

  // Mobile full form
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 1200 });
  await mobilePage.goto('http://localhost:3000/contact', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  await mobilePage.screenshot({
    path: path.join(artifactDir, 'verified-contact-mobile-full.png')
  });
  console.log('Saved verified-contact-mobile-full.png');

  await browser.close();
})();
