---
title: 解决FastGPT长内容输出中断后新内容独立气泡显示问题
slug: /zh/troubleshoot/fastgpt-long-output-bubble-split
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2446
source_type: GitHub issue
---

# 解决FastGPT长内容输出中断后新内容独立气泡显示问题

## 现象
长内容输出场景中，无法中断当前对话气泡，使后续输出内容在独立的新对话气泡中展示。例如在深度解析流程中，无法先输出分析过程，再在新的对话气泡中输出总结内容，无法匹配该类业务场景需求。

## 可能原因
FastGPT的chat模式采用对称交互形式，且部分模型仅支持user与ai的对称交互格式，无法直接实现中断当前气泡并将后续内容切换至新气泡的效果。

## 排查步骤
1. 确认当前使用的对话模式类型，确认是否为chat模式
2. 核对所调用的大语言模型支持的交互格式要求，确认是否存在对称交互限制
3. 需按实际环境确认是否存在可配置的分割相关参数或功能开关

## 解决与验证
解决方式为自行添加自定义分割符实现需求。在长内容输出过程中，于需要切换气泡的位置插入预设分割符，即可使后续输出内容在新的对话气泡中展示。验证时，在测试对话中插入分割符，查看后续内容是否在独立的新对话气泡中输出，确认是否符合预期需求。

> 来源: [FastGPT GitHub issue #2446](https://github.com/labring/FastGPT/issues/2446)
