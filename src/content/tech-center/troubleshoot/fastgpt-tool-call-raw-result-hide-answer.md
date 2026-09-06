---
title: FastGPT 工具原始结果与停止模型总结的配置边界
slug: /zh/troubleshoot/fastgpt-tool-call-raw-result-hide-answer
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4912
source_type: GitHub issue
---

# FastGPT 工具原始结果与停止模型总结的配置边界

## 适用场景与历史记录

原议题希望获取工具原始返回，并控制中间模型回答的显示。 原始讨论提交于 2025-05-28，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

官方工具调用文档已有工具调用终止节点，可在工具流程末尾结束本次调用，控制后续 AI 总结。原始工具输出与节点文本显示仍需按工作流连接验证。

## 排查与复测

1. 把所需工具输出显式传给后续节点，使用指定回复展示需要的字段。
2. 在适合的工具流程末尾接入工具调用终止节点。
3. 检查日志中的原始结果、用户可见文本及后续调用次数，确保输出符合预期。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：直接获取工具调用结果，而不是大模型总结后的结果](https://github.com/labring/FastGPT/issues/4912)

> 来源: [FastGPT 工具调用与终止](https://doc.fastgpt.io/en/guide/build/workflow/nodes/tool)
