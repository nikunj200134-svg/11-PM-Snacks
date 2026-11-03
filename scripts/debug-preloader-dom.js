const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    defaultViewport: { width: 1440, height: 900 }
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:3000/?replay=true', { waitUntil: 'networkidle2' });

  const html = await page.evaluate(() => {
    const dialog = document.querySelector('div[role="dialog"]');
    return {
      hasDialog: !!dialog,
      dialogHtml: dialog ? dialog.outerHTML.slice(0, 500) : 'none',
      bodyText: document.body.innerText.slice(0, 300)
    };
  });

  console.log('DOM check:', html);
  await browser.close();
}

main().catch(console.error);
