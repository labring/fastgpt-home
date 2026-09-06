---
title: 解决FastGPT环境下MCP工具的接入与配置相关问题
slug: /zh/troubleshoot/fastgpt-mcp-access-setup
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4071
source_type: GitHub issue
---

# 解决FastGPT环境下MCP工具的接入与配置相关问题

## 现象
在FastGPT中尝试接入MCP工具时，无法直接通过工作流工具箱添加自定义MCP工具；通过工作流插件接入MCP服务器时，因MCP服务缺乏版本控制与热插拔能力，无法适配系统级插件的使用需求。

## 可能原因
MCP协议本身设计较为简单，未提供版本控制与热插拔能力，难以作为系统级插件使用；FastGPT当前未内置MCP工具的统一接入入口，也未提供MCP endpoint暴露的相关功能。

## 排查步骤
1. 检查FastGPT工作流工具箱中是否存在MCP工具的专属添加入口。
2. 验证待接入的MCP服务是否支持版本控制与热插拔能力。
3. 确认是否需要通过工作流插件或类似openapi生成插件的模式尝试接入MCP服务器。

## 解决与验证
可参考openapi生成插件的接入模式，为FastGPT增加MCP endpoint以选择性暴露对应应用；后续可通过添加"添加自定义mcp工具"的按钮，让用户自行增加工具。通过工作流插件接入MCP服务器时，需注意MCP缺乏版本控制与热插拔能力的局限。完成接入配置后，在FastGPT工作流工具箱中调用已接入的MCP工具，检查功能是否正常即可完成验证。

> 来源: [FastGPT GitHub issue #4071](https://github.com/labring/FastGPT/issues/4071)
