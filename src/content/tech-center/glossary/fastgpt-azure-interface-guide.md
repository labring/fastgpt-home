---
title: FastGPT调用微软Azure接口的适配与使用说明
slug: /zh/glossary/fastgpt-azure-interface-guide
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/74
source_type: 官方文档
---

# FastGPT调用微软Azure接口的适配与使用说明

## 一句话定义
FastGPT中对接微软Azure系列接口时的参数规则与功能适配要求，涵盖Embeddings接口与语音播报接口的使用规范。

## 在 FastGPT 里怎么用
首先完成微软Azure接口的配置，配置完成后可使用语音播报功能，支持通过下拉菜单选择播音员音色，同时支持下载生成的音频文件，适用场景包括语音播报、文字转语音类语音产品。调用Azure OpenAI Embeddings接口时，需严格遵循接口的输入参数格式要求，确保调用流程同时符合FastGPT与Azure接口的规则。

## 容易搞错的地方
FastGPT默认调用Azure OpenAI Embeddings接口时，传入的input参数采用数组格式。而Azure OpenAI Embeddings接口的input参数仅支持string类型的数据，该参数格式不匹配会直接导致接口调用失败，属于高频出现的配置与调用错误。此外，配置微软语音接口时，需确认功能适配范围，确保可正常使用音色选择与音频下载功能。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/74)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
