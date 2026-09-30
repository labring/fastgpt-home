---
title: AntLing 64K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-antling06-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "AntLing 的 64K 上下文模型，其 `maxContext` 为 64000 token，表示模型单次处理的输入总长度。引用上限 `quoteMaxToken` 为 60000 token，这部分预算专用于承载从向量库检索到的内容。这意味着在构建模型输入时，留给指令和历史对话的 token "
language: zh
axis_model_tier: "AntLing / 64000 /  / 60000 / false / false"
axis_vector_db: "Milvus"
covered_models: "Ring-mini-2.0"
check_day: 2026-09-29
meta_title: AntLing 64K 上下文 这一档模型配 Milvus 的配置口径
meta_description: AntLing 的 64K 上下文模型，其 `maxContext` 为 64000 token，表示模型单次处理的输入总长度。引用上限 `quoteMaxToken` 为 60000 token，这部分预算专用于承载从向量库检索到的内容。这意味着在构建模型输入时，留给指令和历史对话的 token
date_published: 2026-09-29
date_modified: 2026-09-29
---

# AntLing 64K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么
AntLing 的 64K 上下文模型，其 `maxContext` 为 64000 token，表示模型单次处理的输入总长度。引用上限 `quoteMaxToken` 为 60000 token，这部分预算专用于承载从向量库检索到的内容。这意味着在构建模型输入时，留给指令和历史对话的 token 空间相对有限。模型不支持图片输入和工具调用，因此基于该模型构建的应用不应依赖这些能力，也不必为此预留资源或设计相关功能。单次最大输出未标注，通常需要通过实际测试来确定其回答长度的上限，并在应用层进行必要的截断或分页处理。

## 配 Milvus 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :----- | :----- | :----------- |
| `MILVUS_ADDRESS` | `milvus-service:19530` | 生产环境建议使用内部服务名和端口，确保网络可达性与稳定性。 |
| `MILVUS_TOKEN` | 按 Milvus 部署的安全策略设置 | 用于认证，确保 FastGPT 客户端有权限访问 Milvus 服务。 |
| `index_type` | `HNSW` | HNSW 在高召回率和查询性能之间取得了良好平衡，适用于大多数 RAG 场景。 |
| `metric_type` | `IP` | 向量相似度计算采用内积（Inner Product），与 OpenAI 等模型嵌入向量的特性匹配。 |
| 检索条数 | `30-50` 条 | 经验值，旨在提供充足的上下文，同时避免单次检索结果过大。 |
| 每段召回字符数 | `500-800` 字符 | 兼顾信息密度和 token 预算，避免单段内容过长或过短。 |

## 这两者互相约束的地方
模型的 `maxContext` 为 64000 token，其中 `quoteMaxToken` 占用了 60000 token 的预算。向量库返回的是固定数量的条目，每条包含一定长度的文本。当检索到的条目总数乘以每条的平均 token 数超过 `quoteMaxToken` 时，即便向量库返回了更多条目，也只有部分内容能被模型实际接收。因此，检索条数和每段召回字符数的组合需要精确控制，以确保召回内容既能充分利用 `quoteMaxToken` 预算，又不会因过长而被截断。例如，如果每段平均 500 token，那么最多能引用 120 段。索引参数如 `HNSW` 的 `ef` 或 `M` 值调大，可以提高召回精度，但会增加索引构建和查询的计算开销。对于 64K 上下文的模型，高精度的召回有助于在有限的 token 预算内提供更相关的信息。

## 容易做错的三处
*   日志中出现 `Milvus connection refused` 或 `19530: connection refused` 错误，原因是 `MILVUS_ADDRESS` 配置错误或 Milvus 服务未启动。
*   模型输出内容相关性差，但 Milvus 返回的向量数量正常，原因是 `metric_type` 未设为 `IP`，导致相似度计算不匹配嵌入向量特征。
*   FastGPT 界面显示“引用内容过长，已自动截断”，但 Milvus 实际返回的条数并不多，原因是单段召回字符数过大，导致少量段落已超出 `quoteMaxToken`。

## 怎么确认配好了
*   通过 FastGPT 的调试功能，查看 Milvus 实际返回的向量条数和每条内容的长度，并确认与配置预期一致。
*   在 FastGPT 中进行多次问答测试，观察模型输出的引用来源是否准确、相关，并确认引用内容没有因超出 `quoteMaxToken` 而被截断。
*   监控 Milvus 服务的日志和指标，确认查询延迟、内存使用率等在可接受范围内，无大量错误日志输出，尤其关注 `search` 和 `query` 相关的操作。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
