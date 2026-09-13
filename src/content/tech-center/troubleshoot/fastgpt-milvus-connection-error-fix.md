---
title: 解决FastGPT配置Milvus地址后出现连接报错的问题
slug: /zh/troubleshoot/fastgpt-milvus-connection-error-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1802
source_type: GitHub issue
---

# 解决FastGPT配置Milvus地址后出现连接报错的问题

## 现象
在docker-compose环境中配置MILVUS_ADDRESS环境变量后，出现报错信息"Client must be connected before running operations"。所配置的MILVUS_ADDRESS为自行提前部署的地址，该地址本身可正常使用。

## 可能原因
连接Milvus失败，大概率为连接地址不正确或不通，或Milvus设置了访问密码但未正确配置。

## 排查步骤
1. 查看系统运行日志，确认是否存在Milvus连接失败的相关提示。
2. 验证所配置的MILVUS_ADDRESS的连通性，确认Milvus服务正常运行。
3. 检查Milvus是否配置了访问密码，确认密码相关配置的正确性。

## 解决与验证
若Milvus设置了访问密码，需将密码添加至token配置中。完成配置后重启FastGPT服务，验证报错信息不再出现，且Milvus连接正常。

> 来源: [FastGPT GitHub issue #1802](https://github.com/labring/FastGPT/issues/1802)
