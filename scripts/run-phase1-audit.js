const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const routes = [
    '/',
    '/flavours',
    '/flavours/peri-peri',
    '/flavours/tangy-tomato',
    '/flavours/cheddar-cheese',
    '/nutrition',
    '/our-story',
    '/contact',
    '/where-to-buy',
    '/faq',
    '/privacy',
    '/terms',
    '/shipping-returns',
    '/404-test'
  ];

  const viewports = [
    { name: '360x740', width: 360, height: 740 },
    { name: '390x844', width: 390, height: 844 },
    { name: '768x1024', width: 768, height: 1024 },
    { name: '1280x800', width: 1280, height: 800 },
    { name: '1920x1080', width: 1920, height: 1080 }
  ];

  const results = [];

  for (const r of routes) {
    const page = await browser.newPage();
    const errors = [];
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
    page.on('pageerror', err => errors.push(err.message));

    for (const vp of viewports) {
      await page.setViewport({ width: vp.width, height: vp.height });
      const res = await page.goto('http://localhost:3000' + r, { waitUntil: 'networkidle0' });
      const status = res ? res.status() : 0;

      // Check overflow
      const overflow = await page.evaluate(() => {
        const root = document.documentElement;
        return {
          scrollWidth: root.scrollWidth,
          innerWidth: window.innerWidth,
          hasOverflow: root.scrollWidth > window.innerWidth
        };
      });

      // Check missing alt
      const missingAltCount = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('img')).filter(img => !img.hasAttribute('alt') || img.getAttribute('alt') === '').length;
      });

      if (overflow.hasOverflow || errors.length > 0 || missingAltCount > 0) {
        results.push({
          route: r,
          viewport: vp.name,
          status,
          overflow,
          errors: errors.slice(0, 3),
          missingAltCount
        });
      }
    }
    await page.close();
  }

  console.log('AUDIT COMPLETED. Results count:', results.length);
  console.log(JSON.stringify(results, null, 2));

  await browser.close();
})();
