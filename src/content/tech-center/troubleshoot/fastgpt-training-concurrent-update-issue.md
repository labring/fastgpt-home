---
title: 解决FastGPT训练队列多线程并发更新数据的问题
slug: /zh/troubleshoot/fastgpt-training-concurrent-update-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2960
source_type: GitHub issue
---

# 解决FastGPT训练队列多线程并发更新数据的问题

## 现象
当配置vectorMaxProcess为15时，同一条处于rebuilding状态的数据集数据，可能被多个线程同时识别并加入训练队列，出现重复的训练任务。

## 可能原因
该代码中使用MongoDB的findOneAndUpdate方法查询并更新rebuilding状态的数据集数据。在多线程并发执行时，若未通过足够的并发控制机制，多个线程可能同时匹配到同一条rebuilding为true的数据，进而重复创建训练任务。vectorMaxProcess参数控制并发处理线程数，当该值设为15时，并发线程数量提升，并发冲突的概率会升高。

## 排查步骤
1. 确认当前部署的vectorMaxProcess参数配置值，查看是否为15或更高并发数。
2. 登录MongoDB数据库，查询MongoDatasetData集合中rebuilding字段为true的数据条目。
3. 查看训练任务相关日志，统计是否存在同一条dataId对应的多条训练记录。
4. 检查代码中findOneAndUpdate操作的数据库会话使用情况，确认是否正确绑定会话以保证操作的原子性。

## 解决与验证
解决方法需基于数据库原子操作逻辑调整，确保findOneAndUpdate操作能排他性地处理目标数据。具体可通过优化查询与更新条件，或添加数据库级别的锁机制来避免并发冲突。验证步骤如下：
1. 保留vectorMaxProcess为15的配置，运行系统一段时间后，检查训练队列中是否存在重复的训练任务。
2. 查看MongoDB数据库日志，确认同一条rebuilding状态的数据未被多个线程同时更新。
3. 统计训练任务的dataId重复率，确认无异常重复情况。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2960)
