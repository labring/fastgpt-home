---
title: FastGPT V4.12.1版本升级步骤与更新说明
slug: /zh/deploy/fastgpt-v4121-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-12/4121
source_type: 官方文档
---

# FastGPT V4.12.1版本升级步骤与更新说明

FastGPT V4.12.1版本发布于2025年8月18日，本次更新包含新增功能、体验优化、问题修复与工具更新四类内容，适配自部署用户的版本升级需求。

### 升级操作步骤
1. 更新镜像：将FastGPT社区版镜像tag更新为`v4.12.1-fix`，商业版镜像tag更新为`v4.12.1`，`fastgpt-plugin`镜像tag更新为`v0.1.10`。`mcp_server`、`Sandbox`、`AIProxy`无需执行更新。
2. 执行升级脚本（仅商业版用户需执行）：在任意终端发起以下HTTP请求，将`{{rootkey}}`替换为环境变量中的rootkey，`{{host}}`替换为FastGPT域名：
```bash
curl --location --request POST https://{{host}}/api/admin/initv4121 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
该脚本用于将历史对话日志整理为新的日志看板数据。

### 更新详情
#### 新增内容
支持Prompt自动生成与优化；新增`SIGNOZ_STORE_LEVEL`参数，可控制Signoz日志存储级别。
#### 优化内容
工作流响应逻辑优化，主动指定响应值进入历史记录，避免变量替换导致的死循环或深度递归风险；对话日志导出固定导出对话详情；分页器UI优化。
#### 问题修复
修复工具密钥输入时boolean值无法通过form校验的问题；修复对话页pane切换可能导致的数据异常问题；修复对话日志看板数据表索引不正确的问题。
#### 工具更新
支持对系统工具单独配置Tool description，便于模型理解工具用途。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-12/4121)
