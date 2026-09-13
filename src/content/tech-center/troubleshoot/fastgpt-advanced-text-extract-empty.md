---
title: FastGPT高级编排文本提取内容为空的排错方法
slug: /zh/troubleshoot/fastgpt-advanced-text-extract-empty
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/728
source_type: GitHub issue
---

# FastGPT高级编排文本提取内容为空的排错方法

## 现象
在FastGPT 4.6.6私有部署版本的高级编排中使用文本内容提取功能时，提取得到的内容始终为空。

## 可能原因
需结合实际使用环境确认，暂无明确通用触发原因。

## 排查步骤
1. 确认当前使用的FastGPT版本为4.6.6私有部署版本。
2. 检查高级编排内文本提取功能的配置，确认输入内容与提取规则设置无误。
3. 确认所使用的密钥可正常调用关联服务。
4. 查看功能运行时的日志，排查是否存在调用异常。

## 解决与验证
根据排查结果修正对应配置或修复异常后，重新运行高级编排的文本提取功能，确认提取内容是否正常返回。若问题仍存在，需结合更多运行日志进一步排查。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/728)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
