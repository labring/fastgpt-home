---
title: Hunyuan 1024K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-hunyuan01-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Hunyuan `hy4-preview` 模型档位具备 1024000 token 的上下文长度，这意味着在单次交互中，可以输入大量文本信息以供模型理解和生成。引用上限为 960000 token，这是模型用于接收外部引用内容的预算，确保了引入的知识量在可控范围内。工具调用功能允许模型在必要时执行"
language: zh
axis_model_tier: "Hunyuan / 1024000 /  / 960000 / false / true"
axis_vector_db: "Milvus"
covered_models: "hy4-preview"
check_day: 2026-09-29
meta_title: Hunyuan 1024K 上下文 这一档模型配 Milvus 的配置口径
meta_description: Hunyuan `hy4-preview` 模型档位具备 1024000 token 的上下文长度，这意味着在单次交互中，可以输入大量文本信息以供模型理解和生成。引用上限为 960000 token，这是模型用于接收外部引用内容的预算，确保了引入的知识量在可控范围内。工具调用功能允许模型在必要时执行
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Hunyuan 1024K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么
Hunyuan `hy4-preview` 模型档位具备 1024000 token 的上下文长度，这意味着在单次交互中，可以输入大量文本信息以供模型理解和生成。引用上限为 960000 token，这是模型用于接收外部引用内容的预算，确保了引入的知识量在可控范围内。工具调用功能允许模型在必要时执行外部操作，扩展了其处理复杂任务的能力。图片输入功能当前未支持，模型主要处理文本信息。

## 配 Milvus 要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `MILVUS_ADDRESS` | `your-milvus-cluster-ip:19530` | 指定 Milvus 服务端的具体访问地址和端口，确保 FastGPT 能够建立连接。 |
| `MILVUS_TOKEN` | `your-api-key-or-secret` | 用于 Milvus 认证，保障数据访问的安全性。 |
| `index_type` | `HNSW` | HNSW 索引在召回性能和精度之间提供了良好的平衡，适合大规模向量检索场景。 |
| `metric_type` | `IP` | IP（内积）距离度量适用于许多文本嵌入模型，能够有效衡量向量间的相似度。 |
| `ef` (HNSW 参数) | `128` | 影响 HNSW 搜索的精度和速度，较大的值可以提高召回精度，但会增加查询耗时，需根据实际性能需求调整。 |
| `M` (HNSW 参数) | `16` | 影响 HNSW 图结构的连接度，较大的值能够构建更稠密的图，提升召回质量，但会增加索引构建时间和存储空间。 |

## 这两者互相约束的地方
模型的上下文长度对向量召回策略构成了直接约束。召回的文档段落数量乘以每个段落的平均 token 长度，其总和必须控制在模型的上下文长度预算之内。引用上限按 token 计，表示模型处理引用内容的 token 总量预算；向量库返回的按条数计，表示检索到的独立段落数量。谁先触顶取决于每个文档段落的平均长度，若段落较短，则可能在达到引用上限前召回更多条目；若段落较长，则可能较少条目便达到引用上限。Milvus 的索引参数（如 `ef` 和 `M`）调大，意味着向量检索的精度和召回质量可能提升，这会使得模型在处理更相关、更准确的引用内容时，能够更好地利用其 960000 token 的引用预算，从而生成更准确、更完善的回复。

## 容易做错的三处
* 连接 Milvus 失败，报错日志显示 `connection refused`。原因可能是 `MILVUS_ADDRESS` 配置错误或 Milvus 服务未启动。
* 向量检索返回的条目数远低于预期，界面显示内容不完整。原因可能是 `ef` 参数设置过小，导致 HNSW 索引在查询时召回不足。
* 模型生成回复内容与引用内容关联性低。原因可能是 `metric_type` 未正确配置为 `IP`，导致向量相似度计算不准确。

## 怎么确认配好了
* 运行一组包含已知答案的查询，观察模型回复是否准确引用了 Milvus 召回的对应段落，并检查召回条数和引用内容 token 数是否在预期范围内。
* 监控 Milvus 的查询延迟和 FastGPT 的响应时间，确保在不同负载下，系统能够保持可接受的性能水平，并与历史基线或性能目标进行对比。
* 检查 FastGPT 日志中关于 Milvus 连接和向量检索的记录，确认没有出现异常错误或警告信息。
* 针对引用上限进行测试，输入接近 960000 token 限制的引用内容，验证模型是否能正常处理并生成回复，同时不超出上下文长度。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
