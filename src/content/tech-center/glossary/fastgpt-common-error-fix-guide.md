---
title: 解决FastGPT API调用超限与登录密钥配置错误问题
slug: /zh/glossary/fastgpt-common-error-fix-guide
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/152
source_type: 官方文档
---

# 解决FastGPT API调用超限与登录密钥配置错误问题

## 一句话定义
本内容针对FastGPT运行中出现的API调用频率超限报错与登录密钥缺失错误提供解决方案

## 在 FastGPT 里怎么用
在API调用频率超限场景中，当输入分段过多时会触发该问题，报错信息为openai error: 生成向量错误，429 Too Many Requests，具体报错内容包含Azure OpenAI API版本2023-03-15-preview下S0定价层调用速率超限的提示，可通过添加自动延迟重试或限制并发数解决该问题。在Kubernetes部署FastGPT时，需配置以下环境变量：MONGODB_URI、PG_URL、CHAT_API_KEY、ROOT_KEY、DEFAULT_ROOT_PSW。当出现报错文本"secretOrPrivateKey must have a value when login"时，说明登录所需的密钥环境变量未正确配置。

## 容易搞错的地方
容易搞错的地方包括：未意识到输入分段过多会增加API调用次数，进而触发速率限制；Kubernetes部署时遗漏必要的环境变量配置，导致登录密钥缺失报错；未关注调用速率限制提示，未及时调整重试策略或配额。

> [FastGPT GitHub issue 152](https://github.com/labring/FastGPT/issues/152), [FastGPT GitHub issue 209](https://github.com/labring/FastGPT/issues/209)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
