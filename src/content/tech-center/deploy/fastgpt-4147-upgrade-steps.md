---
title: FastGPT V4.14.7版本升级步骤与配置变更说明
slug: /zh/deploy/fastgpt-4147-upgrade-steps
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4147
source_type: 官方文档
---

# FastGPT V4.14.7版本升级步骤与配置变更说明

## 版本核心变更概述
V4.14.7版本对日志系统进行了全面重构，移除了原有的日志相关环境变量，新增了统一的全局日志配置变量。同时新增了基于上下文工程的Agent测试模式、LLM请求追踪功能，优化了Chat Agent的工具选择与知识库选择交互体验，修复了工作流、工具调用、MCP服务等多个场景的异常问题。

## 升级操作步骤
1.  **更新镜像**：将FastGPT基础镜像tag更新为v4.14.7.2，商业版镜像tag更新为v4.14.7.1，fastgpt-plugin镜像tag更新为v0.5.4，AIProxy镜像tag更新为0.3.15；mongo、sandbox、mcp_server无需更新（mcp_server的4.14.7镜像不可用，可使用旧版本）。
2.  **更新环境变量**：移除`LOG_LEVEL`、`STORE_LOG_LEVEL`、`SIGNOZ_BASE_URL`、`SIGNOZ_SERVICE_NAME`、`SIGNOZ_STORE_LEVEL`变量，新增6个通用日志配置变量（所有服务均适用）：`LOG_ENABLE_CONSOLE=true`（是否开启控制台打印）、`LOG_CONSOLE_LEVEL=debug`（控制台打印最低日志等级）、`LOG_ENABLE_OTEL=false`（是否开启OTEL日志收集）、`LOG_OTEL_LEVEL=info`（OTEL日志收集最低等级）、`LOG_OTEL_SERVICE_NAME=fastgpt-client`（传递给OTLP收集器的服务名称）、`LOG_OTEL_URL=http://localhost:4318/v1/logs`（OTLP收集器地址，需保留`/v1/logs`路径）。
3.  **更新系统插件**：若已从4.14.6版本升级，可跳过此步骤；否则需前往插件市场安装或直接下载zip包安装以下插件：base64Decode、dallle3、docDiff、drawing、gptImage、markdownTransform、mineru、minimax、openrouterMultiModal、stability。
4.  **执行升级脚本**：在终端发起POST请求，将`{{rootkey}}`替换为环境变量中的rootkey，`{{host}}`替换为FastGPT域名，执行命令：
    ```bash
    curl --location --request POST https://{{host}}/api/admin/initv4147 \
    --header rootkey: {{rootkey}} \
    --header Content-Type: application/json
    ```
    该请求会将对话日志中含错误的记录添加到统计表中。
5.  **接口适配调整**：新版本对话记录的`value`字段已移除`type`属性，`/api/core/chat/getPaginationRecords`已做适配，调用该接口时需改为直接判断`text`、`tools`等字段是否存在。

## 关键注意事项
该版本移除了MongoDB的日志存储功能，需使用OTEL收集器进行日志采集。LLM请求追踪默认保留6小时，可通过`LLM_REQUEST_TRACKING_RETENTION_HOURS`变量调整保留时长。工作流场景修复了全局变量默认值类型错误、节点渲染异常等问题，工具调用时会自动补充空的arguments参数，无需手动处理。使用MCP服务时，需注意权限控制已优化，避免越权调用。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4147
