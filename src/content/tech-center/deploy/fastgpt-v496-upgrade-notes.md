---
title: FastGPT V4.9.6版本升级操作与变更说明
slug: /zh/deploy/fastgpt-v496-upgrade-notes
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/496
source_type: 官方文档
---

# FastGPT V4.9.6版本升级操作与变更说明

## 版本核心变更
FastGPT V4.9.6 包含环境变量变更，新增多项功能与优化修复。新增内容包括以MCP方式对外提供应用调用，支持MCP SSE协议创建工具，批量执行节点支持交互节点实现循环人工参与，新增工作台二级菜单并合并工具箱，新增grok3、GPT4.1、o系列、Gemini2.5模型的系统配置。优化项涵盖工作流数据类型转化的鲁棒性与兼容性，Python沙盒代码支持大数据输入，路径组件可配置最后一步是否可点击，知识库工具调用结果自动补充图片域名，GitHub action runner升级至Ubuntu24，修复了飞书、公众号等渠道回复多换行的问题，调整分块策略，大表格时不进行超大块合并，直接独立拆块，Iframe嵌套组件内置麦克风权限声明。修复的问题包括子工作流含交互节点时未恢复全部数据，completion v1接口未接受interactive参数导致调用失败，连续工具调用上下文截断异常。

## 升级操作步骤
1. 完成数据备份。
2. 部署MCP server服务：
   - Docker部署：在docker-compose.yml文件中添加fastgpt-mcp-server服务，配置container_name为fastgpt-mcp-server，镜像为ghcr.io/labring/fastgpt-mcp_server:v4.9.6，端口映射3005:3000，网络使用fastgpt，重启策略设为always，环境变量设置FASTGPT_ENDPOINT=http://fastgpt:3000。
   - Sealos部署：在应用管理中新增fastgpt-mcp-server应用，镜像为ghcr.io/labring/fastgpt-mcp_server:v4.9.6，设置环境变量FASTGPT_ENDPOINT为fastgpt的访问地址。
3. 修改FastGPT容器环境变量：
   - 社区版：修改config.json配置文件，添加feconfigs.mcpServerProxyEndpoint字段，值为fastgpt-mcp-server的访问地址，末尾不要携带/，示例格式为`{ feConfigs : { lafEnv : https://laf.dev , mcpServerProxyEndpoint : https://mcp.fastgpt.cn } }`。
   - 商业版：在Admin后台的系统配置-基础配置-系统参数中，在MCP转发服务地址字段设置fastgpt-mcp-server的公网访问地址。
4. 更新镜像标签：将FastGPT镜像tag更新为v4.9.6，商业版镜像tag更新为v4.9.6，Sandbox镜像tag更新为v4.9.6，新增的FastGPT mcp server镜像tag更新为v4.9.6，AIProxy无需更新。

## 注意事项与边界
升级前必须完成数据备份，避免数据丢失。配置MCP服务地址时，需确保地址格式正确，社区版配置的mcpServerProxyEndpoint末尾不能携带斜杠。部分优化项仅针对特定场景生效，例如大表格分块策略调整仅在处理超大表格时生效。修复的completion v1接口参数问题，仅影响使用该接口且需要交互参数的调用场景。如果未使用MCP相关功能，仍需按照步骤部署MCP server服务，否则可能出现功能异常。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/496)
