---
title: 解决FastGPT工作流中tools空数组引发的400参数报错
slug: /zh/glossary/fastgpt-tools-empty-array-error
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/4698
source_type: 官方文档
---

# 解决FastGPT工作流中tools空数组引发的400参数报错

## 一句话定义
该报错指FastGPT工作流中执行工具调用时，tools参数为空数组触发的400参数校验错误。tools是FastGPT工作流中用于配置可调用工具的数组参数，需满足最小长度为1的校验要求，标准提示文本为`400 Invalid 'tools': empty array. Expected an array with minimum length 1, but got an empty array instead.` 或`400 Invalid "tools": empty array. Expected an array with minimum length 1, but got an empty array instead.`

## 在 FastGPT 里怎么用
在FastGPT工作流配置流程的工具调用环节，需配置tools参数。该参数为数组类型，需传入至少一个有效工具配置项。在配置数据库连接工具并执行调用时，需将对应工具配置写入该数组，确保tools数组长度不小于1，避免触发参数校验失败。

## 容易搞错的地方
配置FastGPT工作流中的数据库连接工具时，未添加有效工具项，或未向tools数组传入有效配置项，会导致tools数组为空，进而触发参数校验报错，无法正常执行工具调用，出现`400 Invalid 'tools': empty array. Expected an array with minimum length 1, but got an empty array instead.` 或`400 Invalid "tools": empty array. Expected an array with minimum length 1, but got an empty array instead.` 报错。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4698)
> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4698)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
