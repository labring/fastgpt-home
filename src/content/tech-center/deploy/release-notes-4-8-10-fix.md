---
title: FastGPT v4.8.10-fix版本升级修复说明与操作步骤指南
slug: /zh/deploy/release-notes-4-8-10-fix
page_type: 版本解读
source: https://github.com/labring/FastGPT/releases/tag/v4.8.10-fix
source_type: 官方文档
---

# FastGPT v4.8.10-fix版本升级修复说明与操作步骤指南

## 这个版本改了什么
本版本包含4项修复内容，其中3项为重要修复：
1. 修复工作流分支聚合场景下，可能多次触发同一个节点的问题。
2. 修复工具调用可能陷入无限调用工具循环的问题。
3. 修复工作流国际化（I18n）问题，工具调用节点再次进入时，会丢失模板中工具描述，导致无法正常运行的问题。
4. 修复当最后一条数据因大模型未返回数据时，调试阶段出现前端报错的问题。
本版本中，@xianlezheng 完成首次贡献，相关修复通过PR #2637 提交。

## 升级前要确认的事
需确认当前FastGPT部署采用镜像运行模式，且当前运行版本为v4.8.10。

## 升级步骤（照做）
直接修改FastGPT的镜像tag为`v4.8.10-fix`。

## 升级后怎么验证
1. 测试工作流分支聚合场景，确认同一节点不会被多次触发。
2. 测试工具调用流程，确认不会出现无限循环的情况。
3. 进入工具调用节点编辑页面后重新进入，确认工具描述未丢失。
4. 调试包含最后一条数据无大模型返回的场景，确认前端无报错。

> 来源: [FastGPT release notes](https://github.com/labring/FastGPT/releases/tag/v4.8.10-fix)
