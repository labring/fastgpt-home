---
title: 解决FastGPT中MCP工具集URL替换后工具路径未刷新的问题
slug: /zh/troubleshoot/fastgpt-mcp-url-replace-path-refresh
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/5338
source_type: GitHub issue
---

# 解决FastGPT中MCP工具集URL替换后工具路径未刷新的问题

## 现象
在FastGPT v4.9.14私有部署版本中，对已创建的MCP工具集替换为新的MCP SERVER URL后，工具集列表内的工具请求路径未同步刷新。此时单独调用该工具集内的任意工具，会返回404错误。

## 可能原因
替换MCP工具集URL后，系统未自动重新加载工具集的工具路径配置，导致工具列表保留旧的请求路径，发起请求时使用旧URL触发404错误。

## 排查步骤
1. 确认当前FastGPT部署版本为v4.9.14私有部署版本。
2. 进入MCP工具集配置页面，检查是否已替换为新的MCP SERVER URL。
3. 查看工具集列表中的工具请求路径，对比新URL的预期路径，确认路径未发生更新。
4. 尝试单独调用工具集内的任意工具，确认返回404错误。

## 解决与验证
1. 重新编辑该MCP工具集，重新解析新的URL并保存配置。
2. 查看工具集列表中的工具请求路径，确认已更新为新URL对应的路径。
3. 再次单独调用工具集内的工具，确认不再返回404错误。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/5338)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
