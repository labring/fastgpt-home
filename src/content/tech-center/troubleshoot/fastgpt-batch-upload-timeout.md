---
title: 解决FastGPT批量上传Word文档时的超时报错问题
slug: /zh/troubleshoot/fastgpt-batch-upload-timeout
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2008
source_type: GitHub issue
---

# 解决FastGPT批量上传Word文档时的超时报错问题

## 现象
同时上传多个单个大小为2M的Word文档时，因服务器GPU性能不足导致索引缓慢，队列中后续上传的文件显示超时120000毫秒的报错，无法自动完成上传，需手动操作。

## 可能原因
服务器GPU性能不足以支撑批量Word文档的索引任务，导致队列处理延迟，触发预设的120000毫秒超时限制，引发上传超时报错。

## 排查步骤
1. 确认FastGPT部署版本为4.8.5私有部署版本。
2. 统计同时上传的Word文档数量与单个文件的实际大小。
3. 检查服务器GPU的当前负载与整体性能水平。
4. 确认上传队列的超时阈值配置，相关参数需结合实际环境确认。

## 解决与验证
可通过优化服务器GPU性能、调整上传队列的超时阈值（需结合实际环境确认）来缓解该问题。验证方式为：减少同时上传的Word文档数量，或提升服务器GPU性能后，再次执行上传操作，确认超时120000毫秒的报错不再出现，上传任务可自动完成。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2008)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
