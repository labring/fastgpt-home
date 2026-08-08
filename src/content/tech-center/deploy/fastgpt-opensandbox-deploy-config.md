---
title: 部署FastGPT OpenSandbox 自托管Agent沙盒环境
slug: /zh/deploy/fastgpt-opensandbox-deploy-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/config/sandbox/opensandbox
source_type: 官方文档
---

# 部署FastGPT OpenSandbox 自托管Agent沙盒环境

## 适用场景与前置要求
FastGPT OpenSandbox 适用于需要自托管Agent/Skill沙盒运行环境的场景。使用前需先完成沙盒通用配置，确保fastgpt-agent-sandbox-proxy已部署；fastgpt-app需配置Proxy Secret、WebSocket URL和预览URL，fastgpt-pro必须配置预览URL。注意：OpenSandbox方案默认未做网络隔离，如需网络隔离，请自行补充对应的网络隔离策略。

## 部署与配置步骤
1.  补充docker-compose服务：参考opensandbox.yml，将fastgpt-opensandbox-server、fastgpt-volume-manager、预拉取镜像和opensandbox-config加入当前FastGPT部署的docker-compose.yml，并放到FastGPT App所在的app network中，不需要对外暴露OpenSandbox或Volume Manager端口。国内部署使用国内镜像源，海外部署可替换为对应ghcr.io镜像。
2.  配置OpenSandbox变量：根据实际环境修改以下变量：x-volume-manager-auth-token（需与FastGPT的AGENT_SANDBOX_OPENSANDBOX_VOLUME_MANAGER_TOKEN一致）、[server].api_key（需与FastGPT的AGENT_SANDBOX_OPENSANDBOX_API_KEY一致）；Docker runtime需挂载宿主机Docker socket，默认路径为/var/run/docker.sock，OrbStack等环境需替换为实际路径；若服务器配置了HTTP_PROXY/HTTPS_PROXY，需为OpenSandbox Server和Volume Manager补充NO_PROXY，至少包含localhost,127.0.0.1,127.0.0.0/8,fastgpt-opensandbox-server,fastgpt-volume-manager,host.docker.internal，避免内部服务调用被代理劫持。
3.  配置FastGPT环境变量：在fastgpt-app和fastgpt-pro中增加或修改以下环境变量：
```
AGENT_SANDBOX_PROVIDER = opensandbox
AGENT_SANDBOX_OPENSANDBOX_BASEURL = http://fastgpt-opensandbox-server:8090
AGENT_SANDBOX_OPENSANDBOX_API_KEY = replace_with_opensandbox_api_key
AGENT_SANDBOX_OPENSANDBOX_RUNTIME = docker
AGENT_SANDBOX_OPENSANDBOX_IMAGE_REPO = registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-agent-sandbox
AGENT_SANDBOX_OPENSANDBOX_IMAGE_TAG = v0.2.0
AGENT_SANDBOX_OPENSANDBOX_USE_SERVER_PROXY = true
AGENT_SANDBOX_OPENSANDBOX_VOLUME_MANAGER_URL = http://fastgpt-volume-manager:3000
AGENT_SANDBOX_OPENSANDBOX_VOLUME_MANAGER_TOKEN = replace_with_volume_manager_token
AGENT_SANDBOX_CPU_COUNT = 1
AGENT_SANDBOX_MEMORY_MIB = 2048
AGENT_SANDBOX_STORAGE_SIZE_GI = 1
```
若你的docker-compose.yml已使用x-agent-sandbox-config统一注入Agent Sandbox变量，可直接在该anchor中填入上述值，确保fastgpt-app和fastgpt-pro都继承该配置。
4.  启动验证：预拉取沙盒运行时镜像：`docker compose --profile prepull pull opensandbox-agent-sandbox-image opensandbox-execd-image opensandbox-egress-image`，随后启动或重启相关服务。

## 异常处理说明
若在OrbStack/Docker环境中启动失败，可能是httpx误解析自动注入的IPv6 CIDR导致，此时需显式覆盖NO_PROXY配置，避免内部调用被代理劫持。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/config/sandbox/opensandbox
