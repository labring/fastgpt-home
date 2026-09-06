---
title: FastGPT OpenSandbox运行环境配置与CPU架构适配
slug: /zh/deploy/fastgpt-opensandbox-env-config-2
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/config/sandbox/opensandbox
source_type: 官方文档
---

# FastGPT OpenSandbox运行环境配置与CPU架构适配

Sandbox是FastGPT的代码沙箱服务，对外暴露`/sandbox`执行接口，供主应用通过`CODE_SANDBOX_URL`调用，承载代码执行相关能力。需部署`projects/code-sandbox`服务，主应用通过配置`CODE_SANDBOX_URL`指向该服务。

## 运行态镜像与CPU架构适配
AGENT_SANDBOX_OPENSANDBOX_IMAGE是创建Agent Sandbox时使用的完整运行态镜像地址。默认场景使用`fastgpt-agent-sandbox`镜像，该镜像以非root用户运行。需要修改`/etc/apt`或安装apt依赖时，需使用`fastgpt-agent-sandbox-root`镜像，并同时配置`AGENT_SANDBOX_APT_MIRROR`。
官方镜像的同一tag同时包含amd64和arm64架构，两个架构使用相同的环境变量配置，Docker会根据OpenSandbox Server所在宿主机的架构自动选择镜像。官方镜像地址如下：
| 用途 | 镜像地址 |
| --- | --- |
| 非root运行 | registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-agent-sandbox:v0.3.1 |
| root运行 | registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-agent-sandbox-root:v0.3.1 |
可将全球镜像源中的`registry.cn-hangzhou.aliyuncs.com/fastgpt`替换为`ghcr.io/labring`。使用私有镜像仓库时，需确保镜像tag保留amd64和arm64 manifest；若仓库仅提供单架构镜像，需将`AGENT_SANDBOX_OPENSANDBOX_IMAGE`配置为与宿主机架构匹配的镜像地址。

## 核心环境变量配置
需配置以下关键环境变量，确保与对应组件参数一致：
| 环境变量名 | 配置要求 |
| --- | --- |
| AGENT_SANDBOX_OPENSANDBOX_API_KEY | 与`[server].api_key`保持一致 |
| AGENT_SANDBOX_OPENSANDBOX_VOLUME_MANAGER_TOKEN | 与`x-volume-manager-auth-token`保持一致 |
| AGENT_SANDBOX_PROXY_SECRET | 与Agent Sandbox Proxy中的同名变量保持一致 |
| AGENT_SANDBOX_PROXY_URL | 与Agent Sandbox Proxy中的同名变量保持一致 |
| AGENT_SANDBOX_PREVIEW_PROXY_URL | fastgpt-pro版本必须配置 |
fastgpt-pro版本不提供Sandbox Editor和WebSocket Proxy链路，无需配置`AGENT_SANDBOX_PROXY_SECRET`和`AGENT_SANDBOX_PROXY_URL`。

## 安全与升级注意事项
预览代理需部署在与FastGPT主站不同的origin（协议、域名或端口至少一项不同）。Sandbox中的HTML可能包含用户生成的脚本，若预览地址与主站同源，脚本可能访问主站凭证或接口。预览链接为短期只读Bearer [REDACTED_CREDENTIAL]，获得链接的用户可在有效期内通过修改URL路径读取同一Sandbox Workspace中的其他文件，请勿将链接分享给无权访问该Workspace的用户。
部分环境变量需严格匹配对应配置，配置不一致会导致服务调用失败。从旧版Volume Manager升级时，需将原`VM_VOLUME_NAME_PREFIX`的值配置到`AGENT_SANDBOX_OPENSANDBOX_VOLUME_NAME_PREFIX`，避免历史持久卷无法按原名称清理。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/config/sandbox/opensandbox)
> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/config/env)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
