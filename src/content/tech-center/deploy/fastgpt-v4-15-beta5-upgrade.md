---
title: FastGPT V4.15.0-beta5版本升级配置与功能变更说明
slug: /zh/deploy/fastgpt-v4-15-beta5-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41505
source_type: 官方文档
---

# FastGPT V4.15.0-beta5版本升级配置与功能变更说明

# 版本核心变更概述
本版本存在多处环境变量调整与功能更新，其中ApiKey功能不再区分应用密钥与系统密钥，仅保留系统密钥，兼容OpenAI SDK时可通过apikey-appId的方式传递Token，现有ApiKey仍保持兼容。同时新增了沙盒相关的配置项，需根据部署场景决定是否启用。

# 可执行升级步骤
1.  **环境变量配置**
    为fastgpt和fastgpt-pro新增以下环境变量：
    - `CHAT_TITLE_MODEL`：用于自动生成对话标题，示例值为`deepseek-v4-flash`
    - `INVOKE_TOKEN_SECRET`：32位以上密钥，作为反向调用接口的JWT密钥
    若启用Agent Sandbox，还需新增：
    - `AGENT_SANDBOX_PROXY_SECRET`：与fastgpt-agent-sandbox-proxy共用的32位以上随机密钥
    - `AGENT_SANDBOX_PROXY_URL`：浏览器可访问的agent-sandbox-proxy WebSocket地址，若通过HTTPS域名代理需使用`wss://`格式，示例为`ws://{{host}}:3006`
2.  **镜像与服务更新**
    更新各服务镜像Tag：
    - fastgpt-app（主服务）、fastgpt-pro：`v4.15.0-beta5`
    - fastgpt-plugin：`v1.0.0-beta5`
    - aiproxy：`v0.6.2`
    启用Agent Sandbox时，需新增`fastgpt-agent-sandbox-proxy`服务，镜像Tag为`v0.2.0-beta2`，并更新`fastgpt-agent-sandbox`镜像为`v0.2.0-beta2`。以下为国内源的服务配置示例：
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
    ```
3.  **旧沙盒归档脚本**
    执行以下命令归档旧沙盒workspace到S3，释放不活跃沙盒资源：
    ```bash
    curl --location --request POST https://{{host}}/api/admin/initSandboxArchive \
    --header rootkey: {{rootkey}} \
    --header Content-Type: application/json \
    -d '{\"runArchive\":true, \"inactiveDays\":0}'
    ```

# 新增优化与修复内容
本次更新新增多项功能：HTTP节点支持配置忽略TLS证书校验，支持目录深度环境变量，对话框新增快速滚动到底部按键，支持通过模型生成对话标题，优化了Agent上下文压缩逻辑与长名称展示效果。修复了S3私有对象未绑定鉴权资源导致的跨资源文件访问风险，移除了内置LLM请求中的`temperature`和`max_tokens`参数以兼容更多模型。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41505
