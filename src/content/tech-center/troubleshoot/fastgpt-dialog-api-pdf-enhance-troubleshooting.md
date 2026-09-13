---
title: 解决FastGPT对话接口API调用PDF增强不生效的问题
slug: /zh/troubleshoot/fastgpt-dialog-api-pdf-enhance-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6252
source_type: GitHub issue
---

# 解决FastGPT对话接口API调用PDF增强不生效的问题

## 现象
FastGPT页面上传PDF可正常调用增强解析，但使用API（如curl）调用对话接口时，PDF增强功能不生效。手动添加"customPdfParse": true参数无效，且日志显示页面调用与API调用的URL格式存在差异。

## 可能原因
- 未在对话关联的工作流中启用PDF增强功能
- 未完成工作流的保存与发布操作
- 手动添加了无效的customPdfParse参数
- 系统级PDF增强配置未正确启用

## 排查步骤
1. 检查对话关联的工作流是否已启用PDF增强功能，确认完成保存与发布操作。
2. 移除代码中的customPdfParse参数，该参数无需手动配置。
3. 参考https://doc.fastgpt.io/docs/introduction/development/configuration文档，核对系统级PDF增强相关配置项是否启用。
4. 对比页面调用与API调用的URL格式，确保API调用参数与页面配置一致。

## 解决与验证
无需手动添加customPdfParse参数，需确保工作流中已开启PDF增强功能并完成保存发布。若仍未生效，需参考https://doc.fastgpt.io/docs/introduction/development/configuration文档完成系统级配置并勾选启用。验证方式为使用API调用测试PDF解析，确认增强功能正常生效。

> 来源: [FastGPT GitHub issue #6252](https://github.com/labring/FastGPT/issues/6252)
