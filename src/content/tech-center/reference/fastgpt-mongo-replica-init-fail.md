---
title: 解决FastGPT自托管部署Mongo副本集自动初始化失败问题
slug: /zh/reference/fastgpt-mongo-replica-init-fail
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host
source_type: 官方文档小节
---

# 解决FastGPT自托管部署Mongo副本集自动初始化失败问题

## 结论
FastGPT部署中Mongo副本集自动初始化失败，多数情况是CPU不支持AVX指令集，可切换Mongo4.x版本解决。若自动初始化仍失败，可通过手动步骤初始化副本集。

## 具体怎么做
1.  创建并配置Mongo密钥：
    ```bash
    openssl rand -base64 756 > ./mongodb.key
    chmod 600 ./mongodb.key
    chown 999:root ./mongodb.key
    ```
2.  修改`docker-compose.yml`的Mongo服务配置，挂载密钥：
    ```yaml
    mongo:
      # image: mongo:5.0.18
      # image: registry.cn-hangzhou.aliyuncs.com/fastgpt/mongo:5.0.18 # 阿里云
      container_name: mongo
      ports:
        - 27017:27017
      networks:
        - fastgpt
      command: mongod --keyFile /data/mongodb.key --replSet rs0
      environment:
        - MONGO_INITDB_ROOT_USERNAME=myusername
        - MONGO_INITDB_ROOT_PASSWORD=mypassword
      volumes:
        - ./mongo/data:/data/db
        - ./mongodb.key:/data/mongodb.key
    ```
3.  重启服务：
    ```bash
    docker compose down
    docker compose up -d
    ```
4.  进入容器初始化副本集：
    - 查看容器运行状态：`docker ps`
    - 进入容器：`docker exec -it mongo bash`
    - 连接数据库：`mongo -u myusername -p mypassword --authenticationDatabase admin`
    - 执行初始化命令：
      ```javascript
      rs.initiate({
        _id: "rs0",
        members: [
          { _id: 0, host: "mongo:27017" }
        ]
      })
      ```
    - 检查状态：`rs.status()`，提示`rs0`状态则初始化成功。若需外网访问，需添加Mongo连接参数`directConnection=true`。

## 注意事项
该方案在Ubuntu20/22、CentOS7、WSL2、Mac、Windows环境均通过测试。配置Mongo密钥时，需确保权限为`chmod 600`，所有者可设置为`999:root`，部分系统需调整为`admin`。初始化时需使用配置的用户名和密码，若仍无法启动，优先排查CPU是否支持AVX指令集，可切换Mongo4.x版本。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host)
