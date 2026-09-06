---
title: FastGPT PDF 增强解析多模型选择：历史需求与自定义接口
slug: /zh/troubleshoot/fastgpt-file-parse-multi-model
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5560
source_type: GitHub issue
---

# FastGPT PDF 增强解析多模型选择：历史需求与自定义接口

## 适用场景与历史记录

原议题请求针对表格、印章等场景选择不同 OCR 服务，并建议遵循自定义解析接口。 原始讨论提交于 2025-08-29，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

当前官方环境变量文档提供自定义 PDF 解析服务入口。全局自定义服务接入和每个智能体的独立模型选择属于两项能力。

## 排查与复测

1. 明确需要全局更换解析服务，还是在同一部署内按应用选择服务。
2. 按部署版本文档核对配置：4.15.0 起使用 CUSTOM_PDF_PARSE_URL 与可选密钥。
3. 用含表格或印章的小 PDF 检查服务收到 multipart/form-data 的 file，并返回 pages 与 markdown。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：文件的增强解析，能否支持可以选择多种处理模型](https://github.com/labring/FastGPT/issues/5560)

> 来源: [FastGPT 环境变量与自定义 PDF 解析](https://doc.fastgpt.io/en/self-host/config/env)
