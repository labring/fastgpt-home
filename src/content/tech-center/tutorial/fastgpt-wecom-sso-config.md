---
title: 配置FastGPT企业微信SSO单点登录的具体操作步骤
slug: /zh/tutorial/fastgpt-wecom-sso-config
page_type: 教程/部署
source: https://doc.fastgpt.cn/guide/admin/sso
source_type: 官方文档小节
---

# 配置FastGPT企业微信SSO单点登录的具体操作步骤

### 前置参数准备
需要先完成以下参数与环境的准备工作。首先使用管理员账号登录企业微信管理后台https://work.weixin.qq.com/wework_admin/loginpage_wx，进入【我的企业】页面获取企业的CorpID。创建供FastGPT使用的内部应用，获取应用的AgentID和Secret，确保该应用的可见范围设置为全部根部门。准备一个公网可访问的域名，需将其解析到对应服务器，可在该域名根目录挂载静态文件完成域名归属认证，完成认证后可删除该静态文件。同时需要配置网页授权、JS-SDK以及企业微信授权登录，可在【企业微信授权登录】页面下方设置“在工作台隐藏应用”。此外需获取“通讯录同步助手”的Secret，路径为【安全与管理】--【管理工具】--【通讯录同步】，开启接口同步后获取Secret，并配置企业可信IP。

### 部署配置示例
可通过以下docker-compose配置完成FastGPT企业微信SSO服务的部署，需将对应参数替换为实际获取的值：
```yaml
fastgpt-sso:
image: registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-sso-service:v4.14.16
container_name: fastgpt-sso
restart: always
networks:
- fastgpt
environment:
- AUTH_TOKEN=xxxxx
- SSO_PROVIDER=wecom
# oauth 接口，在企微终端使用
- WECOM_TARGET_URL_OAUTH=https://open.weixin.qq.com/connect/oauth2/authorize
# sso 接口，扫码
- WECOM_TARGET_URL_SSO=https://login.work.weixin.qq.com/wwlogin/sso/login
# 获取用户id（只能拿id)
- WECOM_GET_USER_ID_URL=https://qyapi.weixin.qq.com/cgi-bin/auth/getuserinfo
# 获取用户详细信息（除了名字都有）
- WECOM_GET_USER_INFO_URL=https://qyapi.weixin.qq.com/cgi-bin/auth/getuserdetail
# 获取用户信息（有名字，没其他信息）
- WECOM_GET_USER_NAME_URL=https://qyapi.weixin.qq.com/cgi-bin/user/get
# 获取组织 id 列表
- WECOM_GET_DEPARTMENT_LIST_URL=https://qyapi.weixin.qq.com/cgi-bin/department/list
# 获取用户 id 列表
- WECOM_GET_USER_LIST_URL=https://qyapi.weixin.qq.com/cgi-bin/user/list_id
# 企微 CorpId
- WECOM_CORPID=
# 企微 App 的 AgentId 一般是 1000xxx
- WECOM_AGENTID=
# 企微 App 的 Secret
- WECOM_APP_SECRET=
# 通讯录同步助手的 Secret
- WECOM_SYNC_SECRET=
```

### 配置注意事项
在配置过程中，需确保应用的可见范围为全部根部门，否则无法同步完整的组织与成员信息。挂载静态文件完成域名归属认证后，可及时删除该文件以避免安全风险。所有预设的接口URL均为企业微信官方固定地址，请勿随意修改，否则将无法正常调用接口获取用户与组织信息。AUTH_TOKEN需设置为自定义的认证令牌，用于保障SSO服务的访问安全。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/admin/sso)
