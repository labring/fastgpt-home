---
title: FastGPT App/Admin共享变量与安全配置速查
slug: /zh/reference/fastgpt-app-admin-env-security-config
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/config/env
source_type: 官方文档小节
---

# FastGPT App/Admin共享变量与安全配置速查

## 结论
本页整理FastGPT部署所需的App/Admin共享环境变量与安全配置参数，可直接用于快速配置系统运行规则。所有参数均为官方标准配置项，可根据实际部署场景调整。

## 具体怎么做
整理官方标准参数表如下：
| 变量名 | 默认值 | 说明 |
| --- | --- | --- |
| USE_IP_LIMIT | false | 是否启用部分接口的IP限流 |
| CHECK_INTERNAL_IP | false | 是否启用内网IP检查，降低SSRF风险 |
| AUTH_COOKIE_SECURE | false | 是否为登录Cookie添加Secure属性，仅在全站HTTPS时启用 |
| TRUSTED_PROXY_ENABLE | false | 是否启用可信反向代理客户端IP校验，关闭时兼容旧逻辑 |
| TRUSTED_PROXY_IPS | 空 | 可信反向代理IP/CIDR列表，逗号或空白分隔 |
| PASSWORD_LOGIN_MINUTE_LIMIT_COUNT | 10 | 单账号每分钟允许的密码登录请求次数 |
| MAX_LOGIN_SESSION | 10 | 单账号最大登录客户端数量 |
| ALLOWED_ORIGINS | 空 | 允许跨域来源，多个来源使用英文逗号分隔；为空默认允许所有跨域 |
| MULTIPLE_DATA_TO_BASE64 | false | 是否强制将图片转成base64传递给模型 |
| DISABLE_CACHE | false | 是否关闭系统缓存命中，主要用于调试 |
| HTTP_PROXY | 空 | Node/worker出站HTTP代理 |
| HTTPS_PROXY | 空 | Node/worker出站HTTPS代理 |
| NO_PROXY | 空 | 不走代理的地址列表 |
| ALL_PROXY | 空 | 通用出站代理 |

## 注意事项
1. AUTH_COOKIE_SECURE需在全站HTTPS环境下启用，否则登录Cookie无法正常生效。
2. 启用TRUSTED_PROXY_ENABLE后，需正确配置TRUSTED_PROXY_IPS列表，否则可能导致客户端IP识别错误。
3. ALLOWED_ORIGINS留空时默认允许所有跨域请求，生产环境建议配置具体可信来源。
4. 代理类参数用于配置Node/worker的出站代理规则，无需代理时保持默认空值。
5. DISABLE_CACHE仅用于调试场景，生产环境建议保持默认关闭以提升性能。
6. MULTIPLE_DATA_TO_BASE64开启会增加模型调用的传输数据量，仅在特定场景下使用。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/config/env)
