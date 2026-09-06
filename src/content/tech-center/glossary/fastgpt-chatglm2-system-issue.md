---
title: 解决FastGPT中ChatGLM2-6B的system消息失效问题
slug: /zh/glossary/fastgpt-chatglm2-system-issue
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/233
source_type: 官方文档
---

# 解决FastGPT中ChatGLM2-6B的system消息失效问题

## 一句话定义
在FastGPT中，ChatGLM2-6B的system消息是用于向模型传递系统提示的消息字段，在多system结构的prompt场景下存在处理异常。
## 在 FastGPT 里怎么用
使用本地部署的ChatGLM2-6B模型，通过执行python openai_api.py命令启动模型服务，在知识库问答流程中向模型传入包含多层system结构的prompt。
## 容易搞错的地方
使用本地ChatGLM2-6B并通过python openai_api.py启动时，该API仅会拼接第一个system消息，无法正确处理多system结构的prompt，知识库嵌入的知识与额外system prompt无法生效，仅第一个system的内容与用户问题进行拼接，进而引发知识库问答失效的问题。
> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/233)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
