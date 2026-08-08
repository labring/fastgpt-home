---
title: 解决FastGPT部署时容器镜像无法下载的问题
slug: /zh/troubleshoot/fastgpt-image-pull-failed
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/7351
source_type: GitHub issue
---

# 解决FastGPT部署时容器镜像无法下载的问题

## 现象
用户在部署FastGPT相关服务时，尝试拉取以下三个容器镜像均无法下载：
1. registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-plugin:v1.0.2
2. sandbox-registry.cn-zhangjiakou.cr.aliyuncs.com/opensandbox/server:v0.2.1
3. sandbox-registry.cn-zhangjiakou.cr.aliyuncs.com/opensandbox/execd:v1.0.21
用户初步怀疑镜像名称存在错误。

## 可能原因
结合问题描述，可能的触发原因包括：
1. 镜像名称或版本标签存在书写错误，即用户初步推测的情况；
2. 当前部署环境无法正常连通目标阿里云镜像仓库地址；
3. 执行拉取操作的Docker账号未获得对应镜像仓库的拉取权限。
部分配置项的检查需按实际部署环境确认。

## 排查步骤
1. 核对镜像信息：对照部署所需的镜像完整地址与版本标签，检查是否存在拼写错误、字符遗漏等问题；
2. 执行拉取测试：在部署节点执行单条镜像拉取命令，例如`docker pull registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-plugin:v1.0.2`，观察命令返回的结果，确认拉取失败的具体表现；
3. 检查访问权限：确认当前使用的Docker账号是否拥有对应阿里云镜像仓库的拉取权限；
4. 排查网络限制：确认部署节点是否存在防火墙、代理等配置，是否阻断了目标镜像仓库的访问链路。

## 解决与验证
若排查确认是镜像名称或标签错误，修正镜像地址后重新执行拉取命令即可解决；若为网络连通问题，可调整网络配置或配置代理以访问目标镜像仓库；若为权限不足，需为当前账号配置对应镜像仓库的拉取权限。验证方式为：成功拉取所有所需镜像后，继续执行FastGPT的后续部署步骤，确认服务可以正常启动运行。

> 来源：https://github.com/labring/FastGPT/issues/7351
