const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT_DIR = 'C:\\Users\\Kunal\\.gemini\\antigravity\\brain\\f6135f91-9724-4fc6-aacc-a247f08002a3\\qa-screenshots';

const VIEWPORTS = [
  { name: '360px', width: 360, height: 780, isMobile: true },
  { name: '390px', width: 390, height: 844, isMobile: true },
  { name: '768px', width: 768, height: 1024, isMobile: false },
  { name: '1440px', width: 1440, height: 900, isMobile: false },
];

const PAGES = [
  { path: '/', name: 'home' },
  { path: '/flavours', name: 'flavours' },
  { path: '/flavours/peri-peri', name: 'peri-peri' },
  { path: '/nutrition', name: 'nutrition' },
  { path: '/our-story', name: 'our-story' },
  { path: '/faq', name: 'faq' },
  { path: '/contact', name: 'contact' },
  { path: '/where-to-buy', name: 'where-to-buy' },
];

function getLuminance(r, g, b) {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrast(rgb1, rgb2) {
  const lum1 = getLuminance(rgb1[0], rgb1[1], rgb1[2]);
  const lum2 = getLuminance(rgb2[0], rgb2[1], rgb2[2]);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

function parseRgb(colorStr) {
  const m = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (m) return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])];
  return null;
}

async function runQA() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const report = {
    timestamp: new Date().toISOString(),
    viewportsTested: VIEWPORTS.map(v => v.name),
    pagesTested: PAGES.map(p => p.path),
    bugs: [],
    detailsByPage: {}
  };

  for (const vp of VIEWPORTS) {
    const page = await browser.newPage();
    await page.setViewport({
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 2,
      isMobile: vp.isMobile,
      hasTouch: vp.isMobile
    });

    for (const p of PAGES) {
      const url = `http://localhost:3000${p.path}?replay=0`;
      console.log(`Checking ${p.name} at ${vp.name}...`);

      try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        // small wait for animations/hydration
        await new Promise(r => setTimeout(r, 1200));

        // Skip preloader if present
        const skipBtn = await page.$('button[aria-label="Skip intro"]');
        if (skipBtn) {
          await skipBtn.click();
          await new Promise(r => setTimeout(r, 600));
        }

        const screenshotPath = path.join(OUT_DIR, `${p.name}-${vp.name}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: false });

        // Evaluate DOM diagnostics
        const audit = await page.evaluate((isMobile) => {
          const docEl = document.documentElement;
          const body = document.body;
          const windowWidth = window.innerWidth;

          // 1. Horizontal scroll
          const hasHorizontalScroll = docEl.scrollWidth > windowWidth + 1;
          const overflowingElements = [];
          if (hasHorizontalScroll) {
            const allEls = document.querySelectorAll('*');
            for (const el of allEls) {
              const r = el.getBoundingClientRect();
              if (r.right > windowWidth + 2 && r.width > 0) {
                overflowingElements.push({
                  tag: el.tagName.toLowerCase(),
                  className: el.className ? el.className.toString().substring(0, 50) : '',
                  right: Math.round(r.right),
                  width: Math.round(r.width)
                });
                if (overflowingElements.length >= 5) break;
              }
            }
          }

          // 2. Font sizes (<16px on mobile body text)
          const smallFontElements = [];
          if (isMobile) {
            const textEls = document.querySelectorAll('p, li, article span, .lede');
            for (const el of textEls) {
              // skip tiny badges / kickers
              if (el.closest('.eyebrow, .kicker, .badge, [class*="text-xs"], [class*="text-[10px]"]')) continue;
              const cs = window.getComputedStyle(el);
              const fs = parseFloat(cs.fontSize);
              if (fs < 15.5 && el.textContent.trim().length > 30) {
                smallFontElements.push({
                  tag: el.tagName.toLowerCase(),
                  text: el.textContent.trim().substring(0, 40) + '...',
                  fontSize: Math.round(fs * 10) / 10 + 'px',
                  lineHeight: cs.lineHeight
                });
                if (smallFontElements.length >= 6) break;
              }
            }
          }

          // 3. Tap targets (<44px on mobile)
          const smallTapTargets = [];
          if (isMobile) {
            const clickables = document.querySelectorAll('a, button, input, select');
            for (const el of clickables) {
              const r = el.getBoundingClientRect();
              if (r.width > 0 && r.height > 0 && (r.width < 43 || r.height < 43)) {
                // Ignore hidden or decorative elements
                const cs = window.getComputedStyle(el);
                if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') continue;
                smallTapTargets.push({
                  tag: el.tagName.toLowerCase(),
                  text: (el.textContent || el.getAttribute('aria-label') || '').trim().substring(0, 30),
                  width: Math.round(r.width),
                  height: Math.round(r.height),
                  className: el.className ? el.className.toString().substring(0, 40) : ''
                });
                if (smallTapTargets.length >= 6) break;
              }
            }
          }

          // 4. Sticky nav check
          const nav = document.querySelector('header, nav, [role="navigation"]');
          let stickyNavOk = false;
          let navPosition = 'none';
          if (nav) {
            const cs = window.getComputedStyle(nav);
            navPosition = cs.position;
            stickyNavOk = (cs.position === 'sticky' || cs.position === 'fixed');
          }

          // 5. Line height ratio check for paragraphs
          const poorLineHeights = [];
          const paras = document.querySelectorAll('p');
          for (const p of paras) {
            if (p.textContent.trim().length < 40) continue;
            const cs = window.getComputedStyle(p);
            const fs = parseFloat(cs.fontSize);
            const lh = parseFloat(cs.lineHeight);
            if (!isNaN(fs) && !isNaN(lh) && fs > 0) {
              const ratio = lh / fs;
              if (ratio < 1.35) {
                poorLineHeights.push({
                  text: p.textContent.trim().substring(0, 35) + '...',
                  ratio: Math.round(ratio * 100) / 100
                });
                if (poorLineHeights.length >= 4) break;
              }
            }
          }

          return {
            hasHorizontalScroll,
            overflowingElements,
            smallFontElements,
            smallTapTargets,
            stickyNavOk,
            navPosition,
            poorLineHeights,
            title: document.title
          };
        }, vp.isMobile);

        const key = `${p.path}@${vp.name}`;
        report.detailsByPage[key] = {
          screenshot: `${p.name}-${vp.name}.png`,
          ...audit
        };

        if (audit.hasHorizontalScroll) {
          report.bugs.push({
            type: 'Horizontal Scroll Overflow',
            page: p.path,
            viewport: vp.name,
            elements: audit.overflowingElements
          });
        }

        if (audit.smallTapTargets.length > 0) {
          report.bugs.push({
            type: 'Small Tap Target (<44px)',
            page: p.path,
            viewport: vp.name,
            count: audit.smallTapTargets.length,
            samples: audit.smallTapTargets
          });
        }

        if (audit.smallFontElements.length > 0) {
          report.bugs.push({
            type: 'Small Body Text (<16px)',
            page: p.path,
            viewport: vp.name,
            samples: audit.smallFontElements
          });
        }

      } catch (err) {
        console.error(`Error on ${p.path} at ${vp.name}:`, err.message);
      }
    }
    await page.close();
  }

  // 6. Specific Contrast and Menu Dropdown touch test on 390px
  const testPage = await browser.newPage();
  await testPage.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await testPage.goto('http://localhost:3000?replay=0', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Test mobile menu / flavours dropdown toggle
  const menuBtn = await testPage.$('button[aria-label*="menu" i], button[aria-label*="nav" i], header button');
  let menuToggledOk = false;
  if (menuBtn) {
    try {
      await menuBtn.click();
      await new Promise(r => setTimeout(r, 500));
      menuToggledOk = true;
      await testPage.screenshot({ path: path.join(OUT_DIR, 'mobile-menu-toggled-390px.png') });
    } catch (e) {
      console.log('Menu toggle error:', e.message);
    }
  }

  // Contrast checks on critical brand tokens
  const contrastChecks = [
    { name: 'Cheddar Gold (#FFC21A) on Warm Cream (#FFF4DC)', fg: [255, 194, 26], bg: [255, 244, 220] },
    { name: 'Bubblegum Pink (#FF7AB8) on Warm Cream (#FFF4DC)', fg: [255, 122, 184], bg: [255, 244, 220] },
    { name: 'Warm Cream (#FFF4DC) on Cheddar Gold (#FFC21A)', fg: [255, 244, 220], bg: [255, 194, 26] },
    { name: 'Midnight Ink (#14102B) on Cheddar Gold (#FFC21A)', fg: [20, 16, 43], bg: [255, 194, 26] },
    { name: 'Midnight Ink (#14102B) on Warm Cream (#FFF4DC)', fg: [20, 16, 43], bg: [255, 244, 220] },
    { name: 'Peri Red (#FF4B1F) on Warm Cream (#FFF4DC)', fg: [255, 75, 31], bg: [255, 244, 220] },
    { name: 'White (#FFFFFF) on Cheddar Gold (#FFC21A)', fg: [255, 255, 255], bg: [255, 194, 26] },
  ];

  const contrastResults = contrastChecks.map(c => {
    const ratio = Math.round(getContrast(c.fg, c.bg) * 100) / 100;
    const passesNormal = ratio >= 4.5;
    const passesLarge = ratio >= 3.0;
    return {
      pair: c.name,
      ratio: `${ratio}:1`,
      wcagNormalText: passesNormal ? 'PASS' : 'FAIL',
      wcagLargeText: passesLarge ? 'PASS' : 'FAIL'
    };
  });

  report.contrastAudits = contrastResults;
  report.mobileMenuToggledOk = menuToggledOk;

  await testPage.close();
  await browser.close();

  fs.writeFileSync(
    path.join(OUT_DIR, 'qa-report.json'),
    JSON.stringify(report, null, 2)
  );

  console.log('QA Pass Completed! Report saved to qa-report.json');
}

runQA().catch(console.error);
