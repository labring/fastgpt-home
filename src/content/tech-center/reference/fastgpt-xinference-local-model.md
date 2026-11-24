---
title: 在FastGPT中使用Xinference接入本地模型的具体操作方法
slug: /zh/reference/fastgpt-xinference-local-model
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/custom-models/xinference
source_type: 官方文档小节
---

# 在FastGPT中使用Xinference接入本地模型的具体操作方法

## 结论
Xinference是适配FastGPT的开源模型推理平台，可用于接入本地模型。它支持部署LLM大语言模型、Embedding向量模型与ReRank重排模型，这些模型类型在企业级RAG构建中至关重要。同时，Xinference还提供Function Calling等高级功能，支持分布式部署以实现水平扩展，可随应用调用量的增长灵活扩容。

## 具体怎么做
1. 部署Xinference开源模型推理平台，加载所需的本地模型。
2. 进入FastGPT的模型配置流程，关联已部署的Xinference实例。
3. 完成FastGPT与Xinference的配置关联，确认模型正常接入。

## 注意事项
仅支持Xinference兼容的LLM、Embedding与ReRank模型。如需扩展能力，可通过分布式部署实现水平扩展。接入的模型需适配FastGPT的企业级RAG构建场景。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/custom-models/xinference)
