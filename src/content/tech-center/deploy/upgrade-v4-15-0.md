---
title: FastGPT V4.15.0版本升级配置与验证说明
slug: /zh/deploy/upgrade-v4-15-0
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41500
source_type: 官方文档
---

# FastGPT V4.15.0版本升级配置与验证说明

## 这个版本改了什么
本版本对环境变量、代码沙箱、插件服务进行了优化调整。fastgpt-app与fastgpt-pro新增AES256_SECRET_KEY、FILE_TOKEN_KEY、INVOKE_TOKEN_SECRET等必填环境变量，需保证两个服务配置一致；新增SSE_MCP_SERVER_PROXY_ENDPOINT等可选变量，部分变量带有默认值，如PARSE_FILE_WORKERS默认值为10。开源版移除config.json配置文件，改用环境变量配置，新增CUSTOM_PDF_PARSE_URL、DOC2X_KEY等文件解析相关变量。code-sandbox新增SANDBOX_API_MAX_BODY_MB、SANDBOX_MAX_OUTPUT_MB等安全相关变量，默认值分别为8MB与10MB，支持通过queueId对运行接口分组排队。fastgpt-plugin完成重构，需新增AUTH_TOKEN、FASTGPT_BASE_URL变量，修改MONGODB_URI的数据库名，且需与fastgpt服务的数据库名不重复。

## 升级前要确认的事
升级前需检查现有环境变量配置，确认已配置AES256_SECRET_KEY、FILE_TOKEN_KEY、INVOKE_TOKEN_SECRET，且fastgpt-app与fastgpt-pro的对应变量值完全一致。开源版需确认未使用config.json配置文件，若使用需替换为对应环境变量。fastgpt-plugin需确认原有MONGODB_URI的数据库名，准备修改为不与fastgpt服务重名的名称。同时需确认INVOKE_TOKEN_SECRET长度至少32位。

## 升级步骤（照做）
1. 配置必填环境变量：为fastgpt-app与fastgpt-pro添加AES256_SECRET_KEY、FILE_TOKEN_KEY、INVOKE_TOKEN_SECRET，保证两个服务的变量值完全一致。2. 按需配置可选环境变量，包括PARSE_FILE_WORKERS、SYNC_INDEX等，其中SYNC_INDEX需配置为boolean字符串值，如true。3. 开源版移除原有volumn挂载与config.json文件，添加CUSTOM_PDF_PARSE_URL、TEXTIN_APP_ID等对应环境变量。4. 为code-sandbox配置SANDBOX_API_MAX_BODY_MB、SANDBOX_MAX_OUTPUT_MB等安全变量，可按需配置queueId分组排队参数。5. 配置fastgpt-plugin：设置AUTH_TOKEN变量，长度需至少32位；修改fastgpt与fastgpt-pro的PLUGIN_TOKEN变量，使其与fastgpt-plugin的AUTH_TOKEN一致；修改fastgpt-plugin的MONGODB_URI，将数据库名改为不与fastgpt服务重名的名称，例如mongodb://[REDACTED_CREDENTIAL]@fastgpt-mongo:27017/fastgpt-plugin?authSource=admin。6. 重启所有FastGPT相关服务。

## 升级后怎么验证
查看服务启动日志，确认无环境变量缺失或格式错误的报错信息。调用插件服务接口，确认返回结果正常。测试文件上传解析、工作流循环与并行节点运行功能，确认可正常执行。若配置SYNC_INDEX=true，可检查数据库索引是否自动完成同步。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41500)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
