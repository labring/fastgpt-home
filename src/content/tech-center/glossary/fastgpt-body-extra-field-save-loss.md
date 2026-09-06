---
title: 解决FastGPT Body额外字段配置保存丢失的问题
slug: /zh/glossary/fastgpt-body-extra-field-save-loss
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/3845
source_type: 官方文档
---

# 解决FastGPT Body额外字段配置保存丢失的问题

## 一句话定义
Body额外字段是FastGPT模型参数编辑界面中，用于添加模型请求自定义扩展参数的配置项。

## 在 FastGPT 里怎么用
私有部署版本的FastGPT中，进入目标模型的参数编辑页面，找到Body额外字段配置区域，输入符合要求的自定义键值对，点击保存按钮完成配置。例如可输入`"include_reasoning": True`这类参数。

## 容易搞错的地方
在FastGPT 4.8.22版本中，Body额外字段的配置保存成功后，再次打开该配置页面时，输入的自定义参数可能会被清空，无法持久保留。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/3845)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
