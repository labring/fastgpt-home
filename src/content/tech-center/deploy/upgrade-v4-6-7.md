---
title: FastGPT V4.6.7版本升级说明与操作指南
slug: /zh/deploy/upgrade-v4-6-7
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/467
source_type: 官方文档
---

# FastGPT V4.6.7版本升级说明与操作指南

## 这个版本改了什么
1. 修改知识库UI及新的导入交互方式。
2. 优化知识库和对话的数据索引。
3. 知识库openAPI，支持通过API操作知识库。
4. 新增输入框变量提示。输入`{`号后将会获得可用变量提示。计划于2月份的版本中，优化变量内容，支持模块的局部变量以及更多全局变量写入。
5. 优化切换团队后会保存记录，下次登录时优先登录该团队。
6. 修复API对话时chatId冲突问题。
7. 修复Iframe嵌入网页可能导致的window.onLoad冲突。

## 升级前要确认的事
需提前获取环境变量中的rootkey，明确FastGPT部署的域名，确保可发起合法的HTTP POST请求执行初始化操作。

## 升级步骤（照做）
发起1个HTTP POST请求，将`{{rootkey}}`替换为环境变量中的rootkey，`{{host}}`替换为FastGPT部署的域名。执行命令如下：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv467' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
初始化操作将完成两项内容：将images重新关联到数据集，设置pg表的null值。

## 升级后怎么验证
可通过以下方式验证升级效果：
1. 进入知识库管理页面，确认界面样式与导入交互方式已更新。
2. 发起API对话请求，确认chatId未出现冲突问题。
3. 嵌入Iframe网页，确认window.onLoad事件未出现冲突。
4. 在输入框输入`{`符号，确认弹出可用变量提示。
5. 切换团队后退出登录，再次登录确认优先加载该团队页面。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/467)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
