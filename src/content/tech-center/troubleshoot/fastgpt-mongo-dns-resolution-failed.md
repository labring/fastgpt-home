---
title: 解决FastGPT私有部署升级后Mongo域名解析失败的问题
slug: /zh/troubleshoot/fastgpt-mongo-dns-resolution-failed
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6844
source_type: GitHub issue
---

# 解决FastGPT私有部署升级后Mongo域名解析失败的问题

## 现象
按照文档升级到FastGPT 4.14.15版本后，出现MongoDB连接失败问题，具体报错信息为：`{"host":"mongo:27017","success":false,"errorMessage":"HostUnreachable: Error connecting to mongo:27017 :: caused by :: Could not find address for mongo:27017: SocketException: Host not found (authoritative)"}}}}`。同时Mongo、plugin、fastgpt-app服务均无法正常启动，出现连锁启动失败的情况。

## 可能原因
该问题源于MongoDB副本集的持久化配置与当前服务名不一致。Mongo首次初始化副本集后，会将rs0配置持久化保存到数据目录中，该配置不会被compose文件实时覆盖。当升级后Mongo服务名从`mongo`变更为`fastgpt-mongo`时，副本集配置中仍保留旧的连接地址`mongo:27017`，导致容器内DNS无法解析该旧地址，引发连接失败。

## 排查步骤
1. 查看各服务的容器日志，确认存在`Could not find address for mongo:27017`的报错信息。
2. 登录MongoDB数据存储目录，查找持久化保存的副本集配置文件（具体目录需按实际部署环境确认）。
3. 对比compose配置文件中的MongoDB服务名称与副本集配置中的连接地址，确认两者是否存在不一致。

## 解决与验证
首先停止所有FastGPT相关容器，避免在修改配置时产生数据写入冲突。接着进入MongoDB数据目录，编辑持久化的副本集配置，将其中的`mongo:27017`替换为当前compose文件中配置的MongoDB服务名（如`fastgpt-mongo:27017`）。完成修改后重启MongoDB容器，等待其正常启动后，再依次启动plugin、fastgpt-app等其他关联服务。最后通过容器内的ping命令或MongoDB客户端连接`fastgpt-mongo:27017`，验证DNS解析与连接是否正常，确认所有服务启动无报错。

> 来源：[FastGPT GitHub Issue #6844](https://github.com/labring/FastGPT/issues/6844)
