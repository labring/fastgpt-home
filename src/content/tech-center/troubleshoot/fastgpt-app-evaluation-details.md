---
title: 解答FastGPT应用评测的维度及评分方式相关问题
slug: /zh/troubleshoot/fastgpt-app-evaluation-details
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5663
source_type: GitHub issue
---

# 解答FastGPT应用评测的维度及评分方式相关问题

## 现象
使用FastGPT过程中，对应用评测功能的维度、评分实现方式存在疑问，无法明确具体的评测维度与评分逻辑。

## 可能原因
未获取到官方公开的应用评测维度说明与评分实现细节，对评测逻辑存在认知空白。

## 排查步骤
1.  确认需使用的评测维度范围，明确是否仅需使用回答准确性维度
2.  梳理需实现的评分逻辑，区分不同维度对应的实现方式
3.  按实际需求对齐评测维度与评分方法

## 解决与验证
FastGPT应用评测的维度包含回答准确性、问题相关性、语义准确性，当前仅支持回答准确性维度。不同评测维度使用不同的实现方式，包含大模型评分及其他方式。可通过实际调用评测功能，确认输出的评分维度与预期一致，验证评分结果符合对应维度的评估规则。

> 来源: [FastGPT GitHub issue #5663](https://github.com/labring/FastGPT/issues/5663)
