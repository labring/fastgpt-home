---
title: FastGPT v4.9.0 数据库工具 tool not found 的历史排查
slug: /zh/troubleshoot/fastgpt-stale-issue-auto-close-2
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4159
source_type: GitHub issue
---

# FastGPT v4.9.0 数据库工具 tool not found 的历史排查

## 适用场景与历史记录

原议题标题报告数据库工具连接后出现 tool not found，正文注明 v4.9.0。 原始讨论提交于 2025-03-14，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

维护者建议更换模型。该回复提供模型工具调用能力的排查方向，结果仍需同配置对照验证。

## 排查与复测

1. 记录报错前模型返回的工具名称、工具参数与已注册工具列表。
2. 选用确认支持工具调用的模型，在相同数据库工具配置下做对照。
3. 将模型名、工具版本和完整错误整理为最小复现；成功标准是工具被正确调用并返回查询结果。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：fastgpt使用连接数据库工具，连接后提示如下错误:tool not found](https://github.com/labring/FastGPT/issues/4159)

> 来源: [原讨论中的补充回复](https://github.com/labring/FastGPT/issues/4159#issuecomment-2724299071)

> 来源: [FastGPT 工具调用与终止](https://doc.fastgpt.io/en/guide/build/workflow/nodes/tool)
