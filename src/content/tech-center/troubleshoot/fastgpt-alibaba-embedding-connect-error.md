---
title: 解决FastGPT中阿里千问text-embedding-v3模型测试连接报错的问题
slug: /zh/troubleshoot/fastgpt-alibaba-embedding-connect-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4111
source_type: GitHub issue
---

# 解决FastGPT中阿里千问text-embedding-v3模型测试连接报错的问题

## 现象
配置阿里千问text-embedding-v3模型后，点击测试按钮出现connect error报错，该模型无法在知识库中正常调用。该问题在添加该模型时必现，其他厂商模型未出现类似情况。

## 可能原因
未明确具体触发原因，需结合实际部署环境确认。可能涉及网络连通性限制、模型配置参数错误或密钥权限不足等相关环节。

## 排查步骤
1. 确认所使用的密钥可正常工作，且具备对应text-embedding-v3模型的调用权限。
2. 检查部署环境与目标模型服务的网络连通性，确认无防火墙、访问策略等阻断请求。
3. 核对模型配置的参数信息，确保符合官方要求的格式与内容。
4. 查看系统运行日志，提取完整报错细节以辅助定位问题。

## 解决与验证
根据排查步骤定位到的具体问题进行修复。例如，若存在网络限制则调整访问策略，若密钥权限不足则更新密钥权限，若配置参数有误则修正参数内容。修复完成后，重新添加该模型并点击测试按钮，确认无connect error报错，且模型可在知识库中正常使用。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4111)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
