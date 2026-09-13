---
title: FastGPT中配置AI请求确认并执行后续流程的方法
slug: /zh/troubleshoot/fastgpt-ai-confirmation-workflow
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1997
source_type: GitHub issue
---

# FastGPT中配置AI请求确认并执行后续流程的方法

## 现象
本地4.8.4版本的FastGPT中，需实现AI在处理请求前先请求确认信息，并根据确认结果执行后续操作，但无法直接完成该流程配置。

## 可能原因
错误将判断器连接至AI对话节点之后，导致每次AI对话都会触发判断逻辑，流程逻辑颠倒，无法实现先请求确认再执行后续流程的需求。该错误配置是实际使用中常见的问题。

## 排查步骤
1. 进入FastGPT工作流编辑页面，查看当前判断器的连接节点。
2. 检查判断器是否连接在AI对话节点之后。
3. 确认流程的起始触发节点类型，若无法明确节点连接关系，可查看工作流的节点连线详情。

## 解决与验证
正确配置方式为将判断器连接至【流程开始】节点。当输入信息后，先执行判断逻辑，再根据确认结果决定后续操作。若判断器连接在AI对话节点之后，会导致每次AI对话都触发判断，无法实现预期流程。该配置方式已被实际使用场景验证有效。保存配置并测试工作流，确认输入信息后先触发确认步骤，再根据结果执行后续操作即可完成验证。

> 来源: [FastGPT GitHub issue #1997](https://github.com/labring/FastGPT/issues/1997)
