---
title: 解决FastGPT工作流中MCP协议相关功能的使用问题
slug: /zh/troubleshoot/fastgpt-mcp-protocol-usage
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4390
source_type: GitHub issue
---

# 解决FastGPT工作流中MCP协议相关功能的使用问题

## 现象
在FastGPT工作流中使用MCP协议节点或工具插件时，发现功能内容简单，效果未达预期。

## 可能原因
MCP协议相关功能当前偏向本地接入场景，云端聚合生态与自建HTTP插件无明显差异，且功能基础。

## 排查步骤
1. 确认已将FastGPT升级至最新版本
2. 查阅项目README中关于MCP协议的相关说明
3. 检查MCP协议节点或工具插件的配置，需按实际环境确认参数

## 解决与验证
可参考以下方式处理需求：
1. 若需使用现成插件，可利用MCP协议的现成插件接入能力
2. 若需自定义功能，可将API转换为curl格式，配置至HTTP插件中使用
完成配置后，运行工作流测试功能是否符合预期。

> 来源: [FastGPT GitHub issue #4390](https://github.com/labring/FastGPT/issues/4390)
