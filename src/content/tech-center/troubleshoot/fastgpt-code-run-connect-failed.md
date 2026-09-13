---
title: 解决FastGPT私有部署后代码运行模块连接80端口失败问题
slug: /zh/troubleshoot/fastgpt-code-run-connect-failed
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1718
source_type: GitHub issue
---

# 解决FastGPT私有部署后代码运行模块连接80端口失败问题

## 现象
使用docker-compose私有部署v4.8.3版本FastGPT，FastGPT默认运行在3000端口。执行代码运行模块时，出现报错提示"connect ECONNREFUSED 127.0.0.1:80"，且当前部署环境中80端口无服务运行。

## 可能原因
代码运行模块默认配置的连接地址指向127.0.0.1:80，而该部署环境中80端口未启动对应服务，导致连接请求被拒绝。

## 排查步骤
1. 检查FastGPT服务运行状态，确认3000端口是否正常对外提供服务。
2. 查看当前使用的docker-compose.yaml配置文件，确认代码运行模块的连接地址配置项。
3. 检查主机或容器内80端口的监听情况，确认是否有进程占用该端口。
4. 核对代码运行模块配置的连接地址与实际可用服务的端口是否一致。

## 解决与验证
修改代码运行模块的连接地址配置，将其指向实际可用的服务端口。重新部署或重启FastGPT服务后，执行代码运行模块，确认不再出现"connect ECONNREFUSED 127.0.0.1:80"报错，模块可正常执行。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1718)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
