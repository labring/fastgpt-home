---
title: 引用预算 4K–8K的对话模型配 text-embedding-v4 / text-embedding-v3 的分段与引用口径
slug: /zh/combo/combo-q8k-qwen01
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`quoteMaxToken` 是知识库应用中可引用内容的总token预算，限定单轮对话中嵌入上下文的引用内容累计token上限。4000–8000 tokens的区间适配多数常规知识库对话场景，既保障上下文信息足够支撑准确回答，又不会因累计token过高占用过多模型推理资源，为多数公开文档、内部资"
language: zh
axis_model_tier: "引用预算 4K–8K"
covered_models: "glm-4v-flash、ERNIE-4.0-8K、ERNIE-4.0-Turbo-8K、ERNIE-Lite-8K、hunyuan-turbo-vision、hunyuan-vision、moonshot-v1-8k、moonshot-v1-8k-vision-preview、generalv3、generalv3.5、4.0Ultra、step-1-flash、step-1-8k、step-1v-8k、step-2-mini、step-2-16k"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 4K–8K的对话模型配 text-embedding-v4 / text-embedding-v3 的分段与引用口径

## 这一档模型的参数意味着什么
`quoteMaxToken` 是知识库应用中可引用内容的总token预算，限定单轮对话中嵌入上下文的引用内容累计token上限。4000–8000 tokens的区间适配多数常规知识库对话场景，既保障上下文信息足够支撑准确回答，又不会因累计token过高占用过多模型推理资源，为多数公开文档、内部资料类知识库搭建提供合理的预算范围。

## 配 Qwen 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 tokens | 平台登记的该向量模型默认分块长度，匹配基础语义拆分需求，无需额外调整即可适配多数场景 |
| `maxToken` | 8000 tokens | 该向量模型支持的单段输入token上限，需与对话模型引用预算匹配，避免单段内容超出模型可处理范围 |
| `quoteMaxToken` | 4000–8000 tokens | 对应对话模型档的引用预算区间，需严格遵循该范围设置，保障上下文总token不超模型限制 |
| `chunkSize` | 参考向量模型参数调整 | 知识库集合的分块长度，需结合`defaultToken`与`maxToken`设置，确保单块内容符合向量模型输入要求 |
| 分块重叠长度 | 64–128 tokens | 保障相邻分块间语义连贯性，避免关键信息被分块截断 |
| 单次搜索上限 | 按对话模型预算估算 | 控制单次检索返回的引用条数，避免累计token超出`quoteMaxToken`限制 |

## 这两者互相约束的地方
按默认每段512 tokens计算，一轮对话最多可容纳7–15段引用内容。当单段内容调整至向量模型允许的8000 tokens上限时，单段即可占满对话模型的引用预算下限。每段越长，单段语义完整性越强，但一轮能容纳的引用段数越少；每段越短，可容纳的段数越多，但单段上下文的语义连贯性越弱。更换向量模型后，由于向量维度与模型绑定，已创建的知识库索引需要重新构建，否则无法适配新的向量模型计算逻辑。

## 容易做错的三处
- 单轮对话中引用内容被强制截断。原因是未按`quoteMaxToken`区间设置相关参数，导致累计引用token超出对话模型的预算范围。
- 向量检索结果无法正常嵌入上下文。原因是更换向量模型后未重建知识库索引，新旧模型的向量维度不匹配。
- 分块内容语义断裂严重。原因是分块重叠长度设置过低，导致相邻分块间缺少必要的语义衔接信息。

## 怎么确认配好了
- 查看知识库集合的分块配置，确认分块长度与向量模型参数匹配。
- 检查对话模型的`quoteMaxToken`参数，确认其处于对应区间内。
- 测试单轮对话的上下文加载流程，确认无异常报错或截断提示。
- 验证向量检索结果的总token数未超出对话模型的预算限制。
