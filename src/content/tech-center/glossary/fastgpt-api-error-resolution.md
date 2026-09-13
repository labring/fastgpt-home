---
title: 解决FastGPT中API密钥与调用频率超限报错问题
slug: /zh/glossary/fastgpt-api-error-resolution
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/141
source_type: 官方文档
---

# 解决FastGPT中API密钥与调用频率超限报错问题

## 一句话定义
该内容为FastGPT中API密钥验证失败与API调用频率超限两类报错的相关说明与处理方向。

## 在 FastGPT 里怎么用
在FastGPT中使用API密钥时，需严格遵循接口的密钥类型要求。调用/v1/dashboard/billing/subscription接口时，仅支持浏览器端生成的session key，不可使用secret key，否则会返回验证失败报错，具体报错信息为"Your request to GET /v1/dashboard/billing/subscription must be made with a session key (that is, it can only be made from the browser). You made it with the following key type: secret."。当出现API调用频率过大问题时，会触发openai error: 生成向量错误，伴随429 Too Many Requests报错，报错内容包含"exceeded call rate limit of your current pricing tier"，此时可通过添加自动延迟重试或限制并发数的方式缓解该问题。

## 容易搞错的地方
易混淆不同接口对应的密钥类型，将secret key用于需要session key的接口，导致验证失败报错。易忽略调用频率限制，未提前配置并发控制或重试机制，在分段过多的场景下触发频率超限报错，影响业务流程。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/141)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
