---
title: 解决FastGPT私有部署aiproxy容器健康检查异常问题
slug: /zh/troubleshoot/fastgpt-aiproxy-healthcheck-fix
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4016
source_type: GitHub issue
---

# 解决FastGPT私有部署aiproxy容器健康检查异常问题

## 现象
在v4.9.0版本私有部署FastGPT环境中，部署ghcr.io/labring/sealos-aiproxy-service:latest镜像启动的aiproxy容器，可正常提供功能，但容器状态一直显示为unhealthy，健康检查未正常生效。

## 可能原因
健康检查异常的具体原因需按实际部署环境确认，暂无明确已知指向。

## 排查步骤
1. 查看aiproxy容器的日志，确认健康检查请求的执行情况与返回结果。
2. 核对容器健康检查配置与镜像内置逻辑的一致性。
3. 检查容器内部健康检查相关服务的运行状态。
4. 确认容器所在网络环境未阻断健康检查相关请求。

## 解决与验证
1. 根据排查结果修正对应的问题点。
2. 重启aiproxy容器，等待健康检查周期完成。
3. 确认容器状态变为healthy，且功能仍可正常使用。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4016)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
