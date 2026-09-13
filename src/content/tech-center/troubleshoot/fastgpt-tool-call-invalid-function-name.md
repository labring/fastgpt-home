---
title: 解决FastGPT工具调用时返回无效函数名无法正常调用的问题
slug: /zh/troubleshoot/fastgpt-tool-call-invalid-function-name
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5081
source_type: GitHub issue
---

# 解决FastGPT工具调用时返回无效函数名无法正常调用的问题

## 现象
在FastGPT公有云V4.9.12版本中，用户创建应用并使用工具调用组件，调用Doubao-1.5-lite-32k模型时，系统输出内容为`<FunctionCallBegin> [{"name": "xAYZBYVkXQO6oGzm", "parameters": {"userChatInput": "你好"}}] </FunctionCallBegin>`，未触发预期的AI对话组件回复流程。

## 可能原因
可能的原因包括：模型生成的函数名称未与已配置的工具组件匹配，工具调用的参数解析逻辑存在适配问题，当前版本的工具调用模块存在异常。

## 排查步骤
1.  确认当前使用的FastGPT版本为V4.9.12，核对工具组件中已配置的函数名称列表。
2.  检查模型返回的函数调用文本，确认生成的`name`字段是否与已配置的工具名称一致。
3.  查看系统日志中的工具调用相关日志，核对参数解析过程是否存在异常。
4.  尝试更换其他工具配置或调整模型调用参数，验证问题是否复现。

## 解决与验证
若问题由函数名称不匹配导致，需将模型生成的函数名称调整为工具组件中已配置的对应名称。若为版本适配问题，需确认是否存在对应版本的功能修复或更新版本。验证时，重新配置工具组件的函数名称，再次调用目标模型，确认输出的函数`name`字段与配置的工具名称一致，且能正常触发AI对话组件的回复流程。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5081)
