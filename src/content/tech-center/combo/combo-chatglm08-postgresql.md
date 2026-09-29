---
title: ChatGLM 1000K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-chatglm08-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`glm-4-long` 模型具备 1000000 的上下文长度，这意味着在单次交互中可以容纳极大量的输入信息。引用上限为 900000 token，这部分预算专用于承载从知识库检索到的相关内容，以辅助模型生成回答。引用内容的 token 总量受此限制。模型单次最大输出未明确标注，因此实际输出长度会"
language: zh
axis_model_tier: "ChatGLM / 1000000 /  / 900000 / false / false"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "glm-4-long"
check_day: 2026-09-29
meta_title: ChatGLM 1000K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: `glm-4-long` 模型具备 1000000 的上下文长度，这意味着在单次交互中可以容纳极大量的输入信息。引用上限为 900000 token，这部分预算专用于承载从知识库检索到的相关内容，以辅助模型生成回答。引用内容的 token 总量受此限制。模型单次最大输出未明确标注，因此实际输出长度会
date_published: 2026-09-29
date_modified: 2026-09-29
---

# ChatGLM 1000K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
`glm-4-long` 模型具备 1000000 的上下文长度，这意味着在单次交互中可以容纳极大量的输入信息。引用上限为 900000 token，这部分预算专用于承载从知识库检索到的相关内容，以辅助模型生成回答。引用内容的 token 总量受此限制。模型单次最大输出未明确标注，因此实际输出长度会根据具体应用和提示词设计而有所不同。当前模型不支持图片输入和工具调用功能，因此在设计应用时无需考虑这两方面扩展。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `PG_URL` | `postgresql://user:password@host:port/database` | FastGPT 连接 PostgreSQL 数据库的必要参数，确保数据库可访问。 |
| `ef_construction` | `64` | HNSW 索引构建参数，影响索引质量和构建速度。`64` 是在查询性能与索引构建时间之间取得平衡的常用值。 |
| `ef_search` | `64` | HNSW 索引查询参数，影响查询召回率和查询速度。`64` 通常能提供良好的召回效果，同时保持合理查询延迟。 |
| `m` (HNSW索引参数) | `32` | HNSW 索引中每个节点的最大连接数。`32` 是一个常见且有效的取值，平衡了索引大小和查询性能。 |
| `vector_ip_ops` | `true` | pgvector 扩展使用内积（inner product）进行向量相似度计算，适用于某些嵌入模型。 |
| `max_connections` | `100` | PostgreSQL 数据库的最大并发连接数，需根据 FastGPT 部署的并发量调整。 |

## 这两者互相约束的地方
`glm-4-long` 模型极长的上下文长度（1000000 token）为整合大量检索内容提供了空间。然而，引用上限（`quoteMaxToken` 900000 token）是引用内容的总 token 预算。PostgreSQL（pgvector）返回的是离散的向量条目，每条内容在转化为 token 后计入引用上限。向量库返回的条数与引用上限是两个独立维度：当每段内容较短时，可能在达到引用上限前已返回大量条目；当每段内容较长时，少量条目就可能触及引用上限。因此，需要根据实际内容长度和模型引用上限来确定合适的召回条数。PostgreSQL（pgvector）的 `ef_construction` 和 `ef_search` 参数调大，意味着 HNSW 索引在构建时会更密集，查询时会探索更广的邻居，从而提升召回率和精度。对于 `glm-4-long` 这样能处理长上下文的模型，更高的召回精度有助于充分利用其上下文能力，提供更准确的回答。

## 容易做错的三处
*   日志中出现 `ERROR: could not open extension control file "pgvector.control"`，原因是 pgvector 扩展未正确安装或未在 `shared_preload_libraries` 中配置。
*   FastGPT 返回的引用内容为空，但模型仍能生成回答，原因是 pgvector 检索到的向量相似度过低，未达到 FastGPT 内部设定的召回阈值。
*   查询响应时间过长，甚至超时，原因是 PostgreSQL（pgvector）的 HNSW 索引参数 `ef_search` 设置过大，导致查询时需要遍历的节点过多。

## 怎么确认配好了
*   在 FastGPT 知识库管理界面，上传一批文档后，检查日志中是否有 pgvector 相关的索引构建成功信息，并确认向量数量与文档段落数匹配。
*   通过 FastGPT 的知识库测试功能，输入测试问题，观察返回的引用内容是否相关且数量适中，并确保查询延迟在可接受范围内。阈值应根据实际业务场景对响应时间的要求来确定。
*   使用 PostgreSQL 客户端连接数据库，执行 `SELECT * FROM pg_stat_activity WHERE datname = 'your_database_name';` 检查 FastGPT 与数据库的连接是否稳定，连接数是否在 `max_connections` 限制内。
*   在 FastGPT 中进行多次问答测试，观察模型回答中引用内容的准确性和完整性，确保模型能够有效利用 pgvector 检索到的信息。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
