---
title: FastGPT 接入 Gemini 搜索的历史需求与请求协议核对
slug: /zh/troubleshoot/fastgpt-gemini-search-config
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3843
source_type: GitHub issue
---

# FastGPT 接入 Gemini 搜索的历史需求与请求协议核对

## 适用场景与历史记录

原议题请求 Gemini 2.0 的 Google 搜索工具支持，并给出工具字段示例。 原始讨论提交于 2025-02-20，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

原文属于功能建议。模型原生协议、兼容协议和代理透传能力需要分别确认。

## 排查与复测

1. 记录模型、渠道和实际调用协议，以及希望开启的搜索工具。
2. 对照提供商在该协议下的当前参数说明，检查出站请求是否包含工具声明。
3. 使用一条需要实时信息的问题，对照原始响应中的工具或来源信息验证搜索发生。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：Gemini 2.0 的GoogleSearch](https://github.com/labring/FastGPT/issues/3843)
