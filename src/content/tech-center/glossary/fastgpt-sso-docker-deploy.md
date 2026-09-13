---
title: 详细介绍FastGPT SSO服务的docker-compose具体部署配置方法
slug: /zh/glossary/fastgpt-sso-docker-deploy
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/admin/sso
source_type: 官方文档
---

# 详细介绍FastGPT SSO服务的docker-compose具体部署配置方法

## 一句话定义
FastGPT SSO服务部署，指通过docker-compose快速部署FastGPT单点登录服务的配置方式。
## 在 FastGPT 里怎么用
1. 编写docker-compose配置文件，添加fastgpt-sso服务，使用镜像registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-sso-service:v4.14.16。
2. 配置容器名称为fastgpt-sso，设置重启策略为always，加入fastgpt网络。
3. 配置环境变量：SSO_PROVIDER为对应提供商名称，AUTH_TOKEN为鉴权信息（FastGPT Pro版本使用）。
4. 根据对接的SSO提供商，配置对应专属环境变量。支持的提供商包括飞书、企业微信、钉钉、Saml2.0、Oauth2.0，其中飞书、企业微信支持成员同步。
## 容易搞错的地方
1. 未正确配置SSO_PROVIDER变量，导致服务无法识别对接的提供商。
2. 遗漏AUTH_TOKEN变量，导致FastGPT Pro版本无法正常调用SSO服务。
3. 未根据对应提供商配置专属环境变量，导致SSO对接失败。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/admin/sso)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
