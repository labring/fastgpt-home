---
title: 配置FastGPT的SSO登录与外部成员同步功能
slug: /zh/tutorial/fastgpt-sso-external-member-sync
page_type: 教程/部署
source: https://doc.fastgpt.cn/zh-CN/guide/admin/sso
source_type: 官方文档
---

# 配置FastGPT的SSO登录与外部成员同步功能

FastGPT 提供标准SSO与外部成员同步接口，搭配 fastgpt-sso-service 适配器，可实现外部成员系统的SSO登录、用户自动创建及成员架构同步，适用于需要接入自有成员系统或主流办公IM的用户。

## 系统部署与配置步骤
1.  部署 SSO-service 镜像：使用 docker-compose 部署，基础配置示例如下：
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
    # 需根据实际对接的提供商补充对应专属环境变量
```
2.  配置 fastgpt-pro：
    - 配置环境变量：设置`EXTERNAL_USER_SYSTEM_BASE_URL`为SSO服务的内网地址（如`http://fastgpt-sso:3000`），同时设置`EXTERNAL_USER_SYSTEM_AUTH_TOKEN`与SSO服务的`AUTH_TOKEN`保持一致。
    - 可选开启成员同步：如需同步外部系统成员，需先开启团队模式并配置对应同步规则。
    - 可选自动定时同步：通过设置`SYNC_MEMBER_CRON`环境变量开启，例如`0 0 * * *`表示每日0点（UTC时区）执行同步，若需北京时间12点同步，需配置为`0 4 * * *`。

## 内置提供商配置说明
目前支持飞书、企业微信、钉钉等内置提供商，以飞书为例，需完成权限配置、重定向URL设置等基础操作，重定向URL需替换为部署后公开可访问的FastGPT域名，格式为`https://{your-fastgpt-domain}/login/provider`。对接时需在SSO-service的环境变量中补充对应提供商的专属配置项，如飞书的`FEISHU_APP_ID`、`FEISHU_APP_SECRET`等。

> 来源：https://doc.fastgpt.cn/zh-CN/guide/admin/sso
