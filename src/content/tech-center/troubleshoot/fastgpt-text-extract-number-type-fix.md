---
title: 解决FastGPT高级编排文本提取number输出string问题
slug: /zh/troubleshoot/fastgpt-text-extract-number-type-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2522
source_type: GitHub issue
---

# 解决FastGPT高级编排文本提取number输出string问题

## 现象
高级编排中的文本内容提取模块，将提取字段配置数据类型设为number后，输出的数据类型仍为string。使用场景为需通过http调用传参时，提取结果为string的输出变量无法被http模块的number参数引用。

## 可能原因
未公开明确的排查结论，因当前仅收集到用户的功能诉求，无官方发布的根因分析，需结合实际部署环境与FastGPT版本信息确认具体原因。

## 排查步骤
1. 登录FastGPT平台，进入应用的高级编排页面。
2. 在编排流程中找到文本内容提取模块。
3. 对该模块的提取字段，将数据类型配置为number。
4. 保存并发布该编排流程，触发文本内容提取操作。
5. 查看该模块的输出变量，确认其实际数据类型。
6. 将该输出变量引用至http请求模块的number类型参数，测试调用是否失败。

## 解决与验证
当前无公开的官方解决方案，该问题为用户提出的功能优化诉求，希望为文本内容提取模块添加更多数据类型支持。如需使用数值类型的提取结果，需等待后续版本更新或向项目方提交功能反馈。临时适配方案需按实际环境确认，无统一通用方法。

> 来源: [FastGPT GitHub issue #2522](https://github.com/labring/FastGPT/issues/2522)
