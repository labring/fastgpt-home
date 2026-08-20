---
title: 解决FastGPT中MCP工具嵌套对象入参识别不完整问题
slug: /zh/troubleshoot/fastgpt-mcp-nested-param-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6488
source_type: GitHub issue
---

# 解决FastGPT中MCP工具嵌套对象入参识别不完整问题

## 现象
当连接的MCP工具入参为嵌套对象（如`{"A":{"B":"xxx","C":"xxx"}}`）时，FastGPT的工具调用节点在编排界面仅显示最外层的入参字段。向模型提问工具入参schema时，模型返回的字段也仅包含最外层内容，生成的工具调用入参不完整，最终导致工具调用失败。即使apps表的toolConfig字段中存储的工具schema完整正确，向模型暴露的入参信息仍仅包含外层字段。

## 可能原因
FastGPT的工具调用节点在解析MCP工具的嵌套对象入参schema时，未正确识别并展开嵌套层级，仅提取了最外层的字段信息，导致向模型提供的入参描述不完整。

## 排查步骤
1. 确认目标MCP工具的实际入参schema为嵌套对象格式，可通过工具官方文档或直接测试调用确认完整入参结构。
2. 登录数据库检查FastGPT的apps表，确认对应工具的toolConfig字段中存储的schema是否完整包含嵌套层级。
3. 在FastGPT编排界面添加工具调用节点，接入该MCP工具，查看界面显示的入参字段是否仅包含最外层内容。
4. 向聊天模型提问「你有哪些工具可以调用，这些工具的入参schema是什么？」，确认模型返回的工具入参字段是否缺失嵌套内容。

## 解决与验证
目前可通过临时方式解决该问题：在工具调用节点的自定义提示词中手动补充嵌套入参的完整结构说明，确保模型生成符合要求的入参。验证步骤如下：
1. 补充提示词后，再次向模型提问工具入参schema，确认返回结果包含完整的嵌套字段信息。
2. 发起工具调用测试，确认生成的入参结构与工具要求的嵌套格式一致，调用过程无报错且结果符合预期。

> 来源：[FastGPT GitHub Issue #6488](https://github.com/labring/FastGPT/issues/6488)
