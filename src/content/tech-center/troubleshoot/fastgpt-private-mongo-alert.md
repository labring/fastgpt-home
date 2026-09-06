---
title: 解决FastGPT私有部署版本Mongo聚合耗时提醒缺失问题
slug: /zh/troubleshoot/fastgpt-private-mongo-alert
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2213
source_type: GitHub issue
---

# 解决FastGPT私有部署版本Mongo聚合耗时提醒缺失问题

## 现象
私有部署版本FastGPT 4.8.6中，系统日志仅输出PG query耗时提醒，未出现Mongo聚合耗时提醒。将版本升级至4.8.8后，两类耗时提醒均正常输出。相关日志截图可参考对应issue内容。

## 可能原因
该问题可能与FastGPT版本迭代过程中监控日志逻辑或配置项的调整相关，具体原因需按实际部署环境确认。

## 排查步骤
1. 确认当前运行的FastGPT私有部署版本号。
2. 查看系统日志，记录PG query耗时提醒与Mongo聚合耗时提醒的存在情况。
3. 对比目标版本与当前版本的官方变更说明，确认监控相关逻辑的调整细节。
4. 检查部署配置文件中是否存在耗时提醒相关的配置项，需按实际环境确认配置状态。

## 解决与验证
若需正常获取Mongo聚合耗时提醒，可将FastGPT私有部署版本升级至4.8.8及以上版本。验证方式为：升级完成后查看系统日志，确认是否同时输出PG query与Mongo聚合的耗时提醒条目。若需保留4.8.6版本，需按实际环境确认是否可通过配置项开启Mongo聚合耗时提醒功能。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2213)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
