---
title: 解决FastGPT发布Web应用时无对话/内容生成选择项问题
slug: /zh/troubleshoot/web-app-publish-select-option
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6522
source_type: GitHub issue
---

# 解决FastGPT发布Web应用时无对话/内容生成选择项问题

## 现象
用户在FastGPT中发布Web应用时，无法找到"对话"或"内容生成"的选择选项，无法完成对应模式的发布配置，导致无法按需求生成目标Web应用。

## 可能原因
目前无公开的明确触发原因，需按实际环境确认。

## 排查步骤
1. 确认当前已将FastGPT升级到最新版本，符合官方要求的功能使用版本，避免因旧版本缺失功能导致无法选择。
2. 检查是否已完整查看项目README文档，确认现有版本是否支持对话或内容生成模式的Web应用发布选择功能。
3. 核对已创建的应用基础配置信息，确认应用的初始类型是否符合对话或内容生成的应用场景要求。

## 解决与验证
若未升级到最新版本，将FastGPT升级至官方最新版本后重新进入发布页面重试；若未查看README确认功能支持，需仔细查阅文档完成对应配置。验证方式为：重新进入Web应用发布页面，查看是否出现"对话"或"内容生成"的选择选项，完成对应模式的发布配置后，即可正常生成目标Web应用。

> 来源：https://github.com/labring/FastGPT/issues/6522
