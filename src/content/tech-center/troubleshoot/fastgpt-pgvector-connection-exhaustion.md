---
title: 解决FastGPT中pgvector连接被写入操作耗尽的问题
slug: /zh/troubleshoot/fastgpt-pgvector-connection-exhaustion
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5092
source_type: GitHub issue
---

# 解决FastGPT中pgvector连接被写入操作耗尽的问题

## 现象
私有部署FastGPT 4.9.13版本时，当持续执行大量向量写入操作（单团队涉及几十万数据拆分的大量chunk），同时有业务查询请求，pgvector的最大连接数（配置为500-1000）会被写操作耗尽，出现`too many clients`报错，无法进行数据库连接和查询操作。当前pgvector部署为3个节点，存储了近4000万向量数据。

## 可能原因
未对FastGPT的数据库读写连接进行区分，向量写入操作占用了全部pgvector连接池资源，导致后续的查询操作无法获取可用数据库连接。同时大量chunk拆分带来的高频写入请求进一步加剧了连接耗尽的问题。

## 排查步骤
1. 查看pgvector的最大连接数配置与当前活跃连接数，确认连接是否被耗尽。
2. 检查FastGPT的数据库连接配置，确认是否未区分读写客户端的连接池参数。
3. 复现问题：执行批量向量写入操作，同时发起业务查询请求，观察数据库连接数变化与报错日志。
4. 查看FastGPT运行日志，确认是否存在`too many clients`相关报错信息。

## 解决与验证
可通过配置项区分读写数据库连接，分别配置读客户端和写客户端的最大连接数，避免写操作耗尽所有连接。配置需按实际FastGPT部署的配置文件进行调整。验证步骤：
1. 完成配置调整后重启FastGPT服务。
2. 再次执行批量向量写入操作，同时发起业务查询请求，观察pgvector连接数分配情况。
3. 确认不再出现`too many clients`报错，业务查询可正常执行。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5092)
