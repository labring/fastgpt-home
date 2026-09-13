---
title: 说明FastGPT网关内部HTTP API的配置与访问规则要求
slug: /zh/glossary/fastgpt-gateway-internal-api
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/config/remote-debug-suite
source_type: 官方文档
---

# 说明FastGPT网关内部HTTP API的配置与访问规则要求

## 一句话定义
Gateway internal HTTP API是FastGPT的网关内部HTTP通信接口，对应访问路径包含`/internal/*`。

## 在 FastGPT 里怎么用
部署时建议仅暴露Gateway WebSocket入口，对应路径为`/connection-gateway/v1`，可参考如下Nginx配置完成反向代理设置：
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
Gateway internal HTTP API需保持内网访问，不得直接暴露至公网。如需开启内网安全检查，需设置环境变量`CHECK_INTERNAL_IP=true`，该变量适用于fastgpt、fastgpt-pro、fastgpt-sandbox。在4.14.9版本升级中，原SANDBOX_URL和SANDBOX_TOKEN环境变量需分别改名为CODE_SANDBOX_URL和CODE_SANDBOX_TOKEN，用于配置代码运行沙盒的地址与凭证。

## 容易搞错的地方
误将`/internal/*`、`/metrics`及Gateway HTTP端口直接暴露至公网，会导致内部接口被非法访问。未按4.14.9版本要求替换SANDBOX相关环境变量，会导致代码沙盒无法正常连接。未正确设置CHECK_INTERNAL_IP变量，可能无法触发内网安全校验。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/config/remote-debug-suite)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
