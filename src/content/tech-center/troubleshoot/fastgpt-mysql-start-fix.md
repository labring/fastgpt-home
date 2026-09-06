---
title: 解决FastGPT私有部署中MySQL容器启动失败的问题
slug: /zh/troubleshoot/fastgpt-mysql-start-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1662
source_type: GitHub issue
---

# 解决FastGPT私有部署中MySQL容器启动失败的问题

## 现象
在WSL Ubuntu22.04.3环境中，通过docker compose快速部署FastGPT时，MySQL容器无法正常启动，部署流程卡在容器启动环节。用户提供的报错截图显示MySQL启动存在异常，但未直接给出具体报错文本，仅通过修改镜像版本可解决该问题。

## 可能原因
当前docker-compose.yaml中配置的MySQL镜像版本，与当前WSL Ubuntu22.04.3的docker运行环境存在兼容性冲突，导致MySQL容器无法完成启动流程。

## 排查步骤
1.  确认当前部署环境为WSL Ubuntu22.04.3，且使用docker compose工具执行FastGPT部署。
2.  打开FastGPT部署目录下的docker-compose.yaml文件，查看其中MySQL镜像的版本配置内容。
3.  执行`docker compose up -d`命令启动所有服务，观察终端输出的容器启动状态信息。
4.  若MySQL容器启动失败，可通过`docker logs <mysql容器名称>`命令查看容器的完整启动日志，确认具体的异常细节。

## 解决与验证
1.  编辑部署目录下的docker-compose.yaml文件，找到MySQL镜像的配置行，将镜像版本修改为8.0.37。例如，若原配置为`image: mysql`或`image: mysql:8.x`，则修改为`image: mysql:8.0.37`。
2.  保存修改后的docker-compose.yaml文件，重新执行`docker compose up -d`命令，重新拉取对应版本的MySQL镜像并启动所有容器。
3.  等待1至2分钟后，执行`docker ps`命令查看当前运行中的容器列表，确认MySQL容器的状态为`Up`。
4.  访问FastGPT的官方服务地址，验证核心功能是否可以正常访问，确认部署流程成功完成。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1662)
