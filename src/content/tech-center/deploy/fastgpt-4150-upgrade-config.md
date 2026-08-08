---
title: FastGPT V4.15.0版本升级与环境变量配置说明
slug: /zh/deploy/fastgpt-4150-upgrade-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41500
source_type: 官方文档
---

# FastGPT V4.15.0版本升级与环境变量配置说明

## 版本升级核心概述
V4.15.0版本引入了更为严格的环境变量检查机制，升级后需针对fastgpt-app、fastgpt-pro、代码沙箱（code-sandbox）以及插件服务（fastgpt-plugin）完成配置调整，本次变更包含必填环境变量新增、现有变量格式调整，以及部分服务的重构改动。

## 必执行配置步骤
1.  针对fastgpt-app与fastgpt-pro，需确保以下必填变量配置正确且保持一致：AES256_SECRET_KEY、FILE_TOKEN_KEY，以及INVOKE_TOKEN_SECRET（长度至少32位）。同时必须新增SSE_MCP_SERVER_PROXY_ENDPOINT变量，无需SSE功能时可省略配置。
2.  开源版需移除原config.json配置文件，改用环境变量替代，需新增CUSTOM_PDF_PARSE_URL、DOC2X_KEY、TEXTIN_APP_ID等相关变量。
3.  调整fastgpt-plugin服务：新增AUTH_TOKEN（长度≥32位）和FASTGPT_BASE_URL变量，修改MONGODB_URI变量；同时将fastgpt和fastgpt-pro的PLUGIN_TOKEN变量设置为与fastgpt-plugin的AUTH_TOKEN一致。
4.  为code-sandbox服务配置新增的安全变量，包括SANDBOX_API_MAX_BODY_MB（默认8MB）、SANDBOX_MAX_OUTPUT_MB（默认10MB）、CHECK_INTERNAL_IP（默认true）等，支持通过queueId对运行接口做分组排队。

## 可选配置与易错提醒
部分环境变量带有默认值，不配置也可正常使用，例如PARSE_FILE_WORKERS默认值为10、SYNC_INDEX需设置为布尔字符串（如"true"而非0或1）。需注意TRUSTED_PROXY_ENABLE默认值为false，仅当设置为true时，TRUSTED_PROXY_IPS配置才会生效。此外工作流相关变量如WORKFLOW_MAX_LOOP_TIMES默认值为100，WORKFLOW_PARALLEL_MAX_CONCURRENCY默认值为10，可根据实际业务需求调整。升级过程中需特别注意：INVOKE_TOKEN_SECRET的长度必须≥32位，且fastgpt-app、fastgpt-pro与fastgpt-plugin的相关密钥需保持一致；开源版不再支持通过volume挂载config.json配置文件。
> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41500
