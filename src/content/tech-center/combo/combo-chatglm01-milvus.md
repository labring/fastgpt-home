---
title: ChatGLM 1000K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-chatglm01-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "ChatGLM 系列的 `glm-5.3-flash` 模型，其上下文长度高达 1000000 token，这赋予了其处理海量信息的能力，允许在单次对话中注入极大量的召回内容。引用上限 `quoteMaxToken` 为 900000 token，专门用于限制从知识库中检索并注入模型作为引用的内容总"
language: zh
axis_model_tier: "ChatGLM / 1000000 /  / 900000 / true / true"
axis_vector_db: "Milvus"
covered_models: "glm-5.3-flash"
check_day: 2026-09-29
meta_title: ChatGLM 1000K 上下文 这一档模型配 Milvus 的配置口径
meta_description: ChatGLM 系列的 `glm-5.3-flash` 模型，其上下文长度高达 1000000 token，这赋予了其处理海量信息的能力，允许在单次对话中注入极大量的召回内容。引用上限 `quoteMaxToken` 为 900000 token，专门用于限制从知识库中检索并注入模型作为引用的内容总
date_published: 2026-09-29
date_modified: 2026-09-29
---

# ChatGLM 1000K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么

ChatGLM 系列的 `glm-5.3-flash` 模型，其上下文长度高达 1000000 token，这赋予了其处理海量信息的能力，允许在单次对话中注入极大量的召回内容。引用上限 `quoteMaxToken` 为 900000 token，专门用于限制从知识库中检索并注入模型作为引用的内容总量。这意味着在 RAG 场景下，模型可以消化近百万 token 的引用文本。图片输入功能 `true` 使得模型能够处理视觉信息，支持多模态 RAG。工具调用功能 `true` 则表明模型具备了调用外部工具的能力，可扩展其功能边界，执行复杂任务。这些参数共同定义了模型在处理复杂、长文本和多模态任务时的工程约束和潜在能力。

## 配 Milvus 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `MILVUS_ADDRESS` | `localhost:19530` 或 `your_milvus_host:19530` | 指向 Milvus 服务的具体网络地址和端口，确保 FastGPT 能正确连接。 |
| `MILVUS_TOKEN` | `your_milvus_api_key` | Milvus 身份验证凭证，保障数据访问安全，对于云服务或开启认证的自建集群是必需项。 |
| `HNSW` | `M=16, efConstruction=128` | HNSW 索引参数，`M` 影响邻居数量，`efConstruction` 影响构建时的搜索宽度。此配置在召回性能与准确性之间取得平衡。 |
| `IP` | `L2` | 相似度度量方式，`L2` 适用于大多数文本嵌入场景，计算欧氏距离。 |
| 检索条数 | `10-20` | 根据引用上限和单段平均 token 数估算，在不超出引用预算的前提下尽可能增加召回内容丰富度。 |
| 单段最大字符数 | `500-800` 字符 | 控制每次切分段落的长度，避免单段过长导致 token 浪费或过短信息不全。 |

## 这两者互相约束的地方

模型上下文长度与 Milvus 召回内容之间存在直接的约束关系。`glm-5.3-flash` 模型的 1000000 token 上下文长度是总容量，其中引用上限 `quoteMaxToken` 占用了 900000 token。Milvus 返回的是固定数量的条目，每条包含一定数量的字符。因此，召回条数乘以每段的平均 token 数，其总和必须在 900000 token 的引用上限内。如果 Milvus 返回的条数过多或单段过长，超出引用上限，模型将无法处理全部召回内容。引用上限是基于 token 的预算，而向量库返回的是独立的段落条数，两者并非直接等量。当 Milvus 的索引参数如 `HNSW` 的 `efConstruction` 调大时，索引构建时间会增加，但查询召回的准确性可能提高，这意味着模型在处理更精准的召回内容时，其推理效果可能更佳，但这也要求 FastGPT 在查询 Milvus 时有足够的响应时间。

## 容易做错的三处

*   界面提示“引用内容超出模型限制”：召回条数与每段长度乘积超出模型的 `quoteMaxToken` 预算。
*   Milvus 连接超时或认证失败：`MILVUS_ADDRESS` 或 `MILVUS_TOKEN` 配置错误，导致 FastGPT 无法与 Milvus 建立连接或通过认证。
*   RAG 问答质量不佳，回复缺乏深度：Milvus 检索的 `HNSW` 参数 `efConstruction` 设置过低，导致召回的段落相关性不足。

## 怎么确认配好了

*   在 FastGPT 知识库管理界面，查看 Milvus 连接状态是否显示“已连接”。
*   在 FastGPT 中创建一个测试知识库，上传文档并进行分段，观察分段后的单段字符数是否符合预期。
*   使用 FastGPT 的调试工具进行 RAG 问答，检查模型返回的引用内容是否充足且相关，并比对引用 token 数量与 `quoteMaxToken` 的相对关系。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
