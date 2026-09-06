---
title: 解决FastGPT部署配置错误与API调用超限问题
slug: /zh/glossary/fastgpt-deploy-api-error-handling
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/152
source_type: 官方文档
---

# 解决FastGPT部署配置错误与API调用超限问题

## 一句话定义
涵盖FastGPT部署时的环境变量配置要求与API调用超限的问题及处理方向。

## 在 FastGPT 里怎么用
使用Kubernetes部署时，需配置MONGODB_URI、PG_URL、CHAT_API_KEY、ROOT_KEY、DEFAULT_ROOT_PSW这几个环境变量，其中CHAT_API_KEY与ROOT_KEY需提供有效值。当出现分段过多导致的API调用频率过大问题时，可通过添加自动延迟重试或限制并发数的方式处理。

## 容易搞错的地方
部署时若未正确设置CHAT_API_KEY或ROOT_KEY等密钥类环境变量，会触发secretOrPrivateKey must have a value when login的登录报错。当处理向量生成类API调用时，若输入分段过多，会触发429 Too Many Requests报错，提示超出当前OpenAI S0定价层的调用速率限制。

> [FastGPT GitHub issue 152](https://github.com/labring/FastGPT/issues/152), [FastGPT GitHub issue 209](https://github.com/labring/FastGPT/issues/209)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
