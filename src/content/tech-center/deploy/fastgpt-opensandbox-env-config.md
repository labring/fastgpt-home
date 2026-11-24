---
title: 配置fastgpt-app与fastgpt-pro共用OpenSandbox服务环境变量
slug: /zh/deploy/fastgpt-opensandbox-env-config
page_type: 部署场景
source: https://doc.fastgpt.cn/self-host/config/sandbox/opensandbox
source_type: 官方文档小节
---

# 配置fastgpt-app与fastgpt-pro共用OpenSandbox服务环境变量

### 配置说明
此配置用于让fastgpt-app和fastgpt-pro共用同一套OpenSandbox服务配置，需在Compose文件的`x-agent-sandbox-config`字段下添加相关环境变量。配置时需遵循三个匹配规则：`AGENT_SANDBOX_OPENSANDBOX_API_KEY`必须与`[server].api_key`保持一致，`AGENT_SANDBOX_OPENSANDBOX_VOLUME_MANAGER_TOKEN`必须与`x-volume-manager-auth-token`一致，`AGENT_SANDBOX_PROXY_SECRET`必须与Agent Sandbox Proxy中的同名变量一致。此外，fastgpt-pro无需配置`AGENT_SANDBOX_PROXY_SECRET`和`AGENT_SANDBOX_PROXY_URL`，但必须配置`AGENT_SANDBOX_PREVIEW_PROXY_URL`。

### 具体配置项
在Compose文件的`x-agent-sandbox-config`中添加以下变量：
```yaml
AGENT_SANDBOX_PROVIDER: opensandbox
AGENT_SANDBOX_OPENSANDBOX_BASEURL: http://fastgpt-opensandbox-server:8090
AGENT_SANDBOX_OPENSANDBOX_API_KEY: replace_with_opensandbox_api_key
AGENT_SANDBOX_OPENSANDBOX_RUNTIME: docker
AGENT_SANDBOX_OPENSANDBOX_IMAGE: registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-agent-sandbox:v0.2.0
AGENT_SANDBOX_OPENSANDBOX_USE_SERVER_PROXY: true
AGENT_SANDBOX_OPENSANDBOX_VOLUME_MANAGER_URL: http://fastgpt-volume-manager:3000
AGENT_SANDBOX_OPENSANDBOX_VOLUME_MANAGER_TOKEN: replace_with_volume_manager_token
AGENT_SANDBOX_OPENSANDBOX_VOLUME_NAME_PREFIX: fastgpt-session
AGENT_SANDBOX_PROXY_SECRET: replace_with_32_chars_random_secret
AGENT_SANDBOX_PROXY_URL: wss://sandbox-proxy.example.com
AGENT_SANDBOX_PREVIEW_PROXY_URL: https://sandbox-proxy.example.com
AGENT_SANDBOX_CPU_COUNT: 1
AGENT_SANDBOX_MEMORY_MIB: 2048
AGENT_SANDBOX_STORAGE_SIZE_GI: 1
```
请根据实际环境替换示例中的占位符值，如`replace_with_opensandbox_api_key`等。

### 额外注意事项
预览代理需部署在与FastGPT主站不同的origin，即协议、域名或端口至少一项不同。Sandbox中可能包含用户生成的脚本，若预览地址与主站同源，脚本可能访问主站凭证或接口。预览链接为短期只读bearer capability，获得链接的用户可在有效期内修改URL路径读取同一Sandbox Workspace中的其他文件，请勿将链接分享给无权访问该Workspace的用户。从旧版Volume Manager升级时，需将原`VM_VOLUME_NAME_PREFIX`的值配置到`AGENT_SANDBOX_OPENSANDBOX_VOLUME_NAME_PREFIX`，避免历史持久卷无法按原名称清理。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/config/sandbox/opensandbox)
