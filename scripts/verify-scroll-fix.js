const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });

  // Desktop Test (1440px)
  const pageDesk = await browser.newPage();
  await pageDesk.setViewport({ width: 1440, height: 900 });
  await pageDesk.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // Wait for preloader to finish
  await pageDesk.waitForSelector('header img[alt="11 PM Snacks"]', { visible: true });
  await pageDesk.screenshot({
    path: 'C:/Users/Kunal/.gemini/antigravity/brain/f6135f91-9724-4fc6-aacc-a247f08002a3/verified-fixed-header-desktop-top.png',
    clip: { x: 0, y: 0, width: 1440, height: 120 }
  });

  // Scroll down
  await pageDesk.evaluate(() => window.scrollTo(0, 600));
  await new Promise(r => setTimeout(r, 600));

  await pageDesk.screenshot({
    path: 'C:/Users/Kunal/.gemini/antigravity/brain/f6135f91-9724-4fc6-aacc-a247f08002a3/verified-fixed-header-desktop-scrolled.png',
    clip: { x: 0, y: 0, width: 1440, height: 120 }
  });
  await pageDesk.close();

  // Mobile Test (390px)
  const pageMob = await browser.newPage();
  await pageMob.setViewport({ width: 390, height: 844 });
  await pageMob.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  await pageMob.waitForSelector('header img[alt="11 PM Snacks"]', { visible: true });
  await pageMob.screenshot({
    path: 'C:/Users/Kunal/.gemini/antigravity/brain/f6135f91-9724-4fc6-aacc-a247f08002a3/verified-fixed-header-mobile-top.png',
    clip: { x: 0, y: 0, width: 390, height: 120 }
  });

  // Scroll down on mobile
  await pageMob.evaluate(() => window.scrollTo(0, 600));
  await new Promise(r => setTimeout(r, 600));

  await pageMob.screenshot({
    path: 'C:/Users/Kunal/.gemini/antigravity/brain/f6135f91-9724-4fc6-aacc-a247f08002a3/verified-fixed-header-mobile-scrolled.png',
    clip: { x: 0, y: 0, width: 390, height: 120 }
  });

  const mobScrolledDimensions = await pageMob.evaluate(() => {
    const img = document.querySelector('header img[alt="11 PM Snacks"]');
    const rect = img.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  });
  console.log('Mobile scrolled dimensions:', mobScrolledDimensions);

  await pageMob.close();
  await browser.close();
  console.log('Screenshots captured successfully!');
})();
