---
title: FastGPT本地开发项目的初始配置操作说明
slug: /zh/reference/fastgpt-local-dev-init-config
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/dev
source_type: 官方文档小节
---

# FastGPT本地开发项目的初始配置操作说明

## 结论
本节介绍FastGPT本地开发项目的初始配置流程，涵盖环境变量与配置文件的生成方法，以及关键参数的调整规则。完成该配置后即可推进本地开发，多数场景无需修改默认参数。

## 具体怎么做
1. 确认当前工作路径：执行`pwd`命令，输出需包含`FastGPT/projects/app`。
2. 生成环境变量文件：执行`cp .env.template .env.local`，仅修改`.env.local`文件中的变量即可，变量说明参考`.env.template`。若未修改`docker-compose.yaml`，可使用默认变量值，否则需保持与`docker-compose.yaml`中的变量一致。
3. 生成配置文件：执行`cp data/config.json data/config.local.json`，配置参数说明可参考官方`config`配置说明。
4. 按需调整`systemEnv`下的关键参数：
   - `vectorMaxProcess`：向量生成最大进程，2c4g服务器通常设置10~15
   - `qaMaxProcess`：QA生成最大进程
   - `vlmMaxProcess`：图片理解模型最大进程
   - `hnswEfSearch`：向量搜索参数，仅对PG和OB生效，值越大搜索精度越高但速度越慢

## 注意事项
1. 所有操作需在`projects/app`路径下执行，否则会出现路径错误。
2. 仅修改`.env.local`和`data/config.local.json`文件，原模板文件无需改动。
3. 若修改过`docker-compose.yaml`中的变量，需同步更新`.env.local`中的对应变量，保持一致。
4. `data/config.local.json`多数场景无需修改，仅需按需调整上述四个参数。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/dev)
