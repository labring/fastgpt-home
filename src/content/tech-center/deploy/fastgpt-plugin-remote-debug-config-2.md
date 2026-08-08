---
title: 配置FastGPT系统插件远程调试功能套件的步骤
slug: /zh/deploy/fastgpt-plugin-remote-debug-config-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/config/remote-debug-suite
source_type: 官方文档
---

# 配置FastGPT系统插件远程调试功能套件的步骤

FastGPT系统插件远程调试功能套件用于将开发者本地运行的FastGPT系统插件临时接入测试环境，仅商业版支持，适合插件开发、联调和验收，不适合作为生产插件运行。自部署环境需额外维护多个组件，运维成本高于云服务版本，默认Docker Compose部署脚本未包含相关配置，需按本文额外部署。

该调试链路包含FastGPT主服务、Plugin Server、Connection Gateway、Redis和本地fastgpt-plugin dev组件。部署前需满足多个前提：FastGPT主服务可正常访问fastgpt-plugin且两侧PLUGIN_TOKEN、AUTH_TOKEN一致；fastgpt-plugin版本需与FastGPT版本要求的插件版本匹配；Gateway WebSocket地址需本地可访问，并通过HTTPS反向代理暴露为wss协议地址；Gateway内部HTTP API仅允许Plugin Server所在内网访问；使用的Redis需支持Stream；所有生产密钥至少32位，禁用示例值、默认值或弱口令。

## 具体部署配置步骤
首先部署Connection Gateway，可根据网络环境选择对应镜像：国内版使用`registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-plugin-connection-gateway:8a52896d1d5b866308778871526cfdff9d22c547`，海外版使用`ghcr.io/labring/fastgpt-plugin-connection-gateway:8a52896d1d5b866308778871526cfdff9d22c547`。配置最小化Docker Compose服务：
```yaml
services:
  connection-gateway:
    image: ${CONNECTION_GATEWAY_IMAGE}
    restart: unless-stopped
    environment:
      NODE_ENV: production
      REDIS_URL: redis://default:mypassword@fastgpt-redis:6379
      AUTH_TOKEN: ${CONNECTION_GATEWAY_AUTH_TOKEN}
      CONNECTION_GATEWAY_AUTH_TOKEN: ${CONNECTION_GATEWAY_AUTH_TOKEN}
      JWT_SECRET: ${CONNECTION_GATEWAY_JWT_SECRET}
      CONNECTION_GATEWAY_PORT: 3000
      CONNECTION_GATEWAY_WS_PORT: 3001
      CONNECTION_GATEWAY_WS_PATH: /connection-gateway/v1
    ports:
      - 3010:3000
      - 3011:3001
```
端口说明：3010端口为Gateway HTTP API，包含健康检查、内部接口和监控指标，无需公网暴露，仅需Plugin Server在内网访问即可；3011端口为Gateway WebSocket服务，默认路径为`/connection-gateway/v1`，需通过反向代理暴露为公网wss地址，供本地CLI连接。随后在fastgpt-plugin服务中增加Gateway相关环境变量，配置其调用Gateway内部HTTP API的内网地址。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/config/remote-debug-suite
