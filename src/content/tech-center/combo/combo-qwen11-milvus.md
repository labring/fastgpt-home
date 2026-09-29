---
title: Qwen 1024K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-qwen11-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "这一档模型具备 1024000 token 的上下文长度（`maxContext`），这意味着单次对话中模型可以处理的海量信息输入。引用上限（`quoteMaxToken`）为 1000000 token，这是模型用于接收引用内容的预算，所有引用内容的总 token 数不得超过此限制。工具调用功能开"
language: zh
axis_model_tier: "Qwen / 1024000 /  / 1000000 / false / true"
axis_vector_db: "Milvus"
covered_models: "qwen3-coder-plus、qwen3-coder-flash"
check_day: 2026-09-29
meta_title: Qwen 1024K 上下文 这一档模型配 Milvus 的配置口径
meta_description: 这一档模型具备 1024000 token 的上下文长度（`maxContext`），这意味着单次对话中模型可以处理的海量信息输入。引用上限（`quoteMaxToken`）为 1000000 token，这是模型用于接收引用内容的预算，所有引用内容的总 token 数不得超过此限制。工具调用功能开
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Qwen 1024K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么
这一档模型具备 1024000 token 的上下文长度（`maxContext`），这意味着单次对话中模型可以处理的海量信息输入。引用上限（`quoteMaxToken`）为 1000000 token，这是模型用于接收引用内容的预算，所有引用内容的总 token 数不得超过此限制。工具调用功能开启，允许模型通过外部工具扩展能力。图片输入功能未开启，模型不直接处理图像信息。

## 配 Milvus 要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `MILVUS_ADDRESS` | `localhost:19530` 或 `milvus-service.default.svc.cluster.local:19530` | Milvus 服务端点，根据部署环境调整 |
| `MILVUS_TOKEN` | 按实测标定 | Milvus 访问凭证，确保安全连接 |
| `HNSW` `M` 参数 | `32` | 适用于大规模数据，平衡召回率与查询速度 |
| `HNSW` `efConstruction` 参数 | `200` | 影响索引构建时的图连接度，提升召回质量 |
| `IP` | `L2` 或 `COSINE` | 向量相似度度量方式，根据向量嵌入模型选择，通常为余弦相似度 |
| `recall_num` | `前 5 条` | 初始召回条数，用于初步过滤，后续由模型上下文预算决定实际使用量 |

## 这两者互相约束的地方
模型的上下文长度对向量召回的总量构成硬性约束，召回条数与每段内容的长度乘积，必须控制在模型的上下文预算之内。引用上限是模型处理引用内容的 token 预算，而向量库返回的是固定数量的段落。当每段内容较短时，引用上限允许更多段落被引用；当每段内容较长时，较少段落即可触及引用上限。索引参数如 `HNSW` 的 `efConstruction` 值调大，可以提高向量召回的准确性和多样性，为模型提供更丰富的语义信息。然而，这也会增加向量检索的计算开销，需要与模型推理速度和系统整体吞吐量进行权衡。

## 容易做错的三处
- 日志显示 `Milvus connection failed: rpc error: code = Unavailable`：`MILVUS_ADDRESS` 配置有误或 Milvus 服务未启动。
- 模型回答中引用内容明显不足，但检索结果显示有多条：`quoteMaxToken` 配置过低，导致实际引用内容被截断。
- 向量检索耗时过长，导致整个请求超时：`HNSW` 的 `efConstruction` 或 `efSearch` 参数设置过大，增加了检索复杂度。

## 怎么确认配好了
- 通过 FastGPT 界面执行一次知识库问答，检查日志中是否出现 `Milvus search successful`。
- 观察模型回答中引用内容的丰富程度，根据实际业务需求评估引用上限是否合理。
- 监控 Milvus 的查询延迟和 FastGPT 的整体响应时间，确保系统性能在可接受范围内。
- 在 FastGPT 知识库管理页面，上传具有代表性的文档，并测试不同关键词的检索效果，验证召回条数和相关性。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
