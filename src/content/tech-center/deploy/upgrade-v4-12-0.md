---
title: FastGPT V4.12.0版本升级操作与功能说明
slug: /zh/deploy/upgrade-v4-12-0
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-12/4120
source_type: 官方文档
---

# FastGPT V4.12.0版本升级操作与功能说明

## 这个版本改了什么
新增功能包括：商业版支持应用日志数据看板；商业版支持简易对话页，可直接选择模型和预设工具进行聊天，无需进行应用搭建；对话页增加团队应用快速切换；权限表调整为Role映射Permission模式；应用可单独分配对话日志查看权限。
优化项包括：优化3处存在潜在内存泄露的代码；优化工作流部分递归检查，避免无限递归；优化文档阅读Worker，采用ShareBuffer避免数据拷贝；批量进行向量生成和入库，减少网络操作；知识库搜索多query合并计算，减少数据库操作；选择知识库交互优化；登录页UI调整；工作流中更严格检测工具集是否可被添加；对话日志导出仅导出选中的表头，并修复部分表头无法导出的问题。
修复问题包括：Doc2x API更新导致的解析失败；工作流中团队应用目录可被加入工作流的问题；工作流数组选择器UI缺陷；成员同步存在权限未完成删除问题。
工具更新包括：系统工具可返回citeLinks响应值，从而在对话框实现引用链接展示。

## 升级前要确认的事
需要更新指定镜像：FastGPT镜像tag为v4.12.0，FastGPT商业版镜像tag为v4.12.0，fastgpt-plugin镜像tag为v0.1.9，mcp_server、Sandbox、AIProxy无需更新。需修改FastGPT商业版环境变量，添加FILE_TOKEN_KEY=filetokenkey，该值需与fastgpt镜像中环境变量一致。商业版用户需提前准备环境变量中的rootkey，以及FastGPT域名。

## 升级步骤（照做）
1. 更新对应镜像。
2. 修改FastGPT商业版的环境变量，添加FILE_TOKEN_KEY=filetokenkey。
3. 执行升级脚本（仅商业版用户）：在任意终端发起HTTP POST请求，命令为`curl --location --request POST 'https://{{host}}/api/admin/initv4120' --header 'rootkey: {{rootkey}}' --header 'Content-Type: application/json'`，其中{{rootkey}}替换为环境变量中的rootkey，{{host}}替换为FastGPT域名。该脚本用于初始化团队成员的应用对话日志权限。

## 升级后怎么验证
可检查镜像版本是否为v4.12.0，fastgpt-plugin镜像版本是否为v0.1.9。验证新增功能是否可用：包括商业版应用日志数据看板、简易对话页、团队应用快速切换功能；检查系统工具是否可返回citeLinks响应值以展示引用链接；验证对话日志导出功能是否仅导出选中表头且无表头无法导出问题；确认工作流、成员同步等修复的问题已解决。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-12/4120)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
