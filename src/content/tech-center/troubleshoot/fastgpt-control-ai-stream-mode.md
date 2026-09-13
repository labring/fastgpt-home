---
title: 解决FastGPT中AI流式输出无法适配工作流后续节点处理的问题
slug: /zh/troubleshoot/fastgpt-control-ai-stream-mode
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3255
source_type: GitHub issue
---

# 解决FastGPT中AI流式输出无法适配工作流后续节点处理的问题

## 现象
部分业务场景需要将AI首次回复输出至后续节点进行处理，但AI流式输出需等待全部内容生成完成后，后续节点才能开始处理，导致用户等待时间增加，体验较差。通过提示词无法控制输出模式，测试多款模型均存在该问题。

## 可能原因
首先存在认知误区，AI流式与非流式输出的整体耗时差异极小，国内模型的流式输出可能因额外的内容审核环节耗时更长。其次，现有AI大模型交互插件节点未提供配置项以控制openai api的stream参数，无法灵活切换输出模式。

## 排查步骤
1. 确认当前AI交互节点是否启用流式输出模式。
2. 使用postman调用对应大模型接口，对比流式与非流式输出的实际耗时。
3. 检查是否存在额外的内容审核环节影响流式输出速度。

## 解决与验证
需在AI对话类涉及大模型交互的插件节点增加配置开关，控制openai api的stream参数为true或false。具体操作如下：
1. 找到对应AI交互插件节点的配置项，找到stream参数控制开关。
2. 将stream参数设置为false，启用非流式输出模式。
3. 配置完成后，测试将AI输出直接传递给后续工作流节点，确认后续节点可立即获取完整输出内容，减少等待时间。

> 来源: [FastGPT GitHub issue #3255](https://github.com/labring/FastGPT/issues/3255)
