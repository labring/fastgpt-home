---
title: FastGPT HTTP 工具可选参数的配置排查
slug: /zh/troubleshoot/fastgpt-http-tool-optional-param-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4113
source_type: GitHub issue
---

# FastGPT HTTP 工具可选参数的配置排查

## 适用场景与历史记录

原议题询问 HTTP 请求工具为什么无法设置可选参数，缺少具体版本和 OpenAPI 配置。 原始讨论提交于 2025-03-12，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

工具参数的类型、来源和 required 标记需要分别核对。

## 排查与复测

1. 记录使用的是 HTTP 请求节点还是通过 OpenAPI 导入的 HTTP 工具。
2. 检查参数 schema 的 required 列表、类型及默认值，导出最小配置。
3. 分别传入和省略该可选参数，核对实际请求与上游接口响应。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：HTTP请求工具无法设置可选参数](https://github.com/labring/FastGPT/issues/4113)

> 来源: [FastGPT 工具调用与终止](https://doc.fastgpt.io/en/guide/build/workflow/nodes/tool)
