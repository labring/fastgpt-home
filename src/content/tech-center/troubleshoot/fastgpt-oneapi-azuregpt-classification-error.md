---
title: 解决FastGPT使用One API分发Azure GPT时的分类知识库功能报错问题
slug: /zh/troubleshoot/fastgpt-oneapi-azuregpt-classification-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/444
source_type: GitHub issue
---

# 解决FastGPT使用One API分发Azure GPT时的分类知识库功能报错问题

## 现象
用户使用One API分发Azure GPT，已完成简单对话功能的调试且可正常使用，但在调用"问题分类+知识库类型"功能时触发报错。用户上传了confit.json的配置截图，用于展示当前的分发配置内容。

## 可能原因
目前未明确具体根因，结合使用场景推测可能与配置参数的适配性、功能调用的参数传递逻辑有关，具体根因需结合实际运行日志和配置细节进一步确认。

## 排查步骤
1.  检查confit.json配置文件的格式，确认所有参数的引号、逗号等符号无遗漏或语法错误。
2.  核对confit.json中的分发配置参数，确保与One API对接Azure GPT的要求匹配。
3.  查看系统运行日志，提取"问题分类+知识库类型"功能调用时的具体报错信息。
4.  单独测试"问题分类+知识库类型"功能，排除简单对话功能正常带来的干扰。
5.  确认One API的分发能力是否支持组合功能的调用，需按实际环境确认具体适配要求。

## 解决与验证
1.  修正confit.json中的格式错误或参数不匹配问题，确保配置符合对接要求。
2.  调整One API的分发配置，使其兼容"问题分类+知识库类型"功能的调用逻辑，具体调整方式需按实际环境确认。
3.  重新调用"问题分类+知识库类型"功能，确认报错消失且功能正常返回结果。
4.  再次验证简单对话功能，确保整体服务运行稳定。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/444)
