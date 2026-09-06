---
title: FastGPT 工具调用历史中的 reasoning 展示排查
slug: /zh/troubleshoot/fastgpt-tool-call-history-display-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5227
source_type: GitHub issue
---

# FastGPT 工具调用历史中的 reasoning 展示排查

## 适用场景与历史记录

原议题描述工具调用模式的聊天历史和详情中看不到模型的思考过程。 原始讨论提交于 2025-07-16，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

线程缺少模型、渠道和响应字段信息。能够展示的内容取决于模型对外返回的 reasoning 数据及产品记录方式。

## 排查与复测

1. 记录模型是否返回公开的 reasoning 字段，以及渠道是否保留该字段。
2. 比较同一轮原始响应、实时对话和历史详情中的内容。
3. 提供脱敏请求和差异位置，分别检查字段传输、持久化及页面渲染。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：工具调用模式，在聊天历史和查看详情中无法查看思考过程](https://github.com/labring/FastGPT/issues/5227)

> 来源: [FastGPT 对话 OpenAPI](https://doc.fastgpt.io/en/openapi/chat)

> 来源: [FastGPT 模型配置](https://doc.fastgpt.io/en/self-host/config/model/intro)
