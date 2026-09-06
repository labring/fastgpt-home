---
title: FastGPT 非流式 content 的字符串与数组格式核对
slug: /zh/troubleshoot/fastgpt-completions-content-format
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4877
source_type: GitHub issue
---

# FastGPT 非流式 content 的字符串与数组格式核对

## 适用场景与历史记录

原议题询问非流式 completions 响应中的 content 为什么有时为字符串、有时为数组。 原始讨论提交于 2025-05-23，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

原线程包含两种响应格式的截图，缺少能够确定分支原因的请求样例。不同响应内容形态应按接口契约及实际响应处理。

## 排查与复测

1. 保存触发两种格式的最小请求和完整响应，记录版本、流式标记及工作流节点。
2. 对照当前对话 API 契约核对 content 的结构和附件、交互等内容类型。
3. 让集成端按类型读取文本或内容项，并对两份固定响应执行回归。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：非流式返回数据格式咨询](https://github.com/labring/FastGPT/issues/4877)

> 来源: [FastGPT 对话 OpenAPI](https://doc.fastgpt.io/en/openapi/chat)
