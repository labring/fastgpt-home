---
title: FastGPT应用与管理后台日志指标追踪环境变量配置速查
slug: /zh/reference/fastgpt-log-metrics-tracing-config
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/config/env
source_type: 官方文档小节
---

# FastGPT应用与管理后台日志指标追踪环境变量配置速查

## 结论
本页整理了FastGPT日志、指标与追踪相关的所有环境变量配置项。通过修改这些变量可自定义日志输出、OpenTelemetry上报及对话日志推送等功能。

## 具体怎么做
可通过配置以下环境变量调整对应功能，参数详情如下：
| 变量名 | 默认值 | 说明 |
| --- | --- | --- |
| LOG_ENABLE_CONSOLE | true | 是否输出控制台日志 |
| LOG_CONSOLE_LEVEL | debug | 控制台日志等级，可选 trace、debug、info、warning、error、fatal |
| LOG_DEPTH | 3 | 历史模板变量，用于日志对象展开深度；当前新版结构化日志主要使用日志等级配置 |
| LOG_ENABLE_OTEL | false | 是否启用OpenTelemetry日志上报 |
| LOG_OTEL_LEVEL | info | OTEL日志等级 |
| LOG_OTEL_SERVICE_NAME | fastgpt-client | OTEL日志服务名 |
| LOG_OTEL_URL | 空 | OTEL日志上报地址 |
| METRICS_ENABLE_OTEL | false | 是否启用OpenTelemetry指标上报 |
| METRICS_EXPORT_INTERVAL | 30000 | 指标导出间隔，单位毫秒 |
| METRICS_OTEL_SERVICE_NAME | fastgpt-client | OTEL指标服务名 |
| METRICS_OTEL_URL | 空 | OTEL指标上报地址 |
| TRACING_ENABLE_OTEL | false | 是否启用OpenTelemetry链路追踪 |
| TRACING_OTEL_SERVICE_NAME | fastgpt-client | OTEL追踪服务名 |
| TRACING_OTEL_URL | 空 | OTEL追踪上报地址 |
| TRACING_OTEL_SAMPLE_RATIO | 空 | 追踪采样比例，范围0到1 |
| CHAT_LOG_URL | 空 | 对话日志推送服务地址；为空时不推送 |
| CHAT_LOG_INTERVAL | 空 | 对话日志批量推送间隔，单位毫秒 |
| CHAT_LOG_SOURCE_ID_PREFIX | fastgpt- | 对话日志来源ID前缀 |
| TRACK_BATCH_UPDATE_TIME | 10000 | 事件计数批量写入间隔，单位毫秒 |

## 注意事项
1. LOG_DEPTH为历史模板变量，新版结构化日志主要使用日志等级配置。
2. TRACING_OTEL_SAMPLE_RATIO的取值范围为0到1。
3. 当CHAT_LOG_URL为空时，不会推送对话日志。
4. 控制台日志等级仅支持trace、debug、info、warning、error、fatal。
5. OTEL相关上报功能需配置对应上报地址才能生效。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/config/env)
