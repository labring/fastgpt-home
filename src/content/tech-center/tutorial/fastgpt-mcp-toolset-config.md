---
title: 在FastGPT中创建、配置与调用MCP工具集的具体方法
slug: /zh/tutorial/fastgpt-mcp-toolset-config
page_type: 教程/部署
source: https://doc.fastgpt.cn/zh-CN/guide/build/tools/mcp_tools
source_type: 官方文档
---

# 在FastGPT中创建、配置与调用MCP工具集的具体方法

## 功能概述
FastGPT v4.9.6版本及以上新增MCP工具集应用类型，支持传入MCP的SSE URL批量创建可被模型直接调用的工具，无需逐个手动配置单个工具，大幅简化工具接入流程。该功能仅支持符合MCP协议的SSE服务，无法直接自定义非标准工具参数，仅能通过解析目标SSE服务获取工具列表。

## 快速创建MCP工具集
1. 进入应用构建的工具分类页面，选择新建MCP工具集；
2. 以对接高德地图服务为例，获取目标MCP Server的SSE URL，示例格式为`https://mcp.amap.com/sse?key=xxx`；
3. 将获取到的URL填入弹窗的对应位置，点击解析按钮，系统将自动解析该服务下的所有MCP工具；
4. 点击创建按钮，即可完成MCP工具集及单个工具的创建。

## 测试与调用MCP工具
创建完成后，可进入工具集内部对单个工具进行调试。例如选择`maps_weather`天气查询工具，点击运行即可获取指定地区的天气信息，如杭州的具体天气数据。
工具调用分为两种模式：一是调用单个工具，选中指定工具后向AI提问，AI会智能匹配并调用对应工具获取所需信息，再基于结果生成回答；二是调用整个工具集，添加工具集类型的节点并使用工具调用节点连接，AI会自动选取符合需求的工具执行，最终返回整理后的回答。
若填入的SSE URL格式错误或目标服务不可用，解析步骤将失败，无法生成可用的工具列表。当需要使用非MCP标准的自定义工具时，该功能并不适用。

> 来源：https://doc.fastgpt.cn/zh-CN/guide/build/tools/mcp_tools
