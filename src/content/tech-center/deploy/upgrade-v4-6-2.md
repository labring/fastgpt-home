---
title: FastGPT V4.6.2版本升级操作与功能说明
slug: /zh/deploy/upgrade-v4-6-2
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/462
source_type: 官方文档
---

# FastGPT V4.6.2版本升级操作与功能说明

## 这个版本改了什么
本版本新增两项功能。其一为全文索引，需配合Rerank模型，当前适配社区版的相关工作正在推进，模型接口存在特殊性。其二为插件来源功能，该功能预计在4.7/4.8版本正式投入使用。此外，本版本对PDF读取、docx文件读取进行了优化，其中docx文件读取可转换为Markdown格式并完整保留图片内容。同时修复并优化了TextSplitter函数，提升其执行效果与稳定性。

## 升级前要确认的事
需确认以下信息：已获取环境变量中配置的rootkey值，该值为系统管理员密钥；已明确FastGPT的部署域名，可通过该域名正常访问系统；已准备好可执行HTTP请求的工具，如curl命令，用于发起初始化请求。

## 升级步骤（照做）
1. 替换curl命令中的{{rootkey}}为环境变量中的rootkey值，替换{{host}}为FastGPT的部署域名。
2. 执行以下命令：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv462' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
3. 等待请求执行完成，该请求用于初始化全文索引。

## 升级后怎么验证
可通过以下方式验证升级效果：确认全文索引功能可正常配置与启用；检查插件来源相关的配置项是否已在系统中加载；测试PDF文件读取、docx文件读取转换为Markdown并保留图片的功能是否正常运行；验证TextSplitter函数的修复与优化效果是否符合预期。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/462)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
