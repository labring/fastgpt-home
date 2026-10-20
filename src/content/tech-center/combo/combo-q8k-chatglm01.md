---
title: 引用预算 4K–8K的对话模型配 embedding-3 的分段与引用口径
slug: /zh/combo/combo-q8k-chatglm01
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "quoteMaxToken 限定了单轮对话中可引入的外部引用内容的总 token 额度，4000至8000 tokens 的区间覆盖了多数中等规模知识库的引用需求，既能够承载多段检索到的知识库内容，又不会因额度过高占用过多对话模型的上下文资源，保障对话响应的流畅性与合理性，适配常见的知识库问答场景。"
language: zh
axis_model_tier: "引用预算 4K–8K"
covered_models: "glm-4v-flash、ERNIE-4.0-8K、ERNIE-4.0-Turbo-8K、ERNIE-Lite-8K、hunyuan-turbo-vision、hunyuan-vision、moonshot-v1-8k、moonshot-v1-8k-vision-preview、generalv3、generalv3.5、4.0Ultra、step-1-flash、step-1-8k、step-1v-8k、step-2-mini、step-2-16k"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 4K–8K的对话模型配 embedding-3 的分段与引用口径

## 这一档模型的参数意味着什么
quoteMaxToken 限定了单轮对话中可引入的外部引用内容的总 token 额度，4000至8000 tokens 的区间覆盖了多数中等规模知识库的引用需求，既能够承载多段检索到的知识库内容，又不会因额度过高占用过多对话模型的上下文资源，保障对话响应的流畅性与合理性，适配常见的知识库问答场景。

## 配 ChatGLM 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 tokens | 与 embedding-3 的默认分段长度保持一致，保障检索与引用的对齐 |
| `maxToken` | 8000 tokens | 匹配 embedding-3 允许的单段最大输入长度，适配长文本分段需求 |
| `quoteMaxToken` | 4000-8000 tokens | 遵循当前对话模型档的引用预算区间，平衡内容完整性与上下文占用 |
| `chunkSize` | 512-8000 tokens | 可根据业务场景调整，短分段适配细粒度检索，长分段保障语义完整性 |
| 单次搜索上限 | 7-15 条 | 按默认512 tokens分段计算，适配当前对话模型的引用预算额度 |
| 重叠长度 | 100-200 tokens | 避免分段截断关键语义信息，提升检索召回的完整性 |

## 这两者互相约束的地方
按默认每段512 tokens计算，一轮引用最多可容纳7至15段内容。当分段长度调整至8000 tokens的上限时，单段即可占满当前对话模型的引用预算。分段越长，单段承载的语义信息越完整，一轮可容纳的段落数越少；分段越短，单轮可容纳的段落数越多，但单段上下文的完整性会有所下降。更换向量模型后，由于向量维度与模型绑定，已创建的知识库索引需要重新构建，以适配新的向量计算逻辑。

## 容易做错的三处
- 出现引用内容超出额度的报错提示，原因是未按照对话模型的引用预算调整分段长度或单次搜索上限，导致总引用token超过`quoteMaxToken`。
- 检索召回的段落语义不连贯，原因是分段长度设置过短或重叠长度不合理，导致关键信息被截断在段落边界。
- 更换向量模型后未重建索引，导致检索结果异常或无法正常召回，原因是向量维度与新模型不匹配，旧索引无法适配。

## 怎么确认配好了
- 查看知识库的分块配置页面，确认`defaultToken`、`maxToken`、`chunkSize`等参数的设置与选型要求一致。
- 发起测试对话，观察引用内容的总长度是否符合当前对话模型的预算区间，无异常报错。
- 更换向量模型后，执行索引重建操作，验证检索功能可正常运行。
- 调整分段长度后，检查单轮引用的段落数是否符合预期的比例关系。
