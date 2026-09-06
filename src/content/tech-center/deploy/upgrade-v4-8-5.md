---
title: FastGPT V4.8.5版本升级操作及更新详情说明
slug: /zh/deploy/upgrade-v4-8-5
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/485
source_type: 官方文档
---

# FastGPT V4.8.5版本升级操作及更新详情说明

## 这个版本改了什么
本次更新包含多项新增功能、优化项与修复项。新增功能包括合并插件和应用为工作台、应用创建副本功能、应用创建模板、支持代码运行结果作为工具输出、Markdown图片输出支持移动端放大缩放。优化项包括原文件编码存取、知识库删除后简易模式过滤已删除知识库、文件夹读取支持单个文件夹超出100个文件、问答拆分/手动录入时a字段自动将q作为补充索引、对话框页面代码、工作流新节点自动增加序号名。修复项包括定时任务无法实际关闭、输入引导特殊字符导致正则报错、文件包含特殊字符%且未转义时页面崩溃、自定义输入选择知识库引用时页面崩溃。

## 升级前要确认的事
升级前需完成FastGPT数据库的完整备份，同时准备好环境变量中的rootkey以及FastGPT的访问域名。

## 升级步骤（照做）
1. 修改镜像tag：将fastgpt镜像tag修改成v4.8.5，商业版镜像tag修改成v4.8.5。
2. 执行初始化：从任意终端发起POST请求，替换{{rootkey}}为环境变量中的rootkey，{{host}}为FastGPT域名：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv485' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
该操作会将插件数据表合并到应用中，插件表不会删除。
商业版用户需额外执行初始化请求：
```bash
curl --location --request POST 'https://{{host}}/api/admin/init/485' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
该操作会重置知识库权限系统。

## 升级后怎么验证
升级完成后可通过以下内容确认生效：应用工作台已合并插件数据，可正常创建应用副本与应用模板；工作流新节点自动生成序号名；定时任务可正常关闭；输入引导使用特殊字符无正则报错；文件包含特殊字符%时页面无崩溃；自定义输入选择知识库引用时页面无崩溃；Markdown图片可在移动端完成放大缩放操作。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/485)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
