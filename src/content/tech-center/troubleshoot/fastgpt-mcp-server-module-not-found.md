---
title: 解决FastGPT MCP服务器启动时找不到指定模块的问题
slug: /zh/troubleshoot/fastgpt-mcp-server-module-not-found
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4567
source_type: GitHub issue
---

# 解决FastGPT MCP服务器启动时找不到指定模块的问题

## 现象
fastgpt-mcp-server 容器启动时抛出模块未找到错误，报错信息为：
```
Error: Cannot find module '/app/projects/mcp_server/dist/index.js'
    at Module._resolveFilename (node:internal/modules/cjs/loader:1145:15)
    at Module._load (node:internal/modules/cjs/loader:986:27)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:174:12)
    at node:internal/main/run_main_module:28:49 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}
```
容器使用 Node.js v20.14.0，最终以退出码 1 异常退出。

## 可能原因
1. MCP 服务器项目未执行构建流程，未生成 dist 目录及 index.js 产物文件
2. 容器启动配置中指定的入口文件路径与实际部署的文件路径不匹配
3. 部署过程中遗漏了构建产物的复制步骤，导致产物未正确放置到容器指定目录

## 排查步骤
1. 进入 fastgpt-mcp-server 容器，执行 `ls /app/projects/mcp_server/` 命令，查看是否存在 dist 目录及其中的 index.js 文件
2. 检查部署脚本或 Dockerfile 配置，确认是否包含 MCP 服务器项目的构建步骤，例如依赖安装与代码编译命令
3. 核对容器启动命令或配置文件中指定的入口文件路径，确认与实际部署的文件路径一致
4. 检查容器挂载的卷配置，确认是否正确指向了包含构建产物的本地目录

## 解决与验证
根据排查结果执行对应操作：
1. 若未执行构建：在 MCP 服务器项目目录下执行对应构建命令（需按实际项目配置执行），生成 dist 目录及 index.js 文件
2. 若路径不匹配：修改启动配置中的入口文件路径，使其指向实际存在的 index.js 文件
3. 若遗漏产物复制：调整部署流程，将构建后的 dist 产物复制到容器的 `/app/projects/mcp_server/` 目录下
完成操作后，重新启动 fastgpt-mcp-server 容器，确认容器不再抛出 MODULE_NOT_FOUND 错误，进程正常运行。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4567)
