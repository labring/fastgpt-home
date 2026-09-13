---
title: FastGPT V4.4.5版本升级操作及功能说明
slug: /zh/deploy/upgrade-v4-4-5
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/445
source_type: 官方文档
---

# FastGPT V4.4.5版本升级操作及功能说明

## 这个版本改了什么
FastGPT V4.4.5版本包含多项功能更新与优化。新增下一步指引选项，可通过模型生成3个预测问题。商业版新增分享链接限制及hook身份校验功能。商业版新增API Key使用功能，支持设置别名、额度限制和过期时间，自带appId无需额外连接。全局变量与开场白合并为同一模块，variable模块同步合并到用户引导模块。
## 升级前要确认的事
需确认已获取环境变量中的rootkey值，知晓当前FastGPT部署的访问地址{{host}}。
## 升级步骤（照做）
需发起1个HTTP POST请求，请求地址为https://{{host}}/api/admin/initv445，需携带以下请求头：rootkey: {{rootkey}}、Content-Type: application/json。可通过以下curl命令执行该请求：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv445' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
## 升级后怎么验证
可通过以下方式验证升级结果。第一，确认variable模块已合并到用户引导模块。第二，检查功能页面，确认存在下一步指引选项、商业版的分享链接限制及hook身份校验功能、API Key管理功能。第三，确认全局变量与开场白已合并为同一配置模块。
> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/445)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
