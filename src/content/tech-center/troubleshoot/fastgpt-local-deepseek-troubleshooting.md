---
title: FastGPT本地私有Deepseek模型调用异常排查指南
slug: /zh/troubleshoot/fastgpt-local-deepseek-troubleshooting
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4073
source_type: GitHub issue
---

# FastGPT本地私有Deepseek模型调用异常排查指南

## 现象
私有部署FastGPT环境中，调用本地私有Deepseek模型时出现调用异常，附带两张报错截图，未明确给出具体报错文本内容。

## 可能原因
结合当前场景分析，可能的原因包括本地私有模型的接口配置不符合FastGPT要求、本地模型接口的访问权限未正确开放、FastGPT所在运行环境无法连通本地模型服务。

## 排查步骤
1. 查看issue附带的两张报错截图，提取其中的具体报错文本信息。
2. 核对FastGPT平台内配置的本地私有Deepseek模型的接口地址、端口等参数是否与本地模型实际部署的参数一致。
3. 检查本地私有Deepseek模型的服务进程是否正常运行，确认服务监听的端口未被其他进程占用。
4. 在FastGPT所在的服务器或容器环境中，通过命令行工具测试是否可以正常访问配置的本地模型接口地址。

## 解决与验证
根据排查结果修正对应问题：若接口配置参数错误，修改为与本地模型实际参数一致的配置内容；若访问权限受限，调整本地模型服务的访问规则，允许FastGPT运行环境发起请求；若网络连通异常，排查网络配置并恢复正常连通性。完成修正后，重新发起模型调用，确认报错截图中的问题消失，调用流程正常完成。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4073)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
