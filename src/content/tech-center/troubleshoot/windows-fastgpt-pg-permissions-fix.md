---
title: 解决Windows11本地化部署FastGPT时PostgreSQL启动失败问题
slug: /zh/troubleshoot/windows-fastgpt-pg-permissions-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1187
source_type: GitHub issue
---

# 解决Windows11本地化部署FastGPT时PostgreSQL启动失败问题

## 现象
Windows11系统中使用Docker Desktop本地化部署FastGPT后，无法正常登录FastGPT，页面提示超时。查看PostgreSQL容器日志后发现数据库启动失败，日志报错信息为：`2024-04-11 09:06:17.547 UTC [83] FATAL:  data directory "/var/lib/postgresql/data" has invalid permissions`，详细说明为`Permissions should be u=rwx (0700) or u=rwx,g=rx (0750)`，最终pg容器以退出码1终止运行。

## 可能原因
PostgreSQL要求其数据目录`/var/lib/postgresql/data`的权限必须为0700或0750。在Windows系统下使用Docker挂载本地目录时，由于主机目录的权限配置不符合要求，导致PostgreSQL容器无法正常初始化数据目录，引发启动失败。

## 排查步骤
1.  打开Docker Desktop，定位到对应的PostgreSQL容器，查看容器日志，确认是否存在上述权限相关的报错信息。
2.  找到部署FastGPT时配置的PostgreSQL本地挂载目录，记录该Windows主机上的实际路径。
3.  检查该本地目录的当前权限配置，确认是否符合PostgreSQL要求的权限规则。

## 解决与验证
解决步骤：首先停止并删除当前异常的PostgreSQL容器。然后调整Windows主机上的挂载目录权限，可通过右键点击目录，选择「属性」→「安全」选项卡配置权限，确保目录权限满足0700或0750的要求。完成权限调整后，重新运行FastGPT的部署脚本启动所有容器。验证方法：查看PostgreSQL容器日志，确认无权限相关报错，尝试访问并登录FastGPT，确认登录过程无超时提示，功能正常可用。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1187)
