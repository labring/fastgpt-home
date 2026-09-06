---
title: 解决FastGPT HTTP插件更新OpenAPI Schema后版本未找到报错问题
slug: /zh/troubleshoot/fastgpt-http-schema-version-found
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2987
source_type: GitHub issue
---

# 解决FastGPT HTTP插件更新OpenAPI Schema后版本未找到报错问题

## 现象
该问题出现于FastGPT v4.8.11-fix私有部署版本。HTTP插件完成OpenAPI Schema更新后，在工作流中调用该插件时，会提示"App version not found"报错。仅重新创建HTTP插件，方可恢复正常使用。

## 可能原因
目前无公开的官方原因说明，仅可确认该问题与HTTP插件更新OpenAPI Schema的操作存在直接关联，需结合具体部署环境与代码逻辑进一步排查。

## 排查步骤
1. 确认当前使用的FastGPT版本为v4.8.11-fix私有部署版本。
2. 定位触发报错的HTTP插件，确认其OpenAPI Schema已完成更新操作。
3. 进入包含该插件的工作流，查看插件调用环节的配置状态。
4. 记录完整报错提示文本"App version not found"，用于后续验证或排查。

## 解决与验证
1. 删除出现报错的HTTP插件，重新创建新的HTTP插件。
2. 为新创建的HTTP插件配置正确的OpenAPI Schema内容。
3. 在原工作流中替换为新创建的HTTP插件，或重新配置工作流调用该新插件。
4. 运行工作流，验证是否不再提示"App version not found"报错。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2987)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
