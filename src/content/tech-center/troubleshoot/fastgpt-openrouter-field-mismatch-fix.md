---
title: 解决FastGPT中OpenRouter返回思考内容字段不匹配问题
slug: /zh/troubleshoot/fastgpt-openrouter-field-mismatch-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3892
source_type: GitHub issue
---

# 解决FastGPT中OpenRouter返回思考内容字段不匹配问题

## 现象
在FastGPT中配置OpenRouter渠道时，添加请求体参数`"include_reasoning": true`以开启思考过程返回，此时OpenRouter返回的思考过程存储在`reason`字段，但FastGPT预期的存储字段为`reasoning_content`，导致系统无法正确识别并展示思考内容。

## 可能原因
该问题的核心原因为当前使用的AI代理版本未适配OpenRouter的思考内容返回格式，无法将`reason`字段中的思考内容正确映射到FastGPT预期的`reasoning_content`字段，导致思考内容无法被正常处理。

## 排查步骤
1. 确认当前部署的AI代理版本，检查版本号是否为0.1.4及以上。
2. 登录FastGPT后台，进入OpenRouter渠道配置页面，检查请求体参数是否包含`"include_reasoning": true`。
3. 抓取OpenRouter的返回数据，确认思考过程的存储字段是否为`reason`。

## 解决与验证
升级AI代理到0.1.4版本，该版本已官方支持OpenRouter渠道，可正确适配其返回的思考内容字段。升级完成后，重新发起包含`"include_reasoning": true`的对话请求，确认思考内容可被FastGPT正确识别并在界面正常展示。

> 来源: [FastGPT GitHub issue #3892](https://github.com/labring/FastGPT/issues/3892)
