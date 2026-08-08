---
title: FastGPT V4.15.0版本升级及环境变量变更说明
slug: /zh/deploy/fastgpt-4150-upgrade-environment-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41500
source_type: 官方文档
---

# FastGPT V4.15.0版本升级及环境变量变更说明

### 版本核心变更
FastGPT V4.15.0版本引入了更严格的环境变量检查，升级前需确认各服务的变量配置符合要求。本次变更覆盖fastgpt-app、fastgpt-pro、fastgpt-plugin及code-sandbox四类服务，核心调整包括必填加密密钥校验、新增服务变量、插件服务重构适配等内容。

### 可执行配置步骤
1.  校验并配置必填密钥变量：确保fastgpt-app与fastgpt-pro的`AES256_SECRET_KEY`、`FILE_TOKEN_KEY`、`INVOKE_TOKEN_SECRET`（至少32位，两类服务需保持一致）已正确配置。
2.  新增必填变量：按需配置`SSE_MCP_SERVER_PROXY_ENDPOINT`，无需SSE功能可跳过该配置。
3.  调整fastgpt-plugin服务变量：新增`AUTH_TOKEN`（32位以上）与`FASTGPT_BASE_URL`，更新`MONGODB_URI`变量；同时将fastgpt-app、fastgpt-pro的`PLUGIN_TOKEN`设置为与fastgpt-plugin的`AUTH_TOKEN`相同值。
4.  配置code-sandbox安全变量：可直接使用默认值，如需调整可配置`SANDBOX_API_MAX_BODY_MB`、`SANDBOX_MAX_OUTPUT_MB`等参数，支持通过`queueId`配置请求排队规则。

### 可选配置项说明
本次更新提供了多个带默认值的可选环境变量，可根据业务需求调整：包括文件解析并发数`PARSE_FILE_WORKERS`（默认10）、HTML转Markdown并发数`HTML_TO_MARKDOWN_WORKERS`（默认10）、工作流循环节点最大长度`WORKFLOW_MAX_LOOP_TIMES`（默认100）等。开源版用户需注意，原`config.json`配置文件已移除，需改用环境变量替代，可配置自定义PDF解析服务、向量检索参数等相关变量。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41500
