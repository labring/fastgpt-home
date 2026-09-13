---
title: 解决FastGPT pnpm dev启动时Mongo副本集事务相关报错
slug: /zh/troubleshoot/fastgpt-mongo-replica-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4252
source_type: GitHub issue
---

# 解决FastGPT pnpm dev启动时Mongo副本集事务相关报错

## 现象
执行pnpm dev命令启动FastGPT项目时，触发初始化根用户流程失败，抛出完整报错信息为init root user error MongoServerError: Transaction numbers are only allowed on a replica set member or mongos。

## 可能原因
该报错为Mongo数据库的标准权限限制。事务操作仅支持副本集成员或mongos路由实例，当前部署的Mongo实例未满足该条件，导致初始化根用户的事务操作无法执行。

## 排查步骤
1. 确认当前Mongo数据库实例的部署类型。
2. 查看Mongo实例的配置文件或启动参数，确认是否配置了副本集相关内容。
3. 检查FastGPT初始化脚本的数据库操作逻辑，确认是否存在依赖事务的代码。

## 解决与验证
按照Mongo官方要求，将Mongo实例部署为副本集模式，或使用mongos路由实例。完成配置后重启Mongo实例，重新执行pnpm dev命令。若启动过程中未再出现该Mongo事务相关报错，且初始化根用户流程正常完成，则问题解决。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4252)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
