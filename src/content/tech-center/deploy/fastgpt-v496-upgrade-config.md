---
title: FastGPT V4.9.6版本升级与环境变量变更配置指南
slug: /zh/deploy/fastgpt-v496-upgrade-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/496
source_type: 官方文档
---

# FastGPT V4.9.6版本升级与环境变量变更配置指南

## 版本更新概述
本次FastGPT V4.9.6版本包含多项功能更新与修复：
新增内容包括：以MCP方式对外提供应用调用，支持以MCP SSE协议创建工具；批量执行节点支持交互节点，可实现每一轮循环都人工参与；增加工作台二级菜单并合并工具箱；新增grok3、GPT4.1、o系列、Gemini2.5模型的系统配置。
优化内容包括：增强工作流数据类型转化的鲁棒性和兼容性；Python sandbox代码支持大数据输入；路径组件支持配置最后一步是否可点击；知识库工具调用结果自动补充图片域名；将GitHub action runner升级为ubuntu24；修复飞书、公众号等三方渠道回复时前后多换行的问题；调整分块策略，大表格时不进行超大块合并而是独立拆块；Iframe嵌套组件内置允许麦克风声明。
修复的问题包括：子工作流包含交互节点时未成功恢复所有数据的问题；completion v1接口未接受interactive参数导致API调用失败的问题；连续工具调用时上下文截断异常的问题。

## 升级操作步骤
请按照以下步骤完成版本升级：
1. 做好数据备份：升级前务必完成系统数据备份，避免数据丢失。
2. 部署MCP server服务：
   - Docker部署：在docker-compose.yml文件中添加fastgpt-mcp-server服务，配置示例如下：
     ```yaml
     fastgpt-mcp-server:
       container_name: fastgpt-mcp-server
       image: ghcr.io/labring/fastgpt-mcp_server:v4.9.6
       ports:
         - 3005:3000
       networks:
         - fastgpt
       restart: always
       environment:
         - FASTGPT_ENDPOINT=http://fastgpt:3000
     ```
   - Sealos部署：在应用管理中新增fastgpt-mcp-server应用，镜像为`ghcr.io/labring/fastgpt-mcp_server:v4.9.6`，并设置环境变量`FASTGPT_ENDPOINT=fastgpt的访问地址`。
3. 修改FastGPT容器环境变量：
   - 社区版：修改config.json配置文件，添加`feconfigs.mcpServerProxyEndpoint`配置项，末尾请勿携带`/`，示例配置：
     ```json
     {
       "feConfigs": {
         "lafEnv": "https://laf.dev",
         "mcpServerProxyEndpoint": "https://mcp.fastgpt.cn"
       }
     }
     ```
   - 商业版：在Admin后台的系统配置-基础配置-系统参数中，将MCP转发服务地址设置为fastgpt-mcp-server的公网访问地址。
4. 更新镜像tag：将FastGPT镜像tag更新为`v4.9.6`，商业版镜像tag更新为`v4.9.6`，Sandbox镜像tag更新为`v4.9.6`，新增的FastGPT mcp server镜像tag更新为`v4.9.6`，AIProxy无需更新。

## 配置注意事项
配置过程中需注意以下细节：社区版的`mcpServerProxyEndpoint`地址末尾不能携带斜杠，否则可能导致服务连接异常；所有镜像的tag版本需保持一致，避免出现兼容性问题；Sealos部署时需确保fastgpt-mcp-server应用可以正常访问FastGPT服务的地址。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/496)
