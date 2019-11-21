const fileServer = {
  // 写文件
  write(path, text) {
    fs.writeFileSync(path, text);
  },
  // 读文件
  read(path) {
    return fs.readFileSync(path);
  }
};

const task = () => {
  // 获取资讯任务
  const getMsgTask = Promise.all(tasks());
  getMsgTask.then(res => {
    // 读取json
    const { data } = JSON.parse(
      fileServer.read(path.join(resourcePath, "./index.json")).toString()
    );
    // ... 此处省略对资讯 格式化内容
    // 写入资讯
    fileServer.write(
      path.join(resourcePath, "./index.json"),
      JSON.stringify({
        data: [
          {
            date: now,
            res
          },
          ...data
        ]
      })
    );
  });
};
