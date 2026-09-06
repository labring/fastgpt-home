---
title: FastGPT私有部署后web端提示无可用模型的排错指南
slug: /zh/troubleshoot/fastgpt-private-model-troubleshoot
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4001
source_type: GitHub issue
---

# FastGPT私有部署后web端提示无可用模型的排错指南

## 现象
私有部署V4.8.23版本的FastGPT，部署第三方API服务后，web端提示无可用模型。进入FastGPT所在docker容器内部测试，可正常获取模型。查看docker日志未发现异常记录，web端抓包未发现异常。

## 可能原因
未正确配置关联第三方API服务的环境变量；web端与docker容器内的环境变量配置不一致。

## 排查步骤
1. 确认FastGPT私有部署版本为V4.8.23。
2. 查看FastGPT容器内的环境变量配置，核对关联第三方API服务的相关参数。
3. 对比web端部署环境与docker容器内的环境变量，确认配置一致性。
4. 检查web端抓包与docker日志，确认无异常报错。

## 解决与验证
修正关联第三方API服务的环境变量配置，确保与docker容器内的配置一致。重启FastGPT服务后，访问web端，确认不再提示无可用模型。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4001)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
