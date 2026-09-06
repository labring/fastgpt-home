---
title: FastGPT 4.14.5-fix 偶发对话记录缺失的历史排查
slug: /zh/troubleshoot/fastgpt-occasional-missing-dialogs
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6304
source_type: GitHub issue
---

# FastGPT 4.14.5-fix 偶发对话记录缺失的历史排查

## 适用场景与历史记录

原报告称旧版和 4.14.5-fix 曾各发现一次少量对话记录缺失，应用日志中也查不到对应记录。 原始讨论提交于 2026-01-21，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

原线程缺少根因与恢复确认。应围绕记录标识、保存响应和清理行为保留可验证信息。

## 排查与复测

1. 记录问题发生时间、appId、chatId、响应消息 ID 及访问方式。
2. 对照会话请求的保存响应、应用日志和授权范围内的数据库记录。
3. 核对历史清理策略及删除操作，使用测试会话检查保存后重新读取的结果。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：偶尔丢失对话记录](https://github.com/labring/FastGPT/issues/6304)

> 来源: [FastGPT 对话 OpenAPI](https://doc.fastgpt.io/en/openapi/chat)
