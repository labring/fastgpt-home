---
title: Ernie 128K 上下文 这一档模型配 OceanBase 的配置口径
slug: /zh/combo/combo-ernie01-oceanbase
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Ernie 128K 上下文模型提供了巨大的文本处理能力。`maxContext` 为 128000 tokens，表示模型在单次对话中能够处理的总上下文长度，这包括了用户输入、历史对话以及系统注入的检索内容。`quoteMaxToken` 为 119000 tokens，这是专门用于检索结果内容的"
language: zh
axis_model_tier: "Ernie / 128000 /  / 119000 / false / true"
axis_vector_db: "OceanBase"
covered_models: "ernie-5.1"
check_day: 2026-09-29
meta_title: Ernie 128K 上下文 这一档模型配 OceanBase 的配置口径
meta_description: Ernie 128K 上下文模型提供了巨大的文本处理能力。`maxContext` 为 128000 tokens，表示模型在单次对话中能够处理的总上下文长度，这包括了用户输入、历史对话以及系统注入的检索内容。`quoteMaxToken` 为 119000 tokens，这是专门用于检索结果内容的
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Ernie 128K 上下文 这一档模型配 OceanBase 的配置口径

## 这一档模型的参数意味着什么
Ernie 128K 上下文模型提供了巨大的文本处理能力。`maxContext` 为 128000 tokens，表示模型在单次对话中能够处理的总上下文长度，这包括了用户输入、历史对话以及系统注入的检索内容。`quoteMaxToken` 为 119000 tokens，这是专门用于检索结果内容的预算，意味着模型在生成回答时，可以从向量库中引用最多 119000 tokens 的相关信息。单次最大输出未标注，通常意味着模型会根据输入上下文和内部逻辑决定输出长度。`图片输入 false` 表明该模型不直接支持多模态的图像输入。`工具调用 true` 则表示模型具备使用外部工具扩展其能力的能力，可以用于执行特定任务或获取实时信息。

## 配 OceanBase 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `OCEANBASE_URL` | `ob://user:password@host:port/database` | 连接 OceanBase 实例的必要信息，确保数据库可访问。 |
| `ef_construction` | `64` | HNSW 索引构建参数，影响索引质量和构建时间，此值在召回质量和构建效率间取得平衡。 |
| `m` | `16` | HNSW 索引的邻居数量参数，影响召回精度，此值在召回精度和存储开销间取得平衡。 |
| `top_k` | `5` | 向量检索时返回的条数，与引用上限和单段长度共同决定最终引用内容。 |
| `segment_length` | `800–1200 字符` | 文本切分时每段的长度，影响单段信息密度和引用上限的利用率。 |

说明：SEEKDB 与 OceanBase 使用同一套控制器实现，配置口径相同，上述配置项同样适用于 SEEKDB。

## 这两者互相约束的地方
Ernie 128K 上下文模型与 OceanBase 向量库在实际应用中存在多重约束。模型的 `maxContext` 限制了总体的输入长度，而 `quoteMaxToken` 则限定了检索结果可以占用的部分。向量库返回的是检索到的文档条数，而 `quoteMaxToken` 是一个 token 预算。两者不是简单的数量对应关系，具体能引用多少条文档，取决于每条文档的平均 token 长度。如果每段切分得过长，即使召回的条数不多，也可能迅速触及 `quoteMaxToken` 上限；反之，如果每段较短，则可以引用更多条文档。

OceanBase 的索引参数，如 `ef_construction` 和 `m`，会影响检索的精度和速度。当这些参数调大时，通常意味着更高的检索质量，能够为模型提供更相关的上下文，从而可能提升模型回答的准确性。然而，这也会增加索引构建的时间和查询的计算开销。因此，需要在召回质量、响应速度以及模型 `quoteMaxToken` 的有效利用之间找到一个平衡点，以确保模型能够高效地利用 OceanBase 提供的检索结果。

## 容易做错的三处
*   日志中出现 `Token limit exceeded for quoteMaxToken` 错误，原因是检索到的内容总 token 数超过了模型设定的引用上限。
*   模型回答中引用内容为空或不相关，可能是由于 `top_k` 设置过小，导致检索到的相关条目不足。
*   向量检索耗时过长，导致模型生成回答延迟，这通常是 `ef_construction` 或 `m` 参数设置过高，增加了检索的计算量。

## 怎么确认配好了
*   在 FastGPT 界面中，观察模型每次引用内容的 token 计数，确保其在 `quoteMaxToken` 限制内。
*   通过 FastGPT 的检索调试功能，查看 OceanBase 返回的 `top_k` 条文档内容，评估其与用户查询的相关性。
*   监控 FastGPT 运行日志中的向量检索耗时，确保其在可接受的响应时间内，必要时调整 OceanBase 索引参数。
*   在 FastGPT 的模型配置页面，检查模型 `maxContext` 和 `quoteMaxToken` 参数是否与 `ernie-5.1` 档位一致。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
