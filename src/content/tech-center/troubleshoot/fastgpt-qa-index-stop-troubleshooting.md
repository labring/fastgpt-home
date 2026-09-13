---
title: 解决FastGPT问答拆分阶段索引停止处理的问题
slug: /zh/troubleshoot/fastgpt-qa-index-stop-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3993
source_type: GitHub issue
---

# 解决FastGPT问答拆分阶段索引停止处理的问题

## 现象
问答拆分阶段有时显示索引处理中，但实际索引已停止。通过对应日志可确认索引未在执行，界面展示与实际运行状态存在偏差。

## 可能原因
索引处理报错次数过多，触发系统锁定机制，导致索引处理被暂停。

## 排查步骤
1. 查看FastGPT容器日志与模型运行日志，确认索引是否实际处于停止状态，排除界面显示异常的干扰。
2. 检查数据库相关配置，确认重试次数相关参数的当前设置值。
3. 梳理近期索引处理的报错记录，确认是否存在频繁报错的情况。

## 解决与验证
可通过修改数据库重试次数配置，或删除原有索引后重新创建来解决问题。修改配置后需重启相关服务，观察索引处理状态是否恢复正常。删除原有索引后重新执行索引构建流程，可确认处理流程是否恢复正常。后续系统将针对状态展示逻辑进行单独优化。

> 来源: [FastGPT GitHub issue #3993](https://github.com/labring/FastGPT/issues/3993)
