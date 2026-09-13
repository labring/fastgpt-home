---
title: 解决FastGPT debug模式执行工具函数代码时socket hang up报错问题
slug: /zh/troubleshoot/fastgpt-debug-socket-hang-up-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1902
source_type: GitHub issue
---

# 解决FastGPT debug模式执行工具函数代码时socket hang up报错问题

## 现象
在FastGPT的debug调试模式下，执行工具编写的函数代码时，日志中显示error => socket hang up报错。该问题出现在arm架构机器的私有部署环境（版本为fastgpt:v4.8.5、fastgpt-sandbox:v4.8.3），使用公有云版本或github镜像部署时也会复现。

## 可能原因
该报错可能与Node.js内置的快照机制和isolate vm运行环境的兼容性冲突有关。

## 排查步骤
1. 确认运行环境为arm架构机器，且使用fastgpt:v4.8.5、fastgpt-sandbox:v4.8.3版本。
2. 触发debug调试模式，执行工具编写的函数代码，观察是否出现socket hang up报错。
3. 尝试使用github镜像部署，验证报错是否仍会出现。
4. 检查sandbox模块的Dockerfile配置文件。

## 解决与验证
修改sandbox模块的Dockerfile，更新启动命令为`CMD ["node", "--no-node-snapshot", "projects/sandbox/dist/main.js"]`，重新打包镜像并部署。完成后再次在debug调试模式下执行工具编写的函数代码，确认socket hang up报错不再出现。

> 来源: [FastGPT GitHub issue #1902](https://github.com/labring/FastGPT/issues/1902)
