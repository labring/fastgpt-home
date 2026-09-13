---
title: 解决FastGPT工具调用节点思考过程无法正常显示的问题
slug: /zh/troubleshoot/fastgpt-tool-call-think-display-problem
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4710
source_type: GitHub issue
---

# 解决FastGPT工具调用节点思考过程无法正常显示的问题

## 现象
工具调用节点的思考过程无法正常显示。具体表现为：除未开启工具调用的deepseek-R1外，多数模型均出现该问题，包括qwen3系列、Gemini-2.5-pro。在AI对话场景中，Gemini-2.5-pro的思考过程也无法显示。调用google搜索、当前时间等工具时，该问题会触发，关闭工具调用功能后，显示恢复正常。

## 可能原因
当模型勾选支持工具调用的配置项后，思考过程的渲染逻辑未正常触发。不同模型对工具调用的适配表现存在差异，部分模型在开启工具调用开关后，无法正常渲染think过程。

## 排查步骤
1.  检查目标模型是否勾选了支持工具调用的配置项。
2.  测试关闭工具调用功能，观察思考过程是否恢复显示。
3.  使用未勾选工具调用的deepseek-R1模型，验证基础显示逻辑是否正常。
4.  确认是否在调用google搜索、当前时间等工具时触发该问题。

## 解决与验证
1.  若仅需查看思考过程，可暂时关闭模型的工具调用开关，重新发起请求后验证显示是否恢复。
2.  可尝试升级至4.9.8版本，确认该问题是否被修复。
3.  针对不同模型，分别测试开启/关闭工具调用开关后的显示效果，匹配对应使用场景。
验证时，重新发起包含工具调用的对话，观察思考过程是否正常展示。

> 来源: [FastGPT GitHub issue #4710](https://github.com/labring/FastGPT/issues/4710)
