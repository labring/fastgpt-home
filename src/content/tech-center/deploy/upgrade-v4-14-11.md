---
title: FastGPT 4.14.11版本升级内容与操作指南
slug: /zh/deploy/upgrade-v4-14-11
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41411
source_type: 官方文档
---

# FastGPT 4.14.11版本升级内容与操作指南

## 这个版本改了什么
从4.14.11开始调整版本命名规则，将维护两个稳定版本，稳定版本命名无后缀，快速迭代版本带beta后缀，每2个月发布一次稳定版并提供聚合升级脚本，用户可直接升级无beta后缀的稳定版本。本次版本新增对话流响应恢复功能、并行执行节点、变量更新节点交互优化与数字数组操作、S3文件上传代理支持、沙盒文件预览与大文件下载优化。同时对大量接口增加zod参数校验以减少攻击和错误参数类型风险，优化模型渠道管理代码，为知识库创建接口增加默认vlm模型。修复了对话Agent模式模型刷新重置、部分接口未正确权限校验、API推送知识库数据接口计费异常、Markdown文档上传中文乱码等11项问题。

## 升级前要确认的事
当前使用版本需为4.14.11以后的版本，本次升级不会引入新功能或数据变动。新增的环境变量均设置了默认值，可无需修改现有配置。若需调整流式处理或工作流并发相关参数，可按需配置对应环境变量。

## 升级步骤（照做）
1. 更新镜像tag：更新fastgpt-app镜像tag为v4.14.11，更新fastpgt-pro商业版镜像tag为v4.14.11，更新code-sandbox镜像tag为v4.14.11，更新fastgpt-plugin镜像tag为v0.6.0，更新Aiproxy镜像tag为v0.5.3。
2. 更新环境变量，可选配置以下参数：
```dotenv
STREAM_RESUME_TTL_SECONDS=300 # Redis 流式镜像续期：生成中（秒）
STREAM_RESUME_POST_COMPLETE_TTL_SECONDS=30 # 流结束后缩短 TTL，便于回收（秒）
STREAM_RESUME_REDIS_MAXMEMORY_RATIO=0.5 # 当 Redis 已用内存 / maxmemory 达到该阈值时，停止为新请求创建流恢复镜像
STREAM_RESUME_REDIS_MEMORY_CHECK_INTERVAL_MS=5000 # Redis 内存水位检测缓存时长（毫秒），避免每个流请求都调用 INFO MEMORY
WORKFLOW_PARALLEL_MAX_CONCURRENCY=10 # 最大并发数的上限值，不能超过 WORKFLOW_MAX_LOOP_TIMES 变量
```

## 升级后怎么验证
检查各服务镜像版本是否更新为指定tag。测试对话流功能，确认响应恢复正常。测试工作流并行节点、变量更新节点功能，确认配置与运行正常。测试知识库上传、S3文件上传功能，确认流程无误。检查接口权限校验、计费功能是否符合预期，确认工作流相关节点配置显示正常。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41411)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
