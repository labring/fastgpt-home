---
title: 配置FastGPT支持以子路径形式进行URL访问的方法
slug: /zh/troubleshoot/fastgpt-subpath-access-config
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2152
source_type: GitHub issue
---

# 配置FastGPT支持以子路径形式进行URL访问的方法

## 现象
使用https://domain/zzz/fastgpt这类子路径URL访问FastGPT时，无法正常加载或使用服务。当前FastGPT仅支持根目录形式的访问。

## 可能原因
FastGPT默认部署配置为根目录模式，未适配子路径访问的请求路径，导致无法识别非根目录的访问请求。

## 排查步骤
1. 检查FastGPT的部署配置文件或启动参数，确认是否存在根路径相关配置项。
2. 确认反向代理的请求转发规则是否正确将子路径请求转发至FastGPT服务端口。
3. 查看FastGPT服务的运行日志，确认是否存在路径不匹配的相关报错（需按实际环境确认）。

## 解决与验证
配置FastGPT的根路径参数为对应的子路径，例如/fastgpt。调整反向代理配置，将对应子路径的请求转发至FastGPT服务的监听端口。使用配置后的子路径URL访问服务，确认页面可正常加载且功能可正常使用。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2152)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
