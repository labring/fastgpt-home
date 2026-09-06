---
title: FastGPT V4.12.1版本升级内容与操作指南
slug: /zh/deploy/upgrade-v4-12-1
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-12/4121
source_type: 官方文档
---

# FastGPT V4.12.1版本升级内容与操作指南

## 这个版本改了什么
### 新增内容
1. 支持Prompt自动生成和优化。
2. 新增`SIGNOZ_STORE_LEVEL`参数，可控制Signoz日志存储级别。
### 优化项
1. 工作流响应优化，主动指定响应值进入历史记录，采用明确的判定逻辑。
2. 避免工作流中变量替换导致的死循环或深度递归风险。
3. 对话日志导出固定导出对话详情。
4. 分页器UI优化。
### 修复项
1. 修复工具密钥输入时，boolean值无法通过form校验的问题。
2. 修复对话页pane切换可能导致的数据异常问题。
3. 修复对话日志看板数据表索引不正确的问题。
### 工具更新
支持对系统工具单独配置Tool description，更利于模型理解。

## 升级前要确认的事
1. 确认部署环境中各组件的当前版本，准备更新对应镜像。
2. 商业版用户需提前获取环境变量中的`rootkey`与FastGPT域名。
3. 确认mcp_server、Sandbox、AIProxy无需更新。

## 升级步骤（照做）
### 1. 更新镜像
- FastGPT 镜像 tag: v4.12.1-fix
- FastGPT 商业版镜像 tag: v4.12.1
- fastgpt-plugin 镜像 tag: v0.1.10
- mcp_server、Sandbox、AIProxy 无需更新
### 2. 执行升级脚本
该脚本仅需商业版用户执行。从任意终端发起以下HTTP请求，将`{{rootkey}}`替换为环境变量中的`rootkey`，`{{host}}`替换为FastGPT域名：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv4121' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
脚本功能为将历史对话日志整理成新的日志看板数据。

## 升级后怎么验证
1. 检查各组件镜像版本是否更新为指定tag。
2. 测试Prompt自动生成功能，确认功能正常。
3. 测试工作流功能，确认响应值正确进入历史记录。
4. 测试工具密钥输入，确认boolean值可通过form校验。
5. 测试对话页pane切换，确认无数据异常。
6. 导出对话日志，确认导出内容为对话详情。
7. 若配置`SIGNOZ_STORE_LEVEL`参数，确认日志存储级别符合预期。
8. 测试系统工具的Tool description配置，确认配置生效。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-12/4121)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
