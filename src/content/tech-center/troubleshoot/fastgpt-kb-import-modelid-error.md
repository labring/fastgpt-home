---
title: 解决FastGPT知识库导入时报model_id非空约束错误的问题
slug: /zh/troubleshoot/fastgpt-kb-import-modelid-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/66
source_type: GitHub issue
---

# 解决FastGPT知识库导入时报model_id非空约束错误的问题

## 现象
在Mac M2芯片硬件环境，使用pnpm部署FastGPT，PostgreSQL与MongoDB采用docker部署时，执行知识库--知识库数据--导入的手动/文件拆分操作，会触发以下报错：
```
wait  - compiling /api/openapi/kb/pushData (client and server)...
event - compiled successfully in 156 ms (198 modules)
error: null value in column "model_id" of relation "modeldata" violates not-null constraint
```
同时报错包含详细信息：错误代码23502，涉及public schema下的modeldata表的model_id列，失败的行数据包含(3, null, waiting, 64741167079cb0c39ba3e8d4, null, JDK 17已经于2021年3月16日如期发布。本文介绍JDK 17..., 发布版本说明根据发布的规划，这次发布的 JDK 1..., 6474118c079cb0c39ba3e8e3)。

## 可能原因
该报错为PostgreSQL数据库的非空约束违规错误，核心问题是向`modeldata`表的`model_id`列插入了null值。结合知识库导入的操作场景，推测是导入流程中未正确生成或传递`model_id`参数，导致数据库写入操作触发约束拦截。

## 排查步骤
1.  确认部署环境状态：检查PostgreSQL、MongoDB的docker容器运行状态，以及FastGPT的pnpm启动日志，确认服务运行正常
2.  提取完整报错信息：记录完整的报错内容，确认错误代码、涉及的表与列，以及失败的行数据详情
3.  定位异常接口：确认触发报错的接口为`/api/openapi/kb/pushData`，检查该接口的处理逻辑
4.  核对数据库约束：登录PostgreSQL数据库，查看`modeldata`表的`model_id`列是否设置了非空约束

## 解决与验证
需要修复导入流程中`model_id`参数的生成或传递逻辑，确保向`modeldata`表写入数据时，`model_id`字段不为null。完成修复后，重新执行知识库导入操作，确认不再触发该报错，且数据成功写入数据库。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/66)
