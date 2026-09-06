---
title: FastGPT V4.8.20版本升级操作与变更说明
slug: /zh/deploy/upgrade-v4-8-20
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4820
source_type: 官方文档
---

# FastGPT V4.8.20版本升级操作与变更说明

## 这个版本改了什么
新增可视化模型参数配置，取代原配置文件配置模型，预设超过100个模型配置，支持所有类型模型一键测试，预计下个版本完全支持在页面上配置渠道。新增DeepSeek resoner模型支持输出思考过程。新增使用记录导出和仪表盘。新增Markdown语法扩展，支持audio和video代码块。调整max_tokens计算逻辑，优先保证max_tokens为配置值，如超出最大上下文，则减少历史记录，例如申请8000的max_tokens，则上下文长度会减少8000。优化问题优化增加上下文过滤，避免超出上下文。优化页面组件抽离，减少页面组件路由。优化全文检索，忽略大小写。优化问答生成和增强索引为流输出，避免部分模型超时。优化自动为assistant空content补充null，合并连续的text assistant，避免部分模型抛错。调整图片Host，取消上传时补充FE_DOMAIN，改为发送对话前补充，避免替换域名后原图片无法正常使用。修复部分场景成员列表无法触底加载问题。修复工作流递归执行部分条件下无法正常运行问题。

## 升级前要确认的事
需做好数据库备份。检查环境变量配置，若使用过较早版本且配置了`ONEAPI_URL`，需统一改为`OPENAI_BASE_URL`。Sandbox镜像无需更新。

## 升级步骤（照做）
1.  更新镜像：将fastgpt镜像tag改为v4.8.20-fix2，fastgpt-pro商业版镜像tag改为v4.8.20-fix2。
2.  运行升级脚本：从任意终端发起HTTP POST请求，替换`{{rootkey}}`为环境变量中的rootkey，`{{host}}`为FastGPT域名，执行命令：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv4820' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
脚本会自动将原配置文件的模型加载到新版模型配置中。

## 升级后怎么验证
访问FastGPT平台，检查模型配置页面是否可正常加载可视化配置项。发起模型测试请求，验证模型是否正常响应，DeepSeek resoner模型可检查是否输出思考过程。检查成员列表、工作流运行是否正常，图片链接是否可正常加载。导出使用记录，验证导出功能是否正常。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4820)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
