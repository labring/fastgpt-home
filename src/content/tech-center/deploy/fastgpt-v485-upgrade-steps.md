---
title: FastGPT V4.8.5版本升级步骤与更新内容说明
slug: /zh/deploy/fastgpt-v485-upgrade-steps
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/485
source_type: 官方文档
---

# FastGPT V4.8.5版本升级步骤与更新内容说明

## V4.8.5版本更新内容
本次更新包含多项功能新增、体验优化与问题修复。新增功能包括：合并插件与应用统一为工作台、应用创建副本功能、应用创建模板、支持代码运行结果作为工具输出、Markdown图片输出支持移动端放大缩放。优化项涵盖：原文件编码存取逻辑、知识库删除后简易模式自动过滤已删除知识库避免误判、文件夹读取支持单文件夹超100个文件、问答拆分/手动录入时若存在a字段则自动将q作为补充索引、对话框页面代码、工作流新节点自动增加序号名。修复问题包括：定时任务无法实际关闭、输入引导含特殊字符导致正则报错、文件包含未转义的%字符导致页面崩溃、自定义输入选择知识库引用时页面崩溃。

## V4.8.5版本升级操作步骤
请按照以下顺序执行升级：
1.  提前做好数据库备份，避免升级过程中数据丢失。
2.  修改FastGPT镜像的tag为`v4.8.5`，商业版镜像tag同步修改为`v4.8.5`。
3.  执行初始化操作：从任意终端发起HTTP POST请求，替换`{{rootkey}}`为环境变量中的rootkey，`{{host}}`为FastGPT域名：
    ```bash
    curl --location --request POST https://{{host}}/api/admin/initv485 \
    --header rootkey: {{rootkey}} \
    --header Content-Type: application/json
    ```
    该请求会将插件数据表合并至应用中，且不会删除插件表。商业版用户需额外执行一次初始化请求：
    ```bash
    curl --location --request POST https://{{host}}/api/admin/init/485 \
    --header rootkey: {{rootkey}} \
    --header Content-Type: application/json
    ```
    该请求会重置知识库权限系统。

## 升级注意事项
本次升级需严格遵循操作顺序，不可跳过备份步骤。初始化请求仅需执行一次，重复执行可能引发未知数据异常。需注意普通版与商业版的初始化接口不同，请勿混淆使用。若升级后出现功能异常，请先检查镜像tag是否正确配置为`v4.8.5`，以及初始化请求的参数是否替换正确。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/485
