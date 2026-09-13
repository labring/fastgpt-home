---
title: 说明FastGPT SSO服务镜像的部署配置方法
slug: /zh/glossary/fastgpt-sso-image-deployment
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/admin/sso
source_type: 官方文档
---

# 说明FastGPT SSO服务镜像的部署配置方法

## 一句话定义
FastGPT SSO服务镜像是用于部署FastGPT单点登录服务的官方镜像，支持对接多种第三方身份提供商，实现系统登录与成员同步功能。

## 在 FastGPT 里怎么用
通过docker-compose部署该镜像，官方推荐使用的镜像地址为registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-sso-service:v4.14.16。部署配置需将容器名称设为fastgpt-sso，设置重启策略为always，将容器加入fastgpt网络。需配置的基础环境变量包括SSO_PROVIDER与AUTH_TOKEN，其中AUTH_TOKEN为FastGPT Pro版本所需的鉴权信息。此外需根据对接的身份提供商配置专属的环境变量。支持的身份提供商包含飞书、企业微信、钉钉、Saml2.0、Oauth2.0，其中飞书与企业微信同时支持成员同步功能，其余提供商仅支持单点登录。

## 容易搞错的地方
部分配置人员会忽略不同身份提供商需要配置不同的专属环境变量，导致部署后无法正常对接。AUTH_TOKEN仅在FastGPT Pro版本中生效，非Pro版本无需配置该参数。部署时需确保SSO服务与主FastGPT服务处于同一网络，否则两个服务之间无法正常通信，影响单点登录功能的正常使用。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/admin/sso)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
