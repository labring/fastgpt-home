---
title: FastGPT自定义模型请求地址的配置与使用说明
slug: /zh/glossary/fastgpt-custom-model-request-url
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/config/model/intro
source_type: 官方文档
---

# FastGPT自定义模型请求地址的配置与使用说明

## 一句话定义
自定义请求地址是FastGPT中可绕过内置模型渠道，直接向指定地址发起模型请求的配置项，需配合自定义请求Key使用，且需遵循对应模型的接口格式要求。

## 在 FastGPT 里怎么用
进入模型配置环节，填写自定义请求地址，需填写完整的请求地址。不同模型类型对应固定格式：LLM为[host]/v1/chat/completions，Embedding为[host]/v1/embeddings，STT为[host]/v1/audio/transcriptions，TTS为[host]/v1/audio/speech，Rerank为[host]/v1/rerank。同时填写自定义请求Key，发起请求时会携带Authorization: Bearer 自定义请求Key的请求头。LLM、Embedding、STT、TTS接口需遵循OpenAI API格式，Rerank接口需遵循Cohere格式。

## 容易搞错的地方
调用Embeddings接口时，FastGPT的input参数采用数组格式，若适配Azure OpenAI embeddings这类仅支持string类型input的接口，会出现调用不兼容的问题。需严格按照对应模型类型的格式填写请求地址，不可省略路径部分。ReRank接口不可混用OpenAI格式，需遵循指定的Cohere格式。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/config/model/intro)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
