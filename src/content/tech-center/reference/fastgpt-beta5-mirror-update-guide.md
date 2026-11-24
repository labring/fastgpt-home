---
title: FastGPT 4.15.0-beta5版本镜像更新与配置操作指南
slug: /zh/reference/fastgpt-beta5-mirror-update-guide
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/4-15/41505
source_type: 官方文档小节
---

# FastGPT 4.15.0-beta5版本镜像更新与配置操作指南

## 结论
本次升级需更新FastGPT主服务、商业版、插件、aiproxy等核心镜像的指定tag。启用Agent Sandbox时，还需新增并配置代理镜像，同步修改docker-compose.yml完成服务配置。

## 具体怎么做
1. 更新核心镜像tag：
   - fastgpt-app（主服务）、fastgpt-pro（商业版）：v4.15.0-beta5
   - fastgpt-plugin：v1.0.0-beta5
   - aiproxy：v0.6.2
2. 若启用Agent Sandbox，执行以下操作：
   - 更新fastgpt-agent-sandbox镜像tag为v0.2.0-beta2
   - 在docker-compose.yml中新增fastgpt-agent-sandbox-proxy服务，配置示例：
     ```yaml
     fastgpt-agent-sandbox-proxy:
       image: registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-agent-sandbox-proxy:v0.2.0-beta2
       container_name: fastgpt-agent-sandbox-proxy
       restart: always
       ports:
         - 3006:1006
       networks:
         - fastgpt
       environment:
         PORT: 1006
         AGENT_SANDBOX_PROXY_SECRET: replace_with_32_chars_random_secret
         FASTGPT_APP_URL: http://fastgpt:3000
         FASTGPT_APP_REQUEST_TIMEOUT_SECS: 10
         RUST_LOG: info,fastgpt_agent_sandbox_proxy=debug
         # AGENT_SANDBOX_PROXY_REWRITE_HOST: host.docker.internal
     ```
   - 海外部署可将image替换为`ghcr.io/labring/fastgpt-agent-sandbox-proxy:v0.2.0-beta2`

## 注意事项
1. AGENT_SANDBOX_PROXY_SECRET必须与FastGPT配置中的对应字段完全一致。
2. FASTGPT_APP_URL需按实际docker-compose服务名调整，默认服务名为fastgpt。
3. 仅当上游sandbox endpoint返回localhost/127.0.0.1且proxy容器无法访问时，才需配置AGENT_SANDBOX_PROXY_REWRITE_HOST。
4. 国内与海外部署需使用对应镜像源，不可混用。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-15/41505)
