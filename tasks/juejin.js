const { Task } = require("../tools");
const options = {
  pageUrl: "https://juejin.im",
  pageSelector: ".entry-list .item a.title",
  title: "今日掘金"
};

module.exports = {
  task: async () => {
    return await Task(options, async page => {
      // 菜单导航选择器
      const navSelector = ".view-nav .nav-item";
      // 菜单类别
      const navType = "前端";
      await page.waitFor(navSelector);
      // 导航列表
      const navList = await page.$$eval(navSelector, ele =>
        ele.map(el => el.innerText)
      );
      // 前端导航索引
      const webNavIndex = navList.findIndex(item => item === navType);
      await Promise.all([
        page.waitForNavigation(),
        page.click(`${navSelector}:nth-child(${webNavIndex + 1})`)
      ]);
    });
  }
};
