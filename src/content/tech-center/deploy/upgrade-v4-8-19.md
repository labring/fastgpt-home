---
title: FastGPT V4.8.19版本升级内容与操作指引
slug: /zh/deploy/upgrade-v4-8-19
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4819
source_type: 官方文档
---

# FastGPT V4.8.19版本升级内容与操作指引

## 这个版本改了什么
新增工作流知识库检索按知识库权限过滤功能，新增飞书、语雀知识库查看原文功能，新增流程等待插件可等待指定毫秒数后继续执行流程，新增飞书机器人接入支持配置私有化飞书地址。优化成员列表分页加载、统一分页加载代码，优化对话页面加载时可配置是否为独立页面，优化成员头像迁移至成员表。修复语雀文件库导入时嵌套文件内容无法展开的问题，修复工作流编排中LLM参数无法关闭的问题，修复工作流编排中代码运行节点还原模板问题，修复HTTP接口适配对象字符串解析问题，修复通过API上传localFile接口图片过期标记未清除的问题，修复工作流导入编排时number input类型无法覆盖的问题，修复部分模型提供商logo无法正常显示的问题。

## 升级前要确认的事
确认环境变量中存在rootkey值，明确FastGPT的域名。确认需更新的fastgpt镜像tag为v4.8.19-beta，fastgpt-pro商业版镜像tag为v4.8.19-beta，Sandbox镜像无需执行更新操作。

## 升级步骤（照做）
第一步，更新镜像：将fastgpt镜像tag更新为v4.8.19-beta，将fastgpt-pro商业版镜像tag更新为v4.8.19-beta，Sandbox镜像无需更新。
第二步，运行升级脚本：从任意终端发起以下HTTP请求，将{{rootkey}}替换为环境变量中的rootkey，将{{host}}替换为FastGPT域名：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv4819' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
执行脚本后将自动完成用户表头像向成员表的迁移操作。

## 升级后怎么验证
可通过以下操作验证升级完成且功能正常：访问FastGPT平台，测试工作流知识库检索是否支持按知识库权限过滤，查看飞书、语雀知识库是否可正常查看原文，测试流程等待插件是否可按配置时长暂停后继续执行，配置飞书机器人时确认可设置私有化飞书地址，检查成员列表分页加载功能是否正常，确认对话页面加载时可配置独立页面模式，验证成员头像已完成迁移，检查语雀文件库导入、工作流编排、API上传文件等功能是否可正常使用，确认模型提供商logo可正常显示。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4819)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
