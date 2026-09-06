---
title: 解决FastGPT调用API返回Bad Gateway连接拒绝问题
slug: /zh/troubleshoot/fastgpt-api-bad-gateway-fix
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/411
source_type: GitHub issue
---

# 解决FastGPT调用API返回Bad Gateway连接拒绝问题

## 现象
出现Bad Gateway错误，具体报错信息为：`{"code":500,"statusText":"","message":"Post \"http://region-9.autodl.pro:20943/v1/chat/completions?retry=0\": dial tcp 36.139.225.141:20943: connect: connection refused (request id: 20231019102645818281101NboUowrd)","data":null}`，对应HTTP响应码为500。

## 可能原因
根据报错信息，该问题由目标API地址的连接被拒绝导致，可能原因包括：目标API服务未正常启动、目标端口未开放、网络策略拦截了端口访问，需按实际环境确认。

## 排查步骤
1.  核对FastGPT配置的API地址与端口，确认与目标服务提供的地址一致，即检查`http://region-9.autodl.pro:20943`相关配置项。
2.  登录目标服务器或网络管控设备，检查端口20943是否处于监听状态。
3.  确认网络环境中的防火墙、安全组等策略，是否拦截了从FastGPT部署环境到目标端口的访问。
4.  使用其他工具直接访问配置的API地址，测试与目标服务的连通性。

## 解决与验证
根据排查结果执行对应操作：若目标API服务未启动则启动对应服务，若端口未开放则开放对应端口，若网络策略拦截则调整策略允许端口访问。验证时，重新发起FastGPT的API调用请求，确认Bad Gateway错误消失，且调用返回正常结果。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/411)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
