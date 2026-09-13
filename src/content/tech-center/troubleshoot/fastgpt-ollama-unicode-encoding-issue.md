---
title: 解决FastGPT文本提取工具中文显示Unicode编码问题
slug: /zh/troubleshoot/fastgpt-ollama-unicode-encoding-issue
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2763
source_type: GitHub issue
---

# 解决FastGPT文本提取工具中文显示Unicode编码问题

## 现象
在FastGPT私有部署版本v4.8.10 fix2中，使用ollama部署的llama3.1-8b-instruct模型时，调用文本内容提取工具，提取的中文内容有时会显示为Unicode编码格式。相关截图显示输出内容为类似`\uXXXX`的标准Unicode转义字符串。

## 可能原因
当前无明确已知关联原因，需结合实际部署环境、模型调用链路与配置参数确认具体触发因素。

## 排查步骤
1. 确认FastGPT的部署版本为v4.8.10 fix2私有部署版本，核对版本号与部署方式是否与问题描述一致。
2. 确认所使用的大模型为ollama部署的llama3.1-8b-instruct，核对模型名称与部署来源。
3. 复现中文文本提取操作，记录出现Unicode编码的触发场景、输入的中文文本内容与具体的输出结果，便于后续定位问题。
4. 查看模型调用的完整日志信息，确认模型返回内容的原始编码格式，以及传输过程中是否存在编码转换异常。

## 解决与验证
需根据排查结果定位具体问题后实施对应修复方案。验证方式为重新调用文本内容提取工具，使用中文文本作为输入，确认提取后的中文内容不再显示为`\uXXXX`格式的Unicode编码字符串。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2763)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
