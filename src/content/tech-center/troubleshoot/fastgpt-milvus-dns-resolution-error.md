---
title: 解决大量数据后FastGPT出现dns:milvusStandalone:19530解析失败报错问题
slug: /zh/troubleshoot/fastgpt-milvus-dns-resolution-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4455
source_type: GitHub issue
---

# 解决大量数据后FastGPT出现dns:milvusStandalone:19530解析失败报错问题

## 现象
喂入大量数据后，FastGPT弹出报错信息：fastgpt  14 UNAVAILABLE: Name resolution failed for target dns:milvusStandalone:19530，用户最初怀疑是喂入数据过多导致内部Milvus数据库崩溃。

## 可能原因
该报错的核心关联对象为Milvus服务，报错提示名称解析失败，说明FastGPT无法通过指定域名解析到Milvus服务的地址，大概率是Milvus服务无法正常运行，也可能因喂入大量数据触发服务负载超限引发异常。

## 排查步骤
1. 检查Milvus服务的运行状态，确认服务是否处于正常启动的运行状态。
2. 查看Milvus服务的运行日志，提取具体的异常提示信息，定位异常根源。
3. 核对FastGPT的配置项，确认其中配置的Milvus连接地址与实际运行的服务地址一致。
4. 检查当前运行环境的网络配置，确认能否正常解析目标域名milvusStandalone:19530。

## 解决与验证
修复Milvus服务的异常问题，确保服务正常启动并稳定运行。重新启动FastGPT，执行数据喂入操作，确认报错信息不再出现。需按实际运行环境确认修复后的服务能够适配当前的数据处理规模。

> 来源: [FastGPT GitHub issue #4455](https://github.com/labring/FastGPT/issues/4455)
