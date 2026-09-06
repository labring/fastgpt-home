---
title: 解决FastGPT部署后openapi容器出现panic赋值报错的问题
slug: /zh/troubleshoot/fastgpt-openapi-panic-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1747
source_type: GitHub issue
---

# 解决FastGPT部署后openapi容器出现panic赋值报错的问题

## 现象
用户在Ubuntu22.04公有云环境使用官方文档命令部署FastGPT后，openapi容器启动失败。查看容器完整日志可见，启动流程依次完成One API v0.6.7-alpha.4启动、MySQL数据库初始化、数据库迁移，随后提示`REDIS_CONN_STRING not set, Redis is not enabled`，确认使用默认主题与内存缓存，最终触发运行时panic，具体错误信息为`panic: assignment to entry in nil map`，报错栈指向`github.com/songquanpeng/one-api/model.InitChannelCache()`函数的`/build/model/cache.go:196`行。

## 可能原因
从报错栈和日志信息来看，错误发生在渠道缓存初始化的代码环节。当程序尝试向未完成初始化的空map类型变量赋值时，触发了Go语言的运行时panic。结合日志中Redis未启用但内存缓存已启用的配置，该问题大概率与缓存初始化时的map变量未正确声明分配有关。

## 排查步骤
1. 登录部署FastGPT的服务器，使用容器日志查看命令获取openapi容器的完整启动日志，确认报错信息为`panic: assignment to entry in nil map`，并记录报错的代码文件与行号。
2. 核对部署过程中使用的环境变量配置文件或启动命令，检查缓存相关参数是否完整，包括是否正确配置了`REDIS_CONN_STRING`环境变量，或内存缓存的初始化配置是否符合要求。
3. 确认数据库连接状态，检查是否能正常读取渠道相关的基础数据，排查数据库数据异常导致的缓存初始化失败。
4. 对比官方部署文档的标准命令，确认是否遗漏了必要的环境变量或配置项，导致程序启动时缺少关键初始化参数。

## 解决与验证
1. 针对缓存初始化环节的空map问题，确保所有涉及的map变量已完成初始化分配。若启用Redis缓存，需正确配置`REDIS_CONN_STRING`环境变量，确保Redis连接正常；若使用内存缓存，需在代码逻辑中提前声明并初始化缓存map变量。
2. 重启openapi容器，重新查看容器日志，确认不再出现`panic: assignment to entry in nil map`报错。
3. 访问FastGPT服务的前端页面，验证核心功能是否可以正常使用，确认部署问题已解决。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1747)
