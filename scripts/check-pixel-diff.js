const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

const BASELINE_DIR = 'C:/Users/Kunal/.gemini/antigravity/brain/f6135f91-9724-4fc6-aacc-a247f08002a3/baselines';
const AFTER_DIR = 'C:/Users/Kunal/.gemini/antigravity/brain/f6135f91-9724-4fc6-aacc-a247f08002a3/afters';

const routes = ['home', 'flavours', 'peri-peri', 'tangy-tomato', 'cheese', 'nutrition', 'our-story', 'where-to-buy', 'faq', 'contact'];
const viewports = ['1280', '1920'];

(async () => {
  console.log('Calculating visual pixel difference on uncompressed RGBA pixel buffers...');
  const results = [];

  for (const r of routes) {
    for (const vp of viewports) {
      const baseFile = path.join(BASELINE_DIR, `baseline-desk-${r}-${vp}.png`);
      const afterFile = path.join(AFTER_DIR, `after-desk-${r}-${vp}.png`);

      if (!fs.existsSync(baseFile) || !fs.existsSync(afterFile)) {
        continue;
      }

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

      let differentPixels = 0;
      const totalPixels = width * height;

      for (let i = 0; i < data1.length; i += 4) {
        // RGBA channels
        const dr = Math.abs(data1[i] - data2[i]);
        const dg = Math.abs(data1[i + 1] - data2[i + 1]);
        const db = Math.abs(data1[i + 2] - data2[i + 2]);
        const da = Math.abs(data1[i + 3] - data2[i + 3]);
        // If color distance > 5 (small tolerance for minor subpixel antialiasing/animation frame)
        if (dr > 5 || dg > 5 || db > 5 || da > 5) {
          differentPixels++;
        }
      }

      const diffPct = ((differentPixels / totalPixels) * 100).toFixed(4);
      results.push({ route: r, viewport: vp, differentPixels, totalPixels, diffPct: diffPct + '%' });
      console.log(`  ${r} @ ${vp}: ${differentPixels} / ${totalPixels} pixels diff (${diffPct}%)`);
    }
  }

  fs.writeFileSync(
    'C:/Users/Kunal/.gemini/antigravity/brain/f6135f91-9724-4fc6-aacc-a247f08002a3/desktop-pixel-diff.json',
    JSON.stringify(results, null, 2)
  );
  console.log('True pixel difference analysis complete!');
})();
