---
title: 解决FastGPT部署中数据库初始化连接失败的问题
slug: /zh/glossary/fastgpt-database-connection-error
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/1218
source_type: 官方文档
---

# 解决FastGPT部署中数据库初始化连接失败的问题

## 一句话定义
该数据库指FastGPT依赖的MySQL存储系统，用于承载One API组件的运行数据，初始化失败指无法建立到该数据库的网络连接错误。
## 在FastGPT里怎么用
在部署FastGPT的One API组件时，需配置MySQL数据库的访问IP与端口。组件启动后，系统会自动尝试初始化数据库连接。若配置或网络存在问题，会触发固定格式的报错。具体报错文本为：`failed to initialize database, got error dial tcp [IP]:[端口]: connect: connection refused`。其中出现过的端口包括3306与33066，IP示例为172.118.0.5、192.168.176.5。
## 容易搞错的地方
配置的数据库IP或端口与实际运行的MySQL服务不匹配，会导致连接被拒绝。部署环境的网络策略可能阻止容器到数据库的端口访问，引发报错。未提前启动MySQL数据库服务，也会导致组件启动时无法建立连接。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1218)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
