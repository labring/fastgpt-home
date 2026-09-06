---
title: 解决FastGPT的neapi服务因MySQL 1130错误重启的问题
slug: /zh/troubleshoot/fastgpt-neapi-mysql-1130-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3645
source_type: GitHub issue
---

# 解决FastGPT的neapi服务因MySQL 1130错误重启的问题

## 现象
FastGPT的neapi服务持续处于重启状态，查看服务日志可发现循环重复以下内容：
- 打印`failed to initialize database, got error Error 1130: Host '172.19.0.6' is not allowed to connect to this MySQL server`的错误信息
- 服务启动后触发致命错误终止，循环输出`One API v0.6.7 started`与`using MySQL as database`的提示后再次报错重启。

## 可能原因
根据报错信息`Error 1130: Host '172.19.0.6' is not allowed to connect to this MySQL server`，核心原因为MySQL服务器拒绝了来自主机`172.19.0.6`的连接请求，该主机未被授权访问当前配置的MySQL数据库实例。

## 排查步骤
1.  确认neapi服务所在容器的主机IP为`172.19.0.6`，可通过`docker inspect 容器名或容器ID`命令查看对应容器的IP地址。
2.  登录MySQL数据库服务器，执行查询语句查看已配置的访问授权列表，确认`172.19.0.6`是否被纳入授权范围。
3.  核对neapi服务的数据库连接配置，确认配置的MySQL用户名、密码、目标数据库名称等参数与MySQL服务器的授权配置一致。
4.  检查MySQL服务器的远程访问规则，确认是否允许来自对应网段或主机的连接请求。

## 解决与验证
### 解决方法
1.  使用拥有MySQL授权权限的账号登录数据库服务器。
2.  执行授权语句，为主机`172.19.0.6`授予对应数据库的访问权限，示例语句为：`GRANT ALL PRIVILEGES ON 目标数据库名.* TO '配置的用户名'@'172.19.0.6' IDENTIFIED BY '配置的密码';`，其中目标数据库名、用户名、密码需按实际环境替换。
3.  执行`FLUSH PRIVILEGES;`命令刷新MySQL的权限配置，使新授权生效。
4.  重启neapi服务，观察服务日志是否不再出现1130错误。
### 验证方式
查看neapi服务的运行日志，确认没有出现`Error 1130: Host '172.19.0.6' is not allowed to connect to this MySQL server`的报错，服务成功初始化数据库并保持正常运行，不再重启。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3645)
