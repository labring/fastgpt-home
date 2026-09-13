---
title: 解决FastGPT私有部署版MCP工具无搜索条件不显示的问题
slug: /zh/troubleshoot/fastgpt-mcp-tool-show-without-search
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4892
source_type: GitHub issue
---

# 解决FastGPT私有部署版MCP工具无搜索条件不显示的问题

## 现象
FastGPT私有部署版的应用列表页面中，不添加任何查询条件时，列表无法展示MCP工具。在搜索框输入查询条件后，列表可正常展示MCP应用。此外用户反馈MCP工具当前置于应用模块，存在使用逻辑不合理的问题。

## 可能原因
当前公开信息未明确该现象的具体触发原因，需结合实际部署环境、配置参数进一步排查确认。

## 排查步骤
1. 访问FastGPT的应用列表页面。
2. 不添加任何搜索查询条件，观察列表是否显示MCP工具。
3. 在搜索框输入任意查询条件，再次观察列表是否显示MCP工具。
4. 确认当前使用的FastGPT版本是否符合官方文档要求。

## 解决与验证
针对无搜索条件下MCP工具不显示的问题，需结合实际部署环境排查调整相关配置，或等待官方后续优化。验证方式为：在应用列表页面不添加查询条件，确认MCP工具是否正常展示。针对MCP工具分类位置的调整需求，需等待官方更新模块分类逻辑，或按实际使用场景进行自定义配置。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4892)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
