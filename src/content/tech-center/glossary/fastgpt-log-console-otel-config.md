---
title: FastGPT日志控制台与OTEL日志收集配置参数说明
slug: /zh/glossary/fastgpt-log-console-otel-config
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/config/signoz
source_type: 官方文档
---

# FastGPT日志控制台与OTEL日志收集配置参数说明

## 一句话定义
该配置项指FastGPT中用于控制控制台日志打印与OTEL日志收集的环境参数集合。

## 在 FastGPT 里怎么用
需通过修改FastGPT环境变量完成配置，具体支持参数如下：
1.  `LOG_ENABLE_CONSOLE`：布尔值，控制是否开启控制台打印
2.  `LOG_CONSOLE_LEVEL`：日志等级枚举值，可选`trace` | `debug` | `info` | `warning` | `error` | `fatal`，设置控制台打印的最低日志等级
3.  `LOG_ENABLE_OTEL`：布尔值，控制是否开启OTEL日志收集
4.  `LOG_OTEL_LEVEL`：日志等级枚举值，设置OTEL日志收集的最低日志等级
5.  `LOG_OTEL_SERVICE_NAME`：字符串，传递给OTLP收集器的服务名称
6.  `LOG_OTEL_URL`：字符串，OTLP收集器的地址，需完整包含`/v1/logs`路径
完成环境变量修改后，需重启FastGPT使配置生效。

## 容易搞错的地方
配置`LOG_OTEL_URL`时，容易遗漏末尾的`/v1/logs`路径，导致日志收集失败。日志等级需使用指定的枚举值，不可使用自定义等级。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/config/signoz)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
