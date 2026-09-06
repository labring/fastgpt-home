---
title: 解决FastGPT中M3E模型导入数据时队列丢失与报错问题
slug: /zh/troubleshoot/fastgpt-m3e-import-queue-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/232
source_type: GitHub issue
---

# 解决FastGPT中M3E模型导入数据时队列丢失与报错问题

## 现象
使用M3E模型导入数据时，导入约5万条数据后队列丢失，累计导入16万数据后实际仅导入约5万条。导入过程缓慢，后台会返回body400报错。导入docx文件时问题更明显，导入pdf整本书的数千队列可完成，但处理速度较慢。Embedding-2模型导入数十万数据无此类异常，处理速度更快。

## 可能原因
系统资源不足。M3E模型处理单条数据平均耗时0.7秒，16c16g的容器配置下无法支撑较大批量数据导入，导致队列异常丢失。

## 排查步骤
1. 查看系统资源使用情况，确认CPU、内存占用是否达到阈值。
2. 检查后台日志，确认是否存在body400报错。
3. 对比Embedding-2模型的导入表现，确认异常仅出现在M3E模型场景。
4. 需按实际环境确认当前容器的配置规格。

## 解决与验证
调整系统资源配置，提升容器的CPU、内存规格。调整完成后，重新执行数据导入操作，确认队列未丢失，实际导入量与预期一致。检查后台日志无body400报错，确认导入速度符合预期。

> 来源: [FastGPT GitHub issue #232](https://github.com/labring/FastGPT/issues/232)
