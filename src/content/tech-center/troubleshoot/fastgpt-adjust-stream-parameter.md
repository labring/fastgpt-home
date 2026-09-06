---
title: 修改FastGPT 4.8.1私有部署版API请求的stream参数配置
slug: /zh/troubleshoot/fastgpt-adjust-stream-parameter
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1627
source_type: GitHub issue
---

# 修改FastGPT 4.8.1私有部署版API请求的stream参数配置

## 现象
FastGPT 4.8.1私有部署版本的API请求中，stream参数默认值为false，无法直接使用流式响应模式。

## 可能原因
FastGPT 4.8.1私有部署版的API默认配置中，stream参数被预设为false，未提供可视化的快捷修改入口。

## 排查步骤
1. 确认当前FastGPT版本为4.8.1私有部署版。
2. 定位API请求相关的代码或配置文件，查找stream参数的配置位置。
3. 检查当前stream参数的默认设置值。

## 解决与验证
找到API请求中stream参数的配置位置，将默认值从false修改为true。重启FastGPT服务使配置生效，发起API请求验证响应是否为流式模式。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1627)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
