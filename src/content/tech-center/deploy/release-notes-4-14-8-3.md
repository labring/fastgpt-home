---
title: FastGPT v4.14.8.3版本升级修复与操作验证指南
slug: /zh/deploy/release-notes-4-14-8-3
page_type: 版本解读
source: https://github.com/labring/FastGPT/releases/tag/v4.14.8.3
source_type: 官方文档
---

# FastGPT v4.14.8.3版本升级修复与操作验证指南

## 这个版本改了什么
本版本包含一处核心问题修复、两处功能修复与一处依赖更新。核心修复为分享链接相关问题：关闭运行状态展示时，历史记录会丢失AI回复展示。另外修复api dataset相关功能问题，对应PR#6551；修复分享页面相关功能问题，对应PR#6553。在/document目录下，将tar依赖从7.5.10升级至7.5.11，该更新由@dependabot[bot]提交PR#6545完成。完整变更可查阅https://github.com/labring/FastGPT/compare/v4.14.8.2...v4.14.8.3。

## 升级前要确认的事
升级前需确认当前部署的FastGPT版本为v4.14.8.2，且已完成必要的系统配置与业务数据备份，避免升级过程中出现数据丢失或配置异常。

## 升级步骤（照做）
本版本未提供专属升级步骤，需按照FastGPT官方常规升级流程完成部署更新，具体操作可参考FastGPT官方对应版本的部署文档。

## 升级后怎么验证
升级完成后可通过以下方式验证修复效果与更新状态：第一，打开分享链接，关闭运行状态展示功能，查看历史记录是否保留AI回复内容，确认该问题已修复；第二，访问api dataset相关功能，确认接口调用与数据展示正常；第三，检查/document目录下的tar依赖版本是否为7.5.11，确认依赖更新完成。

> 来源: [FastGPT release notes](https://github.com/labring/FastGPT/releases/tag/v4.14.8.3)
