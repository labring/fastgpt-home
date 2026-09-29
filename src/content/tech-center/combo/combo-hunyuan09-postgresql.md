---
title: Hunyuan 32K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-hunyuan09-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Hunyuan 32K 上下文模型档位，其 `maxContext` 达 32000 token，这意味着单次交互中可容纳的召回内容和用户输入总量相当可观。单次最大输出未标注，通常表示模型会根据上下文和内部逻辑生成适量回复。`quoteMaxToken` 设定为 32000 token，这是对引用内"
language: zh
axis_model_tier: "Hunyuan / 32000 /  / 32000 / false / false"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "hunyuan-turbos-latest、hunyuan-t1-latest"
check_day: 2026-09-29
meta_title: Hunyuan 32K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: Hunyuan 32K 上下文模型档位，其 `maxContext` 达 32000 token，这意味着单次交互中可容纳的召回内容和用户输入总量相当可观。单次最大输出未标注，通常表示模型会根据上下文和内部逻辑生成适量回复。`quoteMaxToken` 设定为 32000 token，这是对引用内
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Hunyuan 32K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
Hunyuan 32K 上下文模型档位，其 `maxContext` 达 32000 token，这意味着单次交互中可容纳的召回内容和用户输入总量相当可观。单次最大输出未标注，通常表示模型会根据上下文和内部逻辑生成适量回复。`quoteMaxToken` 设定为 32000 token，这是对引用内容总量的预算限制。引用内容的总 token 数量由检索到的段落总和决定，它独立于检索到的段落条数。图片输入功能为 `false`，表明模型不接受图像作为输入。工具调用功能为 `false`，表示模型不具备直接执行外部工具的能力。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `PG_URL` | `postgresql://user:password@host:port/database` | 数据库连接字符串，确保可访问性和权限 |
| `ef_construction` | `64`–`128` | 影响索引构建时的邻居数量，更高值构建更优索引但耗时更长 |
| `ef_search` | `64`–`128` | 影响查询时的邻居搜索范围，更高值召回更准确但查询更慢 |
| `m` | `32` | HNSW 图的层内最大连接数，平衡查询性能与存储开销 |
| `vector_dimensions` | `1536` | 向量维度，需与模型输出的 embedding 维度匹配 |

## 这两者互相约束的地方
Hunyuan 32K 上下文模型的 32000 token `maxContext` 设定，直接约束了向量库召回内容的总量。召回条数与每段内容的平均长度相乘，其总 token 数必须控制在 `maxContext` 预算之内。`quoteMaxToken` 限制了引用内容的总 token 预算，而向量库返回的是固定条数的段落。何者先触达上限，取决于每段内容的平均 token 长度。如果每段较短，可能在达到引用 token 预算前召回更多条；如果每段较长，则可能在召回少量条数后即触及引用 token 预算。PostgreSQL（pgvector）的 `ef_construction` 和 `ef_search` 参数调高后，索引质量和查询精度会提升，这意味着向量检索阶段能够更准确地找到相关内容，从而为模型提供更高质量的输入。

## 容易做错的三处
*   日志显示 `Context window exceeded` 错误，原因是召回内容总 token 量超出了 `maxContext` 限制。
*   界面上引用内容不完整，返回的引用条数与预期不符，原因是引用内容总 token 量达到了 `quoteMaxToken` 上限。
*   检索结果相关性低，查询响应时间过长，原因是 `ef_search` 参数设置过低或 `m` 值不当导致索引效率低下。

## 怎么确认配好了
*   执行一次包含复杂查询的对话，检查 FastGPT 界面中引用的内容是否与预期召回结果一致，并核对引用来源。
*   监控 PostgreSQL 数据库的 `pg_stat_statements` 视图，观察向量查询的平均执行时间，判断 `ef_search` 参数的性能表现。
*   通过 FastGPT 的调试接口，获取模型实际接收到的上下文 token 数量，验证其是否在 `maxContext` 和 `quoteMaxToken` 范围内。
*   在 FastGPT 中配置多个不同长度的文档，进行检索测试，评估向量库在不同文档长度下的召回效果，并根据实际需求调整 `ef_construction` 和 `ef_search` 的阈值。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
