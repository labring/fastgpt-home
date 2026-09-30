---
title: Hunyuan 28K 上下文 这一档模型配 openGauss 的配置口径
slug: /zh/combo/combo-hunyuan03-opengauss
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Hunyuan 28K 上下文模型系列，包括 `hunyuan-large` 和 `hunyuan-turbo`，其 28000 的上下文长度决定了单次请求中模型能处理的输入文本总量，包括用户查询、系统指令和从知识库召回的内容。这意味着在 RAG 场景下，知识库召回内容的总字符数需严格控制在此限制内"
language: zh
axis_model_tier: "Hunyuan / 28000 /  / 20000 / false / false"
axis_vector_db: "openGauss"
covered_models: "hunyuan-large、hunyuan-turbo"
check_day: 2026-09-29
meta_title: Hunyuan 28K 上下文 这一档模型配 openGauss 的配置口径
meta_description: Hunyuan 28K 上下文模型系列，包括 `hunyuan-large` 和 `hunyuan-turbo`，其 28000 的上下文长度决定了单次请求中模型能处理的输入文本总量，包括用户查询、系统指令和从知识库召回的内容。这意味着在 RAG 场景下，知识库召回内容的总字符数需严格控制在此限制内
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Hunyuan 28K 上下文 这一档模型配 openGauss 的配置口径

## 这一档模型的参数意味着什么
Hunyuan 28K 上下文模型系列，包括 `hunyuan-large` 和 `hunyuan-turbo`，其 28000 的上下文长度决定了单次请求中模型能处理的输入文本总量，包括用户查询、系统指令和从知识库召回的内容。这意味着在 RAG 场景下，知识库召回内容的总字符数需严格控制在此限制内。模型单次最大输出未标注，通常表示其输出长度由上下文预算和具体任务决定，但实际应用中仍需考虑网络传输和应用层面的截断。20000 的引用上限，则为知识库召回的段落数量设定了天花板，即使向量库返回更多结果，模型也只会处理最多 20000 个引用。此外，缺少图片输入和工具调用能力，明确了此档模型主要用于纯文本理解和生成任务，不涉及多模态或复杂工具链协同。

## 配 openGauss 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `OPENGAUSS_URL` | `postgresql://user:password@host:port/database` | FastGPT 连接 openGauss 数据库的通用格式。 |
| `ef_construction` | `100` | 构建 HNSW 索引时的邻居数量，影响索引质量和构建时间。此值在 `16` 到 `512` 之间，过高会增加构建开销。 |
| `ef_search` | `64` | 查询 HNSW 索引时的搜索路径长度，影响召回精度和查询速度。此值应大于等于 `k` (召回条数)，过低可能导致召回不全。 |
| `m` | `32` | HNSW 索引中每个节点的最大连接数，影响索引结构和查询性能。此值在 `4` 到 `64` 之间，过高会增加内存占用。 |
| `chunk_size` | `800–1200 字符` | 知识库分段时的文本长度，需考虑模型上下文和单段语义完整性。 |
| `top_k` | `5–10` | 向量检索时返回的条数，需结合引用上限和上下文长度调整。 |

## 这两者互相约束的地方
模型上下文长度与向量库召回内容紧密相关。Hunyuan 28K 上下文的限制意味着，召回条数乘以每段长度（`chunk_size`）的总和，必须小于 28000 字符，否则超出部分将被截断或导致模型处理失败。20000 的引用上限是模型层面强制执行的，即使 openGauss 向量库根据 `top_k` 返回了 15 条结果，如果模型引用上限是 10 条，最终也只会有 10 条内容进入模型。因此，`top_k` 的设置应与模型的引用上限相匹配，且不宜过高，以避免不必要的向量检索开销。openGauss 中 `ef_construction` 和 `ef_search` 等索引参数的调整，直接影响向量检索的效率和质量。当这些参数调大时，通常能获得更高的召回准确率，但这也会增加索引构建时间和查询延迟，对于对实时性要求较高的场景，需要权衡。

## 容易做错的三处
*   日志中出现 `Context window exceeded` 错误码：这是因为知识库召回内容总长度加上用户查询超过了 28000 字符的上下文限制。
*   查询结果相关性差，但实际知识库中存在相关内容：可能 `ef_search` 值设置过低，导致向量检索未能充分探索索引，从而错过相关度高的结果。
*   知识库上传或更新时耗时过长，或存储空间异常增长：`ef_construction` 或 `m` 值设置过高，导致 HNSW 索引构建过于密集，增加了计算和存储开销。

## 怎么确认配好了
*   执行一次包含多段知识库引用的大查询，检查模型实际接收的 token 数量是否在 28000 限制内。
*   通过 FastGPT 后台的 RAG 调试工具，验证向量库返回的 `top_k` 条数与模型最终引用的条数是否符合预期，特别是当引用上限低于 `top_k` 时。
*   监控 openGauss 数据库的 CPU 和内存使用率，在典型负载下，确保 `ef_construction` 和 `ef_search` 的配置不会导致资源瓶颈。
*   针对一组已知查询，评估召回内容的准确性和完整性，必要时调整 `chunk_size`、`ef_construction` 和 `ef_search` 参数，直至召回效果达到业务需求。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
