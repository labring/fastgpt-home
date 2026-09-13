---
title: FastGPT V4.7.1版本升级内容及操作步骤说明
slug: /zh/deploy/upgrade-v4-7-1
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/471
source_type: 官方文档
---

# FastGPT V4.7.1版本升级内容及操作步骤说明

## 这个版本改了什么
本版本包含多项新增功能与优化项。新增语音输入完整配置，支持开关语音输入（含分享页面）、语音输入后自动发送、语音输入后自动流式语音播放。新增pptx和xlsx文件读取，该功能将所有文件读取操作转移至服务端，会消耗更多服务器资源，且上传时无法预览更多内容。新增集成Laf云函数，可读取Laf账号中的云函数作为HTTP模块。新增定时器垃圾数据清理，仅清理最近n小时的垃圾数据，需保证服务持续运行，若长时间未运行服务，可调用clearInvalidData接口执行全量清理。商业版新增后台配置系统通知功能。优化支持IP模式导出知识库。修改csv导入模板，取消header校验，自动获取前两列。修复工具调用模块连线数据类型校验错误、自定义索引输入时解构数据失败、rerank模型数据格式、问题补全历史记录BUG、分享页面特殊情况下加载缓慢问题（该问题由SSR时数据库未触发连接导致）。

## 升级前要确认的事
旧版config.json配置说明已不再维护，当前版本需参考环境变量说明文档进行配置。需提前准备环境变量中的rootkey与FastGPT的域名host，用于后续执行初始化脚本。需新增Laf相关环境配置，以支持集成Laf云函数功能。需了解新增pptx和xlsx文件读取会增加服务器资源消耗。

## 升级步骤（照做）
1. 修改配置文件，新增Laf环境配置，替换旧版config.json配置为环境变量配置，参考环境变量说明文档。
2. 执行初始化脚本：从任意终端发起HTTP POST请求，替换命令中的{{rootkey}}为环境变量中的rootkey，{{host}}为FastGPT的域名。命令如下：
```bash
curl --location --request POST 'https://{{host}}/api/admin/clearInvalidData' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
该请求用于执行脏数据清理，包括清理无效的文件、图片、知识库集合与向量。

## 升级后怎么验证
可通过以下方式验证升级效果：测试语音输入功能，包括分享页面的语音输入、自动发送与自动流式语音播放是否正常。测试pptx和xlsx文件的上传与读取是否正常。测试csv文件导入，确认无需header校验且自动获取前两列。测试工具调用模块连线、自定义索引输入、rerank模型、问题补全历史记录等功能是否正常。测试分享页面在特殊场景下的加载速度是否正常。商业版用户可测试后台系统通知配置功能是否可用。测试IP模式导出知识库是否正常。可调用clearInvalidData接口验证脏数据清理功能是否正常运行，确认定时器垃圾数据清理按预期执行。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/471)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
