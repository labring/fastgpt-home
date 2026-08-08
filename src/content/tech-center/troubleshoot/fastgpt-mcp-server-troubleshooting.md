---
title: FastGPT接入MCP工具服务器的常见异常排查
slug: /zh/troubleshoot/fastgpt-mcp-server-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6197
source_type: GitHub issue
---

# FastGPT接入MCP工具服务器的常见异常排查

## 现象
在FastGPT的MCP配置界面添加服务器地址后，未自动加载可用工具；调用配置后的工具时出现连接失败或无响应提示；工作区查看器无法正常浏览、预览或下载文件。

## 可能原因
1. MCP工具服务器未通过docker-compose正常启动，或服务器防火墙未开放对应端口；
2. FastGPT配置的MCP服务器地址未添加要求的/sse后缀，导致无法建立连接；
3. FastGPT部署环境与MCP服务器之间存在网络隔离，无法访问目标端口；
4. 工作区查看器的user_id、chat_id参数未与当前会话匹配，导致无法访问对应文件空间。

## 排查步骤
1. 检查MCP工具服务器运行状态：登录部署服务器，执行`docker-compose ps`命令，确认服务状态为Up，且端口18089（MCP服务端口）、3100（工作区查看器端口）正常监听。
2. 核对MCP服务器地址配置：进入FastGPT的MCP配置界面，确认服务器地址格式为`http://your-server-ip:18089/sse`，未遗漏/sse后缀。
3. 测试网络连通性：在FastGPT部署环境中访问`http://your-server-ip:18089/sse`，确认可正常建立连接。
4. 检查工作区查看器参数：确认访问地址中`user_id`和`chat_id`参数与当前会话参数匹配。

## 解决与验证
1. 若服务未正常启动：执行`docker-compose up -d --build`重新构建并启动服务，等待服务运行正常。
2. 若地址配置错误：修正MCP服务器地址为带/sse后缀的正确格式，保存配置后刷新FastGPT工具列表。
3. 若网络不通：调整服务器防火墙规则，开放18089和3100端口，或配置网络策略确保两端互通，需按实际环境确认。
4. 验证效果：在FastGPT对话界面尝试调用文件操作类工具，或访问工作区查看器地址，确认可正常使用功能。

> 来源：https://github.com/labring/FastGPT/issues/6197
