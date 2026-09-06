---
title: FastGPT中ECONNREFUSED连接报错的问题排查说明
slug: /zh/glossary/fastgpt-econnrefused-error
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/216
source_type: 官方文档
---

# FastGPT中ECONNREFUSED连接报错的问题排查说明

## 一句话定义
ECONNREFUSED是FastGPT部署运行中出现的连接被拒绝的网络报错，典型提示格式为`connect ECONNREFUSED [IP]:[端口]`，如`connect ECONNREFUSED 127.0.0.1:5432`或`connect ECONNREFUSED 172.19.0.2:15432`。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
该报错出现于Docker Compose部署的FastGPT场景中，触发时机为版本升级（如4.0升级至4.2）后，访问知识库或删除知识库时。报错信息包含具体的目标连接IP与端口，如`127.0.0.1:5432`或`172.19.0.2:15432`，用于定位对应服务的连接异常。

## 容易搞错的地方
使用Docker Compose部署FastGPT时，易误以为未修改配置文件就不会出现配置错误，升级版本后未排查对应服务的启动状态，导致该连接被拒绝的报错出现。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/216)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
