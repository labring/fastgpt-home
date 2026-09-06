---
title: FastGPT Agent Sandbox 镜像与环境变量配置说明
slug: /zh/glossary/fastgpt-agent-sandbox-config-2
page_type: 术语速查
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-16/4161
source_type: 官方文档
---

# FastGPT Agent Sandbox 镜像与环境变量配置说明

## 一句话定义
Agent Sandbox 是 FastGPT 私有化部署中用于运行 Agent 任务的隔离运行环境，需通过环境变量完成相关配置。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
启用 Agent Sandbox 时，需在 `fastgpt-app` 和 `fastgpt-pro` 中同步配置环境变量。4.16.1 版本默认使用非 root 运行态镜像，标准配置项为 `AGENT_SANDBOX_OPENSANDBOX_IMAGE=registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-agent-sandbox:v0.3.1`。若沙盒需要安装 apt 依赖，需切换为 root 镜像，配置项为 `AGENT_SANDBOX_OPENSANDBOX_IMAGE=registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-agent-sandbox-root:v0.3.1`，同时可通过 `AGENT_SANDBOX_APT_MIRROR` 配置 apt 镜像源，示例为 `https://mirrors.tuna.tsinghua.edu.cn/ubuntu`。完整配置详情可参考官方 OpenSandbox 配置文档。

## 容易搞错的地方
需注意仅当沙盒需要安装 apt 依赖时，才切换为 root 镜像。配置需同时覆盖 `fastgpt-app` 和 `fastgpt-pro` 两个服务，遗漏任一服务会导致配置不生效。4.16.1 版本必须使用完整的运行态镜像地址，不可省略镜像仓库路径与版本号。

> 来源: [FastGPT 官方文档与源码](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-16/4161)
