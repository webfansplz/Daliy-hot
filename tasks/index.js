const juejin = require("./juejin");
const nba = require("./nba");
const top = require("./top");
const music = require("./music");
const jianshu = require("./jianshu");

module.exports = {
  tasks: () => [
    juejin.task(),
    nba.task(),
    music.task(),
    top.task(),
    jianshu.task()
  ]
};
