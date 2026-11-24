---
title: FastGPT 自托管部署的App额外环境变量配置速查
slug: /zh/reference/fastgpt-self-hosted-app-env-vars
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/config/env
source_type: 官方文档小节
---

# FastGPT 自托管部署的App额外环境变量配置速查

## 结论
这些环境变量主要由FastGPT的App层读取，部分变量会在`packages/service/env.ts`中做统一校验。配置这些变量可修改系统基础信息、密码规则、API密钥限制等核心部署配置。

## 具体怎么做
在FastGPT自托管部署时，可通过配置以下环境变量修改对应功能，各参数详情如下：

| 变量名 | 默认值 | 说明 |
| --- | --- | --- |
| DEFAULT_ROOT_PSW | 123456 | 初始化root用户默认密码。 |
| SYSTEM_NAME | AI | 页面标题默认系统名。 |
| SYSTEM_DESCRIPTION | 空 | 页面Meta描述，不配置时使用默认国际化文案。 |
| SYSTEM_FAVICON | 空 | 页面favicon地址，不配置时使用系统配置中的favicon。 |
| CHINESE_IP_REDIRECT_URL | 空 | 前端配置中的中国IP跳转地址。 |
| PAY_FORM_URL | 空 | 前端配置中的付费表单地址。 |
| SHOW_COUPON | false | 是否展示兑换码功能。 |
| SHOW_DISCOUNT_COUPON | false | 是否展示优惠券功能。 |
| HIDE_CHAT_COPYRIGHT_SETTING | false | 是否隐藏版权信息配置项。 |
| WECOM_LOGIN_AUTO_REDIRECT | false | 是否允许企微终端自动跳转登录。 |
| APP_REGISTRATION_URL | 空 | 应用备案申请地址；当前主要作为兼容配置保留。 |
| PASSWORD_EXPIRED_MONTH | 空 | 密码过期月份数；为空表示不过期。 |
| OPENAPI_KEY_MAX_COUNT | 100 | 单个团队成员最多可创建的系统API Key数量，最小值为1。 |
| SSE_MCP_SERVER_PROXY_ENDPOINT | 空 | MCP SSE Server代理地址，末尾不要带/。发布SSE MCP应用时需要配置。 |

## 注意事项
1. 部分变量的校验逻辑位于`packages/service/env.ts`，但实际功能消费点在App层。
2. `OPENAPI_KEY_MAX_COUNT`的最小值为1，配置时不得低于该值。
3. `SSE_MCP_SERVER_PROXY_ENDPOINT`配置时，末尾不能添加`/`。
4. `PASSWORD_EXPIRED_MONTH`留空时，表示用户密码不会过期。
5. `APP_REGISTRATION_URL`当前仅作为兼容配置保留，暂无实际生效逻辑。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/config/env)
