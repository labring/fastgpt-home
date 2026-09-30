---
title: Yi 16K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-yi02-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`yi-vision-v2` 模型具备 16000 的上下文长度，这意味着单次请求中可以包含更多的历史对话或知识召回内容。尽管单次最大输出未明确标注，但通常可支持数千字的回答。引用上限为 12000，这限定了知识库在生成回答时可引用的最大令牌数。支持图片输入 `true` 使得模型能够处理视觉信息，"
language: zh
axis_model_tier: "Yi / 16000 /  / 12000 / true / false"
axis_vector_db: "Milvus"
covered_models: "yi-vision-v2"
check_day: 2026-09-29
meta_title: Yi 16K 上下文 这一档模型配 Milvus 的配置口径
meta_description: `yi-vision-v2` 模型具备 16000 的上下文长度，这意味着单次请求中可以包含更多的历史对话或知识召回内容。尽管单次最大输出未明确标注，但通常可支持数千字的回答。引用上限为 12000，这限定了知识库在生成回答时可引用的最大令牌数。支持图片输入 `true` 使得模型能够处理视觉信息，
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Yi 16K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么
`yi-vision-v2` 模型具备 16000 的上下文长度，这意味着单次请求中可以包含更多的历史对话或知识召回内容。尽管单次最大输出未明确标注，但通常可支持数千字的回答。引用上限为 12000，这限定了知识库在生成回答时可引用的最大令牌数。支持图片输入 `true` 使得模型能够处理视觉信息，而工具调用 `false` 则表明此模型不直接支持通过外部工具扩展其能力。这些参数共同构成了模型在 RAG 链路中的基本行为边界。

## 配 Milvus 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `MILVUS_ADDRESS` | `localhost:19530` 或 `milvus.yourdomain.com:19530` | 指向 Milvus 服务的具体网络地址，确保 FastGPT 能够连接。 |
| `MILVUS_TOKEN` | 按实测标定 | Milvus 认证凭证，若 Milvus 启用鉴权，必须提供有效令牌。 |
| `HNSW` `efConstruction` | `100` | HNSW 索引构建参数，影响召回质量与索引速度的平衡，此值可提供较好综合性能。 |
| `HNSW` `M` | `16` | HNSW 索引构建参数，影响邻居节点数量，此值可提供较好综合性能。 |
| `IP` | `COSINE` | 相似度计算方式，通常用于 RAG 场景以度量语义相似性。 |
| 召回条数 | `8` 条 | 结合模型引用上限与单段长度，避免超出上下文，同时保证召回覆盖率。 |

## 这两者互相约束的地方
`yi-vision-v2` 的 16000 上下文长度是核心约束。在 RAG 流程中，召回条数与每段召回内容的平均长度的乘积，必须严格控制在 16000 令牌以内。例如，若平均每段召回 500 令牌，则最多只能召回 32 条。模型的引用上限 12000 令牌则进一步限制了最终用于回答生成的知识片段总量。Milvus 返回的召回条数会先于引用上限生效，即 Milvus 返回多少条，FastGPT 就会尝试处理多少条，但最终能被模型引用的部分不会超过 12000 令牌。当 Milvus 的索引参数如 `efConstruction` 或 `M` 被调大时，通常会提高召回的准确性，这对于 `yi-vision-v2` 而言意味着更高质量的输入，但同时也会增加索引构建和查询的资源消耗。

## 容易做错的三处
*   日志显示“Connection refused at `MILVUS_ADDRESS`”，通常是 `MILVUS_ADDRESS` 配置错误或 Milvus 服务未运行。
*   模型输出内容中未包含任何知识库引用，可能是 Milvus 返回的召回条数过少或召回内容与问题不相关。
*   查询 Milvus 返回状态码 401，表明 `MILVUS_TOKEN` 配置不正确或已过期。

## 怎么确认配好了
*   在 FastGPT 知识库管理界面，上传文档并观察日志，确认 Milvus 向量插入操作成功且没有报错信息。
*   通过 FastGPT 的「测试」功能，输入一个与知识库内容高度相关的问题，观察返回的回答是否包含正确的知识引用，并检查引用条数是否符合预期。
*   监控 Milvus 服务端的资源使用情况，例如 CPU、内存和磁盘 I/O，确保在查询压力下系统运行稳定，并观察 `search` 操作的延迟是否在可接受范围内。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
