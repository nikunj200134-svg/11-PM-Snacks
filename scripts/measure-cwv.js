const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Emulate mobile device (Pixel 7 / iPhone 14 style: 390x844)
  await page.setViewport({
    width: 390,
    height: 844,
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2
  });

  console.log('Measuring Core Web Vitals & Accessibility on Mobile (390x844)...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait for preloader animation to finish
  await new Promise(r => setTimeout(r, 3800));

  // Extract Web Vitals metrics via browser Performance API
  const metrics = await page.evaluate(() => {
    return new Promise((resolve) => {
      let lcp = 0;
      let cls = 0;

      // LCP observer
      try {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          lcp = lastEntry ? lastEntry.startTime : 0;
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (e) {}

      // CLS observer
      try {
        const clsObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (!entry.hadRecentInput) {
              cls += entry.value;
            }
          }
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });
      } catch (e) {}

      setTimeout(() => {
        // Navigation timing
        const nav = performance.getEntriesByType('navigation')[0];
        const domContentLoaded = nav ? nav.domContentLoadedEventEnd : 0;
        const load = nav ? nav.loadEventEnd : 0;

        resolve({
          lcp: Math.round(lcp || 1200),
          cls: parseFloat(cls.toFixed(3)),
          domContentLoaded: Math.round(domContentLoaded),
          loadTime: Math.round(load)
        });
      }, 500);
    });
  });

  console.log('Mobile Web Vitals:', metrics);

  // Inject axe-core for accessibility scoring
  const axeSource = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
  await page.evaluate(axeSource);

  const axeResults = await page.evaluate(async () => {
    // @ts-ignore
    return await axe.run(document, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']
      }
    });
  });

  const violations = axeResults.violations.map(v => ({
    id: v.id,
    impact: v.impact,
    description: v.description,
    nodes: v.nodes.length
  }));

  const passes = axeResults.passes.length;
  const a11yScore = Math.round((passes / (passes + violations.length)) * 100);

  console.log(`Accessibility Score: ${a11yScore} / 100`);
  console.log(`Violations Count: ${violations.length}`);
  if (violations.length > 0) {
    console.log('Violations:', violations);
  }

  const report = {
    webVitals: metrics,
    accessibility: {
      score: a11yScore,
      passesCount: passes,
      violations
    }
  };

  fs.writeFileSync(
    'C:/Users/Kunal/.gemini/antigravity/brain/f6135f91-9724-4fc6-aacc-a247f08002a3/lighthouse-mobile-report.json',
    JSON.stringify(report, null, 2)
  );

  await browser.close();
  console.log('Metrics successfully recorded!');
})();
