---
title: 解决FastGPT调用Azure OpenAI嵌入接口的适配与报错问题
slug: /zh/glossary/fastgpt-azure-openai-embeddings-issues
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/74
source_type: 官方文档
---

# 解决FastGPT调用Azure OpenAI嵌入接口的适配与报错问题

## 一句话定义
Azure OpenAI嵌入接口是FastGPT可集成的文本向量化服务，用于将输入文本转换为可供机器学习模型使用的向量数据。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
在FastGPT中配置该接口时，需关注input参数的格式与调用限流问题。当前FastGPT调用该接口时，input参数采用数组格式，而Azure OpenAI嵌入接口仅支持string类型的输入数据。当调用分段过多的文本时，会触发429 Too Many Requests报错，报错信息包含“Requests to the Get a vector representation of a given input that can be easily consumed by machine learning models and algorithms. Operation under Azure OpenAI API version 2023-03-15-preview have exceeded call rate limit of your current OpenAI S0 pricing tier. Please retry after 1 second”的完整内容。目前可通过提交PR修复input参数格式问题，或添加自动延迟重试、限制并发数的配置来解决该报错。

## 容易搞错的地方
容易误将FastGPT默认的数组格式input参数传入Azure OpenAI嵌入接口，导致接口调用失败。未针对高并发调用场景配置限流或重试机制，会触发调用频率超限的报错。未注意到Azure OpenAI嵌入接口对input参数类型的限制，会引发调用异常。此外，未匹配Azure OpenAI嵌入接口的指定API版本要求，也可能导致调用异常。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/74)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
