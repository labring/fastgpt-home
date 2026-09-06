---
title: FastGPT V4.8.23版本升级内容与操作步骤说明
slug: /zh/deploy/upgrade-v4-8-23
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4823
source_type: 官方文档
---

# FastGPT V4.8.23版本升级内容与操作步骤说明

## 这个版本改了什么
本次更新包含新增功能、体验优化与问题修复三类内容。
新增功能：增加默认"知识库文本理解模型"配置；AI proxy V1版可替换OneAPI使用，同时提供完整模型调用日志，便于排查问题；增加工单入口支持。
体验优化：模型配置表单增加必填项校验；集合列表数据统计方式优化，提高大数据量统计性能；优化数学公式，转义Latex格式成Markdown格式；解析文档图片时，图片太大自动忽略；时间选择器当天开始时间自动设为0，结束时间设为23:59:59，避免UI与实际逻辑偏差；升级mongoose库版本依赖。
问题修复：修复标签过滤时子文件夹未成功过滤的问题；暂时移除md阅读优化，避免链接分割错误；修复离开团队时未刷新成员列表的问题；修复PPTX编码错误导致解析失败的问题；修复删除知识库单条数据时全文索引未跟随删除的问题；修复Mongo Dataset text索引在查询数据时未生效的问题。

## 升级前要确认的事
升级前需完成数据库备份，防止数据丢失。同时需准备环境变量中的rootkey，以及FastGPT的域名信息，用于执行后续升级脚本。

## 升级步骤（照做）
1. 更新镜像：将fastgpt镜像tag更新为v4.8.23-fix；将fastgpt-pro商业版镜像tag更新为v4.8.23-fix；Sandbox镜像无需更新。
2. 运行升级脚本：从任意终端发起以下HTTP POST请求，其中{{rootkey}}替换为环境变量中的rootkey，{{host}}替换为FastGPT域名：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv4823' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
该脚本用于清理知识库脏数据，主要为多余的全文索引。

## 升级后怎么验证
升级完成后可通过以下方式验证：检查模型配置表单的必填项校验功能是否正常生效；确认系统中已显示工单入口；验证删除知识库单条数据时，全文索引是否同步移除；查看数学公式是否正确转义为Markdown格式；确认集合列表的大数据量统计功能运行正常。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4823)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
