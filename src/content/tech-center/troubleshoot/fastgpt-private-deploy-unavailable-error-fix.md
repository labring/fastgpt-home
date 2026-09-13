---
title: FastGPT私有部署4.8.23版本初始化系统14 UNAVAILABLE报错排查与解决
slug: /zh/troubleshoot/fastgpt-private-deploy-unavailable-error-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4036
source_type: GitHub issue
---

# FastGPT私有部署4.8.23版本初始化系统14 UNAVAILABLE报错排查与解决

## 现象
FastGPT私有部署4.8.23版本启动时，日志显示已完成MongoDB连接、Milvus连接，成功加载systemConfigs、app_plugin_groups等大量数据库模型。在系统初始化阶段抛出错误：`Init system error Error: 14 UNAVAILABLE: No connection establ`，服务启动流程中断。

## 可能原因
1. 系统初始化时发起的GRPC连接无法建立，对应报错14 UNAVAILABLE的GRPC状态码含义
2. 配置文件中的服务地址、端口等参数与实际部署环境不匹配
3. 网络策略或防火墙阻止了初始化流程所需的端口通信
4. 部分未在日志中明确显示连接状态的依赖服务出现运行异常

## 排查步骤
1. 查看完整报错日志，确认`No connection establ`的完整内容，明确无法建立连接的目标服务
2. 核对FastGPT配置文件中的相关服务配置参数，确保与实际部署的服务地址、端口一致
3. 检查服务器防火墙、网络策略，放行初始化流程所需的端口
4. 验证所有依赖服务的运行状态，确认无异常启动情况

## 解决与验证
根据排查结果修正对应问题，例如修正配置文件中的错误参数、调整网络策略放行必要端口、修复依赖服务的异常问题。重启FastGPT服务后，查看启动日志是否不再出现初始化系统报错，确认服务正常进入可用状态即为验证成功。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4036)
