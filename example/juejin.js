const puppeteer = require("puppeteer");

const task = async () => {
  // 打开chrome浏览器
  const browser = await puppeteer.launch({
    headless: false
  });
  // 新建页面
  const page = await browser.newPage();
  // 跳转到掘金
  await page.goto("https://juejin.im");
  // 截屏保存
  await page.screenshot({
    path: "./juejin.png"
  });
};
task();
