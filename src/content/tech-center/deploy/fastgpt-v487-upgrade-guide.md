---
title: FastGPT V4.8.7版本升级操作与更新内容说明
slug: /zh/deploy/fastgpt-v487-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/487
source_type: 官方文档
---

# FastGPT V4.8.7版本升级操作与更新内容说明

## 版本更新详情
FastGPT V4.8.7版本包含功能新增、体验优化与问题修复三类更新。新增功能包括：支持插件独立运行，用户可单独完成插件的发布以及查看运行日志；新增应用搜索功能，无需逐层查找即可快速定位目标应用。体验优化方面，对对话框的交互代码进行了优化，升级了Dockerfile所使用的Node和pnpm版本以提升构建效率，同时优化了local域名部署场景下的vision模式使用表现，确保该模式在local域名下可正常运行。问题修复覆盖了两处高频异常场景：修复了简易模式下无法变更全局变量的问题，解决了GPT-4o无法同时使用工具和图片的异常情况，保障了相关功能的正常使用。

## 升级操作步骤
针对自部署用户的V4.8.7版本升级，需严格遵循以下步骤：
1. 提前做好数据库备份，这是升级前的必要准备，可有效避免升级过程中出现的数据丢失风险。
2. 修改镜像标签：将fastgpt镜像的tag修改为v4.8.7，若使用商业版镜像，需将商业版镜像的tag同样修改为v4.8.7。

## 升级适用说明
本页面的升级指南与更新说明，仅针对FastGPT V4.8.7版本，适用于已完成前期自部署的用户，用于从兼容版本升级至V4.8.7的操作参考。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/487
