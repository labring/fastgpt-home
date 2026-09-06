---
title: FastGPT V4.8.4版本升级操作与更新内容说明
slug: /zh/deploy/upgrade-v4-8-4
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/484
source_type: 官方文档
---

# FastGPT V4.8.4版本升级操作与更新内容说明

## 这个版本改了什么
本次更新包含9项内容：1. 新增应用使用新权限系统。2. 新增应用支持文件夹分类管理。3. 优化文本分割功能，增加连续换行、制表符清除逻辑，避免大文本处理的性能问题。4. 重要修复系统插件运行池数据污染问题，该问题因从内存获取数据导致全局污染。5. 修复Debug模式下，相同source和target内容导致连线显示异常的问题。6. 修复定时执行初始化错误的问题。7. 修复应用调用传参异常的问题。8. 修复ctrl + cv复制复杂节点时nodeId错误的问题。9. 调整组件库全局theme。

## 升级前要确认的事
升级前需确认FastGPT运行环境的镜像配置权限，已获取环境变量中的rootkey与FastGPT商业版域名。商业版用户需提前准备可执行HTTP请求的终端环境。fastgpt-sandbox镜像升级为可选操作，无功能变更。

## 升级步骤（照做）
1. 修改镜像：将fastgpt镜像tag修改为v4.8.4；将fastgpt-sandbox镜像tag修改为v4.8.4（选择性，无变更）；将商业版镜像tag修改为v4.8.4。
2. 商业版用户执行初始化：从任意终端发起以下HTTP请求，其中`{{rootkey}}`替换为环境变量中的rootkey，`{{host}}`替换为FastGPT商业版的域名：
```bash
curl --location --request POST 'https://{{host}}/api/admin/init/484' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```

## 升级后怎么验证
升级完成后可通过以下方式验证功能正常：1. 确认应用权限系统已更新，可正常配置应用相关权限。2. 确认应用列表支持文件夹分类管理。3. 测试文本分割功能，处理包含连续换行、制表符的大文本，确认运行无性能异常。4. 检查系统插件运行状态，确认无数据污染问题。5. 在Debug模式下创建相同source和target的节点连线，确认显示正常。6. 测试定时初始化任务，确认执行无错误。7. 测试应用调用传参功能，确认参数传递正常。8. 复制复杂节点，确认nodeId无错误。9. 确认界面全局主题已更新。商业版用户可通过初始化请求的返回结果确认流程执行完成。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/484)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
