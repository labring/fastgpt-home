---
title: 优化Docker部署的FastGPT知识库检索速度
slug: /zh/troubleshoot/fastgpt-docker-knowledge-retrieval-speed
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1690
source_type: GitHub issue
---

# 优化Docker部署的FastGPT知识库检索速度

## 现象
使用Docker部署FastGPT的场景下，知识库包含数十万条数据时，单次知识库检索耗时约10秒。

## 可能原因
相关容器的内存资源分配不足，不足以支撑数十万条知识库数据的检索运算，导致检索速度缓慢。

## 排查步骤
1. 查看当前Docker部署的FastGPT相关容器的内存限制配置参数
2. 统计知识库内的数据条目总数量，确认当前数据规模
3. 执行基础知识库检索流程，记录单次检索的耗时数据

## 解决与验证
1. 调整相关容器的内存分配参数，需按实际环境确认具体容器类型与内存阈值
2. 重新部署调整后的容器，执行知识库检索操作，记录耗时变化情况
3. 多次重复检索测试，验证速度提升效果，确认配置已生效

> 来源: [FastGPT GitHub issue #1690](https://github.com/labring/FastGPT/issues/1690)
