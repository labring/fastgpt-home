---
title: FastGPT v4.14.9.5版本升级说明与操作验证指南
slug: /zh/deploy/release-notes-4-14-9-5
page_type: 版本解读
source: https://github.com/labring/FastGPT/releases/tag/v4.14.9.5
source_type: 官方文档
---

# FastGPT v4.14.9.5版本升级说明与操作验证指南

## 这个版本改了什么
FastGPT v4.14.9.5版本包含核心修复与多项优化。核心修复包括登录接口安全问题、MCP SSRF安全问题，以及工作流工具错误未成功捕获问题。此外还包含多项优化：添加文件夹最大数配置至环境变量、恢复翻译内容、清理图标与翻译文件、修复UI界面问题。

## 升级前要确认的事
确认当前运行的FastGPT版本为v4.14.9.4，确保部署环境未存在与本次新增配置项冲突的环境变量设置。

## 升级步骤（照做）
遵循FastGPT常规升级流程，将部署版本更新至v4.14.9.5。

## 升级后怎么验证
登录系统测试登录功能，确认登录接口安全防护生效。调用MCP相关功能，确认SSRF安全防护已正常启用。运行工作流并触发工具错误，确认错误可被成功捕获。检查UI界面显示正常，确认翻译内容与图标清理生效。验证文件夹最大数配置可按需求调整。

> 来源: [FastGPT release notes](https://github.com/labring/FastGPT/releases/tag/v4.14.9.5)
