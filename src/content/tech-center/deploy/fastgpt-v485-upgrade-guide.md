---
title: FastGPT V4.8.5版本升级流程及更新内容说明
slug: /zh/deploy/fastgpt-v485-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/485
source_type: 官方文档
---

# FastGPT V4.8.5版本升级流程及更新内容说明

## V4.8.5版本更新内容
### 新增功能
合并插件和应用统一为工作台，新增应用创建副本功能，新增应用创建模板，支持代码运行结果作为工具输出，新增Markdown图片输出并支持移动端放大缩放。
### 优化项
优化原文件编码存取逻辑，知识库删除后简易模式会过滤已删除的知识库以避免错误判断，优化文件夹读取支持单个文件夹超出100个文件，问答拆分/手动录入时若存在a字段则自动将q作为补充索引，优化对话框页面代码，工作流新节点自动增加序号名。
### 修复问题
修复定时任务无法实际关闭的问题，修复输入引导特殊字符导致正则报错的问题，修复文件包含特殊字符%且未转义时导致页面崩溃的问题，修复自定义输入选择知识库引用时页面崩溃的问题。

## 升级操作步骤
1. 做好数据库备份。
2. 修改镜像：将fastgpt镜像的tag修改为v4.8.5，商业版镜像tag同样修改为v4.8.5。
3. 执行初始化操作：
   - 普通版用户：从任意终端发起HTTP POST请求，将`{{rootkey}}`替换为环境变量中的rootkey，`{{host}}`替换为FastGPT域名，命令如下：
     ```bash
     curl --location --request POST https://{{host}}/api/admin/initv485 \
     --header rootkey: {{rootkey}} \
     --header Content-Type: application/json
     ```
   - 商业版用户：额外执行一次HTTP POST请求，命令如下：
     ```bash
     curl --location --request POST https://{{host}}/api/admin/init/485 \
     --header rootkey: {{rootkey}} \
     --header Content-Type: application/json
     ```

## 初始化操作说明
普通版的初始化会将插件数据表合并到应用中，且不会删除插件表；商业版的初始化会重置知识库权限系统。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/485)
