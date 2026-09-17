---
title: 解决FastGPT私有部署版MCP工具调用异常问题
slug: /zh/troubleshoot/fastgpt-mcp-tool-call-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6791
source_type: GitHub issue
---

# 解决FastGPT私有部署版MCP工具调用异常问题

## 现象
用户使用FastGPT V4.14.9私有部署版本时，出现MCP工具调用异常问题。具体表现为：1. MCP工具调用时按/拆分工具包与函数名，传入AI的格式为"MCP工具包名/MCP工具函数名"，工具包命名会影响AI的工具调用判断；2. 工具函数命名包含/字符时，无法正常完成调用；3. 传递给AI的工具列表中name字段为随机字符时，会干扰AI对工具的识别，当前该字段使用"name：description"的拼接方式。当工具函数名包含/字符时，必然触发调用报错。

## 可能原因
结合异常表现，核心原因有两点：一是工具调用逻辑通过/字符拆分工具包和函数名，导致工具包命名、函数名包含/时，会破坏拆分逻辑，干扰AI识别；二是工具列表的name字段未使用原函数名，改用随机字符后，AI无法正确匹配到对应的工具。

## 排查步骤
1. 确认当前运行的FastGPT版本为V4.14.9私有部署版本；
2. 检查MCP工具的包名与函数名，确认名称中是否包含/字符；
3. 查看传递给AI的工具列表配置，确认name字段是否使用非原函数名的随机字符；
4. 执行MCP工具调用操作，观察是否出现调用失败的情况。

## 解决与验证
解决方法分为两步：一是修改MCP工具的包名和函数名，移除其中的/字符；二是调整工具列表的name字段，使用原函数名，不使用随机字符。修改完成后，重新发起MCP工具调用，即可验证是否恢复正常。工具配置的具体修改位置需按实际环境确认。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/6791)
