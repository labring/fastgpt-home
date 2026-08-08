---
title: 为FastGPT的Oceanbase向量数据库控制器添加统一日志规划
slug: /zh/troubleshoot/oceanbase-controller-log-standard
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6195
source_type: GitHub issue
---

# 为FastGPT的Oceanbase向量数据库控制器添加统一日志规划

## 现象
当前FastGPT的Oceanbase向量数据库控制器未生成标准化的操作日志，无法通过日志追踪向量插入、查询等核心流程的执行情况，与PGVector控制器的日志输出规范不一致，导致排查向量数据库相关问题时缺乏足够的日志依据。

## 可能原因
Oceanbase向量数据库控制器未参照PGVector控制器的日志规划配置标准化的日志打点逻辑，缺少统一的日志输出规则，未对向量处理的关键节点进行日志打点。

## 排查步骤
1.  查看FastGPT中PGVector控制器的日志配置代码，路径为`/Volumes/code/fastgpt-pro/FastGPT/packages/service/common/vectorDB/pg/controller.ts`，记录其关键日志打点的节点与输出格式。
2.  定位Oceanbase向量数据库控制器的代码文件，路径需按实际环境确认。
3.  对比PGVector控制器与Oceanbase控制器的日志输出逻辑，梳理出Oceanbase控制器缺失的日志打点项与格式要求。

## 解决与验证
1.  参照PGVector控制器的日志规划，在Oceanbase控制器的对应代码位置添加标准化的日志输出代码，确保日志的输出格式、打点节点与PGVector控制器保持一致。
2.  重启FastGPT服务，触发Oceanbase向量数据库的相关操作，例如向量数据插入、向量检索等。
3.  查看控制器生成的日志文件，确认已输出与PGVector控制器格式一致的标准化日志，验证配置生效。

> 来源：https://github.com/labring/FastGPT/issues/6195
