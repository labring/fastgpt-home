---
title: 调整FastGPT全局变量的默认聊天记录保留条数
slug: /zh/troubleshoot/adjust-fastgpt-chat-history-count
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2167
source_type: GitHub issue
---

# 调整FastGPT全局变量的默认聊天记录保留条数

## 现象
FastGPT 4.8.7版本中，全局变量的最近聊天记录默认保留10条，该默认条数不足以满足实际业务需求，用户希望调整该参数。

## 可能原因
当前全局变量的聊天历史保留条数默认固定为10条，该配置未提供直接的可视化调整入口，需通过全局变量相关逻辑进行修改，无法直接通过界面按钮调整。

## 排查步骤
1. 确认当前使用的FastGPT版本为4.8.7，该问题仅在该版本中被反馈。
2. 进入全局变量配置的相关页面或代码逻辑区域。
3. 查找与聊天历史记录相关的配置项，或文档提及的history全局变量。

## 解决与验证
可通过引用history全局变量调整聊天记录保留条数。调整完成后，发起新的对话，查看最近聊天记录的保留数量是否符合设置的预期值。若未达到预期效果，需按实际环境确认配置逻辑。

> 来源: [FastGPT GitHub issue #2167](https://github.com/labring/FastGPT/issues/2167)
