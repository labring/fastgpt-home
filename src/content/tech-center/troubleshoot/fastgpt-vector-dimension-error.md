---
title: 解决FastGPT生成向量时维度不匹配的报错问题
slug: /zh/troubleshoot/fastgpt-vector-dimension-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/194
source_type: GitHub issue
---

# 解决FastGPT生成向量时维度不匹配的报错问题

## 现象
生成向量时出现报错，具体错误信息包含`error: expected 1536 dimensions, not 384`，以及`RangeError: Invalid array length`。

## 可能原因
嵌入模型的向量维度与系统预设或向量库存储维度不匹配。系统默认使用的text-embedding-ada-002模型向量维度为1536，其他常用模型的向量维度包含384、768、1024等。当使用非默认模型时，若未同步更新向量库或配置中的维度参数，会触发维度不匹配报错。

## 排查步骤
1. 确认当前使用的嵌入模型对应的标准向量维度。
2. 登录PostgreSQL向量库，查看`modeldata`表中`vector`字段的当前维度配置。
3. 检查FastGPT相关配置文件中的向量维度参数是否与当前模型匹配。

## 解决与验证
方案一：更新向量库字段维度。执行SQL语句`ALTER TABLE modeldata alter COLUMN vector type vector(对应模型维度)`，例如适配384维度时执行`ALTER TABLE modeldata alter COLUMN vector type vector(384)`，完成后重启相关服务。
方案二：修改FastGPT配置文件。找到`mongo.ts`文件，将其中的`vector VECTOR(384)`修改为当前使用模型对应的向量维度。
若使用v4.2.1及以上版本，系统已支持自动补0适配不同维度，需确认容器已更新至最新发行版。验证时重新执行生成向量任务，确认报错消失。

> 来源: [FastGPT GitHub issue #194](https://github.com/labring/FastGPT/issues/194)
