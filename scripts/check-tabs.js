const puppeteer = require('puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function checkTabs() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  const tabs = await page.evaluate(() => {
    const list = document.querySelector('[role="tablist"]');
    if (!list) return 'tablist not found';
    return Array.from(list.querySelectorAll('button')).map(b => ({
      text: b.textContent,
      className: b.className,
      color: window.getComputedStyle(b).color,
      bgColor: window.getComputedStyle(b).backgroundColor,
      width: b.offsetWidth,
      height: b.offsetHeight
    }));
  });
  console.log('Tabs info:', JSON.stringify(tabs, null, 2));
  await browser.close();
}

checkTabs().catch(console.error);
