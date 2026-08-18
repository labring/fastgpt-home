---
title: FastGPT V4.9.6版本升级操作与配置变更说明
slug: /zh/deploy/fastgpt-v4-9-6-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/496
source_type: 官方文档
---

# FastGPT V4.9.6版本升级操作与配置变更说明

### 版本变更概览
FastGPT V4.9.6版本包含多项更新：新增MCP方式对外提供应用调用，支持以MCP SSE协议创建工具；批量执行节点支持交互节点，可实现每轮循环人工参与；增加工作台二级菜单并合并工具箱；新增grok3、GPT4.1、o系列、Gemini2.5模型的系统配置。优化内容包括增强工作流数据类型转化的鲁棒性与兼容性，Python sandbox支持大数据输入，路径组件可配置最后一步是否可点击，知识库工具调用结果自动补充图片域名，GitHub action runner升级至ubuntu24，修复飞书等渠道回复时多换行问题，调整分块策略使大表格独立拆块而非合并，Iframe嵌套组件内置允许麦克风声明。修复的问题包括子工作流含交互节点时数据恢复失败、completion v1接口未接受interactive参数导致API调用失败、连续工具调用上下文截断异常。

### 升级前置注意事项
升级前需完成数据备份，同时需注意两处易错点：一是修改MCP服务访问地址时，末尾不可携带斜杠；二是所有需更新的镜像tag需统一使用v4.9.6，AIProxy无需执行更新操作。

### 升级操作步骤
1.  **部署MCP server服务**
    Docker部署：在docker-compose.yml中添加fastgpt-mcp-server服务，配置如下：
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
    Sealos部署：在应用管理中新增fastgpt-mcp-server应用，使用指定镜像，并设置环境变量`FASTGPT_ENDPOINT=fastgpt的访问地址`。
2.  **修改FastGPT容器环境变量**
    社区版：修改config.json配置文件，添加`feconfigs.mcpServerProxyEndpoint`为fastgpt-mcp-server的访问地址，示例格式为`{"feConfigs": {"lafEnv": "https://laf.dev", "mcpServerProxyEndpoint": "https://mcp.fastgpt.cn"}}`。
    商业版：在Admin后台的系统配置-基础配置-系统参数的MCP转发服务地址中，设置fastgpt-mcp-server的公网访问地址。
3.  **更新镜像tag**：将FastGPT社区版、商业版镜像tag设为v4.9.6，Sandbox镜像tag设为v4.9.6，新增的mcp server镜像tag为v4.9.6。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/496)
