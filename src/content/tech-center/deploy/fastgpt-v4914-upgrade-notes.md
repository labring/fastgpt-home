---
title: FastGPT V4.9.14版本升级操作与更新内容说明
slug: /zh/deploy/fastgpt-v4914-upgrade-notes
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4914
source_type: 官方文档
---

# FastGPT V4.9.14版本升级操作与更新内容说明

本页面向FastGPT自部署用户，提供V4.9.14版本的升级流程与更新细节说明，所有操作与变更均基于官方文档内容。

## 版本升级操作步骤
1.  更新FastGPT官方镜像，将镜像tag指定为`v4.9.14`；
2.  若使用商业版，同步更新FastGPT商业版镜像，tag同样设为`v4.9.14`；
3.  确认无需对`mcp_server`、`Sandbox`、`AIProxy`执行更新操作。

## 本次版本新增功能
本次V4.9.14版本新增两项核心功能：一是知识库导入支持配置项，可自动将文件名加入系统索引；二是Admin管理端新增审计日志功能，可记录管理员操作相关日志。

## 优化项与问题修复
优化内容包含多方面：统一知识库训练队列的代码逻辑，优化输入框用户体验；图片知识库自动去除介绍中的换行，避免模型输出换行导致图片无法显示；图片索引过程会单独描述图片内容，并在检索后将图片描述赋予检索结果，帮助语言模型理解图片信息；针对MCP Schema中缺少`properties`属性的内容自动补全，避免部分模型运行报错；捕获JSON导入模板可能出现的报错；过滤CSV导出时可能存在的危险字符串；添加安全请求头提升系统安全性；修改密码时强制其他登录端失效；优化Cite引用展示效果，识别前置的URL并自动添加空格。
修复的问题包括：知识库数据输入时QA模式识别错误的问题、知识库标签条件冲突的问题、对话日志点赞点踩统计异常的问题。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4914)
