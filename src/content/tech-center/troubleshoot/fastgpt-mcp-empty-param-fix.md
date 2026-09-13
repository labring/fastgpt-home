---
title: 解决FastGPT私有部署版无参MCP工具调用报错问题
slug: /zh/troubleshoot/fastgpt-mcp-empty-param-fix
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/5384
source_type: GitHub issue
---

# 解决FastGPT私有部署版无参MCP工具调用报错问题

## 现象
使用FastGPT私有部署商业版4.11.0，搭载qwen3-30b模型并开启tool功能时，调用无需传参的MCP工具会触发报错。创建简易应用挂载系统自带时间工具，询问当前时间，工具可被调用但系统返回400错误，报错原因为调用模型参数异常。

## 可能原因
FastGPT源代码FastGPT/packages/service/core/ai/utils.ts中的工具调用参数处理逻辑存在缺陷。原代码将工具调用的参数默认赋值为空字符串，无参MCP工具需要传递JSON格式的空对象{}作为参数，空字符串会导致模型参数校验失败。

## 排查步骤
1. 确认FastGPT部署版本为私有部署商业版4.11.0。
2. 复现报错场景：创建简易应用，挂载系统自带时间工具，发起询问当前时间的请求。
3. 查看返回结果，确认返回400错误且报错关联模型参数问题。
4. 定位到FastGPT/packages/service/core/ai/utils.ts文件，检查工具调用参数的处理代码。

## 解决与验证
修改FastGPT/packages/service/core/ai/utils.ts文件中的参数赋值逻辑，将原代码中`arguments: toolCall.function?.arguments || ''`和`const arg: string = toolCall?.function?.arguments ?? '';`调整为当参数为空时传递JSON格式空对象。修改完成后重新部署服务，发起相同的无参MCP工具调用请求，验证工具调用成功且无400报错。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/5384)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
