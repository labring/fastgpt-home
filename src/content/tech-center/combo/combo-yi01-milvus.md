---
title: Yi 16K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-yi01-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`yi-lightning` 模型具备 16000 token 的上下文长度，这意味着在单次对话中，模型可以处理包含历史对话、用户输入及检索内容的较长文本。引用上限为 12000 token，这限制了知识库召回内容在上下文中的最大占比。模型不支持图片输入，因此无法直接处理视觉信息。同时，不支持工具调"
language: zh
axis_model_tier: "Yi / 16000 /  / 12000 / false / false"
axis_vector_db: "Milvus"
covered_models: "yi-lightning"
check_day: 2026-09-29
meta_title: Yi 16K 上下文 这一档模型配 Milvus 的配置口径
meta_description: `yi-lightning` 模型具备 16000 token 的上下文长度，这意味着在单次对话中，模型可以处理包含历史对话、用户输入及检索内容的较长文本。引用上限为 12000 token，这限制了知识库召回内容在上下文中的最大占比。模型不支持图片输入，因此无法直接处理视觉信息。同时，不支持工具调
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Yi 16K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么
`yi-lightning` 模型具备 16000 token 的上下文长度，这意味着在单次对话中，模型可以处理包含历史对话、用户输入及检索内容的较长文本。引用上限为 12000 token，这限制了知识库召回内容在上下文中的最大占比。模型不支持图片输入，因此无法直接处理视觉信息。同时，不支持工具调用，表明其不具备通过外部工具扩展能力或执行复杂任务的机制，对话过程主要依赖于模型本身的生成能力和知识库检索结果。

## 配 Milvus 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :----- | :----- | :----- |
| `MILVUS_ADDRESS` | `milvus.svc.cluster.local:19530` | Kubernetes 集群内部服务发现地址，确保 FastGPT 能正确连接 Milvus。 |
| `MILVUS_TOKEN` | 按实测标定 | 用于 Milvus 访问控制，保障数据安全。 |
| `HNSW` `efConstruction` | `64` | `HNSW` 索引构建参数，平衡索引构建速度与查询精度。 |
| `HNSW` `M` | `16` | `HNSW` 索引邻居节点数量，影响查询召回的准确性。 |
| `IP` | `L2` | 向量相似度度量方式，适用于多数文本嵌入模型，追求语义距离。 |
| 召回条数 | `3-5` 条 | 结合模型引用上限和单段召回长度，避免超出上下文预算。 |

## 这两者互相约束的地方
模型 16000 token 的上下文长度是总预算，其中 12000 token 是知识库引用上限。这意味着召回条数与每段召回内容的长度乘积不应超过 12000 token。如果单段召回内容过长，即使召回条数较少也可能迅速耗尽引用预算。Milvus 的召回条数设置与模型的引用上限是共同生效的，最终送入模型的知识内容受两者中最严格的那个限制。当 Milvus 的索引参数如 `HNSW` 的 `M` 和 `efConstruction` 值调大时，通常会提高向量检索的召回精度，从而为模型提供更相关的上下文信息。然而，这也可能增加索引构建时间或查询延时，需要根据实际业务场景进行权衡。

## 容易做错的三处
- 日志显示 `Milvus connection failed: [Errno 111] Connection refused`：原因可能是 `MILVUS_ADDRESS` 配置错误或 Milvus 服务未启动。
- 对话模型返回内容缺乏知识库信息，或信息不相关：原因可能是 Milvus 召回条数过少，或者 `HNSW` 索引参数设置不当导致召回精度低。
- 知识库内容未被模型采纳，回答简短：原因可能是召回内容总长度超出 12000 token 的引用上限，导致部分内容被截断。

## 怎么确认配好了
- 在 FastGPT 后台，配置 Milvus 连接后，执行一次知识库导入操作，确认无报错且数据写入成功。
- 针对知识库中的一个典型问题，进行一次对话测试，观察模型是否能正确引用知识库内容，并检查引用的具体段落。
- 持续进行多轮对话测试，监控模型上下文使用情况，确保知识库引用内容的总长度未频繁触及 12000 token 的引用上限。
- 通过 Milvus 客户端或 Grafana 等监控工具，观察 Milvus 服务的查询 QPS、延迟等指标，确认其运行稳定且查询性能符合预期。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
