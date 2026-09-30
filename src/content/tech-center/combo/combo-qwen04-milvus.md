---
title: Qwen 25K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-qwen04-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Qwen 25K 上下文模型档位，其上下文长度 `maxContext` 达 25000 token，这决定了单次请求中模型能处理的输入总容量，包括指令、历史对话、以及召回内容。引用上限 `quoteMaxToken` 为 20000 token，这是专门为引用内容预留的 token 预算，它限定了"
language: zh
axis_model_tier: "Qwen / 25000 /  / 20000 / true / true"
axis_vector_db: "Milvus"
covered_models: "qwen3-vl-flash、qwen3-vl-plus"
check_day: 2026-09-29
meta_title: Qwen 25K 上下文 这一档模型配 Milvus 的配置口径
meta_description: Qwen 25K 上下文模型档位，其上下文长度 `maxContext` 达 25000 token，这决定了单次请求中模型能处理的输入总容量，包括指令、历史对话、以及召回内容。引用上限 `quoteMaxToken` 为 20000 token，这是专门为引用内容预留的 token 预算，它限定了
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Qwen 25K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么

Qwen 25K 上下文模型档位，其上下文长度 `maxContext` 达 25000 token，这决定了单次请求中模型能处理的输入总容量，包括指令、历史对话、以及召回内容。引用上限 `quoteMaxToken` 为 20000 token，这是专门为引用内容预留的 token 预算，它限定了检索到的所有相关内容合计可以占据的最大 token 数。引用内容的总 token 数达到这个上限时，即使还有更多检索结果，也不会再被模型处理。段落条数由检索侧的返回条数决定。工具调用 `true` 和图片输入 `true` 意味着此档模型支持通过外部工具增强能力，并能够处理图像信息作为输入，这为多模态应用场景提供了基础。

## 配 Milvus 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `MILVUS_ADDRESS` | `milvus-cluster.svc.cluster.local:19530` | 指定 Milvus 服务地址，确保 FastGPT 能够正确连接。 |
| `MILVUS_TOKEN` | 按实测标定 | 用于 Milvus 认证，保障数据访问安全。 |
| 索引类型（`index_type`） | `HNSW` | `HNSW` 索引在召回质量与查询速度之间取得良好平衡，适合大型数据集。 |
| 相似度度量（`metric_type`） | `IP` | `IP`（Inner Product）适用于大部分文本嵌入场景，与许多预训练模型的嵌入方式匹配。 |
| `top_k` | `32` | 召回条数，用于在向量搜索中获取最相关的 K 条结果。 |
| `search_params` | `{"ef": 128}` | `ef` 参数决定 `HNSW` 索引的搜索精度，适当调高可提升召回效果。 |

## 这两者互相约束的地方

Qwen 25K 上下文模型与 Milvus 向量库的协同，核心在于对 token 预算与召回条数的精细管理。模型的上下文长度 `maxContext` 是总输入上限，而 `quoteMaxToken` 是引用内容的专属预算。召回条数（Milvus 返回的记录数量）与每段内容的平均 token 长度共同决定了引用内容的总 token 数。当每段内容较短时，可以在不触及 `quoteMaxToken` 的前提下召回更多条目；而当每段内容较长时，即使召回条数不多，也可能迅速达到 `quoteMaxToken` 上限。因此，引用上限按 token 计，向量库返回的按条数计，谁先触顶取决于每段内容的具体长度。Milvus 的索引参数，如 `HNSW` 的 `ef` 值调大，会提升召回的精确度，这意味着模型更有可能获得高质量的引用内容，但同时可能增加 Milvus 的查询延迟，需要在准确性与响应速度之间进行权衡。

## 容易做错的三处

*   FastGPT 界面提示“引用内容 token 溢出”，原因是 `quoteMaxToken` 设置过低或 Milvus 召回内容过长。
*   Milvus 连接超时或认证失败，FastGPT 日志显示“Milvus connection refused”，是 `MILVUS_ADDRESS` 或 `MILVUS_TOKEN` 配置错误。
*   模型回答缺乏相关性，但 Milvus 返回了大量结果，原因是 `top_k` 设置过高，导致召回了不相关内容，或 `metric_type` 不匹配文本嵌入的特性。

## 怎么确认配好了

*   通过 FastGPT 的调试模式，观察每次请求发送给模型的完整上下文，核对引用内容是否在 `quoteMaxToken` 限制内。
*   在 Milvus 客户端执行查询，检查 `top_k` 返回的向量数量和相似度分数是否符合预期，以验证索引和搜索参数的有效性。
*   在 FastGPT 知识库管理页面，上传测试文档，并进行 RAG 问答，观察模型回答是否准确引用了知识库内容，以评估整体召回效果。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
