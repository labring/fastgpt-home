---
title: FastGPT 接入文本审核模型的历史需求与流程设计
slug: /zh/troubleshoot/fastgpt-text-audit-request
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3847
source_type: GitHub issue
---

# FastGPT 接入文本审核模型的历史需求与流程设计

## 适用场景与历史记录

原议题请求支持 OpenAI Moderation，以审核用户输入和 AI 输出。 原始讨论提交于 2025-02-20，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

原线程缺少原生模型集成的确认，可依据现有 HTTP 与分支节点设计受控审核步骤并验证接口。

## 排查与复测

1. 分别定义输入审核和输出审核的触发点，以及允许、拦截和服务异常时的行为。
2. 按审核提供商当前契约通过服务端调用，保存结构化判定结果。
3. 使用已标注的测试文本检查工作流分支和用户反馈，记录误判情况。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：( Feature ) 请求支持 OpenAI Moderation 模型](https://github.com/labring/FastGPT/issues/3847)

> 来源: [FastGPT 工具调用与终止](https://doc.fastgpt.io/en/guide/build/workflow/nodes/tool)
