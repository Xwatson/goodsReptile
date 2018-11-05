const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];


(async () => {
   
    const browser = await puppeteer.launch({
        executablePath: './chromium/chrome-win/chrome.exe',
        headless: true
    });
    const page = await browser.newPage();
    await page.emulate(iPhone);
    await page.goto('https://www.tmall.com');
  
    // Get the "viewport" of the page, as reported by the page.
    const dimensions = await page.evaluate(() => {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        deviceScaleFactor: window.devicePixelRatio
      };
    });
  
    console.log('Dimensions:', dimensions);
  
    await browser.close();
  })();