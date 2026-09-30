---
title: Groq 131K 上下文 这一档模型配 openGauss 的配置口径
slug: /zh/combo/combo-groq01-opengauss
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Groq 提供的模型，其上下文长度高达 131072 token，这意味着单次请求可以处理非常庞大的输入信息，为复杂的问答和推理任务提供了充足的空间。引用上限 120000 token 规定了在生成回答时，模型可以从召回内容中引用的总 token 数量。工具调用能力的提供，使得模型能够与外部系统进行"
language: zh
axis_model_tier: "Groq / 131072 /  / 120000 / false / true"
axis_vector_db: "openGauss"
covered_models: "openai/gpt-oss-120b、openai/gpt-oss-20b、qwen/qwen3-32b、llama-3.1-8b-instant、llama-3.3-70b-versatile"
check_day: 2026-09-29
meta_title: Groq 131K 上下文 这一档模型配 openGauss 的配置口径
meta_description: Groq 提供的模型，其上下文长度高达 131072 token，这意味着单次请求可以处理非常庞大的输入信息，为复杂的问答和推理任务提供了充足的空间。引用上限 120000 token 规定了在生成回答时，模型可以从召回内容中引用的总 token 数量。工具调用能力的提供，使得模型能够与外部系统进行
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Groq 131K 上下文 这一档模型配 openGauss 的配置口径

## 这一档模型的参数意味着什么
Groq 提供的模型，其上下文长度高达 131072 token，这意味着单次请求可以处理非常庞大的输入信息，为复杂的问答和推理任务提供了充足的空间。引用上限 120000 token 规定了在生成回答时，模型可以从召回内容中引用的总 token 数量。工具调用能力的提供，使得模型能够与外部系统进行交互，执行特定操作或获取实时信息。图片输入功能的缺失，表明这些模型主要聚焦于文本处理任务。

## 配 openGauss 要定哪些

| 配置项             | 建议取法       | 这样取的依据                                                                    |
| :----------------- | :------------- | :------------------------------------------------------------------------------ |
| `OPENGAUSS_URL`    | `postgresql://user:pass@host:port/dbname` | 连接 openGauss 数据库的必要信息，确保 FastGPT 能正确访问。                      |
| `ef_construction`  | `100` – `200`  | 控制 HNSW 索引构建时的图连接数，越大召回质量越高，索引构建时间越长。            |
| `ef_search`        | `60` – `120`   | 控制 HNSW 搜索时的图遍历深度，越大召回质量越高，搜索延迟越大。                  |
| `m`                | `32`           | HNSW 索引中每个节点的最大连接数，影响索引结构和查询性能。                       |
| 召回段落字符限制   | `200` – `500` 字符 | 单个召回段落的理想长度，兼顾信息完整性和模型上下文预算。                        |
| 召回条数           | `5` – `10` 条  | 每次检索返回的段落数量，需与模型引用上限和单段长度综合考虑。                    |

## 这两者互相约束的地方
当使用 Groq 131K 上下文模型与 openGauss 向量库时，模型上下文长度和引用上限是关键的约束条件。向量库返回的召回结果是按段落条数计量的，而模型的引用上限是按 token 计量的。这意味着，如果单段召回内容的平均 token 数较高，即使召回条数不多，也可能迅速触及模型的引用上限。反之，如果单段召回内容较短，即使召回条数较多，也可能在引用上限内。因此，需要根据实际业务场景，平衡召回条数与每段内容的长度，以充分利用模型的引用预算。openGauss 的索引参数，如 `ef_construction` 和 `ef_search`，调大可以提升召回精度，但会增加索引构建时间和搜索延迟。在模型上下文预算充足的情况下，更高的召回精度能够为模型提供更准确的参考信息，从而提升回答质量。

## 容易做错的三处
- 模型返回 `Context window exceeded` 错误：原因是没有合理控制召回段落的长度或数量，导致总输入 token 超过了 131072 的上下文限制。
- 检索结果相关性差，模型回答不准确：原因可能是 openGauss 的 `ef_search` 参数设置过低，导致向量检索未能充分探索图结构，召回了不相关的段落。
- 知识库同步或查询耗时过长：原因可能是 openGauss 的 `ef_construction` 参数设置过高，导致索引构建或更新开销过大。

## 怎么确认配好了
- 检查 FastGPT 日志，确认 `OPENGAUSS_URL` 连接成功，没有数据库连接错误。
- 针对特定查询，观察 FastGPT 返回的召回段落数量和内容，确认与预期一致，且没有出现模型上下文溢出警告。
- 使用 FastGPT 的调试功能，查看模型实际引用的 token 数量，确保其在 120000 的引用上限内。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
