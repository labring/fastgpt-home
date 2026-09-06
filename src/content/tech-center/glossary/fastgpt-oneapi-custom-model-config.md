---
title: FastGPT中OneAPI接入自定义模型的配置说明
slug: /zh/glossary/fastgpt-oneapi-custom-model-config
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/config/model/intro
source_type: 官方文档
---

# FastGPT中OneAPI接入自定义模型的配置说明

## 一句话定义
OneAPI是FastGPT中用于对接第三方模型提供商，完成自定义模型配置的统一接入方式，可映射模型ID与提供商信息。

## 在 FastGPT 里怎么用
首先进入模型配置的新增自定义模型页面，配置模型相关字段。其中model字段需对应OneAPI中渠道的模型名，provider字段填写模型提供商，可使用内置提供商或填写Other。若选择直接接入第三方模型，需修改部署FastGPT的docker-compose.yml文件，注释掉AIProxy相关代码，在OPENAI_BASE_URL中填入模型开放地址，地址必须携带/v1后缀。未开启鉴权的模型，KEY字段可随意填写；开启鉴权后需填入对应密钥。完成配置后即可在FastGPT中使用该自定义模型。

## 容易搞错的地方
直接接入时，OPENAI_BASE_URL必须携带/v1后缀，否则无法正常连接模型。模型ID需与OneAPI中渠道配置的模型名完全一致，否则会出现模型匹配失败的问题。未开启鉴权的模型，KEY字段无需填入有效内容，但开启鉴权后需填入对应密钥，否则无法通过鉴权。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/config/model/intro)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
