---
title: FastGPT docker compose部署新增agent-sandbox配置指南
slug: /zh/reference/fastgpt-docker-compose-add-agent-sandbox-config
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/4-14/41410
source_type: 官方文档小节
---

# FastGPT docker compose部署新增agent-sandbox配置指南

## 结论
本页针对docker compose部署的FastGPT，提供新增agent-sandbox配置的操作方法。sealos商业版用户请联系官方支持人员获取专属沙盒服务方案。

## 具体怎么做
1. 参考官方最新yml部署文件，在本地yml文件顶部添加`x-volume-manager-auth-token: &x-volume-manager-auth-token 'vmtoken'`变量配置。
2. 在services配置中新增5个服务：opensandbox-server、opensandbox-agent-sandbox-image、opensandbox-execd-image、opensandbox-egress-image、fastgpt-volume-manager。
3. 调整networks配置，建议完全参考官方最新yml文件修改。
4. 在yml文件底部复制添加configs配置内容。
5. 修改fastgpt-app或fastgpt-pro的环境变量，添加以下配置：
```yaml
# ==================== Agent sandbox 配置 ====================
AGENT_SANDBOX_PROVIDER: opensandbox
AGENT_SANDBOX_OPENSANDBOX_BASEURL: http://opensandbox-server:8090
AGENT_SANDBOX_OPENSANDBOX_API_KEY:
AGENT_SANDBOX_OPENSANDBOX_RUNTIME: docker
AGENT_SANDBOX_OPENSANDBOX_IMAGE_REPO: registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-agent-sandbox
AGENT_SANDBOX_OPENSANDBOX_IMAGE_TAG: v0.1
AGENT_SANDBOX_OPENSANDBOX_USE_SERVER_PROXY: true
# Volume 持久化配置（opensandbox provider 下可选）
AGENT_SANDBOX_ENABLE_VOLUME: true
AGENT_SANDBOX_VOLUME_MANAGER_URL: http://volume-manager:3000
AGENT_SANDBOX_VOLUME_MANAGER_TOKEN: *x-volume-manager-auth-token
```

## 注意事项
1. 本操作仅适用于docker compose部署方案，sealos商业版用户请联系官方支持人员。
2. 配置需严格匹配官方最新yml文件格式，避免语法错误。
3. AGENT_SANDBOX_OPENSANDBOX_API_KEY留空即可，无需额外填写。
4. 镜像仓库地址和标签为官方指定值，请勿随意修改。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-14/41410)
