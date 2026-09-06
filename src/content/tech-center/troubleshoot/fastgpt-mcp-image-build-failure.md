---
title: 解决x86架构下FastGPT MCP服务镜像构建失败的问题
slug: /zh/troubleshoot/fastgpt-mcp-image-build-failure
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5362
source_type: GitHub issue
---

# 解决x86架构下FastGPT MCP服务镜像构建失败的问题

## 现象
用户在x86_64 CentOS环境中执行docker build命令构建FastGPT MCP服务镜像时失败，相同网络环境下ARM架构的Mac电脑可成功构建镜像。构建命令为`docker build -f ./projects/mcp_server/Dockerfile -t mcp-server:v1.0.0 . --build-arg proxy=taobao --no-cache`，Docker版本为20.10.16，尝试更新至最新版Docker后仍失败。构建过程在执行`RUN [ -f pnpm-lock.yaml ] || (echo "Lockfile not found." && exit 1)`时出现异常，日志未完整输出后续内容。

## 可能原因
结合已知信息，可能的触发因素包括：
1.  x86与ARM架构的编译、依赖拉取兼容性差异
2.  Dockerfile中使用npm安装依赖、后续使用bun执行构建的流程组合存在适配问题
3.  构建过程中pnpm锁文件的检测或生成异常
4.  x86环境下的Docker配置或依赖拉取环节出现异常

## 排查步骤
1.  执行`uname -m`命令确认当前构建环境的架构类型
2.  完整复现镜像构建过程，记录每一步的日志输出，重点关注Step9及后续步骤的报错信息
3.  检查项目根目录下的pnpm-lock.yaml文件是否存在且内容完整
4.  验证构建服务器的网络连通性，确认可正常拉取基础镜像与依赖包
5.  尝试将Docker版本更新至最新稳定版后重新执行构建

## 解决与验证
基于现有信息，可先针对架构兼容性与构建流程进行排查调整。若构建失败原因为pnpm锁文件异常，可重新生成锁文件后再次尝试构建；若为构建流程适配问题，可根据实际报错日志调整Dockerfile中的依赖安装与构建环节配置。验证方式为在x86_64环境中重新执行构建命令，确认镜像可成功构建且无报错。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5362)
