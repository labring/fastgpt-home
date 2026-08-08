---
title: 解决FastGPT V4.14.9私有部署版MCP工具调用异常问题
slug: /zh/troubleshoot/fastgpt-mcp-tool-call-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6791
source_type: GitHub issue
---

# 解决FastGPT V4.14.9私有部署版MCP工具调用异常问题

## 现象
1. MCP工具调用时系统按/区分工具包和函数，发送给AI的格式为"MCP工具包名/MCP工具函数名"，工具包命名会影响AI的工具调用；
2. 当MCP工具函数命名包含/字符时，无法正常调用，且函数名带/必定触发报错；
3. 传递给AI的工具列表中name字段为随机字符，且采用"name：description"的拼接格式，而非使用原函数名，会干扰AI的工具识别。

## 可能原因
1. 系统解析MCP工具时以/作为工具包与函数的分隔符，导致包含/的函数名无法被正确识别，引发调用失败；
2. 工具列表的name字段未使用原函数名，且拼接格式不符合AI的识别预期，导致AI无法准确匹配目标工具。

## 排查步骤
1. 确认当前使用的FastGPT版本为V4.14.9私有部署版；
2. 按照issue复现步骤，创建包含带/字符的函数名的MCP工具并引用调用；
3. 查看工具调用日志与报错信息，确认是否触发调用失败；
4. 检查传递给AI的工具列表配置，核对name字段的生成格式与内容。

## 解决与验证
### 解决方法
1. 调整MCP工具的函数命名，避免使用/字符；
2. 修改工具列表的name字段生成逻辑，替换为原函数名，调整拼接格式以适配AI的识别要求；
3. 按照系统的分隔符逻辑规范工具包的命名。
### 验证方法
重新创建符合规范的MCP工具，进行调用测试，确认不再触发报错，AI可正确识别并调用目标工具。

> 来源：https://github.com/labring/FastGPT/issues/6791
