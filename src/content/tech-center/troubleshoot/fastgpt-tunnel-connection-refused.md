---
title: 解决FastGPT部署后出现隧道代理连接拒绝的报错问题
slug: /zh/troubleshoot/fastgpt-tunnel-connection-refused
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/242
source_type: GitHub issue
---

# 解决FastGPT部署后出现隧道代理连接拒绝的报错问题

## 现象
用户使用docker-compose私有部署FastGPT，系统环境为ubuntu22.04。部署日志中会重复打印【索引】任务完成，随后MongoDB容器输出多条网络连接接收日志，FastGPT容器最终抛出报错：`Error: tunneling socket could not be established, cause=connect ECONNREFUSED 127.0.0.1:7890`，并附带Node.js调用栈信息，涉及`tunnel.js`模块与Node.js网络请求相关逻辑。

## 可能原因
该报错的直接原因为程序尝试通过隧道代理访问资源，但本地127.0.0.1:7890端口未运行可用的代理服务，导致连接被拒绝。结合部署场景来看，可能是部署过程中配置了代理相关设置，后续未正确清理或代理服务未正常启动。

## 排查步骤
1.  检查系统或FastGPT容器内是否存在代理相关配置，确认是否有强制使用隧道代理的设置。
2.  检查本地127.0.0.1:7890端口的运行状态，可使用系统自带的网络排查工具确认端口是否被监听。
3.  查看FastGPT容器的完整启动日志，确认报错的触发链路与上下文信息。
4.  确认部署过程中是否配置了代理相关参数，若无需代理则移除对应配置。

## 解决与验证
若无需使用代理，可移除系统或FastGPT容器内的代理相关配置，随后重启FastGPT服务。若需要使用代理，需确保127.0.0.1:7890端口的代理服务正常运行。验证时可查看FastGPT容器日志，确认不再出现隧道代理连接拒绝的报错，且索引任务可正常完成。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/242)
