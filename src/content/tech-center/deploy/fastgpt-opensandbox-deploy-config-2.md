---
title: 部署并配置FastGPT的OpenSandbox自托管Agent沙盒运行环境以满足自托管需求
slug: /zh/deploy/fastgpt-opensandbox-deploy-config-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/config/sandbox/opensandbox
source_type: 官方文档
---

# 部署并配置FastGPT的OpenSandbox自托管Agent沙盒运行环境以满足自托管需求

OpenSandbox 适用于需要自托管 Agent/Skill 沙盒运行环境的场景。使用前需先完成沙盒通用配置，确保 fastgpt-agent-sandbox-proxy 已部署；fastgpt-app 需配置 Proxy Secret、WebSocket URL 和预览 URL，fastgpt-pro 必须配置预览 URL。需注意：OpenSandbox 方案默认未做网络隔离，如需网络隔离需自行补充对应策略。

## 部署与配置步骤
首先将 fastgpt-opensandbox-server、fastgpt-volume-manager、预拉取镜像和 opensandbox-config 加入当前 FastGPT 部署的 docker-compose.yml，放入 FastGPT App 所在的 app network，无需对外暴露 OpenSandbox 或 Volume Manager 端口。国内部署使用指定镜像源，海外部署可替换为 ghcr.io/labring/fastgpt-agent-sandbox:v0.2.0 等对应镜像。随后根据实际环境修改 OpenSandbox 变量：包括 fastgpt-volume-manager 的认证 Token、OpenSandbox Server API Key，需挂载宿主机 Docker socket（默认路径 /var/run/docker.sock，OrbStack 等环境需替换为实际路径）；若服务器配置了 HTTP_PROXY/HTTPS_PROXY，需为 OpenSandbox Server 和 Volume Manager 补充 NO_PROXY 配置，至少包含 localhost、127.0.0.1、127.0.0.0/8、fastgpt-opensandbox-server、fastgpt-volume-manager、host.docker.internal，避免内部服务调用被代理劫持。
接下来在 fastgpt-app 和 fastgpt-pro 中添加或修改环境变量：启用 OpenSandbox 作为沙盒提供商，配置内网访问地址、访问密钥、运行时镜像等参数，若已使用 x-agent-sandbox-config 统一注入变量，可直接在该 anchor 中填入对应值。最后执行预拉取镜像命令：docker compose --profile prepull pull opensandbox-agent-sandbox-image opensandbox-execd-image opensandbox-egress-image，再启动或重启相关服务。

配置过程中需注意多个细节：若使用 OrbStack 或 Docker 自动注入的 NO_PROXY 包含 IPv6 CIDR，可能导致 httpx 解析错误，需显式覆盖 NO_PROXY 配置；单实例沙盒的 CPU 和内存上限可通过 AGENT_SANDBOX_CPU_COUNT、AGENT_SANDBOX_MEMORY_MIB 调整，默认分别为 1 核和 2048MiB，持久卷容量仅在 K8s 模式下创建 PVC 时生效。此外，所有配置的密钥需保持一致，例如 OpenSandbox Server API Key 需与 FastGPT 中的 AGENT_SANDBOX_OPENSANDBOX_API_KEY 匹配，Volume Manager 的认证 Token 需与 AGENT_SANDBOX_OPENSANDBOX_VOLUME_MANAGER_TOKEN 一致。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/config/sandbox/opensandbox
