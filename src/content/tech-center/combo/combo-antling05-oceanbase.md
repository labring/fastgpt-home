---
title: AntLing 128K 上下文 这一档模型配 OceanBase 的配置口径
slug: /zh/combo/combo-antling05-oceanbase
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "AntLing 128K 档位模型提供了 128000 的上下文长度（`maxContext`），这意味着单次对话中模型可以处理的输入文本总量上限。引用上限（`quoteMaxToken`）为 120000，这是专门用于检索增强生成（RAG）场景下，从知识库中召回的内容所能占用的最大 token 预"
language: zh
axis_model_tier: "AntLing / 128000 /  / 120000 / false / false"
axis_vector_db: "OceanBase"
covered_models: "Ring-1T、Ring-flash-2.0"
check_day: 2026-09-29
meta_title: AntLing 128K 上下文 这一档模型配 OceanBase 的配置口径
meta_description: AntLing 128K 档位模型提供了 128000 的上下文长度（`maxContext`），这意味着单次对话中模型可以处理的输入文本总量上限。引用上限（`quoteMaxToken`）为 120000，这是专门用于检索增强生成（RAG）场景下，从知识库中召回的内容所能占用的最大 token 预
date_published: 2026-09-29
date_modified: 2026-09-29
---

# AntLing 128K 上下文 这一档模型配 OceanBase 的配置口径

## 这一档模型的参数意味着什么
AntLing 128K 档位模型提供了 128000 的上下文长度（`maxContext`），这意味着单次对话中模型可以处理的输入文本总量上限。引用上限（`quoteMaxToken`）为 120000，这是专门用于检索增强生成（RAG）场景下，从知识库中召回的内容所能占用的最大 token 预算。它不直接限制召回的条数，而是限制所有召回内容合计的 token 量。模型不支持图片输入和工具调用，因此在应用设计时无需考虑这些功能链路。这些参数共同决定了 RAG 系统的召回策略、召回内容长度和整体交互的复杂性上限。

## 配 OceanBase 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `OCEANBASE_URL` | `mysql://user:pass@host:port/db` | 连接 OceanBase 数据库实例的必要参数，遵循 MySQL 协议格式。 |
| `ef_construction` | `64` 或 `128` | 控制 HNSW 索引构建时的邻居搜索范围，影响索引质量和构建时间。 |
| `m` | `16` | HNSW 索引中每个节点的最大连接数，影响召回精度和内存消耗。 |
| `top_k` | `前 5 条` | 向量检索返回的条目数量，应根据引用上限和单条内容长度灵活调整。 |
| `chunk_size` | `800–1200 字符` | 知识库文本切分时每个块的理想长度，影响召回粒度和 token 占用。 |
| `overlap_size` | `100–200 字符` | 文本切分时相邻块的重叠部分，有助于保持上下文连贯性。 |

## 这两者互相约束的地方
AntLing 128K 档位模型的 128000 上下文长度是总预算，其中 120000 的引用上限是专门为召回内容预留的。OceanBase 向量库返回的是匹配度最高的若干条（`top_k`）文档片段。这些片段的合计 token 数量必须控制在 120000 的引用上限之内。如果 `top_k` 值过大，或者每个文档片段（`chunk_size`）过长，都可能导致召回内容的总 token 量超出引用上限。此时，系统通常会截断或丢弃部分召回内容，从而影响模型回答的完整性和准确性。OceanBase 索引参数 `ef_construction` 和 `m` 调高可以提升召回精度，但会增加索引构建时间和内存消耗，这间接影响了知识库更新的效率和运维成本，需与模型对召回质量的需求进行权衡。SEEKDB 与 OceanBase 使用同一套控制器实现，配置口径相同，上述参数同样适用于 SEEKDB。

## 容易做错的三处
*   日志显示“上下文超出最大限制”，原因是召回的 `top_k` 条内容合计 token 超过了 120000 引用上限。
*   检索结果相关性差，模型回答质量低，可能是 OceanBase 的 `ef_construction` 或 `m` 参数设置过低，导致索引质量不佳。
*   知识库更新后，模型仍然基于旧知识回答，可能是因为向量库索引未及时重建或缓存未刷新。

## 怎么确认配好了
*   在 FastGPT 知识库管理界面，上传一段长文本，观察系统自动切分后的 `chunk_size` 和 `overlap_size` 是否符合预期。
*   通过 FastGPT 的 RAG 调试功能，模拟一次带知识库的对话，查看召回内容的总 token 数是否在 120000 引用上限之内。
*   在 OceanBase 数据库监控界面，检查 `ef_construction` 和 `m` 参数生效后的索引构建速度和查询延迟是否在可接受范围内。
*   运行一系列包含关键信息的问答测试，验证模型是否能准确引用知识库中的相关内容，并据此调整 `top_k` 和 `chunk_size` 的阈值。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
