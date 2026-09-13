---
title: 配置FastGPT Agent Sandbox的资源占用上限与生命周期管理参数
slug: /zh/deploy/fastgpt-sandbox-resource-lifecycle-config
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/config/sandbox/opensandbox
source_type: 官方文档
---

# 配置FastGPT Agent Sandbox的资源占用上限与生命周期管理参数

## Agent Sandbox资源与生命周期配置说明
本页内容聚焦FastGPT Agent Sandbox的资源占用管控与生命周期自动管理配置，用于定义沙盒运行时的CPU、内存、存储等资源上限，以及闲置沙盒的自动暂停、归档规则。通过调整相关参数，可适配不同的部署环境与业务场景，平衡系统资源消耗与沙盒的可用性，确保沙盒运行符合业务需求与服务器资源配额。

## 核心配置参数表
| 变量                                  | 默认值     | 说明                                       |
| ------------------------------------- | ---------- | ------------------------------------------ |
| `AGENT_SANDBOX_CPU_COUNT`             | `1`        | 单个 Agent Sandbox 的 CPU 核数上限。       |
| `AGENT_SANDBOX_MEMORY_MIB`            | `2048`     | 单个 Agent Sandbox 的内存上限，单位 MiB。  |
| `AGENT_SANDBOX_STORAGE_SIZE_GI`       | `1`        | 沙盒存储容量，单位 Gi。                    |
| `AGENT_SANDBOX_WS_MAX_MESSAGE_BYTES`  | `67108864` | IDE Agent WebSocket 单消息大小上限。       |
| `AGENT_SANDBOX_WS_MAX_FRAME_BYTES`    | `16777216` | IDE Agent WebSocket 单帧大小上限。         |
| `AGENT_SANDBOX_SUSPEND_MINUTES`       | `60`       | 运行中的沙盒持续未活跃多少分钟后自动暂停。 |
| `AGENT_SANDBOX_ARCHIVE_INACTIVE_DAYS` | `7`        | 已暂停的沙盒持续未活跃多少天后自动归档。   |

## 配置应用指引
所有配置项均以环境变量形式存在，每个变量对应一项具体的管控规则。例如，调整`AGENT_SANDBOX_CPU_COUNT`的取值可修改单个沙盒的CPU核数上限，调整`AGENT_SANDBOX_SUSPEND_MINUTES`可修改沙盒自动暂停的闲置时长阈值。默认参数配置适配通用业务场景，若部署环境的服务器资源有限，可适当调低资源类参数的取值；若业务对沙盒的持续运行有较高要求，可延长自动暂停或归档的时长阈值，优化沙盒的运行效率与资源利用率。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/config/sandbox/opensandbox)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
