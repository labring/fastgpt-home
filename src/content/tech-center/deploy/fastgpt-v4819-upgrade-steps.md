---
title: FastGPT V4.8.19版本升级操作与更新说明
slug: /zh/deploy/fastgpt-v4819-upgrade-steps
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4819
source_type: 官方文档
---

# FastGPT V4.8.19版本升级操作与更新说明

## 版本更新详情
本版本包含多项新增功能、体验优化与问题修复。新增功能包括：工作流知识库检索支持按知识库权限过滤；飞书、语雀知识库支持查看原文；新增流程等待插件，可等待指定毫秒数后继续执行流程；新增飞书机器人接入，支持配置私有化飞书地址。优化内容包括：成员列表采用分页加载，统一全站分页加载代码；对话页面加载时可配置是否为独立页面；完成成员头像迁移，将用户表头像移动至成员表。修复问题包括：语雀文件库导入时嵌套文件内容无法展开的问题；工作流编排中LLM参数无法关闭的问题；工作流编排中代码运行节点还原模板的问题；HTTP接口适配对象字符串解析问题；API上传localFile时图片过期标记未清除的问题；工作流导入编排时number input类型无法覆盖的问题；部分模型提供商logo无法正常显示的问题。

## 升级操作步骤
1. 更新镜像：将fastgpt镜像的tag更新为v4.8.19-beta，fastgpt-pro商业版镜像的tag同样更新为v4.8.19-beta，Sandbox镜像无需进行更新操作。
2. 运行升级脚本：在任意终端执行以下HTTP请求命令，其中{{rootkey}}需替换为环境变量中配置的rootkey值，{{host}}替换为FastGPT的域名：
```bash
curl --location --request POST https://{{host}}/api/admin/initv4819 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
该脚本用于将用户表中的头像数据迁移至成员表中。

## 升级前置提醒
执行升级脚本前，请确保已正确配置环境变量中的rootkey与FastGPT域名，避免因参数错误导致升级失败。升级过程中请勿中断终端连接，以免数据迁移不完整。Sandbox镜像无需额外更新或配置。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4819)
