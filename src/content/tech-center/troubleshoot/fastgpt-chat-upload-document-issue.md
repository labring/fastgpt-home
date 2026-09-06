---
title: FastGPT 聊天上传文档：历史请求与现有配置
slug: /zh/troubleshoot/fastgpt-chat-upload-document-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1528
source_type: GitHub issue
---

# FastGPT 聊天上传文档：历史请求与现有配置

## 适用场景与历史记录

原议题于 2024 年 5 月提出聊天中上传文档的需求，评论讨论了当时开源版的实现计划。 原始讨论提交于 2024-05-18，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

官方文档提供从 4.8.9 起的文件输入配置，并说明后续版本对文件解析和历史引用的调整。

## 排查与复测

1. 在应用配置中开启文件输入，并确定文件交给文档解析还是多模态模型。
2. 使用工作流时将文件 URL 明确传到解析或 AI 节点。
3. 发布后发起新会话上传测试文档，检查其内容是否进入回答依据。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：什么时候聊天支持上传文档功能？](https://github.com/labring/FastGPT/issues/1528)

> 来源: [FastGPT 文件输入与 4.8.13 行为说明](https://doc.fastgpt.io/en/guide/build/general/fileInput)
