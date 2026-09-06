---
title: 解决FastGPT对话历史API获取及日志导出问题
slug: /zh/troubleshoot/fastgpt-conversation-history-api
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/450
source_type: GitHub issue
---

# 解决FastGPT对话历史API获取及日志导出问题

## 现象
通过API调用FastGPT应用时，无法获取用户与AI的对话历史记录；同时未找到内置的对话日志导出功能。已确认升级至最新版本，并查阅过项目README文档，确认现有版本无法满足相关需求。

## 可能原因
当前FastGPT版本中，未提供直接通过API获取对话历史的接口，且未内置对话日志导出功能。已完成版本升级与文档查阅后，仍未找到对应功能的配置或调用方式，需按实际环境确认是否存在未公开的功能入口。

## 排查步骤
1. 确认当前FastGPT版本为最新正式发布版
2. 查阅项目官方文档，检索对话历史相关API及日志导出功能的说明内容
3. 需按实际环境确认是否存在未明确说明的功能配置项

## 解决与验证
目前FastGPT暂未提供直接通过API获取对话历史的接口，以及对话日志导出的内置功能。相关功能需求已被记录，需等待后续版本更新。可通过关注项目官方更新动态，确认对应功能的上线时间。若需临时实现相关需求，需按实际环境自行开发适配逻辑。

> 来源: [FastGPT GitHub issue #450](https://github.com/labring/FastGPT/issues/450)
