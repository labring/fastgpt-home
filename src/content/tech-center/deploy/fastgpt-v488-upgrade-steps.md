---
title: FastGPT V4.8.8版本升级操作与更新说明
slug: /zh/deploy/fastgpt-v488-upgrade-steps
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/488
source_type: 官方文档
---

# FastGPT V4.8.8版本升级操作与更新说明

## 版本更新内容
FastGPT V4.8.8版本包含多项功能更新与修复。新增功能包括重构系统插件结构，支持向开源社区提交系统插件；新增DuckDuckGo、飞书webhook两款系统插件；提示词输入框及工作流Textarea输入框支持通过/唤起变量选择，可直接选取上游输出值。商业版新增知识库权限继承功能。优化项涵盖移动端快速切换应用交互、节点图标样式，对话框引用新增复制按钮与折叠功能，同时升级OpenAI SDK并自定义whisper模型接口。修复了Permission表声明、并行节点运行时间记录、嵌套节点运行详情展示等多项问题。

## 升级前置准备
升级前需完成数据库备份，避免数据丢失。

## 升级操作步骤
具体升级步骤如下：
1. 修改FastGPT镜像tag为`v4.8.8-fix2`，商业版镜像tag修改为`v4.8.8`；
2. 执行初始化操作，通过终端发起HTTP POST请求，将`{{rootkey}}`替换为环境变量中的rootkey，`{{host}}`替换为FastGPT域名，请求命令为：
```bash
curl --location --request POST https://{{host}}/api/admin/initv488 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
该请求会初始化知识库的继承权限。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/488)
