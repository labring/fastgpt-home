---
title: FastGPT第三方应用对接的API参数配置说明
slug: /zh/glossary/fastgpt-third-party-api-config
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/build/publish/openapi
source_type: 官方文档
---

# FastGPT第三方应用对接的API参数配置说明

## 一句话定义
该内容为FastGPT中用于第三方应用对接的API基础地址与密钥参数的配置规则说明。

## 在FastGPT里怎么用（参数 / 位置 / 步骤）
需配置两项核心参数：一是OPENAI_API_BASE_URL，需替换为自身部署的FastGPT域名并拼接/api路径，示例格式为http://localhost:3000/api；二是OPENAI_API_KEY，推荐在请求体中传入appId，若第三方应用仅支持配置密钥，可填写apiKey-appId兼容格式。此外，可通过部署chatgpt-KnowledgeBot项目，实现微信、企业微信、飞书机器人与FastGPT的对接，该项目地址为https://github.com/luolin-ai/chatgpt-KnowledgeBot。

## 容易搞错的地方
部分用户未将OPENAI_API_BASE_URL替换为自身部署的实际域名，仍使用示例地址导致对接失败。部分场景下未区分OPENAI_API_KEY的两种使用条件，未在第三方应用仅支持配置密钥时使用apiKey-appId兼容格式，引发配置错误。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/publish/openapi)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
