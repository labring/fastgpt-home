---
title: 配置FastGPT集成Sealos Devbox沙盒服务的详细配置工作
slug: /zh/deploy/fastgpt-sealos-devbox-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/config/sandbox/sealosdevbox
source_type: 官方文档
---

# 配置FastGPT集成Sealos Devbox沙盒服务的详细配置工作

## 前置准备
FastGPT 的 Sealos Devbox 沙盒仅商业版用户支持，需联系客服申请密钥，计费方式为按量计费，扣除 sealos 余额。使用前需完成两项前置准备：一是已部署 FastGPT 商业版并确认团队拥有 Agent Sandbox 使用权限；二是向客服申请 Sealos Devbox 接入信息，包括 Devbox 服务地址、访问 Token、运行态镜像。

## 配置环境变量
需在 `fastgpt-app` 和 `fastgpt-pro` 中添加以下环境变量：
```
# 启用 Sealos Devbox 作为 Agent Sandbox provider
AGENT_SANDBOX_PROVIDER = sealosdevbox
# 客服提供的 Sealos Devbox Server API 地址，FastGPT 主服务需要能访问
AGENT_SANDBOX_SEALOS_BASEURL = https://devbox-server.example.com
# 客服提供的访问密钥
AGENT_SANDBOX_SEALOS_TOKEN = replace_with_sealos_devbox_token
# 沙盒镜像版本
AGENT_SANDBOX_SEALOS_IMAGE = hub.hzh.sealos.run/labring/devbox-sandbox:v0.2.0
# Devbox 单实例资源上限；存储容量单位为 GB
AGENT_SANDBOX_CPU_COUNT = 1
AGENT_SANDBOX_MEMORY_MIB = 2048
AGENT_SANDBOX_STORAGE_SIZE_GI = 1
```
此外，`fastgpt-app` 需额外配置 `AGENT_SANDBOX_PROXY_URL` 和 `AGENT_SANDBOX_PREVIEW_PROXY_URL`，`fastgpt-pro` 需配置 `AGENT_SANDBOX_PREVIEW_PROXY_URL`，具体要求参考沙盒通用配置文档。

## 常见报错排查
1.  提示 `AGENT_SANDBOX_PROXY_URL 或 AGENT_SANDBOX_PREVIEW_PROXY_URL is required`：启用 `sealosdevbox` 提供方后需按要求补充对应环境变量，具体要求参考沙盒通用配置。
2.  提示 `AGENT_SANDBOX_SEALOS_IMAGE is required`：启用后必须配置该参数，需使用客服提供或与当前 FastGPT 版本匹配的 Agent Sandbox 运行态镜像。
3.  浏览器 WebSocket 连接失败：检查代理服务是否能被浏览器访问，并确认反向代理已支持 WebSocket Upgrade；如果 FastGPT 通过 HTTPS 访问，`AGENT_SANDBOX_PROXY_URL` 也应使用 `wss://` 协议，避免浏览器拦截混合内容。
4.  proxy 校验失败或返回 401：确认 `fastgpt-app` 和 `fastgpt-agent-sandbox-proxy` 中的 `AGENT_SANDBOX_PROXY_SECRET` 完全一致，并且长度不少于 32 位。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/config/sandbox/sealosdevbox)
