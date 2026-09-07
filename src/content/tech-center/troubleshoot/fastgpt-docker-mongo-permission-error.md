---
title: 解决FastGPT Docker部署Mongo容器权限报错退出问题
slug: /zh/troubleshoot/fastgpt-docker-mongo-permission-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/834
source_type: GitHub issue
---

# 解决FastGPT Docker部署Mongo容器权限报错退出问题

## 现象
使用 docker-compose 部署 FastGPT 并执行 `docker-compose up -d` 启动容器后，Mongo 容器会立即退出。通过 `docker logs mongo` 查看容器日志，会出现权限相关报错，典型日志片段如下：
```
{"t":{"$date":"2024-02-06T05:27:30.740+00:00"},"s":"I",  "c":"ACCESS",   "id":20254,   "ctx":"main","msg":"Read security file failed","attr":{"error":{"code":30,"codeName":"InvalidPath","errmsg":"permissions on /data/mongodb.key are too open"}}}
```
或针对`keyFile`的报错：
```
{"t":{"$date":"2024-02-06T03:01:44.975+00:00"},"s":"I",  "c":"ACCESS",   "id":20254,   "ctx":"main","msg":"Read security file failed","attr":{"error":{"code":30,"codeName":"InvalidPath","errmsg":"permissions on /data/mongodb/keyFile are too open"}}}
```

## 可能原因
MongoDB 启用内部身份验证时，要求用于集群身份验证的密钥文件权限仅允许所有者读写，即权限值为 600。如果通过 `openssl rand -base64 128 > ./mongodb/keyFile` 命令生成的密钥文件权限过高，容器内的 MongoDB 进程无法读取该文件，导致启动失败。

## 排查步骤
1.  执行 `docker logs mongo` 命令，查看 Mongo 容器的运行日志，确认是否存在 `permissions on /data/mongodb/keyFile are too open` 类的报错信息。
2.  进入本地挂载的密钥文件目录，执行 `ls -l` 命令查看文件权限，确认当前权限是否过于开放。
3.  确认密钥文件是通过官方推荐的 `openssl rand -base64 128 > ./mongodb/keyFile` 命令生成的。

## 解决与验证
1.  修改本地密钥文件的权限，执行 `chmod 600 ./mongodb/keyFile`，需替换为实际的密钥文件路径，如 `./mongodb.key`。
2.  重新启动相关容器，可执行 `docker-compose up -d` 整体重启所有服务，或仅重启 Mongo 容器 `docker-compose up -d mongo`。
3.  再次执行 `docker logs mongo`，确认无权限相关报错，Mongo 容器正常运行。
4.  检查所有 FastGPT 相关容器的运行状态，确认服务均正常启动。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/834)
