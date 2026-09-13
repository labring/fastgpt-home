---
title: 解决FastGPT聊天对话标题自动生成错误无法自定义的问题
slug: /zh/troubleshoot/fastgpt-chat-title-customization
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5683
source_type: GitHub issue
---

# 解决FastGPT聊天对话标题自动生成错误无法自定义的问题

## 现象
FastGPT聊天界面的对话名称仅由AI自动生成。当上下文较长时，生成的标题常出现错误，或未包含对话关键信息。无法通过全局变量或其他方式直接指定对话标题，需手动自定义历史记录标题。

## 可能原因
系统默认仅启用AI自动生成对话标题的逻辑，未提供通过全局变量或其他配置入口自定义对话标题的功能。需按实际环境确认具体配置项是否存在。

## 排查步骤
1. 确认当前FastGPT已升级至最新版本。
2. 查看系统配置页面中与对话标题生成相关的配置项。
3. 检查是否存在全局变量配置入口用于自定义对话标题。

## 解决与验证
目前无公开的官方配置方法可通过全局变量或其他方式直接指定对话标题。若需自定义对话标题，需手动对历史记录标题进行修改。如需跟进相关功能更新，可关注项目官方仓库的最新动态。

> 来源: [FastGPT GitHub issue #5683](https://github.com/labring/FastGPT/issues/5683)
