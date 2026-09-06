---
title: FastGPT 4.8.9 多轮附件识别异常与文件引用检查
slug: /zh/troubleshoot/fastgpt-multi-turn-attachment-recognition-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2350
source_type: GitHub issue
---

# FastGPT 4.8.9 多轮附件识别异常与文件引用检查

## 适用场景与历史记录

原报告来自 4.8.9：第一份附件可识别，后续附件的回答仍沿用第一份内容；报告者已更换模型做过测试。 原始讨论提交于 2024-08-12，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

官方 4.8.13 文件输入文档明确了本轮解析、AI 节点历史文件引用和子工作流手动传值的差异。这是定位多轮附件流向的可执行依据。

## 排查与复测

1. 准备内容明显不同的两个附件，在同一会话依次上传。
2. 核对每轮文件 URL，以及解析节点和 AI 节点实际接收的引用列表。
3. 按所用版本的历史文件规则调整连接后，复测第二轮答案是否引用第二份附件。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：4.8.9上传图片或文件 多轮对话只认识第一次的附件内容](https://github.com/labring/FastGPT/issues/2350)

> 来源: [FastGPT 文件输入与 4.8.13 行为说明](https://doc.fastgpt.io/en/guide/build/general/fileInput)
