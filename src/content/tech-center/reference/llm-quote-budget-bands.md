---
title: FastGPT 对话模型引用预算分档表
slug: /zh/reference/llm-quote-budget-bands
page_type: 基准数据页
source: https://github.com/labring/fastgpt-plugin/tree/v1.1.3/packages/infrastructure/src/static-data/models/provider
source_type: 官方文档
description: fastgpt-plugin v1.1.3 内置 268 个对话模型的引用预算（quoteMaxToken）分 5 档，并换算成一轮能放下的段数。
language: zh
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# FastGPT 对话模型引用预算分档表

`quoteMaxToken` 是对话模型的引用预算：一轮回答里知识库引用内容合计能占多少 token。本页把 fastgpt-plugin v1.1.3 内置的 268 个对话模型按这个值分成 5 档，核验日 2026-09-28。

## 分档表

| 引用预算区间（tokens） | 模型数 | 提供商数 | 按每段 512 tokens 一轮约可放段数 | 该档引用预算最大的几个模型 |
| --- | --- | --- | --- | --- |
| 4,000–8,000 | 16 | 6 | 7–15 | `generalv3`、`generalv3.5`、`4.0Ultra`、`step-1-8k` |
| 12,000–32,000 | 35 | 12 | 23–62 | `hunyuan-turbos-latest`、`hunyuan-t1-latest`、`internlm2-pro-chat`、`internlm3-8b-instruct` |
| 50,000–128,000 | 90 | 16 | 97–250 | `hunyuan-2.0-instruct-20251111`、`hunyuan-2.0-thinking-20251109`、`gpt-5.2-chat-latest`、`gpt-5.1-chat-latest` |
| 190,000–350,000 | 68 | 14 | 371–683 | `gpt-5.4-mini`、`gpt-5.4-nano`、`gpt-5.3-codex`、`gpt-5.2` |
| 500,000–10,000,000 | 59 | 10 | 976–19,531 | `qwen-long`、`doubao-seed-evolving`、`gemini-3.8-flash`、`gemini-3.7-flash` |

## 怎么读这张表

段数一列按内置向量模型统一的默认分段长度 512 tokens 换算，只是上限估计：
实际放进引用的段数还受检索侧返回条数、每段实际长度与最低相关度过滤影响。把分段调长时，一轮能放下的段数按同样比例减少。

## 这张表的适用范围

数值取自开源仓库 fastgpt-plugin v1.1.3 的内置模型定义。私有化部署自行登记的模型或改过的 `quoteMaxToken` 以实际配置为准。

> 数据取自 fastgpt-plugin v1.1.3 的内置模型清单，核验日 2026-09-28。
