---
title: 介绍FastGPT开发构建所需的前置环境配置要求
slug: /zh/deploy/fastgpt-development-prerequisites
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/dev
source_type: 官方文档
---

# 介绍FastGPT开发构建所需的前置环境配置要求

当前页面用于说明构建FastGPT所需的前置开发环境配置事项，明确需安装配置指定依赖项方可正常开展FastGPT的开发构建工作，为开发者提供清晰的环境准备指引。

## 前置依赖配置清单
构建FastGPT需安装并配置以下依赖项，所有依赖均需通过官方渠道获取安装资源：
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org)：版本需不低于20，可通过[nvm](https://github.com/nvm-sh/nvm)工具管理多个版本
- [pnpm](https://pnpm.io/)：版本需严格为10.x

## 配置执行步骤
1. 从官方网站获取Git对应系统的安装包，完成安装配置
2. 从官方网站获取Docker对应系统的安装包，完成安装配置
3. 安装Node.js，版本需不低于20。若需管理多个Node.js版本，可先安装nvm工具，再通过nvm安装指定版本的Node.js
4. 安装pnpm，版本需严格为10.x，完成包管理工具的配置

## 推荐开发环境
为确保开发过程的稳定性，建议使用Linux、MacOS或Windows WSL这类*nix环境进行FastGPT的开发工作。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/dev)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
