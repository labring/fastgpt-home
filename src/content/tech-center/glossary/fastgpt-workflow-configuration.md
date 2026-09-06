---
title: FastGPT工作流相关环境变量与功能配置说明
slug: /zh/glossary/fastgpt-workflow-configuration
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41411
source_type: 官方文档
---

# FastGPT工作流相关环境变量与功能配置说明

## 一句话定义
FastGPT工作流配置是用于调整工作流运行参数、流式任务续期规则的环境变量与功能设置集合。

## 在 FastGPT 里怎么用
运行时配置通过修改部署目录下的.env文件实现，支持的环境变量包括：STREAM_RESUME_TTL_SECONDS默认300秒，用于设置Redis流式镜像生成中的续期时长；STREAM_RESUME_POST_COMPLETE_TTL_SECONDS默认30秒，用于流任务结束后缩短续期时长以回收资源；STREAM_RESUME_REDIS_MAXMEMORY_RATIO默认0.5，当Redis已用内存占比达到该阈值时，停止为新请求创建流恢复镜像；STREAM_RESUME_REDIS_MEMORY_CHECK_INTERVAL_MS默认5000毫秒，用于设置Redis内存水位检测的缓存间隔。WORKFLOW_PARALLEL_MAX_CONCURRENCY默认10，为工作流最大并发数上限，需遵循配置规则。功能配置方面，工作流应用的系统配置移至画布左侧工具栏的独立配置面板，新建工作流应用时会自动打开；工作流工具节点支持将指定输入参数交由AI自动生成，同时保留固定值、引用和用户输入等原有配置；ChatAgent选择工具时，支持手动指定是否由AI生成参数；App Workflow在Sandbox Provider或运行时镜像变化时，会自动归档并恢复Workspace。

## 容易搞错的地方
WORKFLOW_PARALLEL_MAX_CONCURRENCY的取值不能超过WORKFLOW_MAX_LOOP_TIMES变量，否则配置无法生效。流式续期相关的Redis内存阈值与检测间隔需结合实际Redis资源配置，避免因内存不足导致服务异常。工作流工具节点的AI生成参数配置需保留原有配置项，不可直接移除固定值、引用等设置。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41411)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
