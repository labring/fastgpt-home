---
title: FastGPT V4.9.13版本升级内容与操作指南
slug: /zh/deploy/upgrade-v4-9-13
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4913
source_type: 官方文档
---

# FastGPT V4.9.13版本升级内容与操作指南

## 这个版本改了什么
本次版本新增套餐缓存功能，可减少MongoDB查询次数。优化内容包含两项：所有NodeId调整随机值生成，避免首字母数字开头；知识库集合搜索支持嵌套搜索。修复内容共四项：对话日志的日期范围选择问题；API调用时传入的system提示词可能重复的问题；AI对话、工具调用未选择文件链接时仍读取历史文件的问题；手动更新知识库索引时错误删除旧索引导致手动索引无效的问题。

## 升级前要确认的事
升级前需确认现有部署的mcp_server、Sandbox、AIProxy无需更新，仅需更新FastGPT及FastGPT商业版的镜像tag。

## 升级步骤（照做）
1. 更新FastGPT镜像tag为v4.9.13。
2. 更新FastGPT商业版镜像tag为v4.9.13。
3. 保留mcp_server、Sandbox、AIProxy的原有配置，无需执行更新操作。

## 升级后怎么验证
验证对话日志的日期范围选择功能可正常使用。发起API调用，确认传入的system提示词不会重复。进行AI对话或工具调用，未选择文件链接时确认不会读取历史记录中的文件。手动更新知识库索引，确认旧索引未被错误删除且手动索引生效。测试知识库集合搜索的嵌套搜索功能是否可用。观察系统运行日志，确认套餐缓存生效，MongoDB查询次数减少。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4913)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
