const path = require("path");
const dayjs = require("dayjs");
const chalk = require("chalk");
const express = require("express");
const schedule = require("node-schedule");
const app = express();
const { tasks } = require("./tasks");
const { FileServer } = require("./tools");
const resourcePath = path.join(__dirname, "./resource");
app.use(
  express.static(resourcePath, {
    setHeaders(res) {
      res.set("Access-Control-Allow-Origin", "*");
    }
  })
);

function mainTask() {
  const now = dayjs().format("YYYY-MM-DD");
  console.log(chalk.red(`[Process] 开始获取 [${now}] 资讯`));
  const getMsgTask = Promise.all(tasks());
  getMsgTask
    .then(res => {
      const { data } = JSON.parse(
        FileServer.read(path.join(resourcePath, "./index.json")).toString()
      );
      const text = FileServer.createMdMsg(res, now);
      FileServer.write(
        path.join(resourcePath, "./index.json"),
        JSON.stringify({
          data: [
            {
              date: now,
              text
            },
            ...data
          ]
        })
      );
      console.log(chalk.red(`[Success] 成功获取 [${now}] 资讯`));
    })
    .catch(e => {
      console.log(chalk.white.bgRed.bold(`[Failed] 获取 ${now} 资讯 失败`));
      mainTask();
    });
}
function crontab() {
  schedule.scheduleJob(`00 00 11 * * *`, mainTask);
}
crontab();
app.listen(8888);
