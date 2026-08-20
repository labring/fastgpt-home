---
title: FastGPT V4.6.8版本升级步骤与更新内容说明
slug: /zh/deploy/fastgpt-v468-upgrade-steps
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/468
source_type: 官方文档
---

# FastGPT V4.6.8版本升级步骤与更新内容说明

### V4.6.8版本更新内容
本次更新包含多项功能新增、优化与修复：新增知识库搜索合并模块与新的Http模块，后者支持灵活参数传入与输入输出自动数据类型转化，例如接口输出的JSON类型会自动转为字符串供其他模块使用，同时补充了相关示例。优化内容补全功能，将其内置到【知识库搜索】中，一次操作即可完成指代消除与问题扩展；优化LLM模型配置，不再区分对话、分类、提取模型，支持通过defaultConfig传入默认配置以避免参数冲突；优化流响应体验，让交互更丝滑，同时修复了此前的乱码、中断问题。修复语音输入文件无法上传、对话框重新生成无法使用的问题。
## Docker Compose部署升级步骤
需修改docker-compose.yml的Mongo配置部分，补充command与entrypoint配置：
```yaml
mongo:
  image: mongo:5.0.18 # 可选阿里云镜像：registry.cn-hangzhou.aliyuncs.com/fastgpt/mongo:5.0.18
  container_name: mongo
  ports:
    - 27017:27017
  networks:
    - fastgpt
  command: mongod --keyFile /data/mongodb.key --replSet rs0
  environment:
    # 需与原有密码保持一致
    - MONGO_INITDB_ROOT_USERNAME=username
    - MONGO_INITDB_ROOT_PASSWORD=password
  volumes:
    - ./mongo/data:/data/db
  entrypoint:
    - bash
    - -c
    - |
      openssl rand -base64 128 /data/mongodb.key
      chmod 400 /data/mongodb.key
      chown 999:999 /data/mongodb.key
      echo const isInited = rs.status().ok === 1 if(!isInited){ rs.initiate({ _id: rs0 , members: [ { _id: 0, host: mongo:27017 } ] }) } /data/initReplicaSet.js
      # 启动MongoDB服务
      exec docker-entrypoint.sh $@
      # 等待MongoDB服务启动
      until mongo -u myusername -p mypassword --authenticationDatabase admin --eval print( waited for connection ) /dev/null 2 1; do
        echo Waiting for MongoDB to start...
        sleep 2
      done
      # 执行初始化副本集的脚本
      mongo -u myusername -p mypassword --authenticationDatabase admin /data/initReplicaSet.js
      # 等待docker-entrypoint.sh脚本执行的MongoDB服务进程
      wait $!
```
修改完成后执行重启命令：`docker-compose down && docker-compose up -d`。
## 其他部署与初始化说明
Sealos部署无需更新Mongo配置，但需注意配置文件变更：原重复的LLM模型配置已合并为单一属性，旧版config.json配置说明不再维护，需参考最新模型配置方案。商业版用户需执行初始化操作以格式化团队信息，发起如下HTTP请求（替换{{rootkey}}为环境变量中的rootkey，{{host}}为商业版域名）：
```bash
curl --location --request POST https://{{host}}/api/init/v468 \
--header "rootkey: {{rootkey}}" \
--header "Content-Type: application/json"
```
该请求会初始化计费系统，内部使用场景可免费扩容存储容量。
> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/468)
