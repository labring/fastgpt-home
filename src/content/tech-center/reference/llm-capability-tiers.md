---
title: FastGPT 对话模型能力分档表
slug: /zh/reference/llm-capability-tiers
page_type: 基准数据页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: fastgpt-plugin v1.1.3 内置的 268 个对话模型，按上下文长度与能力字段归档
language: zh
check_day: 2026-09-29
meta_title: FastGPT 对话模型能力分档表
meta_description: fastgpt-plugin v1.1.3 内置的 268 个对话模型，按上下文长度与能力字段归档
date_published: 2026-09-29
date_modified: 2026-09-29
---

# FastGPT 对话模型能力分档表

本页把 fastgpt-plugin v1.1.3 内置的 268 个对话模型，按上下文长度、单次最大输出、引用上限、图片输入与工具调用这几项能力字段归档。同一档内的模型在这几项上取值完全相同，配置时可按同一套口径处理。

## 总览

| 项 | 数量 |
| --- | --- |
| 内置对话模型 | 268 |
| 提供商 | 21 |
| 互不相同的能力档位（提供商 + 能力字段） | 124 |
| 标注支持工具调用 | 210 |
| 标注支持图片输入 | 135 |

## 按上下文长度分布

| 上下文长度 | 模型数 |
| --- | --- |
| 1M 及以上 | 69 |
| 200K–1M | 66 |
| 100K–200K | 71 |
| 32K–100K | 38 |
| 32K 以下 | 24 |

## 按提供商分布

| 提供商 | 模型数 | 该提供商的能力档位数 |
| --- | --- | --- |
| Qwen | 38 | 13 |
| OpenAI | 32 | 8 |
| ChatGLM | 27 | 10 |
| StepFun | 16 | 13 |
| Claude | 15 | 3 |
| AntLing | 14 | 8 |
| Ernie | 14 | 10 |
| Gemini | 14 | 3 |
| Hunyuan | 14 | 11 |
| MiniMax | 11 | 6 |
| Moonshot | 11 | 8 |
| MistralAI | 10 | 4 |
| Doubao | 9 | 3 |
| Groq | 9 | 4 |
| Baichuan | 8 | 3 |
| Grok | 7 | 3 |
| SparkDesk | 7 | 4 |
| DeepSeek | 5 | 4 |
| Siliconflow | 3 | 3 |
| InternLM | 2 | 1 |
| Yi | 2 | 2 |

## 使用这张表时要注意的三件事

1. 能力字段是模型在内置清单中的登记值，实际可用性还取决于所接入渠道是否开放该能力。
2. 上下文长度（`maxContext`）决定一次能塞进多少召回内容，引用上限（`quoteMaxToken`）是引用内容的 token 预算 —— 它限的是引用内容合计占多少 token，⛔ 不是能引用几段；段落条数由检索侧的返回条数决定。两者需要一起看，只看其中一项会把召回条数配错。
3. 同一档内的模型在这几项上取值相同，⛔ 但不代表回答质量相同。

## 这张表的适用范围

表中内容取自 fastgpt-plugin v1.1.3 的内置模型清单。以下情形不在覆盖范围内：

- 自行登记的自定义模型
- 各提供商侧的配额、区域与版本差异
- 未在内置清单中登记的能力字段

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
