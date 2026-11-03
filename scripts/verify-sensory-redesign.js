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

  // 1. Check Footer to verify credit line is gone
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await new Promise(r => setTimeout(r, 600));

  const footer = await page.$('footer');
  if (footer) {
    await footer.screenshot({ path: path.join(artifactDir, 'verified-footer-no-credits.png') });
    console.log('✓ Captured verified-footer-no-credits.png');
  }

  // 2. Scroll to #features
  await page.evaluate(() => {
    const el = document.getElementById('features');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 800));

  const features = await page.$('#features');
  if (features) {
    // 2a. Peri Peri sensory cards
    await features.screenshot({ path: path.join(artifactDir, 'verified-sensory-peri-peri.png') });
    console.log('✓ Captured verified-sensory-peri-peri.png');

    // 2b. Click Tangy Tomato tab
    const tomatoTab = await page.evaluateHandle(() => {
      const tabs = Array.from(document.querySelectorAll('#features [role="tab"]'));
      return tabs.find(t => t.textContent.includes('Tomato'));
    });
    if (tomatoTab && tomatoTab.asElement()) {
      await tomatoTab.asElement().click();
      await new Promise(r => setTimeout(r, 600));
      await features.screenshot({ path: path.join(artifactDir, 'verified-sensory-tangy-tomato.png') });
      console.log('✓ Captured verified-sensory-tangy-tomato.png');
    }

    // 2c. Click Cheddar Cheese tab
    const cheeseTab = await page.evaluateHandle(() => {
      const tabs = Array.from(document.querySelectorAll('#features [role="tab"]'));
      return tabs.find(t => t.textContent.includes('Cheese'));
    });
    if (cheeseTab && cheeseTab.asElement()) {
      await cheeseTab.asElement().click();
      await new Promise(r => setTimeout(r, 600));
      await features.screenshot({ path: path.join(artifactDir, 'verified-sensory-cheddar-cheese.png') });
      console.log('✓ Captured verified-sensory-cheddar-cheese.png');
    }
  }

  await browser.close();
  console.log('Verification script completed!');
}

main().catch(console.error);
