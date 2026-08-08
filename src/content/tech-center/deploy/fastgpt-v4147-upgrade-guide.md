---
title: FastGPT V4.14.7版本升级操作与环境变量调整指南
slug: /zh/deploy/fastgpt-v4147-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4147
source_type: 官方文档
---

# FastGPT V4.14.7版本升级操作与环境变量调整指南

# 版本核心变更与镜像要求
FastGPT V4.14.7版本对日志系统进行了重构，涵盖日志打印、采集与分析，同时移除了原有日志相关环境变量，并新增标准化日志配置项。该版本部分组件无需更新，包括mcp_server、sandbox与mongo，其中mcp_server的4.14.7镜像不可用，可继续使用旧版本。需更新的镜像版本为：FastGPT官方镜像tag v4.14.7.2，商业版镜像tag v4.14.7.1，fastgpt-plugin镜像tag v0.5.4，AIProxy镜像tag 0.3.15。

# 可直接执行的升级步骤
1.  **调整环境变量**：移除原有LOG_LEVEL、STORE_LOG_LEVEL、SIGNOZ_BASE_URL、SIGNOZ_SERVICE_NAME、SIGNOZ_STORE_LEVEL变量，新增6个通用日志配置项，适用于fastgpt、fastgpt-pro、fastgpt-plugin、fastgpt-mcp-server：
    - LOG_ENABLE_CONSOLE: true（开启控制台打印）
    - LOG_CONSOLE_LEVEL: debug（控制台最低日志等级）
    - LOG_ENABLE_OTEL: false（关闭OTEL日志收集）
    - LOG_OTEL_LEVEL: info（OTEL收集最低日志等级）
    - LOG_OTEL_SERVICE_NAME: fastgpt-client（OTLP服务名称）
    - LOG_OTEL_URL: http://localhost:4318/v1/logs（OTLP收集地址，需保留/v1/logs路径）
2.  **更新系统插件**：前往插件市场安装或更新base64Decode、dallle3、docDiff、drawing、gptImage、markdownTransform、mineru、pdf解析、minimax、openrouterMultiModal、stability等系统工具，若从4.14.6版本升级可跳过此步骤。
3.  **执行升级脚本**：通过终端发起POST请求，替换{{rootkey}}为环境变量中的rootkey，{{host}}为FastGPT域名：
    ```bash
    curl --location --request POST https://{{host}}/api/admin/initv4147 \
    --header rootkey: {{rootkey}} \
    --header Content-Type: application/json
    ```
    该脚本会将对话日志中的错误记录添加到统计表。

# 接口与功能调整说明
该版本对对话记录接口进行了优化，/api/core/chat/getPaginationRecords接口的value字段已移除type属性，调用时需直接判断text、tools等字段是否存在以解析数据。此外新增了基于上下文工程的Agent测试模式、LLM请求追踪功能（默认保留6小时，可通过LLM_REQUEST_TRACKING_RETENTION_HOURS调整）、知识库搜索的collectionIds筛选能力等功能，同时修复了工作流节点渲染、MCP权限控制、工具调用格式等多个问题。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4147
