---
title: FastGPT V4.6.8版本升级操作与功能说明
slug: /zh/deploy/upgrade-v4-6-8
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/468
source_type: 官方文档
---

# FastGPT V4.6.8版本升级操作与功能说明

## 这个版本改了什么
V4.6.8版本包含多项功能新增、优化与修复。新增知识库搜索合并模块，新增支持灵活参数传入的Http模块，该模块可实现输入输出自动数据类型转化，例如接口输出的JSON类型会自动转成字符串类型供其他模块使用，同时补充了相关示例。优化内容补全功能，将其内置到【知识库搜索】中，一次完成指代消除和问题扩展。优化LLM模型配置，不再区分对话、分类、提取模型，支持通过defaultConfig传入默认配置，避免不同模型参数冲突。优化流响应体验，此前反馈的乱码、中断问题可得到修复。修复语音输入文件无法上传、对话框重新生成无法使用的问题。此外，该版本去除了重复的模型配置，LLM模型合并到一个属性中，旧版config.json配置说明不再维护，需参考新的模型配置方案。商业版用户需执行初始化操作格式化团队信息。

## 升级前要确认的事
需根据部署方式确认对应事项。Docker部署用户需确认MongoDB的初始用户名与密码与当前使用的一致，提前准备修改docker-compose.yml文件。Sealos部署用户无需处理MongoDB相关更新。所有用户需提前备份当前部署的配置文件与数据，商业版用户需获取环境变量中的rootkey与商业版域名。

## 升级步骤（照做）
### Docker部署
1. 修改docker-compose.yml的mongo部分，添加command和entrypoint配置，完整配置如下：
```yml
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
    # 这里密码注意要和以前的一致
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
2. 重启MongoDB，执行以下命令：
```bash
docker-compose down
docker-compose up -d
```
### Sealos部署
无需更新MongoDB配置，直接修改配置文件并参考新的模型配置方案更新。
### 商业版初始化
执行以下HTTP请求，将{{rootkey}}替换为环境变量中的rootkey，{{host}}替换为商业版域名：
```bash
curl --location --request POST 'https://{{host}}/api/init/v468' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```

## 升级后怎么验证
1. 验证MongoDB副本集状态：进入MongoDB容器，执行`rs.status()`命令，查看返回结果中ok字段值为1，代表副本集初始化成功。2. 功能验证：访问系统，测试知识库搜索、Http模块调用、语音文件上传、对话框重新生成功能是否正常。3. 商业版用户验证：检查计费系统是否完成初始化，内部使用的免费存储配额是否正常调整。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/468)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
