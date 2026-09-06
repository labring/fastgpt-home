---
title: 解决FastGPT知识库URL导入时的MongoDB事务报错问题
slug: /zh/troubleshoot/fastgpt-url-import-mongodb-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/857
source_type: GitHub issue
---

# 解决FastGPT知识库URL导入时的MongoDB事务报错问题

## 现象
FastGPT私有部署版本4.6.8中，知识库通过URL导入时，会弹出报错"Transaction numbers are only allowed on a replica set member or mongos "，此时导入普通文档的操作可正常完成。该报错也可能出现在删除相关数据的操作中。

## 可能原因
该报错由MongoDB初始化配置异常引发，与副本集或分片集群的初始化状态相关。

## 排查步骤
1. 确认当前MongoDB实例的部署模式，检查是否为副本集或分片集群（mongos）的配置类型。
2. 验证MongoDB初始化流程是否完整，确认配置项与实际部署模式匹配。
3. 需按实际环境确认MongoDB的启动参数与集群配置是否正确。

## 解决与验证
针对该问题的核心解决方向为修正MongoDB初始化配置。完成配置修正后，重新启动FastGPT服务与MongoDB实例，再次尝试对应操作（如通过URL导入知识库、删除数据），验证报错是否消失。

> 来源: [FastGPT GitHub issue #857](https://github.com/labring/FastGPT/issues/857)
