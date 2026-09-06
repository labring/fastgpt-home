---
title: FastGPT中OneAPI联动配置与常见报错排查指南
slug: /zh/glossary/fastgpt-oneapi-debug-guide
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/113
source_type: 官方文档
---

# FastGPT中OneAPI联动配置与常见报错排查指南

## 一句话定义
OneAPI联动配置是FastGPT中通过配置指定环境变量实现与第三方API中转服务对接的配置项，同时指在FastGPT中配置对接OneAPI服务所需环境变量的操作。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
需在部署环境中配置两个核心环境变量：ONEAPI_URL为目标API中转服务的地址，格式示例为https://xxxxx.cloud.sealos.io/v1；ONEAPI_KEY为对应服务的API密钥。该配置用于替代默认的OpenAI官方API地址与密钥，完成配置后FastGPT的基础API对接流程可正常执行。配置完成后，FastGPT服务可正常运行，但账户信息页面的openaiKey字段无法直接填写ONEAPI_URL。

## 容易搞错的地方
一是在账户信息页面的openaiKey输入项无法填入ONEAPI_URL，会触发报错"Incorrect API key provided: sk- ***************************************D75e. You can find your API key at https://platform.openai.com/account/api-keys."。需明确环境变量配置与页面字段的用途差异，不可将环境变量的ONEAPI_URL填入页面的openaiKey字段中，否则会触发上述报错。二是调用/v1/dashboard/billing/subscription接口时，会出现报错"Your request to GET /v1/dashboard/billing/subscription must be made with a session key (that is, it can only be made from the browser). You made it with the following key type: secret."

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/113)
> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/113)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
