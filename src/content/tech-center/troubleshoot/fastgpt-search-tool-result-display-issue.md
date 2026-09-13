---
title: FastGPT v4.9.0 搜索工具后流式结果未显示的历史排查
slug: /zh/troubleshoot/fastgpt-search-tool-result-display-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4155
source_type: GitHub issue
---

# FastGPT v4.9.0 搜索工具后流式结果未显示的历史排查

## 适用场景与历史记录

原报告描述加入 Search XNG 后最终 AI 结果需要刷新才显示；移除该搜索工具时显示正常，部署类型留空。 原始讨论提交于 2025-03-14，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

线程缺少确定修复，部署类型也留空。带工具与基础对话的对照有助于定位实时显示差异。

## 排查与复测

1. 用同一提示词测试带搜索工具和基础对话两条路径。
2. 记录工具输出、最终 SSE 事件、浏览器控制台和刷新后历史记录内容。
3. 检查结果已存储但实时视图未更新的具体时点，再对照所用版本的修复记录。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：加入搜索工具后AI结果不显示了](https://github.com/labring/FastGPT/issues/4155)

> 来源: [FastGPT 对话 OpenAPI](https://doc.fastgpt.io/en/openapi/chat)
