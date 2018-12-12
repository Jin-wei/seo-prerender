require('chromedriver'); //导入chrome浏览器 driver
const {
  Builder,
  By,
  Key,
  until
} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').
    setChromeOptions(new chrome.Options().
    addArguments("--headless").
    addArguments("disable-infobars").
    addArguments("--disable-extensions").
    addArguments("--disable-gpu").
    addArguments("--disable-dev-shm-usage").
    addArguments("--no-sandbox").
    addArguments("start-maximized")).build();
  try {
    let capabilities = await driver.getCapabilities();
    // capabilities['map_'].set('timeouts', { implicit: TIMEOUT, pageLoad: TIMEOUT, script: TIMEOUT });
    capabilities['map_'].set('timeouts', { implicit: 4000 });
    // await driver.manage().timeouts().setScriptTimeout(15);
    await driver.get('http://www.kbjbuy.com/product/103499/bizId/100001');
    console.log(await driver.getPageSource())
  } finally {
    await driver.quit();
  }
})();