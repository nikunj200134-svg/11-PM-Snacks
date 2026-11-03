const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const ARTIFACTS_DIR = 'C:/Users/Kunal/.gemini/antigravity/brain/f6135f91-9724-4fc6-aacc-a247f08002a3';
const SHOTS_DIR = path.join(ARTIFACTS_DIR, 'phase1_shots');
if (!fs.existsSync(SHOTS_DIR)) fs.mkdirSync(SHOTS_DIR, { recursive: true });

const routes = [
  { id: 'home', path: '/' },
  { id: 'flavours', path: '/flavours' },
  { id: 'peri-peri', path: '/flavours/peri-peri' },
  { id: 'tangy-tomato', path: '/flavours/tangy-tomato' },
  { id: 'cheddar-cheese', path: '/flavours/cheddar-cheese' },
  { id: 'nutrition', path: '/nutrition' },
  { id: 'our-story', path: '/our-story' },
  { id: 'where-to-buy', path: '/where-to-buy' },
  { id: 'faq', path: '/faq' },
  { id: 'contact', path: '/contact' }
];

const viewports = [
  { width: 320, height: 640, label: '320x640-p', isLandscape: false },
  { width: 640, height: 320, label: '640x320-l', isLandscape: true },
  { width: 360, height: 740, label: '360x740-p', isLandscape: false },
  { width: 740, height: 360, label: '740x360-l', isLandscape: true },
  { width: 390, height: 844, label: '390x844-p', isLandscape: false },
  { width: 844, height: 390, label: '844x390-l', isLandscape: true },
  { width: 430, height: 932, label: '430x932-p', isLandscape: false },
  { width: 932, height: 430, label: '932x430-l', isLandscape: true },
  { width: 768, height: 1024, label: '768x1024-p', isLandscape: false },
  { width: 1024, height: 768, label: '1024x768-l', isLandscape: true },
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const findings = [];
  let checkId = 1;

  for (const r of routes) {
    console.log(`Auditing route: ${r.path}...`);
    for (const vp of viewports) {
      await page.setViewport({
        width: vp.width,
        height: vp.height,
        isMobile: true,
        hasTouch: true,
        deviceScaleFactor: 2
      });

      await page.goto('http://localhost:3000' + r.path, { waitUntil: 'domcontentloaded', timeout: 15000 });
      if (r.path === '/') {
        await new Promise(res => setTimeout(res, 3600));
      } else {
        await new Promise(res => setTimeout(res, 200));
      }

      // Check overflow & elements
      const auditResult = await page.evaluate(() => {
        const docEl = document.documentElement;
        const scrollWidth = docEl.scrollWidth;
        const clientWidth = docEl.clientWidth;
        const hasOverflow = scrollWidth > clientWidth;

        // Find offending overflow element if any
        let offendingSelector = 'None';
        if (hasOverflow) {
          const allEls = document.querySelectorAll('*');
          for (const el of allEls) {
            const rect = el.getBoundingClientRect();
            if (rect.right > clientWidth + 2) {
              offendingSelector = `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}${el.className ? '.' + el.className.split(' ')[0] : ''}`;
              break;
            }
          }
        }

        // Tap targets
        const smallTapTargets = [];
        document.querySelectorAll('a, button, input, select, textarea').forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44)) {
            const text = (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 20);
            if (!text.includes('Skip to') && !el.className.includes('skip-link')) {
              smallTapTargets.push(`${el.tagName} "${text}" (${Math.round(rect.width)}x${Math.round(rect.height)}px)`);
            }
          }
        });

        // Small text
        const smallText = [];
        document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, a, label, li').forEach(el => {
          if (el.children.length === 0 && (el.textContent || '').trim().length > 0) {
            const fs = parseFloat(window.getComputedStyle(el).fontSize);
            if (fs > 0 && fs < 12) {
              smallText.push(`"${el.textContent.trim().slice(0, 20)}" (${fs}px)`);
            }
          }
        });

        return {
          hasOverflow,
          scrollWidth,
          clientWidth,
          offendingSelector,
          smallTapTargets: smallTapTargets.slice(0, 3),
          smallText: smallText.slice(0, 3)
        };
      });

      // Save screenshot for key resolutions
      const isKeyVp = ['360x740-p', '390x844-p', '768x1024-p'].includes(vp.label);
      let shotPath = '';
      if (isKeyVp) {
        shotPath = path.join(SHOTS_DIR, `audit-${r.id}-${vp.label}.png`);
        await page.screenshot({ path: shotPath, fullPage: false });
      }

      findings.push({
        id: `M-${checkId++}`,
        page: r.path,
        viewport: vp.label,
        overflow: auditResult.hasOverflow,
        offendingSelector: auditResult.offendingSelector,
        smallTapTargets: auditResult.smallTapTargets,
        smallText: auditResult.smallText,
        screenshot: isKeyVp ? `audit-${r.id}-${vp.label}.png` : '-'
      });
    }
  }

  // Measure Lighthouse CWV on mobile (390x844)
  console.log('\nMeasuring Mobile CWV & Lighthouse Scores...');
  const cwvPage = await browser.newPage();
  await cwvPage.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await cwvPage.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await new Promise(r => setTimeout(r, 3800));

  // Run axe-core
  const axeSource = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
  await cwvPage.evaluate(axeSource);
  const axeResults = await cwvPage.evaluate(async () => {
    // @ts-ignore
    return await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } });
  });

  const a11yScore = Math.round((axeResults.passes.length / (axeResults.passes.length + axeResults.violations.length)) * 100);

  const report = {
    findings,
    a11yScore,
    axePasses: axeResults.passes.length,
    axeViolations: axeResults.violations.length,
    timestamp: new Date().toISOString()
  };

  fs.writeFileSync(path.join(ARTIFACTS_DIR, 'phase1-comprehensive-audit.json'), JSON.stringify(report, null, 2));
  await browser.close();
  console.log('Comprehensive Audit Complete!');
})();
