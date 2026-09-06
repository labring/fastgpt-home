---
title: 解决FastGPT私有部署后OneAPI页面502无法访问问题
slug: /zh/troubleshoot/fastgpt-oneapi-502-unreachable
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2225
source_type: GitHub issue
---

# 解决FastGPT私有部署后OneAPI页面502无法访问问题

## 现象
本次部署使用FastGPT私有部署V4.8.7版本，OneAPI版本为阿里云0.6.6。部署完成并按教程sleep 10秒后重启OneAPI，访问IP地址的3001端口无法进入OneAPI页面，请求长时间pending后返回502错误。同时可通过IP地址的3000端口正常进入FastGPT页面，但未配置大模型API Key无法完成对话。

## 可能原因
需按实际部署环境确认，可能涉及OneAPI服务启动状态、端口映射配置、容器间网络通信等相关问题。

## 排查步骤
1. 查看OneAPI容器的运行日志，确认服务启动过程是否存在异常。
2. 检查docker-compose配置中OneAPI的端口映射规则，确认3001端口的映射配置正确。
3. 执行docker ps命令，确认OneAPI容器处于正常运行状态。
4. 验证FastGPT与OneAPI的网络连通性，排查容器间通信问题。

## 解决与验证
根据排查结果修复对应问题，例如重启未正常启动的OneAPI服务、修正错误的端口映射配置、修复容器间网络通信异常等。修复完成后，重新访问IP地址的3001端口，确认页面可正常加载且无502错误。同时在FastGPT中配置大模型API Key，验证对话功能可正常使用。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2225)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
