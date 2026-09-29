---
title: MiniMax 64K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-minimax04-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "M2-her 模型档位具备 64000 token 的上下文长度，这意味着在单次对话或任务处理中，模型可以接收和处理的输入文本量上限较高。引用上限 60000 token 限制了从知识库召回并送入模型进行引用的内容总量，这直接影响了知识库召回策略的设计。当前模型不支持图片输入和工具调用，因此基于图片"
language: zh
axis_model_tier: "MiniMax / 64000 /  / 60000 / false / false"
axis_vector_db: "Milvus"
covered_models: "M2-her"
check_day: 2026-09-29
meta_title: MiniMax 64K 上下文 这一档模型配 Milvus 的配置口径
meta_description: M2-her 模型档位具备 64000 token 的上下文长度，这意味着在单次对话或任务处理中，模型可以接收和处理的输入文本量上限较高。引用上限 60000 token 限制了从知识库召回并送入模型进行引用的内容总量，这直接影响了知识库召回策略的设计。当前模型不支持图片输入和工具调用，因此基于图片
date_published: 2026-09-29
date_modified: 2026-09-29
---

# MiniMax 64K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么
M2-her 模型档位具备 64000 token 的上下文长度，这意味着在单次对话或任务处理中，模型可以接收和处理的输入文本量上限较高。引用上限 60000 token 限制了从知识库召回并送入模型进行引用的内容总量，这直接影响了知识库召回策略的设计。当前模型不支持图片输入和工具调用，因此基于图片内容的问答或需要外部工具协作的功能将无法直接通过该模型实现，需要考虑其他链路或模型组合。单次最大输出长度未标注，但在实际应用中，通常会受到模型自身设计和下游应用界面展示的约束。

## 配 Milvus 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `MILVUS_ADDRESS` | `127.0.0.1:19530` 或 `cloud.milvus.io` | 连接 Milvus 服务的入口地址，确保 FastGPT 能正确找到 Milvus 实例。 |
| `MILVUS_TOKEN` | 需妥善保管的 API Key | Milvus Cloud 或启用认证的 Milvus 实例的访问凭证，保障数据安全。 |
| 索引类型 (`index_type`) | `HNSW` | HNSW 索引在召回性能和精确度之间提供了良好的平衡，适用于大多数 RAG 场景。 |
| 距离度量 (`metric_type`) | `IP` | 内积（Inner Product）距离度量在许多 embedding 模型中表现良好，尤其适用于语义相似度搜索。 |
| 召回条数 (`top_k`) | `10-15` | 结合模型引用上限和单段长度，旨在召回足够信息同时避免上下文溢出。 |
| 单段长度 (`chunk_size`) | `400-800` 字符 | 确保每段内容既包含足够上下文信息，又不会因过长而稀释核心语义或占用过多模型上下文。 |

## 这两者互相约束的地方
MiniMax M2-her 模型的 64000 token 上下文长度与 60000 token 引用上限，对 Milvus 的召回策略构成直接约束。召回条数 (`top_k`) 乘以每段长度 (`chunk_size`) 的总和必须远小于模型上下文长度，以预留出给用户查询和模型生成回答的空间。同时，这个总和也不能超过 60000 token 的引用上限。这意味着即使 Milvus 返回了大量相关结果，最终送入模型的引用内容也会受到上限的截断。Milvus 的索引参数，例如 `ef` 和 `M` (HNSW 索引参数)，其调大通常会提高召回的准确性，但这也会增加向量搜索的计算开销。在 FastGPT 中，提高召回准确性意味着模型接收到的信息质量更高，但如果召回的 token 总量超过模型引用上限，则增加的计算量可能无法完全转化为模型性能的显著提升，反而可能导致不必要的资源消耗。

## 容易做错的三处
*   日志中出现 `Milvus Connection Error: gRPC unavailable`：通常是 `MILVUS_ADDRESS` 配置错误或 Milvus 服务未正常运行。
*   模型返回的回答内容与知识库关联性差，但日志显示召回了大量段落：可能是 `chunk_size` 过大，导致每段语义不聚焦，或 `top_k` 设置过低未能覆盖足够信息。
*   FastGPT 界面显示“引用内容过长，已截断”：`top_k` 乘以 `chunk_size` 的总和超过了 MiniMax M2-her 模型的 60000 token 引用上限。

## 怎么确认配好了
*   通过 FastGPT 的调试界面，观察每次查询后 Milvus 返回的原始召回内容与数量，确认 `top_k` 生效。
*   在 FastGPT 的日志输出中，检查模型实际接收的引用 token 数量，确保其在 60000 token 引用上限内。
*   执行一系列测试问题，检查模型回答中引用的知识点是否准确、全面，并与 Milvus 召回的原始内容进行比对，评估 `HNSW` 和 `IP` 索引参数的实际效果。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
