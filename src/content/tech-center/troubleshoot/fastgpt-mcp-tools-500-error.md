---
title: 解决FastGPT私有部署版v4.14.7的mcpTools接口500报错问题
slug: /zh/troubleshoot/fastgpt-mcp-tools-500-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6451
source_type: GitHub issue
---

# 解决FastGPT私有部署版v4.14.7的mcpTools接口500报错问题

## 现象
FastGPT私有部署版v4.14.7中调用`/api/core/app/mcpTools/getTools`接口时返回500错误，该问题在v4.14.6版本未出现。后端日志包含三条关键信息：一是调试日志`MCP client connection closed`，二是接口响应日志`[POST] /api/core/app/mcpTools/getTools - 500 in 190ms`，三是请求验证失败的警告日志，其中包含`ZodError: invalid_value`校验错误，涉及输入模式的属性校验路径。

## 可能原因
该问题仅出现在FastGPT v4.14.7版本，v4.14.6版本运行正常。推测为版本更新后，`/api/core/app/mcpTools/getTools`接口的输入校验逻辑或MCP客户端连接配置发生变更，导致原本合法的请求无法通过校验，或MCP连接提前中断。

## 排查步骤
1. 确认当前部署的FastGPT版本为v4.14.7，可通过回退至v4.14.6版本验证问题是否消失。
2. 查看后端运行日志，确认是否存在`MCP client connection closed`、`[POST] /api/core/app/mcpTools/getTools - 500 in 190ms`以及`ZodError: invalid_value`相关报错内容。
3. 检查调用该接口的请求参数，确认参数是否符合接口当前的校验规则（需按实际环境确认）。
4. 核对MCP服务端的连接配置，确认连接地址、权限等信息是否正常（需按实际环境确认）。

## 解决与验证
可先尝试回退FastGPT版本至v4.14.6，验证接口调用是否恢复正常，以此定位是否为v4.14.7版本的变更导致的问题。若确认是校验规则变更引发的错误，需调整请求参数以符合新的校验逻辑（需按实际环境确认）。验证方式为重新调用`/api/core/app/mcpTools/getTools`接口，确认返回状态码正常，且日志中不再出现相关报错信息。

> 来源：[FastGPT GitHub Issue #6451](https://github.com/labring/FastGPT/issues/6451)
