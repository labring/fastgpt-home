---
title: FastGPT V4.5.1版本升级操作与功能说明
slug: /zh/deploy/upgrade-v4-5-1
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/451
source_type: 官方文档
---

# FastGPT V4.5.1版本升级操作与功能说明

## 这个版本改了什么
FastGPT V4.5.1版本新增知识库文件夹管理功能。修复openai4.x sdk无法兼容oneapi的智谱和阿里接口的问题。修复部分模块无法触发完成事件的问题。

## 升级前要确认的事
已配置环境变量rootkey，明确当前部署的域名。初始化接口执行速度可能较慢，返回超时无需处理，需通过日志确认执行结果。

## 升级步骤（照做）
1. 替换curl命令中的{{rootkey}}为环境变量内的rootkey，{{host}}为自身部署域名。
2. 执行以下curl命令：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv451' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
3. 该初始化接口执行速度可能较慢，返回超时无需处理，需查看日志确认执行结果。

## 升级后怎么验证
检查知识库文件夹管理功能是否正常启用。测试openai4.x sdk兼容的智谱、阿里接口调用是否正常。确认部分模块触发完成事件的功能恢复正常。查看系统日志，确认数据库字段重命名、Mongo APP表知识库相关字段初始化、PG和Mongo的内容初始化（每个文件创建Mongo集合并赋值给PG）操作完成。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/451)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
