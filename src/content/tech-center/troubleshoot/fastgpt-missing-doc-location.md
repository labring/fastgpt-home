---
title: FastGPT 引用原文定位：历史需求与分块阅读器
slug: /zh/troubleshoot/fastgpt-missing-doc-location
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/359
source_type: GitHub issue
---

# FastGPT 引用原文定位：历史需求与分块阅读器

## 适用场景与历史记录

原议题于 2023 年请求从知识问答跳到文档中的具体位置，以查看出处上下文。 原始讨论提交于 2023-09-27，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

官方文档说明 4.9.1 引入分块阅读器，可打开原文并高亮引用片段。高亮引用位置与恢复原始 PDF 页码属于不同范围。

## 排查与复测

1. 使用含明确段落标识的测试文档建立知识库并发起查询。
2. 点击答案引用，核对分块阅读器的原文和高亮位置。
3. 分别以有完整文档权限和仅引用可见的访问方式检查展示范围。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：Can the answer be associated with the specific source (location) of the document when asking questions in the knowledge base?](https://github.com/labring/FastGPT/issues/359)

> 来源: [FastGPT 知识库分块阅读器](https://doc.fastgpt.io/en/guide/chat/quoteList)
