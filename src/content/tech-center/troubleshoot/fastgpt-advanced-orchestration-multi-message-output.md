---
title: 解决FastGPT高级编排多节点消息单独输出配置问题
slug: /zh/troubleshoot/fastgpt-advanced-orchestration-multi-message-output
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/709
source_type: GitHub issue
---

# 解决FastGPT高级编排多节点消息单独输出配置问题

## 现象
用户在使用FastGPT高级编排模式时，希望为工作流内的多个AI节点配置单独的消息输出，每个节点的AI回复以单条消息形式单独展示给用户，且定义输出节点后需关闭原有的默认统一输出。

## 可能原因
现有默认输出逻辑会统一汇总工作流内所有节点的结果并输出，无法直接为单个AI节点配置独立的消息输出通道，难以满足多节点单独输出的需求。

## 排查步骤
1. 进入目标工作流的高级编排配置页面
2. 定位需要单独输出消息的AI节点，查看其输出参数设置
3. 检查全局默认对话输出的开关状态，确认是否需要调整

## 解决与验证
关闭AI对话的默认输出开关。将目标AI节点的"AI回复内容"指向指定回复通道。可配置多个指定回复，流程结束前触发的指定回复均会作为独立消息输出。运行工作流进行测试，确认每个配置的节点均单独输出对应消息，无默认统一输出内容。

> 来源: [FastGPT GitHub issue #709](https://github.com/labring/FastGPT/issues/709)
