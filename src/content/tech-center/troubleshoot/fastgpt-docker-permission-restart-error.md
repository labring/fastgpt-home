---
title: 解决FastGPT私有部署Docker部署时主程序重启的权限报错问题
slug: /zh/troubleshoot/fastgpt-docker-permission-restart-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5999
source_type: GitHub issue
---

# 解决FastGPT私有部署Docker部署时主程序重启的权限报错问题

## 现象
使用Docker部署FastGPT私有部署版本4.14.2时，主程序持续重启。启动日志显示MongoDB连接正常，但初始化系统时抛出权限错误，完整报错信息为`Error: EACCES: permission denied, open '/app/data/config.json'`，错误堆栈明确指向无法打开该配置文件。

## 可能原因
该报错的核心原因是运行FastGPT主程序的进程没有权限读取`/app/data/config.json`文件或其上级目录。可能的场景包括文件权限配置错误、目录归属用户不匹配，或Docker挂载的宿主机目录权限与容器内运行用户不一致。

## 排查步骤
1. 定位到FastGPT部署目录下的`/app/data`目录，确认`config.json`文件的存在。
2. 执行权限查看命令，确认该文件及上级目录的权限配置和归属用户。
3. 检查FastGPT容器的运行用户，确认其是否对目标文件拥有读取权限。
4. 核对Docker挂载配置，确认宿主机挂载目录的权限是否与容器内需求匹配。

## 解决与验证
解决方法：
1. 调整目标文件及目录的权限，赋予运行程序的用户读取权限。例如执行`chmod +r /app/data/config.json`，或使用`chown -R [运行用户]:[用户组] /app/data`修改目录归属（需按实际运行环境调整参数）。
2. 如果是Docker挂载导致的权限问题，可在启动容器时通过`--user`参数指定正确的运行用户，或调整宿主机挂载目录的权限，确保容器内进程可以访问挂载的文件。
验证方法：重启FastGPT容器，查看启动日志是否不再出现`EACCES: permission denied, open '/app/data/config.json'`错误，确认主程序不再持续重启。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5999)
