---
title: 配置FastGPT的API基础地址与密钥参数的使用方法
slug: /zh/glossary/fastgpt-api-base-url-config
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/build/publish/openapi
source_type: 官方文档
---

# 配置FastGPT的API基础地址与密钥参数的使用方法

## 一句话定义
API基础地址是FastGPT中用于指定API请求目标服务地址的配置项。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
分为两种使用场景。第一种为OpenAPI对接场景，需配置两个参数：OPENAI_API_BASE_URL，格式为http://localhost:3000/api，需替换为自身部署的域名；OPENAI_API_KEY可填写获取到的密钥，若请求体需传appId，可直接使用密钥，若第三方应用仅能配置密钥，则填写apiKey-appId兼容格式。第二种为第三方知识库配置场景，需在FastGPT\projects\app\src\pageComponents\dataset\ApiDatasetForm.tsx文件中，通过renderBaseUrlSelector()组件渲染Base URL字段；若知识库支持根目录选择，需额外添加对应配置，且该组件对应API的getfiledetail方法，不支持则无需引用。

## 容易搞错的地方
1. OPENAI_API_BASE_URL需替换为实际部署的域名，不可保留示例的localhost地址。
2. OPENAI_API_KEY的两种填写方式易混淆，需根据对接场景选择正确格式。
3. 第三方知识库的Base URL字段渲染需匹配API的getfiledetail方法，不支持时无需添加该组件。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/publish/openapi)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
