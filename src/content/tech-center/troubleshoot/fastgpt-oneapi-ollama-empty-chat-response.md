---
title: FastGPT 4.9.0 Ollama 空响应：历史流式兼容修复
slug: /zh/troubleshoot/fastgpt-oneapi-ollama-empty-chat-response
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4043
source_type: GitHub issue
---

# FastGPT 4.9.0 Ollama 空响应：历史流式兼容修复

## 适用场景与历史记录

原报告指出升级 4.9.0 后模型渠道测试成功，聊天调用却返回空，embedding 调用正常。 原始讨论提交于 2025-03-07，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

维护者定位到当时基于 OneAPI 0.6.8 的 Ollama 流式兼容问题，随后确认已更新 AI Proxy，并给出 hash 4885d224a。

## 排查与复测

1. 记录 FastGPT、AI Proxy 或 OneAPI 的实际版本及镜像摘要。
2. 对同一提示词分别测试流式和非流式调用，保存原始响应。
3. 按所用版本升级说明更新配套代理后复测；同时核对容器网络、模型名和渠道地址。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：4.9.0 ollama测试失败](https://github.com/labring/FastGPT/issues/4043)

> 来源: [原讨论中的补充回复](https://github.com/labring/FastGPT/issues/4043#issuecomment-2709596349)

> 来源: [原讨论中的补充回复](https://github.com/labring/FastGPT/issues/4043#issuecomment-2710562173)

> 来源: [FastGPT 的 Ollama 接入](https://doc.fastgpt.io/en/self-host/custom-models/ollama)
