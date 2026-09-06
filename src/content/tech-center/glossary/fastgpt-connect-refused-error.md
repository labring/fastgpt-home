---
title: FastGPT中connect ECONNREFUSED报错的排查说明
slug: /zh/glossary/fastgpt-connect-refused-error
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/216
source_type: 官方文档
---

# FastGPT中connect ECONNREFUSED报错的排查说明

## 一句话定义
connect ECONNREFUSED是FastGPT运行过程中提示目标网络端口无法建立连接的报错信息。

## 在 FastGPT 里怎么用
该报错常见于docker compose部署的FastGPT，升级版本后访问知识库或调用API时触发。报错文本格式为`connect ECONNREFUSED [目标IP]:[端口]`，例如`connect ECONNREFUSED 127.0.0.1:5432`，或包含`connect: connection refused`的提示内容，如调用API时出现的`Post "http://region-9.autodl.pro:20943/v1/chat/completions?retry=0": dial tcp 36.139.225.141:20943: connect: connection refused`。

## 容易搞错的地方
部分用户使用docker compose部署且未修改配置文件，升级版本后出现该报错，会误以为配置无错误。实际该报错表示FastGPT无法连接到指定端口的服务，需检查对应端口的服务是否正常运行，以及网络配置是否匹配当前部署环境。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/216)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
