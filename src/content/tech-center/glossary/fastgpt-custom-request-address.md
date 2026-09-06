---
title: 介绍FastGPT自定义请求地址的配置与使用规范
slug: /zh/glossary/fastgpt-custom-request-address
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/config/model/intro
source_type: 官方文档
---

# 介绍FastGPT自定义请求地址的配置与使用规范

## 一句话定义
自定义请求地址是FastGPT中可绕过模型渠道，直接向指定地址发起模型类请求的配置项，需遵循对应模型的接口格式要求。

## 在 FastGPT 里怎么用
需填写完整的自定义请求地址，不同模型类型对应固定请求路径：LLM模型使用`[host]/v1/chat/completions`，Embedding模型使用`[host]/v1/embeddings`，STT模型使用`[host]/v1/audio/transcriptions`，TTS模型使用`[host]/v1/audio/speech`，Rerank模型使用`[host]/v1/rerank`。同时需配置自定义请求Key，请求时将携带`Authorization: Bearer xxx`请求头。LLM、Embedding等多数接口遵循OpenAI提供的模型格式，Rerank模型遵循Cohere的格式。

## 容易搞错的地方
配置时需填写完整请求地址，不可仅填写主机地址。不同模型类型的请求路径不可混用。Rerank模型的接口格式与多数模型不同，需遵循指定的重排序模型格式。若出现类似`Bad Gateway: Invalid response object from API: '{"code":500,"message":"Post \"http://xxx\": dial tcp xxx: connect: connection refused"}'`的报错，需检查自定义请求地址的连通性。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/config/model/intro)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
