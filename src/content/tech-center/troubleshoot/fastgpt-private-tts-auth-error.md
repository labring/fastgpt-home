---
title: 解决FastGPT私有部署TTS试听返回凭证错误问题
slug: /zh/troubleshoot/fastgpt-private-tts-auth-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1088
source_type: GitHub issue
---

# 解决FastGPT私有部署TTS试听返回凭证错误问题

## 现象
docker-compose部署的FastGPT v4.6.9私有版本中，TTS试听功能无响应，且在本地部署环境中必现该问题。接口返回固定报错信息：{"code":403,"statusText":"unAuthorization","message":"凭证错误","data":null}。此时LLM聊天功能可正常输出内容，且TTS功能调用的API地址与LLM一致，为https://api.openai.com/v1。

## 可能原因
该场景下LLM功能正常但TTS功能返回凭证错误，推测与TTS服务调用的凭证配置相关，具体原因需按实际部署环境确认。

## 排查步骤
1. 核对TTS功能调用的API地址，确认与LLM聊天功能使用的地址一致，即https://api.openai.com/v1。
2. 检查当前配置的API凭证，确认该凭证可正常用于TTS服务调用，且与LLM功能使用的凭证为同一套。
3. 查看docker-compose部署的服务日志，获取TTS接口调用的详细错误信息。
4. 验证当前使用的API凭证是否具备TTS服务的调用权限。

## 解决与验证
若排查发现API凭证配置错误，修正TTS相关的API凭证配置，确保与LLM功能使用的凭证一致。重启部署服务后，执行TTS试听操作，确认返回结果正常，无凭证错误提示。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1088)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
