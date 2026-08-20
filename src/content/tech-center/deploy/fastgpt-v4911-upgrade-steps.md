---
title: FastGPT V4.9.11版本升级步骤与更新说明
slug: /zh/deploy/fastgpt-v4911-upgrade-steps
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4911
source_type: 官方文档
---

# FastGPT V4.9.11版本升级步骤与更新说明

本文档针对FastGPT V4.9.11版本的自部署升级流程进行说明，首先需要完成镜像更新操作：将FastGPT官方镜像的tag更新为v4.9.11，商业版镜像的tag同样设置为v4.9.11，mcp_server无需进行更新；同时将Sandbox镜像的tag更新为v4.9.11，AIProxy无需更新。

### 执行升级脚本
该脚本仅商业版用户需要执行。在任意终端发起HTTP POST请求，需替换两个变量：`{{rootkey}}`替换为环境变量中的rootkey，`{{host}}`替换为FastGPT域名。完整命令为：
```bash
curl --location --request POST https://{{host}}/api/admin/initv4911 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
该脚本的功能是移动第三方知识库的API配置。

### 新增、优化与修复内容
#### 新增内容
商业版支持图片知识库；工作流中新增节点搜索功能；工作流支持子流程版本控制，可选择"保持最新版本"无需手动更新；新增更多审计操作日志；知识库新增文档解析异步队列，导入文档时无需等待解析完成即可完成导入，可查看第三方知识库开发文档。
#### 优化内容
原文缓存改用gridfs存储，提升存储上限；新增知识库模板导入选项。
#### 修复内容
修复了工作流中管理员声明的全局系统工具无法进行版本管理的问题；修复工具调用节点前存在交互节点时的上下文异常问题；修复备份导入时小于1000字无法分块的问题；修复自定义PDF解析无法保存base64图片的问题；修复非流请求未进行CITE标记替换的问题；修复Python沙盒存在的隐藏风险；修复curl导入插件缺失确认按键的问题。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4911)
