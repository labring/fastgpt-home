---
title: MiniMax 1000K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-minimax01-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "MiniMax 1000K 模型的 `上下文长度` 达 1,000,000 token，这决定了单次请求中模型能处理的输入总量，包括系统指令、用户查询和召回内容。`引用上限` 为 900,000 token，这限定了召回内容在输入中能占用的最大 token 预算。段落的召回数量由向量数据库的配置和检"
language: zh
axis_model_tier: "MiniMax / 1000000 /  / 900000 / true / true"
axis_vector_db: "Milvus"
covered_models: "MiniMax-M3"
check_day: 2026-09-29
meta_title: MiniMax 1000K 上下文 这一档模型配 Milvus 的配置口径
meta_description: MiniMax 1000K 模型的 `上下文长度` 达 1,000,000 token，这决定了单次请求中模型能处理的输入总量，包括系统指令、用户查询和召回内容。`引用上限` 为 900,000 token，这限定了召回内容在输入中能占用的最大 token 预算。段落的召回数量由向量数据库的配置和检
date_published: 2026-09-29
date_modified: 2026-09-29
---

# MiniMax 1000K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么
MiniMax 1000K 模型的 `上下文长度` 达 1,000,000 token，这决定了单次请求中模型能处理的输入总量，包括系统指令、用户查询和召回内容。`引用上限` 为 900,000 token，这限定了召回内容在输入中能占用的最大 token 预算。段落的召回数量由向量数据库的配置和检索逻辑决定，召回内容总 token 量必须符合引用上限。`图片输入` 为 true 意味着此模型支持多模态输入，可处理图像信息。`工具调用` 为 true 则表明模型具备调用外部工具的能力，可实现复杂任务编排。

## 配 Milvus 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `MILVUS_ADDRESS` | `localhost:19530` 或 `your_milvus_host:19530` | Milvus 服务默认端口，确保网络可达 |
| `MILVUS_TOKEN` | `your_api_key` | 生产环境 Milvus 身份验证凭证，保障访问安全 |
| `HNSW` `efConstruction` | `128` | HNSW 索引参数，控制索引构建质量与查询速度平衡 |
| `HNSW` `M` | `16` | HNSW 索引参数，控制图连接数，影响召回精度 |
| 检索 `top_k` | `5` | 每次检索从 Milvus 返回的向量数量，直接影响召回条数 |
| 单个段落 `max_length` | `800` 字符 | 确保单个召回段落不会过长，超出模型上下文限制 |

## 这两者互相约束的地方
MiniMax 1000K 模型的 1,000,000 token 上下文长度是总预算，其中 900,000 token 专用于引用内容。向量库返回的段落数量与每个段落的长度共同决定了召回内容的总 token 量。当召回条数乘以每段长度超过 900,000 token 时，模型将无法处理全部引用内容。引用上限按 token 计量，向量库则按条数返回，因此实际引用的条数取决于每条召回内容的平均 token 长度。如果向量库的索引参数，例如 `HNSW` 的 `efConstruction` 或 `M` 值调大，将可能提升召回的准确性，这意味着模型能获得更相关的上下文，从而提高回答质量。然而，更高的索引参数也可能增加 Milvus 的检索延迟，需要权衡。

## 容易做错的三处
- 日志显示 `401 Unauthorized` 错误，原因是没有正确配置 `MILVUS_TOKEN` 或其值过期。
- 检索结果返回的段落为空，原因是 Milvus 连接地址 `MILVUS_ADDRESS` 配置不正确，导致无法连接。
- 模型回答中引用内容不完整或缺失，原因是向量库检索 `top_k` 值设置过小，未能召回足够的有效段落。

## 怎么确认配好了
- 检查 FastGPT 后台 Milvus 连接状态是否显示“已连接”。
- 在 FastGPT 知识库测试界面，上传文档后进行检索测试，确认能返回相关的段落且段落内容完整。
- 发起一次完整的 FastGPT 对话，观察模型输出中是否包含了引用的知识库内容，并检查引用内容的总 token 量是否在 900,000 的引用上限之内。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
