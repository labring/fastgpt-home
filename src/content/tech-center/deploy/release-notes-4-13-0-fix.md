---
title: FastGPT v4.13.0-fix版本升级内容与操作指南
slug: /zh/deploy/release-notes-4-13-0-fix
page_type: 版本解读
source: https://github.com/labring/FastGPT/releases/tag/v4.13.0-fix
source_type: 官方文档
---

# FastGPT v4.13.0-fix版本升级内容与操作指南

## 这个版本改了什么
本版本包含两项核心变更与三项优化更新。其一为增加permission索引；其二为修复知识库集合页面分页组件未正常显示的问题。此外完成三项代码调整：在/plugins/webcrawler/SPIDER目录中将tar-fs从3.0.9升级至3.1.1，由dependabot[bot]提交PR 5699；优化permission索引与模型表协作者上下文懒加载逻辑，由FinleyGe提交PR 5703；修复知识库集合页面UI问题，由c121914yu提交PR 5704。

## 升级前要确认的事
需确认当前部署的FastGPT版本为v4.13.0，确保可正常拉取对应版本的代码资源。

## 升级步骤（照做）
拉取v4.13.0-fix版本的代码，进入/plugins/webcrawler/SPIDER目录完成依赖更新，重启FastGPT服务。

## 升级后怎么验证
可通过三个维度验证升级效果：第一，检查数据库中是否已创建permission索引；第二，访问知识库集合页面，确认分页组件可正常显示；第三，进入/plugins/webcrawler/SPIDER目录，查看tar-fs版本是否为3.1.1。

> 来源: [FastGPT release notes](https://github.com/labring/FastGPT/releases/tag/v4.13.0-fix)
