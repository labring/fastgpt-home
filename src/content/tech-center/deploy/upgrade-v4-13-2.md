---
title: FastGPT V4.13.2版本升级操作与内容说明
slug: /zh/deploy/upgrade-v4-13-2
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-13/4132
source_type: 官方文档
---

# FastGPT V4.13.2版本升级操作与内容说明

## 这个版本改了什么
本次升级需更新FastGPT镜像tag v4.13.2、FastGPT商业版镜像tag v4.13.2、fastgpt-plugin镜像tag v0.2.4，mcp_server、Sandbox、AIProxy无需更新。新增功能包括HTTP工具集支持手动创建模式、项目OpenAPI框架引入、APIKey有效性检测接口、导出对话日志末尾跟随当前版本全局变量。优化内容包含非管理员无法查看团队审计日志、引入S3存储应用头像、提升工作流画布性能。修复问题包括LLM模型默认支持图片导致请求错误、Mongo多副本切换时watch未重新触发、文本分块所有策略用完后未处理LastText数据、变量输入框number=0时无法通过校验、工作流复杂循环并行判断异常。插件新增Perplexity search、Base64转文件等13个工具，系统工具支持配置是否在Worker中运行。

## 升级前要确认的事
需确认原有S3存储的配置信息，准备好环境变量中的rootkey与FastGPT域名。若使用外部S3存储，需提前知晓其是否支持circleLife操作，避免升级脚本执行时出现报错。

## 升级步骤（照做）
1. 更新对应镜像：FastGPT镜像tag v4.13.2，FastGPT商业版镜像tag v4.13.2，fastgpt-plugin镜像tag v0.2.4，其余组件无需更新。
2. 配置新增环境变量：S3_PUBLIC_BUCKET=fastgpt-public（对应原plugin项目的S3_TOOL_BUCKET），S3_PRIVATE_BUCKET=fastgpt-private（对应原plugin项目的S3_PLUGIN_BUCKET），同时将原S3_TOOL_BUCKET和S3_PLUGIN_BUCKET分别改名成S3_PUBLIC_BUCKET和S3_PRIVATE_BUCKET。
3. 执行升级脚本：在任意终端发起HTTP请求，替换{{rootkey}}为环境变量中的rootkey，{{host}}为FastGPT域名，执行命令：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv4132' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
该脚本会删除原S3的circleLife策略，若使用外部S3不支持该操作，脚本报错可忽略。

## 升级后怎么验证
可通过以下方式验证升级效果：检查FastGPT与fastgpt-plugin的镜像版本是否为v4.13.2与v0.2.4；测试HTTP工具集手动创建模式、APIKey有效性检测接口、导出对话日志功能是否正常；确认非管理员无法查看团队审计日志；测试工作流画布、文本分块、变量输入框、循环并行判断等修复功能是否正常运行；验证新增的插件工具是否可正常调用。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-13/4132)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
