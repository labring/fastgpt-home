---
title: 解决FastGPT工具调用时unknown_parameter: 'messages[2].tool_calls[0].index'报错问题
slug: /zh/troubleshoot/fastgpt-tool-call-index-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1253
source_type: GitHub issue
---

# 解决FastGPT工具调用时unknown_parameter: 'messages[2].tool_calls[0].index'报错问题

## 现象
使用FastGPT私有部署4.7.1版本进行工具调用时，触发报错unknown_parameter: 'messages[2].tool_calls[0].index'。配置工具调用获取当前时间并发起询问时间的对话后触发报错，使用OneAPI或OpenAI官方接口均出现该问题。

## 可能原因
根据报错信息，OpenAI兼容接口的tool_calls字段不支持index参数，FastGPT生成的请求中携带了该字段，导致接口返回参数错误。

## 排查步骤
1. 确认当前FastGPT为私有部署4.7.1版本。
2. 配置工具调用功能，设置工具为获取当前时间。
3. 发起包含该工具调用的对话，输入询问时间的问题。
4. 查看报错信息，确认报错文本为unknown_parameter: 'messages[2].tool_calls[0].index'。
5. 确认调用接口为OpenAI兼容接口，包括OneAPI或官方地址。

## 解决与验证
移除请求中tool_calls数组内的index字段，重新发起工具调用对话。验证时，配置工具调用并发起对话，确认无该报错，工具调用可正常执行。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1253)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
