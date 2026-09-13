---
title: 解决MacOS环境下FastGPT Docker部署的数据库报错问题
slug: /zh/troubleshoot/fastgpt-macos-docker-db-errors
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/341
source_type: GitHub issue
---

# 解决MacOS环境下FastGPT Docker部署的数据库报错问题

## 现象
在MacMini M2 MacOS13.5.2环境中，使用官方Docker Compose文件部署FastGPT且未配置代理时，启动后出现两类问题：PostgreSQL容器反复报错`chown: changing ownership of '/var/lib/postgresql/data/._pg_wal': Operation not permitted`并退出；MongoDB容器输出警告`WARNING: MongoDB 5.0+ requires a CPU with AVX support, and your current system does not appear to have that!`，同时FastGPT提示MongoDB连接失败。该部署流程在Ubuntu环境中可正常运行。

## 可能原因
1. PostgreSQL容器尝试修改挂载的数据目录权限时，因MacOS Docker的文件权限限制，操作被拒绝，导致容器启动失败。
2. 当前使用的MongoDB镜像要求CPU支持AVX指令集，而MacMini M2的硬件环境不满足该要求，引发警告并可能导致连接失败。

## 排查步骤
1. 进入FastGPT的部署目录，检查本地挂载的PostgreSQL数据目录的权限配置。
2. 查看Docker Compose启动日志，确认MongoDB容器是否输出AVX指令集相关警告。
3. 对比Ubuntu环境的部署过程，确认当前Docker Compose文件未做额外自定义修改。

## 解决与验证
针对PostgreSQL权限报错，可调整本地部署目录中对应的数据卷权限，允许容器内进程读写该目录。针对MongoDB的AVX警告，需更换适配当前CPU架构的MongoDB镜像版本，或参考镜像官方文档调整启动参数。完成调整后，重新执行`docker-compose up`命令，确认PostgreSQL容器不再报错、MongoDB连接正常，且FastGPT可正常启动访问。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/341)
