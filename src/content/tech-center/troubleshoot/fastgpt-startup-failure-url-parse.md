---
title: 解决FastGPT启动失败并报URL解析错误与慢查询问题
slug: /zh/troubleshoot/fastgpt-startup-failure-url-parse
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6489
source_type: GitHub issue
---

# 解决FastGPT启动失败并报URL解析错误与慢查询问题

## 现象
FastGPT私有部署启动时，控制台输出以下日志：首先成功连接PostgreSQL与MongoDB，随后检测到PostgreSQL慢查询，SQL包含创建vector扩展、modeldata表的语句，耗时2295ms；最终出现报错`[plugin_error]: Failed to parse URL from /api/models/get-providers`，系统初始化失败（日志末尾存在截断）。

## 可能原因
1.  PostgreSQL执行创建vector扩展、modeldata表的SQL语句耗时2295ms，触发慢查询告警；
2.  系统初始化阶段无法解析`/api/models/get-providers`接口的URL，导致插件初始化失败，最终整体启动失败。

## 排查步骤
1.  查看完整控制台日志，确认是否存在`Postgres slow query detected`与`Failed to parse URL from /api/models/get-providers`相关报错；
2.  确认PostgreSQL数据库服务正常运行，且FastGPT配置的数据库连接信息无误；
3.  检查PostgreSQL是否具备执行`CREATE EXTENSION IF NOT EXISTS vector;`语句的权限，或是否已预装vector扩展；
4.  核对FastGPT的API配置，确认`/api/models/get-providers`接口的路由与地址配置正确无语法错误。

## 解决与验证
1.  处理PostgreSQL慢查询问题：手动在PostgreSQL中执行`CREATE EXTENSION IF NOT EXISTS vector;`，确认`modeldata`表创建成功，排查数据库执行慢查询的根源；
2.  修复URL解析错误：修正FastGPT中`/api/models/get-providers`接口的配置，确保URL格式正确、服务可正常访问；
3.  重启FastGPT服务，查看日志是否不再出现慢查询告警与URL解析报错，确认系统初始化成功。若问题未解决，需按实际环境确认网络连通性等相关配置。

> 来源：[FastGPT GitHub Issue #6489](https://github.com/labring/FastGPT/issues/6489)
