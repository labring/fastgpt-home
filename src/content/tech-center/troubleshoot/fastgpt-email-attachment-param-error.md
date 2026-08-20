---
title: 解决FastGPT 4.14.5版本email工具附件参数识别与引用异常问题
slug: /zh/troubleshoot/fastgpt-email-attachment-param-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6954
source_type: GitHub issue
---

# 解决FastGPT 4.14.5版本email工具附件参数识别与引用异常问题

## 现象
在FastGPT 4.14.5版本中使用email工具时，系统提示附件需使用JSON数组格式，但实际仅能识别字符串格式的`[{"filename":"xxxx","path":"http://xxxx.com/1.docx"}]`，且无法正常引用该参数值。

## 可能原因
当前未明确该问题的官方根因，结合现象推测异常可能与该版本email工具的附件参数解析逻辑、参数引用规则有关，具体原因需按实际环境确认。

## 排查步骤
1.  确认当前使用的FastGPT版本为4.14.5，核对email工具的附件参数配置项。
2.  检查附件参数的输入格式，确保为标准JSON数组格式，避免被错误转为字符串形式。
3.  验证参数引用的配置逻辑，确认是否适配该版本email工具的附件字段规则，相关细节需按实际环境确认。

## 解决与验证
针对该问题，暂无公开的官方修复方案，可按以下方式验证排查：
1.  重新配置email工具的附件参数，确保输入为标准JSON数组格式，避免被错误包裹为字符串。
2.  核对参数引用的配置逻辑，确认是否适配该版本的附件字段规则，相关操作需按实际环境确认。
通过测试会话发送附件，可验证参数是否能正常识别与引用。

> 来源：[FastGPT GitHub Issue #6954](https://github.com/labring/FastGPT/issues/6954)
