---
title: Moonshot 262K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-moonshot02-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Moonshot 262K 上下文模型档位，其 262144 的上下文长度决定了单次请求中可输入的最大文本量，直接影响了知识召回内容的总量。256000 的引用上限则限定了知识库可以引用的最大 token 数，为 RAG 场景下的召回段落数量设定了天花板。支持图片输入意味着模型能够处理多模态信息，可"
language: zh
axis_model_tier: "Moonshot / 262144 /  / 256000 / true / true"
axis_vector_db: "Milvus"
covered_models: "kimi-k2.7-code、kimi-k2.7-code-highspeed、kimi-k2.6、kimi-k2.5"
check_day: 2026-09-29
meta_title: Moonshot 262K 上下文 这一档模型配 Milvus 的配置口径
meta_description: Moonshot 262K 上下文模型档位，其 262144 的上下文长度决定了单次请求中可输入的最大文本量，直接影响了知识召回内容的总量。256000 的引用上限则限定了知识库可以引用的最大 token 数，为 RAG 场景下的召回段落数量设定了天花板。支持图片输入意味着模型能够处理多模态信息，可
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Moonshot 262K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么

Moonshot 262K 上下文模型档位，其 262144 的上下文长度决定了单次请求中可输入的最大文本量，直接影响了知识召回内容的总量。256000 的引用上限则限定了知识库可以引用的最大 token 数，为 RAG 场景下的召回段落数量设定了天花板。支持图片输入意味着模型能够处理多模态信息，可用于图文结合的知识库查询。工具调用能力则允许模型与外部系统交互，扩展了其处理复杂任务的边界。

## 配 Milvus 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `MILVUS_ADDRESS` | `localhost:19530` 或 `your_milvus_host:19530` | Milvus 服务默认端口，需根据实际部署地址配置。 |
| `MILVUS_TOKEN` | 按实测标定 | Milvus 访问凭证，生产环境建议使用，保障数据安全。 |
| `HNSW` 参数 `M` | `32` | 影响检索精度与构建速度的平衡，经验值。 |
| `HNSW` 参数 `efConstruction` | `128` | 影响索引构建时的邻居搜索范围，越大索引质量越高，构建越慢。 |
| `IP` | 启用 | `IP` 索引类型适用于余弦相似度或内积相似度计算，与大多数嵌入模型匹配。 |
| 召回条数 | `5–8 条` | 结合模型引用上限与单段长度，避免超出上下文窗口。 |

## 这两者互相约束的地方

Moonshot 262K 上下文模型的巨大上下文窗口，为 RAG 场景提供了广阔空间。然而，召回条数与每段长度的乘积必须严格控制在模型的上下文预算之内。例如，若每段召回内容平均为 1000 token，则即使召回 200 条，也可能触及 262144 token 的上限。Milvus 返回的召回条数与模型的引用上限共同生效，实际使用时，以两者中较小值为准。此外，Milvus 索引参数如 `HNSW` 的 `efConstruction` 值调大，虽然能提升召回精度，但会增加索引构建时间，并在一定程度上增加 Milvus 的内存消耗，需权衡系统资源。

## 容易做错的三处

*   日志显示 `context window exceeded`：召回条数过多或单段长度过长，导致输入 token 总数超过模型 262144 的上下文上限。
*   Milvus 查询返回空结果或结果不相关：`MILVUS_ADDRESS` 配置错误导致连接失败，或向量库索引参数不当，例如 `HNSW` 的 `M` 或 `efConstruction` 值过低影响检索质量。
*   知识库引用内容不完整：模型引用上限 256000 未充分利用，或向量库召回条数设置过少。

## 怎么确认配好了

*   通过 FastGPT 平台发送测试请求，观察模型返回的引用内容是否完整、相关，并检查日志中是否有 `context window exceeded` 错误。
*   检查 Milvus 服务的日志，确认 `MILVUS_ADDRESS` 和 `MILVUS_TOKEN` 配置正确，没有连接错误信息。
*   在 FastGPT 知识库配置中，调整召回条数，观察模型输出的引用数量和质量变化，以确定合适的召回数量阈值。
*   通过 Milvus 客户端直接查询，验证索引的召回精度和延迟，确保向量库工作正常。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
