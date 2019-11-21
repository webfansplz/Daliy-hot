const { Task } = require("../tools");
const options = {
  pageUrl: "https://www.jianshu.com/",
  pageSelector: ".content a.title",
  title: "今日简书"
};
module.exports = {
  task: async () => {
    return await Task(options);
  }
};
