---
title: FastGPT Connection Gateway的部署配置与参数说明
slug: /zh/reference/fastgpt-connection-gateway-deploy
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/config/remote-debug-suite
source_type: 官方文档小节
---

# FastGPT Connection Gateway的部署配置与参数说明

## 结论
Connection Gateway 由 fastgpt-plugin 仓库维护，需根据国内或海外网络环境选择对应镜像完成部署。按照官方提供的最小配置即可完成基础接入。

## 具体怎么做
1. 选择对应镜像：国内版使用 `registry.cn-hangzhouzhou.aliyuncs.com/fastgpt/fastgpt-plugin-connection-gateway:8a52896d1d5b866308778871526cfdff9d22c547`；海外版使用 `ghcr.io/labring/fastgpt-plugin-connection-gateway:8a52896d1d5b866308778871526cfdff9d22c547`。
2. 编写Docker Compose配置，添加`connection-gateway`服务，完整配置示例如下：
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
      - '3010:3000'
      - '3011:3001'
```
3. 配置中`${CONNECTION_GATEWAY_IMAGE}`需替换为上述选择的对应镜像地址。

## 注意事项
1. 端口说明：3010端口对应容器内3000端口，为Gateway HTTP API，包含/health、/internal/*、/metrics路径，无需公网暴露，仅需Plugin Server内网访问；3011端口对应容器内3001端口，为Gateway WebSocket，默认路径为/connection-gateway/v1，需允许本地CLI访问，通常通过反向代理暴露为wss地址。
2. Redis用于存储Gateway session、source owner和mailbox，需支持Stream特性，且无需公网暴露。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/config/remote-debug-suite)
