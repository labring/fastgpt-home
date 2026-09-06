---
title: 解决FastGPT私有部署时Milvus连接失败导致服务重启的问题
slug: /zh/troubleshoot/fastgpt-milvus-name-resolution-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3991
source_type: GitHub issue
---

# 解决FastGPT私有部署时Milvus连接失败导致服务重启的问题

## 现象
使用docker-compose-milvus.yml部署FastGPT 4.8.22私有版本时，服务持续重启。查看服务日志可见初始化系统错误，具体报错为`14 UNAVAILABLE: Name resolution failed for target dns:milvusStandalone:19530`。

## 可能原因
docker-compose配置文件中Milvus服务名称的大小写不符合DNS解析规则，导致无法通过指定的dns地址解析到对应容器。

## 排查步骤
1. 执行`docker logs milvusStandalone`命令，查看服务日志，确认是否存在`14 UNAVAILABLE: Name resolution failed for target dns:milvusStandalone:19530`类报错。
2. 打开docker-compose配置文件，检查Milvus相关服务的名称配置。

## 解决与验证
将docker-compose.yaml中`milvusStandalone`的大写S全部改为小写，调整服务名为`milvusstandalone`。重启docker-compose服务后，再次查看日志，确认Milvus连接正常，FastGPT服务不再重启。

> 来源: [FastGPT GitHub issue #3991](https://github.com/labring/FastGPT/issues/3991)
