---
title: FastGPT 动态 HTML 表单与模板转换的历史需求
slug: /zh/troubleshoot/fastgpt-template-conversion-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5054
source_type: GitHub issue
---

# FastGPT 动态 HTML 表单与模板转换的历史需求

## 适用场景与历史记录

原议题希望增加模板转换组件，根据对话动态生成 HTML 表单供用户提交。 原始讨论提交于 2025-06-17，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

现有官方文档分别提供 HTML 预览与表单输入节点。展示 HTML、收集表单值及工作流续执行有各自的安全和协议边界。

## 排查与复测

1. 明确表单字段、校验条件和提交后的工作流输出。
2. 用表单输入节点验证数据收集，用 HTML 预览验证展示需求。
3. 对动态生成字段场景检查 schema 与返回值校验，并测试提交后工作流继续执行。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：能不能增加一个模版转换的组件，可以渲染html动态生成表单](https://github.com/labring/FastGPT/issues/5054)

> 来源: [FastGPT 表单输入](https://doc.fastgpt.io/en/guide/build/workflow/nodes/form_input)

> 来源: [FastGPT 对话 HTML 渲染](https://doc.fastgpt.io/en/guide/chat/htmlRendering)
