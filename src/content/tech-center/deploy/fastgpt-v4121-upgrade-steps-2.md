---
title: FastGPT V4.12.1版本升级步骤与更新详情说明
slug: /zh/deploy/fastgpt-v4121-upgrade-steps-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-12/4121
source_type: 官方文档
---

# FastGPT V4.12.1版本升级步骤与更新详情说明

## 更新概述
V4.12.1版本发布于2025年8月18日，本次更新包含新增功能、体验优化、问题修复与工具更新四类内容。新增功能包括Prompt自动生成与优化，以及可控制Signoz日志存储级别的SIGNOZ_STORE_LEVEL参数；优化内容涵盖工作流响应逻辑、变量替换风险规避、对话日志导出与分页UI；修复了工具密钥boolean值表单校验失败、对话页切换数据异常、日志看板数据表索引错误等问题；工具更新支持为系统工具单独配置描述，帮助模型更好理解工具用途。

## 升级操作步骤
本次升级分为镜像更新与脚本执行两个环节：
1.  更新镜像：将FastGPT镜像tag更新为v4.12.1-fix，商业版FastGPT镜像tag更新为v4.12.1，fastgpt-plugin镜像tag更新为v0.1.10；mcp_server、Sandbox、AIProxy无需执行更新。
2.  执行升级脚本：该脚本仅商业版用户需要执行。通过任意终端发起HTTP请求，需替换命令中的{{rootkey}}为环境变量内的rootkey，{{host}}为FastGPT域名。完整命令为：
```
curl --location --request POST https://{{host}}/api/admin/initv4121 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
脚本的核心功能是将历史对话日志整理为新的日志看板数据。

## 升级注意事项
需要注意的边界与易错点：首先，升级脚本仅面向商业版用户，非商业版用户无需执行该步骤；其次，需严格按照要求更新指定镜像，避免误更新无需升级的组件；另外，本次更新后工作流将主动指定响应值进入历史记录，不再依赖key判断，同时规避了变量替换导致的死循环或深度递归风险；此前存在的工具密钥boolean值无法通过表单校验、对话页切换时数据异常等问题已完成修复。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-12/4121
