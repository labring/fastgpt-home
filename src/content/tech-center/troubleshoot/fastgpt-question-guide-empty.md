---
title: 解决FastGPT猜你想问功能返回空数组的问题
slug: /zh/troubleshoot/fastgpt-question-guide-empty
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6486
source_type: GitHub issue
---

# 解决FastGPT猜你想问功能返回空数组的问题

## 现象
在FastGPT v4.14.7.1私有部署版本中，用户创建新应用并开启猜你想问功能、配置大模型后，无论提问何种内容、更换任何大模型，猜你想问均返回空数组。服务日志显示，请求`/api/core/ai/agent/v2/createQuestionGuide`返回200状态码，但存在警告日志：`WRN ai:functions         Question guide response missing JSON array`，且对应返回的answer仅为不完整的`["Write`片段，同时存在LLM响应因长度限制继续生成的日志。

## 可能原因
该问题的直接原因是大模型返回的猜你想问结果未生成完整的JSON数组格式，仅返回了不完整的片段，导致系统无法正常解析，最终返回空数组。此外，LLM响应长度触发分段生成逻辑，可能进一步影响了最终输出的完整性。

## 排查步骤（有序列表，每步可照做）
1.  登录FastGPT服务所在环境，查看服务日志，搜索关键词`Question guide response missing JSON array`，确认是否存在该警告日志。
2.  定位对应请求ID（如日志中的`a2749e20-8f03-4ec9-9039-21611f842e59`）的LLM返回内容，检查是否存在不完整的JSON片段。
3.  确认当前使用的大模型是否支持生成符合要求的JSON格式猜你想问结果，需按实际环境确认。
4.  检查大模型响应长度限制相关配置，确认是否因响应过长触发分段生成，导致输出不完整。

## 解决与验证
解决方法：首先确保所配置的大模型能够生成完整的、格式正确的JSON数组格式的猜你想问结果。若因响应长度触发分段生成，可调整大模型的响应长度限制参数（需按实际环境配置）。验证方式：重新创建应用并开启猜你想问功能，发起对话后查看猜你想问是否生成正常的推荐问题列表，同时检查日志中是否不再出现`WRN ai:functions         Question guide response missing JSON array`的警告。

> 来源：[FastGPT GitHub Issue #6486](https://github.com/labring/FastGPT/issues/6486)
