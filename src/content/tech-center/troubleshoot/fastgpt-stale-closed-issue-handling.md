---
title: FastGPT 4.8.22 DOCX 页眉页脚内容缺失的历史排查
slug: /zh/troubleshoot/fastgpt-stale-closed-issue-handling
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4135
source_type: GitHub issue
---

# FastGPT 4.8.22 DOCX 页眉页脚内容缺失的历史排查

## 适用场景与历史记录

原议题标题报告上传 DOCX 后页眉页脚没有传给大模型，提问者填写私有部署 4.8.22。 原始讨论提交于 2025-03-13，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

应逐层比较原 DOCX、解析文本与模型输入，以确定内容缺失发生的阶段。

## 排查与复测

1. 制作一份在正文、页眉和页脚分别写入不同测试标识的 DOCX。
2. 查看解析输出是否保留三个标识，再检查 AI 节点实际接收的内容。
3. 以格式转换后的副本做对照，记录解析器、版本和丢失发生的环节。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：上传docx文档包含的页眉页脚不会被传给大模型](https://github.com/labring/FastGPT/issues/4135)

> 来源: [FastGPT 文件输入与 4.8.13 行为说明](https://doc.fastgpt.io/en/guide/build/general/fileInput)
