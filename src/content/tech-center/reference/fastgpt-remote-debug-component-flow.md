---
title: FastGPT远程调试链路的组件组成及标准调用流程说明
slug: /zh/reference/fastgpt-remote-debug-component-flow
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/config/remote-debug-suite
source_type: 官方文档小节
---

# FastGPT远程调试链路的组件组成及标准调用流程说明

## 结论
远程调试链路包含FastGPT主服务、Plugin Server、Connection Gateway、Redis、fastgpt-plugin dev五类组件。完整调用流程围绕调试通道创建、CLI连接、调试请求转发与结果返回展开。

## 具体怎么做
1. 开发者在FastGPT开启调试通道，FastGPT向Plugin Server创建debug channel，Plugin Server返回connectionKey、connectionUrl、source。
2. 开发者执行命令`fastgpt-plugin dev --connect <connectionUrl>`启动本地CLI工具。
3. CLI向FastGPT兑换connectionKey，FastGPT转发connectionKey exchange请求至Plugin Server，Plugin Server返回gatewayUrl、connectToken、source。
4. CLI通过WebSocket绑定到Connection Gateway。
5. FastGPT向Plugin Server调用debug source下的插件，Plugin Server向Gateway发送plugin-debug.run请求。
6. Gateway转发调试请求至CLI，CLI执行后返回结果至Gateway，Gateway流式返回结果至Plugin Server。

## 注意事项
1. Redis需正常运行，用于存储Gateway session、source owner和mailbox数据。
2. 调试流程需严格遵循通道创建→CLI连接→请求调用的顺序，不可跳过前置步骤。
3. 各环节传递的connectionKey、connectionUrl等参数需准确无误，避免连接失败。
4. WebSocket长连接需保持稳定，否则会中断调试链路。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/config/remote-debug-suite)
