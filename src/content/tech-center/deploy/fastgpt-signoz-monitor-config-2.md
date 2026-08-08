---
title: FastGPT接入Signoz监控服务的详细配置方法与注意事项
slug: /zh/deploy/fastgpt-signoz-monitor-config-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/config/signoz
source_type: 官方文档
---

# FastGPT接入Signoz监控服务的详细配置方法与注意事项

## 功能介绍
SigNoz是开源的应用性能监控（APM）和可观测性平台，基于OpenTelemetry标准为FastGPT提供全面的服务监控能力。其核心功能包括：链路追踪，跟踪用户请求在FastGPT各服务间的完整调用链路；性能监控，监控API响应时间、吞吐量等关键指标；错误追踪，自动捕获并记录系统异常；日志聚合，集中收集管理应用日志并支持结构化查询；实时告警，基于指标阈值设置告警规则及时发现异常。

## 配置步骤
1. 部署Signoz：可选择官方云服务或私有部署，此处以Sealos一键部署为例。点击官方部署卡片完成部署后，若需外网访问，进入应用详情页点击右上角「变更」，开启4318端口的外网地址；内网部署可忽略该步骤。等待公网地址就绪后，复制4318端口的访问地址。
2. 配置FastGPT环境变量：修改FastGPT的以下环境变量，务必保留`/v1/logs`路径，否则无法正常连接监控服务：
```env
LOG_ENABLE_CONSOLE = true # 是否开启控制台打印
LOG_CONSOLE_LEVEL = debug # 控制台打印最低日志等级
LOG_ENABLE_OTEL = true # 是否开启OTEL日志收集
LOG_OTEL_LEVEL = info # OTEL日志收集的最低日志等级
LOG_OTEL_SERVICE_NAME = fastgpt-client # 传递给OTLP收集器的服务名称
LOG_OTEL_URL = http://localhost:4318/v1/logs # OTLP收集器地址
```
完成配置后重启FastGPT生效。

## 验证与注意事项
重启FastGPT后，进入Signoz管理台，首次注册账号（数据存储于本地数据库，可随意填写信息），若右侧COMPLETED的步骤条中logs和traces均亮起，则说明配置成功。
Signoz监控服务占用磁盘资源较多，请勿将FastGPT的debug日志存入监控系统，建议将日志存储时长调整为7天。若出现Signoz数据不再更新且内存持续增长的情况，说明磁盘已满，需扩大存储容量。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/config/signoz
