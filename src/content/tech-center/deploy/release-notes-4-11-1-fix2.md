---
title: FastGPT v4.11.1-fix2版本升级内容与操作验证指南
slug: /zh/deploy/release-notes-4-11-1-fix2
page_type: 版本解读
source: https://github.com/labring/FastGPT/releases/tag/v4.11.1-fix2
source_type: 官方文档
---

# FastGPT v4.11.1-fix2版本升级内容与操作验证指南

## 这个版本改了什么
本次版本修复了旧版MCP未重新保存发布时无法在工作流里单独拉出使用的问题，该问题由@FinleyGe反馈。同时包含以下代码与文档变更：由@Deepturn提交的PR 5391更新了dataset.mdx文件；由@c121914yu提交的PR 5393修正了文档路径；由@dependabot[bot]提交的PR 5397在/plugins/model/llm-Baichuan2目录中将transformers依赖包从4.52.1升级至4.53.0；由@FinleyGe提交的PR 5399完成了旧版MCP工具的兼容性修复。

## 升级前要确认的事
需确认当前部署的FastGPT版本为v4.11.1-fix，且系统中存在未重新保存发布的旧版MCP工具。若未使用旧版MCP工具，或已重新保存发布所有MCP工具，则本次升级的针对性修复不会对现有流程产生影响。

## 升级步骤（照做）
将FastGPT版本从v4.11.1-fix更新至v4.11.1-fix2，无额外专属操作步骤。

## 升级后怎么验证
可通过以下方式验证升级效果：1. 进入工作流编辑页面，尝试拉出未重新保存发布的旧版MCP工具，确认可正常添加并使用；2. 登录服务器，进入/plugins/model/llm-Baichuan2目录，执行pip show transformers命令，确认版本为4.53.0；3. 访问相关文档页面，确认文档路径配置正常，无404报错。

> 来源: [FastGPT release notes](https://github.com/labring/FastGPT/releases/tag/v4.11.1-fix2)
