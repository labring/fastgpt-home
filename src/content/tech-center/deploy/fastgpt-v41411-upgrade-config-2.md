---
title: FastGPT V4.14.11版本升级与配置调整说明
slug: /zh/deploy/fastgpt-v41411-upgrade-config-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41411
source_type: 官方文档
---

# FastGPT V4.14.11版本升级与配置调整说明

FastGPT V4.14.11对版本命名规则进行了调整，将区分稳定版与快速迭代版：稳定版无后缀，如4.14.11、4.14.12，官方仅发布补丁版本修复问题且不引入新功能；快速迭代版带beta后缀，如4.16.0-beta.1，用于快速迭代新功能。稳定版每约2个月更新一次，官方会提供聚合升级脚本，用户可一次性完成多版本升级。该版本及后续4.14.x系列版本均可直接升级，不会引入数据变动或新功能风险。

### 升级操作步骤
1. 更新镜像标签：需更新以下服务的镜像tag：fastgpt-app（主服务）、fastpgt-pro（商业版）、code-sandbox，均设置为v4.14.11；同时更新fastgpt-plugin镜像tag为v0.6.0，Aiproxy镜像tag为v0.5.3。
2. 更新环境变量：以下环境变量均带有默认值，可按需调整或保留默认配置：
`STREAM_RESUME_TTL_SECONDS = 300` # Redis 流式镜像续期：生成中（秒）
`STREAM_RESUME_POST_COMPLETE_TTL_SECONDS = 30` # 流结束后缩短 TTL，便于回收（秒）
`STREAM_RESUME_REDIS_MAXMEMORY_RATIO = 0.5` # 当 Redis 已用内存 / maxmemory 达到该阈值时，停止为新请求创建流恢复镜像
`STREAM_RESUME_REDIS_MEMORY_CHECK_INTERVAL_MS = 5000` # Redis 内存水位检测缓存时长（毫秒），避免每个流请求都调用 INFO MEMORY
`WORKFLOW_PARALLEL_MAX_CONCURRENCY = 10` # 最大并发数的上限值，不能超过 WORKFLOW_MAX_LOOP_TIMES 变量

### 功能变更与注意事项
本次更新新增多项实用功能：对话流响应恢复功能可中断后恢复对话流，并行执行节点支持工作流多节点同时运行，变量更新节点交互得到优化并新增数字与数组操作，S3文件上传支持通过FastGPT代理访问以减少预签名配置问题，同时支持部分沙盒文件类型直接预览并优化大文件下载。优化内容包括新增大量zod参数校验以降低攻击与错误参数风险，优化模型渠道管理代码，以及在知识库创建接口中增加默认VLM模型配置。修复内容涵盖对话Agent模式模型刷新后重置、部分接口权限校验缺失、API推送知识库数据计费异常、Markdown上传因前部英文误判为ASCII导致中文乱码、Python代码执行入参为空被忽略等多个问题。需注意，WORKFLOW_PARALLEL_MAX_CONCURRENCY的取值不可超过WORKFLOW_MAX_LOOP_TIMES，否则会导致工作流并发配置异常；S3代理上传功能适合需要统一文件上传管理的场景，可简化预签名配置流程。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41411)
