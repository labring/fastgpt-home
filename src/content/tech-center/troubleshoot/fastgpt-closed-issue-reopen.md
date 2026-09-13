---
title: FastGPT 接入百度 Mochow 向量数据库的历史需求
slug: /zh/troubleshoot/fastgpt-closed-issue-reopen
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3604
source_type: GitHub issue
---

# FastGPT 接入百度 Mochow 向量数据库的历史需求

## 适用场景与历史记录

原议题提出使用百度 Mochow 保存向量数据。 原始讨论提交于 2025-01-16，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

原线程缺少已完成 Mochow 适配的确认，接入范围需根据实际版本及存储实现核对。

## 排查与复测

1. 记录期望的 FastGPT 版本、Mochow 版本及向量维度。
2. 对照该版本支持的向量存储实现确认接口差异。
3. 在隔离测试数据上定义写入、检索、删除和备份恢复验收项，再提交适配需求。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：增加百度mochow向量数据库](https://github.com/labring/FastGPT/issues/3604)
