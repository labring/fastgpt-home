---
title: 排查FastGPT私有部署zilliz版连接Zilliz与Redis失败的相关问题
slug: /zh/troubleshoot/fastgpt-private-zilliz-redis-connect-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4638
source_type: GitHub issue
---

# 排查FastGPT私有部署zilliz版连接Zilliz与Redis失败的相关问题

## 现象
部署FastGPT 4.9.6私有部署zilliz版时，会出现两类连接失败问题：
1.  连接Zilliz服务器失败，页面无法正常使用相关依赖服务。
2.  连接Redis失败，报错文本为`Redis connection error`，具体栈信息为`connect ECONNREFUSED [127.0.0.1:6379]`。
初始启动阶段仅提示找不到Redis，页面可正常访问，但向知识库传输文件时会报错`Reached the max retries per request limit (which is 20). Refer to "maxRetries per request" option for details.`，此时Zilliz云端可连通且会创建modeldata的collection，Redis镜像已正常下载，后续会出现Zilliz连接失败的问题。

## 可能原因
结合报错与部署流程，可能的原因包括：
1.  Redis服务未正常启动，或配置的Redis地址与实际部署地址不符，导致连接被拒绝。
2.  修改docker-compose-zilliz.yml中的`MILVUS_ADDRESS`和`MILVUS_TOKEN`参数时，存在格式错误或值不正确，导致无法连接Zilliz服务器。
3.  部署时未正确配置依赖服务的地址与认证信息，导致服务间通信异常。

## 排查步骤
1.  检查Redis服务状态：执行`redis-cli ping`命令，确认Redis服务是否正常运行，若返回`PONG`则服务正常，否则需启动Redis服务或核对配置的Redis地址是否与实际部署地址一致。
2.  核对Zilliz连接配置：打开修改后的docker-compose-zilliz.yml文件，确认`MILVUS_ADDRESS`和`MILVUS_TOKEN`参数的值正确，无多余空格或格式错误。
3.  查看容器日志：执行`docker logs fastgpt`命令，查看具体报错信息，匹配issue中给出的`connect ECONNREFUSED [127.0.0.1:6379]`或Zilliz连接失败日志，定位具体错误点。
4.  确认依赖服务部署位置：若Redis未部署在本地127.0.0.1:6379，需修改FastGPT配置中的Redis相关环境变量为实际部署的地址与端口。

## 解决与验证
1.  修复Redis连接问题：若Redis未启动，执行对应命令启动Redis服务；若Redis部署在其他地址，修改docker-compose配置中的Redis相关环境变量，将地址改为实际部署的地址与端口。
2.  修复Zilliz连接问题：确认docker-compose-zilliz.yml中的`MILVUS_ADDRESS`和`MILVUS_TOKEN`参数配置正确，保存配置后重新启动FastGPT服务。
3.  验证服务连通性：重新启动服务后，访问FastGPT页面并尝试向知识库传输文件，确认无连接报错，且Zilliz可正常创建collection。
4.  确认镜像状态：检查Redis镜像是否正常下载，确保镜像未损坏或拉取失败。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4638)
