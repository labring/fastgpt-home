---
title: FastGPT 猜你想问与检索内容关联的历史需求
slug: /zh/troubleshoot/fastgpt-quick-question-variable
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5097
source_type: GitHub issue
---

# FastGPT 猜你想问与检索内容关联的历史需求

## 适用场景与历史记录

原议题请求在猜你想问提示词编辑中选择变量，如检索引用内容。 原始讨论提交于 2025-06-26，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

当前对话 API 文档说明问题引导依据 chatId 获取最近会话，并提供 customPrompt。检索变量进入问题引导的路径需要用实际请求验证。

## 排查与复测

1. 记录问题引导的 appId、chatId 和已发布的提示词配置。
2. 检查生成引导问题时实际使用的上下文，确认检索内容是否进入该流程。
3. 需要严格引用资料时，用显式接收引用内容的工作流生成建议问题，并以日志核对变量值。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：猜你想问的提示词编辑增加变量](https://github.com/labring/FastGPT/issues/5097)

> 来源: [FastGPT 对话 OpenAPI](https://doc.fastgpt.io/en/openapi/chat)
