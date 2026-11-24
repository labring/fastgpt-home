---
title: FastGPT OpenSandbox 沙盒运行环境的配置与使用说明
slug: /zh/reference/fastgpt-opensandbox-config-guide
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/config/sandbox/opensandbox
source_type: 官方文档小节
---

# FastGPT OpenSandbox 沙盒运行环境的配置与使用说明

## 结论
OpenSandbox 是 FastGPT 专为自托管 Agent/Skill 沙盒运行环境设计的配置方案，适用于需要独立托管智能体或技能沙盒的业务场景。FastGPT 通过 OpenSandbox Server 完成沙盒的创建工作，同时通过 Agent Sandbox Proxy 为浏览器端提供文件管理、终端操作和预览访问的能力，满足自托管场景下的沙盒使用需求。

## 具体怎么做
可通过以下流程完成 OpenSandbox 配置：
1. 采用自部署方式，支持 Docker Compose 部署、Sealos 部署或本地开发部署。
2. 配置 OpenSandbox Server，用于创建和管理沙盒运行环境。
3. 配置 Agent Sandbox Proxy，实现浏览器与沙盒环境的连接，提供文件、终端和预览访问的核心功能。

## 注意事项
⚠️ OpenSandbox 方案默认未配置网络隔离策略。如果有安全隔离的需求，请自行补充对应的网络隔离措施，保障沙盒环境的安全性。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/config/sandbox/opensandbox)
