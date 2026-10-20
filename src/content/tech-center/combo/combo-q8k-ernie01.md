---
title: 引用预算 4K–8K的对话模型配 Embedding-V1 的分段与引用口径
slug: /zh/combo/combo-q8k-ernie01
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`quoteMaxToken` 是对话模型接收引用内容的总token预算，限定了单轮对话中可注入的知识库内容总长度。4000至8000 tokens的区间适配多数通用知识库应用场景，既可以承载足够多的分段内容以覆盖问题相关的上下文，又不会因预算过高导致模型处理负载增加，能够平衡知识库召回的全面性与模"
language: zh
axis_model_tier: "引用预算 4K–8K"
covered_models: "glm-4v-flash、ERNIE-4.0-8K、ERNIE-4.0-Turbo-8K、ERNIE-Lite-8K、hunyuan-turbo-vision、hunyuan-vision、moonshot-v1-8k、moonshot-v1-8k-vision-preview、generalv3、generalv3.5、4.0Ultra、step-1-flash、step-1-8k、step-1v-8k、step-2-mini、step-2-16k"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 4K–8K的对话模型配 Embedding-V1 的分段与引用口径

## 这一档模型的参数意味着什么
`quoteMaxToken` 是对话模型接收引用内容的总token预算，限定了单轮对话中可注入的知识库内容总长度。4000至8000 tokens的区间适配多数通用知识库应用场景，既可以承载足够多的分段内容以覆盖问题相关的上下文，又不会因预算过高导致模型处理负载增加，能够平衡知识库召回的全面性与模型推理的效率，为搭建稳定的知识库应用提供合理的引用上限参考。

## 配 Ernie 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 tokens | 匹配Embedding-V1的默认分段长度，无需额外调整即可适配基础业务场景 |
| `maxToken` | 1000 tokens | 遵循Embedding-V1的单段最大输入限制，避免分段超出模型处理上限 |
| `quoteMaxToken` | 4000-8000 tokens | 贴合当前对话模型档的预算区间，匹配引用内容的总长度要求 |
| `chunkSize` | 512 或 1000 tokens | 可根据业务需求选择，对应Embedding-V1的默认或最大分段长度 |
| 分块重叠长度 | 64-128 tokens | 保留分段间的上下文衔接，避免关键信息被截断在分段边界 |
| 单次搜索上限 | 与分段长度联动的合理区间 | 控制召回的分段总数，确保不超出对话模型的引用预算 |

## 这两者互相约束的地方
按默认每段512 tokens计算，一轮引用最多可放下7至15段；若将每段调整至Embedding-V1允许的1000 tokens上限，则仅可放下约4段。每段越长，单段承载的语义越完整，但一轮能容纳的分段数量越少；每段越短，单轮可容纳的分段越多，但单段上下文的完整性越弱。当更换向量模型时，由于向量维度与模型绑定，已构建的知识库索引需要重新生成，否则无法适配新的向量模型配置。

## 容易做错的三处
- 界面提示引用内容token超出预算。原因是未根据向量模型的分段长度调整`quoteMaxToken`的设置，导致总引用长度超出对话模型限制。
- 检索返回的分段数量远超预期。原因是未配置单次搜索上限，或上限设置未结合`quoteMaxToken`与分段长度进行约束。
- 更换向量模型后知识库无法正常检索。原因是未重建已生成的向量索引，新模型与旧索引的向量维度不匹配。

## 怎么确认配好了
- 查看对话模型的`quoteMaxToken`配置项，确认其参数设置符合选型区间要求。
- 检查向量模型的默认分段长度与最大分段长度参数，确认与Embedding-V1的官方配置一致。
- 测试配置不同的分块长度，观察单轮对话可承载的分段数量变化是否符合预期。
- 查看知识库分块的重叠长度设置，确认符合上下文衔接的业务需求。
