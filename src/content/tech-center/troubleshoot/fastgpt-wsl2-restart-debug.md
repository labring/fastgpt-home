---
title: 解决WSL2 Ubuntu22.04部署FastGPT后镜像重启无法登录问题
slug: /zh/troubleshoot/fastgpt-wsl2-restart-debug
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/674
source_type: GitHub issue
---

# 解决WSL2 Ubuntu22.04部署FastGPT后镜像重启无法登录问题

## 现象
用户使用WSL2 Ubuntu22.04搭配Docker Desktop部署FastGPT的Docker Compose后，可正常访问网页主页，但无法使用root用户登录，其他页面无法正常点击。在Docker Desktop中可观察到fastgpt镜像持续处于无限重启状态。

## 可能原因
该问题的具体触发原因未在当前反馈中明确，推测可能与WSL2 Ubuntu22.04环境下的Docker部署配置相关，需结合实际部署环境进一步确认。

## 排查步骤
1. 登录WSL2 Ubuntu22.04环境，执行`docker ps -a`命令查看fastgpt容器的运行状态，确认是否处于重启循环中。
2. 执行`docker logs <容器ID>`命令查看容器的日志输出，获取具体的报错信息。
3. 检查Docker Compose配置文件中的挂载路径、环境变量等配置是否符合部署要求。
4. 确认WSL2环境的内存、磁盘剩余空间是否满足FastGPT的部署运行需求。

## 解决与验证
定位到具体问题后，可针对性调整配置。例如若存在端口冲突，修改Docker Compose文件中的端口映射参数；若为文件权限异常，调整部署目录的访问权限。调整完成后，执行`docker compose down`停止现有容器，再执行`docker compose up -d`重新启动服务。等待容器启动稳定后，访问网页尝试使用root用户登录，确认镜像不再无限重启且可正常使用所有页面功能。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/674)
