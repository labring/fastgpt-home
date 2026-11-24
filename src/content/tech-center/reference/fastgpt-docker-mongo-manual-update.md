---
title: 完成Docker部署FastGPT的Mongo数据库手动更新
slug: /zh/reference/fastgpt-docker-mongo-manual-update
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/468
source_type: 官方文档小节
---

# 完成Docker部署FastGPT的Mongo数据库手动更新

## 结论
修改Docker部署的FastGPT对应的Mongo服务配置并重启容器，即可完成Mongo数据库的手动更新。操作需保证Mongo的根用户密码与原有配置保持一致。

## 具体怎么做
1. 编辑docker-compose.yml文件，修改mongo服务配置，补充command和entrypoint字段，完整配置如下：
```yaml
mongo:
  image: mongo:5.0.18
  # image: registry.cn-hangzhou.aliyuncs.com/fastgpt/mongo:5.0.18 # 阿里云
  container_name: mongo
  ports:
    - 27017:27017
  networks:
    - fastgpt
  command: mongod --keyFile /data/mongodb.key --replSet rs0
  environment:
    - MONGO_INITDB_ROOT_USERNAME=username
    - MONGO_INITDB_ROOT_PASSWORD=password
  volumes:
    - ./mongo/data:/data/db
  entrypoint:
    - bash
    - -c
    - |
      openssl rand -base64 128 > /data/mongodb.key
      chmod 400 /data/mongodb.key
      chown 999:999 /data/mongodb.key
      echo 'const isInited = rs.status().ok === 1
      if(!isInited){
      rs.initiate({
      _id: "rs0",
      members: [
      { _id: 0, host: "mongo:27017" }
      ]
      })
      }' > /data/initReplicaSet.js
      # 启动MongoDB服务
      exec docker-entrypoint.sh "$@" &
      # 等待MongoDB服务启动
      until mongo -u myusername -p mypassword --authenticationDatabase admin --eval "print('waited for connection')" > /dev/null 2>&1; do
      echo "Waiting for MongoDB to start..."
      sleep 2
      done
      # 执行初始化副本集的脚本
      mongo -u myusername -p mypassword --authenticationDatabase admin /data/initReplicaSet.js
      # 等待docker-entrypoint.sh脚本执行的MongoDB服务进程
      wait $!
```
2. 执行重启命令：
```bash
docker-compose down
docker-compose up -d
```

## 注意事项
1. 需确保MONGO_INITDB_ROOT_USERNAME和MONGO_INITDB_ROOT_PASSWORD与原有Mongo配置完全一致，否则会触发认证失败。
2. 请勿修改副本集名称rs0，否则会导致副本集初始化失败。
3. 端口27017需确保未被其他服务占用，避免启动冲突。
4. 生成的mongodb.key权限需保持为400，属主为999:999，否则MongoDB无法正常启动。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/468)
