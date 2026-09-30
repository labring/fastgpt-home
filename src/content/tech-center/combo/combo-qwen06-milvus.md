---
title: Qwen 128K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-qwen06-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "该模型档位具备 128000 的上下文长度，决定了单次处理请求时可容纳的输入总量。120000 的引用上限，意味着在生成回复时，模型可用于引用内容的 token 预算。引用内容的总 token 量由检索到的段落数量和每段的平均 token 数共同决定。该档模型支持图片输入，可处理多模态信息，但不支持"
language: zh
axis_model_tier: "Qwen / 128000 /  / 120000 / true / false"
axis_vector_db: "Milvus"
covered_models: "qwen-vl-max、qwen-vl-plus"
check_day: 2026-09-29
meta_title: Qwen 128K 上下文 这一档模型配 Milvus 的配置口径
meta_description: 该模型档位具备 128000 的上下文长度，决定了单次处理请求时可容纳的输入总量。120000 的引用上限，意味着在生成回复时，模型可用于引用内容的 token 预算。引用内容的总 token 量由检索到的段落数量和每段的平均 token 数共同决定。该档模型支持图片输入，可处理多模态信息，但不支持
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Qwen 128K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么

该模型档位具备 128000 的上下文长度，决定了单次处理请求时可容纳的输入总量。120000 的引用上限，意味着在生成回复时，模型可用于引用内容的 token 预算。引用内容的总 token 量由检索到的段落数量和每段的平均 token 数共同决定。该档模型支持图片输入，可处理多模态信息，但不支持工具调用，因此不适用于需要模型自主调用外部工具的场景。

## 配 Milvus 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :----- | :------- | :----------- |
| `MILVUS_ADDRESS` | `localhost:19530` 或 `your_milvus_host:19530` | Milvus 服务端地址，确保 FastGPT 能访问。 |
| `MILVUS_TOKEN` | `your_milvus_api_key` | 用于认证 Milvus 服务的 API 密钥，保障连接安全。 |
| `index_type` | `HNSW` | 高效的近似最近邻搜索索引，平衡了查询速度和内存占用。 |
| `metric_type` | `IP` | 向量相似度度量方式，适用于多数文本嵌入模型。 |
| `nlist` | `1024` | HNSW 索引参数，影响索引构建时间与查询精度，可根据数据规模调整。 |
| `ef` | `64` | HNSW 索引参数，影响查询召回率和查询延迟，根据实际需求调整。 |

## 这两者互相约束的地方

模型 128000 的上下文长度，是 FastGPT 在处理单次请求时，能将用户提问、历史对话、以及从 Milvus 召回的内容全部塞入模型的总预算。引用上限按 token 计，向量库返回的按条数计。这意味着当每段召回内容的 token 数较多时，即使召回条数不多，也可能率先触及模型的引用上限。反之，当每段内容较短时，可以在引用上限内召回更多条内容。因此，需要根据实际业务场景和文档平均长度，合理配置向量库的召回条数与每段文本的长度，以避免超出模型的引用上限或上下文长度。同时，Milvus 索引参数如 `ef` 和 `nlist` 的调整，会影响向量检索的召回率和速度，进而影响 FastGPT 能够及时、准确地获取到高质量的引用内容，这对于充分利用模型引用上限至关重要。

## 容易做错的三处

*   在 FastGPT 日志中出现 `Milvus connection refused` 错误，原因是 `MILVUS_ADDRESS` 配置不正确或 Milvus 服务未启动。
*   模型返回的回答中缺乏相关引用内容，但 Milvus 检索返回了大量结果，原因是引用内容总 token 数超出了模型的引用上限。
*   在 FastGPT 界面上，检索到的内容条数与预期不符，原因是 Milvus 查询的 `top_k` 参数配置不当或向量库中数据量不足。

## 怎么确认配好了

*   在 FastGPT 后台管理界面，进行知识库测试，观察 Milvus 的返回日志，确认向量检索正常且有返回结果。
*   使用 FastGPT 的调试功能，输入测试问题，检查模型输出的引用内容是否包含来自 Milvus 的相关信息。
*   通过 FastGPT 的监控指标，观察模型处理请求时的 token 消耗情况，特别关注引用部分的 token 占用，确保在引用上限范围内。
*   在 Milvus 客户端或管理工具中，对向量库执行查询操作，验证 `HNSW` 索引和 `IP` 距离度量的有效性，并与 FastGPT 的召回结果进行比对。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
