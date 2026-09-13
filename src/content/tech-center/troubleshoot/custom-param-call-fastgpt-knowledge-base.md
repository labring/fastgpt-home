---
title: 通过配置自定义入参实现按参数调用FastGPT知识库的方法
slug: /zh/troubleshoot/custom-param-call-fastgpt-knowledge-base
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1504
source_type: GitHub issue
---

# 通过配置自定义入参实现按参数调用FastGPT知识库的方法

## 现象
在FastGPT私有部署4.8版本中，尝试通过自定义入参判断调用对应知识库，已在系统配置中添加“主体”参数，但不清楚对话API中如何传入该参数，以及如何在判断器中获取该参数值。

## 可能原因
未明确对话API的自定义参数传入格式，以及未掌握系统配置参数在对话流程中的调用方式。

## 排查步骤
1. 确认FastGPT版本为私有部署4.8版本，且已在系统配置中添加目标自定义参数。
2. 查阅FastGPT对话API的官方参数说明，确认自定义参数的传入位置与格式。
3. 验证自定义参数是否可在对话流程的判断器中正常获取。

## 解决与验证
在对话API请求中，通过`variables`字段传入自定义参数，格式为`{"variables": {"subject": 实际参数值}}`，其中`subject`对应系统配置的“主体”参数。在对话流程的判断器中，可通过全局变量的“主体”获取该参数值。发起包含正确`variables`参数的对话API请求，检查是否能按参数匹配对应知识库，确认判断器可正确获取参数值。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1504)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
