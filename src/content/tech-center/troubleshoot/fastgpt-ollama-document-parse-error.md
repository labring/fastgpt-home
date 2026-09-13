---
title: FastGPT私有部署版上传文档无法解析问题排查指南
slug: /zh/troubleshoot/fastgpt-ollama-document-parse-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/3886
source_type: GitHub issue
---

# FastGPT私有部署版上传文档无法解析问题排查指南

## 现象
FastGPT 4.8.22私有部署版本中，使用ollama部署的qwen2.5-14b-1m模型时，上传的文档无法解析。调用官方API可正常识别文档。

## 可能原因
需按实际环境确认。

## 排查步骤
1. 确认FastGPT版本为4.8.22私有部署版。
2. 验证ollama部署的qwen2.5-14b-1m模型是否正常运行。
3. 对比FastGPT内部调用与官方API的参数配置。
4. 检查FastGPT服务与ollama服务的网络连通性。

## 解决与验证
若确认ollama模型正常运行且网络连通，可调整FastGPT中该模型的调用参数以匹配官方API格式。重新上传文档，若可正常解析则问题解决。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/3886)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
