---
title: FastGPT V4.9.11版本升级内容与操作指引
slug: /zh/deploy/upgrade-v4-9-11
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4911
source_type: 官方文档
---

# FastGPT V4.9.11版本升级内容与操作指引

## 这个版本改了什么
新增功能包括：商业版支持图片知识库；工作流中增加节点搜索功能；工作流支持子流程版本控制，可选择“保持最新版本”，无需手动更新；增加更多审计操作日志；知识库增加文档解析异步队列，导入文档时无需等待解析完毕即可完成导入；新增第三方知识库开发文档。
优化内容包括：原文缓存改用gridfs存储，提高存储上限；增加知识库模板导入选项。
修复内容包括：修复工作流中管理员声明的全局系统工具无法进行版本管理的问题；修复工具调用节点前存在交互节点时的上下文异常问题；修复备份导入小于1000字时无法分块的问题；修复自定义PDF解析无法保存base64图片的问题；修复非流请求未进行CITE标记替换的问题；修复Python沙盒存在的隐藏风险；修复curl导入插件缺失确认按键的问题。

## 升级前要确认的事
确认需更新的镜像版本：FastGPT镜像、商业版FastGPT镜像、Sandbox镜像的tag需更新为v4.9.11；mcp_server与AIProxy无需更新。商业版用户需提前获取环境变量中的rootkey，以及FastGPT的访问域名。

## 升级步骤（照做）
1. 更新镜像：将FastGPT镜像、商业版FastGPT镜像、Sandbox镜像的tag更新为v4.9.11，保持mcp_server与AIProxy原有版本。
2. 执行升级脚本：仅商业版用户执行该步骤。通过终端发起HTTP POST请求，命令为：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv4911' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
其中{{rootkey}}替换为环境变量中的rootkey，{{host}}替换为FastGPT域名。该脚本用于移动第三方知识库API配置。

## 升级后怎么验证
验证商业版图片知识库功能可正常使用；验证工作流节点搜索功能正常运行；确认工作流子流程可选择“保持最新版本”选项；查看审计操作日志是否新增对应记录；导入文档时确认无需等待解析完成即可完成导入；验证知识库模板导入选项可用；检查原文缓存存储功能正常；验证工作流中全局系统工具版本管理、工具调用上下文、备份导入、自定义PDF解析、非流请求CITE标记替换、Python沙盒、curl导入插件等功能均恢复正常。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4911)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
