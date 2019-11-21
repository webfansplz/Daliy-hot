<!-- https://yeasy.gitbooks.io/docker_practice/container/attach_exec.html -->

## 使用镜像

### 获取镜像

```code
docker pull [选项] [Docker Registry 地址[:端口号]/]仓库名[:标签]
```

### 列出镜像

```code
docker image ls
```

### 删除本地镜像

```code
docker image rm [选项] <镜像1> [<镜像2> ...]
```

### 构建镜像

```code
  docker build -t [name] .
```

## 操作容器

### 查看容器

```code

docker container ls

// -a 可以看到终止状态的容器

docker container ls -a
```

### 启动容器

```code
docker run ubuntu:18.04 /bin/echo 'Hello world'
// 例: 启动容器，并将容器的/home/todayHot映射到宿主机的/data/example目录下,便于代码发布 -p <宿主端口>:<容器端口>
docker run --name [指定容器名] -d -v /data/example:/home/todayHot -p 3000:3000 [镜像名]

```

### 终止容器

```code
docker container stop id
```

### 进入容器

```code
docker exec -it 69d1 /bin/sh
```

### 查看输出信息

```code
docker container logs [container ID or NAMES]
```

## Dockerfile 简解

### FROM 指定基础镜像

```code
FROM node
```

### RUN 执行命令

```code
RUN mkdir -p /usr/src/redis
```

### COPY 复制文件

- COPY [--chown=<user>:<group>] <源路径>... <目标路径>

- COPY [--chown=<user>:<group>]["<源路径1>",... "<目标路径>"]

```code
COPY package.json /usr/src/app/
```

### EXPOSE 声明端口

- 格式为 EXPOSE <端口 1> [<端口 2>...]

> EXPOSE 指令是声明运行时容器提供服务端口，这只是一个声明，在运行时并不会因为这个声明应用就会开启这个端口的服务。在 Dockerfile 中写入这样的声明有两个好处，一个是帮助镜像使用者理解这个镜像服务的守护端口，以方便配置映射；另一个用处则是在运行时使用随机端口映射时，也就是 docker run -P 时，会自动随机映射 EXPOSE 的端口。

> 要将 EXPOSE 和在运行时使用 -p <宿主端口>:<容器端口> 区分开来。-p，是映射宿主端口和容器端口，换句话说，就是将容器的对应端口服务公开给外界访问，而 EXPOSE 仅仅是声明容器打算使用什么端口而已，并不会自动在宿主进行端口映射。

### WORKDIR 指定工作目录

- 格式为 WORKDIR <工作目录路径>。

> 使用 WORKDIR 指令可以来指定工作目录（或者称为当前目录），以后各层的当前目录就被改为指定的目录，如该目录不存在，WORKDIR 会帮你建立目录。
