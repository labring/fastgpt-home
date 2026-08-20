---
title: 配置与使用FastGPT MCP Server对外提供应用调用能力
slug: /zh/integration/fastgpt-mcp-server-usage
page_type: 集成与发布渠道
source: https://doc.fastgpt.cn/zh-CN/guide/build/publish/mcp_server
source_type: 官方文档
---

# 配置与使用FastGPT MCP Server对外提供应用调用能力

## MCP Server 概述
MCP（Model Context Protocol）是Anthropic在2024年11月发布的通信协议，用于统一AI模型与外部系统的交互方式，降低跨系统通信复杂度。FastGPT的MCP Server功能允许将平台上已构建的多个应用，以MCP协议对外提供调用能力，当前采用SSE通信协议，后续将替换为HTTP streamable协议。私有化部署的FastGPT需升级至v4.9.6及以上版本才能使用该功能。

## 快速配置与使用流程
1. **创建MCP Server**：登录FastGPT后打开工作台，点击「MCP server」进入管理页面，该页面可查看所有已创建的MCP Server及其关联应用数量，创建时可自定义服务名称并选择需要对外暴露的FastGPT应用。
2. **获取访问地址**：MCP Server创建完成后，点击「开始使用」即可获取对应的访问地址。
3. **客户端调用配置**：在支持MCP协议的客户端中，将获取到的接入脚本复制到JSON配置文件中，保存后在客户端的MCP管理页面启用该服务，切换至Agent模型后即可发起请求，客户端将通过MCP工具调用FastGPT应用处理问题并返回结果。

## 私有化部署额外配置
如果使用私有化部署的FastGPT，需额外完成以下配置：
1. 修改`docker-compose.yml`文件，添加`fastgpt-mcp-server`服务，配置内容包括容器名称、镜像地址、端口映射、网络、重启策略及FastGPT内部访问地址：
```yaml
fastgpt-mcp-server:
  container_name: fastgpt-mcp-server
  image: ghcr.io/labring/fastgpt-mcp_server:latest
  ports:
    - 3005:3000
  networks:
    - fastgpt
  restart: always
  environment:
    - FASTGPT_ENDPOINT=http://fastgpt:3000
```
2. 修改FastGPT容器的环境变量，添加`SSE_MCP_SERVER_PROXY_ENDPOINT`，值为客户端可访问的`fastgpt-mcp-server`地址，末尾请勿携带`/`，例如`https://mcp.fastgpt.cn`。
3. 执行`docker-compose down`和`docker-compose up -d`重启容器，重启完成后即可在FastGPT工作台看到MCP Server的管理选项。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/guide/build/publish/mcp_server)
