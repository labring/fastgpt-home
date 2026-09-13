---
title: FastGPT 自定义文件解析与旧 Office 格式的历史需求
slug: /zh/troubleshoot/handle-fastgpt-auto-closed-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4628
source_type: GitHub issue
---

# FastGPT 自定义文件解析与旧 Office 格式的历史需求

## 适用场景与历史记录

原议题标题请求恢复自定义文件解析，并提及 .doc、.xls、.ppt 等格式在当时版本中的解析需求。 原始讨论提交于 2025-04-22，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

当前官方文档提供自定义 PDF 解析契约；该接口范围与各种旧 Office 格式支持需要分别核对。

## 排查与复测

1. 为 .doc、.xls、.ppt 各准备一份小测试文件，记录上传和解析结果。
2. 对照所用版本与解析服务支持的格式；必要时对副本转换为 .docx、.xlsx 或 .pptx 做对照。
3. 使用自定义解析服务时按具体格式与接口契约验收返回内容，避免仅按文件后缀判断成功。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：建议支持自定义文件解析，像V4.9.0以前一样，目前解析文件不支持doc/xls/ppt等格式的解析。](https://github.com/labring/FastGPT/issues/4628)

> 来源: [FastGPT 环境变量与自定义 PDF 解析](https://doc.fastgpt.io/en/self-host/config/env)

> 来源: [FastGPT 文件输入与 4.8.13 行为说明](https://doc.fastgpt.io/en/guide/build/general/fileInput)
