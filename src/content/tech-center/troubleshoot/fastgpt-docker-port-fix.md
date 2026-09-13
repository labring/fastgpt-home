---
title: 解决FastGPT修改docker-compose端口后的启动异常
slug: /zh/troubleshoot/fastgpt-docker-port-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1357
source_type: GitHub issue
---

# 解决FastGPT修改docker-compose端口后的启动异常

## 现象
用户在Windows 11宿主机上，因3307、3002端口被占用，计划修改FastGPT部署的docker-compose.yml配置，调整mysql、fastgpt服务端口。启动容器后服务无法正常运行，且提供的docker-compose.yml中mongo服务的entrypoint脚本未完整粘贴，内容截断为`echo 'const isInited = rs.status().ok === 1\nif(!isInited){\n  rs.initiate({\n      _id: "rs0",\n      member`。本次部署使用的Docker版本为Client 26.0.0、Server 4.29.0。
## 可能原因
1. 修改端口后未同步更新服务内部的监听端口配置，导致服务间无法正常建立连接；
2. mongo服务的entrypoint脚本未完整，无法完成MongoDB副本集的初始化操作，导致容器启动失败；
3. 端口映射配置与宿主机实际占用情况未完全匹配，引发端口冲突问题。
## 排查步骤
1. 确认宿主机上计划使用的3307、3002等端口未被其他服务占用，可通过系统自带的端口检查工具完成验证；
2. 检查docker-compose.yml文件中所有服务的端口映射配置，确保外部端口与内部容器端口的映射关系正确无误；
3. 补全mongo服务的entrypoint脚本内容，确保包含完整的副本集初始化逻辑；
4. 执行`docker-compose logs`命令查看各容器的启动日志，定位具体的报错信息。
## 解决与验证
1. 补全mongo服务的entrypoint脚本，确保副本集初始化命令完整，避免因脚本截断导致MongoDB无法正常启动；
2. 再次确认所有修改后的端口在宿主机上无占用，调整配置中错误的端口映射关系；
3. 执行`docker-compose down -v`删除原有容器和数据卷（如需保留业务数据可跳过`-v`参数），再执行`docker-compose up -d`重新启动所有服务；
4. 访问修改后的fastgpt端口3002，验证服务是否可以正常加载并响应请求；
5. 执行`docker ps`命令查看pg、mongo等容器的运行状态，确认无异常退出情况。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1357)
