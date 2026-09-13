---
title: FastGPT 信息不全issue的排查与规范填写指南
slug: /zh/troubleshoot/fastgpt-incomplete-issue-guide
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/495
source_type: GitHub issue
---

# FastGPT 信息不全issue的排查与规范填写指南

## 现象
提交的FastGPT排查需求未按照规范填写完整内容，仅包含例行检查确认项、版本选择项，未填写具体的问题描述、复现步骤、预期结果以及相关截图。回复中提及的未完成内容关联docker版本下m3e向量相关场景，未提供完整的异常信息。

## 可能原因
提交的issue未提供足够的异常细节，无法定位具体问题原因。未明确关联的组件版本或运行环境信息，相关排查需按实际环境确认。

## 排查步骤
1. 补充issue内容，填写具体的异常现象，包括但不限于报错文本、功能异常表现等。
2. 清晰描述复现步骤，按操作顺序列出每一步操作。
3. 说明预期的正常结果与实际出现的异常结果差异。
4. 提供相关的截图、日志等辅助信息。
5. 明确当前使用的FastGPT版本类型（公有云/私有部署）。

## 解决与验证
因当前提供的issue信息不完整，无法直接给出针对性的解决方法。需先补充完整上述排查所需的细节内容，再开展针对性的排查与解决。验证环节需在补充完整信息后，按照对应排查步骤确认问题是否得到解决，若仍存在异常，可再次提交完整的issue内容以便进一步处理。

> 来源: [FastGPT GitHub issue #495](https://github.com/labring/FastGPT/issues/495)
