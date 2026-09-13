---
title: 解决K8s部署FastGPT时Ingress无法访问内部网络地址问题
slug: /zh/troubleshoot/fastgpt-k8s-ingress-network-fix
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/794
source_type: GitHub issue
---

# 解决K8s部署FastGPT时Ingress无法访问内部网络地址问题

## 现象
使用K8s集群启动FastGPT时，服务启动地址显示为Local: http://dcbf1e94e359:3000、Network: http://172.23.0.2:3000。Ingress控制器无法直接访问该Network地址，因为该地址为容器内部私有地址。

## 可能原因
FastGPT服务对外暴露的Network地址为容器内部私有IP地址，此类地址仅在容器集群内部可访问，Ingress控制器无法直接跨网段访问该类私有地址。

## 排查步骤
1. 查看FastGPT服务启动日志或配置界面，确认Local和Network显示的具体地址信息。
2. 确认当前使用的Ingress控制器的可访问IP网段范围，记录允许访问的地址段。
3. 检查FastGPT服务的网络配置参数，确认服务地址的生成规则，需按实际环境确认具体配置项。

## 解决与验证
解决方法分为两类，第一类是调整FastGPT服务的网络配置，将服务暴露地址设置为集群外部或Ingress控制器可访问的IP或域名，需按实际环境修改对应配置。第二类是配置Ingress控制器的网络访问策略，允许访问容器内部私有网段，需按实际环境调整策略规则。
验证时，访问Ingress配置的对外域名或地址，确认可以正常加载FastGPT服务页面，且功能可正常使用。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/794)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
