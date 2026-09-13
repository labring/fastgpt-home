---
title: FastGPT中share类型外链与URL参数的使用说明
slug: /zh/glossary/fastgpt-share-url-params
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4145
source_type: 官方文档
---

# FastGPT中share类型外链与URL参数的使用说明

## 一句话定义
Share指FastGPT中用于分享对话的外链（OutLink）类型，可携带自定义URL参数并支持字段配置。

## 在FastGPT里怎么用
通过终端执行指定HTTP请求完成share类型外链的字段更新，请求命令为`curl --location --request POST 'https://{{host}}/api/admin/initv4145' \--header 'rootkey: {{rootkey}}' \--header 'Content-Type: application/json'`，需将`{{rootkey}}`替换为环境变量中的rootkey，`{{host}}`替换为FastGPT域名。升级后会为所有share类型的OutLink记录添加showFullText字段，并完成字段重命名：showNodeStatus改为showRunningStatus、responseDetail改为showCite、showRawSource改为canDownloadSource。在高级编排的HTTP模块中，可通过`{{自定义参数名}}`提取share外链URL中的自定义参数，例如URL为http://test.com/chat/share?shareId=aaa&chatId=bbb&userId=10086&key=[REDACTED_CREDENTIAL]

## 容易搞错的地方
执行升级脚本时，需正确替换`{{rootkey}}`和`{{host}}`两个占位符，错误替换会导致脚本执行失败。share外链的URL参数需遵循标准查询字符串格式，自定义参数名称需与高级编排中配置的变量名完全一致，否则无法正常提取参数。share类型OutLink的字段配置仅能通过指定的升级脚本完成，无法直接在前端界面修改。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4145)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
