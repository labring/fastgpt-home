---
title: Moonshot 128K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-moonshot08-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Moonshot `moonshot-v1-128k-vision-preview` 模型档位提供了 128000 的上下文长度，这意味着单次请求可以处理极长的输入内容，为知识库召回提供了充足的空间。其引用上限为 60000，这限定了模型在生成回复时可以引用的知识段落总字符数。图片输入能力支持处理多"
language: zh
axis_model_tier: "Moonshot / 128000 /  / 60000 / true / true"
axis_vector_db: "Milvus"
covered_models: "moonshot-v1-128k-vision-preview"
check_day: 2026-09-29
meta_title: Moonshot 128K 上下文 这一档模型配 Milvus 的配置口径
meta_description: Moonshot `moonshot-v1-128k-vision-preview` 模型档位提供了 128000 的上下文长度，这意味着单次请求可以处理极长的输入内容，为知识库召回提供了充足的空间。其引用上限为 60000，这限定了模型在生成回复时可以引用的知识段落总字符数。图片输入能力支持处理多
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Moonshot 128K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么
Moonshot `moonshot-v1-128k-vision-preview` 模型档位提供了 128000 的上下文长度，这意味着单次请求可以处理极长的输入内容，为知识库召回提供了充足的空间。其引用上限为 60000，这限定了模型在生成回复时可以引用的知识段落总字符数。图片输入能力支持处理多模态信息，允许在对话中结合视觉内容。工具调用功能则使得模型能够与外部工具集成，执行特定任务，扩展了其应用场景。这些参数共同定义了该模型在处理复杂、长文本、多模态以及需要外部辅助的场景中的工程约束。

## 配 Milvus 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :----- | :------- | :----------- |
| `HNSW` | 索引参数 `efConstruction: 128`, `M: 16` | 平衡召回质量与查询延迟，适用于高维度向量 |
| `IP` | 向量相似度度量 | 该模型通常使用嵌入向量的内积（Inner Product）来衡量相似性 |
| `MILVUS_ADDRESS` | `localhost:19530` 或具体的 Milvus 服务地址 | 确保 FastGPT 能够正确连接到 Milvus 服务 |
| `MILVUS_TOKEN` | 按实际部署的 Milvus 安全配置设定 | 用于 Milvus 服务的认证，保障数据安全 |
| 召回条数 | 30–50 条 | 兼顾模型引用上限与知识召回的全面性 |
| 单段最大字符数 | 800–1200 字符 | 避免单个知识段过长，影响模型理解与引用效率 |

## 这两者互相约束的地方
Moonshot 128K 上下文模型与 Milvus 向量库在实际应用中存在紧密约束。首先，召回条数与每段长度的乘积不能超过模型的 128000 上下文预算。即使 Milvus 返回了大量相关向量，如果聚合后的文本总长度超出此限制，超出部分将无法被模型处理。其次，模型的 60000 引用上限与向量库返回的实际知识段落数量之间存在优先级。即使 Milvus 返回了满足上下文长度的条数，模型也只会引用不超过 60000 字符的内容。这意味着，向量库的召回策略需要与模型的引用上限相匹配。当 Milvus 的索引参数（如 `efConstruction`、`M`）调大时，通常会提高召回的准确性，但这可能增加查询延迟。对于要求低延迟的对话场景，需要在召回质量和查询速度之间进行权衡，以避免模型等待时间过长。

## 容易做错的三处
*   日志显示 "Milvus connection failed: [Errno 111] Connection refused"，原因是没有正确配置 `MILVUS_ADDRESS` 或 Milvus 服务未启动。
*   模型回复中知识点引用不足或缺失，原因可能是 Milvus 召回的条数过少，或者召回的知识段落总字符数远低于模型的引用上限。
*   模型在处理包含图片的问题时报错 "Image input not supported"，原因是没有在 FastGPT 侧正确启用或配置模型的多模态能力。

## 怎么确认配好了
*   在 FastGPT 知识库管理界面，上传测试文档并观察其是否成功切片并导入 Milvus 向量库。
*   通过 FastGPT 的调试模式，观察请求发送给 Milvus 的查询参数（如 `HNSW`、`IP`）以及 Milvus 返回的向量召回条数与内容。
*   进行多轮对话测试，验证模型在不同查询下能否稳定地引用来自 Milvus 的知识，并观察模型回复中引用的知识段落是否符合预期长度和数量。
*   监控 Milvus 服务日志，确认没有异常错误或连接中断，并观察查询延迟是否在可接受范围内。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
