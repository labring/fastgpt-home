---
title: OpenAI 400K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-openai02-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "这一档模型，包括 `gpt-5.4-mini` 和 `gpt-5.3-codex` 等，拥有 400000 的上下文长度，这意味着在单次交互中可以处理极大量的信息输入，为复杂的知识问答和长篇文档分析提供了基础。引用上限 350000 规定了知识库在进行 RAG（检索增强生成）时可引用的最大字符数，直"
language: zh
axis_model_tier: "OpenAI / 400000 /  / 350000 / true / true"
axis_vector_db: "Milvus"
covered_models: "gpt-5.4-mini、gpt-5.4-nano、gpt-5.3-codex、gpt-5.2、gpt-5.2-pro、gpt-5.1、gpt-5、gpt-5-pro、gpt-5-mini、gpt-5-nano"
check_day: 2026-09-29
meta_title: OpenAI 400K 上下文 这一档模型配 Milvus 的配置口径
meta_description: 这一档模型，包括 `gpt-5.4-mini` 和 `gpt-5.3-codex` 等，拥有 400000 的上下文长度，这意味着在单次交互中可以处理极大量的信息输入，为复杂的知识问答和长篇文档分析提供了基础。引用上限 350000 规定了知识库在进行 RAG（检索增强生成）时可引用的最大字符数，直
date_published: 2026-09-29
date_modified: 2026-09-29
---

# OpenAI 400K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么
这一档模型，包括 `gpt-5.4-mini` 和 `gpt-5.3-codex` 等，拥有 400000 的上下文长度，这意味着在单次交互中可以处理极大量的信息输入，为复杂的知识问答和长篇文档分析提供了基础。引用上限 350000 规定了知识库在进行 RAG（检索增强生成）时可引用的最大字符数，直接影响召回策略的效能。图片输入能力允许模型理解并处理图像信息，可用于多模态应用场景。工具调用能力则使得模型能够与外部系统进行交互，执行特定任务，拓展了其应用边界。

## 配 Milvus 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `MILVUS_ADDRESS` | `localhost:19530` 或 `your_milvus_host:19530` | 指定 Milvus 服务端的网络地址，确保 FastGPT 能够建立连接。 |
| `MILVUS_TOKEN` | `your_milvus_api_key` | Milvus Cloud 或启用认证的 Milvus 实例的访问凭证，用于安全认证。 |
| `HNSW` | `M=16, efConstruction=128` | HNSW 索引参数，`M` 影响邻居数量，`efConstruction` 影响索引构建时的搜索范围，平衡查询速度与召回质量。 |
| `IP` | `L2` 或 `COSINE` | 向量相似度计算方式，`L2` 适用于欧氏距离，`COSINE` 适用于方向相似度，需与嵌入模型输出一致。 |
| 召回条数 | `10-20` | 基于模型引用上限和单段平均长度估算，避免超出模型输入限制。 |
| 单段长度 | `800-1200 字符` | 适当的文本分段长度，保证召回内容的语义完整性，同时适应模型上下文限制。 |

## 这两者互相约束的地方
模型 400000 的上下文长度是 FastGPT 结合 Milvus 进行 RAG 时的关键约束。召回条数与每段长度的乘积必须小于此上下文长度，否则模型将无法处理所有输入内容，可能导致部分信息丢失或截断。例如，如果召回 20 条，每条 10000 字符，总计 200000 字符，仍在上下文预算内。引用上限 350000 是 FastGPT 内部对最终提供给模型的引用文本的总限制，它与向量库返回的条数共同生效，FastGPT 会在此上限内进行截取或筛选。Milvus 的索引参数如 `HNSW` 中的 `efConstruction` 值调大，会增加索引构建时间和内存消耗，但通常会提升查询时的召回准确率，对于需要高精度召回以充分利用模型庞大上下文窗口的应用场景有益。

## 容易做错的三处
*   错误提示 "Milvus connection refused"：通常是 `MILVUS_ADDRESS` 配置不正确或 Milvus 服务未运行。
*   返回结果中相关引用段落为空：可能是 Milvus 集合中没有匹配的向量，或者 FastGPT 侧的召回条数配置过低。
*   模型回答内容与召回文档不符，但召回文档本身是相关的：索引参数 `HNSW` 的 `M` 或 `efConstruction` 配置不当，导致召回的向量不够精确。

## 怎么确认配好了
*   在 FastGPT 管理界面，上传文档并进行向量化，观察 Milvus 对应集合中的数据量是否增加。
*   通过 FastGPT 的调试功能，输入查询，检查返回的召回条数是否符合预期配置，并查看每条召回内容的长度。
*   检查 FastGPT 运行日志，确认没有 Milvus 相关的连接错误或查询异常日志。
*   进行多轮对话测试，观察模型回答是否能充分利用召回的知识，并检验回答的准确性和完整性，从而评估召回质量。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
