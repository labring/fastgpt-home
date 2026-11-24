---
title: 说明FastGPT应用评测（Beta）功能的支持版本与可用指标
slug: /zh/reference/fastgpt-app-evaluation-beta
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/build/evaluation
source_type: 官方文档小节
---

# 说明FastGPT应用评测（Beta）功能的支持版本与可用指标

## 结论
FastGPT v4.11.0版本及以上支持应用评测（Beta）功能。该功能可通过传入多组问答对，自动对应用执行结果进行打分，实现应用运行效果的定量评估。

## 具体怎么做
1. 确认当前使用的FastGPT版本为v4.11.0及以上
2. 准备多组问答对数据
3. 将问答对传入系统，系统将自动执行评测并生成打分结果
当前评测仅使用回答准确性指标，系统原本支持的问题相关性、语义准确性指标暂未开放。

## 注意事项
该功能处于Beta测试阶段，仅支持回答准确性评估指标，其余两项指标将在后续版本中补充完善。使用该功能需确保FastGPT版本符合要求。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/build/evaluation)
