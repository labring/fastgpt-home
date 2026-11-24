---
title: 配置 FastGPT Agent Sandbox Proxy 服务的环境变量与端口
slug: /zh/reference/fastgpt-agent-sandbox-proxy-config
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/config/sandbox/opensandbox
source_type: 官方文档小节
---

# 配置 FastGPT Agent Sandbox Proxy 服务的环境变量与端口

## 结论
本文整理了 FastGPT Agent Sandbox Proxy 服务的环境变量配置与端口设置方法。按照规范操作可快速完成该代理服务的基础部署与参数调整。

## 具体怎么做
可通过配置以下环境变量完成服务配置：
| 变量名 | 默认值 | 说明 |
| --- | --- | --- |
| PORT | 1006 | Proxy 容器监听端口，默认映射到宿主机 3006 |
| PREVIEW_PORT | 与 PORT 相同 | 4.16 版本可单独指定 HTTP 预览监听端口；修改后需同步调整宿主机端口映射和 AGENT_SANDBOX_PREVIEW_PROXY_URL |
| AGENT_SANDBOX_PROXY_SECRET | 无 | 与 FastGPT 主服务共用的密钥，至少 32 位 |
| FASTGPT_APP_URL | http://fastgpt-app:3000 | Proxy 回源 FastGPT 主服务的内网地址 |
| FASTGPT_APP_REQUEST_TIMEOUT_SECS | 10 | Proxy 回源请求超时时间，单位秒；沙盒冷启动较慢时可适当调大 |
| RUST_LOG | info,fastgpt_agent_sandbox_proxy=debug | Proxy 服务日志级别 |

若需单独调整预览端口，可修改 PREVIEW_PORT 为其他容器端口，并同步调整宿主机端口映射与 AGENT_SANDBOX_PREVIEW_PROXY_URL。

## 注意事项
1. AGENT_SANDBOX_PROXY_SECRET 需至少 32 位，且需与 FastGPT 主服务共用同一密钥。
2. 修改 PREVIEW_PORT 后，必须同步调整宿主机端口映射和 AGENT_SANDBOX_PREVIEW_PROXY_URL。
3. 沙盒冷启动较慢时，可适当调大 FASTGPT_APP_REQUEST_TIMEOUT_SECS 的值。
4. 4.16 版本默认使用同一端口提供 WebSocket 和 HTTP 预览服务，若网关不支持同端口转发，可设置 PREVIEW_PORT 为其他容器端口，调整 Compose 端口映射，并更新 AGENT_SANDBOX_PREVIEW_PROXY_URL 指向新端口。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/config/sandbox/opensandbox)
