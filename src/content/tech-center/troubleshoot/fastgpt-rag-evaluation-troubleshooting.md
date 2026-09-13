---
title: FastGPT RAG 评测：历史 Ragas 需求与内置批量评测
slug: /zh/troubleshoot/fastgpt-rag-evaluation-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2503
source_type: GitHub issue
---

# FastGPT RAG 评测：历史 Ragas 需求与内置批量评测

## 适用场景与历史记录

原议题于 2024 年请求引入类似 Ragas 的体系化评测。 原始讨论提交于 2024-08-25，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

官方文档说明从 v4.11.0 支持应用批量评测，Beta 文档当前明确开放回答准确性指标。内置评测与完整 Ragas 工具链的覆盖范围应分别说明。

## 排查与复测

1. 在应用评测入口选择待评测应用和评分模型。
2. 按 CSV 模板填写问题、标准答案及需要的历史和变量，先用一小批样本执行。
3. 查看逐条结果和综合评分，固定数据集比较两次应用配置的表现。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：ragas 评测体系](https://github.com/labring/FastGPT/issues/2503)

> 来源: [FastGPT 应用评测 Beta](https://doc.fastgpt.io/en/guide/build/evaluation)
