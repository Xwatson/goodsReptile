const Subscription = require('egg').Subscription;
const path = require('path');
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

const url = require('../../config/url');

class UpdatePrice extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '1s',
      type: 'worker',
      disable: true // 不被自动启动，设置了在app.beforeStart中启动一次
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const interval = Math.random() * 5000 + 5000;
    console.log('下次启动时间: ', interval + 'ms');
    setTimeout(async() => {
      await this.startSearch();
      this.subscribe()
    }, interval);
  }
  // 启动查询
  async startSearch() {
    console.log('启动chromium，ctx: ', this.ctx);
    const browser = await puppeteer.launch({
      executablePath: path.resolve(__dirname, '../../chromium/chrome-win/chrome.exe'),
      headless: false
    });
    try {
      const resultList = await Promise.all([
        this.goToTmall(browser),
        this.goToJD(browser),
        this.goToSuNing(browser)
      ]);
      console.log('所有结果：', resultList);
      await browser.close();
    } catch (error) {
      console.log('puppeteer发生错误：', error);
      await browser.close();
    }
  }

  async goToTmall(browser) {
    const page = await browser.newPage();
    await page.emulate(iPhone);
    await page.goto(url.Tmall.XiaoMiTV4S50);
    const tmallPrice = await page.evaluate(() => {
      const realPrice = (document.querySelector('.price') || {}).innerText;
      const noThrough = (document.querySelector('.no-through') || {}).innerText;
      return {
        realPrice,
        noThrough
      };
    });
    console.log('天猫价格：', tmallPrice);
    return tmallPrice;
  }
  async goToJD(browser) {
    const page = await browser.newPage();
    await page.emulate(iPhone);
    await page.goto(url.JD.XiaoMiTV4S50);
    const jdPrice = await page.evaluate(() => {
      const realPrice = (document.querySelector('.price') || {}).innerText;  
      return {
        realPrice
      };
    });
    console.log('京东价格：', jdPrice);
    return jdPrice;
  }
  async goToSuNing(browser) {
    const page = await browser.newPage();
    await page.emulate(iPhone);
    await page.goto(url.SuNing.XiaoMiTV4S50);
    const snPrice = await page.evaluate(() => {
      const priceNow = (document.querySelector('#pricemain .price-now') || {}).innerText;
      const productPrice = document.querySelectorAll('.price-now') || {};
      const priceAll = [];
      for (const key in productPrice) {
        priceAll.push(productPrice[key].innerText);
      }
      return {
        priceNow,
        priceAll
      };
    });
    console.log('苏宁价格：', snPrice);
    return snPrice;
  }
}

module.exports = UpdatePrice;