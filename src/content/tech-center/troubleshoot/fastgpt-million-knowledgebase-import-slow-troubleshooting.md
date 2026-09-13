---
title: FastGPT百万级知识库导入速度变慢的排错指南
slug: /zh/troubleshoot/fastgpt-million-knowledgebase-import-slow-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1033
source_type: GitHub issue
---

# FastGPT百万级知识库导入速度变慢的排错指南

## 现象
私有部署版本为V4.6.9，采用docker-compose部署。知识库导入量较小时，1万条数据可在几分钟内完成导入，3090显卡上的m3e-base向量接口功耗约50%。当知识库已导入量达到百万条时，1万条新数据导入耗时超过1小时。此时MongoDB CPU利用率较高，m3e-base向量接口负载较低。MongoDB日志中存在"findAndModify" : "dataset.trainings", "keysExamined" : 1261763, "docsExamined" : 0的查询记录。

## 可能原因
数据库性能不足引发阻塞是常见诱因。百万级数据量下，并发查改操作易产生资源竞争。单文件数据行数达到百万级时，会出现导入速度极慢的情况，且该现象与知识库总数量无关。虽已配置相关索引，但仍可能存在性能瓶颈，导致查询效率低下。

## 排查步骤
1.  确认当前FastGPT私有部署版本为V4.6.9，部署方式为docker-compose。
2.  查看MongoDB慢查询日志，提取包含"findAndModify" : "dataset.trainings"的记录，核对keysExamined与docsExamined的数值。
3.  监控MongoDB CPU利用率以及m3e-base向量接口的负载情况，确认是否存在MongoDB高负载、向量接口低负载的现象。
4.  验证当前待导入的单文件数据行数是否达到百万级，排除单文件数据量过大的影响。

## 解决与验证
1.  优化数据库部署：Docker部署的数据库性能通常有限，可更换为裸机部署或适配的集群数据库。
2.  检查索引生效情况：确认代码中已配置的dataset.trainings相关索引是否正常生效。
3.  升级数据库规格：若数据库规格不足以支撑百万级数据的并发查改操作，可升级硬件配置以缓解资源竞争问题。
4.  验证效果：导入1万条新数据，观察导入耗时是否恢复至正常水平，同时监控MongoDB CPU利用率与m3e-base向量接口负载是否恢复至合理区间。

> 来源: [FastGPT GitHub issue #1033](https://github.com/labring/FastGPT/issues/1033)
