---
title: FastGPT V4.9.14版本升级步骤与更新说明
slug: /zh/deploy/fastgpt-v4914-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4914
source_type: 官方文档
---

# FastGPT V4.9.14版本升级步骤与更新说明

本页面向FastGPT自部署用户，提供V4.9.14版本的升级操作指南与本次版本的更新详情。本次升级无需更新mcp_server、Sandbox、AIProxy三个组件，仅需将FastGPT主镜像及商业版镜像的tag设置为v4.9.14即可。

## 本次版本更新详情
### 新增内容
1. 知识库导入功能支持配置自动将文件名加入系统索引；
2. 新增Admin端审计日志功能。

### 优化项
1. 统一知识库训练队列的代码逻辑；
2. 优化输入框用户体验；
3. 优化图片知识库处理：自动去除介绍中的换行，避免模型输出换行导致图片无法显示；索引过程单独描述图片内容，检索后将图片描述赋予检索结果，帮助语言模型理解图片；
4. 对MCP Schema中缺少properties属性的值自动补全，避免部分模型运行报错；
5. 捕获JSON导入模板可能出现的报错；
6. 过滤CSV导出时可能存在的危险字符串；
7. 添加安全请求头；
8. 修改密码时强制其他登录端失效；
9. 优化Cite引用展示：识别前置的url并自动添加空格。

### 修复项
1. 修复知识库数据输入时识别QA模式错误的问题；
2. 修复知识库标签条件冲突的问题；
3. 修复对话日志点赞点踩的统计问题。

## 快速升级操作步骤
1. 打开FastGPT的部署配置文件（如docker-compose.yml）；
2. 找到FastGPT主镜像与商业版镜像的配置项，将其tag字段的值修改为v4.9.14；
3. 确认mcp_server、Sandbox、AIProxy组件的镜像配置无需进行版本更新；
4. 执行部署重启命令（如`docker-compose up -d`），等待服务启动完成即可完成升级。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4914
