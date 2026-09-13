---
title: 具体配置并使用MCP server调用FastGPT应用的操作方法
slug: /zh/tutorial/use-mcp-server-fastgpt
page_type: 教程
source: https://doc.fastgpt.cn/zh-CN/guide/build/publish/mcp_server
source_type: 官方文档
---

# 具体配置并使用MCP server调用FastGPT应用的操作方法

FastGPT 提供的 MCP server 地址，可被支持 MCP 协议的客户端用于调用 FastGPT 应用，实现知识库查询等相关处理功能。所有配置与调用流程均遵循MCP协议标准，无需额外开发适配逻辑。

## MCP server 配置步骤
打开支持 MCP 协议的客户端的配置页面，点击MCP选项进入MCP配置页，点击新建 MCP server 按钮，系统将跳转至 JSON 配置文件编辑界面。将提前获取的接入脚本内容复制至该 JSON 文件中，保存配置文件。返回客户端 MCP 管理页面，即可看到已创建的MCP server，将新建的 MCP server 设置为 enabled 状态。
配置过程的界面操作可参考以下图示：
|                            |                            |                            |
| -------------------------- | -------------------------- | -------------------------- |
| ![](/imgs/mcp_server6.png) | ![](/imgs/mcp_server7.png) | ![](/imgs/mcp_server8.png) |

## MCP server 调用验证
在客户端对话框中切换至 Agent 模型，仅该模型支持调用 MCP server。发送包含 fastgpt 相关的问题或内容后，客户端将自动调用标注为"查询 fastgpt 知识库"的 MCP 工具，即调用FastGPT应用处理该问题，并最终返回处理结果。验证过程的界面展示可参考以下图示：
|                            |                             |
| -------------------------- | --------------------------- |
| ![](/imgs/mcp_server9.png) | ![](/imgs/mcp_server10.png) |

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/publish/mcp_server)
> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/publish/mcp_server)

## 适用性与版本范围

本页适用于官方来源记录的 教程 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
