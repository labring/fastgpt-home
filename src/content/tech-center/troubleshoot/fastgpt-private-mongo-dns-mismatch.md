---
title: 解决FastGPT私有部署升级后MongoDB连接失败问题
slug: /zh/troubleshoot/fastgpt-private-mongo-dns-mismatch
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6845
source_type: GitHub issue
---

# 解决FastGPT私有部署升级后MongoDB连接失败问题

## 现象
用户将FastGPT私有部署版本从4.14.8升级到4.14.15后，出现Mongo、plugin、fastgpt-app无法启动的连锁问题，核心报错信息为：
```
{"host":"mongo:27017","success":false,"errorMessage":"HostUnreachable: Error connecting to mongo:27017 :: caused by :: Could not find address for mongo:27017: SocketException: Host not found (authoritative)"}}}}
```
所有相关服务均无法正常启动，报错会连锁影响后续组件加载。

## 可能原因
本次问题源于MongoDB副本集配置的持久化特性：Mongo第一次初始化副本集后生成的rs0配置会被持久化保存在Mongo数据目录中，不会随compose配置文件的修改实时生效。用户在升级过程中修改了Mongo的容器服务名为`fastgpt-mongo`，但数据目录中保存的历史副本集配置仍使用原服务名`mongo:27017`，导致容器内DNS无法解析原地址，引发连接失败。

## 排查步骤
1. 查看FastGPT各服务的启动日志，确认是否出现上述指定的Mongo连接报错文本；
2. 进入Mongo的数据存储目录，查找并查看持久化保存的副本集配置文件，具体路径需按实际环境确认；
3. 对比compose配置文件中的Mongo服务名与副本集配置文件中的连接地址是否一致。

## 解决与验证
1. 停止所有FastGPT相关的容器，避免操作过程中出现数据冲突；
2. 进入Mongo的数据存储目录，编辑持久化的副本集配置文件，将原连接地址`mongo:27017`替换为新的服务名`fastgpt-mongo:27017`；
3. 重新启动Mongo容器，登录Mongo Shell执行`rs.conf()`命令，确认副本集配置中的连接地址已完成更新；
4. 依次启动plugin、fastgpt-app等其他FastGPT服务，检查各服务的启动日志，确认无Mongo连接报错，所有服务正常运行。

> 来源：[FastGPT GitHub Issue #6845](https://github.com/labring/FastGPT/issues/6845)
