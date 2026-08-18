---
title: 配置Sealos Devbox沙盒为FastGPT启用Agent Sandbox服务
slug: /zh/deploy/sealos-devbox-fastgpt-sandbox-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/config/sandbox/sealosdevbox
source_type: 官方文档
---

# 配置Sealos Devbox沙盒为FastGPT启用Agent Sandbox服务

该功能仅面向FastGPT商业版用户开放，需联系客服申请密钥后方可使用，计费方式为按量计费，直接扣除sealos账户余额。使用前需确认已部署FastGPT商业版，且团队已获得Agent Sandbox使用权限，同时需提前向客服申请Sealos Devbox的服务地址、访问Token以及运行态镜像这三项接入信息。

## 配置步骤
需在`fastgpt-app`和`fastgpt-pro`两个服务中添加以下环境变量：
1.  启用Sealos Devbox作为沙盒提供商：`AGENT_SANDBOX_PROVIDER = sealosdevbox`
2.  配置Sealos Devbox服务API地址：`AGENT_SANDBOX_SEALOS_BASEURL = https://devbox-server.example.com`（替换为客服提供的地址）
3.  配置访问密钥：`AGENT_SANDBOX_SEALOS_TOKEN = replace_with_sealos_devbox_token`（替换为客服提供的Token）
4.  配置沙盒运行镜像：`AGENT_SANDBOX_SEALOS_IMAGE = hub.hzh.sealos.run/labring/devbox-sandbox:v0.2.0`（需使用客服提供或与当前FastGPT版本匹配的镜像）
5.  配置沙盒资源上限：`AGENT_SANDBOX_CPU_COUNT = 1`、`AGENT_SANDBOX_MEMORY_MIB = 2048`、`AGENT_SANDBOX_STORAGE_SIZE_GI = 1`
此外，`fastgpt-app`需额外配置`AGENT_SANDBOX_PROXY_URL`和`AGENT_SANDBOX_PREVIEW_PROXY_URL`，`fastgpt-pro`需配置`AGENT_SANDBOX_PREVIEW_PROXY_URL`，具体要求参考沙盒通用配置文档。

## 常见报错与注意事项
常见报错及解决方式如下：
1.  提示`AGENT_SANDBOX_PROXY_URL 或 AGENT_SANDBOX_PREVIEW_PROXY_URL is required`：需按沙盒通用配置要求补充对应环境变量。
2.  提示`AGENT_SANDBOX_SEALOS_IMAGE is required`：必须配置该参数，且需使用匹配当前FastGPT版本或客服提供的镜像。
3.  浏览器WebSocket连接失败：需检查代理服务是否可被浏览器访问，确认反向代理已支持WebSocket Upgrade；若FastGPT通过HTTPS访问，`AGENT_SANDBOX_PROXY_URL`需使用`wss://`协议，避免浏览器拦截混合内容。
4.  Proxy校验失败或返回401：需确认`fastgpt-app`和`fastgpt-agent-sandbox-proxy`中的`AGENT_SANDBOX_PROXY_SECRET`参数完全一致，且参数长度不少于32位。
需注意，该功能仅支持商业版用户，非商业场景无法使用。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/config/sandbox/sealosdevbox)
