---
title: 配置飞书单点登录对接FastGPT的详细操作步骤与参数说明
slug: /zh/tutorial/feishu-sso-fastgpt-config
page_type: 教程/部署
source: https://doc.fastgpt.cn/guide/admin/sso
source_type: 官方文档小节
---

# 配置飞书单点登录对接FastGPT的详细操作步骤与参数说明

## 前置准备与参数获取
要完成飞书单点登录接入FastGPT的配置，首先需要获取应用的核心凭证。进入飞书开发者后台，点击企业自建应用，在凭证与基础信息页面即可查看应用的App ID和App Secret，这两个参数将用于后续的配置环节。

## 权限与重定向URL配置
第一步完成权限开通，进入开发者后台的企业自建应用，在开发配置的权限管理页面开通所需权限。可以使用批量导入/导出权限功能，导入指定的权限配置：
```json
{
"scopes" : {
"tenant" : [
"contact:user.phone:readonly" ,
"contact:contact.base:readonly" ,
"contact:department.base:readonly" ,
"contact:department.organize:readonly" ,
"contact:user.base:readonly" ,
"contact:user.department:readonly" ,
"contact:user.email:readonly" ,
"contact:user.employee_id:readonly"
],
"user" : []
}
}
```
配置完成后，需确保可访问的数据范围开启全员可见。接下来设置重定向URL，进入开发者后台的安全设置页面，重定向URL需遵循`https://{你的FastGPT域名}/login/provider`格式，将其中的域名替换为部署后公开可访问的FastGPT域名，确保与后续配置中的重定向地址完全一致。

## Docker Compose部署配置
使用Docker Compose部署飞书SSO服务时，可参考以下配置示例，需将示例中的占位符替换为实际参数：
```yaml
fastgpt-sso :
image : registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-sso-service:v4.14.16
container_name : fastgpt-sso
restart : always
networks :
- fastgpt
environment :
- SSO_PROVIDER=feishu
- AUTH_TOKEN=xxxxx
# oauth 接口（私有化部署的飞书改为私有化的地址, 下同）
- SSO_TARGET_URL=https://accounts.feishu.cn/open-apis/authen/v1/authorize
# 获取token 接口
- FEISHU_TOKEN_URL=https://open.feishu.cn/open-apis/authen/v2/oauth/token
# 获取用户信息接口
- FEISHU_GET_USER_INFO_URL=https://open.feishu.cn/open-apis/authen/v1/user_info
# 重定向地址，设置为上面第三部中一模一样的地址
- FEISHU_REDIRECT_URI=https://fastgpt.cn/login/provider
# 飞书APP的应用ID，一般以cli开头
- FEISHU_APP_ID=xxx
# 飞书APP的应用密钥
- FEISHU_APP_SECRET=xxx
```
其中，`AUTH_TOKEN`需替换为自定义的认证令牌，`FEISHU_APP_ID`和`FEISHU_APP_SECRET`替换为前文获取的应用凭证，若使用私有化部署的飞书，需将相关接口地址替换为私有化部署的对应地址。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/admin/sso)
