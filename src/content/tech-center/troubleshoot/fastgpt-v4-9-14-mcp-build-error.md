---
title: 解决FastGPT v4.9.14版本构建mcp_server镜像失败的问题
slug: /zh/troubleshoot/fastgpt-v4-9-14-mcp-build-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5161
source_type: GitHub issue
---

# 解决FastGPT v4.9.14版本构建mcp_server镜像失败的问题

## 现象
使用FastGPT v4.9.14版本时，执行以下操作必现打包错误：执行git clone -b v4.9.14 https://github.com/labring/FastGPT.git，进入项目目录FastGPT，执行docker build -f ./projects/mcp_server/Dockerfile -t mcp_server:v1.0.0 . --build-arg proxy=taobao。

## 可能原因
一是旧版本代码存在构建逻辑缺陷；二是Dockerfile中依赖安装使用npm、构建使用bun的配置可能引发兼容异常；三是网络或依赖缓存异常需按实际环境确认。

## 排查步骤
1. 确认当前本地FastGPT代码是否为最新版本。
2. 核对docker build命令的参数，确保指定了正确的Dockerfile路径、镜像标签及build-arg配置。
3. 排查本地网络连接与依赖缓存状态，需按实际环境确认。

## 解决与验证
拉取FastGPT仓库最新代码，覆盖本地旧代码。重新执行docker build命令：docker build -f ./projects/mcp_server/Dockerfile -t mcp_server:v1.0.0 . --build-arg proxy=taobao。验证镜像是否构建成功。

> 来源: [FastGPT GitHub issue #5161](https://github.com/labring/FastGPT/issues/5161)
