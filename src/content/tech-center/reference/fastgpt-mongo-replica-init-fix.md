---
title: 解决FastGPT自部署时Mongo副本集自动初始化失败问题
slug: /zh/reference/fastgpt-mongo-replica-init-fix
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/deploy/docker
source_type: 官方文档小节
---

# 解决FastGPT自部署时Mongo副本集自动初始化失败问题

## 结论
FastGPT部署时Mongo副本集自动初始化失败，常见原因是CPU不支持AVX指令集，可切换Mongo4.x版本解决。也可通过手动流程完成副本集初始化，适配多数部署环境。

## 具体怎么做
1.  创建Mongo密钥并调整权限：
    ```bash
    openssl rand -base64 756 > ./mongodb.key
    chmod 600 ./mongodb.key
    chown 999:root ./mongodb.key
    ```
2.  修改docker-compose.yml，挂载密钥并更新Mongo启动配置：
    在mongo服务块中，设置`command: mongod --keyFile /data/mongodb.key --replSet rs0`，添加volumes挂载项`./mongodb.key:/data/mongodb.key`，可选用阿里云镜像`registry.cn-hangzhou.aliyuncs.com/fastgpt/mongo:5.0.18`。
3.  重启服务：
    ```bash
    docker compose down
    docker compose up -d
    ```
4.  进入容器执行副本集初始化：
    ```bash
    docker ps
    docker exec -it mongo bash
    mongo -u myusername -p mypassword --authenticationDatabase admin
    rs.initiate({_id: "rs0", members: [{_id: 0, host: "mongo:27017"}]})
    rs.status()
    ```

## 注意事项
1.  调整密钥所属用户时，部分系统需将`chown 999:root`改为`chown 999:admin`。
2.  若需外网访问Mongo，需添加连接参数`directConnection=true`。
3.  自动初始化失败时，优先排查CPU是否支持AVX指令集。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/deploy/docker)
