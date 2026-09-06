---
title: 解决FastGPT v4.9.10版Llama3.3-70b工具调用输出中文的问题
slug: /zh/troubleshoot/fastgpt-llama3-tool-call-chinese-output
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4999
source_type: GitHub issue
---

# 解决FastGPT v4.9.10版Llama3.3-70b工具调用输出中文的问题

## 现象
在FastGPT私有部署版v4.9.10中，使用Llama3.3-70b模型且全英文环境时，即system prompt、工具描述、工具输出、用户输入均为英文，最终生成的回答为中文。在system prompt中强制要求英文输出可缓解该问题，但无法完全解决。

## 可能原因
该问题大概率由FastGPT自带的工具调用模板为中文导致。

## 排查步骤
1. 确认当前使用的FastGPT版本为v4.9.10私有部署版。
2. 确认所调用的模型为Llama3.3-70b。
3. 检查所有相关配置项，包括system prompt、工具描述、工具输出、用户输入，确认均为英文。
4. 测试在system prompt中强制要求英文输出后的生成结果，验证缓解效果。

## 解决与验证
可通过两种方式优化：一是允许用户自定义工具调用prompt，二是提供英文prompt选项。同时可将工具调用结果加入上下文。验证时，配置自定义的英文工具调用模板，保持全英文的运行环境，确认模型生成的回答符合英文要求。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4999)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
