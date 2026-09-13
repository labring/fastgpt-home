---
title: FastGPT自定义模型与工具请求地址的配置说明
slug: /zh/deploy/fastgpt-custom-request-config
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/config/model/intro
source_type: 官方文档
---

# FastGPT自定义模型与工具请求地址的配置说明

当填写自定义请求地址时，可绕过FastGPT内置的模型渠道，直接向指定地址发起请求。该功能支持LLM、Embedding、STT、TTS、Rerank五类接口的自定义配置，各类接口需使用匹配的完整请求地址格式，示例如下：
- LLM接口：`[host]/v1/chat/completions`
- Embedding接口：`[host]/v1/embeddings`
- STT接口：`[host]/v1/audio/transcriptions`
- TTS接口：`[host]/v1/audio/speech`
- Rerank接口：`[host]/v1/rerank`

### 配置核心参数与步骤
配置过程需填写两项关键内容：
1. 自定义请求地址：需严格使用上述对应接口的完整路径格式，确保地址完整可用。
2. 自定义请求Key：发起请求时，将携带`Authorization: Bearer xxx`请求头完成身份验证，其中`xxx`为配置的自定义请求Key内容。

### 接口格式规范
所有LLM、Embedding、STT、TTS类接口均遵循OpenAI提供的模型格式，可参考OpenAI官方API文档完成配置。由于OpenAI未提供ReRank模型的官方标准，Rerank接口遵循Cohere格式，可通过[接口请求示例](../../troubleshooting/model-errors.mdx)查看具体请求格式。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/config/model/intro)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
