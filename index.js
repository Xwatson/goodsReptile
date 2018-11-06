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
    // 跳转tmall
    await page.goto(url.Tmall.XiaoMiTV4S50);
    await page.waitFor(300);
    const tmallPrice = await page.evaluate(() => {
      const realPrice = document.querySelector('.price-real').innerText;
      const noThrough = document.querySelector('.no-through').innerText;
      return {
        realPrice,
        noThrough
      };
    });
    // 跳转jd
    await page.goto(url.JD.XiaoMiTV4S50);
    await page.waitFor(300);
    const jdPrice = await page.evaluate(() => {
      const realPrice = document.querySelector('.price').innerText;
      return {
        realPrice
      };
    });
    // 跳转苏宁
    await page.goto(url.SuNing.XiaoMiTV4S50);
    await page.waitFor(300);
    const snPrice = await page.evaluate(() => {
      const priceNow = document.querySelector('#pricemain .price-now').innerText;
      const productPrice = document.querySelectorAll('.price-now');
      const priceAll = [];
      for (const key in productPrice) {
        priceAll.push(productPrice[key].innerText);
      }
      return {
        priceNow,
        priceAll
      };
    });
  
    console.log('天猫价格：', tmallPrice);
    console.log('京东价格：', jdPrice);
    console.log('苏宁价格：', snPrice);
  
    await page.waitFor(3000);
    await browser.close();
  })();