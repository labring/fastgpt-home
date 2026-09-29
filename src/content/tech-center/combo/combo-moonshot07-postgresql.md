---
title: Moonshot 32K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-moonshot07-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Moonshot 32K 上下文模型提供了 32000 token 的上下文长度，这意味着在单次对话中可以处理较长的输入和历史对话，或容纳更多召回的知识内容。其引用上限同样为 32000 token，这直接决定了知识库召回的段落总长度。模型支持图片输入，允许在对话中处理视觉信息，为多模态应用提供了基"
language: zh
axis_model_tier: "Moonshot / 32000 /  / 32000 / true / true"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "moonshot-v1-32k-vision-preview"
check_day: 2026-09-29
meta_title: Moonshot 32K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: Moonshot 32K 上下文模型提供了 32000 token 的上下文长度，这意味着在单次对话中可以处理较长的输入和历史对话，或容纳更多召回的知识内容。其引用上限同样为 32000 token，这直接决定了知识库召回的段落总长度。模型支持图片输入，允许在对话中处理视觉信息，为多模态应用提供了基
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Moonshot 32K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
Moonshot 32K 上下文模型提供了 32000 token 的上下文长度，这意味着在单次对话中可以处理较长的输入和历史对话，或容纳更多召回的知识内容。其引用上限同样为 32000 token，这直接决定了知识库召回的段落总长度。模型支持图片输入，允许在对话中处理视觉信息，为多模态应用提供了基础。工具调用能力的具备则意味着可以集成外部服务和自定义逻辑，扩展模型的功能边界。单次最大输出未明确标注，通常会根据实际交互和模型内部限制动态调整，但通常会小于上下文长度，避免一次性生成过长响应。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :----- | :------- | :----------- |
| `PG_URL` | `postgresql://user:password@host:port/database` | FastGPT 连接 PostgreSQL 数据库的必要参数，确保数据库可访问。 |
| `ef_construction` | `64` – `128` | 决定 HNSW 索引构建时的邻居搜索宽度，影响索引质量与构建速度。较高的值能提升召回准确率。 |
| `ef_search` | `64` – `128` | 决定 HNSW 索引查询时的邻居搜索宽度，影响召回准确率与查询延迟。应根据实际查询需求和性能指标进行调优。 |
| `m` | `32` | HNSW 索引中每个节点的最大连接数。较大的值可以提高召回质量，但会增加索引大小和查询时间。 |
| `vector_ip_ops` | `true` | 启用内积操作，当向量距离计算采用内积时，可提升性能。 |
| 召回条数 | `10` – `20` 条 | 根据模型上下文长度和单段文本平均长度估算，避免超出模型上下文限制。 |

## 这两者互相约束的地方
Moonshot 32K 模型的上下文长度与引用上限直接影响了从 PostgreSQL（pgvector）召回的知识段落数量和每段长度。当从向量库检索出多条结果时，这些结果的总 token 数（召回条数 × 每段平均 token 数）必须控制在 32000 token 的上下文预算之内。如果向量库返回的条数过多，或者单条内容过长，超出了引用上限，模型将无法完全利用所有召回信息。在这种情况下，引用上限会先生效，截断超出部分的引用内容。PostgreSQL（pgvector）的索引参数，如 `ef_construction` 和 `ef_search`，调大可以提高召回的准确性，这意味着模型能够获得更高质量的匹配内容，从而提升生成回复的相关性。但同时，更高的索引参数也可能增加查询延迟和资源消耗，需要权衡。

## 容易做错的三处
*   日志显示 `Context window exceeded`：原因可能是召回的知识段落总长度加上用户输入和历史对话的总 token 数超过了 32000 的上下文限制。
*   模型回复中知识引用不全或缺失：原因可能是 PostgreSQL（pgvector）返回的条数虽然足够，但单条内容过长导致总 token 数超出模型 32000 的引用上限，或 FastGPT 侧设置的召回条数过低。
*   查询等待时间过长或出现 `504 Gateway Timeout`：原因可能是 PostgreSQL（pgvector）的 `ef_search` 参数设置过高，导致查询计算量大，或者数据库服务器资源不足。

## 怎么确认配好了
*   在 FastGPT 知识库管理界面，上传文档后，进行一次测试查询，检查返回的知识段落是否与预期相关，并核对召回条数是否符合配置。
*   通过 FastGPT 的调试模式，观察模型实际接收到的上下文 token 数量，确保召回内容未被截断，且总 token 数在 32000 范围内。
*   监控 PostgreSQL 数据库的查询日志和性能指标，特别是查询延迟（`pg_stat_statements`），确认 `ef_search` 和 `ef_construction` 参数设置下的查询性能符合预期。
*   针对典型查询场景，进行多次端到端测试，评估模型回复的质量和引用内容的准确性，并根据业务需求设定合格阈值。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
