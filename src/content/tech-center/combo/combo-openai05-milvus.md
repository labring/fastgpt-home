---
title: OpenAI 128K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-openai05-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "此档模型提供 128000 个 token 的上下文长度，决定了单次请求中模型可以处理的最大输入信息量，包括用户指令、系统指令以及检索到的内容。引用上限 60000 token，是模型在生成回答时，从检索结果中引用的内容所允许的最大 token 预算。这意味着模型在生成答案时，可以从检索到的信息中引"
language: zh
axis_model_tier: "OpenAI / 128000 /  / 60000 / true / true"
axis_vector_db: "Milvus"
covered_models: "gpt-4o-mini、gpt-4o"
check_day: 2026-09-29
meta_title: OpenAI 128K 上下文 这一档模型配 Milvus 的配置口径
meta_description: 此档模型提供 128000 个 token 的上下文长度，决定了单次请求中模型可以处理的最大输入信息量，包括用户指令、系统指令以及检索到的内容。引用上限 60000 token，是模型在生成回答时，从检索结果中引用的内容所允许的最大 token 预算。这意味着模型在生成答案时，可以从检索到的信息中引
date_published: 2026-09-29
date_modified: 2026-09-29
---

# OpenAI 128K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么
此档模型提供 128000 个 token 的上下文长度，决定了单次请求中模型可以处理的最大输入信息量，包括用户指令、系统指令以及检索到的内容。引用上限 60000 token，是模型在生成回答时，从检索结果中引用的内容所允许的最大 token 预算。这意味着模型在生成答案时，可以从检索到的信息中引用最多 60000 个 token 的内容。单次最大输出长度未明确标注，通常由模型动态调整以生成完整回答。支持图片输入和工具调用能力，使得模型能够处理多模态信息并执行外部函数。

## 配 Milvus 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `MILVUS_ADDRESS` | `localhost:19530` 或 `your_milvus_cluster_address:19530` | 生产环境需指向 Milvus 集群服务地址，确保网络可达。 |
| `MILVUS_TOKEN` | 按实测标定 | Milvus 身份验证凭据，确保访问安全。 |
| `index_type` | `HNSW` | 适用于高维向量的高效近似最近邻搜索，平衡查询速度与准确性。 |
| `metric_type` | `IP` | 适用于 OpenAI 模型 embedding 的内积相似度计算，与模型输出特性匹配。 |
| `nlist` for `IVF_FLAT`/`IVF_SQ8`/`IVF_PQ` (when used) | `1024` | 影响索引构建和查询性能，需根据数据量和查询需求调整。 |
| `nprobe` for `IVF_FLAT`/`IVF_SQ8`/`IVF_PQ` (when used) | `32` | 影响查询召回率和查询时间，值越大召回率越高但查询越慢。 |
| `M` for `HNSW` | `16` | HNSW 索引构建参数，影响图的连接度，值越大召回率越高但索引构建越慢。 |
| `efConstruction` for `HNSW` | `100` | HNSW 索引构建参数，影响索引质量，值越大索引越好但构建越慢。 |
| `ef` for `HNSW` | `64` | HNSW 查询参数，影响查询召回率，值越大召回率越高但查询越慢。 |

## 这两者互相约束的地方
模型上下文长度与向量库检索结果的匹配至关重要。128000 token 的上下文预算，要求检索到的内容总和不能超过此限制。引用上限 60000 token 是对最终引用内容的预算，而向量库返回的是按条计数的段落。因此，召回条数与每段内容的平均 token 数共同决定了引用内容的总体 token 消耗。如果每段内容较长，即使召回条数不多，也可能迅速触及引用上限。反之，若每段内容短小，则可以召回更多条目。索引参数如 HNSW 的 `ef` 值调大，会提高检索召回率，意味着向量库可能返回更多或更相关的段落。这在模型引用上限允许的范围内，有助于模型获取更全面的信息，但也可能导致检索结果的总 token 量增加，需要注意控制，避免超出模型的上下文长度。

## 容易做错的三处
*   日志显示 `Milvus connection error: [Errno 111] Connection refused`。原因通常是 `MILVUS_ADDRESS` 配置错误或 Milvus 服务未启动。
*   检索结果为空或返回条数远低于预期。原因可能是向量库中没有匹配的向量，或查询参数设置过于严格，例如 `nprobe` 值过小，导致召回不足。
*   模型回答出现“引用内容过长”或截断现象。原因在于检索到的所有段落合计 token 量超出模型的引用上限 `quoteMaxToken`，或超出整体上下文长度 `maxContext`。

## 怎么确认配好了
*   执行一次包含检索的查询，检查 Milvus 日志中是否有查询请求，并确认返回的段落数量和内容符合预期。
*   在 FastGPT 界面上观察模型输出，确认回答中引用的内容是否准确、完整，并且没有出现截断。
*   通过 FastGPT 的调试工具或日志，检查每次模型调用的 `total_tokens` 和 `completion_tokens`，确保检索内容和模型输出的总 token 量在模型限制范围内。
*   进行多次不同复杂度的查询，评估检索响应时间和模型生成回答的延迟，确保系统性能满足需求。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
