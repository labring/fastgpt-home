---
title: FastGPT 钉钉内置通用SSO协议的配置步骤速查
slug: /zh/reference/fastgpt-dingtalk-sso-quick-ref
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/admin/sso
source_type: 官方文档小节
---

# FastGPT 钉钉内置通用SSO协议的配置步骤速查

## 结论
完成FastGPT与钉钉的SSO集成，需依次完成钉钉应用参数获取、权限配置、重定向URL设置，再通过指定docker-compose yml配置部署SSO服务即可完成对接。

## 具体怎么做
1. 参数获取：进入钉钉开放平台，点击应用开发进入目标应用，在凭证与基础信息页面记录Client ID与Client secret。
2. 权限配置：进入钉钉开放平台目标应用的开发配置-权限管理页面，开通以下权限：个人手机号信息、通讯录个人信息读权限、获取钉钉开放接口用户访问凭证的基础权限。
3. 重定向URL设置：进入钉钉开放平台目标应用的开发配置-安全设置页面，填写服务器出口IP与重定向URL（回调域名）。
4. docker-compose配置：使用以下配置部署SSO服务，替换占位符xxx与xxxxx为实际值：
```yaml
fastgpt-sso:
  image: registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-sso-service:v4.14.16
  container_name: fastgpt-sso
  restart: always
  networks:
    - fastgpt
  environment:
    - SSO_PROVIDER=dingtalk
    - AUTH_TOKEN=xxxxx
    # oauth接口
    - SSO_TARGET_URL=https://login.dingtalk.com/oauth2/auth
    # 获取token接口
    - DINGTALK_TOKEN_URL=https://api.dingtalk.com/v1.0/oauth2/userAccessToken
    # 获取用户信息接口
    - DINGTALK_GET_USER_INFO_URL=https://oapi.dingtalk.com/v1.0/contact/users/me
    # 钉钉APP的应用ID
    - DINGTALK_CLIENT_ID=xxx
    # 钉钉APP的应用密钥
    - DINGTALK_CLIENT_SECRET=xxx
```

## 注意事项
1. 需确保开通的三个权限全部开启，否则无法正常获取用户信息。
2. 服务器出口IP需填写实际调用钉钉服务端API的服务器IP列表，重定向URL需与FastGPT部署的回调域名一致。
3. 配置项中的AUTH_TOKEN、DINGTALK_CLIENT_ID、DINGTALK_CLIENT_SECRET需替换为真实值，不可使用占位符。
4. 镜像版本需与FastGPT版本匹配，当前示例版本为v4.14.16。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/admin/sso)
