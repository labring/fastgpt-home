---
title: AntLing 64K 上下文 这一档模型配 openGauss 的配置口径
slug: /zh/combo/combo-antling04-opengauss
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "AntLing 64K 上下文模型，其 `maxContext` 为 64000 token，这决定了模型在单次对话中能够处理的最大输入信息量，包括用户提问、历史对话和召回内容。`quoteMaxToken` 为 60000 token，这意味着模型在生成回答时，用于引用的内容总计不能超过 6000"
language: zh
axis_model_tier: "AntLing / 64000 /  / 60000 / false / true"
axis_vector_db: "openGauss"
covered_models: "Ling-mini-2.0"
check_day: 2026-09-29
meta_title: AntLing 64K 上下文 这一档模型配 openGauss 的配置口径
meta_description: AntLing 64K 上下文模型，其 `maxContext` 为 64000 token，这决定了模型在单次对话中能够处理的最大输入信息量，包括用户提问、历史对话和召回内容。`quoteMaxToken` 为 60000 token，这意味着模型在生成回答时，用于引用的内容总计不能超过 6000
date_published: 2026-09-29
date_modified: 2026-09-29
---

# AntLing 64K 上下文 这一档模型配 openGauss 的配置口径

## 这一档模型的参数意味着什么
AntLing 64K 上下文模型，其 `maxContext` 为 64000 token，这决定了模型在单次对话中能够处理的最大输入信息量，包括用户提问、历史对话和召回内容。`quoteMaxToken` 为 60000 token，这意味着模型在生成回答时，用于引用的内容总计不能超过 60000 token。引用内容的段落数量由检索系统决定，与引用上限是两个独立的约束。模型支持工具调用 `true`，允许其通过外部工具扩展能力。不支持图片输入 `false`，表明模型无法直接处理图像信息。

## 配 openGauss 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `OPENGAUSS_URL` | `postgresql://user:password@host:port/database` | 数据库连接字符串，确保可访问性和权限正确 |
| `ef_construction` | `100–200` | 索引构建时邻居数量，影响搜索质量与构建时间 |
| `ef_search` | `60–120` | 搜索时邻居数量，影响搜索召回率与查询延迟 |
| `m` | `32` | HNSW 图的连接数，影响索引大小与搜索性能 |
| `recall_top_k` | `5–10` | 向量检索返回的条数，与模型引用上限配合 |
| `segment_length` | `800–1200 字符` | 单个文档分段长度，影响单段内容完整性与token消耗 |

## 这两者互相约束的地方
模型 64000 token 的上下文预算是总和限制。向量库召回的条数和每段内容的长度，共同决定了召回内容占用的 token 量。例如，如果 `recall_top_k` 设置为 10 条，每条平均 1000 token，则召回内容总计占用 10000 token。`quoteMaxToken` 是引用内容的 token 预算，它限定了最终参与模型引用的内容总量。向量库返回的是固定条数，这些条数转换为 token 后，如果超过 `quoteMaxToken`，则模型实际引用的内容会被截断。当索引参数 `ef_construction` 和 `ef_search` 调大时，向量检索的召回质量通常会提高，这意味着模型可以获得更相关的内容，但也可能增加检索时间，需要权衡。

## 容易做错的三处
*   日志显示“Context window exceeded”，原因是召回内容加上用户输入和历史对话，总token数超出了 64000。
*   模型回复中未引用任何内容，原因是向量检索返回的条目，其总token数已经超过了 `quoteMaxToken` 60000。
*   返回结果中关键信息缺失，原因是 `ef_search` 设置过低，导致向量检索的召回率不足。

## 怎么确认配好了
*   对不同长度和主题的查询进行测试，观察模型回复中引用的内容是否准确且完整，并检查引用的 token 总量。
*   通过 FastGPT 后台的调试工具，查看每次检索的 `recall_top_k` 条数和每条内容的实际 token 占用。
*   在 openGauss 数据库中，通过查询索引的 `ef_construction` 和 `m` 参数，确认索引配置与预期一致。
*   监控 openGauss 的查询日志，观察 `ef_search` 调整后，检索延迟和召回效率的变化趋势。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
