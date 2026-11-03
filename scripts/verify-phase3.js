const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const BASELINE_DIR = 'C:/Users/Kunal/.gemini/antigravity/brain/f6135f91-9724-4fc6-aacc-a247f08002a3/baselines';
const AFTER_DIR = 'C:/Users/Kunal/.gemini/antigravity/brain/f6135f91-9724-4fc6-aacc-a247f08002a3/afters';
if (!fs.existsSync(AFTER_DIR)) {
  fs.mkdirSync(AFTER_DIR, { recursive: true });
}

const routes = [
  { name: 'home', path: '/' },
  { name: 'flavours', path: '/flavours' },
  { name: 'peri-peri', path: '/flavours/peri-peri' },
  { name: 'tangy-tomato', path: '/flavours/tangy-tomato' },
  { name: 'cheese', path: '/flavours/cheddar-cheese' },
  { name: 'nutrition', path: '/nutrition' },
  { name: 'our-story', path: '/our-story' },
  { name: 'where-to-buy', path: '/where-to-buy' },
  { name: 'faq', path: '/faq' },
  { name: 'contact', path: '/contact' }
];

const desktopViewports = [
  { width: 1280, height: 800, label: '1280' },
  { width: 1920, height: 1080, label: '1920' }
];

const mobileViewports = [
  { width: 360, height: 740, label: '360' },
  { width: 390, height: 844, label: '390' },
  { width: 768, height: 1024, label: '768' }
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  async function preparePage(url, vp) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3000' + url, { waitUntil: 'networkidle0', timeout: 30000 });
    if (url === '/') {
      await new Promise(r => setTimeout(r, 3600));
    } else {
      await new Promise(r => setTimeout(r, 600));
    }
  }

  console.log('Capturing Desktop After Screenshots (1280, 1920)...');
  for (const r of routes) {
    for (const vp of desktopViewports) {
      await preparePage(r.path, vp);
      const filename = path.join(AFTER_DIR, `after-desk-${r.name}-${vp.label}.png`);
      await page.screenshot({ path: filename, fullPage: false });
      console.log(`  Saved ${r.name} @ ${vp.label}`);
    }
  }

  console.log('Capturing Mobile After Screenshots (360, 390, 768)...');
  for (const r of routes) {
    for (const vp of mobileViewports) {
      await preparePage(r.path, vp);
      const filename = path.join(AFTER_DIR, `after-mob-${r.name}-${vp.label}.png`);
      await page.screenshot({ path: filename, fullPage: false });
      console.log(`  Saved ${r.name} @ ${vp.label}`);
    }
  }

  // Pixel Diff Check for Desktop
  console.log('\nRunning Desktop Pixel Diff Analysis (1280, 1920)...');
  const desktopDiffs = [];
  for (const r of routes) {
    for (const vp of desktopViewports) {
      const baseFile = path.join(BASELINE_DIR, `baseline-desk-${r.name}-${vp.label}.png`);
      const afterFile = path.join(AFTER_DIR, `after-desk-${r.name}-${vp.label}.png`);
      
      if (fs.existsSync(baseFile) && fs.existsSync(afterFile)) {
        const baseBuf = fs.readFileSync(baseFile);
        const afterBuf = fs.readFileSync(afterFile);
        
        let diffBytes = 0;
        const minLen = Math.min(baseBuf.length, afterBuf.length);
        const maxLen = Math.max(baseBuf.length, afterBuf.length);
        for (let i = 0; i < minLen; i++) {
          if (baseBuf[i] !== afterBuf[i]) diffBytes++;
        }
        diffBytes += (maxLen - minLen);
        const percentDiff = ((diffBytes / maxLen) * 100).toFixed(3);
        desktopDiffs.push({
          route: r.name,
          viewport: vp.label,
          baseSize: baseBuf.length,
          afterSize: afterBuf.length,
          diffPercent: percentDiff + '%'
        });
        console.log(`  Desktop Diff for ${r.name} @ ${vp.label}: ${percentDiff}% difference`);
      }
    }
  }

  // Audit Mobile Checks
  console.log('\nRunning Mobile Health Audit...');
  const mobileAudit = [];
  for (const r of routes) {
    await preparePage(r.path, { width: 390, height: 844 });
    const result = await page.evaluate(() => {
      const scrollWidth = document.documentElement.scrollWidth;
      const vpWidth = window.innerWidth;
      const overflow = scrollWidth > vpWidth;
      
      // Tap target check
      const smallTargets = [];
      document.querySelectorAll('a, button, input, textarea, select').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44)) {
          if (!el.textContent?.includes('Skip to content') && !el.className.includes('skip-link')) {
            smallTargets.push(`${el.tagName} "${(el.textContent||'').trim().slice(0, 20)}" (${Math.round(rect.width)}x${Math.round(rect.height)})`);
          }
        }
      });

      // Text under 12px check
      const smallTexts = [];
      document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, a, label').forEach(el => {
        const fs = parseFloat(window.getComputedStyle(el).fontSize);
        if (fs > 0 && fs < 12 && el.children.length === 0 && (el.textContent||'').trim().length > 0) {
          smallTexts.push(`"${el.textContent.trim().slice(0, 20)}" (${fs}px)`);
        }
      });

      return { overflow, scrollWidth, vpWidth, smallTargets: smallTargets.slice(0, 5), smallTexts: smallTexts.slice(0, 5) };
    });
    mobileAudit.push({ route: r.name, ...result });
    console.log(`  ${r.name}: Overflow=${result.overflow}, SmallTargets=${result.smallTargets.length}, SmallTexts=${result.smallTexts.length}`);
  }

  fs.writeFileSync('C:/Users/Kunal/.gemini/antigravity/brain/f6135f91-9724-4fc6-aacc-a247f08002a3/phase3-results.json', JSON.stringify({ desktopDiffs, mobileAudit }, null, 2));

  await browser.close();
  console.log('\nPhase 3 Verification Complete!');
})();
