---
title: StepFun 8K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-stepfun06-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`step-1-flash` 和 `step-2-mini` 模型均具备 8000 token 的上下文长度，这意味着在单次对话中，模型可以处理最多 8000 token 的输入内容，包括系统指令、用户查询及检索到的引用信息。引用上限为 6000 token，这是模型为引用内容预留的 token 预"
language: zh
axis_model_tier: "StepFun / 8000 /  / 6000 / false / false"
axis_vector_db: "Milvus"
covered_models: "step-1-flash、step-2-mini"
check_day: 2026-09-29
meta_title: StepFun 8K 上下文 这一档模型配 Milvus 的配置口径
meta_description: `step-1-flash` 和 `step-2-mini` 模型均具备 8000 token 的上下文长度，这意味着在单次对话中，模型可以处理最多 8000 token 的输入内容，包括系统指令、用户查询及检索到的引用信息。引用上限为 6000 token，这是模型为引用内容预留的 token 预
date_published: 2026-09-29
date_modified: 2026-09-29
---

# StepFun 8K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么
`step-1-flash` 和 `step-2-mini` 模型均具备 8000 token 的上下文长度，这意味着在单次对话中，模型可以处理最多 8000 token 的输入内容，包括系统指令、用户查询及检索到的引用信息。引用上限为 6000 token，这是模型为引用内容预留的 token 预算。引用内容的总 token 量将限制在 6000 以内。模型不支持图片输入，因此在 RAG 链路中不需要考虑多模态内容的嵌入与召回。同时，模型也不支持工具调用，这意味着 RAG 链路应专注于文本内容的检索与生成，无需集成外部工具。

## 配 Milvus 要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `MILVUS_ADDRESS` | `localhost:19530` 或 `your_milvus_instance_ip:19530` | Milvus 服务的标准监听地址与端口，确保 FastGPT 能够建立连接。 |
| `MILVUS_TOKEN` | 按实测标定 | Milvus 访问凭证，用于鉴权，确保数据安全。 |
| `HNSW` | `M=32, efConstruction=128` | HNSW 索引参数，平衡召回质量与查询延迟，适用于中等规模数据。 |
| `IP` | `L2` | 距离度量方式，`L2` 适用于大多数文本嵌入场景，计算向量间的欧氏距离。 |
| 检索条数 | `5-8` 条 | 综合考虑引用上限和单段平均 token 数，确保召回内容在模型上下文预算内。 |
| 单段字符长度 | `500-800` 字符 | 避免单段过长导致 token 浪费，或过短导致信息碎片化。 |

## 这两者互相约束的地方
模型 8000 token 的上下文长度是总预算，其中 6000 token 专门用于引用内容。这意味着向量库返回的检索条数乘以每段内容的平均 token 数，需要控制在 6000 token 预算之内，同时为用户查询和模型回复预留足够的空间。引用上限按 token 计费，而向量库返回的是固定数量的段落条数，因此，具体的引用内容量取决于每段文本的实际长度。当索引参数如 `HNSW` 中的 `efConstruction` 调大时，向量检索的精度会提高，可能带来更相关的结果，但同时也会增加查询延迟。对于 `step-1-flash` 和 `step-2-mini` 这样对响应速度有一定要求的模型，需要在检索精度和延迟之间找到平衡点，避免因检索耗时过长而影响整体的用户体验。

## 容易做错的三处
*   在 FastGPT 界面配置 Milvus 时，连接测试失败，报错 `connection refused`。原因可能是 `MILVUS_ADDRESS` 配置错误或 Milvus 服务未启动。
*   RAG 问答结果中，引用的段落为空或显示 `No relevant content found`。原因可能是向量库中没有匹配到足够相似的内容，或者 `MILVUS_TOKEN` 配置不正确导致鉴权失败。
*   模型输出的回答过短，未能充分利用检索到的信息。原因可能是检索条数设置过少，或者单段文本长度过短，导致引用内容的总 token 量未达到引用上限。

## 怎么确认配好了
*   在 FastGPT 知识库管理页面，尝试对 Milvus 向量库进行连接测试，确认返回 `Connection successful`。
*   上传少量文档并进行一次 RAG 问答，检查 FastGPT 调试界面中 `引用内容` 部分是否正常显示检索到的段落，并核对段落数量与预期是否一致。
*   通过多次问答，观察模型输出的回答质量和引用内容的关联性，评估 HNSW 索引参数 `M` 和 `efConstruction` 是否需要调整，以达到查询精度和速度的平衡。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
