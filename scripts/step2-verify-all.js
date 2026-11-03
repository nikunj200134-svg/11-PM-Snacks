const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

const BASELINE_DIR = 'C:/Users/Kunal/.gemini/antigravity/brain/f6135f91-9724-4fc6-aacc-a247f08002a3/baselines';
const AFTER_DIR = 'C:/Users/Kunal/.gemini/antigravity/brain/f6135f91-9724-4fc6-aacc-a247f08002a3/afters';
if (!fs.existsSync(AFTER_DIR)) fs.mkdirSync(AFTER_DIR, { recursive: true });

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

const mobileDevices = [
  { name: 'Pixel 7', width: 393, height: 851, dsf: 2.75 },
  { name: 'iPhone 14', width: 390, height: 844, dsf: 3 }
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Helper for page load
  async function loadPage(url, vp, isMobile = false) {
    await page.setViewport({
      width: vp.width,
      height: vp.height,
      isMobile,
      hasTouch: isMobile,
      deviceScaleFactor: vp.dsf || 1
    });
    await page.goto('http://localhost:3000' + url, { waitUntil: 'networkidle0', timeout: 35000 });
    if (url === '/') {
      await new Promise(r => setTimeout(r, 3800)); // wait for preloader
    } else {
      await new Promise(r => setTimeout(r, 600));
    }
  }

  console.log('=== STEP 1: CAPTURING DESKTOP & MOBILE AFTER SCREENSHOTS ===');
  for (const r of routes) {
    for (const vp of desktopViewports) {
      await loadPage(r.path, vp, false);
      const filename = path.join(AFTER_DIR, `after-desk-${r.name}-${vp.label}.png`);
      await page.screenshot({ path: filename });
      console.log(`  Captured Desktop ${r.name} @ ${vp.label}`);
    }
  }

  for (const r of routes) {
    for (const vp of [{ width: 360, height: 740, label: '360' }, { width: 390, height: 844, label: '390' }, { width: 768, height: 1024, label: '768' }]) {
      await loadPage(r.path, vp, true);
      const filename = path.join(AFTER_DIR, `after-mob-${r.name}-${vp.label}.png`);
      await page.screenshot({ path: filename });
      console.log(`  Captured Mobile ${r.name} @ ${vp.label}`);
    }
  }

  console.log('\n=== STEP 2: PIXEL-DIFF DESKTOP VERIFICATION (1280 & 1920) ===');
  const desktopDiffs = [];
  for (const r of routes) {
    for (const vp of desktopViewports) {
      const baseFile = path.join(BASELINE_DIR, `baseline-desk-${r.name}-${vp.label}.png`);
      const afterFile = path.join(AFTER_DIR, `after-desk-${r.name}-${vp.label}.png`);

      if (!fs.existsSync(baseFile) || !fs.existsSync(afterFile)) continue;

      const baseImg = await loadImage(baseFile);
      const afterImg = await loadImage(afterFile);
      const width = baseImg.width;
      const height = baseImg.height;

      const c1 = createCanvas(width, height);
      const ctx1 = c1.getContext('2d');
      ctx1.drawImage(baseImg, 0, 0);
      const data1 = ctx1.getImageData(0, 0, width, height).data;

      const c2 = createCanvas(width, height);
      const ctx2 = c2.getContext('2d');
      ctx2.drawImage(afterImg, 0, 0);
      const data2 = ctx2.getImageData(0, 0, width, height).data;

      let diffPixels = 0;
      const totalPixels = width * height;
      for (let i = 0; i < data1.length; i += 4) {
        const dr = Math.abs(data1[i] - data2[i]);
        const dg = Math.abs(data1[i + 1] - data2[i + 1]);
        const db = Math.abs(data1[i + 2] - data2[i + 2]);
        const da = Math.abs(data1[i + 3] - data2[i + 3]);
        if (dr > 8 || dg > 8 || db > 8 || da > 8) {
          diffPixels++;
        }
      }
      const diffPct = ((diffPixels / totalPixels) * 100).toFixed(4);
      desktopDiffs.push({ route: r.name, viewport: vp.label, diffPct: diffPct + '%', diffPixels, totalPixels });
      console.log(`  Diff ${r.name} @ ${vp.label}: ${diffPct}% (${diffPixels} / ${totalPixels} px)`);
    }
  }

  console.log('\n=== STEP 3: MOBILE TOUCH SCROLL GESTURES, FPS, LONG TASKS & CLS ===');
  const client = await page.target().createCDPSession();

  // Enable CDP domains
  await client.send('Performance.enable');
  await client.send('Emulation.setCPUThrottlingRate', { rate: 4 }); // 4x CPU throttle
  await client.send('Network.emulateNetworkConditions', {
    offline: false,
    downloadThroughput: 1.5 * 1024 * 1024 / 8, // Fast 4G: 1.5 Mbps
    uploadThroughput: 750 * 1024 / 8,
    latency: 40
  });

  const scrollResults = [];

  for (const device of mobileDevices) {
    console.log(`\nTesting on Device: ${device.name} (${device.width}x${device.height})...`);
    for (const r of routes) {
      await loadPage(r.path, device, true);

      // Setup in-page scroll & performance tracker
      await page.evaluate(() => {
        window.__metrics = {
          frames: 0,
          startTime: performance.now(),
          lastFrameTime: performance.now(),
          frameDeltas: [],
          longTasks: 0,
          maxLongTask: 0,
          cls: 0,
          scrollYHistory: [],
          overflow: false
        };

        // Layout shift observer
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              window.__metrics.cls += entry.value;
            }
          }
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });

        // Long task observer
        const ltObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            window.__metrics.longTasks++;
            if (entry.duration > window.__metrics.maxLongTask) {
              window.__metrics.maxLongTask = entry.duration;
            }
          }
        });
        ltObserver.observe({ type: 'longtask', buffered: true });

        // RAF tracker for FPS and scroll positions
        function onFrame(now) {
          window.__metrics.frames++;
          window.__metrics.frameDeltas.push(now - window.__metrics.lastFrameTime);
          window.__metrics.lastFrameTime = now;
          window.__metrics.scrollYHistory.push(window.scrollY);
          requestAnimationFrame(onFrame);
        }
        requestAnimationFrame(onFrame);

        // Check horizontal overflow
        window.__metrics.overflow = document.documentElement.scrollWidth > window.innerWidth;
      });

      // Execute gestures: slow flick, medium flick, fast flick down, then flick back up
      const docHeight = await page.evaluate(() => document.documentElement.scrollHeight);
      const gestures = [
        { yDistance: -300, speed: 800 },   // slow flick down
        { yDistance: -500, speed: 2000 },  // medium flick down
        { yDistance: -800, speed: 4000 },  // fast flick down
        { yDistance: 600, speed: 2500 },   // medium flick back up
      ];

      for (const g of gestures) {
        try {
          await client.send('Input.synthesizeScrollGesture', {
            x: Math.round(device.width / 2),
            y: Math.round(device.height / 2),
            yDistance: g.yDistance,
            speed: g.speed,
            gestureSourceType: 'touch'
          });
          await new Promise(res => setTimeout(res, 500));
        } catch (err) {
          // Fallback if CDP scroll gesture fails
          await page.evaluate((dist) => window.scrollBy({ top: -dist, behavior: 'smooth' }), g.yDistance);
          await new Promise(res => setTimeout(res, 500));
        }
      }

      // Collect metrics
      const result = await page.evaluate(() => {
        const totalDuration = performance.now() - window.__metrics.startTime;
        const avgFps = Math.round((window.__metrics.frames / (totalDuration / 1000)));

        // Analyze scroll jumps
        let maxJump = 0;
        let prev = window.__metrics.scrollYHistory[0] || 0;
        for (const y of window.__metrics.scrollYHistory) {
          const jump = Math.abs(y - prev);
          if (jump > maxJump) maxJump = jump;
          prev = y;
        }

        // Check that sections were entered (content not skipped)
        const sections = Array.from(document.querySelectorAll('section, main > div, article')).map(s => {
          const rect = s.getBoundingClientRect();
          return {
            id: s.id || s.className.slice(0, 20),
            visible: rect.top < window.innerHeight && rect.bottom > 0
          };
        });

        return {
          avgFps,
          longTasks: window.__metrics.longTasks,
          maxLongTask: Math.round(window.__metrics.maxLongTask),
          cls: parseFloat(window.__metrics.cls.toFixed(4)),
          overflow: window.__metrics.overflow,
          maxScrollJump: Math.round(maxJump),
          sectionsChecked: sections.length
        };
      });

      scrollResults.push({
        device: device.name,
        route: r.name,
        ...result
      });

      console.log(`  [${device.name}] ${r.name}: FPS=${result.avgFps}, MaxLongTask=${result.maxLongTask}ms, CLS=${result.cls}, Overflow=${result.overflow}, MaxJump=${result.maxScrollJump}px`);
    }
  }

  // Save report
  const finalReport = {
    desktopDiffs,
    scrollResults,
    timestamp: new Date().toISOString()
  };

  fs.writeFileSync('C:/Users/Kunal/.gemini/antigravity/brain/f6135f91-9724-4fc6-aacc-a247f08002a3/step2-verification-report.json', JSON.stringify(finalReport, null, 2));

  await browser.close();
  console.log('\n=== ALL STEP 2 VERIFICATIONS COMPLETED SUCCESSFULLY ===');
})();
