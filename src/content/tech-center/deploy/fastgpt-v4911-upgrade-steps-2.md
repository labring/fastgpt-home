---
title: FastGPT V4.9.11版本自部署升级流程说明
slug: /zh/deploy/fastgpt-v4911-upgrade-steps-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4911
source_type: 官方文档
---

# FastGPT V4.9.11版本自部署升级流程说明

【升级前置说明】
本次升级仅面向自部署用户，需更新指定镜像版本：FastGPT官方镜像与商业版镜像的tag均设置为v4.9.11，Sandbox镜像tag同步为v4.9.11；mcp_server与AIProxy无需执行更新操作。仅商业版用户需执行升级脚本，脚本核心功能为迁移第三方知识库API配置。

【升级操作步骤】
1. 完成镜像更新后，打开任意终端，执行以下HTTP请求命令：
```bash
curl --location --request POST https://{{host}}/api/admin/initv4911 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
请将命令中的`{{rootkey}}`替换为环境变量中配置的rootkey值，`{{host}}`替换为FastGPT的实际域名地址。

【升级相关变更说明】
本次升级包含新增功能、优化项与问题修复：
- 新增功能：商业版支持图片知识库；工作流中新增节点搜索功能；工作流支持子流程版本控制，可选择"保持最新版本"无需手动更新；新增更多审计操作日志；知识库新增文档解析异步队列，导入文档时无需等待解析完成即可完成导入，可查看第三方知识库开发文档。
- 优化项：原文缓存改用gridfs存储，提升存储上限；新增知识库模板导入选项。
- 问题修复：修复工作流中管理员声明的全局系统工具无法进行版本管理的问题；修复工具调用节点前存在交互节点时的上下文异常问题；修复备份导入时小于1000字无法分块的问题；修复自定义PDF解析无法保存base64图片的问题；修复非流请求未进行CITE标记替换的问题；修复Python沙盒存在的隐藏风险；修复curl导入插件缺失确认按键的问题。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4911
