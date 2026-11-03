const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  const beforeScroll = await page.evaluate(() => {
    const img = document.querySelector('header img[alt="11 PM Snacks"]');
    if (!img) return null;
    const rect = img.getBoundingClientRect();
    const style = window.getComputedStyle(img);
    return { width: rect.width, height: rect.height, className: img.className, styleHeight: style.height, styleMaxHeight: style.maxHeight };
  });
  console.log('Before scroll:', beforeScroll);

  await page.evaluate(() => window.scrollTo(0, 500));
  await new Promise(r => setTimeout(r, 600));

  const afterScroll = await page.evaluate(() => {
    const img = document.querySelector('header img[alt="11 PM Snacks"]');
    if (!img) return null;
    const rect = img.getBoundingClientRect();
    const style = window.getComputedStyle(img);
    return { width: rect.width, height: rect.height, className: img.className, styleHeight: style.height, styleMaxHeight: style.maxHeight };
  });
  console.log('After scroll:', afterScroll);

  await browser.close();
})();
