---
title: 配置FastGPT自部署环境的系统插件远程调试功能套件
slug: /zh/deploy/fastgpt-plugin-remote-debug-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/config/remote-debug-suite
source_type: 官方文档
---

# 配置FastGPT自部署环境的系统插件远程调试功能套件

## 适用场景与组件说明
系统插件远程调试功能套件用于将开发者本地运行的FastGPT系统插件临时接入FastGPT测试环境，适配系统插件开发、联调和验收场景，不适合生产环境运行。该功能仅商业版支持，自部署环境需额外维护相关组件，运维成本高于云服务版本，默认Docker Compose部署脚本未包含相关配置。远程调试链路涉及FastGPT主服务、Plugin Server、Connection Gateway、Redis和本地运行的fastgpt-plugin dev组件，各组件负责调试通道管理、连接转发、长连接维护、数据存储等不同环节。

## 部署前提
配置前需满足以下条件：FastGPT主服务可正常访问fastgpt-plugin，且两侧的PLUGIN_TOKEN、AUTH_TOKEN保持一致；fastgpt-plugin版本需与FastGPT版本要求的插件版本匹配；Gateway WebSocket地址需支持开发者本地访问，生产环境建议通过HTTPS反向代理暴露为wss协议地址；Gateway内部HTTP API仅允许Plugin Server所在内网访问；所用Redis需支持Stream特性；所有生产密钥长度至少32位，不得使用示例值、默认值或弱口令。

## 具体部署配置
### Connection Gateway 部署
Connection Gateway由fastgpt-plugin仓库维护，可根据网络环境选择国内或海外版镜像：
```yaml
# 国内版镜像
CONNECTION_GATEWAY_IMAGE=registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-plugin-connection-gateway:8a52896d1d5b866308778871526cfdff9d22c547
# 海外版镜像
CONNECTION_GATEWAY_IMAGE=ghcr.io/labring/fastgpt-plugin-connection-gateway:8a52896d1d5b866308778871526cfdff9d22c547
```
最小Docker Compose配置示例：
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
端口说明：3010端口为Gateway HTTP API，无需公网暴露，仅需Plugin Server内网访问；3011端口为Gateway WebSocket服务，需暴露为公网wss地址供本地CLI访问。

### Plugin Server 配置
需在fastgpt-plugin服务中新增Gateway相关环境变量，配置其调用Gateway内部HTTP API的内网地址。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/config/remote-debug-suite
