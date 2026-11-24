---
title: 配置FastGPT Plugin Server的远程调试网关环境变量
slug: /zh/reference/fastgpt-plugin-debug-gateway-config
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/config/remote-debug-suite
source_type: 官方文档小节
---

# 配置FastGPT Plugin Server的远程调试网关环境变量

## 结论
配置FastGPT Plugin Server的远程调试网关环境变量后，需重启服务使配置生效。未配置CONNECTION_GATEWAY_BASE_URL时，Plugin Server将关闭远程调试能力。

## 具体怎么做
在fastgpt-plugin服务中添加以下环境变量：
| 环境变量名 | 说明与示例值 |
| --- | --- |
| CONNECTION_GATEWAY_BASE_URL | Plugin Server调用Gateway内网HTTP API的地址，示例：`http://connection-gateway:3000` |
| CONNECTION_GATEWAY_PUBLIC_URL | 返回给本地CLI的WebSocket地址，需本地可访问，示例：`wss://debug-gateway.example.com/connection-gateway/v1` |
| CONNECTION_GATEWAY_AUTH_TOKEN | 调用Gateway `/internal/*` 和 `/metrics` 的Bearer令牌，需至少32位随机字符，示例：`replace-with-a-random-token-at-least-32-chars` |
| JWT_SECRET | Gateway connect token的HMAC密钥，需与Connection Gateway完全一致，需至少32位随机字符，示例：`replace-with-a-random-jwt-secret-at-least-32-chars` |
配置完成后重启fastgpt-plugin服务。

## 注意事项
1. CONNECTION_GATEWAY_BASE_URL未配置时，Plugin Server会直接关闭远程调试能力。
2. CONNECTION_GATEWAY_PUBLIC_URL必须能从开发者本地访问。
3. CONNECTION_GATEWAY_AUTH_TOKEN和JWT_SECRET均需使用至少32位的随机字符，且JWT_SECRET需与Connection Gateway的配置完全匹配。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/config/remote-debug-suite)
