---
title: 引用预算 1.2 万–3.2 万的对话模型配 text-embedding-3-large / text-embedding-3-small 的分段与引用口径
slug: /zh/combo/combo-q32k-openai01
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "quoteMaxToken是对话模型允许的引用内容总token预算，限定一轮对话中可整合的参考文本总长度。当前选型的12000–32000 tokens区间，可承载较多来源的参考内容，适配多文档综合问答、长文档解析等场景，能在单轮对话中整合足够的上下文信息，减少多轮补充交互的需求，提升知识库应用的问"
language: zh
axis_model_tier: "引用预算 1.2 万–3.2 万"
covered_models: "Baichuan4、Baichuan4-Turbo、Baichuan4-Air、Baichuan3-Turbo、Baichuan-M3、Baichuan-M3-Plus、Baichuan2-Turbo、glm-4v-plus、ernie-4.5-turbo-32k、ernie-4.5-turbo-vl-32k、hunyuan-large、hunyuan-pro、hunyuan-standard、hunyuan-turbo、hunyuan-turbos-latest、hunyuan-t1-latest、internlm2-pro-chat、internlm3-8b-instruct、mistral-small-latest、moonshot-v1-32k、moonshot-v1-32k-vision-preview、qwen3-vl-flash、qwen3-vl-plus、qwen3-1.7b、qwen3-0.6b、Qwen/Qwen2-VL-72B-Instruct、deepseek-ai/DeepSeek-V2.5、lite、max-32k、step-1o-turbo-vision、step-1-32k、step-1o-vision-32k、step-1v-32k、yi-lightning、yi-vision-v2"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 1.2 万–3.2 万的对话模型配 text-embedding-3-large / text-embedding-3-small 的分段与引用口径

## 这一档模型的参数意味着什么
quoteMaxToken是对话模型允许的引用内容总token预算，限定一轮对话中可整合的参考文本总长度。当前选型的12000–32000 tokens区间，可承载较多来源的参考内容，适配多文档综合问答、长文档解析等场景，能在单轮对话中整合足够的上下文信息，减少多轮补充交互的需求，提升知识库应用的问答效率与完整性。

## 配 OpenAI 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 tokens | 平台默认的单段文本拆分基准长度，适配多数通用知识库的语义完整性需求 |
| `maxToken` | 8000 tokens | 匹配所选OpenAI向量模型的单段最大输入限制，避免向量生成失败 |
| `quoteMaxToken` | 12000–32000 tokens | 贴合当前对话模型的引用预算区间，确保引用内容总token不超限 |
| `chunkSize` | 512–8000 tokens | 可根据场景灵活调整，通用场景取基准值，长文本场景取上限值 |
| 分块重叠长度 | 50–200 tokens | 减少分块导致的语义割裂，提升检索时的上下文连贯性 |
| 单次搜索上限 | 匹配`quoteMaxToken`的合理比例 | 控制单次召回的总token不超出对话模型的预算范围 |

## 这两者互相约束的地方
当前组合的引用预算与向量模型参数存在明确约束关系。按默认每段512 tokens计算，一轮引用最多可容纳约23–62段；若将每段调整至向量模型允许的8000 tokens上限，仅可容纳约1段起。每段长度越长，单段语义完整性越强，但一轮可承载的段数越少；每段长度越短，可容纳的段数越多，但单段上下文会更细碎。更换向量模型后，已创建的知识库索引需要重建，因为向量维度与向量模型直接绑定，旧索引无法适配新模型的向量生成逻辑。

## 容易做错的三处
- 对话发起后提示引用内容超限，原因是单次召回的参考文本总token超出了当前对话模型的`quoteMaxToken`预算。
- 知识库索引创建失败，原因是单段文本长度超过了所选向量模型的`maxToken`上限。
- 检索得到的参考内容上下文断裂，原因是分块时未配置合理的重叠长度或分块长度设置不合理。

## 怎么确认配好了
- 查看当前所选对话模型的`quoteMaxToken`参数，确认其符合选型组合的区间要求。
- 验证向量模型的`maxToken`设置与所选OpenAI向量模型的官方限制匹配。
- 提交小型测试文本，确认分块、向量生成、检索引用流程无异常报错。
- 调整分块长度参数，观察检索召回的段数变化是否符合逻辑。
