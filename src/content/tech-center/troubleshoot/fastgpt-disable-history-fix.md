---
title: 解决FastGPT高级编排配置无历史记录不生效的问题
slug: /zh/troubleshoot/fastgpt-disable-history-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/189
source_type: GitHub issue
---

# 解决FastGPT高级编排配置无历史记录不生效的问题

## 现象
在FastGPT高级编排中配置历史记录为0后，页面测试无异常，但生成的外部分享链接仍携带聊天记录，后台"聊天"页面的配置也未生效，且未使用简易模式。

## 可能原因
仅设置历史记录数值为0未正确生效，或未正确移除历史记录相关模块。

## 排查步骤
1. 确认当前应用未启用简易模式，确认应用模式为高级编排。
2. 检查高级编排流程中的历史记录相关模块配置。
3. 保存配置后，分别验证后台"聊天"页面与外部分享链接的表现。

## 解决与验证
仅设置历史记录数值为0无法生效，应在高级编排中移除历史记录相关模块。保存配置后，可通过以下步骤验证：
1. 进入后台"聊天"页面发起对话，确认对话过程未携带历史记录。
2. 生成外部分享链接，使用该链接发起对话，确认输出结果不受历史记录影响。

> 来源: [FastGPT GitHub issue #189](https://github.com/labring/FastGPT/issues/189)
