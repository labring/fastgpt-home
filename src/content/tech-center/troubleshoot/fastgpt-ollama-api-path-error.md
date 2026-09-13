---
title: 解决FastGPT调用ollama时使用错误接口路径的问题
slug: /zh/troubleshoot/fastgpt-ollama-api-path-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2137
source_type: GitHub issue
---

# 解决FastGPT调用ollama时使用错误接口路径的问题

## 现象
使用ollama私有部署环境时，通过curl命令可正常接收ollama的回复。但通过FastGPT应用示例或oneapi测试时，ollama日志显示实际调用的接口路径为"/api/chat"，未达到预期的"/v1/chat/completions"，该请求无法被正确处理。

## 可能原因
FastGPT在接入ollama时，配置的调用接口路径与ollama要求的标准接口路径不匹配，导致发送的请求不符合ollama的接收规则，无法正常获取回复。

## 排查步骤
1. 执行curl命令，验证ollama本身可正常接收请求并返回结果，确认ollama服务本身无异常。
2. 查看FastGPT应用示例或oneapi测试时实际发送的接口路径，对比ollama要求的标准接口路径。
3. 检查FastGPT中ollama接入配置的接口路径参数，确认配置内容与标准路径的差异。

## 解决与验证
将FastGPT调用ollama的接口路径修改为"/v1/chat/completions"。修改完成后，重新通过FastGPT应用示例或oneapi发起测试，查看请求是否使用正确的接口路径，同时验证ollama可正常返回回复，确认问题解决。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2137)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
