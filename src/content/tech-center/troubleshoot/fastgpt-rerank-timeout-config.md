---
title: 调整FastGPT重排序接口超时时间的排错方案
slug: /zh/troubleshoot/fastgpt-rerank-timeout-config
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1090
source_type: GitHub issue
---

# 调整FastGPT重排序接口超时时间的排错方案

## 现象
升级到V4.7版本后，重排序特性无法正常生效，错误日志显示调用rerank接口超时。

## 可能原因
reRankRecall函数的timeout属性固定为30秒，当待处理数据条数较多时，接口耗时超过30秒，触发超时。

## 排查步骤
1. 查看系统运行日志，确认是否存在rerank接口调用超时的报错信息。
2. 确认当前部署的FastGPT版本为V4.7及以上。
3. 检查config.json配置文件，查找reRankModels相关配置项。

## 解决与验证
在config.json的reRankModels配置项中添加timeout参数，设置为符合业务需求的时长。重启FastGPT服务后，执行重排序操作，确认接口不再超时，重排序功能正常生效。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1090)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
