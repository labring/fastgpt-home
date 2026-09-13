---
title: FastGPT 接入 Qwen3 Coder 模型的历史需求与配置核对
slug: /zh/troubleshoot/fastgpt-qwen-coder-issue-auto-closed
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5333
source_type: GitHub issue
---

# FastGPT 接入 Qwen3 Coder 模型的历史需求与配置核对

## 适用场景与历史记录

原议题请求增加 qwen3-coder-plus 与 qwen3-coder-480b-a35b-instruct。 原始讨论提交于 2025-07-29，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

预置模型列表和通过模型渠道接入的能力应分别核对，并以提供商实际开放的模型 ID 为准。

## 排查与复测

1. 核对模型提供商实际开放的模型 ID 和接口协议。
2. 在 FastGPT 模型配置中建立对应模型及渠道，分别测试基础对话和工具调用。
3. 记录模型参数、返回体与用量，按具体能力验证业务任务。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：建议增加通义千问的coder模型](https://github.com/labring/FastGPT/issues/5333)

> 来源: [FastGPT 模型配置](https://doc.fastgpt.io/en/self-host/config/model/intro)
