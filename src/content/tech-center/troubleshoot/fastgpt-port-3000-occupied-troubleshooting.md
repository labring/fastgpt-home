---
title: FastGPT部署时Ubuntu 22.04环境3000端口占用排查指南
slug: /zh/troubleshoot/fastgpt-port-3000-occupied-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/46
source_type: GitHub issue
---

# FastGPT部署时Ubuntu 22.04环境3000端口占用排查指南

## 现象
部署于全新Ubuntu 22.04系统VPS的FastGPT服务无法正常启动或访问。执行sudo lsof -i :3000命令后，返回结果显示nginx、systemd-resolve进程占用3000端口，存在LISTEN状态的TCP连接。

## 可能原因
3000端口被非FastGPT的nginx或systemd-resolve进程提前占用，导致FastGPT服务无法绑定该端口。

## 排查步骤
1. 执行sudo lsof -i :3000命令，查看占用3000端口的进程详细信息。
2. 记录返回结果中占用端口的进程名称与进程ID。
3. 核对占用进程是否为业务所需进程，判断是否需要终止或调整配置。

## 解决与验证
若占用端口的进程为非预期的nginx或systemd-resolve，可执行sudo kill [PID]命令终止对应进程。若为系统自带服务，需调整FastGPT的端口配置，具体配置需按实际环境确认。执行sudo lsof -i :3000，确认无进程占用3000端口后，重新启动FastGPT服务，检查服务是否正常运行。

> 来源: [FastGPT GitHub issue #46](https://github.com/labring/FastGPT/issues/46)
