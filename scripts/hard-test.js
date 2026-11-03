const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const axeCore = require('axe-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT_DIR = 'C:\\Users\\Kunal\\.gemini\\antigravity\\brain\\f6135f91-9724-4fc6-aacc-a247f08002a3\\qa-screenshots';

const VIEWPORTS = [
  { name: '360x740', width: 360, height: 740, isMobile: true },
  { name: '390x844', width: 390, height: 844, isMobile: true },
  { name: '768x1024', width: 768, height: 1024, isMobile: false },
  { name: '1280x800', width: 1280, height: 800, isMobile: false },
  { name: '1920x1080', width: 1920, height: 1080, isMobile: false }
];

const TARGET_ROUTES = [
  '/',
  '/flavours',
  '/flavours/peri-peri',
  '/flavours/tangy-tomato',
  '/flavours/cheddar-cheese',
  '/nutrition',
  '/our-story',
  '/faq',
  '/contact',
  '/where-to-buy',
  '/non-existent-404'
];

const REDIRECT_ROUTES = [
  '/flavours/cheese',
  '/healthy-snacking',
  '/why-11pm',
  '/ingredients-nutrition',
  '/our-process',
  '/about'
];

async function runHardTest() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const findings = [];
  const inventory = {
    canonicalRoutes: {},
    redirectRoutes: {},
    staticAssets: {}
  };

  // Phase 0: Test Redirects & Inventory
  console.log('--- PHASE 0: CRAWL & INVENTORY ---');
  const redirectPage = await browser.newPage();
  for (const r of REDIRECT_ROUTES) {
    try {
      const resp = await redirectPage.goto(`http://localhost:3000${r}`, { waitUntil: 'domcontentloaded' });
      const finalUrl = redirectPage.url();
      inventory.redirectRoutes[r] = {
        status: resp.status(),
        destination: finalUrl.replace('http://localhost:3000', '')
      };
      console.log(`Redirect ${r} -> ${inventory.redirectRoutes[r].destination} (${resp.status()})`);
    } catch (e) {
      inventory.redirectRoutes[r] = { error: e.message };
    }
  }

  // Check Assets
  const assetsToCheck = [
    '/sitemap.xml',
    '/robots.txt',
    '/favicon.ico',
    '/images/snack-trio.png',
    '/brand/logo-official.png'
  ];
  for (const a of assetsToCheck) {
    try {
      const resp = await redirectPage.goto(`http://localhost:3000${a}`, { waitUntil: 'domcontentloaded' });
      inventory.staticAssets[a] = {
        status: resp.status(),
        contentType: resp.headers()['content-type'] || 'unknown'
      };
      console.log(`Asset ${a}: status ${resp.status()}`);
    } catch (e) {
      inventory.staticAssets[a] = { error: e.message };
    }
  }
  await redirectPage.close();

  // Phase 1: Deep Testing across Viewports
  console.log('\n--- PHASE 1: HARD AUDIT ACROSS VIEWPORTS ---');
  let bugIdCounter = 1;

  for (const vp of VIEWPORTS) {
    console.log(`\nTesting Viewport: ${vp.name} (${vp.width}x${vp.height})...`);
    const page = await browser.newPage();
    await page.setViewport({
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 2,
      isMobile: vp.isMobile,
      hasTouch: vp.isMobile
    });

    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', err => consoleErrors.push(err.message));

    for (const route of TARGET_ROUTES) {
      const pageName = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '-');
      const url = `http://localhost:3000${route}?replay=0`;
      
      try {
        const resp = await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        const statusCode = resp ? resp.status() : 0;
        await new Promise(res => setTimeout(res, 800));

        // Skip preloader if shown
        const skip = await page.$('button[aria-label="Skip intro"]');
        if (skip) {
          await skip.click();
          await new Promise(res => setTimeout(res, 500));
        }

        // Take screenshot
        const shotName = `${pageName}-${vp.name}.png`;
        const shotPath = path.join(OUT_DIR, shotName);
        await page.screenshot({ path: shotPath, fullPage: false });

        // Run axe-core
        await page.evaluate(axeCore.source);
        const axeResults = await page.evaluate(async () => {
          return await axe.run({
            runOnly: {
              type: 'tag',
              values: ['wcag2a', 'wcag2aa', 'best-practice']
            }
          });
        });

        // Collect DOM metrics
        const domDiagnostics = await page.evaluate((isMobile) => {
          const docEl = document.documentElement;
          const winW = window.innerWidth;
          
          // Horizontal overflow
          const hasHScroll = docEl.scrollWidth > winW + 1;
          const hScrollEls = [];
          if (hasHScroll) {
            document.querySelectorAll('*').forEach(el => {
              const r = el.getBoundingClientRect();
              if (r.right > winW + 2 && r.width > 0) {
                hScrollEls.push({
                  tag: el.tagName.toLowerCase(),
                  cls: (el.className || '').toString().slice(0, 40),
                  right: Math.round(r.right),
                  width: Math.round(r.width)
                });
              }
            });
          }

          // Small body text on mobile (<16px) or <12px anywhere
          const fontViolations = [];
          document.querySelectorAll('p, li, .lede').forEach(el => {
            const text = el.textContent.trim();
            if (text.length < 25) return;
            const cs = window.getComputedStyle(el);
            const fs = parseFloat(cs.fontSize);
            if (isMobile && fs < 15.5) {
              fontViolations.push({
                type: 'body-under-16px',
                fs: `${Math.round(fs)}px`,
                text: text.slice(0, 35) + '...'
              });
            } else if (fs < 11.5) {
              fontViolations.push({
                type: 'text-under-12px',
                fs: `${Math.round(fs)}px`,
                text: text.slice(0, 35) + '...'
              });
            }
          });

          // Tap targets (<44px)
          const smallTargets = [];
          if (isMobile) {
            document.querySelectorAll('a, button, input').forEach(el => {
              const r = el.getBoundingClientRect();
              if (r.width > 0 && r.height > 0 && (r.width < 43 || r.height < 43)) {
                const cs = window.getComputedStyle(el);
                if (cs.display === 'none' || cs.visibility === 'hidden') return;
                smallTargets.push({
                  tag: el.tagName.toLowerCase(),
                  text: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 25),
                  w: Math.round(r.width),
                  h: Math.round(r.height)
                });
              }
            });
          }

          // SEO & Headings
          const h1s = Array.from(document.querySelectorAll('h1')).map(h => h.textContent.trim());
          const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
          const ogImg = document.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
          const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
          const jsonLd = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(s => {
            try { return JSON.parse(s.textContent); } catch (e) { return null; }
          }).filter(Boolean);

          // Image audit
          const images = Array.from(document.querySelectorAll('img')).map(img => ({
            src: img.getAttribute('src') || '',
            alt: img.getAttribute('alt') || '',
            hasAlt: img.hasAttribute('alt'),
            width: img.naturalWidth || img.width,
            height: img.naturalHeight || img.height
          }));

          // Nav & Skip link
          const hasSkipLink = Boolean(document.querySelector('a[href^="#main"], a[href^="#content"], .skip-to-content'));
          const nav = document.querySelector('header, nav');
          const navSticky = nav ? window.getComputedStyle(nav).position : 'none';

          return {
            hasHScroll,
            hScrollEls: hScrollEls.slice(0, 3),
            fontViolations: fontViolations.slice(0, 4),
            smallTargets: smallTargets.slice(0, 4),
            h1s,
            metaDesc,
            ogImg,
            canonical,
            jsonLd,
            images,
            hasSkipLink,
            navSticky,
            title: document.title
          };
        }, vp.isMobile);

        // Record findings
        if (domDiagnostics.hasHScroll) {
          findings.push({
            id: `BUG-${bugIdCounter++}`,
            page: route,
            viewport: vp.name,
            issue: `Horizontal page overflow (scrollWidth > innerWidth) due to unclipped elements`,
            severity: 'P0',
            screenshot: shotName,
            suggestedFix: 'Apply overflow-x: clip on AnnouncementBar and hero ribbon containers.'
          });
        }

        if (domDiagnostics.smallTargets.length > 0) {
          findings.push({
            id: `BUG-${bugIdCounter++}`,
            page: route,
            viewport: vp.name,
            issue: `Undersized touch targets (<44px): ${domDiagnostics.smallTargets.map(t => `${t.tag} "${t.text}" (${t.w}x${t.h}px)`).join(', ')}`,
            severity: 'P1',
            screenshot: shotName,
            suggestedFix: 'Add min-h-[44px] min-w-[44px] touch padding or increase button dimensions.'
          });
        }

        if (domDiagnostics.fontViolations.length > 0) {
          findings.push({
            id: `BUG-${bugIdCounter++}`,
            page: route,
            viewport: vp.name,
            issue: `Body text font-size below 16px on mobile: ${domDiagnostics.fontViolations.map(f => `${f.fs} ("${f.text}")`).join(', ')}`,
            severity: 'P1',
            screenshot: shotName,
            suggestedFix: 'Upgrade body text classes from text-sm (14px) to text-base (16px).'
          });
        }

        if (!domDiagnostics.hasSkipLink) {
          findings.push({
            id: `BUG-${bugIdCounter++}`,
            page: route,
            viewport: vp.name,
            issue: 'Missing accessible "Skip to content" keyboard link',
            severity: 'P2',
            screenshot: shotName,
            suggestedFix: 'Add <a href="#main-content" className="sr-only focus:not-sr-only">Skip to content</a> in layout.'
          });
        }

        // Axe color contrast violations
        const contrastViolations = axeResults.violations.filter(v => v.id === 'color-contrast');
        if (contrastViolations.length > 0) {
          findings.push({
            id: `BUG-${bugIdCounter++}`,
            page: route,
            viewport: vp.name,
            issue: `WCAG AA colour contrast failure on ${contrastViolations[0].nodes.length} elements (e.g. yellow/pink badges on cream)`,
            severity: 'P1',
            screenshot: shotName,
            suggestedFix: 'Ensure all Cheddar Gold & Bubblegum Pink elements use high-contrast Midnight Ink (#14102B) foreground text or darker mustard borders.'
          });
        }

        // Image duplicate & alt check
        const missingAlt = domDiagnostics.images.filter(img => !img.hasAlt || img.alt.trim() === '');
        if (missingAlt.length > 0) {
          findings.push({
            id: `BUG-${bugIdCounter++}`,
            page: route,
            viewport: vp.name,
            issue: `Images missing alt attribute (${missingAlt.length} detected)`,
            severity: 'P1',
            screenshot: shotName,
            suggestedFix: 'Provide descriptive alt text for every image asset.'
          });
        }

        // Store page inventory metadata
        if (vp.name === '1440x900') {
          inventory.canonicalRoutes[route] = {
            statusCode,
            title: domDiagnostics.title,
            h1s: domDiagnostics.h1s,
            hasMetaDesc: Boolean(domDiagnostics.metaDesc),
            canonical: domDiagnostics.canonical,
            hasOgImage: Boolean(domDiagnostics.ogImg),
            jsonLdTypes: domDiagnostics.jsonLd.map(j => j['@type']).filter(Boolean),
            imagesCount: domDiagnostics.images.length
          };
        }

      } catch (err) {
        console.error(`Error on ${route} (${vp.name}):`, err.message);
      }
    }
    await page.close();
  }

  await browser.close();

  // Save report
  const finalReport = {
    timestamp: new Date().toISOString(),
    inventory,
    findings
  };

  fs.writeFileSync(
    path.join(OUT_DIR, 'hard-test-report.json'),
    JSON.stringify(finalReport, null, 2)
  );

  console.log(`\nHard Test Complete! Total findings logged: ${findings.length}`);
}

runHardTest().catch(console.error);
