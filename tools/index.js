const puppeteer = require("puppeteer");
const chromeFinder = require("chrome-finder");
const chalk = require("chalk");
const fs = require("fs");
const Task = ({ pageUrl, pageSelector, title }, eventHandle) => {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        executablePath: chromeFinder()
      });
      const page = await browser.newPage();
      await page.goto(pageUrl);
      console.log(chalk.blue(`[Process] 开始获取 ${title}`));
      eventHandle && (await eventHandle(page));
      await page.waitForSelector(pageSelector, {
        timeout: 5000
      });
      const res = await page.$$eval(pageSelector, ele =>
        ele.map(el => ({
          url: el.href,
          text: el.innerText
        }))
      );
      await browser.close();
      console.log(res.length && chalk.yellow(`[Success] 成功获取 ${title}`));
      resolve({
        title,
        list: res.slice(0, 5)
      });
    } catch (e) {
      reject(e);
    }
  }).catch(e => {
    console.log(e);
    console.log(chalk.white.bgRed.bold(`[Failed] 获取 ${title} 失败`));
  });
};

const FileServer = {
  // 写文件
  write(path, text) {
    fs.writeFileSync(path, text);
  },
  // 读文件
  read(path) {
    return fs.readFileSync(path);
  },
  // 创建markdown内容
  createMdMsg(res, today) {
    return res.reduce((preContent, { title, list }) => {
      const curTitle = `## ${title}\n`;
      const curContent = list.reduce((c, { url, text }) => {
        return c + `[${text}](${url})  \n`;
      }, "");
      return preContent + curTitle + curContent;
    }, `# ${today}  \n`);
  }
};
module.exports = {
  Task,
  FileServer
};
