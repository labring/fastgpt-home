---
title: 解决FastGPT私有部署中Embedding API测试正常但知识库索引报错的问题
slug: /zh/troubleshoot/fastgpt-embedding-api-index-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/6001
source_type: GitHub issue
---

# 解决FastGPT私有部署中Embedding API测试正常但知识库索引报错的问题

## 现象
FastGPT v4.14.1私有部署版本中，环境配置文件按教程配置且几乎无修改。在模型配置处调用Embedding API测试正常，但在知识库索引环节，报错"Embedding API is not responding"，无法正常完成向量化。

## 可能原因
目前仅能基于已知现象推断，可能涉及知识库索引环节的Embedding API配置与模型配置处的配置不匹配、索引时的网络访问限制，或其他未明确的运行异常。具体原因需结合实际环境确认。

## 排查步骤
1. 确认知识库索引环节使用的Embedding API配置与模型配置处的API配置完全一致，包括地址、密钥等参数。
2. 检查FastGPT服务所在环境与Embedding API服务的网络连通性，确保索引时可以正常访问目标API地址。
3. 查看FastGPT服务的运行日志，获取更详细的报错信息辅助排查。
4. 复现模型配置处的API测试，确认该环节的连通性仍正常，排除临时网络波动影响。

## 解决与验证
若发现知识库索引环节的Embedding API配置与模型配置处不一致，修正为完全匹配的参数。若存在网络访问限制，调整防火墙或网络策略确保FastGPT服务可以正常访问Embedding API。根据运行日志排查其他潜在运行异常。完成调整后，重新进行知识库索引操作，验证是否不再报错"Embedding API is not responding"，且可以正常完成向量化。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/6001)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
