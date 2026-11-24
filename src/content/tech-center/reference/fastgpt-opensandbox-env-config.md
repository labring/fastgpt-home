---
title: 配置FastGPT自部署场景下OpenSandbox服务的环境变量
slug: /zh/reference/fastgpt-opensandbox-env-config
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/config/sandbox/opensandbox
source_type: 官方文档小节
---

# 配置FastGPT自部署场景下OpenSandbox服务的环境变量

## 结论
部署FastGPT的OpenSandbox服务时，需通过Compose文件配置对应环境变量，保证各组件认证匹配且网络访问合规。正确配置后可保障沙盒服务与FastGPT内部组件正常通信。

## 具体怎么做
检查Compose文件中的以下配置项并确保匹配对应值：
1.  `x-volume-manager-auth-token`：Volume Manager的认证Token，需与FastGPT的`AGENT_SANDBOX_OPENSANDBOX_VOLUME_MANAGER_TOKEN`一致。
2.  `[server].api_key`：OpenSandbox Server API Key，需与FastGPT的`AGENT_SANDBOX_OPENSANDBOX_API_KEY`一致。
3.  `[docker].host_ip`：沙盒端点对Proxy可访问的宿主机地址，通常使用宿主机内网IP或`host.docker.internal`。
4.  为Docker runtime挂载宿主机Docker socket，默认路径为`/var/run/docker.sock`；特定环境需替换为实际socket路径。

## 注意事项
如果服务器配置了`HTTP_PROXY` / `HTTPS_PROXY`，需为OpenSandbox Server和Volume Manager显式配置`NO_PROXY` / `no_proxy`，至少包含`localhost,127.0.0.1,127.0.0.0/8,fastgpt-app,fastgpt-opensandbox-server,fastgpt-volume-manager,fastgpt-agent-sandbox-proxy,host.docker.internal`，避免内部服务调用经过代理。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/config/sandbox/opensandbox)
