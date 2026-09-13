---
title: 解决FastGPT v4.9.3队列任务导致MongoDB连接数持续增长问题
slug: /zh/troubleshoot/fastgpt-queue-mongodb-connection-leak
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5945
source_type: GitHub issue
---

# 解决FastGPT v4.9.3队列任务导致MongoDB连接数持续增长问题

## 现象
FastGPT v4.9.3部署后，每分钟日志会出现`mongo disconnected`提示，同时伴随Vector Queue、QA Queue任务完成的日志。MongoDB的`db.serverStatus().connections.totalCreated`指标持续增长，约23分钟后应用会崩溃重启。

## 可能原因
该问题的核心原因为FastGPT v4.9.3的队列任务逻辑，在每次执行Vector Queue、QA Queue任务后主动断开MongoDB连接，未复用配置的连接池，导致连接创建次数持续增加。

## 排查步骤
1.  查看FastGPT应用日志，确认每分钟是否出现`mongo disconnected`日志，以及Vector Queue、QA Queue任务完成的提示。
2.  连接MongoDB数据库，执行`db.serverStatus().connections.totalCreated`命令，观察该指标是否随时间持续增长。
3.  检查MongoDB连接字符串配置，确认`maxPoolSize`、`minPoolSize`、`maxIdleTimeMS`等连接池相关参数是否正确配置。

## 解决与验证
1.  修复队列任务的连接管理逻辑，确保任务执行完成后不主动断开MongoDB连接，复用现有连接池。
2.  按照原配置重新部署FastGPT，保留正确的MongoDB连接池参数（如`maxPoolSize=500`、`minPoolSize=20`等）。
3.  重新运行应用，观察日志是否不再出现`mongo disconnected`提示。
4.  再次执行`db.serverStatus().connections.totalCreated`命令，确认该指标不再随时间持续增长。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5945)
