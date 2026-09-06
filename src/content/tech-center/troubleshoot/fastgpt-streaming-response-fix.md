---
title: 解决FastGPT对接大模型API时实时转发不生效的问题
slug: /zh/troubleshoot/fastgpt-streaming-response-fix
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1744
source_type: GitHub issue
---

# 解决FastGPT对接大模型API时实时转发不生效的问题

## 现象
使用私有部署v4.8.3版本的FastGPT，对接通义千问API提供大模型能力。通过API对接FastGPT应用时，响应速度较慢。查看对话日志可知，FastGPT在接收大模型的全部流式响应内容后，才通过流式响应转发给调用方。

## 可能原因
当前FastGPT的流式响应处理逻辑为接收大模型返回的全部流式内容后，再统一转发给调用方，导致响应延迟。

## 排查步骤
1. 确认FastGPT部署版本为v4.8.3私有部署版本。
2. 确认对接的大模型服务为通义千问API。
3. 查看API调用日志，确认大模型流式响应是否在接收完整内容后才被转发。

## 解决与验证
需按实际部署环境检查FastGPT的流式响应转发相关配置。若官方文档未提供对应配置项，需按实际部署环境调整相关参数。若需调整处理逻辑，可参考官方文档的对应配置项进行修改。验证方式为发起API调用，观察响应是否在大模型生成内容的同时逐步返回。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1744)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
