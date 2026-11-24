---
title: FastGPT 自托管场景Admin额外环境变量配置参考
slug: /zh/reference/fastgpt-admin-extra-env-vars
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/config/env
source_type: 官方文档小节
---

# FastGPT 自托管场景Admin额外环境变量配置参考

## 结论
这些环境变量主要供FastGPT的pro/admin模块读取使用，同时会复用App/Admin共享变量。正确配置这些变量可实现自定义评估任务、爬虫规则、工单系统等功能的适配。

## 具体怎么做
以下为官方指定的Admin额外环境变量配置参数表：
| 变量名 | 默认值 | 说明 |
| --- | --- | --- |
| PRO_TOKEN | 无，必填 | FastGPT app服务端调用pro/admin内部接口的服务间凭证，至少32位，需与App一致 |
| EVAL_LINE_LIMIT | 1000 | 单次创建评估任务允许的最大数据行数，也会下发给前端配置 |
| BATCH_UPDATE_TIME | 3000 | 钱包余额批量更新间隔，单位毫秒 |
| INVOICE_FEISHU_WEBHOOK_URL | 空 | 发票申请通知飞书Webhook地址 |
| INVOICE_FEISHU_WEBHOOK_CALLBACK_URL | 空 | 发票通知中按钮回调地址 |
| SMS_PROXY | 空 | 短信发送代理服务地址 |
| MAX_CRAWL_PAGE | 2000 | 网站同步最大抓取页面数 |
| CRAWL_MAX_HTML_SIZE | 10 | 静态网页爬虫单页HTML估算大小上限，单位MB |
| CRAWL_EXCLUDE_LIST | 空 | 爬虫排除域名或路径规则，多个值使用英文逗号分隔 |
| SHOW_GIT | false | 是否在后台展示Git信息 |
| CLEAR_FREE_ACCOUNT | false | 是否启用免费账号资源清理任务 |
| SYNC_MEMBER_CRON | 空 | 成员自动同步Cron表达式；为空则不启动同步任务 |
| WORKORDER_BASE_URL | 空 | 工单系统地址；配置后前端展示工单入口 |
| WORKORDER_JWT_SECRET | 空 | 创建工单时签发JWT使用的密钥 |
| EXTERNAL_USER_SYSTEM_BASE_URL | 空 | 外部用户系统地址 |
| EXTERNAL_USER_SYSTEM_AUTH_TOKEN | 空 | 外部用户系统认证Token |
| BAIDU_CONVERSION_TOKEN | 空 | 百度转化跟踪Token |
| BAIDU_CONVERSION_BASE_URL | 空 | 百度转化跟踪接口地址 |
| BING_ADS_DEVELOPER_TOKEN | 空 | Bing Ads Developer Token |
| BING_ADS_CUSTOMER_ID | 空 | Bing Ads Customer ID |
| BING_ADS_CUSTOMER_ACCOUNT_ID | 空 | Bing Ads Customer Account ID |
| BING_ADS_CONVERSION_NAME | fastgptcn | Bing Ads 转化目标名称 |
| BING_OAUTH_CLIENT_ID | 空 | Bing OAuth Client ID |
| BING_OAUTH_CLIENT_SECRET | 空 | Bing OAuth Client Secret |
| BING_OAUTH_REFRESH_TOKEN | 空 | Bing OAuth Refresh Token |
| SHOW_WECOM_CONFIG | false | 是否展示企业微信相关配置 |
| WECOM_DEV | false | 企业微信支付相关开发模式开关 |

## 注意事项
1. PRO_TOKEN为必填项，长度至少32位，且需与App端的PRO_TOKEN保持一致，否则无法正常调用内部接口。
2. SYNC_MEMBER_CRON为空时，不会启动成员自动同步任务。
3. 配置WORKORDER_BASE_URL后，前端才会展示工单入口，此时需同步配置WORKORDER_JWT_SECRET以保证工单签发的安全性。
4. CRAWL_EXCLUDE_LIST的多个规则需使用英文逗号分隔，请勿使用中文逗号或其他分隔符。
5. 部分变量需配套配置才能实现完整功能，例如发票飞书通知需同时配置INVOICE_FEISHU_WEBHOOK_URL和INVOICE_FEISHU_WEBHOOK_CALLBACK_URL。
6. 所有变量未配置时将使用官方给定的默认值，请勿随意修改默认值除非有明确的业务需求。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/config/env)
