---
title: FastGPT 4.15.0版本各服务环境变量变更配置说明
slug: /zh/deploy/fastgpt-4-15-env-vars-changes
page_type: 部署场景
source: https://doc.fastgpt.cn/self-host/upgrading/4-15/41500
source_type: 官方文档小节
---

# FastGPT 4.15.0版本各服务环境变量变更配置说明

## 通用服务环境变量变更
FastGPT 4.15.0版本对fastgpt-app和fastgpt-pro服务增加了严格的环境变量检查，升级后需确保必填变量配置正确。必填变量包括AES256_SECRET_KEY、FILE_TOKEN_KEY、INVOKE_TOKEN_SECRET，且两个服务需保持一致。新增必填变量SSE_MCP_SERVER_PROXY_ENDPOINT，无需SSE功能时可跳过配置。同时新增多个可选变量，包括PARSE_FILE_WORKERS（默认10）、PARSE_FILE_TIMEOUT_SECONDS（默认600秒）、SYNC_INDEX（默认true）等，部分变量有明确取值范围，如SYSTEM_MAX_STRING_LENGTH_M范围1~100M，MAX_FOLDER_DEPTH范围2~20。开源版移除了config.json配置文件，改为通过环境变量配置，新增CUSTOM_PDF_PARSE_URL、DOC2X_KEY、TEXTIN_APP_ID等变量替代原配置项。

## Code Sandbox 环境变量新增
Code Sandbox服务新增了多个安全相关环境变量，默认配置如下：SANDBOX_API_MAX_BODY_MB默认8MB，用于限制/sandbox API JSON请求体总大小；SANDBOX_MAX_OUTPUT_MB默认10MB，限制单次代码执行输出JSON大小；CHECK_INTERNAL_IP默认true，开启内网IP检查降低SSRF风险。此外还支持通过queueId对运行接口做分组排队，可配置SANDBOX_QUEUE_ID_CONCURRENCY设置同一queueId的并发请求数，未配置时不启用排队。其他可选变量包括SANDBOX_MAX_TIMEOUT（默认60000毫秒）、SANDBOX_POOL_SIZE（默认20）、SANDBOX_REQUEST_MAX_COUNT（默认30）等，分别用于配置超时时间、预热worker数量及网络请求限制。

## 插件服务环境变量配置步骤
fastgpt-plugin服务进行了重构，需按以下步骤配置环境变量：1. 必须新增AUTH_TOKEN（长度至少32位）和FASTGPT_BASE_URL变量；2. 修改MONGODB_URI变量，数据库名需与fastgpt服务的Mongo数据库名不重名，例如mongodb://myusername:mypassword@fastgpt-mongo:27017/fastgpt-plugin?authSource=admin；3. 修改fastgpt和fastgpt-pro服务的PLUGIN_TOKEN变量，值需与fastgpt-plugin的AUTH_TOKEN保持一致。此外可按需配置MAX_API_SIZE、POOL相关参数、对象存储及日志相关变量。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-15/41500)
