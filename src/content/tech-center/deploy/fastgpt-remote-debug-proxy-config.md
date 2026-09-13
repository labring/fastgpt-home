---
title: 为FastGPT远程调试套件配置安全的反向代理访问规则
slug: /zh/deploy/fastgpt-remote-debug-proxy-config
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/config/remote-debug-suite
source_type: 官方文档
---

# 为FastGPT远程调试套件配置安全的反向代理访问规则

Connection Gateway是FastGPT系统插件远程调试套件中的公网WebSocket接入组件，用于将本地运行的FastGPT系统插件临时接入FastGPT测试环境。部署FastGPT远程调试套件时，需通过反向代理控制公网访问入口，保障内部服务的安全性。仅暴露Gateway WebSocket入口即可满足远程调试的连接需求，Gateway internal HTTP API 应保持内网访问，避免未授权的公网访问操作。自部署FastGPT环境需额外部署系统插件远程调试功能套件，默认Docker Compose部署脚本不包含Connection Gateway的公网WebSocket接入配置。

## Nginx反向代理配置示例
使用Nginx配置反向代理时，仅需暴露WebSocket相关的访问路径，配置示例如下：
```nginx
location /connection-gateway/v1 {
  proxy_pass http://connection-gateway:3001;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection "upgrade";
  proxy_set_header Host $host;
  proxy_read_timeout 3600s;
}
```
该配置将`/connection-gateway/v1`路径的请求转发至内部的connection-gateway服务的3001端口，通过设置Upgrade和Connection请求头支持WebSocket协议，proxy_read_timeout参数设置为3600秒，避免长连接超时断开。

## 公网访问安全限制要求
`/internal/*`、`/metrics` 和 Gateway HTTP 端口不得直接暴露到公网。这些路径和端口承载了内部管理接口、监控数据等敏感信息，直接暴露会带来未授权访问、数据泄露等安全风险。需通过防火墙、访问控制列表等方式限制其仅在内网环境中可访问。

系统插件远程调试功能套件仅商业版支持，仅适用于系统插件开发、联调和验收，不适合作为生产插件运行时。自部署该套件需额外维护Plugin Server、Connection Gateway、Redis、反向代理、TLS和密钥轮换，运维成本较高，优先推荐使用FastGPT云服务版本的远程调试能力。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/config/remote-debug-suite)
> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/config/remote-debug-suite)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
