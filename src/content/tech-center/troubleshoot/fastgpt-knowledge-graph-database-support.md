---
title: FastGPT 图数据库检索适配的历史需求
slug: /zh/troubleshoot/fastgpt-knowledge-graph-database-support
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/466
source_type: GitHub issue
---

# FastGPT 图数据库检索适配的历史需求

## 适用场景与历史记录

原议题请求让知识切分、存储和检索支持图数据库。 原始讨论提交于 2023-11-13，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

原线程缺少图数据库适配的实现方案和完成确认。接入需要明确数据模型与接口契约。

## 排查与复测

1. 明确图数据库要承担的工作：关系查询、向量存储还是检索增强。
2. 列出图结构、数据规模、查询协议及与工作流交互所需的输入输出。
3. 在独立测试集验证图查询结果通过受控接口进入工作流的方案，再评估完整适配。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：Support graph database](https://github.com/labring/FastGPT/issues/466)
