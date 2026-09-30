---
title: Ernie 64K 上下文 这一档模型配 openGauss 的配置口径
slug: /zh/combo/combo-ernie02-opengauss
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Ernie 64K 上下文模型，其 `maxContext` 达 64000 token，意味着单次请求可处理的信息量非常大，能够容纳更长的用户输入和更多的召回内容。`引用上限` 为 55000 token，这是 FastGPT 在整合召回内容时，为引用部分预留的 token 预算。它不直接限制召回"
language: zh
axis_model_tier: "Ernie / 64000 /  / 55000 / false / true"
axis_vector_db: "openGauss"
covered_models: "ernie-x1.1-preview、ernie-x1.1"
check_day: 2026-09-29
meta_title: Ernie 64K 上下文 这一档模型配 openGauss 的配置口径
meta_description: Ernie 64K 上下文模型，其 `maxContext` 达 64000 token，意味着单次请求可处理的信息量非常大，能够容纳更长的用户输入和更多的召回内容。`引用上限` 为 55000 token，这是 FastGPT 在整合召回内容时，为引用部分预留的 token 预算。它不直接限制召回
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Ernie 64K 上下文 这一档模型配 openGauss 的配置口径

## 这一档模型的参数意味着什么
Ernie 64K 上下文模型，其 `maxContext` 达 64000 token，意味着单次请求可处理的信息量非常大，能够容纳更长的用户输入和更多的召回内容。`引用上限` 为 55000 token，这是 FastGPT 在整合召回内容时，为引用部分预留的 token 预算。它不直接限制召回的段落数量，而是限制所有引用内容的总长度。`工具调用 true` 允许模型利用外部工具增强能力，例如执行搜索或调用 API，这为更复杂的业务逻辑提供了基础。`图片输入 false` 则表明模型当前不支持多模态图片输入，在设计应用时应避免依赖此功能。

## 配 openGauss 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :--- | :--- | :--- |
| `OPENGAUSS_URL` | `postgresql://user:password@host:port/database` | FastGPT 连接 openGauss 数据库的连接字符串规范。 |
| `ef_construction` | `64` | 影响 HNSW 索引构建时的图层连接数，数值越大，索引质量越高，召回准确性越好，但构建时间增加。 |
| `ef_search` | `32` | 影响 HNSW 索引查询时的邻居搜索范围，数值越大，召回精度越高，但查询延迟增加。 |
| `m = 32` | `32` | HNSW 索引的每层最大连接数，影响索引结构密度与查询效率。 |
| `recall_top_k` | `5` | FastGPT 检索时从 openGauss 返回的向量条数，需根据引用上限和单段长度调整。 |
| `chunk_overlap` | `128 字符` | 文本切分时相邻块的重叠部分，有助于保持上下文连贯性，避免信息丢失。 |

## 这两者互相约束的地方
模型的 `引用上限` 为 55000 token，这是一个关键约束。openGauss 向量库返回的是固定数量的召回条数，例如 `recall_top_k` 设置为 5。如果每段召回内容的长度过长，即使召回条数不多，也可能迅速触及模型的引用上限。反之，若单段内容较短，即使召回更多条数，也可能仍未达到引用上限。因此，在配置 `recall_top_k` 和文本切分的 `chunk_size` 时，需要综合考虑 `引用上限`。同时，openGauss 索引参数如 `ef_construction` 和 `ef_search` 的调整会影响召回的准确性和速度。调高这些参数，虽然可能提升召回质量，但也意味着索引构建和查询可能占用更多资源，进而影响整个 RAG 流程的响应时间，这对于依赖模型快速响应的应用场景需要权衡。

## 容易做错的三处
- 现象：模型返回的回答明显过短或不完整。原因：召回内容的总 token 量超出 `引用上限`，导致模型接收到的有效信息不足，无法生成完整答案。
- 现象：日志中出现 openGauss 连接超时或查询缓慢的警告。原因：`OPENGAUSS_URL` 配置不当或 `ef_search` 参数过高，导致 openGauss 数据库连接效率低下或查询负载过大。
- 现象：RAG 模式下，模型回答与检索到的内容关联性低。原因：`ef_construction` 参数设置过低，导致 openGauss 向量索引的质量不佳，未能召回最相关的向量。

## 怎么确认配好了
- 检查 FastGPT 后台日志，确认 openGauss 连接状态正常，没有出现连接失败或认证错误。
- 部署测试应用，观察模型在不同查询下的响应长度和内容质量，与 `引用上限` 和 `recall_top_k` 设置进行对比，确保引用内容能够有效利用。
- 使用 openGauss 提供的监控工具，观察 `ef_search` 和 `ef_construction` 调整后，索引查询的平均响应时间是否在可接受范围内。
- 对比不同 `recall_top_k` 配置下，FastGPT 召回并传递给模型的原始文本内容，评估召回条数与引用上限的匹配程度。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
