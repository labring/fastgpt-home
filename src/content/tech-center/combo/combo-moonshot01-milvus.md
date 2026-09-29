---
title: Moonshot 1048K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-moonshot01-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`kimi-k3` 模型档位提供 1048576 token 的上下文长度，这意味着单次对话请求中，模型能处理的输入内容（包括系统指令、用户查询、历史对话和召回知识）总量上限。引用上限为 1000000 token，这是专门分配给召回知识内容的预算，它限制了从向量库检索到的文本片段总计能占用的最大 "
language: zh
axis_model_tier: "Moonshot / 1048576 /  / 1000000 / true / true"
axis_vector_db: "Milvus"
covered_models: "kimi-k3"
check_day: 2026-09-29
meta_title: Moonshot 1048K 上下文 这一档模型配 Milvus 的配置口径
meta_description: `kimi-k3` 模型档位提供 1048576 token 的上下文长度，这意味着单次对话请求中，模型能处理的输入内容（包括系统指令、用户查询、历史对话和召回知识）总量上限。引用上限为 1000000 token，这是专门分配给召回知识内容的预算，它限制了从向量库检索到的文本片段总计能占用的最大
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Moonshot 1048K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么
`kimi-k3` 模型档位提供 1048576 token 的上下文长度，这意味着单次对话请求中，模型能处理的输入内容（包括系统指令、用户查询、历史对话和召回知识）总量上限。引用上限为 1000000 token，这是专门分配给召回知识内容的预算，它限制了从向量库检索到的文本片段总计能占用的最大 token 数。单次最大输出未标注，通常由平台或应用层决定。支持图片输入和工具调用，表明此档模型能处理多模态信息并具备执行外部函数的能力，为复杂的 RAG 应用和 Agent 工作流提供了基础。

## 配 Milvus 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `MILVUS_ADDRESS` | `your_milvus_host:19530` | 连接 Milvus 服务端点，确保网络可达性。 |
| `MILVUS_TOKEN` | `your_api_key` | 用于认证 Milvus 访问权限，保障数据安全。 |
| `index_type` | `HNSW` | `HNSW` 索引在绝大多数场景下提供召回质量和查询速度的良好平衡。 |
| `metric_type` | `IP` | 向量相似度计算方式，`IP`（内积）适用于归一化后的向量或特定语义相似度场景。 |
| `ef` (HNSW参数) | `128` | 影响查询时的召回精度，数值越大精度越高，但查询耗时也增加。按实测标定。 |
| `M` (HNSW参数) | `16` | 影响索引构建时的内存消耗和查询性能，数值越大搜索效率越高，但索引构建慢。按实测标定。 |

## 这两者互相约束的地方
模型的上下文长度与 Milvus 检索结果之间存在紧密关联。当从 Milvus 检索到多条文本片段时，这些片段会被拼接起来形成引用内容。引用上限 1000000 token 是对这部分内容的总预算。向量库返回的是条数，而模型处理的是 token 数，两者并非直接等价。召回条数与每条文本的平均长度共同决定了引用内容的总体 token 消耗。如果单条文本过长，即使召回条数不多，也可能迅速触及引用上限。反之，若单条文本较短，则可以召回更多条数。Milvus 的索引参数，如 `ef` 和 `M` 调大时，通常能提高召回的准确性，这意味着模型能够获得更相关的上下文信息，但同时也会增加查询延迟和资源消耗，需要根据实际业务需求在精度和性能之间进行权衡。

## 容易做错的三处
*   日志显示“Context window exceeded”，原因是召回的文本片段总长度超过了模型上下文或引用上限。
*   检索结果为空或不相关，可能是因为 Milvus 的 `metric_type` 或索引参数 `ef`、`M` 设置不当，未能有效捕捉语义相似性。
*   响应时间过长，API 调用超时，这可能与 Milvus 的查询并发量过高或索引参数 `ef` 设置过大导致查询耗时增加有关。

## 怎么确认配好了
*   通过 FastGPT 的调试界面，观察每次 RAG 请求中召回的文本片段数量和总 token 数，确保其在引用上限内。
*   使用 Milvus SDK 执行查询操作，检查返回结果的相似度分数和相关性，并与预期进行对比。
*   监控 Milvus 实例的资源使用情况（CPU、内存、磁盘 I/O），确保在高并发查询下仍能保持稳定性能，并根据业务峰值调整 `HNSW` 参数。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
