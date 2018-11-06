const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

const url = require('./config/url');

(async () => {
   
    const browser = await puppeteer.launch({
        executablePath: './chromium/chrome-win/chrome.exe',
        headless: false
    });
    const page = await browser.newPage();
    await page.emulate(iPhone);
    await page.goto(url.Tmall.XiaoMiTV4S50);
    await page.waitFor(1000);
   /*  const realPrice = await page.$eval('.price-real', e => e.textContent);
    const noThrough = await page.$eval('.no-through', e=> e.textContent);
    console.log({
      realPrice,
      noThrough
    }) */
    // Get the "viewport" of the page, as reported by the page.
    const dimensions = await page.evaluate(() => {
      const realPrice = document.querySelector('.price-real').innerText;
      const noThrough = document.querySelector('.no-through').innerText;
      return {
        realPrice,
        noThrough,
        deviceScaleFactor: window.devicePixelRatio
      };
    });
  
    console.log('Dimensions:', dimensions);
  
    // await browser.close();
  })();