---
title: FastGPT V4.3版本升级操作与验证说明
slug: /zh/deploy/upgrade-v4-3
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/43
source_type: 官方文档
---

# FastGPT V4.3版本升级操作与验证说明

## 这个版本改了什么
本版本包含两项核心调整。第一，新增初始化API接口，用于向PG数据库的modeldata表插入新列file_id，该列用于存储文件ID。第二，新增FILE_TOKEN_KEY环境变量，用于生成有效期30分钟的文件预览链接。

## 升级前要确认的事
升级前需确认已获取环境变量中配置的rootkey值，该值为初始化API请求的必要认证参数。同时确认FastGPT服务的部署地址可正常访问。

## 升级步骤（照做）
1. 配置新增的环境变量FILE_TOKEN_KEY，配置示例为FILE_TOKEN_KEY=filetokenkey。
2. 执行数据库初始化操作，通过发起指定的HTTP POST请求完成，完整命令如下：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv43' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
将{{host}}替换为FastGPT服务的实际部署地址，{{rootkey}}替换为环境变量中的rootkey值后执行该命令。

## 升级后怎么验证
首先确认FILE_TOKEN_KEY环境变量已正确配置。其次登录PG数据库，查看modeldata表是否存在file_id列。最后可尝试生成文件预览链接，确认链接可正常访问且有效期为30分钟。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/43)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
