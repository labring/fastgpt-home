---
title: FastGPT V4.4.7版本升级内容与操作步骤说明
slug: /zh/deploy/upgrade-v4-4-7
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/447
source_type: 官方文档
---

# FastGPT V4.4.7版本升级内容与操作步骤说明

## 这个版本改了什么
FastGPT V4.4.7版本包含四项优化与变更：优化数据库文件CRUD操作；兼容链接读取作为数据源；区分手动录入与标注内容，支持将数据追溯至对应文件；升级OpenAI SDK版本。

## 升级前要确认的事
需提前获取环境变量中配置的rootkey值，明确当前FastGPT的部署域名；知晓初始化操作可能因数据量较大耗时较长，可通过服务日志查看执行进度。

## 升级步骤（照做）
1. 替换命令中的{{rootkey}}为环境变量内的rootkey，{{host}}为自身部署域名。
2. 执行以下HTTP POST请求：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv447' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
该请求用于初始化PG索引，并将file_id字段中的空对象转换为manual对象。

## 升级后怎么验证
查看服务运行日志，确认初始化API执行完成且无异常报错；确认数据库PG索引已完成初始化，file_id字段中的空对象已转换为manual对象。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/447)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
