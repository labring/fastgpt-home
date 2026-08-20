---
title: 配置并使用FastGPT MCP Server调用已创建的AI应用
slug: /zh/integration/fastgpt-mcp-server-config
page_type: 集成与发布渠道
source: https://doc.fastgpt.cn/zh-CN/guide/build/publish/mcp_server
source_type: 官方文档
---

# 配置并使用FastGPT MCP Server调用已创建的AI应用

## MCP Server功能介绍
MCP协议（Model Context Protocol）由Anthropic在2024年11月初发布，用于统一AI模型与外部系统的通信方式。FastGPT的MCP Server功能允许选择多个已构建的FastGPT应用，以MCP协议对外提供调用这些应用的能力。当前FastGPT提供的MCP Server基于SSE通信协议，未来将替换为HTTP streamable协议。使用该功能的私有化部署版本需升级至v4.9.6及以上。

## 快速配置与使用步骤
1. 创建MCP Server：登录FastGPT后进入工作台，点击MCP server进入管理页面，可自定义服务器名称并选择需要关联的FastGPT应用；
2. 获取访问地址：创建完成后点击“开始使用”，即可获取MCP Server的访问地址；
3. 客户端调用：在支持MCP协议的客户端中，将获取到的接入脚本复制到JSON配置文件，保存后在客户端MCP管理页面启用该服务，切换至Agent模型后即可通过发送问题调用关联的FastGPT应用。

## 私有化部署注意事项
私有化部署FastGPT时，需先完成两项配置修改：首先在docker-compose.yml文件中添加fastgpt-mcp-server服务，配置容器名称、镜像地址、端口映射（3005:3000）、网络、重启策略及FASTGPT_ENDPOINT环境变量（值为http://fastgpt:3000）；其次在FastGPT容器中配置SSE_MCP_SERVER_PROXY_ENDPOINT环境变量，值为客户端可访问的MCP Server地址，末尾不得携带/，例如https://mcp.fastgpt.cn。完成配置后执行docker-compose down和docker-compose up -d重启服务，重启后即可在工作台看到MCP Server服务选项。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/guide/build/publish/mcp_server)
