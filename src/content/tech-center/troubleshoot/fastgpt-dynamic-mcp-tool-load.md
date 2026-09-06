---
title: FastGPT中动态加载MCP服务工具到下拉框的实现方法
slug: /zh/troubleshoot/fastgpt-dynamic-mcp-tool-load
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4517
source_type: GitHub issue
---

# FastGPT中动态加载MCP服务工具到下拉框的实现方法

## 现象
用户需要在FastGPT中通过点击按钮，将自定义编写的Python MCP服务的工具动态加载至下拉选择框，当前不清楚该动态加载功能的具体实现方式。

## 可能原因
未明确FastGPT调用外部自定义MCP服务的交互方式，且不清楚如何将服务返回的工具数据动态填充至下拉选择框。

## 排查步骤
1. 确认自定义Python编写的MCP服务已以独立服务形式正常启动。
2. 检查MCP服务是否提供可调用的HTTP REST API接口。
3. 验证FastGPT运行环境可正常访问该MCP服务的API地址。
4. 梳理下拉框加载工具的触发逻辑，匹配服务返回的工具数据格式。

## 解决与验证
使用mcpo单独启动MCP服务，通过HTTP REST API调用该服务获取工具列表，将获取到的工具数据加载至FastGPT的下拉选择框。点击预设的加载按钮，确认下拉框中正确显示MCP服务返回的工具列表，即完成功能验证。

> 来源: [FastGPT GitHub issue #4517](https://github.com/labring/FastGPT/issues/4517)
