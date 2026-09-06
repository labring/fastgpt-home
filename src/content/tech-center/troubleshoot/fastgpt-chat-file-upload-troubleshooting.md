---
title: FastGPT 4.8.7 聊天文件入口缺失：4.8.9 起的文件输入配置
slug: /zh/troubleshoot/fastgpt-chat-file-upload-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2265
source_type: GitHub issue
---

# FastGPT 4.8.7 聊天文件入口缺失：4.8.9 起的文件输入配置

## 适用场景与历史记录

原报告来自 4.8.7 私有部署，提问者在聊天框找不到 Excel、PDF 文件上传入口。 原始讨论提交于 2024-08-05，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

官方文件输入文档明确从 4.8.9 支持简易模式和工作流中的文件上传，4.8.13 又调整了解析流程。功能入口位于应用配置。

## 排查与复测

1. 选择支持文件输入的版本，并按升级文档完成必要迁移。
2. 在简易模式的文件上传或工作流系统配置的文件输入中开启功能。
3. 发布应用后上传一份小 PDF 或 Excel，核对文件 URL、解析结果和模型实际引用。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：请问怎么在聊天框中上传文件，比如Excel](https://github.com/labring/FastGPT/issues/2265)

> 来源: [FastGPT 文件输入与 4.8.13 行为说明](https://doc.fastgpt.io/en/guide/build/general/fileInput)
