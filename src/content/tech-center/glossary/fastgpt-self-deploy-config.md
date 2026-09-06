---
title: 讲解FastGPT自部署的SSO服务与插件调试配置
slug: /zh/glossary/fastgpt-self-deploy-config
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/admin/sso
source_type: 官方文档
---

# 讲解FastGPT自部署的SSO服务与插件调试配置

## 一句话定义
FastGPT自部署配置包含SSO服务部署与系统插件远程调试套件配置两类内容，用于实现单点登录与插件开发调试。

## 在FastGPT里怎么用
部署SSO服务时，使用docker-compose配置，镜像为registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-sso-service:v4.14.16，容器名称为fastgpt-sso，重启策略为always，加入fastgpt网络，需配置SSO_PROVIDER、AUTH_TOKEN及对应身份提供商的专属环境变量，支持飞书、企业微信（SSO与成员同步）、钉钉、Saml2.0、Oauth2.0（仅SSO）。部署系统插件远程调试套件时，需额外部署Plugin Server、Connection Gateway、Redis、反向代理、TLS和密钥轮换，默认Docker Compose脚本不包含Connection Gateway的公网WebSocket接入配置，该功能仅商业版支持，优先推荐使用FastGPT云服务版本。

## 容易搞错的地方
系统插件远程调试套件仅用于开发、联调和验收场景，不宜作为生产插件运行时使用，不可直接用于生产环境。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/admin/sso)
> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/config/remote-debug-suite)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
