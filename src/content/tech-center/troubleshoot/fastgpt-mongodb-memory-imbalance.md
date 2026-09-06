---
title: 排查并解决FastGPT私有部署MongoDB节点内存不均问题
slug: /zh/troubleshoot/fastgpt-mongodb-memory-imbalance
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5189
source_type: GitHub issue
---

# 排查并解决FastGPT私有部署MongoDB节点内存不均问题

## 现象
FastGPT 4.9.14私有部署环境中，MongoDB集群出现节点内存占用不均的问题，其中一个节点内存占用达到80G，其余两个节点内存占用约30G。

## 可能原因
暂无明确匹配的已知关联原因，需结合实际部署环境逐一排查。相关影响因素需按实际环境确认，例如集群数据分布、缓存配置、节点负载情况等。

## 排查步骤
1. 登录MongoDB集群的所有节点，使用系统监控命令查看实时内存占用情况，确认各节点的内存使用差异。
2. 查看MongoDB的日志文件，检索与内存、连接相关的异常日志内容。
3. 核对FastGPT 4.9.14版本对应的MongoDB连接配置，确认是否存在单节点连接数过高的情况。
4. 检查MongoDB集群的数据分布状态，确认是否存在数据倾斜导致的节点负载不均。

## 解决与验证
若排查后确认是数据分布倾斜，可调整MongoDB集群的分片策略，优化数据分片分布；若为缓存配置过高，可按实际需求调整相关缓存参数；若为连接数过载，可调整FastGPT的MongoDB连接池配置。完成调整后，重启MongoDB集群相关节点及FastGPT服务，监控各节点内存占用情况，确认内存占用差异恢复至合理范围。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5189)
