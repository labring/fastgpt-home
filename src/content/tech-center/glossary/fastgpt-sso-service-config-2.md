---
title: FastGPT SSO服务的部署配置与使用说明
slug: /zh/glossary/fastgpt-sso-service-config-2
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/admin/sso
source_type: 官方文档
---

# FastGPT SSO服务的部署配置与使用说明

## 一句话定义
FastGPT SSO服务是用于实现单点登录的独立部署组件，需通过专用镜像启动运行，支持对接多类身份提供商。

## 在 FastGPT 里怎么用
可通过docker-compose部署，配置示例如下：
```yaml
fastgpt-sso:
  image: registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-sso-service:v4.14.16
  container_name: fastgpt-sso
  restart: always
  networks:
    - fastgpt
  environment:
    - SSO_PROVIDER=example
    - AUTH_TOKEN=xxxxx
    # 具体对接提供商的环境变量
```
需配置环境变量：SSO_PROVIDER指定对接的身份提供商类型，AUTH_TOKEN为鉴权信息（仅fastgpt-pro版本使用），同时需补充对应身份提供商的专属环境变量。支持的身份提供商及能力分为两类，一类同时支持SSO登录与成员同步，包括飞书、企业微信；另一类仅支持SSO登录，不支持成员同步，包括钉钉、Saml2.0、Oauth2.0。

## 容易搞错的地方
AUTH_TOKEN仅在fastgpt-pro版本中需要配置，非pro版本添加该变量会导致冗余配置。未根据所选身份提供商配置对应专属环境变量，会导致服务无法完成身份对接。未将SSO服务加入fastgpt网络，会导致与FastGPT主服务的通信失败。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/admin/sso)
> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/admin/sso)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
