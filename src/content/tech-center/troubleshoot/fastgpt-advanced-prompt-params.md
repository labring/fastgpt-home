---
title: 说明FastGPT高级编排引用提示词的可用参数
slug: /zh/troubleshoot/fastgpt-advanced-prompt-params
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1211
source_type: GitHub issue
---

# 说明FastGPT高级编排引用提示词的可用参数

## 现象
使用FastGPT私有部署latest版本时，无法明确高级编排模块中引用提示词的引用内容模版可用参数。仅能看到示例中展示的QA相关模版，不清楚source、sourceId、index等参数的具体使用与描述方式。用户尝试自定义包含这些参数的模版，但无法确认配置内容是否正确。

## 可能原因
官方未公开引用内容模版的完整参数说明，仅提供了基础的QA相关示例，未覆盖source、sourceId、index等参数的使用说明，导致无法确认其他参数的正确配置方式。

## 排查步骤
1. 确认当前使用的FastGPT版本为私有部署latest版本。
2. 查阅项目README与官方文档，未找到引用内容模版的完整参数说明。
3. 进入高级编排模块的引用提示词配置界面，仅展示QA相关的模版示例。
4. 尝试自定义包含source、sourceId、index的模版，但无法确认配置正确性。

## 解决与验证
根据该issue的公开内容，引用内容模版的可用参数包含QA、source、sourceId、index。可直接在模版中通过双大括号包裹参数名的方式使用参数，例如配置模版内容为"原文：{{source}}，文档ID：{{sourceId}}，索引：{{index}}，问答内容：{{QA}}"。配置完成后需按实际环境确认参数的渲染效果是否符合预期。

> [FastGPT GitHub issue 1211](https://github.com/labring/FastGPT/issues/1211)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
