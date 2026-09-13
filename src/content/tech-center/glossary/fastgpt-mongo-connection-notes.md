---
title: 说明FastGPT中Mongo数据库的连接配置与适配要点
slug: /zh/glossary/fastgpt-mongo-connection-notes
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/dev
source_type: 官方文档
---

# 说明FastGPT中Mongo数据库的连接配置与适配要点

## 一句话定义
Mongo是FastGPT部署运行所需的核心数据库，用于支撑系统的数据存储需求。

## 在 FastGPT 里怎么用
本地开发启动FastGPT依赖时，需切换至FastGPT/deploy/dev目录，执行`docker compose up -d`命令启动Mongo等依赖。若无法获取官方镜像，可使用`docker compose -f docker-compose.cn.yml up -d`命令。连接Mongo副本集数据库时，需在连接地址中增加`directConnection=true`参数。在4.14.5及以上版本中，对话日志接口已适配Mongo 4.x语法。

## 容易搞错的地方
容易遗漏Mongo副本集连接所需的`directConnection=true`参数，导致无法正常连接数据库。在Mongo 4.x版本环境下，旧版本的对话日志接口可能出现适配异常，需升级至4.14.5及以上版本修复该问题。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/dev)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
