---
title: 在FastGPT中创建、测试MCP工具集并调用相关工具功能
slug: /zh/tutorial/fastgpt-mcp-toolset-usage
page_type: 教程/部署
source: https://doc.fastgpt.cn/zh-CN/guide/build/tools/mcp_tools
source_type: 官方文档
---

# 在FastGPT中创建、测试MCP工具集并调用相关工具功能

## MCP工具集简介
FastGPT v4.9.6版本及以上新增MCP工具集应用类型，支持传入MCP的SSE URL，批量创建可被大模型直接调用的工具，无需单独配置单个工具，简化工具接入流程。

## MCP工具集创建步骤
1. 进入应用构建的工具分类页面，选择新建MCP工具集；
2. 以对接高德地图MCP Server为例，获取格式为`https://mcp.amap.com/sse?key=xxx`的MCP SSE地址，将其填入弹窗的对应位置；
3. 点击「解析」按钮，系统将自动解析出该地址下的所有可用工具；
4. 确认解析结果后点击「创建」，即可完成MCP工具集及对应工具的创建。

## MCP工具的测试与调用
创建完成后可进入MCP工具集内部，对单个工具进行调试。例如使用`maps_weather`天气查询工具，点击「运行」即可获取指定地区的天气信息。在模型调用环节，支持两种使用方式：一是调用单个工具，选中`maps_weather`和`maps_text_search`等工具后，向AI提问即可触发对应工具获取信息并完成回答；二是调用整个工具集，添加工具集类型的节点并连接工具调用节点，AI将自动选取所需工具执行任务，完成信息获取与回答。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/guide/build/tools/mcp_tools)
