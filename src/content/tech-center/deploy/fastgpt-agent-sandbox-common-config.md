---
title: 配置FastGPT Agent Sandbox通用参数与部署步骤
slug: /zh/deploy/fastgpt-agent-sandbox-common-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/config/sandbox/common
source_type: 官方文档
---

# 配置FastGPT Agent Sandbox通用参数与部署步骤

## 配置概述
FastGPT Agent Sandbox通用配置适用于opensandbox和sealosdevbox两类Provider，所有接入方案均需部署fastgpt-agent-sandbox-proxy服务，并按需配置沙盒内依赖源。部署proxy后需与FastGPT主服务共用密钥，且需确保两者处于互通网络中。

## 快速部署与配置步骤
1. 部署sandbox-proxy：参考agent-sandbox-proxy.yml添加服务配置，开放外网访问端口，记录AGENT_SANDBOX_PROXY_SECRET密钥（至少32位随机字符串）。proxy服务的关键环境变量包括：PORT默认值为1006，FASTGPT_APP_URL默认值为http://fastgpt-app:3000（代理回源FastGPT主服务的内网地址），FASTGPT_APP_REQUEST_TIMEOUT_SECS默认值为10秒（沙盒冷启动较慢时建议调大），RUST_LOG默认值为info,fastgpt_agent_sandbox_proxy=debug。
2. 修改FastGPT环境变量：在fastgpt-app中添加三项环境变量：AGENT_SANDBOX_PROXY_SECRET替换为32位以上随机密钥，AGENT_SANDBOX_PROXY_URL为浏览器可访问的agent-sandbox-proxy WebSocket地址（如已通过HTTPS代理，需使用wss://协议），AGENT_SANDBOX_PREVIEW_PROXY_URL为沙盒文件预览的HTTP(S)地址。若使用fastgpt-pro，无需配置前两项变量，但必须配置AGENT_SANDBOX_PREVIEW_PROXY_URL。强烈建议该预览地址与FastGPT主站不同源，避免同源脚本访问主站凭证。
3. 启动验证：重启fastgpt-app、fastgpt-pro和fastgpt-agent-sandbox-proxy，访问`https://代理域名/health`，正常返回OK即为配置成功。

## 资源与生命周期配置及常见问题
可通过fastgpt-app和fastgpt-pro的环境变量配置沙盒相关参数：
- 资源限制变量：AGENT_SANDBOX_CPU_COUNT默认1核（单实例CPU上限），AGENT_SANDBOX_MEMORY_MIB默认2048MiB（单实例内存上限），AGENT_SANDBOX_STORAGE_SIZE_GI默认1Gi（存储容量上限），AGENT_SANDBOX_WS_MAX_MESSAGE_BYTES默认67108864字节（IDE Agent WebSocket单消息上限），AGENT_SANDBOX_WS_MAX_FRAME_BYTES默认16777216字节（单帧上限）。
- 生命周期变量：AGENT_SANDBOX_SUSPEND_MINUTES默认60分钟（未活跃自动暂停），AGENT_SANDBOX_ARCHIVE_INACTIVE_DAYS默认7天（暂停后未活跃自动归档）。
此外可配置沙盒内依赖源：AGENT_SANDBOX_NPM_REGISTRY可替换npm/yarn等包管理器的源，AGENT_SANDBOX_PYPI_INDEX_URL可替换PyPI源。若遇到提示`AGENT_SANDBOX_PROXY_URL 或 AGENT_SANDBOX_PREVIEW_PROXY_URL is required`，需检查FastGPT环境变量是否正确配置。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/config/sandbox/common
