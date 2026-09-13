---
title: 解决FastGPT中工具调用默认匹配最后分类的问题
slug: /zh/troubleshoot/fastgpt-fix-tool-call-default-last-category
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1465
source_type: GitHub issue
---

# 解决FastGPT中工具调用默认匹配最后分类的问题

## 现象
测试多种场景后，工具调用始终默认匹配最后一个分类。即使已配置`"toolChoice": false`和`"functionCall": false`，该问题仍会出现。

## 可能原因
该问题与模型兼容性相关。非GPT3.5/4系列的模型，可能存在工具调用逻辑适配异常。部分宣称支持Function Call的模型，实际使用时仍会出现匹配异常。

## 排查步骤
1. 确认当前使用的模型类型，记录完整模型名称。
2. 查看系统配置中的`"toolChoice"`与`"functionCall"`参数当前取值。
3. 核对模型是否属于GPT3.5/4系列。

## 解决与验证
若模型不属于GPT3.5/4系列，在系统配置中将`"toolChoice"`和`"functionCall"`参数设置为`false`。修改配置后重新发起工具调用测试，观察是否不再默认匹配最后一个分类。Qwen1.5模型按此配置修改后，可恢复正常工具调用逻辑。

> 来源: [FastGPT GitHub issue #1465](https://github.com/labring/FastGPT/issues/1465)
