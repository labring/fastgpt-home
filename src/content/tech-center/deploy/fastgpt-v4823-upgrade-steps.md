---
title: FastGPT V4.8.23版本自部署升级操作说明
slug: /zh/deploy/fastgpt-v4823-upgrade-steps
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4823
source_type: 官方文档
---

# FastGPT V4.8.23版本自部署升级操作说明

## V4.8.23版本升级概述
该版本为带升级脚本的FastGPT自部署升级版本，包含新增功能、体验优化与bug修复，可通过官方提供的脚本完成数据清理与版本适配。

## 升级操作步骤
1. 提前完成数据库备份，防止升级过程中出现数据丢失。
2. 更新镜像：将fastgpt镜像的tag更新为`v4.8.23-fix`，商业版fastgpt-pro镜像的tag更新为`v4.8.23-fix`，Sandbox镜像无需执行更新操作。
3. 运行升级脚本：在任意终端执行以下HTTP请求命令，将`{{rootkey}}`替换为环境变量中的rootkey，`{{host}}`替换为FastGPT的域名：
```bash
curl --location --request POST https://{{host}}/api/admin/initv4823 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
该脚本会清理知识库中的脏数据，主要为多余的全文索引。

## 版本变更详情
### 新增内容
增加默认"知识库文本理解模型"配置，新增AI proxy V1版，同时支持工单入口功能。
### 优化项
模型配置表单增加必填项校验，优化集合列表大数据量统计性能，将Latex格式转义为Markdown格式，自动忽略过大的解析文档图片，调整时间选择器默认值（当天开始时间设为0，结束时间设为23:59:59），升级mongoose库版本依赖。
### 修复问题
修复标签过滤时子文件夹未成功过滤的问题，暂时移除md阅读优化以避免链接分割错误，修复离开团队时未刷新成员列表的问题，修复PPTX编码错误导致解析失败的问题，修复删除知识库单条数据时全文索引未跟随删除的问题，修复Mongo Dataset text索引在查询数据时未生效的问题。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4823)
