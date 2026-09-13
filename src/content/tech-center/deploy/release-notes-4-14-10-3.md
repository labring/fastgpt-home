---
title: FastGPT v4.14.10.3版本升级修复说明与操作指引
slug: /zh/deploy/release-notes-4-14-10-3
page_type: 版本解读
source: https://github.com/labring/FastGPT/releases/tag/v4.14.10.3
source_type: 官方文档
---

# FastGPT v4.14.10.3版本升级修复说明与操作指引

## 这个版本改了什么
本次FastGPT v4.14.10.3版本为v4.14.10.2的迭代更新，共修复两项核心功能问题：一是openapi文档类型因特殊schema无法打开的问题，二是mcp鉴权问题。本次更新关联的代码提交包括：由@xqvvu提交的修复openapi schema问题的PR #6727，由@c121914yu提交的修复mcp鉴权的PR #6733，同时更新了部署文档与相关说明文档，对应PR #6728与#6730。

## 升级前要确认的事
升级前需确认当前FastGPT服务存在openapi文档无法打开、mcp鉴权异常的问题，且当前运行的FastGPT版本为v4.14.10.2。

## 升级步骤（照做）
升级步骤参照官方发布的部署文档执行，将FastGPT版本更新至v4.14.10.3。

## 升级后怎么验证
升级完成并启动服务后，可通过两项操作验证修复效果：一是访问openapi文档，确认不会因特殊schema出现无法打开的情况；二是测试mcp鉴权流程，触发鉴权逻辑后确认功能正常运行。若两项验证均通过，则说明升级成功。

> 来源: [FastGPT release notes](https://github.com/labring/FastGPT/releases/tag/v4.14.10.3)
