---
title: 解决FastGPT私有部署MongoDB 4.4.29的MCP工具保存报错
slug: /zh/troubleshoot/fastgpt-mcp-mongodb-schema-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5374
source_type: GitHub issue
---

# 解决FastGPT私有部署MongoDB 4.4.29的MCP工具保存报错

## 现象
用户在FastGPT v4.11.1私有部署版本中，添加包含$schema字段的MCP工具并保存时，会弹出红框报错。查看后端日志，报错文本为：`The dollar ($) prefixed field '$schema' in 'modules.0.toolConfig.mcpToolSet.toolList.0.inputSchema.$schema' is not valid for storage.`。该问题仅在MongoDB 4.4.29版本中出现，使用更高版本MongoDB时无此报错。

## 可能原因
MongoDB 4.4.29不允许存储以$开头的字段，而用户配置的MCP工具输入Schema包含了$schema字段，导致数据库写入操作失败，触发报错。

## 排查步骤
1. 确认当前部署使用的MongoDB版本为4.4.29；
2. 检查目标MCP工具的输入Schema配置，确认是否包含$schema字段；
3. 查看FastGPT后端运行日志，确认报错信息与上述文本一致。

## 解决与验证
解决方法为移除MCP工具输入Schema中的$schema字段。具体操作：编辑MCP工具配置，删除输入Schema中的`"$schema": "http://json-schema.org/draft-07/schema#"`项。验证步骤：1. 保存修改后的MCP工具配置，确认无红框报错弹出；2. 测试MCP工具的调用功能，确认可正常执行。移除该字段不会影响工具输入校验的功能，FastGPT内部会自动适配工具调用的输入格式。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5374)
