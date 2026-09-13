---
title: FastGPT 本地部署新增账号的操作步骤
slug: /zh/troubleshoot/fastgpt-local-add-account-guide
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/231
source_type: GitHub issue
---

# FastGPT 本地部署新增账号的操作步骤

## 现象
无法通过配置文件以外的途径新增FastGPT账号，本地部署场景下无法找到或打开注册入口以完成新用户注册。部分使用ghcr.io/c121914yu/fastgpt-admin:latest镜像的场景，会出现License验证相关异常，影响账号注册功能的正常使用。

## 可能原因
1. 未掌握配置文件外的账号新增操作流程，无法找到合法的账号新增入口。
2. 本地部署场景下未正确开启或找到注册入口，导致无法完成新用户注册。
3. 使用ghcr.io/c121914yu/fastgpt-admin:latest镜像时，存在License验证相关问题，阻碍账号注册功能的执行。

## 排查步骤
1. 确认当前FastGPT的部署类型，区分公有云与私有部署场景。
2. 检查所使用的fastgpt-admin镜像版本，确认是否为ghcr.io/c121914yu/fastgpt-admin:latest。
3. 查找系统内的注册入口位置，确认注册功能是否处于正常开启状态。
4. 若需通过容器操作新增账号，需进入对应容器执行相关命令，具体步骤需按实际环境确认。

## 解决与验证
解决方式分为两类：
1. 常规注册操作：打开注册门户或注册入口，按照流程完成新用户注册，即可新增FastGPT账号。
2. 镜像适配处理：若使用ghcr.io/c121914yu/fastgpt-admin:latest镜像，需先解决License验证相关问题，再使用注册功能完成账号新增。
验证操作：完成注册入口操作或容器内命令执行后，使用新增的账号登录FastGPT系统，确认账号可正常登录并使用相关功能。

> 来源: [FastGPT GitHub issue #231](https://github.com/labring/FastGPT/issues/231)
