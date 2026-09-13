---
title: 解决FastGPT初始化数据库时MySQL 1045访问被拒绝的问题
slug: /zh/troubleshoot/fastgpt-mysql-1045-access-denied
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1332
source_type: GitHub issue
---

# 解决FastGPT初始化数据库时MySQL 1045访问被拒绝的问题

## 现象
部署后服务多次尝试启动均失败，日志中重复出现固定报错：`failed to initialize database, got error Error 1045 (28000): Access denied for user 'root'@'192.168.0.5' (using password: YES)`，同时日志同步显示服务版本为One API v0.6.6-alpha.11，且配置使用MySQL作为数据库存储。

## 可能原因
结合报错的具体信息，可能的触发因素包括：FastGPT配置文件中填写的MySQL root用户密码与MySQL服务端实际设置的密码不一致；MySQL服务未授权192.168.0.5主机的root用户拥有登录访问权限；FastGPT配置的MySQL连接地址与MySQL服务实际监听的地址不匹配。

## 排查步骤
1. 打开FastGPT的配置文件，核对其中填写的MySQL root用户密码，确认与MySQL服务端设置的密码完全一致。
2. 登录MySQL服务端，检查当前的用户授权配置，确保192.168.0.5主机的root用户拥有访问权限，若未配置则按实际环境完成授权。
3. 登录MySQL服务端所在机器，确认MySQL服务处于正常运行状态。
4. 再次核对FastGPT配置文件中的MySQL连接地址，确保与MySQL服务实际监听的地址完全匹配。

## 解决与验证
完成对应配置修改后，重启FastGPT服务，查看服务日志是否不再出现1045访问被拒绝的报错，确认服务成功启动并完成数据库初始化流程，即可验证问题已解决。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1332)
