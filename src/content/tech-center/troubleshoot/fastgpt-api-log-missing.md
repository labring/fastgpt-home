---
title: 解决FastGPT通过API Key调用后对话日志不显示记录的问题
slug: /zh/troubleshoot/fastgpt-api-log-missing
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1137
source_type: GitHub issue
---

# 解决FastGPT通过API Key调用后对话日志不显示记录的问题

## 现象
将FastGPT应用生成的API Key用于外部调用场景后，可正常完成对话交互，但FastGPT的对话日志无法显示该次API调用的记录，仅展示在线使用的对话记录。

## 可能原因
需按实际部署环境与配置项确认具体原因，暂无通用固定原因。

## 排查步骤
1. 确认所使用的API Key为目标FastGPT应用生成的有效密钥。
2. 检查FastGPT对话日志的展示设置，确认未过滤API调用相关记录。
3. 核对API调用的发起方式是否符合FastGPT的规范要求。

## 解决与验证
完成对应排查并修正问题后，对话日志将可正常展示API调用记录。验证方式为再次发起API调用，随后查看FastGPT的对话日志页面，确认目标记录已显示。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1137)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
