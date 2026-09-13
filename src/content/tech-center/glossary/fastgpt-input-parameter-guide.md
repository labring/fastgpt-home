---
title: FastGPT中input参数的含义、使用方法与注意事项
slug: /zh/glossary/fastgpt-input-parameter-guide
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/toc
source_type: 官方文档
---

# FastGPT中input参数的含义、使用方法与注意事项

## 一句话定义
input参数是FastGPT中用于承载待处理数据或交互输入内容的参数，在不同业务场景下有对应的格式要求。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
在FastGPT的应用构建流程中，可通过通用设置下的多个路径配置input相关功能，包括聊天输入引导（对应路径/guide/build/general/chat_input_guide）、文件输入（对应路径/guide/build/general/fileInput）、语音输入（对应路径/guide/build/general/voiceInput）。在调用embeddings接口时，FastGPT默认将input参数以数组格式传递数据，用于向模型提交待处理的文本内容。

## 容易搞错的地方
在调用azure openai embeddings接口时，FastGPT默认的数组格式input参数无法适配该接口的要求。azure openai embeddings接口明确要求input仅支持string类型的数据，若直接使用FastGPT默认的数组格式input参数，会导致接口调用失败，无法正常生成嵌入向量。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/toc)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
