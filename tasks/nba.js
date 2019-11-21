const { Task } = require("../tools");
const options = {
  pageUrl: "https://nba.hupu.com",
  pageSelector: ".nba-news-list a",
  title: "今日NBA"
};
module.exports = {
  task: async () => {
    return await Task(options);
  }
};
