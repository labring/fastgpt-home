---
title: 解决FastGPT通过oneAPI接入Gemma的API路径错误问题
slug: /zh/troubleshoot/fastgpt-oneapi-gemma-path-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/926
source_type: GitHub issue
---

# 解决FastGPT通过oneAPI接入Gemma的API路径错误问题

## 现象
使用oneAPI接入Gemma模型后，在FastGPT发起对话并发送请求时，请求URL被自动追加`chat/completion`路径，与Gemma模型要求的`api/chat`路径不匹配，引发请求错误。

## 可能原因
FastGPT的oneAPI接入配置中，请求路径被自动追加`chat/completion`后缀，与Gemma模型要求的`api/chat`路径不匹配，导致请求失败。

## 排查步骤
1. 查看FastGPT中oneAPI接入Gemma模型的API路径配置参数。
2. 对比Gemma模型要求的API路径与FastGPT自动生成的请求路径。
3. 确认路径拼接逻辑是否与模型要求存在偏差。

## 解决与验证
修改FastGPT的oneAPI接入配置，调整请求路径以匹配Gemma模型的`api/chat`要求，需按实际环境确认具体配置位置。验证时发起FastGPT对话，查看请求URL是否匹配`api/chat`路径，确认请求是否成功执行。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/926)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
