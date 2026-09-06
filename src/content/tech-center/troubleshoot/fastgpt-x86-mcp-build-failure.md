---
title: 解决FastGPT项目x86架构下mcp_server镜像打包失败的问题
slug: /zh/troubleshoot/fastgpt-x86-mcp-build-failure
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5583
source_type: GitHub issue
---

# 解决FastGPT项目x86架构下mcp_server镜像打包失败的问题

## 现象
使用FastGPT最新代码，在项目根目录执行`docker build -f ./projects/mcp_server/Dockerfile -t mcp_server:v1.0.0 . --build-arg proxy=taobao`命令构建mcp_server镜像时，x86架构机器上打包100%出现失败，arm架构机器上打包无报错。执行命令的网络连接正常，可正常访问外网。

## 可能原因
未明确具体触发因素，仅观察到该打包失败仅稳定出现在x86架构机器，arm架构机器可正常完成打包，未发现与网络配置、命令参数直接相关的明确关联，需结合实际环境进一步排查。

## 排查步骤
1. 确认当前使用的机器架构类型，对比不同架构机器的打包结果差异，明确x86架构下必然失败、arm架构下可正常完成的现象。
2. 检查执行的打包命令参数是否完整，确认指定了正确的Dockerfile路径`./projects/mcp_server/Dockerfile`、镜像标签`mcp_server:v1.0.0`以及代理参数`--build-arg proxy=taobao`。
3. 确认当前网络可正常访问外网，排除网络连接异常导致的打包失败。
4. 在arm架构机器上执行完全相同的打包命令，验证是否可正常完成镜像打包，对比与x86架构的结果差异。

## 解决与验证
若该打包失败问题仍需解决，可重新开启对应issue并补充当前机器的架构信息、完整的打包日志等相关环境信息，以便进一步定位问题。

> 来源: [FastGPT GitHub issue #5583](https://github.com/labring/FastGPT/issues/5583)
