---
title: FastGPT接入Signoz监控服务的配置步骤
slug: /zh/deploy/fastgpt-signoz-monitor-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/config/signoz
source_type: 官方文档
---

# FastGPT接入Signoz监控服务的配置步骤

## 功能介绍
SigNoz是一款开源的应用性能监控（APM）和可观测性平台，为FastGPT提供全面的服务监控能力。它基于OpenTelemetry标准，能够收集、处理和可视化分布式系统的遥测数据，包括链路追踪（Tracing）、指标监控（Metrics）和日志分析（Logging）。主要功能包括：链路追踪，跟踪用户请求在FastGPT各个服务间的完整调用链路；性能监控，监控API响应时间、吞吐量等关键性能指标；错误追踪，自动捕获和记录系统异常，便于问题排查；日志聚合，集中收集和管理应用日志，支持结构化查询；实时告警，基于指标阈值设置告警规则，及时发现系统异常。

## 部署与获取访问地址
可选择SigNoz官方云服务或私有部署，本文以Sealos部署为例：点击一键部署卡片完成部署后，进入应用详情页，点击右上角的变更选项，开启4318端口的外网访问（若使用内网服务可跳过此步骤）。等待公网地址就绪后复制该地址，若使用内网服务则直接复制4318端口的内网地址。

## FastGPT配置与验证
修改FastGPT的环境变量，具体配置如下：
- `LOG_ENABLE_CONSOLE = true`：开启控制台打印
- `LOG_CONSOLE_LEVEL = debug`：控制台打印的最低日志等级，可选值为`trace | debug | info | warning | error | fatal`
- `LOG_ENABLE_OTEL = true`：开启OTEL日志收集
- `LOG_OTEL_LEVEL = info`：OTEL日志收集的最低日志等级，可选值同上
- `LOG_OTEL_SERVICE_NAME = fastgpt-client`：传递给OTLP收集器的服务名称
- `LOG_OTEL_URL = http://localhost:4318/v1/logs`：OTLP收集器的地址，请勿遗漏路径`/v1/logs`
完成环境变量修改后重启FastGPT。随后返回Sealos应用管理列表，进入Signoz前端项目并访问其公网地址，首次登录需注册账号（数据存储于本地数据库），登录后若右侧COMPLETED步骤条中的logs和traces均亮起，则说明配置成功。

## 注意事项
SigNoz监控服务会占用较多磁盘空间，请勿将FastGPT的debug日志纳入收集范围，建议将日志存储时长调整为7天。若出现Signoz数据不再增加且内存持续占用的情况，通常是磁盘已满，需及时扩大存储容量。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/config/signoz
