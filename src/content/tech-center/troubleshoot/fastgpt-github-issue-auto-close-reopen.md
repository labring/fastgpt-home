---
title: FastGPT 聊天窗口标题未采用自定义名称的历史排查
slug: /zh/troubleshoot/fastgpt-github-issue-auto-close-reopen
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4397
source_type: GitHub issue
---

# FastGPT 聊天窗口标题未采用自定义名称的历史排查

## 适用场景与历史记录

原议题标题报告聊天窗口名称有时与用户自定义名称不同，正文包含截图。 原始讨论提交于 2025-03-30，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

原线程缺少具体版本和修复确认。应用名、会话标题与分享窗口标题应分别核对。

## 排查与复测

1. 记录应用名、会话标题和分享窗口标题，明确出现差异的是哪一项。
2. 新建会话并比较刷新前后的标题以及初始化请求的返回值。
3. 核对应用保存与发布状态，提供最小操作顺序和相关截图。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：chat窗口标题有时不能正常显示为自己设定的名称](https://github.com/labring/FastGPT/issues/4397)

> 来源: [FastGPT 对话 OpenAPI](https://doc.fastgpt.io/en/openapi/chat)

> 来源: [FastGPT 应用构建常见问题](https://doc.fastgpt.io/en/guide/build/faq)
