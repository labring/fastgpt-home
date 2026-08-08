---
title: 解决FastGPT私有部署代码沙箱Bun段错误启动失败问题
slug: /zh/troubleshoot/fastgpt-code-sandbox-bun-segfault
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6893
source_type: GitHub issue
---

# 解决FastGPT私有部署代码沙箱Bun段错误启动失败问题

## 现象
用户在FastGPT v4.14.18私有部署版本中，启动`fastgpt-code-sandbox`容器后，通过`docker logs fastgpt-code-sandbox --tail 200`查看日志，会重复出现以下内容：Bun v1.3.13运行时触发`panic: Segmentation fault at address 0x0`，提示Bun存在自身bug，随后服务尝试重启后再次重复崩溃，日志中还会伴随`dotenv@17.3.1`的环境变量注入提示，最终服务无法正常稳定启动。

## 可能原因
根据日志中的崩溃提示，该问题为Bun运行时的段错误bug，结合部署环境为Linux Kernel v4.18.0 | musl的x64架构系统，推测存在Bun v1.3.13版本与当前系统环境的兼容性适配问题；同时日志显示dotenv注入了0个环境变量，需按实际环境确认是否存在环境配置缺失的情况。

## 排查步骤
1.  执行`docker logs fastgpt-code-sandbox --tail 200`命令，查看容器最新日志，确认是否存在`panic: Segmentation fault at address 0x0`和Bun v1.3.13崩溃提示；
2.  确认当前部署主机的系统内核版本与libc类型，需按实际环境确认；
3.  检查容器启动的环境变量配置，确认是否存在必要的运行参数未正确加载。

## 解决与验证
由于日志提示该崩溃为Bun自身的bug，可尝试更换适配当前系统环境的Bun版本，或等待Bun官方发布修复该段错误的更新版本。验证方式：重启`fastgpt-code-sandbox`容器，再次查看日志，确认不再出现Bun段错误崩溃，且服务能正常启动在`http://localhost:3000`。

> 来源：https://github.com/labring/FastGPT/issues/6893
