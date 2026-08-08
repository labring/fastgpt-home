---
title: 配置FastGPT的SSO外部成员同步与单点登录功能
slug: /zh/tutorial/fastgpt-sso-member-sync-config
page_type: 教程/部署
source: https://doc.fastgpt.cn/zh-CN/guide/admin/sso
source_type: 官方文档
---

# 配置FastGPT的SSO外部成员同步与单点登录功能

## 功能适用范围与原理
本功能适用于需要接入自有成员系统或主流办公IM的用户，若仅使用Github、Google等快速登录则无需参考本章内容。FastGPT-pro内置标准的SSO与成员同步接口，搭配FastGPT-SSO-Service适配器可实现两类核心能力：一是通过外部系统回调后在FastGPT中创建用户并完成SSO登录，二是同步外部成员与组织架构。不同提供商的支持能力存在差异，部分服务仅支持SSO登录，不支持成员同步。

## 部署与配置步骤
1. 部署SSO-service镜像：使用docker-compose部署，基础示例配置如下，需替换`AUTH_TOKEN`为自定义鉴权信息，并根据对接提供商补充对应环境变量：
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
```
2. 配置FastGPT-pro：首先配置环境变量，`EXTERNAL_USER_SYSTEM_BASE_URL`为SSO-service的内网访问地址，例如上述部署的`http://fastgpt-sso:3000`，同时配置`EXTERNAL_USER_SYSTEM_AUTH_TOKEN`与SSO-service的`AUTH_TOKEN`保持一致。其次在商业版后台配置登录按钮的文字、图标等展示内容。
3. 可选开启成员同步：若需要同步外部系统的成员数据，可开启成员同步功能，具体团队模式规则参考对应官方文档。
4. 可选自动定时同步：通过配置`SYNC_MEMBER_CRON`环境变量开启自动同步，例如`0 0 * * *`为每天0点（UTC时区）执行，若需北京时间12点执行则需调整为`0 4 * * *`。

## 配置易错点说明
不同提供商的配置存在专属要求，例如飞书需要在开发者后台配置权限、重定向URL，且需开启全员可见的数据范围；钉钉仅支持SSO登录，不支持成员同步。配置过程中需注意重定向URL需与FastGPT公开访问域名完全匹配，鉴权TOKEN需在SSO-service与FastGPT-pro中保持一致，否则会出现接口调用失败的报错。同时，若使用私有化部署的第三方服务，需替换对应接口地址为私有化地址。

> 来源：https://doc.fastgpt.cn/zh-CN/guide/admin/sso
