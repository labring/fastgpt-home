---
title: Moonshot 8K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-moonshot03-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`moonshot-v1-8k` 模型提供了 8000 Token 的上下文长度，这意味着单次请求可以包含较长的输入，为 RAG 场景中召回更多内容提供了空间。尽管单次最大输出未明确标注，但结合其上下文长度，通常能支持生成数百至上千 Token 的回答。6000 Token 的引用上限则明确了知识库"
language: zh
axis_model_tier: "Moonshot / 8000 /  / 6000 / false / true"
axis_vector_db: "Milvus"
covered_models: "moonshot-v1-8k"
check_day: 2026-09-29
meta_title: Moonshot 8K 上下文 这一档模型配 Milvus 的配置口径
meta_description: `moonshot-v1-8k` 模型提供了 8000 Token 的上下文长度，这意味着单次请求可以包含较长的输入，为 RAG 场景中召回更多内容提供了空间。尽管单次最大输出未明确标注，但结合其上下文长度，通常能支持生成数百至上千 Token 的回答。6000 Token 的引用上限则明确了知识库
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Moonshot 8K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么
`moonshot-v1-8k` 模型提供了 8000 Token 的上下文长度，这意味着单次请求可以包含较长的输入，为 RAG 场景中召回更多内容提供了空间。尽管单次最大输出未明确标注，但结合其上下文长度，通常能支持生成数百至上千 Token 的回答。6000 Token 的引用上限则明确了知识库引用内容的最大总量，直接影响了召回段落的数量和每段的平均长度。此外，该模型支持工具调用，使其能够与外部系统集成以执行特定任务，而 `图片输入 false` 则表明它不具备直接处理图像信息的能力，R在多模态RAG场景中需要额外的处理链路。

## 配 Milvus 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `MILVUS_ADDRESS` | `localhost:19530` 或 `your_milvus_cluster_ip:19530` | 指定 Milvus 服务端的连接地址和端口，确保 FastGPT 可以正确连接。 |
| `MILVUS_TOKEN` | 按实测标定 | Milvus 身份验证所需的 Token，用于确保 FastGPT 访问 Milvus 的安全性。 |
| `index_type` | `HNSW` | `HNSW` 索引类型在召回性能和精度上表现均衡，适合大多数 RAG 场景。 |
| `metric_type` | `IP` | `IP` (内积) 距离度量适用于衡量文本嵌入的相似性，与 LLM 嵌入模型输出特征匹配。 |
| `ef` | `32` | `HNSW` 索引构建参数，影响搜索召回的精度和速度，建议根据实际数据量和查询需求进行调优。 |
| `M` | `16` | `HNSW` 索引构建参数，影响图结构和内存占用，需在性能和资源之间权衡。 |

## 这两者互相约束的地方
`moonshot-v1-8k` 模型 8000 Token 的上下文长度是核心约束。在 RAG 流程中，召回的文档片段总长度，加上用户查询和系统提示词，必须严格控制在 8000 Token 之内。Milvus 的召回条数与每段文本的平均长度直接决定了这一总长度。模型的引用上限 6000 Token 进一步限制了知识库引用内容的最大容量，这意味着即使 Milvus 返回了大量相似度高的结果，最终传递给模型的引用内容也不会超过 6000 Token。因此，向量库的返回条数应与引用上限和每段长度综合考量，避免无效召回或超出模型处理能力。当 Milvus 的索引参数（如 `ef` 或 `M`）调大时，通常会提升召回精度，但也可能略微增加查询延迟，需要与模型的实时性要求进行平衡。

## 容易做错的三处
*   日志显示 `Milvus connection failed: [Errno 111] Connection refused`，原因是 `MILVUS_ADDRESS` 配置错误或 Milvus 服务未启动。
*   模型返回的引用内容为空，但 Milvus 查询有结果，这是因为向量召回条数过多导致总长度超出模型的引用上限。
*   查询响应时间过长，`Query time out` 报错，原因可能是 Milvus 索引参数不合理或硬件资源不足。

## 怎么确认配好了
*   在 FastGPT 管理后台的连接配置页面，检查 Milvus 连接状态显示为“已连接”。
*   上传文档至知识库，确保 Milvus 中能查询到对应的向量数据，并通过 Milvus 客户端进行一次简单的向量搜索，验证其正常工作。
*   使用一个包含少量知识库内容的测试对话，观察模型返回的引用内容是否符合预期，且在模型上下文长度和引用上限内。
*   在 FastGPT 知识库管理界面，查看单条知识点分段后的 Token 计数，并结合召回条数，估算总引用 Token 数是否在 6000 Token 限制之内。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
