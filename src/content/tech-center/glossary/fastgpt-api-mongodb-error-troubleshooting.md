---
title: FastGPT使用中两类常见运行报错排查指南
slug: /zh/glossary/fastgpt-api-mongodb-error-troubleshooting
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/141
source_type: 官方文档
---

# FastGPT使用中两类常见运行报错排查指南

## 一句话定义
本页内容针对FastGPT使用中出现的API密钥类型错误与MongoDB事务报错进行说明。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
调用GET /v1/dashboard/billing/subscription接口时，仅可使用会话密钥（session key）发起请求。当使用secret类型的API密钥调用该接口时，会触发指定报错。当执行知识库URL导入操作时，若出现报错文本“Transaction numbers are only allowed on a replica set member or mongos”，需检查MongoDB的部署配置。该报错出现在私有部署版本4.6.8的场景中，且导入文档操作可正常执行，仅URL导入操作触发该MongoDB报错。

## 容易搞错的地方
易混淆会话密钥与secret密钥的使用场景，误将secret密钥用于需要会话密钥的接口请求，会触发指定的API调用报错。MongoDB未配置为副本集或未使用mongos路由，会导致知识库URL导入时触发事务相关报错。配置环节中可能忽略MongoDB的副本集要求，从而引发该报错。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/141)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
