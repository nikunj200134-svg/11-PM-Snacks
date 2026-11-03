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

  // Scroll to #notify
  await page.evaluate(() => {
    const el = document.getElementById('notify');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 600));

  // 1. Snapshot initial state of notify section
  const notifySection = await page.$('#notify');
  if (notifySection) {
    await notifySection.screenshot({ path: path.join(artifactDir, 'verified-notify-initial-1440px.png') });
    console.log('✓ Captured verified-notify-initial-1440px.png');
  }

  // 2. Test empty submission validation
  const whatsappBtn = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('#notify button'));
    return buttons.find(b => b.textContent.includes('Send on WhatsApp'));
  });
  if (whatsappBtn && whatsappBtn.asElement()) {
    await whatsappBtn.asElement().click();
    await new Promise(r => setTimeout(r, 400));
    await notifySection.screenshot({ path: path.join(artifactDir, 'verified-notify-validation-error.png') });
    console.log('✓ Captured verified-notify-validation-error.png');
  }

  // 3. Fill in input and submit
  await page.type('#drop-contact-input', '8510801655');
  
  // Click Wholesale B2B
  const wholesaleRadio = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('#notify [role="radio"]'));
    return buttons.find(b => b.textContent.includes('Wholesale B2B'));
  });
  if (wholesaleRadio && wholesaleRadio.asElement()) {
    await wholesaleRadio.asElement().click();
  }

  // Prevent window.open from opening new tabs in puppeteer
  await page.evaluate(() => {
    window.open = () => null;
  });

  if (whatsappBtn && whatsappBtn.asElement()) {
    await whatsappBtn.asElement().click();
    await new Promise(r => setTimeout(r, 500));
    await notifySection.screenshot({ path: path.join(artifactDir, 'verified-notify-post-submit-banner.png') });
    console.log('✓ Captured verified-notify-post-submit-banner.png');
  }

  // 4. Mobile Viewport Test (390x844)
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const el = document.getElementById('notify');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 600));
  const notifyMobile = await page.$('#notify');
  if (notifyMobile) {
    await notifyMobile.screenshot({ path: path.join(artifactDir, 'verified-notify-mobile-390px.png') });
    console.log('✓ Captured verified-notify-mobile-390px.png');
  }

  await browser.close();
  console.log('All Notify tests completed successfully!');
}

main().catch(console.error);
