---
title: 启动FastGPT插件本地远程调试会话的具体操作步骤
slug: /zh/reference/fastgpt-plugin-local-remote-debug
page_type: 技术速查
source: https://doc.fastgpt.cn/plugin/system-tool-development
source_type: 官方文档小节
---

# 启动FastGPT插件本地远程调试会话的具体操作步骤

## 结论
可以通过fastgpt-plugin dev命令启动FastGPT插件本地远程调试会话。支持交互模式与非交互模式，非交互模式适用于脚本或Agent场景，连接成功后可复用本地配置。

## 具体怎么做
1. 交互模式：在插件目录或包含多个插件目录的工作区中运行`fastgpt-plugin dev`，启动后将FastGPT页面复制的调试链接粘贴到TUI中，CLI会用链接中的connection key换取短期WSS connect token，并将本地插件挂载到FastGPT的调试通道。
2. 非交互完整调试链接模式：运行命令`fastgpt-plugin dev --no-interactive --connect "https://fastgpt.example.com/api/plugin/debug-channel/connection-key/exchange?connectionKey=fpg_dbg_..."`
3. 非交互裸connection key模式：先配置环境变量`FASTGPT_PLUGIN_DEBUG_CONNECT_URL = https://fastgpt.example.com/api/plugin/debug-channel/connection-key/exchange`，再运行`fastgpt-plugin dev --no-interactive --connect "fpg_dbg_..."`
4. 配置复用与更新：连接成功后CLI会保存connection key，直接运行`fastgpt-plugin dev`即可复用配置；在TUI中按c键可重新输入并保存新的调试链接或connection key。

## 注意事项
1. 仅可在插件目录或包含多个插件目录的工作区中运行启动命令。
2. 使用裸connection key的非交互模式时，必须正确配置FASTGPT_PLUGIN_DEBUG_CONNECT_URL环境变量。
3. 按c键更新配置仅在TUI交互模式下生效。
4. connection key需为fpg_dbg_开头的有效格式。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/plugin/system-tool-development)
