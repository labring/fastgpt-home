---
title: FastGPT远程调试套件安全配置与注意事项说明
slug: /zh/deploy/fastgpt-remote-debug-security
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/config/remote-debug-suite
source_type: 官方文档
---

# FastGPT远程调试套件安全配置与注意事项说明

远程调试套件的配置与运行涉及多项核心敏感信息，需严格执行安全管控措施。所有涉及身份与连接的敏感参数包括`CONNECTION_GATEWAY_AUTH_TOKEN`、`JWT_SECRET`、`connectionKey` 和 `connectToken`，均不得写入运行日志、截图留存或发布至公开文档中，避免信息泄露风险。其中`CONNECTION_GATEWAY_AUTH_TOKEN` 仅授权 Plugin Server 使用，本地 CLI 无需获取该参数，且不应主动尝试获取。

## 单节点调试安全操作
`connectionKey` 属于长期有效调试连接密钥，仅在开启或刷新调试通道的过程中以明文形式返回。当该密钥发生泄露时，需立即执行调试通道刷新操作，或直接关闭调试通道以消除安全隐患。远程调试的请求命中调试 source 后，将严格按照远程调试路径执行处理逻辑，当出现连接断连或 session 不存在的情况时，请求会直接执行失败，不会自动回退到生产插件运行时。

## 多副本部署适配要求
多副本 Gateway 部署场景下，需确保 session 删除请求能够正确路由到持有 WebSocket 连接的节点，或接受 Redis 存储的 session 删除后，后续相关调用出现失败的情况。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/config/remote-debug-suite)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
