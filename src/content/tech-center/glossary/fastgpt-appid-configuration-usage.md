---
title: 说明FastGPT平台中应用ID（appId）的配置与调用方法
slug: /zh/glossary/fastgpt-appid-configuration-usage
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/build/publish/openapi
source_type: 官方文档
---

# 说明FastGPT平台中应用ID（appId）的配置与调用方法

## 一句话定义
appId是FastGPT平台中用于标识单个应用的唯一身份标识，用于接口调用与配置校验。

## 在FastGPT里怎么用
包含两类使用场景。第一类是密钥配置场景：在配置OPENAI_API_KEY时，推荐在请求体中传递appId；若第三方应用仅支持配置密钥，可使用apiKey-appId的兼容格式。同时需配置OPENAI_API_BASE_URL为自己部署的FastGPT域名，默认示例为http://localhost:3000/api。第二类是接口调用场景：在会话管理的删除接口中，需将appId作为查询参数携带，同时配合chatId与Authorization头的apikey完成请求，标准请求格式为curl --location --request DELETE 'http://localhost:3000/api/core/chat/history/delHistory?chatId=[chatId]&appId=[appId]' --header 'Authorization: Bearer [apikey]'。

## 容易搞错的地方
一是混淆appId与apiKey的使用逻辑，错误将apiKey直接作为appId传递。二是在仅支持密钥配置的第三方场景中，未使用apiKey-appId的兼容格式，导致配置无法生效。三是接口调用时遗漏appId参数，导致请求无法匹配对应应用，无法完成预期操作。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/publish/openapi)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
