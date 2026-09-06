---
title: FastGPT RouteLLM 成本路由的历史需求与分类方案
slug: /zh/troubleshoot/fastgpt-stale-issue-closed
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2090
source_type: GitHub issue
---

# FastGPT RouteLLM 成本路由的历史需求与分类方案

## 适用场景与历史记录

原议题希望引入 RouteLLM，在强弱模型之间按问题路由，兼顾质量与成本。 原始讨论提交于 2024-07-19，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

维护者提出问题分类或工具调用的思路，提问者继续指出质量与成本目标。普通分类方案需要实测，才能评价其与目标路由器的差异。

## 排查与复测

1. 准备具有难度标注的固定问题集，并记录目标成本与质量指标。
2. 使用分类节点连接不同模型分支，记录每题的路由和输出。
3. 对比单模型基线的质量、延迟和用量，再评估是否需要专门路由服务。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：希望能支持RouteLLM功能](https://github.com/labring/FastGPT/issues/2090)

> 来源: [原讨论中的补充回复](https://github.com/labring/FastGPT/issues/2090#issuecomment-2249648424)

> 来源: [FastGPT 问题分类节点](https://doc.fastgpt.io/en/guide/build/workflow/nodes/question_classify)
