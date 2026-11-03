const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Kunal\\.gemini\\antigravity\\brain\\f6135f91-9724-4fc6-aacc-a247f08002a3';

const viewports = [
  { name: '320x640', width: 320, height: 640 },
  { name: '360x740', width: 360, height: 740 },
  { name: '390x844', width: 390, height: 844 },
  { name: '430x932', width: 430, height: 932 },
  { name: '768x1024', width: 768, height: 1024 },
];

const routes = [
  '/',
  '/flavours',
  '/flavours/peri-peri',
  '/flavours/tangy-tomato',
  '/flavours/cheddar-cheese',
  '/nutrition',
  '/our-story',
  '/where-to-buy',
  '/faq',
  '/contact'
];

async function main() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const allFindings = [];

  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height });

    for (const route of routes) {
      const url = `http://localhost:3000${route}`;
      try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 12000 });
        // Allow animations / preloader to settle
        await new Promise(r => setTimeout(r, 600));

        // Evaluate checks
        const checkResults = await page.evaluate((vpWidth) => {
          const res = {
            hasOverflow: document.documentElement.scrollWidth > vpWidth + 1,
            scrollWidth: document.documentElement.scrollWidth,
            vpWidth: vpWidth,
            overflowElements: [],
            smallTextElements: [],
            smallTapTargets: [],
          };

          // 1. Find elements causing horizontal overflow
          const allEls = document.querySelectorAll('*');
          for (const el of allEls) {
            const rect = el.getBoundingClientRect();
            if (rect.right > vpWidth + 2 && rect.width > 0 && rect.height > 0) {
              const tag = el.tagName.toLowerCase();
              const id = el.id ? `#${el.id}` : '';
              const cls = el.className ? `.${String(el.className).split(' ')[0]}` : '';
              if (res.overflowElements.length < 5) {
                res.overflowElements.push(`${tag}${id}${cls} (right: ${Math.round(rect.right)}px, w: ${Math.round(rect.width)}px)`);
              }
            }
          }

          // 2. Check font size under 12px for body content
          const textEls = document.querySelectorAll('p, span, a, li, h1, h2, h3, h4, h5, h6, button, label, input');
          for (const el of textEls) {
            const fs = parseFloat(window.getComputedStyle(el).fontSize);
            if (fs < 12 && el.textContent.trim().length > 0) {
              if (res.smallTextElements.length < 3) {
                res.smallTextElements.push(`"${el.textContent.trim().slice(0, 25)}" (${fs}px)`);
              }
            }
          }

          // 3. Tap targets < 44px
          const interactives = document.querySelectorAll('button, a, input, select, textarea');
          for (const el of interactives) {
            const rect = el.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44)) {
              const text = el.textContent.trim().slice(0, 20) || el.getAttribute('aria-label') || el.tagName;
              if (res.smallTapTargets.length < 3) {
                res.smallTapTargets.push(`${text} (${Math.round(rect.width)}x${Math.round(rect.height)}px)`);
              }
            }
          }

          return res;
        }, vp.width);

        // Take snapshot for key mobile viewports (360x740, 390x844, 768x1024)
        if (['360x740', '390x844', '768x1024'].includes(vp.name)) {
          const safeRouteName = route === '/' ? 'home' : route.replace(/\//g, '-').replace(/^-/, '');
          const filename = `phase1-${safeRouteName}-${vp.name}.png`;
          await page.screenshot({ path: path.join(artifactDir, filename) });
        }

        allFindings.push({
          route,
          viewport: vp.name,
          ...checkResults
        });

      } catch (err) {
        console.error(`Error on ${route} at ${vp.name}:`, err.message);
      }
    }
    await page.close();
  }

  await browser.close();

  // Write findings to a JSON file for processing
  fs.writeFileSync(
    path.join(artifactDir, 'phase1-mobile-audit.json'),
    JSON.stringify(allFindings, null, 2)
  );
  console.log('Mobile audit complete! Saved phase1-mobile-audit.json');
}

main().catch(console.error);
