---
title: 配置SigNoz为FastGPT实现全面服务监控与运维相关支持
slug: /zh/deploy/fastgpt-signoz-monitoring
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/config/signoz
source_type: 官方文档
---

# 配置SigNoz为FastGPT实现全面服务监控与运维相关支持

## 监控能力概述
SigNoz是开源的应用性能监控（APM）和可观测性平台，为FastGPT提供全面的服务监控能力。它基于OpenTelemetry标准，能够收集、处理和可视化分布式系统的遥测数据，涵盖链路追踪、指标监控和日志分析三大类遥测数据。

## 核心功能说明
该平台可提供五类核心监控服务：
- 链路追踪：跟踪用户请求在FastGPT各个服务间的完整调用链路
- 性能监控：监控API响应时间、吞吐量等关键性能指标
- 错误追踪：自动捕获和记录系统异常，便于问题排查
- 日志聚合：集中收集和管理应用日志，支持结构化查询
- 实时告警：基于指标阈值设置告警规则，及时发现系统异常

## 配置与接入步骤
配置流程需围绕遥测数据的采集与对接完成，具体步骤如下：
1.  启用FastGPT各服务的OpenTelemetry数据采集功能，确保服务的遥测数据可被正常收集
2.  配置SigNoz与FastGPT的服务对接链路，完成链路追踪功能的基础搭建
3.  设置性能监控的采集范围，覆盖API响应时间、吞吐量等关键指标
4.  开启错误捕获与日志聚合功能，实现系统异常的自动记录与应用日志的集中管理
5.  基于指标阈值配置实时告警规则，完成告警策略的设置

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/config/signoz)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
