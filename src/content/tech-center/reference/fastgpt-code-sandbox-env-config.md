---
title: FastGPT Code Sandbox 自建部署环境变量配置速查
slug: /zh/reference/fastgpt-code-sandbox-env-config
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/config/env
source_type: 官方文档小节
---

# FastGPT Code Sandbox 自建部署环境变量配置速查

## 结论
FastGPT Code Sandbox 的环境变量用于配置沙箱服务的运行参数，由 projects/code-sandbox/src/env.ts 加载和校验。App调用沙箱时，CODE_SANDBOX_TOKEN需与这里的SANDBOX_TOKEN保持一致，否则会触发接口认证失败。

## 具体怎么做
可通过配置以下环境变量调整沙箱服务行为，核心配置需与前端调用的CODE_SANDBOX_TOKEN对齐：
| 变量名 | 默认值 | 说明 |
| --- | --- | --- |
| SANDBOX_PORT | 3000 | 服务监听端口 |
| SANDBOX_TOKEN | 空 | /sandbox接口Bearer Token，为空则不启用认证，仅允许ASCII可打印字符且不含空格 |
| SANDBOX_POOL_SIZE | 20 | JS/Python预热worker数量，范围1-100 |
| SANDBOX_QUEUE_ID_CONCURRENCY | 空 | 同一queueId并发请求数，范围1-100，为空则不启用排队 |
| SANDBOX_API_MAX_BODY_MB | 8 | /sandbox API请求体上限，单位MB，范围1-100 |
| SANDBOX_MAX_TIMEOUT | 60000 | 单次代码执行超时时间，单位毫秒，范围1000-600000 |
| SANDBOX_MAX_MEMORY_MB | 256 | 单个沙箱最大内存，单位MB，范围32-4096，运行时额外预留50MB开销 |
| SANDBOX_JS_ALLOWED_MODULES | lodash,dayjs,moment,uuid,crypto-js,qs,url,querystring | JS代码允许导入的模块白名单，英文逗号分隔 |

## 注意事项
1. SANDBOX_TOKEN仅支持ASCII可打印字符且不能包含空格，配置错误会导致认证失败。
2. 所有数值参数需遵循给定范围，超出范围可能引发服务启动或运行异常。
3. 沙箱内存配置会额外预留50MB开销，实际可用内存需扣除该部分。
4. development模式下内网IP检查会放宽，生产环境建议使用非development模式。
5. 单次代码执行的网络请求、输出等均有大小限制，需符合配置要求。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/config/env)
