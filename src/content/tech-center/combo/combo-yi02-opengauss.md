---
title: Yi 16K 上下文 这一档模型配 openGauss 的配置口径
slug: /zh/combo/combo-yi02-opengauss
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "此档模型具备 16000 token 的上下文处理能力，这决定了单次请求中可供模型参考的全部信息总量。模型对引用内容的 token 预算为 12000 token。引用内容合计占用的 token 数量受此上限限制。向量检索返回的段落条数与引用内容的 token 预算是两个独立的衡量维度。模型支持图片"
language: zh
axis_model_tier: "Yi / 16000 /  / 12000 / true / false"
axis_vector_db: "openGauss"
covered_models: "yi-vision-v2"
check_day: 2026-09-29
meta_title: Yi 16K 上下文 这一档模型配 openGauss 的配置口径
meta_description: 此档模型具备 16000 token 的上下文处理能力，这决定了单次请求中可供模型参考的全部信息总量。模型对引用内容的 token 预算为 12000 token。引用内容合计占用的 token 数量受此上限限制。向量检索返回的段落条数与引用内容的 token 预算是两个独立的衡量维度。模型支持图片
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Yi 16K 上下文 这一档模型配 openGauss 的配置口径

## 这一档模型的参数意味着什么
此档模型具备 16000 token 的上下文处理能力，这决定了单次请求中可供模型参考的全部信息总量。模型对引用内容的 token 预算为 12000 token。引用内容合计占用的 token 数量受此上限限制。向量检索返回的段落条数与引用内容的 token 预算是两个独立的衡量维度。模型支持图片输入，允许在对话中融入视觉信息。此档模型不具备工具调用能力，这意味着无法通过模型直接触发外部功能或 API。

## 配 openGauss 要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `OPENGAUSS_URL` | `postgresql://user:password@host:port/database` | 连接数据库实例的必要信息，确保可达性 |
| `ef_construction` | `100` | 影响 HNSW 图构建的质量与召回准确率，过低影响召回，过高增加构建时间 |
| `ef_search` | `80` | 影响 HNSW 搜索时的召回率，根据实际召回效果进行调整 |
| `m` | `32` | HNSW 算法中每个节点的最大连接数，影响索引大小和查询性能 |
| 检索条数 | `5-8` | 结合模型引用上限和段落平均长度，控制召回条数以优化引用效率 |
| 段落字符长度 | `500-1000` | 确保每段信息完整且不过长，避免单段内容过多导致总引用超限 |

## 这两者互相约束的地方
向量库返回的文档段落条数与每段内容的长度，共同决定了召回内容的总 token 数量，这一总量必须控制在模型 16000 token 的上下文预算之内。引用上限是按 token 计量的，而向量库的返回结果是按条数计量的。引用内容总 token 量是否触及 12000 token 的上限，取决于每条召回段落的平均长度。当 openGauss 的索引参数，如 `ef_construction` 或 `ef_search`，被调大时，通常会提高检索的召回准确率和召回率。这意味着模型在处理更相关、更全面的召回内容时，其推理质量可能得到提升，但同时也会增加查询时的计算资源消耗。

## 容易做错的三处
*   日志显示 `ERROR: database "your_db" does not exist`：`OPENGAUSS_URL` 中指定的数据库名称不正确或未创建。
*   检索结果的 `documents` 字段为空：向量库中没有与查询匹配的有效数据，或者检索参数设置过于严格。
*   模型返回的回答内容过短或不完整：召回的段落总 token 量超过了模型的引用上限 12000 token，导致部分内容被截断。

## 怎么确认配好了
*   执行一次查询，检查 openGauss 返回的文档条数是否在预设范围内。
*   计算一次查询召回内容的总 token 数，确认其是否在模型的上下文长度 16000 token 和引用上限 12000 token 之内。
*   观察模型针对复杂问题的回复质量，判断召回内容的有效性和相关性是否达到预期。
*   监控 openGauss 数据库的连接状态和查询延迟，确保系统运行稳定。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
