---
title: FastGPT Agent Sandbox资源与生命周期配置参数说明
slug: /zh/glossary/fastgpt-agent-sandbox-config
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/config/sandbox/opensandbox
source_type: 官方文档
---

# FastGPT Agent Sandbox资源与生命周期配置参数说明

## 一句话定义
Agent Sandbox配置参数是FastGPT中用于管控AI代理隔离运行环境的资源占用与自动生命周期的环境变量集合。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
该类参数以环境变量形式配置，主要用于管控Agent Sandbox的资源与自动管理规则，核心参数及默认值如下：
1.  `AGENT_SANDBOX_CPU_COUNT`：默认值1，单个Agent Sandbox的CPU核数上限。
2.  `AGENT_SANDBOX_MEMORY_MIB`：默认值2048，单位MiB，单个Agent Sandbox的内存上限。
3.  `AGENT_SANDBOX_STORAGE_SIZE_GI`：默认值1，单位Gi，沙盒存储容量。
4.  `AGENT_SANDBOX_WS_MAX_MESSAGE_BYTES`：默认值67108864，IDE Agent WebSocket单消息大小上限。
5.  `AGENT_SANDBOX_WS_MAX_FRAME_BYTES`：默认值16777216，IDE Agent WebSocket单帧大小上限。
6.  `AGENT_SANDBOX_SUSPEND_MINUTES`：默认值60，单位分钟，运行中的沙盒持续未活跃后自动暂停的时长。
7.  `AGENT_SANDBOX_ARCHIVE_INACTIVE_DAYS`：默认值7，单位天，已暂停的沙盒持续未活跃后自动归档的时长。
此外旧版E2B相关变量`AGENT_SANDBOX_DISK_MB`已不再使用，无需配置。部署升级至4.16版本后，需移除旧的`AGENT_SANDBOX_E2B_API_KEY`变量，切换沙盒提供商至`opensandbox`或`sealosdevbox`，且启用Agent Sandbox时必须使用对应版本的配套镜像，不可混合部署新旧版本。

## 容易搞错的地方
1.  混淆参数单位：如`AGENT_SANDBOX_MEMORY_MIB`单位为MiB，`AGENT_SANDBOX_STORAGE_SIZE_GI`单位为Gi，不可混用。
2.  遗漏旧变量清理：升级后未删除`AGENT_SANDBOX_E2B_API_KEY`，或未切换沙盒提供商类型。
3.  忽略镜像版本匹配：启用沙盒时使用非配套镜像，导致通信协议不兼容。
4.  错误关联WS参数：`AGENT_SANDBOX_WS_MAX_MESSAGE_BYTES`与`AGENT_SANDBOX_WS_MAX_FRAME_BYTES`仅针对IDE Agent WebSocket通信，不可用于其他场景。
5.  误配置旧版E2B相关变量：如`AGENT_SANDBOX_DISK_MB`，该变量已不再使用。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/config/sandbox/opensandbox)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
