---
title: FastGPT 对接 SimpleTex PDF 解析的历史需求
slug: /zh/troubleshoot/fastgpt-simpletex-pdf-parse
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3862
source_type: GitHub issue
---

# FastGPT 对接 SimpleTex PDF 解析的历史需求

## 适用场景与历史记录

原议题建议接入 SimpleTex API，利用当时提及的 PDF 解析额度。 原始讨论提交于 2025-02-23，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

原文属于集成建议，未记录实际调用故障。额度与商业条件随服务变化，页面应聚焦接口契约和测试样例。

## 排查与复测

1. 核对 SimpleTex 当前 API 的鉴权、文件提交和解析结果格式。
2. 根据 FastGPT 的自定义 PDF 解析契约确定字段转换及错误映射。
3. 用一份小 PDF 验证文本、公式与图片输出，再记录耗时与服务错误。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：simpltex pdf，图片解析 插件](https://github.com/labring/FastGPT/issues/3862)

> 来源: [FastGPT 环境变量与自定义 PDF 解析](https://doc.fastgpt.io/en/self-host/config/env)
