---
title: 解决FastGPT v4.14.7.1版本MCP工具调用报错问题
slug: /zh/troubleshoot/fastgpt-v41471-mcp-call-failure
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6456
source_type: GitHub issue
---

# 解决FastGPT v4.14.7.1版本MCP工具调用报错问题

## 现象
在FastGPT私有部署v4.14.7.1版本中，调用MCP服务器时出现失败问题，v4.14.6版本可正常完成调用。报错日志显示：MCP客户端工具调用失败，工具名称（toolName）为undefined，错误码为-32603，提示"Invalid input: expected string, received undefined"；涉及的调用节点为mongodb-find，请求URL为http://xxxxx/mcp/mongodb，请求参数包含database: 'patent'、collection: 'record'、filter: { drgnamecn: [Object] }等内容。

## 可能原因
1.  调用MCP工具时未正确传递toolName参数，导致该参数值为undefined；
2.  FastGPT v4.14.7.1版本新增了更严格的输入参数校验逻辑，请求参数中存在不符合格式要求的字段（如filter内的drgnamecn被解析为未展开的对象），触发了输入校验错误。

## 排查步骤
1.  确认当前FastGPT部署版本为v4.14.7.1，对比v4.14.6版本的调用流程差异；
2.  检查MCP工具调用的请求参数，确认toolName参数是否已正确传递，避免参数值为undefined；
3.  核对请求中的各参数格式，比如filter字段内的drgnamecn等参数，确保其类型符合预期，避免出现未解析的[Object]格式；
4.  检查MCP服务器端的参数校验逻辑，确认是否存在对输入参数的严格格式要求；
5.  需按实际环境确认MCP服务的运行状态与网络连通性。

## 解决与验证
解决方法分为两点：一是补充传递正确的toolName参数值，避免该参数为undefined；二是修正请求参数中格式异常的字段，将filter内的drgnamecn等参数转换为合法的字符串或可序列化格式，消除未解析的对象格式。验证方式为：重新发起MCP工具调用，确认不再出现toolName为undefined的报错，以及"Invalid input: expected string, received undefined"的校验错误，调用结果符合预期，且v4.14.7.1版本下可正常完成MCP服务器调用。

> 来源：https://github.com/labring/FastGPT/issues/6456
