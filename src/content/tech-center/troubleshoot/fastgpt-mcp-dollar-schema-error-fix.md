---
title: 解决FastGPT私有部署添加MCP工具时的$schema字段报错问题
slug: /zh/troubleshoot/fastgpt-mcp-dollar-schema-error-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5332
source_type: GitHub issue
---

# 解决FastGPT私有部署添加MCP工具时的$schema字段报错问题

## 现象
在FastGPT v4.11.0私有部署版本中，用户尝试添加MCP工具时，点击保存按钮会弹出错误提示。该MCP工具可在其他客户端正常使用，但在FastGPT中保存失败，报错文本为：`The dollar ($) prefixed field '$schema' in 'modules.0.inputs.0.value.inputSchema.$schema' is not valid for storage.`。经检查，用户提供的MCP工具输入schema中包含`$schema`字段。

## 可能原因
FastGPT的存储校验规则限制了键名以$开头的字段被存储，用户配置的MCP工具输入schema中包含`$schema`字段，触发了该存储校验限制，导致工具配置无法保存。

## 排查步骤
1.  确认当前使用的FastGPT版本为v4.11.0私有部署版本
2.  导出或查看待添加的MCP工具的输入schema配置，检查是否存在以`$`开头的字段，尤其是`$schema`字段
3.  验证该MCP工具在其他客户端的可用性（本次场景中已确认可用）
4.  查看FastGPT的后端日志，匹配`The dollar ($) prefixed field '$schema' in 'modules.0.inputs.0.value.inputSchema.$schema' is not valid for storage.`相关错误信息，确认报错来源

## 解决与验证
解决方法：移除MCP工具输入schema中的`$schema`字段。具体操作如下：
1.  打开待配置的MCP工具的输入schema编辑界面
2.  删除配置中的`"$schema": "http://json-schema.org/draft-07/schema#"`这一行内容
3.  保存修改后的MCP工具配置
4.  确认配置保存成功，无报错弹出
5.  测试该MCP工具在FastGPT中的调用功能是否正常，验证修复效果

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5332)
