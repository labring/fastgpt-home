---
title: Moonshot 128K 上下文 这一档模型配 openGauss 的配置口径
slug: /zh/combo/combo-moonshot05-opengauss
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`moonshot-v1-128k` 模型提供了 128000 的上下文长度，这意味着在单次对话中可以处理远超常规模型的输入信息量。引用上限 60000 规定了知识库召回内容在提交给模型时，其字符总数不能超过此限制，这直接影响了 RAG（检索增强生成）场景下可引用的知识片段数量。由于图片输入为 `f"
language: zh
axis_model_tier: "Moonshot / 128000 /  / 60000 / false / true"
axis_vector_db: "openGauss"
covered_models: "moonshot-v1-128k"
check_day: 2026-09-29
meta_title: Moonshot 128K 上下文 这一档模型配 openGauss 的配置口径
meta_description: `moonshot-v1-128k` 模型提供了 128000 的上下文长度，这意味着在单次对话中可以处理远超常规模型的输入信息量。引用上限 60000 规定了知识库召回内容在提交给模型时，其字符总数不能超过此限制，这直接影响了 RAG（检索增强生成）场景下可引用的知识片段数量。由于图片输入为 `f
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Moonshot 128K 上下文 这一档模型配 openGauss 的配置口径

## 这一档模型的参数意味着什么
`moonshot-v1-128k` 模型提供了 128000 的上下文长度，这意味着在单次对话中可以处理远超常规模型的输入信息量。引用上限 60000 规定了知识库召回内容在提交给模型时，其字符总数不能超过此限制，这直接影响了 RAG（检索增强生成）场景下可引用的知识片段数量。由于图片输入为 `false`，此模型不直接处理图像数据，因此在多模态应用中需要额外的前处理层。工具调用能力为 `true`，表明该模型能够与外部工具进行交互，支持更复杂的 Agent 工作流。

## 配 openGauss 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `OPENGAUSS_URL` | `postgresql://user:password@host:port/database` | FastGPT 连接 openGauss 数据库的标准连接字符串，确保网络可达性。 |
| `ef_construction` | `100` | 构建 HNSW 索引时的邻居数量，影响索引质量和构建速度。过低可能导致召回率下降，过高增加构建时间。 |
| `ef_search` | `60` | 查询 HNSW 索引时的邻居数量，影响查询速度和召回率。此值应大于或等于 `k` (实际召回条数)。 |
| `m = 32` | `32` | HNSW 算法中每个节点的最大连接数，影响索引的内存占用和查询性能。 |
| 召回条数 | `10-20` | 根据引用上限和单段平均长度，权衡召回质量与上下文窗口占用。 |
| 单段最大长度 | `500-1000 字符` | 确保每段内容足够完整，同时避免单段过长导致上下文浪费。 |

## 这两者互相约束的地方
`moonshot-v1-128k` 模型的 128000 上下文长度和 60000 的引用上限，与 openGauss 向量库的召回策略紧密相关。向量库返回的召回条数乘以每段的平均字符长度，其总和必须低于模型的上下文预算。同时，这个总和还需低于模型的引用上限。在实际应用中，引用上限通常会是更严格的限制。如果 openGauss 的索引参数 `ef_construction` 和 `ef_search` 设置得较高，虽然可能提升向量召回的准确性，但也会增加索引构建和查询的时间成本。对于 `moonshot-v1-128k` 这样上下文预算充裕的模型，高质量的召回能更好地利用其处理能力，但过高的召回条数可能触及引用上限，导致部分召回内容被截断或忽略。

## 容易做错的三处
*   日志显示 `Context window exceeded`：召回条数过多或单段长度过长，导致提交给模型的总字符数超过 128000。
*   RAG 模式下回答空泛或不准确：`ef_search` 设置过低，导致向量检索的召回质量差，未能提供相关性高的知识片段。
*   知识库问答响应时间过长：`ef_construction` 或 `ef_search` 设置过高，导致 openGauss 在构建索引或执行查询时耗时过长。

## 怎么确认配好了
*   在 FastGPT 界面测试，观察模型回答中引用内容的准确性和完整性，判断召回条数和单段长度是否合理。
*   通过 FastGPT 的调试功能，检查提交给 `moonshot-v1-128k` 模型的实际输入 token 数量，确保未超出 128000 的上限。
*   监控 openGauss 数据库的查询日志，分析向量查询的平均响应时间，评估 `ef_search` 参数对性能的影响。
*   在 FastGPT 中进行多轮对话测试，验证模型在不同查询场景下，结合 openGauss 知识库的回答质量。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
