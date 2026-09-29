---
title: Moonshot 128K 上下文 这一档模型配 OceanBase 的配置口径
slug: /zh/combo/combo-moonshot05-oceanbase
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`moonshot-v1-128k` 模型具备 128000 的上下文长度，这意味着在单次交互中可以处理极大量的信息。模型未标注单次最大输出，实际输出长度会受限于总上下文长度或API调用时的设定。引用上限 60000 token 专门用于预算引用的内容，模型在生成回答时会优先使用这个预算来纳入检索到"
language: zh
axis_model_tier: "Moonshot / 128000 /  / 60000 / false / true"
axis_vector_db: "OceanBase"
covered_models: "moonshot-v1-128k"
check_day: 2026-09-29
meta_title: Moonshot 128K 上下文 这一档模型配 OceanBase 的配置口径
meta_description: `moonshot-v1-128k` 模型具备 128000 的上下文长度，这意味着在单次交互中可以处理极大量的信息。模型未标注单次最大输出，实际输出长度会受限于总上下文长度或API调用时的设定。引用上限 60000 token 专门用于预算引用的内容，模型在生成回答时会优先使用这个预算来纳入检索到
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Moonshot 128K 上下文 这一档模型配 OceanBase 的配置口径

## 这一档模型的参数意味着什么
`moonshot-v1-128k` 模型具备 128000 的上下文长度，这意味着在单次交互中可以处理极大量的信息。模型未标注单次最大输出，实际输出长度会受限于总上下文长度或API调用时的设定。引用上限 60000 token 专门用于预算引用的内容，模型在生成回答时会优先使用这个预算来纳入检索到的信息。引用上限限定的是引用内容的总 token 数量，而检索系统返回的是段落条数，两者是独立的衡量维度。模型支持工具调用，可以与外部系统进行交互，但不支持图片输入，无法处理视觉信息。

## 配 OceanBase 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `OCEANBASE_URL` | `ob://user:password@host:port/database` | 数据库连接字符串，确保可访问性和权限 |
| `ef_construction` | 64–128 | 构建 HNSW 图时的邻居数量，影响索引质量和构建时间 |
| `m` | 16 | HNSW 图中每个节点的最大连接数，影响召回性能和内存占用 |
| `recall_top_k` | 5–8 条 | 根据模型引用上限和单段平均长度预估，以保证有效召回 |
| `chunk_overlap` | 100–200 字符 | 文本分块时的重叠量，避免语义信息被截断 |

## 这两者互相约束的地方
召回条数与每段内容长度的乘积，必须控制在 `moonshot-v1-128k` 模型 128000 的总上下文长度预算之内。引用上限是按 token 计算的，而向量库返回的是按段落条数计算的，引用上限首先触及还是向量库返回条数首先触及，取决于每段内容的平均 token 长度。如果每段内容较长，引用上限可能先达到，导致虽然返回了多条，但实际引用内容受限；如果每段内容较短，检索到的条数可能先达到上限。OceanBase 的索引参数，如 `ef_construction` 和 `m`，调大后可以提高检索的准确性和召回率，这意味着模型能够获得更高质量的输入内容，从而可能生成更精准的回答，但同时也会增加索引构建时间和查询延迟。

## 容易做错的三处
*   日志显示“数据库连接失败，状态码 1045”：`OCEANBASE_URL` 中提供的用户名或密码不正确。
*   检索结果为空，但知识库中明明有相关文档：`recall_top_k` 设置过低，或者向量索引未正确构建。
*   模型回答中引用的内容与检索结果不符：`chunk_overlap` 设置不当，导致分块时语义边界被破坏。

## 怎么确认配好了
*   执行一次包含检索的 FastGPT 问答，检查日志中 OceanBase 的查询耗时是否在可接受范围内。
*   在 FastGPT 界面上查看模型回答中引用的内容，确认其与知识库原文的匹配度，并评估引用内容的完整性。
*   通过 FastGPT 的调试工具，检查实际传递给模型的引用 token 数量，确保其未超出 60000 的引用上限，并评估召回条数与引用内容 token 数量之间的平衡。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
