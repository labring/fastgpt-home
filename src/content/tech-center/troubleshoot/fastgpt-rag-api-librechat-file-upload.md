---
title: LibreChat 调用 FastGPT 的文件上传与会话协议核对
slug: /zh/troubleshoot/fastgpt-rag-api-librechat-file-upload
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2584
source_type: GitHub issue
---

# LibreChat 调用 FastGPT 的文件上传与会话协议核对

## 适用场景与历史记录

原议题希望在 LibreChat 中通过 FastGPT API 使用文件上传，实现基于文档的聊天。 原始讨论提交于 2024-08-31，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

需要分别验证文件上传协议、可访问文件 URL 和 FastGPT 对话消息格式。

## 排查与复测

1. 记录 LibreChat 实际发出的上传和会话请求，去除凭证后保存样例。
2. 依据 FastGPT 对话 API 检查文件内容项、appId、chatId 和文件 URL。
3. 先直接调用 FastGPT 验证一个测试文档，再接入 LibreChat 并比较传入参数。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：希望fastgpt的api能够支持librechat的文件上传](https://github.com/labring/FastGPT/issues/2584)

> 来源: [FastGPT 对话 OpenAPI](https://doc.fastgpt.io/en/openapi/chat)

> 来源: [FastGPT 文件输入与 4.8.13 行为说明](https://doc.fastgpt.io/en/guide/build/general/fileInput)
