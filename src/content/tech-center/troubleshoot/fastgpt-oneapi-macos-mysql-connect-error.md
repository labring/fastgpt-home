---
title: 解决M系列macOS下FastGPT OneAPI连接MySQL失败的问题
slug: /zh/troubleshoot/fastgpt-oneapi-macos-mysql-connect-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3724
source_type: GitHub issue
---

# 解决M系列macOS下FastGPT OneAPI连接MySQL失败的问题

## 现象
使用docker-compose脚本启动FastGPT私有部署版本4.8.20后，OneAPI组件无法连接MySQL数据库，运行环境为M系列的macOS设备，相关报错可通过容器日志查看连接失败相关提示。

## 可能原因
1. 设备架构不兼容：M系列macOS采用arm64架构，部分容器镜像未适配该架构，导致运行时出现连接异常；
2. 配置参数不匹配：docker-compose配置文件中的数据库连接地址、端口、用户名或密码等参数与本地MySQL服务设置不一致；
3. 服务启动异常：MySQL数据库服务未正常启动，或docker-compose的端口映射配置存在错误，导致OneAPI无法访问数据库。

## 排查步骤
1. 执行`docker-compose ps`命令，查看所有容器的运行状态，确认OneAPI和MySQL容器是否正常启动；
2. 执行`docker logs [oneapi容器名称或ID]`命令，查看OneAPI容器的实时日志，提取数据库连接失败的具体报错文本；
3. 打开docker-compose配置文件，检查MySQL相关的环境变量配置，包括数据库地址、端口、用户名、密码等参数是否正确；
4. 在本地终端执行`mysql -h [数据库主机地址] -P [数据库端口] -u [数据库用户名] -p`命令，测试本地是否可以正常连接MySQL数据库；
5. 执行`docker inspect [oneapi容器ID] | grep Architecture`命令，查看OneAPI容器的架构是否与M系列macOS的arm64架构匹配。

## 解决与验证
若排查发现是架构不兼容问题，可更换适配arm64架构的OneAPI容器镜像，重新配置docker-compose并启动服务；若为配置参数不匹配，修正配置文件中的数据库连接参数，确保与本地MySQL服务设置一致；若为服务启动异常，先确保本地MySQL服务正常运行，再检查docker-compose的端口映射配置是否正确。完成调整后，执行`docker-compose up -d`重新启动服务，再次查看OneAPI容器日志，确认无数据库连接失败的报错，即可验证问题解决。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3724)
