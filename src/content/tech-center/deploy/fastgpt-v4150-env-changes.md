---
title: FastGPT V4.15.0版本升级的环境变量与配置变更说明
slug: /zh/deploy/fastgpt-v4150-env-changes
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41500
source_type: 官方文档
---

# FastGPT V4.15.0版本升级的环境变量与配置变更说明

FastGPT V4.15.0版本升级包含环境变量变更与配置调整，覆盖fastgpt-app、fastgpt-pro、代码沙箱（code-sandbox）与插件服务（fastgpt-plugin）四大模块，升级前需完成对应变量的检查与配置，避免服务启动异常。

### 配置操作步骤
1.  **fastgpt-app与fastgpt-pro配置**
    需检查并配置三类变量：一是必配且两个服务需保持一致的密钥变量，包括AES256_SECRET_KEY、FILE_TOKEN_KEY、INVOKE_TOKEN_SECRET（INVOKE_TOKEN_SECRET长度至少32位）；二是新增必配变量SSE_MCP_SERVER_PROXY_ENDPOINT，无需SSE功能可忽略；三是可选变量，如PARSE_FILE_WORKERS默认值为10，PARSE_FILE_TIMEOUT_SECONDS默认600秒，SYNC_INDEX需设置为布尔字符串如`true`，TRUSTED_PROXY_ENABLE默认值为`false`。开源版需移除config.json配置文件，改用环境变量，可配置CUSTOM_PDF_PARSE_URL、DOC2X_KEY、TEXTIN_APP_ID等解析相关变量，以及HNSW_EF_SEARCH默认100、DATASET_PARSE_MAX_PROCESS默认10等性能参数。
2.  **code-sandbox配置**
    新增多项安全与性能相关环境变量，默认值分别为：SANDBOX_API_MAX_BODY_MB为8MB、SANDBOX_MAX_OUTPUT_MB为10MB、CHECK_INTERNAL_IP为`true`、SANDBOX_MAX_TIMEOUT为60000毫秒。可通过SANDBOX_QUEUE_ID_CONCURRENCY配置同一queueId的并发执行上限，未配置则不启用排队功能。
3.  **fastgpt-plugin配置**
    需新增AUTH_TOKEN（长度≥32位）与FASTGPT_BASE_URL变量，修改MONGODB_URI变量；同时将fastgpt-app与fastgpt-pro的PLUGIN_TOKEN设置为与fastgpt-plugin的AUTH_TOKEN保持一致。

### 易错点与边界说明
部分密钥类环境变量需在fastgpt-app与fastgpt-pro中保持一致，否则会引发接口签名验证失败。code-sandbox的内网IP检查默认开启，可降低SSRF风险，如需关闭需调整CHECK_INTERNAL_IP变量。fastgpt-plugin的AUTH_TOKEN长度不足32位时，服务无法正常启动。开源版不再支持通过volumn挂载config.json文件，所有配置需通过环境变量完成。部分变量如MAX_FOLDER_DEPTH默认值为4，取值范围为2~20，超出范围可能引发配置异常。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41500)
