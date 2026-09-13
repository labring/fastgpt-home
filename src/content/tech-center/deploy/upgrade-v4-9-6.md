---
title: FastGPT V4.9.6版本升级内容与操作指南
slug: /zh/deploy/upgrade-v4-9-6
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/496
source_type: 官方文档
---

# FastGPT V4.9.6版本升级内容与操作指南

## 这个版本改了什么

新增内容包括：以MCP方式对外提供应用调用；支持以MCP SSE协议创建工具；批量执行节点支持交互节点，实现每一轮循环人工参与；增加工作台二级菜单并合并工具箱；新增grok3、GPT4.1、o系列、Gemini2.5模型系统配置。

优化项包括：增强工作流数据类型转化鲁棒性和兼容性；Python sandbox代码支持大数据输入；路径组件支持配置最后一步是否可点击；知识库工具调用结果自动补充图片域名；GitHub action runner升级成unbuntu24；去除飞书、公众号等三方渠道回复时前后多一个换行的问题；调整分块策略，大表格时不进行超大块合并，而是独立拆块；Iframe嵌套组件内置允许麦克风声明。

修复问题包括：修复子工作流包含交互节点时未成功恢复子工作流所有数据的问题；修复completion v1接口未接受interactive参数导致API调用失败的问题；修复连续工具调用上下文截断异常的问题。

## 升级前要确认的事

升级前需完成现有FastGPT环境的数据备份，确认当前部署环境支持Docker或Sealos部署方式，且已掌握FastGPT的访问地址与网络配置要求。

## 升级步骤（照做）

1. 做好数据备份。

2. 部署MCP server服务：
   - Docker部署：在`docker-compose.yml`文件中加入`fastgpt-mcp-server`服务，配置如下：
     ```yml
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
   - Sealos部署：在应用管理中增加`fastgpt-mcp-server`应用，镜像为`ghcr.io/labring/fastgpt-mcp_server:v4.9.6`，设置环境变量`FASTGPT_ENDPOINT=fastgpt的访问地址`。

3. 修改FastGPT容器环境变量：
   - 社区版：修改`config.json`配置文件，增加`"feconfigs.mcpServerProxyEndpoint": "fastgpt-mcp-server的访问地址"`，末尾不要携带/，示例配置：
     ```json
     {
       "feConfigs": {
         "lafEnv": "https://laf.dev",
         "mcpServerProxyEndpoint": "https://mcp.fastgpt.cn"
       }
     }
     ```
   - 商业版：在Admin后台的系统配置-基础配置-系统参数中的MCP转发服务地址，设置`fastgpt-mcp-server`的公网访问地址。

4. 更新镜像tag：更新FastGPT镜像tag为v4.9.6；更新FastGPT商业版镜像tag为v4.9.6；更新Sandbox镜像tag为v4.9.6；增加FastGPT mcp server镜像tag为v4.9.6；AIProxy无需更新。

## 升级后怎么验证

可通过以下方式验证升级效果：检查工作台是否显示新增的二级菜单并合并工具箱；尝试创建基于MCP SSE协议的工具，验证调用流程正常；运行包含交互节点的子工作流，确认子工作流数据可正常恢复；调用completion v1接口并传入interactive参数，验证API调用无失败；配置grok3、GPT4.1等新增模型，确认系统配置可正常保存并调用。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/496)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
