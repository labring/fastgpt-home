---
title: FastGPT 4.15版本沙箱环境变量变更配置速查
slug: /zh/reference/fastgpt-415-sandbox-env-vars
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/4-15/41503
source_type: 官方文档小节
---

# FastGPT 4.15版本沙箱环境变量变更配置速查

## 结论
FastGPT 4.15版本升级后，沙箱环境新增多项安全相关环境变量，同时支持按queueId分组排队。本文整理了所有新增变量的默认值与配置说明，帮助用户快速完成沙箱环境适配。

## 具体怎么做
以下是所有新增沙箱环境变量的默认值与说明：
| 环境变量名 | 默认值 | 说明 |
| --- | --- | --- |
| SANDBOX_API_MAX_BODY_MB | 8 | /sandbox API JSON请求体总大小上限，包含variables，单位MB |
| SANDBOX_MAX_OUTPUT_MB | 10 | 单次代码执行输出JSON大小上限，包含返回值和日志，单位MB |
| CHECK_INTERNAL_IP | true | 沙箱网络请求默认开启内网IP检查，降低SSRF风险 |
| SANDBOX_MAX_TIMEOUT | 60000 | 单次代码执行超时时间，单位毫秒 |
| SANDBOX_MAX_MEMORY_MB | 256 | 单个沙箱内存上限，单位MB；运行时会额外预留50MB开销 |
| SANDBOX_POOL_SIZE | 20 | JS/Python预热worker数量 |
| SANDBOX_REQUEST_MAX_COUNT | 30 | 单次代码执行允许发起的最大网络请求数 |
| SANDBOX_REQUEST_TIMEOUT | 60000 | 沙箱内单次网络请求超时时间，单位毫秒 |
| SANDBOX_REQUEST_MAX_RESPONSE_MB | 10 | 沙箱内单次网络响应体最大大小，单位MB |
| SANDBOX_REQUEST_MAX_BODY_MB | 5 | 沙箱内单次网络请求体最大大小，单位MB |
| SANDBOX_QUEUE_ID_CONCURRENCY | 空 | 同一个queueId同时可进入执行流程的请求数；为空时不启用排队 |

## 注意事项
1. 部分环境变量的单位需注意，如超时时间为毫秒，内存与请求体大小为MB。
2. SANDBOX_MAX_MEMORY_MB配置的内存上限包含运行时额外预留的50MB开销，需预留足够系统资源。
3. SANDBOX_QUEUE_ID_CONCURRENCY为空时，不会启用queueId分组排队功能。
4. 开启CHECK_INTERNAL_IP可降低SSRF攻击风险，请勿随意关闭该配置。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-15/41503)
