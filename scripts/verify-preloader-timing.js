const puppeteer = require('puppeteer-core');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Kunal\\.gemini\\antigravity\\brain\\f6135f91-9724-4fc6-aacc-a247f08002a3';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    defaultViewport: { width: 1440, height: 900 }
  });

  const page = await browser.newPage();
  
  // Track all displayed words during preloader
  const displayedWords = [];
  
  console.log('Navigating with replay=true ...');
  await page.goto('http://localhost:3000/?replay=true', { waitUntil: 'domcontentloaded' });

  const startTime = Date.now();
  let preloaderVisible = true;
  let snappedWord = false;

  while (Date.now() - startTime < 6000) {
    const wordText = await page.evaluate(() => {
      const el = document.querySelector('div[role="dialog"] span.font-display');
      return el ? el.textContent.trim() : null;
    });

    if (wordText && !displayedWords.includes(wordText)) {
      displayedWords.push(wordText);
      console.log(`Preloader word: "${wordText}" at ${Date.now() - startTime}ms`);
      
      // Capture screenshot on Hindi word "चटपटा" or "मसाला"
      if ((wordText === 'चटपटा' || wordText === 'मसाला') && !snappedWord) {
        snappedWord = true;
        await page.screenshot({ path: path.join(artifactDir, 'verified-preloader-hindi-word.png') });
        console.log('✓ Captured verified-preloader-hindi-word.png');
      }
    }

    const isPreloaderStillHere = await page.evaluate(() => {
      return !!document.querySelector('div[role="dialog"]');
    });

    if (!isPreloaderStillHere && preloaderVisible) {
      preloaderVisible = false;
      const duration = Date.now() - startTime;
      console.log(`Preloader finished and exited in ${duration}ms`);
      break;
    }

    await new Promise(r => setTimeout(r, 100));
  }

  // Check revealed home hero images
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(artifactDir, 'verified-revealed-hero.png') });
  console.log('✓ Captured verified-revealed-hero.png');

  console.log('All sequence words detected:', displayedWords);
  const hasKurkura = displayedWords.some(w => w.includes('कुरकुरा') || w.toLowerCase().includes('kurkur'));
  console.log('Does sequence contain "कुरकुरा"?', hasKurkura);

  await browser.close();
}

main().catch(console.error);
