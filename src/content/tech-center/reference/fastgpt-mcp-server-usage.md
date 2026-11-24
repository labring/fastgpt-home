---
title: 获取并配置FastGPT的MCP服务器调用地址
slug: /zh/reference/fastgpt-mcp-server-usage
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/build/publish/mcp_server
source_type: 官方文档小节
---

# 获取并配置FastGPT的MCP服务器调用地址

## 结论
创建FastGPT的MCP服务器后，点击「开始使用」即可获取访问地址。通过配置支持MCP协议的客户端，即可调用该服务器运行FastGPT应用处理问题。

## 具体怎么做
1. 获取MCP服务器地址：创建完成MCP server后，点击「开始使用」即可获取对应的访问地址。
2. 配置客户端MCP服务：进入支持MCP协议的客户端的MCP配置页面，点击新建MCP server按钮，跳转至JSON配置文件界面后，将第二步获取的接入脚本复制到该JSON文件中并保存。
3. 启用并调用服务：返回客户端的MCP管理页面，将新建的MCP server设置为enabled状态。切换至Agent模型，发送相关问题即可触发MCP工具调用FastGPT应用处理问题。

## 注意事项
- 仅Agent模型支持调用MCP server，其他模型无法触发调用。
- 需先完成MCP服务器创建，未创建则无法获取有效访问地址。
- 复制接入脚本时需保证内容完整，格式错误会导致客户端连接失败。
- 必须将新建的MCP server设置为enabled状态，未启用的服务不会被客户端识别。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/build/publish/mcp_server)
