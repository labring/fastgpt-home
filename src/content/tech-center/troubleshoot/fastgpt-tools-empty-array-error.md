---
title: 解决FastGPT工具调用时400 Invalid 'tools'空数组报错问题
slug: /zh/troubleshoot/fastgpt-tools-empty-array-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4698
source_type: GitHub issue
---

# 解决FastGPT工具调用时400 Invalid 'tools'空数组报错问题

## 现象
私有部署的FastGPT环境中，执行SQL类工具时返回400错误，错误文本为`400 Invalid 'tools': empty array. Expected an array with minimum length 1, but got an empty array instead`，无法正常完成SQL执行操作。

## 可能原因
工具调用请求中传入的`tools`参数为空数组，不符合FastGPT工具调用对该参数的要求，该参数要求最小长度为1的有效数组。

## 排查步骤
1. 检查工具调用的请求参数，确认`tools`字段为非空数组。
2. 核对工具配置流程，确认已添加至少一个有效工具项到调用配置中。
3. 排查工具调用的触发逻辑，确认未出现清空`tools`数组的操作。
4. 需按实际环境的FastGPT官方文档，核对`tools`参数的格式、必填要求及有效工具项的配置规范。

## 解决与验证
解决方法为确保工具调用时传入的`tools`数组包含至少一个有效工具项，避免传入空数组。验证步骤为重新发起SQL类工具调用请求，确认不再返回该400错误，且SQL工具可正常执行。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4698)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
