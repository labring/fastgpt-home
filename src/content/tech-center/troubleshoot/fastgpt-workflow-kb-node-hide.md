---
title: FastGPT 多检索节点的引用可见性历史需求
slug: /zh/troubleshoot/fastgpt-workflow-kb-node-hide
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5495
source_type: GitHub issue
---

# FastGPT 多检索节点的引用可见性历史需求

## 适用场景与历史记录

原议题自述在 4.9.14+ 的多检索节点工作流中，希望隐藏辅助分类检索的引用，同时保留其他引用。 原始讨论提交于 2025-08-19，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

原线程缺少节点级控制已实现的确认。“4.9.14 及以上均无此功能”是对未来版本的扩大解释，应保留为报告者当时使用范围。

## 排查与复测

1. 为两个检索节点分别准备可区分的测试资料。
2. 分别核对进入 AI 节点的引用数组和分享渠道的引用可见性设置。
3. 测试只保留目标引用的工作流连接，检查外部访客实际看到的出处及阅读权限。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：工作流应用中显示引用能不能只关闭部分呀](https://github.com/labring/FastGPT/issues/5495)

> 来源: [FastGPT 知识库分块阅读器](https://doc.fastgpt.io/en/guide/chat/quoteList)
