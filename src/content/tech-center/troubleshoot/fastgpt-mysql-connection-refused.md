---
title: 解决FastGPT数据库连接被拒绝的初始化失败问题
slug: /zh/troubleshoot/fastgpt-mysql-connection-refused
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1218
source_type: GitHub issue
---

# 解决FastGPT数据库连接被拒绝的初始化失败问题

## 现象
出现数据库初始化失败的报错，具体日志内容为：2024/04/16 02:10:07 /build/model/main.go:79 [error] failed to initialize database, got error dial tcp 172.118.0.5:33066: connect: connection refused。后续重复出现该连接拒绝错误，同时日志显示One API v0.6.5-alpha.18启动、使用MySQL作为数据库后触发FATAL级别错误。

## 可能原因
根据报错信息，核心问题为无法连接到指定的MySQL地址172.118.0.5:33066。可能的原因包括MySQL服务未正常运行、端口配置与实际服务不匹配、网络连通性异常、数据库连接参数配置有误。

## 排查步骤
1. 核对配置的MySQL连接地址与端口，确认是否为172.118.0.5:33066，与实际部署的MySQL服务信息一致。
2. 检查目标MySQL服务的运行状态，确认服务已正常启动。
3. 验证当前环境与MySQL服务的网络连通性，通过基础网络测试工具确认能否访问该地址与端口。
4. 检查数据库连接相关的配置参数是否正确，需按实际环境确认。

## 解决与验证
修正数据库连接配置中的地址与端口，使其与实际部署的MySQL服务匹配。启动服务后，查看日志是否不再出现dial tcp 172.118.0.5:33066: connect: connection refused报错，确认数据库初始化成功。若问题仍存在，需按实际环境进一步排查网络或服务状态。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1218)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
