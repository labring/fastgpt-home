---
title: 解决FastGPT新增模型渠道提示model config not found的问题
slug: /zh/troubleshoot/fastgpt-model-config-not-found
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5215
source_type: GitHub issue
---

# 解决FastGPT新增模型渠道提示model config not found的问题

## 现象
部署环境为FastGPT v4.9.14（Docker Compose部署）、aiproxy v0.1.7时，出现以下问题：
1. 在FastGPT前端“模型提供商”→“模型渠道”页面新增任意模型渠道（如gpt-3.5-turbo、gpt-4o、deepseek等），均报错`model config not found: [[模型名]]`。
2. 通过aiproxy的Swagger管理后台（/swagger/index.html）手动添加渠道，同样触发该报错。
3. aiproxy v0.1.7无法自动加载model.json，也无法通过前端或Swagger动态注册新模型渠道，仅能使用内置模型。
此外，前端无“自定义/代理/one-api”相关选项，无法使用该方案。

## 可能原因
根因为aiproxy v0.1.7存在功能异常，无法自动加载model.json，且不支持通过前端或Swagger动态注册新模型渠道，导致FastGPT无法正常识别并注册自定义模型渠道。

## 排查步骤
1. 确认当前部署的FastGPT版本为v4.9.14，aiproxy版本为v0.1.7，检查Docker Compose配置、环境变量、端口、网络、config.json挂载是否符合官方文档要求。
2. 访问FastGPT前端“模型提供商”→“模型渠道”页面，尝试新增任意模型渠道，记录是否出现`model config not found: [[模型名]]`报错。
3. 打开aiproxy的Swagger管理后台（/swagger/index.html），手动添加模型渠道，验证是否同样触发该报错。
4. 确认aiproxy是否可自动加载model.json，或是否存在动态注册模型渠道的功能异常。

## 解决与验证
当前版本的aiproxy v0.1.7存在无法自动加载model.json和动态注册模型渠道的限制，仅能使用内置模型。若需使用自定义模型渠道，需按实际环境确认官方文档中的版本支持说明，或等待后续版本更新修复该问题。对于one-api相关的自定义模型注册，需等待前端补充相关选项后再尝试操作。验证时，可先尝试使用aiproxy内置的模型，确认功能是否正常。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5215)
