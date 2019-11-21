const { Task } = require("../tools");
const options = {
  pageUrl: "https://y.qq.com/portal/playlist.html#t3=1&t2=5&t1=141&",
  pageSelector: ".songlist__list .songlist__item .js_song",
  title: "今日Music"
};
module.exports = {
  task: async () => {
    return await Task(options, async page => {
      // 播放列表选择器
      const playSelector = ".playlist__list .playlist__item";
      await page.waitForSelector(playSelector);
      await Promise.all([
        page.waitForNavigation(),
        page.click(`${playSelector}:first-child`)
      ]);
    });
  }
};
