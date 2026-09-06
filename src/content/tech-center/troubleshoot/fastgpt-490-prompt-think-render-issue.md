---
title: 解决FastGPT 4.9.0提示词模式工具调用思考模型渲染异常问题
slug: /zh/troubleshoot/fastgpt-490-prompt-think-render-issue
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4042
source_type: GitHub issue
---

# 解决FastGPT 4.9.0提示词模式工具调用思考模型渲染异常问题

## 现象
FastGPT 4.9.0版本的提示词模式工具调用功能中，思考模型的思考内容渲染出现异常。Qwen14b模型输出存在思考内容但未正确渲染；Qwen72b模型存在思考内容但未展示think模块；GLM模型完全不输出think模块。仅deepseek-r1模型可正常生效。

## 可能原因
当前未明确具体技术成因，需按实际部署环境与模型配置确认。

## 排查步骤
1. 确认当前使用的FastGPT版本为4.9.0，且已开启提示词模式工具调用功能。
2. 依次测试不同模型的对话表现，记录各模型的输出特征，包括是否输出think模块、思考内容是否正常展示。
3. 检查模型API调用的配置格式是否符合对应模型的官方标准。
4. 核对模型是否支持标准的思考内容输出格式。

## 解决与验证
可先使用deepseek-r1模型验证功能基础逻辑是否正常。对于其他模型，需按照模型官方要求调整输出格式，确保思考内容的包裹格式符合FastGPT的解析规则。验证方式为在提示词模式工具调用场景中发起对话，观察思考内容是否正确渲染，以及think模块是否正常展示。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4042)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
