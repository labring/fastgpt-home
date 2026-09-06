---
title: 解决FastGPT社区版部署多模态模型后无文件图片上传入口的问题
slug: /zh/troubleshoot/fastgpt-community-file-upload-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4019
source_type: GitHub issue
---

# 解决FastGPT社区版部署多模态模型后无文件图片上传入口的问题

## 现象
社区版FastGPT本地部署多模态模型后，聊天输入框无上传文件入口，无法粘贴图片，无法通过输入框完成文件或图片的上传操作。例如使用deepseek-r1-8b模型时，未出现相关上传控件。

## 可能原因
社区版FastGPT中，多模态文件上传功能需手动启用，若未在工作流配置中开启，则无法使用上传功能，且当前使用的模型为多模态模型。

## 排查步骤
1. 确认当前调用的模型为多模态模型，例如deepseek-r1-8b
2. 登录FastGPT管理后台，进入目标应用的工作流配置页面
3. 查找文件上传相关的功能配置项并确认开关状态

## 解决与验证
在工作流配置页面中启用文件上传功能。启用后刷新应用页面，查看聊天输入框是否显示上传文件和粘贴图片的入口。尝试上传文件或粘贴图片并发起对话，确认功能可正常使用。

> 来源: [FastGPT GitHub issue #4019](https://github.com/labring/FastGPT/issues/4019)
