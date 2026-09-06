---
title: 解决FastGPT调用时出现bad_response_status_code 400报错的问题
slug: /zh/troubleshoot/fastgpt-bad-response-status-code-400
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1400
source_type: GitHub issue
---

# 解决FastGPT调用时出现bad_response_status_code 400报错的问题

## 现象
调用FastGPT时出现bad_response_status_code bad response status code 400报错。DeepSeek API可正常调用且支持流式，高级编排调试非流式场景运行正常。

## 可能原因
需按实际调用场景与配置确认，暂无明确通用原因。

## 排查步骤
1. 确认所使用的密钥可正常使用，且已完成正确配置。
2. 验证目标API本身可正常调用，确认其与FastGPT的调用配置匹配。
3. 对比高级编排调试非流式场景的配置，排查当前调用场景的配置差异。

## 解决与验证
根据排查结果修正相关配置参数，确保符合API调用要求。重新发起调用后，确认bad_response_status_code 400报错消失。同时验证非流式场景的运行状态是否符合预期。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1400)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
