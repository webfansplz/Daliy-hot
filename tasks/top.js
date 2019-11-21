const { Task } = require("../tools");
const options = {
  pageUrl: "https://www.toutiao.com/",
  pageSelector: ".title-box a.link",
  title: "今日头条"
};
module.exports = {
  task: async () => {
    return await Task(options);
  }
};
