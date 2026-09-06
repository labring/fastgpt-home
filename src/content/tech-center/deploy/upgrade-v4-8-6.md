---
title: FastGPT V4.8.6版本升级操作步骤与更新内容说明
slug: /zh/deploy/upgrade-v4-8-6
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/486
source_type: 官方文档
---

# FastGPT V4.8.6版本升级操作步骤与更新内容说明

## 这个版本改了什么
本版本包含多项新增功能、优化项与问题修复。新增应用权限继承功能；新增知识库单个集合禁用功能；系统插件模式变更，新增链接读取和数学计算器插件，后续将发布自定义系统插件指引；新增代码沙盒运行参数；新增AI对话时隐藏头部功能，适配移动端使用。优化内容包括文件读取逻辑（Mongo默认使用从节点以减轻主节点压力）、提示词模板、Mongo model重复加载问题。修复创建链接集合未返回ID、文档接口说明、API system提示合并、团队插件目录内内容无法加载、知识库集合目录面包屑无法加载、Markdown导出对话异常、提示模板结束标签错误、文档描述等16项问题。

## 升级前要确认的事
升级前需完成FastGPT关联数据库的备份操作。同时需提前获取环境变量中的rootkey，以及当前FastGPT的访问域名。

## 升级步骤（照做）
1. 修改镜像tag：将fastgpt、fastgpt-sandbox、商业版镜像的tag均修改为v4.8.6。
2. 执行初始化操作：从任意终端发起以下HTTP请求，将{{rootkey}}替换为环境变量中的rootkey，{{host}}替换为FastGPT域名：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv486' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
该请求将初始化应用的继承权限。

## 升级后怎么验证
升级完成后，可通过访问FastGPT平台检查新增功能与优化项是否正常生效。可尝试创建链接集合，确认返回正确ID；尝试导出Markdown格式的对话，确认无异常。检查团队插件目录、知识库集合目录面包屑是否正常加载，验证提示模板、API system提示等功能是否符合预期。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/486)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
