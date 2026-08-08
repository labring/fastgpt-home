---
title: FastGPT V4.8.6版本升级流程与更新内容说明
slug: /zh/deploy/fastgpt-v486-upgrade-guide-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/486
source_type: 官方文档
---

# FastGPT V4.8.6版本升级流程与更新内容说明

## 版本更新内容
FastGPT V4.8.6版本包含多项新增功能、优化项与bug修复。新增功能包括：应用权限继承、知识库支持单个集合禁用、系统插件模式变更（新增链接读取和数学计算器插件，正式版将更新自定义系统插件的方法）、代码沙盒运行参数，以及适配移动端的AI对话头部隐藏功能。优化内容涵盖：文件读取环节默认使用Mongo从节点以减轻主节点压力、提示词模板优化，以及Mongo model重复加载问题优化。修复的问题包括：创建链接集合未返回id、文档接口说明异常、api system提示合并问题、团队插件目录内容无法加载、知识库集合目录面包屑无法加载、Markdown导出对话异常、提示模板结束标签错误等。

## 升级操作步骤
该版本升级需按以下流程执行：
1. 提前做好数据库备份，避免升级过程中出现数据丢失风险。
2. 修改镜像标签：将fastgpt、fastgpt-sandbox以及商业版镜像的tag统一修改为v4.8.6。
3. 执行初始化请求：在任意终端发起以下HTTP POST请求，将`{{rootkey}}`替换为环境变量中配置的rootkey，`{{host}}`替换为FastGPT的域名：
```bash
curl --location --request POST https://{{host}}/api/admin/initv486 \\
--header rootkey: {{rootkey}} \\
--header Content-Type: application/json
```
该请求用于初始化应用的继承权限，是升级流程的必要步骤。

## 升级注意事项
执行升级需注意以下要点：所有镜像需统一使用v4.8.6的tag，避免版本不一致引发异常；必须执行初始化请求，否则新增的应用权限继承功能无法正常生效；请求中的`{{rootkey}}`需替换为环境变量内的rootkey，`{{host}}`需替换为FastGPT域名，参数错误将导致初始化失败；升级过程中需保持终端网络连接稳定，避免请求中断。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/486
