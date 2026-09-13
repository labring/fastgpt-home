---
title: 解决FastGPT中OneAPI访问MySQL连接被拒绝的问题
slug: /zh/troubleshoot/fastgpt-oneapi-mysql-connection-refused
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1994
source_type: GitHub issue
---

# 解决FastGPT中OneAPI访问MySQL连接被拒绝的问题

## 现象
OneAPI组件启动时输出报错信息：`oneapi | [error] failed to initialize database, got error dial tcp 192.168.176.5:3306: connect: connection refused`，服务无法正常初始化。

## 可能原因
OneAPI组件运行异常或存在已知bug；MySQL服务的访问配置或版本与OneAPI组件不兼容，导致连接被拒绝。

## 排查步骤
1. 查看OneAPI组件的启动日志，确认是否出现`failed to initialize database, got error dial tcp 192.168.176.5:3306: connect: connection refused`报错
2. 检查MySQL服务的运行状态，确认目标IP 192.168.176.5与端口3306可正常访问
3. 确认OneAPI组件的版本配置，避免升级至版本8，需按实际环境确认适配版本

## 解决与验证
删除现有OneAPI容器并重新创建，完成后查看组件启动日志，确认数据库连接报错消失，服务正常运行。若存在版本升级需求，需避免升级至版本8，需按实际环境确认适配配置。

> 来源: [FastGPT GitHub issue #1994](https://github.com/labring/FastGPT/issues/1994)
