---
title: 解决FastGPT中MCP工具$ref引用引发的入参类型错误问题
slug: /zh/troubleshoot/fastgpt-mcp-ref-type-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6395
source_type: GitHub issue
---

# 解决FastGPT中MCP工具$ref引用引发的入参类型错误问题

## 现象
调用FastGPT的`/api/support/mcp/client/getTools`接口解析远端MCP服务时，若工具的`inputSchema`中某个字段使用`$ref`引用，该字段的解析类型会被错误退化为Array。当通过变量引用object类型入参调用该工具时，入参会被自动转为`array[object]`，导致MCP服务端因参数类型不匹配报错。例如示例中的`request`字段本应为Object类型，但实际被识别为数组类型。

## 可能原因
该异常源于`packages/service/core/app/mcp.ts`文件中缺少对`$ref`引用的解析机制，无法正确解析引用的schema内容，进而将字段类型错误识别为Array，最终导致入参类型被异常转换。

## 排查步骤
1. 确认所连接的MCP服务的工具`inputSchema`中是否存在使用`$ref`引用的字段，例如格式为`"$ref": "#/$defs/ExampleRequest"`的字段。
2. 调用`/api/support/mcp/client/getTools`接口，查看返回的工具信息中，带`$ref`引用的字段的解析类型是否被错误标记为Array。
3. 发起工具调用请求，通过变量引用object类型入参，确认入参是否被自动转为`array[object]`。
4. 需按实际环境确认MCP服务端的报错日志，验证参数类型不匹配的具体问题。

## 解决与验证
解决该问题需要在`packages/service/core/app/mcp.ts`中补充`$ref`引用的解析逻辑，正确读取并还原引用的schema内容，以保留字段的原始类型。验证步骤如下：
1. 部署修复后的代码至对应环境；
2. 连接存在`$ref`引用的MCP服务并点击解析工具；
3. 查看解析后的工具`inputSchema`，确认带`$ref`的字段类型正确为Object；
4. 使用object类型入参调用工具，确认入参未被转为`array[object]`，MCP服务端可正常接收参数。

> 来源：[FastGPT GitHub Issue #6395](https://github.com/labring/FastGPT/issues/6395)
