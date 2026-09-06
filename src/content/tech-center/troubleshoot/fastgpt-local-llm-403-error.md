---
title: 解决FastGPT填写本地LLM的Base URL后出现403错误的问题
slug: /zh/troubleshoot/fastgpt-local-llm-403-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1115
source_type: GitHub issue
---

# 解决FastGPT填写本地LLM的Base URL后出现403错误的问题

## 现象
在FastGPT私有部署版本中，填写本地LLM的Base URL后，调用环节返回403错误。

## 可能原因
需结合实际部署环境确认，关联因素可能涉及本地LLM服务的访问权限配置、请求校验规则、Base URL参数格式是否符合要求等。

## 排查步骤
1. 核对填写的本地LLM的Base URL格式，确认无多余字符或格式错误，符合本地LLM的接入要求。
2. 检查本地LLM服务的访问权限配置，确认允许FastGPT所在服务器的IP地址发起请求，未被加入拦截列表。
3. 确认FastGPT向本地LLM发送的请求头参数，匹配本地LLM的校验规则，例如认证相关配置。
4. 查看本地LLM服务的运行日志，获取更详细的报错信息，辅助定位具体问题。

## 解决与验证
根据排查结果调整对应配置。例如调整本地LLM的访问白名单、修正请求头参数、修正Base URL格式。调整完成后，重新填写Base URL并发起调用，确认403错误不再出现。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1115)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
