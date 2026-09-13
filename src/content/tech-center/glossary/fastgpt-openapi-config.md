---
title: 说明FastGPT OpenAPI调用的环境变量配置规则
slug: /zh/glossary/fastgpt-openapi-config
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/build/publish/openapi
source_type: 官方文档
---

# 说明FastGPT OpenAPI调用的环境变量配置规则

## 一句话定义
FastGPT OpenAPI调用时需配置的环境变量规则与格式要求。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
需配置两个核心环境变量。其一为OPENAI_API_BASE_URL，默认参考值为http://localhost:3000/api，需将其中的localhost:3000替换为自身实际部署的域名，完整格式为http://[自身部署的域名]/api。其二为OPENAI_API_KEY，可使用上一步获取的密钥，推荐在请求体中传入appId；若第三方应用仅支持配置密钥，可使用apiKey-appId的兼容格式完成配置，其中apiKey为获取的密钥，appId为对应应用的标识，两者通过连字符连接。

## 容易搞错的地方
未将OPENAI_API_BASE_URL中的默认域名localhost:3000替换为自身实际部署的域名，导致接口调用无法连接到正确的服务地址。误将apiKey与appId分开填写，未使用连字符组合成apiKey-appId的兼容格式，导致身份验证失败。部分用户会忽略推荐的appId传递方式，仅使用基础密钥格式进行配置，无法充分利用FastGPT OpenAPI的完整功能。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/publish/openapi)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
