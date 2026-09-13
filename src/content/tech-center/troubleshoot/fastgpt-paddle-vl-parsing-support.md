---
title: FastGPT 接入 PaddleOCR-VL 增强解析的历史需求
slug: /zh/troubleshoot/fastgpt-paddle-vl-parsing-support
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5789
source_type: GitHub issue
---

# FastGPT 接入 PaddleOCR-VL 增强解析的历史需求

## 适用场景与历史记录

原议题于 2025 年请求增加 PaddleOCR-VL 增强解析支持，讨论中记录了具体模型的接入需求。 原始讨论提交于 2025-10-20，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

该请求不足以确定当前原生适配情况。官方自定义 PDF 解析接口可作为扩展接入点，其服务契约与具体 OCR 模型能力需要分别验证。

## 排查与复测

1. 确定希望使用的 PaddleOCR-VL 服务版本及输入输出格式。
2. 按当前版本自定义 PDF 解析契约，检查 file 上传和 pages、markdown 返回字段。
3. 用表格、图片与普通文本样本评估解析结果，再决定是否需要独立适配服务。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：能不能增加paddle-vl的增强解析支持](https://github.com/labring/FastGPT/issues/5789)

> 来源: [FastGPT 环境变量与自定义 PDF 解析](https://doc.fastgpt.io/en/self-host/config/env)
