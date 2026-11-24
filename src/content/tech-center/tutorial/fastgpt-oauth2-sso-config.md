---
title: 为FastGPT配置标准OAuth2.0单点登录的完整接入参数
slug: /zh/tutorial/fastgpt-oauth2-sso-config
page_type: 教程/部署
source: https://doc.fastgpt.cn/guide/admin/sso
source_type: 官方文档小节
---

# 为FastGPT配置标准OAuth2.0单点登录的完整接入参数

## 接入基础说明
FastGPT支持RFC 6749定义的鉴权码模式OAuth2.0单点登录接入。接入流程分为三个核心步骤，需提前准备三个必填地址：
1. 登陆鉴权地址：用户点击SSO按钮后跳转的地址，需携带`response_type=code`、`client_id`、`state`、`redirect_uri`参数，示例curl请求格式为：
```bash
curl -X GET "http://example.com/oauth/authorize?response_type=code&client_id=s6BhdRkqt3&state=xyz&redirect_uri=https%3A%2F%2Ffastgpt.cn%2Flogin%2Fprovider"
```
用户完成账号密码登录后，会跳转至`redirect_uri`并携带`code`参数，示例回调地址为`https://fastgpt.cn/login/provider?code=4/P7qD2qAz4&state=xyz`。
2. 获取access_token地址：通过服务器POST请求该地址获取令牌，需使用`application/x-www-form-urlencoded`格式，示例curl请求：
```bash
curl -X POST -H "Content-Type: application/x-www-form-urlencoded" "http://example.com/oauth/access_token?grant_type=authorization_code&client_id=s6BhdRkqt3&client_secret=xxx&code=4/P7qD2qAz4&redirect_uri=https%3A%2F%2Ffastgpt.cn%2Flogin%2Fprovider"
```
3. 获取用户信息地址：需在请求头中携带`Authorization: Bearer {access_token}`参数，示例curl请求：
```bash
curl -X GET -H "Authorization: Bearer 4/P7qD2qAz4" "http://example.com/oauth/user_info"
```

## 参数配置说明
OAuth2.0接入的核心参数包括：
- `CLIENT_ID`：必填参数，用于标识FastGPT客户端
- `CLIENT_SECRET`：选填参数，无相关配置时可留空
- `SCOPE`：选填参数，用于指定授权范围
系统会自动补全`redirect_uri`以及`grant_type`、`response_type`等固定参数，无需手动配置。

## Docker部署配置示例
可通过以下docker-compose配置快速部署FastGPT的OAuth2.0单点登录服务，需替换对应必填参数：
```yaml
fastgpt-sso:
  image: registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-sso-service:v4.14.16
  container_name: fastgpt-sso
  restart: always
  networks:
    - fastgpt
  environment:
    - SSO_PROVIDER=oauth2
    - AUTH_TOKEN=xxxxx
    # OAuth2.0 请求地址
    - OAUTH2_AUTHORIZE_URL= # 登陆鉴权地址，必填
    - OAUTH2_TOKEN_URL= # 获取AccessToken地址，必填
    - OAUTH2_USER_INFO_URL= # 获取用户信息地址，必填
    # OAuth2.0 参数
    - OAUTH2_CLIENT_ID= # 客户端ID，必填
    - OAUTH2_CLIENT_SECRET= # 客户端密钥，选填
    - OAUTH2_SCOPE= # 授权范围，选填
    # 字段映射
    - OAUTH2_USERNAME_MAP= # 用户名字段映射，必填
    - OAUTH2_AVATAR_MAP= # 头像字段映射，选填
    - OAUTH2_MEMBER_NAME_MAP= # 成员名字段映射，选填
    - OAUTH2_CONTACT_MAP= # 联系方式字段映射，选填
```
需注意，`OAUTH2_USERNAME_MAP`为必填的字段映射参数，用于将第三方系统的用户名字段映射至FastGPT的用户标识。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/admin/sso)
