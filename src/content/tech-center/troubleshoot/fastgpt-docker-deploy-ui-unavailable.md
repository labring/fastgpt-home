---
title: 解决FastGPT 4.12.1版本docker部署后界面打不开的问题
slug: /zh/troubleshoot/fastgpt-docker-deploy-ui-unavailable
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5517
source_type: GitHub issue
---

# 解决FastGPT 4.12.1版本docker部署后界面打不开的问题

## 现象
本地部署FastGPT 4.12.1版本，使用docker-compose安装完成后，FastGPT前端界面无法正常打开，MongoDB容器日志显示异常报错信息。

## 可能原因
1. Redis容器的启动命令配置不完整，原配置为截断的`redis-`，导致服务无法启动；
2. MongoDB容器的初始化脚本、密钥文件权限或副本集配置存在异常，无法正常完成启动流程；
3. 容器间网络连通性存在问题，需按实际环境确认。

## 排查步骤
1. 执行`docker logs mongo`和`docker logs redis`命令，查看两个容器的具体报错日志，定位异常点。
2. 打开docker-compose.yml配置文件，检查mongo和redis服务的配置项，确认redis启动命令是否完整。
3. 检查MongoDB容器的entrypoint脚本，确认副本集初始化命令、密钥文件权限配置是否正确。
4. 确认所有服务是否处于同一fastgpt网络，检查容器间的连通性。

## 解决与验证
1. 补全Redis容器的启动命令，将截断的`redis-`替换为完整的Redis服务启动参数。
2. 检查MongoDB的密钥文件生成、权限设置和副本集初始化脚本，确保配置符合要求。
3. 执行`docker-compose down -v`删除旧容器和数据（如需保留业务数据可跳过`-v`参数），再执行`docker-compose up -d`重启所有服务。
4. 等待容器完成健康检查后，访问FastGPT界面，确认可以正常加载。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5517)
