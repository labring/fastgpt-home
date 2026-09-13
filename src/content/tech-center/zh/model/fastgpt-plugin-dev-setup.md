---
title: FastGPT插件开发的本地环境搭建步骤说明
slug: /zh/model/fastgpt-plugin-dev-setup
page_type: 模型指南
source: https://doc.fastgpt.cn/zh-CN/plugin/system-tool-development
source_type: 官方文档
---

# FastGPT插件开发的本地环境搭建步骤说明

## 基础开发环境要求
开发FastGPT系统工具前，需配置以下基础环境：
- Node.js 版本需匹配目标插件仓库的版本要求，确保项目依赖的兼容性。
- 安装 pnpm，当前 fastgpt-plugin 仓库采用 pnpm workspace 进行多包依赖管理，优化依赖安装与管理流程。
- 安装 Git，用于代码版本控制、本地修改记录保存以及团队协作代码提交。
- 安装 GitHub CLI `gh`，用于快速完成仓库 fork、新仓库创建以及 Pull Request 提交等协作操作。

## 社区插件开发环境搭建步骤
开发社区插件时，需先完成官方社区插件仓库的克隆与依赖安装，具体操作流程如下：
1. 执行命令 fork 并克隆官方社区插件仓库：`gh repo fork labring/fastgpt-community-plugins --clone`
2. 进入克隆后的项目目录：`cd fastgpt-community-plugins`
3. 安装项目所需的全部依赖：`pnpm install`

## fastgpt-plugin 仓库调试环境搭建步骤
在 fastgpt-plugin 仓库内调试 CLI 或 SDK 功能时，需先完成依赖安装与对应模块的构建，具体操作流程如下：
1. 安装项目所需的全部依赖：`pnpm install`
2. 构建 SDK 工厂模块：`pnpm build:sdk-factory`
3. 构建 CLI 工具：`pnpm build:cli`

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/plugin/system-tool-development)

## 适用性与版本范围

本页适用于官方来源记录的 模型指南 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
