---
title: FastGPT V4.6.8版本升级操作与更新内容说明
slug: /zh/deploy/fastgpt-v468-upgrade-steps-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/468
source_type: 官方文档
---

# FastGPT V4.6.8版本升级操作与更新内容说明

## 版本更新核心内容
本次更新新增知识库搜索合并模块与新的HTTP模块：新HTTP模块支持灵活参数传入、自动数据类型转换（如接口输出JSON自动转为字符串供其他模块使用），并补充了示例文档。优化内容包括：将内容补全内置到【知识库搜索】中，一次完成指代消除与问题扩展；去除重复的模型配置，LLM模型合并为一个属性，不再区分对话、分类、提取模型，支持通过defaultConfig传入默认参数避免参数冲突；流响应体验更加丝滑。修复了语音输入文件无法上传、对话框重新生成无法使用的问题。需注意，旧版config.json配置说明不再维护，当前版本需参考最新的模型配置方案。

## 部署升级操作步骤
### Docker Compose部署
需手动更新Mongo配置，修改docker-compose.yml的mongo部分，补充command和entrypoint配置：
```yaml
mongo:
  image: mongo:5.0.18 # 或使用阿里云镜像 registry.cn-hangzhou.aliyuncs.com/fastgpt/mongo:5.0.18
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
          members: [ { _id: 0, host: "mongo:27017" } ]
        })
      }' > /data/initReplicaSet.js
      exec docker-entrypoint.sh $@
      until mongo -u myusername -p mypassword --authenticationDatabase admin --eval "print('waited for connection')" > /dev/null 2>&1; do
        echo "Waiting for MongoDB to start..."
        sleep 2
      done
      mongo -u myusername -p mypassword --authenticationDatabase admin /data/initReplicaSet.js
      wait $!
```
配置完成后，需执行`docker-compose down`和`docker-compose up -d`重启Mongo服务。注意：环境变量中的Mongo用户名和密码必须与旧版配置一致，否则将无法正常连接数据库。

### Sealos部署
无需更新Mongo配置，直接完成版本升级即可。

## 商业版额外初始化操作
商业版用户需执行初始化操作以格式化团队信息，发起如下HTTP请求：
```bash
curl --location --request POST "https://{{host}}/api/init/v468" \
--header "rootkey: {{rootkey}}" \
--header "Content-Type: application/json"
```
其中`{{rootkey}}`需替换为环境变量中的rootkey，`{{host}}`需替换为商业版部署的域名，执行请求后将初始化计费系统。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/468
