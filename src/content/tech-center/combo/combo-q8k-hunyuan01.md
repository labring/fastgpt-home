---
title: 引用预算 4K–8K的对话模型配 hunyuan-embedding 的分段与引用口径
slug: /zh/combo/combo-q8k-hunyuan01
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "quoteMaxToken是对话模型可承载的引用内容总token预算，限定了传入上下文的引用内容合计token数。这一档4000至8000 tokens的预算区间，在知识库应用中可承载较多检索到的分段内容，单轮对话中能够整合更多相关信息，无需频繁截断核心问答所需的上下文，适配多轮连贯问答、长文档梳理"
language: zh
axis_model_tier: "引用预算 4K–8K"
covered_models: "glm-4v-flash、ERNIE-4.0-8K、ERNIE-4.0-Turbo-8K、ERNIE-Lite-8K、hunyuan-turbo-vision、hunyuan-vision、moonshot-v1-8k、moonshot-v1-8k-vision-preview、generalv3、generalv3.5、4.0Ultra、step-1-flash、step-1-8k、step-1v-8k、step-2-mini、step-2-16k"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 4K–8K的对话模型配 hunyuan-embedding 的分段与引用口径

## 这一档模型的参数意味着什么
quoteMaxToken是对话模型可承载的引用内容总token预算，限定了传入上下文的引用内容合计token数。这一档4000至8000 tokens的预算区间，在知识库应用中可承载较多检索到的分段内容，单轮对话中能够整合更多相关信息，无需频繁截断核心问答所需的上下文，适配多轮连贯问答、长文档梳理等常见场景，平衡了上下文丰富度与模型的推理负载能力。

## 配 Hunyuan 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 tokens | 匹配Hunyuan嵌入模型的默认分段长度，无需额外调整即可对齐基础嵌入流程 |
| `maxToken` | 1024 tokens | 匹配Hunyuan嵌入模型的单段输入上限，最大化单段语义信息的完整性 |
| `quoteMaxToken` | 4000-8000 tokens | 匹配当前对话模型档的引用预算区间，平衡上下文丰富度与模型推理效率 |
| `chunkSize` | 512 tokens 或 1024 tokens | 可根据场景选择，512 tokens适配多段召回场景，1024 tokens适配长文本语义保留需求 |
| 分块重叠长度 | 100-200 tokens | 避免分块截断关键语义单元，保证相邻分块之间的上下文连贯性 |
| 单次搜索上限 | 15条以内 | 适配默认分段长度下的引用预算上限，避免超出对话模型的token限制 |

## 这两者互相约束的地方
当引用预算为4000-8000 tokens时，结合Hunyuan嵌入模型的参数，按默认每段512 tokens计算，一轮引用最多可放下约7-15段；若将每段调整至模型允许的1024 tokens上限，则仅能放下约3段。每段长度越长，单段承载的语义信息越完整，但单轮可容纳的分段数量越少；每段长度越短，单轮可容纳的分段数量越多，但单段的上下文完整性会有所降低。更换向量模型后，由于向量维度与模型绑定，已构建的知识库索引需要重新生成，否则无法适配新的嵌入逻辑。

## 容易做错的三处
- 界面显示引用内容被无故截断，原因是未对齐对话模型的quoteMaxToken预算，导致总引用token超出限制。
- 检索召回的有效结果数量不足，原因是单次搜索上限设置过低，未充分利用可用的引用预算空间。
- 知识库嵌入结果异常或无法加载，原因是更换向量模型后未重新构建索引，导致向量维度与当前模型不匹配。

## 怎么确认配好了
- 查看对话模型的配置参数，确认quoteMaxToken处于4000-8000 tokens区间内。
- 检查嵌入模型的配置项，确认maxToken与defaultToken匹配Hunyuan嵌入模型的官方参数。
- 测试检索与回复流程，观察引用内容是否完整显示，未出现无故截断的情况。
- 验证知识库索引的生成流程，确认在更换向量模型后已执行重建操作。
