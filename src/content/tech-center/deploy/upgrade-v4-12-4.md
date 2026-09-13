---
title: FastGPT V4.12.4版本升级内容与操作指引
slug: /zh/deploy/upgrade-v4-12-4
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-12/4124
source_type: 官方文档
---

# FastGPT V4.12.4版本升级内容与操作指引

## 这个版本改了什么
本次版本更新包含新增内容、优化项与修复项。新增内容为商业版支持企微发布渠道。优化项包括：权限继承优化，子资源权限高于父级时，不会强制打断继承模式；Prompt编辑器支持列表渲染；数据页返回知识库列表，保持分页；知识库上传文件成功后，返回对应上传目录；删除应用，减少事务操作；用户选择UI。修复项包括：修复HTTP工具空指针导致无法编辑的问题；修复python代码运行时入参无法为boolean值的问题。插件更新相关内容未详细说明。

## 升级前要确认的事
需确认FastGPT域名与环境变量中的rootkey信息；确认需更新的镜像版本：FastGPT镜像tag为v4.12.4，FastGPT商业版镜像tag为v4.12.4，fastgpt-plugin镜像tag为v0.1.13，Sandbox镜像tag为v4.12.4；mcp_server与AIProxy无需更新。升级脚本仅商业版用户需要执行。

## 升级步骤（照做）
1. 更新镜像：按照确认的镜像版本更新对应容器镜像。
2. 执行升级脚本：从任意终端发起HTTP POST请求，将{{rootkey}}替换为环境变量中的rootkey，{{host}}替换为FastGPT域名，执行命令：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv4124' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
该脚本功能为补充所有资源的owner权限。

## 升级后怎么验证
可通过以下方式验证升级效果：确认各更新镜像的版本符合要求；商业版用户可查看是否新增企微发布渠道；测试Prompt编辑器的列表渲染功能；上传知识库文件，确认返回对应上传目录；测试删除应用的操作流程；测试HTTP工具编辑功能；测试python代码运行时传入boolean入参是否正常；查看数据页返回知识库列表是否保持分页；测试用户选择UI的展示效果。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-12/4124)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
