---
title: FastGPT 4.14.7版本日志系统环境变量更新指南
slug: /zh/reference/fastgpt-4-14-7-log-env-update
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/4-14/4147
source_type: 官方文档小节
---

# FastGPT 4.14.7版本日志系统环境变量更新指南

## 结论
FastGPT 4.14.7版本更新了日志系统，包含日志打印、采集与分析相关功能。本次更新需移除旧版日志相关环境变量，并配置6个新的日志环境变量，完成配置后即可正常使用新版日志功能。

## 具体怎么做
1. 移除以下旧环境变量：LOG_LEVEL、STORE_LOG_LEVEL、SIGNOZ_BASE_URL、SIGNOZ_SERVICE_NAME、SIGNOZ_STORE_LEVEL。
2. 新增以下6个环境变量，fastgpt、fastgpt-pro、fastgpt-plugin、fastgpt-mcp-server均适用：
   - LOG_ENABLE_CONSOLE = true # 是否开启控制台打印
   - LOG_CONSOLE_LEVEL = debug # 控制台打印最低日志等级
   - LOG_ENABLE_OTEL = false # 是否开启OTEL日志收集
   - LOG_OTEL_LEVEL = info # OTEL日志收集的最低日志等级
   - LOG_OTEL_SERVICE_NAME = fastgpt-client # 传递给OTLP收集器的服务名称
   - LOG_OTEL_URL = http://localhost:4318/v1/logs # OTLP收集器地址，请勿遗漏/v1/logs路径

## 注意事项
1. 本次新增的6个环境变量仅适用于fastgpt、fastgpt-pro、fastgpt-plugin、fastgpt-mcp-server服务。
2. 配置LOG_OTEL_URL时，请勿遗漏末尾的/v1/logs路径。
3. 必须完全移除旧版日志相关环境变量，避免配置冲突。
4. 各环境变量的默认值与配置需严格按照原文设置，如需调整需遵循日志等级相关规则。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-14/4147)
