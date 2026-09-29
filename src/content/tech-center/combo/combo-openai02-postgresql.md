---
title: OpenAI 400K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-openai02-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "此档模型，如 `gpt-5.4-mini`、`gpt-5.3-codex`，其 400000 的上下文长度，为一次对话中可输入给模型的内容总量设定了上限，这直接决定了FastGPT在RAG（检索增强生成）流程中能够携带的召回文档片段数量。引用上限 350000 意味着模型在生成回复时，可以引用的知识"
language: zh
axis_model_tier: "OpenAI / 400000 /  / 350000 / true / true"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "gpt-5.4-mini、gpt-5.4-nano、gpt-5.3-codex、gpt-5.2、gpt-5.2-pro、gpt-5.1、gpt-5、gpt-5-pro、gpt-5-mini、gpt-5-nano"
check_day: 2026-09-29
meta_title: OpenAI 400K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: 此档模型，如 `gpt-5.4-mini`、`gpt-5.3-codex`，其 400000 的上下文长度，为一次对话中可输入给模型的内容总量设定了上限，这直接决定了FastGPT在RAG（检索增强生成）流程中能够携带的召回文档片段数量。引用上限 350000 意味着模型在生成回复时，可以引用的知识
date_published: 2026-09-29
date_modified: 2026-09-29
---

# OpenAI 400K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
此档模型，如 `gpt-5.4-mini`、`gpt-5.3-codex`，其 400000 的上下文长度，为一次对话中可输入给模型的内容总量设定了上限，这直接决定了FastGPT在RAG（检索增强生成）流程中能够携带的召回文档片段数量。引用上限 350000 意味着模型在生成回复时，可以引用的知识库段落总量存在一个实际的天花板。尽管单次最大输出未明确标注，但通常会与上下文长度保持一定比例，影响最终回答的详细程度。图片输入能力的 `true` 表示支持多模态输入，允许在提示中包含图像信息，拓展了Agent处理复杂任务的边界。工具调用能力的 `true` 则表明模型能够与外部工具集成，执行特定操作，增强了Agent的自动化能力。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `PG_URL` | `postgresql://user:password@host:port/database` | FastGPT 连接 PostgreSQL 数据库的必要凭据。 |
| `ef_construction` | `100` | 影响 HNSW 索引构建时的图连接数，越大召回质量越高，构建时间越长。 |
| `ef_search` | `60` | 影响 HNSW 索引查询时的图遍历深度，越大召回质量越高，查询耗时越长。 |
| `m = 32` | `32` | HNSW 索引每层最大连接数，影响索引大小和查询性能。 |
| `vector_ip_ops` | `true` | 启用 IP 距离（内积）计算，适用于嵌入向量的相似度度量。 |
| 召回条数 | `20–30` | 经验值，平衡召回质量与上下文长度限制，避免不必要的 token 消耗。 |

## 这两者互相约束的地方
此档模型 400000 的上下文长度是核心约束。在 RAG 流程中，召回条数与每条召回内容的平均长度之积必须远小于此上限，以确保模型有足够的空间处理指令、问题及历史对话。例如，若每条召回内容平均 1000 字符，召回 30 条则占用 30000 字符，这在 400000 的上限内是可行的。引用上限 350000 对最终模型引用的知识段落数量设定了硬性限制，FastGPT 内部的引用逻辑会在此限制下进行截断或筛选。PostgreSQL（pgvector） 的 `ef_search` 参数决定了向量检索的精度和速度，当 `ef_search` 调大时，向量库返回的潜在相关条目会更多，这可能导致 FastGPT 在处理召回结果时需要进行额外的筛选，以符合模型的上下文和引用上限。过高的 `ef_search` 可能增加查询延迟，但提高了召回的准确性，需要与模型的处理能力进行权衡。

## 容易做错的三处
*   日志显示 `Context window exceeded`：原因在于召回的文档内容总长度加上用户提问和历史对话，超出了模型 400000 的上下文限制。
*   模型回复中未引用知识库内容或引用不完整：原因可能是向量库返回的相关条数不足或相关性不高，导致模型无法提取有效信息进行引用。
*   向量搜索请求超时或查询速度慢：原因可能是 `ef_search` 或 `ef_construction` 参数设置过高，导致 PostgreSQL（pgvector） 在处理大规模向量数据时计算量过大。

## 怎么确认配好了
*   进行端到端测试，观察 FastGPT Agent 在复杂问题下的回复是否准确、流畅，并能有效引用知识库内容。
*   监控 FastGPT 请求日志中的 `token` 使用量，确保每次请求的 `token` 总量稳定在模型 400000 上下文长度的合理范围内。
*   在 FastGPT 界面上，检查模型引用知识库的条数和内容，确保与预期的召回条数和引用上限相符。
*   使用 PostgreSQL（pgvector） 的 `EXPLAIN ANALYZE` 命令分析向量查询语句，确认 `ef_search` 参数设置下查询耗时是否满足业务需求。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
