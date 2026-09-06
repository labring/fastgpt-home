---
title: 配置FastGPT的日志打印与OTEL日志收集相关环境参数
slug: /zh/deploy/fastgpt-log-config-params
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/config/signoz
source_type: 官方文档
---

# 配置FastGPT的日志打印与OTEL日志收集相关环境参数

本节内容提供FastGPT的日志相关配置指引，包含控制台日志输出与OTEL日志收集的环境参数配置，以及配置生效所需的服务重启步骤。通过合理配置这些参数，可灵活调整FastGPT的日志输出策略与日志收集链路，满足不同场景下的日志管理需求。

## 环境参数配置
日志等级的可选枚举值为`trace` | `debug` | `info` | `warning` | `error` | `fatal`，可根据实际需求选择对应的等级。以下是标准的环境变量配置示例：
```dotenv
LOG_ENABLE_CONSOLE=true # 是否开启控制台打印
LOG_CONSOLE_LEVEL=debug # 控制台打印最低日志等级
LOG_ENABLE_OTEL=true # 是否开启 OTEL 日志收集
LOG_OTEL_LEVEL=info # OTEL 日志收集的最低日志等级
LOG_OTEL_SERVICE_NAME=fastgpt-client # 传递给 OTLP 收集器的服务名称
LOG_OTEL_URL=http://localhost:4318/v1/logs # 你的 OTLP 收集器的地址，不要把 /v1/logs 遗漏了
```
各参数的配置规则与含义如下：`LOG_ENABLE_CONSOLE`用于控制是否将日志输出至控制台，取值为布尔值；`LOG_CONSOLE_LEVEL`用于设置控制台日志的最低输出等级，需从指定的日志枚举值中选择；`LOG_ENABLE_OTEL`用于控制是否开启OTEL日志收集功能，取值为布尔值；`LOG_OTEL_LEVEL`用于设置OTEL日志收集的最低等级，同样需从日志枚举值中选择；`LOG_OTEL_SERVICE_NAME`用于指定传递给OTLP收集器的服务名称，默认值为`fastgpt-client`；`LOG_OTEL_URL`用于配置OTLP收集器的访问地址，必须包含路径`/v1/logs`，默认地址为`http://localhost:4318/v1/logs`。

## 生效配置
完成环境变量修改后，需重启FastGPT服务以加载新的配置参数，确保所有设置正常生效。
> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/config/signoz)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
